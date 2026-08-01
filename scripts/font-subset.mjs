import { createHash } from "node:crypto";
import { existsSync } from "node:fs";
import { mkdir, readdir, readFile, unlink, writeFile } from "node:fs/promises";
import { basename, extname, join } from "node:path";

const subsetFont = (await import("subset-font")).default;

// Config
const DIST_DIR = "./dist";
const SUBSET_DIR = join(DIST_DIR, "assets/fonts/subset");
const CACHE_DIR = "./.cache/font-subset";
const SOURCE_DIRS = ["./src/data", "./src/pages", "./src/components", "./src/layouts"];
const SOURCE_EXTS = new Set([".astro", ".md", ".mdx", ".json", ".ts", ".tsx", ".js", ".jsx", ".mjs"]);
const EXTRA_CHARS_FILE = "./extra-chars.txt";
const PATCH_EXTS = new Set([".html", ".css", ".js"]);
const CRITICAL_PAGE = join(DIST_DIR, "index.html");
const CRITICAL_END_ID = "timeline";
const CRITICAL_FONT_FAMILY = "LINE Seed TW Critical";
const CRITICAL_WEIGHTS = new Set([400, 800]);
const CRITICAL_PRELOAD_BUDGET_BYTES = 100 * 1024;
const SUBSET_CACHE_VERSION = "2";
// Match url(...) in CSS @font-face. Quote-agnostic, base-path-agnostic.
const FONT_URL_RE = /url\((["']?)([^"')]*?)_astro\/fonts\/([^"')]+\.woff2)\1\)/g;
// Match HTML attributes like <link rel="preload" href="..."> or <link rel="prefetch">.
// Critical: without this, browsers preload the original (full-size) font.
const FONT_ATTR_RE = /\b(href|src)=(["'])([^"']*?)_astro\/fonts\/([^"']+\.woff2)\2/g;
const FONT_FACE_RE = /@font-face\s*\{[^}]*\}/g;
const FONT_FACE_URL_RE = /url\((["']?)([^"')]*?)_astro\/fonts\/([^"')]+\.woff2)\1\)/;

const BASE_CHARS = " !\"#$%&'()*+,-./0123456789:;<=>?@" + "ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`" + "abcdefghijklmnopqrstuvwxyz{|}~" + "，。！？；：「」『』（）【】〔〕…—－～·、　" + "《》〈〉〝〞";

// Pull all string literals out of JS-ish code so chars in frontmatter / <script> / .ts / .json survive.
const STRING_LITERAL_RE = /"((?:[^"\\]|\\.)*)"|'((?:[^'\\]|\\.)*)'|`((?:[^`\\]|\\.)*)`/g;
function extractStringLiterals(code) {
	const out = [];
	for (const m of code.matchAll(STRING_LITERAL_RE)) out.push(m[1] ?? m[2] ?? m[3] ?? "");
	return out.join("\n");
}

// Extract text from source files
function extractText(content, ext) {
	if (ext === ".json") {
		try {
			const chars = [];
			const walk = obj => {
				if (typeof obj === "string") chars.push(obj);
				else if (Array.isArray(obj)) obj.forEach(walk);
				else if (obj && typeof obj === "object") Object.values(obj).forEach(walk);
			};
			walk(JSON.parse(content));
			return chars.join("\n");
		} catch {
			return "";
		}
	}

	if (ext === ".astro") {
		const parts = [];
		// Frontmatter (anchored at file head): keep string literals.
		const fm = content.match(/^---\r?\n([\s\S]*?)\r?\n---/);
		let body = content;
		if (fm) {
			parts.push(extractStringLiterals(fm[1]));
			body = content.slice(fm[0].length);
		}
		// <script> blocks: keep string literals.
		body = body.replace(/<script[\s\S]*?<\/script>/gi, block => {
			parts.push(extractStringLiterals(block));
			return "";
		});
		// <style> blocks: drop entirely (CSS rarely has display text).
		body = body.replace(/<style[\s\S]*?<\/style>/gi, "");
		// Template: keep static text + string literals inside {...} expressions.
		body = body.replace(/\{([^{}]*)\}/g, (_, expr) => {
			parts.push(extractStringLiterals(expr));
			return " ";
		});
		body = body.replace(/<[^>]+>/g, " ");
		parts.push(body);
		return parts.join("\n");
	}

	if (ext === ".md" || ext === ".mdx") {
		let text = content.replace(/^---\r?\n[\s\S]*?\r?\n---/, "");
		text = text.replace(/```[\s\S]*?```/g, "");
		text = text.replace(/`[^`]+`/g, "");
		text = text.replace(/[#*_~\[\]()>|]/g, " ");
		return text;
	}

	// .ts / .tsx / .js / .jsx / .mjs — only string literals carry user-visible text.
	return extractStringLiterals(content);
}

// Collect unique chars from sources
async function collectChars() {
	const chars = new Set(BASE_CHARS.split(""));

	if (existsSync(EXTRA_CHARS_FILE)) {
		const extra = await readFile(EXTRA_CHARS_FILE, "utf-8");
		for (const line of extra.split(/\r?\n/)) {
			// Comments: only when '#' is at the start of the line.
			if (line.trimStart().startsWith("#")) continue;
			for (const c of line) chars.add(c);
		}
	}

	const skipDir = name => name === "node_modules" || name.startsWith(".");
	async function scan(dir) {
		if (!existsSync(dir)) return;
		const entries = await readdir(dir, { withFileTypes: true });
		await Promise.all(
			entries.map(async entry => {
				const fp = join(dir, entry.name);
				if (entry.isDirectory()) {
					if (!skipDir(entry.name)) await scan(fp);
				} else if (SOURCE_EXTS.has(extname(entry.name))) {
					const content = await readFile(fp, "utf-8");
					for (const c of extractText(content, extname(entry.name))) chars.add(c);
				}
			})
		);
	}
	await Promise.all(SOURCE_DIRS.map(scan));

	// Sort so the chars string is stable across runs — parallel scans otherwise produce
	// different insertion order in the Set, which breaks both the cache key and any
	// downstream byte-for-byte comparison of subset font output.
	const filtered = [...chars]
		.filter(c => {
			const cp = c.codePointAt(0);
			return cp !== undefined && cp >= 0x20 && cp !== 0x7f;
		})
		.sort();

	console.log(`  Collected ${filtered.length} unique chars`);
	return filtered.join("");
}

function decodeHtmlEntities(text) {
	const named = new Map([
		["amp", "&"],
		["apos", "'"],
		["gt", ">"],
		["lt", "<"],
		["nbsp", " "],
		["quot", '"'],
	]);
	return text.replace(/&(#(?:x[\da-f]+|\d+)|[a-z]+);/gi, (entity, body) => {
		if (body[0] !== "#") return named.get(body.toLowerCase()) ?? entity;
		const hex = body[1]?.toLowerCase() === "x";
		const codePoint = Number.parseInt(body.slice(hex ? 2 : 1), hex ? 16 : 10);
		return Number.isFinite(codePoint) ? String.fromCodePoint(codePoint) : entity;
	});
}

// Keep the first screen tiny and deterministic by deriving its glyphs from the
// rendered header/hero, stopping before the first below-the-fold section.
async function collectCriticalChars() {
	if (!existsSync(CRITICAL_PAGE)) throw new Error(`Critical page not found: ${CRITICAL_PAGE}`);
	const html = await readFile(CRITICAL_PAGE, "utf-8");
	const bodyStart = html.search(/<body\b/i);
	const endMatch = new RegExp(`<section\\b[^>]*\\bid=(["'])${CRITICAL_END_ID}\\1`, "i").exec(html);
	if (bodyStart === -1 || !endMatch || endMatch.index <= bodyStart) {
		throw new Error(`Could not isolate critical content before #${CRITICAL_END_ID}`);
	}

	const visibleText = decodeHtmlEntities(
		html
			.slice(bodyStart, endMatch.index)
			.replace(/<script\b[\s\S]*?<\/script>/gi, " ")
			.replace(/<style\b[\s\S]*?<\/style>/gi, " ")
			.replace(/<!--([\s\S]*?)-->/g, " ")
			.replace(/<[^>]+>/g, " ")
	);
	const chars = new Set("0123456789");
	for (const c of visibleText) chars.add(c);
	const filtered = [...chars]
		.filter(c => {
			const cp = c.codePointAt(0);
			return cp !== undefined && cp >= 0x20 && cp !== 0x7f;
		})
		.sort();

	console.log(`  Collected ${filtered.length} critical chars`);
	return filtered.join("");
}

// Find font files in dist
async function findFonts(dir) {
	if (!existsSync(dir)) return [];
	const entries = await readdir(dir, { recursive: true, withFileTypes: true });
	return entries
		.filter(e => e.isFile() && /\.(woff2?|ttf|otf)$/i.test(extname(e.name)))
		.map(e => join(e.parentPath || e.path, e.name))
		.filter(p => !p.includes(join("assets", "fonts", "subset")));
}

// Subset single font
async function subsetFontFile(fontPath, chars, label = "subset") {
	const input = await readFile(fontPath);
	const output = await subsetFont(input, chars, { targetFormat: "woff2" });
	await writeFile(join(SUBSET_DIR, `${basename(fontPath, extname(fontPath))}.${label}.woff2`), output);
	const saved = ((1 - output.byteLength / input.byteLength) * 100).toFixed(1);
	console.log(`  ✓ ${basename(fontPath)} [${label}] ${(input.byteLength / 1024).toFixed(1)}KB → ${(output.byteLength / 1024).toFixed(1)}KB (-${saved}%)`);
}

// Recursively collect files we need to patch (HTML, CSS, JS — anywhere @font-face or font-loader code may live).
async function collectPatchTargets(dir, out = []) {
	if (!existsSync(dir)) return out;
	const entries = await readdir(dir, { withFileTypes: true });
	for (const entry of entries) {
		const fp = join(dir, entry.name);
		if (entry.isDirectory()) {
			if (!entry.name.startsWith(".")) await collectPatchTargets(fp, out);
		} else if (PATCH_EXTS.has(extname(entry.name))) {
			out.push(fp);
		}
	}
	return out;
}

async function discoverFontFaces(fonts) {
	const byName = new Map();
	const targets = await collectPatchTargets(DIST_DIR);
	for (const fp of targets) {
		const content = await readFile(fp, "utf-8");
		for (const [block] of content.matchAll(FONT_FACE_RE)) {
			const url = block.match(FONT_FACE_URL_RE);
			const weight = block.match(/font-weight\s*:\s*(\d+)/i);
			if (url && weight) byName.set(url[3], { prefix: url[2], weight: Number(weight[1]) });
		}
	}

	return fonts.map(fp => {
		const name = basename(fp);
		const face = byName.get(name);
		if (!face) throw new Error(`Could not determine font weight for ${name}`);
		return { ...face, fp, name };
	});
}

const toSubsetPath = (prefix, name) => `${prefix}assets/fonts/subset/${name.replace(/\.woff2$/, "")}.subset.woff2`;
const toCriticalPath = (prefix, name) => `${prefix}assets/fonts/subset/${name.replace(/\.woff2$/, "")}.critical.woff2`;

// Rewrite _astro/fonts/<name>.woff2 → assets/fonts/subset/<name>.subset.woff2 in HTML/CSS/JS.
// Preserves any base prefix (/2026/, /, etc.) and the original quoting style.
async function patchAssetUrls() {
	const files = await collectPatchTargets(DIST_DIR);
	let patched = 0;
	const remaining = [];
	for (const fp of files) {
		const original = await readFile(fp, "utf-8");
		let updated = original
			.replace(FONT_URL_RE, (_, q, prefix, name) => `url(${q}${toSubsetPath(prefix, name)}${q})`)
			.replace(FONT_ATTR_RE, (_, attr, q, prefix, name) => `${attr}=${q}${toSubsetPath(prefix, name)}${q}`);
		// Without crossorigin, the @font-face CORS fetch can't hit the preload cache —
		// browser logs "preloaded resource was not used" and re-downloads the font.
		updated = updated.replace(/(<link\b(?=[^>]*\brel=(["'])preload\2)(?=[^>]*\bas=(["'])font\3)[^>]*?)(\/?>)/gi, (match, tag, _q1, _q2, close) =>
			/\bcrossorigin\b/i.test(tag) ? match : `${tag} crossorigin${close}`
		);
		if (updated !== original) {
			await writeFile(fp, updated);
			patched++;
		}
		if (/_astro\/fonts\/[^"')\s]+\.woff2/.test(updated)) remaining.push(fp);
	}
	console.log(`  Patched ${patched} file(s)`);
	if (remaining.length > 0) {
		console.warn(`  ⚠ ${remaining.length} file(s) still reference _astro/fonts/*.woff2:`);
		for (const fp of remaining.slice(0, 5)) console.warn(`    - ${fp}`);
	}
	return remaining.length === 0;
}

async function injectCriticalFonts(faces) {
	const criticalFaces = faces.filter(face => CRITICAL_WEIGHTS.has(face.weight)).sort((a, b) => a.weight - b.weight);
	if (criticalFaces.length !== CRITICAL_WEIGHTS.size) {
		throw new Error(`Expected critical weights ${[...CRITICAL_WEIGHTS].join(", ")}, found ${criticalFaces.map(face => face.weight).join(", ")}`);
	}

	const preloadTags = criticalFaces
		.map(face => `<link rel="preload" href="${toCriticalPath(face.prefix, face.name)}" as="font" type="font/woff2" crossorigin>`)
		.join("");
	const fontFaces = criticalFaces
		.map(face => `@font-face{font-family:"${CRITICAL_FONT_FAMILY}";src:url("${toCriticalPath(face.prefix, face.name)}") format("woff2");font-display:swap;font-weight:${face.weight};font-style:normal;}`)
		.join("");
	const injected = `<style data-critical-fonts>${fontFaces}</style>${preloadTags}`;
	const html = await readFile(CRITICAL_PAGE, "utf-8");
	const viewport = /<meta\b[^>]*\bname=(["'])viewport\1[^>]*>/i;
	if (!viewport.test(html)) throw new Error("Could not find viewport meta tag for critical font injection");
	await writeFile(CRITICAL_PAGE, html.replace(viewport, match => `${match}${injected}`));
	console.log(`  Injected ${criticalFaces.length} critical font preload(s)`);
}

async function enforceCriticalBudget(faces) {
	const criticalFaces = faces.filter(face => CRITICAL_WEIGHTS.has(face.weight));
	const totalBytes = (
		await Promise.all(
			criticalFaces.map(async face => (await readFile(join(SUBSET_DIR, `${basename(face.fp, extname(face.fp))}.critical.woff2`))).byteLength)
		)
	).reduce((total, bytes) => total + bytes, 0);
	const totalKb = (totalBytes / 1024).toFixed(1);
	const budgetKb = (CRITICAL_PRELOAD_BUDGET_BYTES / 1024).toFixed(0);
	if (totalBytes > CRITICAL_PRELOAD_BUDGET_BYTES) {
		throw new Error(`Critical font payload ${totalKb}KB exceeds the ${budgetKb}KB budget`);
	}
	console.log(`  Critical preload budget: ${totalKb}KB / ${budgetKb}KB`);
}

// Hash inputs that should bust the cache: chars + every font file's bytes.
async function buildCacheKey(chars, criticalChars, fonts) {
	const h = createHash("sha256");
	h.update(SUBSET_CACHE_VERSION);
	h.update("\0");
	h.update(chars);
	h.update("\0critical\0");
	h.update(criticalChars);
	for (const fp of fonts.slice().sort()) {
		h.update("\0");
		h.update(fp);
		h.update("\0");
		h.update(await readFile(fp));
	}
	return h.digest("hex");
}

// --- Main ---
const chars = await collectChars();
const criticalChars = await collectCriticalChars();

const fonts = await findFonts(DIST_DIR);
if (fonts.length === 0) {
	console.warn("⚠ No font files found in dist/");
	process.exit(1);
}
const fontFaces = await discoverFontFaces(fonts);

await mkdir(SUBSET_DIR, { recursive: true });
await mkdir(CACHE_DIR, { recursive: true });

const cacheKey = await buildCacheKey(chars, criticalChars, fonts);
const cacheKeyFile = join(CACHE_DIR, "cache-key");
const subsetFontsExist = (
	await Promise.all(
		fontFaces.flatMap(face => ["subset", ...(CRITICAL_WEIGHTS.has(face.weight) ? ["critical"] : [])].map(label =>
			readFile(join(SUBSET_DIR, `${basename(face.fp, extname(face.fp))}.${label}.woff2`)).then(
				() => true,
				() => false
			)
		))
	)
).every(Boolean);

const cacheHit = subsetFontsExist && existsSync(cacheKeyFile) && (await readFile(cacheKeyFile, "utf-8")) === cacheKey;

// Drop orphaned subsets (e.g. Astro's content-hashed font filenames change between builds).
const expectedSubsets = new Set(
	fontFaces.flatMap(face => [
		`${basename(face.fp, extname(face.fp))}.subset.woff2`,
		...(CRITICAL_WEIGHTS.has(face.weight) ? [`${basename(face.fp, extname(face.fp))}.critical.woff2`] : []),
	])
);
const existingSubsets = existsSync(SUBSET_DIR) ? await readdir(SUBSET_DIR) : [];
for (const name of existingSubsets) {
	if (!expectedSubsets.has(name)) await unlink(join(SUBSET_DIR, name));
}

if (cacheHit) {
	console.log("✓ Inputs unchanged. Skipping subset.");
} else {
	console.log(`\nSubsetting ${fonts.length} font(s)...\n`);
	const subsetJobs = fontFaces.flatMap(face => [
		{ fp: face.fp, chars, label: "subset" },
		...(CRITICAL_WEIGHTS.has(face.weight) ? [{ fp: face.fp, chars: criticalChars, label: "critical" }] : []),
	]);
	const results = await Promise.all(
		subsetJobs.map(job =>
			subsetFontFile(job.fp, job.chars, job.label).then(
				() => null,
				e => ({ fp: job.fp, label: job.label, err: e })
			)
		)
	);
	const failures = results.filter(Boolean);
	if (failures.length > 0) {
		for (const { fp, label, err } of failures) console.error(`  ✗ Failed: ${basename(fp)} [${label}] - ${err.message}`);
		console.error(`\n✗ ${failures.length} font(s) failed.`);
		process.exit(1);
	}
}

// HTML/CSS/JS patching is idempotent and cheap — always run so a fresh `astro build`
// gets re-patched even when chars/fonts didn't change.
await enforceCriticalBudget(fontFaces);
const fullyPatched = await patchAssetUrls();
await injectCriticalFonts(fontFaces);

await writeFile(cacheKeyFile, cacheKey);

if (!fullyPatched) {
	console.error("\n✗ Some files still reference unsubsetted fonts. See warnings above.");
	process.exit(1);
}

// Delete the now-orphaned originals (~13MB combined). They're unreferenced after
// patching; leaving them inflates deploy size and Cloudflare Workers asset count.
let removedBytes = 0;
for (const fp of fonts) {
	removedBytes += (await readFile(fp)).byteLength;
	await unlink(fp);
}
if (fonts.length > 0) {
	console.log(`  Removed ${fonts.length} original font(s) (${(removedBytes / 1024 / 1024).toFixed(1)}MB).`);
}

console.log("\n✓ Done.");
