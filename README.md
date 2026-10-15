# SITCON 社群 Portal

以 Astro、Tailwind CSS 與 TypeScript 製作的 SITCON 社群入口，提供社群介紹、歷年年會與贊助資料，以及 2027 年會資訊。

## 開發與驗證

```bash
pnpm install
pnpm dev
pnpm check
pnpm build
```

本機社群入口網址為 `http://localhost:4321/2027/landing/`，靜態產物輸出至 `dist/`，部署路徑為 `/2027/`。

## 更新內容

Portal 文案、歷年入口、社群活動及年會日期地點集中在 `src/data/site.ts`。首頁目前提供 2026 年會官網及贊助徵求書，明確標示為回顧資料；2027 年徵稿與贊助資訊公布後，再更新入口與提示文字。工作人員招募已結束，網站不再提供招募內容。

首屏字型子集在 `scripts/font-subset.mjs` 從 `/landing/` 擷取至 `#about` 前；調整首頁區塊順序時須同步檢查此界線。

`public/og-card.svg` 是社群預覽卡來源，修改後重新輸出：

```bash
rsvg-convert public/og-card.svg -o public/og-card.png
```

## SEO 部署檢查

- 社群入口正式網址保留結尾斜線：`https://sitcon.org/2027/landing/`。
- 各站維護自己的 sitemap：本站為 `/2027/sitemap.xml`；CFP 在預渲染時依公開路由與正式 canonical 自動產生 `/2027/cfp/sitemap.xml`；CFS 沿用自動產生的 `/2027/cfs/sitemap-index.xml` 與中英文頁面的 `hreflang` 對應。
- 清單只列正式內容頁；`/2027/` 轉址頁、CFP 投稿／驗證頁與舊路由，以及 CFS 報價工具頁不列入。新增公開頁面時更新所屬站的路由與 sitemap 來源；CFP 共用 `content.json` 的 `metadata.pages`，不另外維護 XML 清單。
- 更新內容時同步檢查 SEO 文案、OG 圖、結構化資料與 sitemap 的 `lastmod`；不要因重新部署而改寫內容更新日期。
- 根網站的 `robots.txt`（`sitcon-tw/sitcon-tw.github.com`）直接宣告上述三個 sitemap 入口。首次發布時，先完成 CFP 建置與本站部署，再發布根站宣告；上線後也可分別向 Google Search Console 提交這三個網址。

## CFS and CFP publication

The community portal is available at `/2027/landing/`; the font-subset build
pipeline derives its critical glyphs from that page. The root `index.html` in this
repository redirects `/2027/` to `/2027/cfp/` with an inline head script, following
the main site's silent entry behavior. `location.replace` preserves query strings
and fragments without adding a history entry; a noscript meta refresh handles
browsers with JavaScript disabled. It uses SITCON 2027 metadata and the CFP
background color, with no visible redirect notice. The separate `/cfp/` shortcut is
configured in `links.json` in `sitcon-tw/sitcon-tw.github.com`.

The deployment checks out the generated `build` branches of
[`sitcon-tw/2027-cfs`](https://github.com/sitcon-tw/2027-cfs) and
[`sitcon-tw/2027-cfp`](https://github.com/sitcon-tw/2027-cfp), copies their files into
`dist/cfs/` and `dist/cfp/`, and publishes the combined site at <https://sitcon.org/2027/>.
CFS and CFP are built entirely in their own repositories; this repository only reads
their output. The consumed commits are recorded in the deployment workflow summary.

After **Build CFP site** publishes its output, it automatically triggers **Deploy website** here on `main`. For CFS updates, wait for **Build CFS site** in `2027-cfs` to succeed, then manually run **Deploy website** here on `main`. If the CFP trigger fails after publishing its output, the same manual run can publish it.

Normal main-branch deployments also use the latest successful builds. There are no scheduled refreshes. Missing CFS or CFP output fails deployment, leaving the existing live website unchanged.

## 社群介紹與資料來源

`src/data/site.ts` 集中管理歷年規模、四類活動故事、2025 年會回顧及媒體報導。歷年累積數據與單屆回顧分開呈現，更新時應同步維護統計期間與來源，不將舊資料改標為新年度。

活動照片及報導縮圖沿用 Camp 2026 about 的官方素材；原始網址記錄於 `src/assets/community/SOURCES.md`。首屏以下照片使用響應式圖片及延後載入。報導影片只在使用者點擊播放後建立 YouTube iframe，並保留外連備援。
