# CIBI Lab — Official Website

[📖 閱讀中文版說明](./README.md)

**智慧演算生醫影像實驗室　官方網站**

Live site: `https://YOUR-ORG.github.io/cibi-lab` *(update after first deploy)*

---

## Table of Contents

1. [Overview](#1-overview)
2. [Tech Stack](#2-tech-stack)
3. [How the site works](#3-how-the-site-works)
4. [Day-to-day content updates (Google Sheets)](#4-day-to-day-content-updates-google-sheets)
5. [Adding or replacing photos](#5-adding-or-replacing-photos)
6. [Setting up locally (for developers)](#6-setting-up-locally-for-developers)
7. [Deploying changes](#7-deploying-changes)
8. [Project file structure](#8-project-file-structure)
9. [Design tokens quick reference](#9-design-tokens-quick-reference)
10. [Troubleshooting](#10-troubleshooting)

---

## 1. Overview

This is the official website of the Computational Intelligence in Biomedical Imaging Laboratory (CIBI Lab), Department of Biomechatronics Engineering, National Taiwan University, led by Prof. Cheng-Ying Chou.

The site has five pages: **Home**, **Publications**, **Research**, **Team**, and **Activities**.

Most content (members, publications, gallery) is maintained through a single **Google Sheets file** — no coding required for routine updates. Code changes are only needed for visual redesigns or adding new features.

---

## 2. Tech Stack

| Component | Technology | Why |
|---|---|---|
| Site framework | [Astro](https://astro.build) | Fast static output, component-based |
| Styling | [Tailwind CSS](https://tailwindcss.com) | Responsive design, design tokens |
| Content database | Google Sheets (published as CSV) | Zero-cost, editable by anyone |
| Photo storage | This GitHub repository (`public/assets/`) | Fast global CDN via GitHub Pages |
| Hosting | [GitHub Pages](https://pages.github.com) | Free, auto-deploys on push |
| Page transitions | Astro View Transitions API | Smooth navigation between pages |
| Scroll animations | [Anime.js](https://animejs.com) + Intersection Observer | Elements animate in as you scroll |
| Language | TypeScript | Type-safe data parsing |

---

## 3. How the site works

```
User visits the site
        │
        ▼
GitHub Pages serves the pre-built HTML/CSS/JS
        │
        ▼
Browser runs a small JavaScript snippet
that fetches the latest CSV data from Google Sheets
        │
        ▼
Page renders with up-to-date content
```

This means:

- **Changing text/data** → edit Google Sheets → refresh the page. No deployment needed.
- **Changing photos** → add the image file to this repo → push to `main`. GitHub Actions auto-deploys in ~2 minutes.
- **Changing layout or design** → edit `.astro` or `.css` source files → push to `main`. Auto-deploys.

---

## 4. Day-to-day content updates (Google Sheets)

Open the Google Sheets file. It has three worksheets (tabs at the bottom):

| Tab | Controls |
|---|---|
| `members` | Current students, alumni, research assistant |
| `publications` | All journal and conference papers |
| `gallery` | Activity photos and event records |

Changes take effect immediately after saving — just reload the website to see them.

---

### 4.1 Adding a new member

Go to the `members` tab. Add a new row. Fill in the columns:

| Column | What to fill | Example |
|---|---|---|
| `name_en` | English name, all caps | `CHING-HAN CHANG` |
| `name_zh` | Chinese name | `張靖涵` |
| `group` | `ai` or `statistics` or `ra` | `ai` |
| `status` | `current` | `current` |
| `degree_type` | `ms` or `phd` or `ra` | `ms` |
| `year_joined` | Year they joined the lab | `2025` |
| `year_grad` | Leave blank for current students | *(blank)* |
| `domain` | Their research domain | `Medical Image` |
| `research_title_en` | Working research title (English) | `Deep Learning for CT Segmentation` |
| `research_title_zh` | Working research title (Chinese) | `深度學習應用於CT影像分割` |
| `thesis_url` | Leave blank until thesis is published | *(blank)* |
| `email` | NTU email address (optional) | `r14631006@ntu.edu.tw` |
| `photo_filename` | Photo filename (see Section 5) | `chang-ching-han.jpg` |

> **Domain values** (copy exactly, case-sensitive):
> `Medical Image` · `Smart Agriculture` · `Medical Data` · `Biosensing` · `NA`

---

### 4.2 Graduating a member (current → alumni)

Find the member's row in the `members` tab and update three columns:

| Column | Change to |
|---|---|
| `status` | `alumni` |
| `year_grad` | Their graduation year, e.g. `2026` |
| `thesis_url` | NTU TDR link, e.g. `https://tdr.lib.ntu.edu.tw/...` |
| `research_title_en` | Update to official thesis title |
| `research_title_zh` | Update to official thesis title (Chinese) |

The member will automatically move from the Members section to the Alumni section on the website.

> If the thesis is **patent-protected and cannot be made public**, fill `thesis_url` with `NA`. The thesis title will display as plain text without a hyperlink.

---

### 4.3 Adding a publication

Go to the `publications` tab. Add a new row:

| Column | What to fill | Example |
|---|---|---|
| `year` | Publication year | `2024` |
| `pub_type` | `journal` or `conference` | `journal` |
| `domain` | Research domain (same 4 values as above) | `Medical Image` |
| `citation` | Full citation text, paste as-is | `Cheng-Ying Chou et al., "Title...", Nature (2024)` |
| `doi` | Full DOI URL (optional) | `https://doi.org/10.1038/...` |

The publication will automatically appear on the Publications page under the correct year, sorted newest first.

---

### 4.4 Adding an activity / event

Go to the `gallery` tab. Add one row **per photo**. If an event has three photos, add three rows with the same `date`, `type`, and `title`.

| Column | What to fill | Example |
|---|---|---|
| `date` | Date in `YYYY-MM-DD` format | `2026-06-01` |
| `type` | `academic` or `extracurricular` | `extracurricular` |
| `title_en` | Event name (English) | `2026 Lab Graduation Dinner` |
| `title_zh` | Event name (Chinese) | `2026 畢業聚餐` |
| `remark` | Extra notes (optional). If none, fill `NA` | `Celebrating five graduating members.` |
| `photo_filename` | Photo filename (see Section 5) | `2026-graduation-01.jpg` |

---

## 5. Adding or replacing photos

Photos are stored in this repository under `public/assets/`. You need to upload a file to GitHub and then update the corresponding row in Google Sheets.

### Photo specifications

| Type | Folder | Aspect ratio | Recommended size | Filename format |
|---|---|---|---|---|
| Member photos | `public/assets/members/` | 3:4 (portrait) | ≤ 200 KB | `firstname-lastname.jpg` |
| Activity photos | `public/assets/gallery/` | 4:3 (landscape) | ≤ 300 KB | `YYYY-event-slug-NN.jpg` |
| PI photo | `public/assets/pi/` | 4:3 (landscape) | ≤ 300 KB | `chou-cheng-ying.jpg` |

> Compress photos before uploading using [Squoosh](https://squoosh.app) (free, browser-based). Target JPEG quality 80%.

### How to upload a photo (no coding required)

1. Go to this repository on GitHub.
2. Navigate to the correct folder (e.g. `public/assets/members/`).
3. Click **Add file → Upload files**.
4. Drag in the compressed image file.
5. Scroll down, write a short commit message (e.g. `Add photo for Chang Ching-Han`), click **Commit changes**.
6. GitHub Actions will automatically rebuild and redeploy the site in about 2 minutes.
7. Update the `photo_filename` column in Google Sheets with the exact filename.

### Default (fallback) photos

If a member or activity has no photo yet, leave `photo_filename` blank in Google Sheets. The site will automatically show the default placeholder image:

- Members: `public/assets/members/default.jpg`
- Gallery: `public/assets/gallery/default.jpg`

Replace these files at any time to change the placeholder appearance site-wide.

---

## 6. Setting up locally (for developers)

### Prerequisites

- [Node.js](https://nodejs.org) version 20 or later
- [Git](https://git-scm.com)

### Steps

```bash
# Clone the repository
git clone https://github.com/YOUR-ORG/cibi-lab.git
cd cibi-lab

# Install dependencies
npm install

# Start the local development server
npm run dev
```

The site will be available at `http://localhost:4321`. Changes to source files hot-reload automatically.

### Build for production (test before deploying)

```bash
npm run build
npm run preview   # Preview the production build at http://localhost:4321
```

---

## 7. Deploying changes

**Deployment is fully automatic.** Any commit pushed to the `main` branch triggers a GitHub Actions workflow that:

1. Installs dependencies
2. Builds the site with `npm run build`
3. Publishes the output to GitHub Pages

You can monitor the deployment status under the **Actions** tab in this repository. A green checkmark means the deploy succeeded.

> First-time setup: go to **Settings → Pages → Source** and select **GitHub Actions**.

---

## 8. Project file structure

```
cibi-lab/
├── public/                     ← Static files served directly (photos, favicon, logo)
│   └── assets/
│       ├── logo/               ← CIBIL_LOGO.png
│       ├── pi/                 ← PI photo
│       ├── members/            ← Member photos + default.jpg
│       └── gallery/            ← Activity photos + default.jpg
│
├── src/
│   ├── layouts/
│   │   └── BaseLayout.astro    ← Shared navbar, footer, page transition wrapper
│   │
│   ├── components/             ← UI building blocks, one folder per page
│   │   ├── Navbar.astro
│   │   ├── Footer.astro
│   │   ├── home/
│   │   ├── publications/
│   │   ├── research/
│   │   ├── team/
│   │   └── activities/
│   │
│   ├── pages/                  ← One .astro file = one URL
│   │   ├── index.astro         ← /
│   │   ├── publications.astro  ← /publications
│   │   ├── research.astro      ← /research
│   │   ├── team.astro          ← /team
│   │   ├── activities.astro    ← /activities
│   │   └── 404.astro           ← shown on missing pages
│   │
│   ├── lib/                    ← Data fetching and CSV parsing logic
│   │   ├── fetchSheets.ts
│   │   ├── parseMembers.ts
│   │   ├── parsePublications.ts
│   │   └── parseGallery.ts
│   │
│   ├── types/index.ts          ← TypeScript type definitions
│   ├── constants/sheets.ts     ← Google Sheets CSV URLs (edit here if URLs change)
│   ├── i18n/                   ← Static UI strings (English and Chinese)
│   │   ├── en.ts
│   │   └── zh.ts
│   └── styles/global.css       ← Design tokens, base styles, utility classes
│
├── astro.config.mjs            ← Astro configuration (site URL, integrations)
├── tailwind.config.mjs         ← Tailwind colour tokens and font families
├── package.json
└── README.md                   ← This file
```

---

## 9. Design tokens quick reference

### Colour palette (Slate Teal)

| Token | Hex | Used for |
|---|---|---|
| `--color-brand` | `#0F6680` | Primary buttons, active nav link, accents |
| `--color-brand-dark` | `#0A4A5E` | Navbar background, hover states |
| `--color-brand-mid` | `#4BA5BF` | Secondary labels, dates, stat numbers |
| `--color-brand-light` | `#C0DDE6` | Card borders, dividers, pill borders |
| `--color-brand-wash` | `#DCF0F5` | Pill backgrounds, photo placeholders |
| `--color-page-bg` | `#F5F9FA` | Page background |
| `--color-heading` | `#162A30` | H1, H2, card names |
| `--color-body` | `#2E5F6E` | Body text |
| `--color-surface` | `#FFFFFF` | Card backgrounds, navbar |

### Domain tag classes

| Class | Domain |
|---|---|
| `.tag-medical` | Medical Image |
| `.tag-agri` | Smart Agriculture |
| `.tag-data` | Medical Data |
| `.tag-biosense` | Biosensing |

### Fonts

| Language | Font | Weights used |
|---|---|---|
| English | DM Sans | 400 (regular), 500 (medium) |
| Chinese | Noto Sans TC | 300 (light), 500 (medium) |
| Citations | JetBrains Mono | 400 |

---

## 10. Troubleshooting

**The website is not showing my Google Sheets update.**
Google Sheets CSV has a cache of a few minutes. Wait 5 minutes and do a hard refresh (`Ctrl+Shift+R` / `Cmd+Shift+R`).

**A member's photo is not showing.**
Check that: (1) the filename in `photo_filename` column exactly matches the file in `public/assets/members/` — including capitalisation and extension. (2) The file has been committed and the GitHub Actions deployment has completed (check the Actions tab).

**The GitHub Actions deployment failed.**
Go to the **Actions** tab, click the failed run, and read the error message. Most common cause: a syntax error in a recently edited `.astro` or `.ts` file. Fix the file and push again.

**The Google Sheets CSV URL stopped working.**
The sheet may have been unpublished. Open the Google Sheets file → File → Share → Publish to web → re-publish each tab as CSV. Update `src/constants/sheets.ts` if the URL has changed.

**I need to update the PI information (bio, courses, education).**
This content is written directly in `src/i18n/en.ts` (English) and `src/i18n/zh.ts` (Chinese). Edit the relevant fields and push to `main`.

---

*For questions about the website, contact the current lab maintainer or open an issue in this repository.*
