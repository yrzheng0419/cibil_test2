# CIBI Lab — 官方網站

[📖 Read in English](./README.eng.md)

**Computational Intelligence in Biomedical Imaging Laboratory**

網站網址：`https://YOUR-ORG.github.io/cibi-lab` *(建立後更新此連結)*

---

## 目錄

1. [網站概覽](#1-網站概覽)
2. [技術架構](#2-技術架構)
3. [網站運作原理](#3-網站運作原理)
4. [日常內容更新（Google Sheets）](#4-日常內容更新google-sheets)
5. [新增或更換照片](#5-新增或更換照片)
6. [本地端開發環境設定（開發者）](#6-本地端開發環境設定開發者)
7. [部署流程](#7-部署流程)
8. [專案檔案結構](#8-專案檔案結構)
9. [設計規格速查](#9-設計規格速查)
10. [常見問題排解](#10-常見問題排解)

---

## 1. 網站概覽

本網站為國立臺灣大學生物機電工程學系智慧演算生醫影像實驗室（CIBI Lab）官方網站，由周呈霙教授主持。

網站共有五個頁面：**首頁（Home）**、**發表（Publications）**、**研究領域（Research）**、**團隊（Team）**、**活動（Activities）**。

絕大多數的內容（成員資訊、論文、活動花絮）皆透過單一 **Google Sheets 試算表**維護，不需要撰寫程式碼。只有在調整版面設計或新增功能時，才需要修改原始碼。

---

## 2. 技術架構

| 功能 | 技術 | 說明 |
|---|---|---|
| 網站框架 | [Astro](https://astro.build) | 靜態網頁生成，速度快 |
| 樣式 | [Tailwind CSS](https://tailwindcss.com) | 響應式排版，設計規格一致 |
| 內容資料庫 | Google Sheets（發布為 CSV） | 免費，任何人皆可編輯 |
| 照片存放 | 本 GitHub Repo（`public/assets/`） | 透過 GitHub Pages 全球 CDN 提供 |
| 網站托管 | [GitHub Pages](https://pages.github.com) | 免費，推送程式碼後自動部署 |
| 頁面過渡動畫 | Astro View Transitions API | 頁面切換流暢不跳頁 |
| 捲動進場動畫 | [Anime.js](https://animejs.com) + Intersection Observer | 元件隨捲動依序出現 |
| 程式語言 | TypeScript | 資料解析型別安全 |

---

## 3. 網站運作原理

```
使用者開啟網站
        │
        ▼
GitHub Pages 提供預先編譯好的 HTML / CSS / JS
        │
        ▼
瀏覽器執行一段輕量 JavaScript
向 Google Sheets 取得最新的 CSV 資料
        │
        ▼
網頁動態填入最新內容並完整顯示
```

這個架構意味著：

- **修改文字或資料** → 編輯 Google Sheets → 重新整理頁面即可，**不需要部署**。
- **新增或替換照片** → 將圖片上傳至本 Repo → 推送到 `main` 分支，GitHub Actions 約 2 分鐘內自動部署完成。
- **調整版面或設計** → 修改 `.astro` 或 `.css` 原始碼 → 推送到 `main` 分支，自動部署。

---

## 4. 日常內容更新（Google Sheets）

開啟 Google Sheets 試算表檔案，底部有三個工作表（分頁）：

| 工作表 | 管理內容 |
|---|---|
| `members` | 在讀學生、校友、研究助理 |
| `publications` | 所有期刊與研討會論文 |
| `gallery` | 活動照片與紀錄 |

儲存變更後立即生效——重新整理網站即可看到更新。

---

### 4.1 新增成員

前往 `members` 工作表，在最後一行新增一列，依序填入各欄位：

| 欄位 | 填寫內容 | 範例 |
|---|---|---|
| `name_en` | 英文姓名，全大寫 | `CHING-HAN CHANG` |
| `name_zh` | 中文姓名 | `張靖涵` |
| `group` | `ai` 或 `statistics` 或 `ra` | `ai` |
| `status` | 填 `current` | `current` |
| `degree_type` | `ms`（碩士）或 `phd`（博士）或 `ra`（助理） | `ms` |
| `year_joined` | 加入實驗室的年份 | `2025` |
| `year_grad` | 在讀生留空 | *（空白）* |
| `domain` | 研究領域（見下方說明） | `Medical Image` |
| `research_title_en` | 研究題目（英文，暫定亦可） | `Deep Learning for CT Segmentation` |
| `research_title_zh` | 研究題目（中文） | `深度學習應用於CT影像分割` |
| `thesis_url` | 在讀生留空，畢業後填入論文連結 | *（空白）* |
| `email` | NTU 電子郵件（選填） | `r14631006@ntu.edu.tw` |
| `photo_filename` | 照片檔名（見第 5 節） | `chang-ching-han.jpg` |

> **domain 欄位允許值**（請完整複製，區分大小寫）：
> `Medical Image` · `Smart Agriculture` · `Medical Data` · `Biosensing` · `NA`

---

### 4.2 成員畢業（在讀 → 校友）

在 `members` 工作表中找到該成員的列，更新以下欄位：

| 欄位 | 更新為 |
|---|---|
| `status` | `alumni` |
| `year_grad` | 畢業年份，例如 `2026` |
| `thesis_url` | NTU 電子論文系統連結，例如 `https://tdr.lib.ntu.edu.tw/...` |
| `research_title_en` | 更新為正式論文題目（英文） |
| `research_title_zh` | 更新為正式論文題目（中文） |

更新後，該成員將自動從「團隊」頁面移至「校友」區塊顯示。

> 若論文因**專利保護無法公開**，`thesis_url` 填入 `NA`。網站上論文題目將以純文字顯示，不設超連結。

---

### 4.3 新增論文

前往 `publications` 工作表，新增一列：

| 欄位 | 填寫內容 | 範例 |
|---|---|---|
| `year` | 發表年份 | `2024` |
| `pub_type` | `journal`（期刊）或 `conference`（研討會） | `journal` |
| `domain` | 研究領域（同上方四個值） | `Medical Image` |
| `citation` | 完整引用格式，直接貼入原文 | `Cheng-Ying Chou et al., "Title...", Nature (2024)` |
| `doi` | 完整 DOI 網址（選填） | `https://doi.org/10.1038/...` |

新增後，論文將自動依年份排序，出現在發表頁面的對應年份區塊中。

---

### 4.4 新增活動紀錄

前往 `gallery` 工作表。每張照片新增**一列**。若同一活動有三張照片，即新增三列，`date`、`type`、`title` 填相同內容。

| 欄位 | 填寫內容 | 範例 |
|---|---|---|
| `date` | 日期，格式 `YYYY-MM-DD` | `2026-06-01` |
| `type` | `academic`（學術）或 `extracurricular`（課外） | `extracurricular` |
| `title_en` | 活動名稱（英文） | `2026 Lab Graduation Dinner` |
| `title_zh` | 活動名稱（中文） | `2026 畢業聚餐` |
| `remark` | 活動補充說明（選填）。無說明填 `NA` | `慶祝五位成員順利畢業。` |
| `photo_filename` | 照片檔名（見第 5 節） | `2026-graduation-01.jpg` |

---

## 5. 新增或更換照片

照片存放在本 Repo 的 `public/assets/` 資料夾中。需要先將圖片上傳至 GitHub，再在 Google Sheets 對應列填入檔名。

### 照片規格

| 類型 | 存放資料夾 | 比例 | 建議檔案大小 | 命名格式 |
|---|---|---|---|---|
| 成員照片 | `public/assets/members/` | 3:4（直式） | ≤ 200 KB | `firstname-lastname.jpg` |
| 活動照片 | `public/assets/gallery/` | 4:3（橫式） | ≤ 300 KB | `YYYY-活動名稱-NN.jpg` |
| 教授照片 | `public/assets/pi/` | 4:3（橫式） | ≤ 300 KB | `chou-cheng-ying.jpg` |

> 上傳前請先壓縮圖片，推薦使用免費工具 [Squoosh](https://squoosh.app)（網頁版，不需安裝）。JPEG 品質設定 80 即可。

### 如何上傳照片（不需要任何程式基礎）

1. 在瀏覽器中開啟本 GitHub Repo。
2. 點擊進入對應資料夾（例如 `public/assets/members/`）。
3. 點選右上角 **Add file → Upload files**。
4. 將壓縮好的圖片檔案拖入上傳區域。
5. 頁面下方填寫簡短的說明（例如 `新增張靖涵的照片`），按下 **Commit changes**。
6. GitHub Actions 將自動在約 2 分鐘內重新部署網站。
7. 在 Google Sheets 對應列的 `photo_filename` 欄填入圖片的確切檔名。

### 預設（佔位）照片

若成員或活動尚未有照片，`photo_filename` 欄位留空即可，網站會自動顯示預設佔位圖片：

- 成員：`public/assets/members/default.jpg`
- 活動：`public/assets/gallery/default.jpg`

隨時替換這兩個檔案，即可全站更新佔位圖樣式。

---

## 6. 本地端開發環境設定（開發者）

### 事前準備

- [Node.js](https://nodejs.org) 版本 20 以上
- [Git](https://git-scm.com)

### 步驟

```bash
# 複製 repo 到本機
git clone https://github.com/YOUR-ORG/cibi-lab.git
cd cibi-lab

# 安裝相依套件
npm install

# 啟動本地開發伺服器
npm run dev
```

開啟 `http://localhost:4321` 即可預覽網站。修改原始碼後會即時熱更新。

### 建置正式版本（部署前測試）

```bash
npm run build
npm run preview   # 在 http://localhost:4321 預覽正式版本
```

---

## 7. 部署流程

**部署完全自動化。** 任何推送至 `main` 分支的 commit 都會觸發 GitHub Actions 工作流程，依序執行：

1. 安裝相依套件
2. 執行 `npm run build` 建置網站
3. 將輸出結果發布至 GitHub Pages

可在本 Repo 的 **Actions** 頁籤監控部署狀態，綠色勾號代表部署成功。

> **首次設定**：前往 **Settings → Pages → Source**，選擇 **GitHub Actions**。

---

## 8. 專案檔案結構

```
cibi-lab/
├── public/                       ← 靜態檔案，直接提供下載（照片、favicon、LOGO）
│   └── assets/
│       ├── logo/                 ← CIBIL_LOGO.png（透明背景版本）
│       ├── pi/                   ← 教授照片
│       ├── members/              ← 成員照片 + default.jpg
│       └── gallery/              ← 活動照片 + default.jpg
│
├── src/
│   ├── layouts/
│   │   └── BaseLayout.astro      ← 共用的 Navbar、Footer、頁面過渡動畫包裝
│   │
│   ├── components/               ← UI 元件，依頁面分資料夾
│   │   ├── Navbar.astro
│   │   ├── Footer.astro
│   │   ├── home/
│   │   ├── publications/
│   │   ├── research/
│   │   ├── team/
│   │   └── activities/
│   │
│   ├── pages/                    ← 一個 .astro 檔案對應一個網址
│   │   ├── index.astro           ← /（首頁）
│   │   ├── publications.astro    ← /publications
│   │   ├── research.astro        ← /research
│   │   ├── team.astro            ← /team
│   │   ├── activities.astro      ← /activities
│   │   └── 404.astro             ← 找不到頁面時顯示
│   │
│   ├── lib/                      ← 資料抓取與 CSV 解析邏輯
│   │   ├── fetchSheets.ts
│   │   ├── parseMembers.ts
│   │   ├── parsePublications.ts
│   │   └── parseGallery.ts
│   │
│   ├── types/index.ts            ← TypeScript 型別定義
│   ├── constants/sheets.ts       ← Google Sheets CSV 網址（如需更換在此修改）
│   ├── i18n/                     ← 靜態 UI 文字（中英文版本）
│   │   ├── en.ts
│   │   └── zh.ts
│   └── styles/global.css         ← 設計規格變數、基礎樣式、工具類別
│
├── astro.config.mjs              ← Astro 設定（網站網址、整合套件）
├── tailwind.config.mjs           ← Tailwind 色彩規格與字型設定
├── package.json
└── README.md                     ← 英文版說明文件
```

---

## 9. 設計規格速查

### 色彩規格（Slate Teal 藍灰青綠）

| 變數 | 色碼 | 用途 |
|---|---|---|
| `--color-brand` | `#0F6680` | 主要按鈕、啟用的導覽連結、強調色 |
| `--color-brand-dark` | `#0A4A5E` | Navbar 背景、hover 狀態 |
| `--color-brand-mid` | `#4BA5BF` | 次要標籤、日期、統計數字 |
| `--color-brand-light` | `#C0DDE6` | 卡片邊框、分隔線、標籤邊框 |
| `--color-brand-wash` | `#DCF0F5` | 標籤背景、照片佔位底色 |
| `--color-page-bg` | `#F5F9FA` | 頁面背景 |
| `--color-heading` | `#162A30` | 標題文字 |
| `--color-body` | `#2E5F6E` | 內文文字 |
| `--color-surface` | `#FFFFFF` | 卡片背景、Navbar 背景 |

### 研究領域標籤 CSS Class

| Class | 對應領域 |
|---|---|
| `.tag-medical` | Medical Image（醫療影像） |
| `.tag-agri` | Smart Agriculture（智慧農業） |
| `.tag-data` | Medical Data（醫療資料） |
| `.tag-biosense` | Biosensing（生物感測） |

### 字型

| 語言 | 字型 | 使用字重 |
|---|---|---|
| 英文 | DM Sans | 400（一般）、500（中粗） |
| 中文 | Noto Sans TC | 300（細體）、500（中粗） |
| 引用格式 | JetBrains Mono | 400 |

---

## 10. 常見問題排解

**Google Sheets 已更新，但網站沒有變化。**
Google Sheets CSV 有幾分鐘的快取。等待約 5 分鐘後，執行強制重新整理（`Ctrl+Shift+R` 或 `Cmd+Shift+R`）。

**成員照片沒有顯示。**
請確認：（1）Google Sheets 的 `photo_filename` 欄與 `public/assets/members/` 資料夾中的檔名完全相同，包含大小寫與副檔名。（2）照片已成功 commit，且 GitHub Actions 部署已完成（可在 Actions 頁籤確認）。

**GitHub Actions 部署失敗。**
前往 **Actions** 頁籤，點擊失敗的工作流程，閱讀錯誤訊息。最常見的原因是最近修改的 `.astro` 或 `.ts` 檔案有語法錯誤。修正後重新推送即可。

**Google Sheets CSV 網址失效。**
試算表可能已取消發布。開啟 Google Sheets 檔案 → 檔案 → 共用 → 發布到網路 → 重新發布每個工作表為 CSV 格式。若網址有變動，更新 `src/constants/sheets.ts` 中對應的網址。

**需要修改教授資訊（學經歷、課程、研究主題）。**
這些靜態內容直接寫在 `src/i18n/en.ts`（英文）和 `src/i18n/zh.ts`（中文）中。編輯對應欄位後推送至 `main` 分支即可。

---

*如有網站相關問題，請聯絡當前的網站維護負責人，或在本 Repo 開啟 Issue。*
