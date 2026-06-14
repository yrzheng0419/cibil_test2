# CIBI Lab 網站 — 極簡維護指南

> 詳細說明請看 [README.md](./README.md)。這份只列日常會用到的工作流程。

線上網址：<https://yrzheng0419.github.io/cibil_test2/>

---

## 1. 改內容（成員、論文、活動）→ 編輯 Google Sheets

最常做的事，**不需要寫程式、也不需要部署**。

| 工作表 | 管理什麼 |
|---|---|
| `members` | 在學學生、校友、研究助理 |
| `publications` | 期刊與研討會論文 |
| `gallery` | 活動花絮（**一張照片一列**） |

改完存檔 → 等約 5 分鐘（Google 有快取）→ 在網站按 `Ctrl/Cmd + Shift + R` 強制重新整理，就會看到更新。

- 文字欄位若暫時沒有內容，填 `NA` 即可（網站會自動當成空白，不會顯示「NA」）。
- 成員畢業：把該列 `status` 改成 `alumni`、補上 `year_grad` 與 `thesis_url`，他就會自動移到「校友」區。

---

## 2. 換照片 → 上傳到 `public/assets/` + 在 Sheet 填檔名

1. 把圖片放進對應資料夾：
   - 成員：`public/assets/members/`（直式 3:4）
   - 活動：`public/assets/gallery/`（橫式 4:3）
   - 教授：`public/assets/pi/`（橫式 4:3）
2. 在 Google Sheets 對應列的 `photo_filename` 欄填**完整檔名**（含副檔名，例如 `wang-mei.png`），大小寫要完全一致。
3. 把圖片 commit、push 到 `main` → GitHub Actions 約 2 分鐘自動部署。

> `.png` 或 `.jpg` 都可以，只要檔名和 Sheet 填的完全一樣。沒填或檔案不存在時，會顯示該資料夾的 `default.png` 佔位圖。

---

## 3. 改頁面固定文字（不是來自 Google Sheets 的內容）

凡是「不在 Sheets 裡」的文字（首頁文案、研究領域敘述、教授資料、介面字…）都寫死在 `src/i18n/` 資料夾。改完 push 到 `main` 自動部署。對照表：

| 想改的內容 | 檔案 | 變數 / 位置 |
|---|---|---|
| 首頁：上方小字、主標題、副標題、**副標題下方的段落**、兩個 CTA 按鈕文字 | `src/i18n/en.ts`（英）<br>`src/i18n/zh.ts`（中） | `hero`（`eyebrow` / `h1` / `subtitle` / `body` / `ctaResearch` / `ctaTeam`） |
| **研究領域各領域的敘述** | `src/i18n/content.ts` | `DOMAIN_DESCRIPTIONS` |
| 教授資料（學經歷、研究主題、授課課程、聯絡方式） | `src/i18n/content.ts` | `PI` |
| 頁尾地址 / 電話 | `src/i18n/content.ts` | `SITE` |
| 選單、各區塊標題、按鈕等介面字 | `src/i18n/en.ts` / `zh.ts` | `nav` / `team` / `research` … |

**中英文怎麼分：**

- `en.ts` 是整份英文、`zh.ts` 是整份中文，兩個檔案結構相同 —— 要改某段就把**兩個檔案的同一欄位**都改。例：首頁段落改 `en.ts` 的 `hero.body`（英）和 `zh.ts` 的 `hero.body`（中）。
- `content.ts` 則是中英寫在一起，像 `{ en: '...', zh: '...' }`，一次改兩種語言。研究領域的中文敘述目前留空（暫時顯示英文），把 `DOMAIN_DESCRIPTIONS` 裡各領域的 `zh` 填上即可。

> 改這些檔案只需要動引號 `'...'` 內的文字，不要改到變數名稱或標點結構。

---

## 4. 部署

**全自動。** 任何推送到 `main` 的變更都會觸發 GitHub Actions 重新建置並部署。到 repo 的 **Actions** 頁籤看綠色勾號即代表成功。

本機預覽（選用，開發時才需要）：

```bash
npm install
npm run dev      # 開 http://localhost:4321/cibil_test2/
```

---

## 5. 把專案搬到新的 repo（例如老師的帳號）

把所有檔案複製到新 repo 後，**只需要改這幾個地方**：

1. **`astro.config.mjs`** — 改 `site` 和 `base`：
   - 規則：`site` = `https://<新帳號>.github.io`，`base` = `/<新-repo-名稱>`
   - 例：搬到 `prof-account/cibi-lab` → `site: 'https://prof-account.github.io'`、`base: '/cibi-lab'`
   - （站內連結與圖片路徑都透過 `withBase()` 自動套用 `base`，不必逐一手改。）

2. **新 repo 的 GitHub Pages 設定** — Settings → Pages → Source 選 **GitHub Actions**（首次必做）。

3. **Google Sheets（只有在換試算表時才需要）** — 若改用新的試算表，到「檔案 → 共用 → 發布到網路」重新發布三個工作表為 CSV，並把網址更新到 `src/constants/sheets.ts`。沿用原試算表則不必動。

4. **文件裡的網址** — 把本檔與 `README.md` 開頭的線上網址換成新的。

其他（程式碼、圖片、Google Sheets 資料）都隨檔案一起搬移，不需更動。改完推送到新 repo 的 `main`，Actions 跑完即上線。
