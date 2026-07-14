# SITCON 2027 預告官網

以 Astro、Tailwind CSS 與 TypeScript 製作的 SITCON 2027 單頁預告站。

## 開發

```bash
pnpm install
pnpm dev
```

本機網址預設為 `http://localhost:4321/2027/`。

## 檢查與建置

```bash
pnpm check
pnpm build
```

靜態產物會輸出至 `dist/`，網站部署路徑設定為 `/2027`。

## 更新正式資訊

活動日期、地點、跳坑表單、社群連結、籌備時間軸與招募組別集中在 `src/data/site.ts`。

目前除 `2027/03/13`、中央研究院人文社會科學館與 SITCON 2027 預約跳坑表單外，其餘招募月份皆為示意資料。

`public/og-card.svg` 是社群預覽卡的可編輯來源。修改後可重新輸出 `public/og-card.png`：

```bash
rsvg-convert public/og-card.svg -o public/og-card.png
```
