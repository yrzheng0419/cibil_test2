# CIBI Lab — Website Design & Development Specification

> Last updated: 2026-06-13
> Status: Design confirmed, pending development

---

## 1. Tech Stack

| Layer | Technology | Role |
|---|---|---|
| Framework | Astro | Static site generator, zero-JS by default |
| Styling | Tailwind CSS | RWD, utility-first layout |
| Data | Google Sheets → CSV | Headless CMS via client-side `fetch()` |
| Assets | GitHub Repository | Member photos, gallery images, logo |
| Hosting | GitHub Pages | Free static hosting, global CDN |
| Page transitions | Astro View Transitions API | `<ViewTransitions />` in layout |
| Scroll animations | Anime.js + Intersection Observer API | Element entrance animations |

---

## 2. Colour System

All colours are from the **Slate Teal (C scheme)** palette.

| Token | Hex | Usage |
|---|---|---|
| `--color-page-bg` | `#F5F9FA` | Page background |
| `--color-brand` | `#0F6680` | Primary accent, CTA buttons, active nav link |
| `--color-brand-dark` | `#0A4A5E` | Navbar, hover states |
| `--color-brand-mid` | `#4BA5BF` | Stat labels, secondary accents, links |
| `--color-brand-light` | `#C0DDE6` | Pill borders, card borders, dividers |
| `--color-brand-wash` | `#DCF0F5` | Pill backgrounds, photo placeholders |
| `--color-heading` | `#162A30` | H1, H2, card names |
| `--color-body` | `#2E5F6E` | Body text, descriptions |
| `--color-muted` | `#4BA5BF` | Dates, venues, secondary labels |
| `--color-surface` | `#FFFFFF` | Card backgrounds, navbar |

### Domain tag colours (used across all pages)

| Domain | Background | Text | Border |
|---|---|---|---|
| Medical Image | `#DCF0F5` | `#0A4A5E` | `#4BA5BF` |
| Smart Agriculture | `#EAF3DE` | `#27500A` | `#97C459` |
| Medical Data | `#FAEEDA` | `#633806` | `#EF9F27` |
| Biosensing | `#EEEDFE` | `#3C3489` | `#AFA9EC` |

---

## 3. Typography

| Role | Font | Weight | Size |
|---|---|---|---|
| English headings, body, UI | DM Sans (Google Fonts) | 400 / 500 | — |
| Chinese headings, body | Noto Sans TC (Google Fonts) | 300 / 500 | — |
| Citation text, code | JetBrains Mono | 400 | — |

Load via `<link>` in Astro layout:

```html
<link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500&family=Noto+Sans+TC:wght@300;500&family=JetBrains+Mono:wght@400&display=swap" rel="stylesheet">
```

---

## 4. Navigation

### Structure

- Logo (PNG file) — left
- Nav links — centre-right: **Home · Publications · Research · Team · Activities**
- Language toggle button (EN | 中) — rightmost, dark background `#162A30`, white text

### Page order

Home → Publications → Research → Team → Activities

### Scroll behaviour

- Sticky at top on scroll (`position: sticky; top: 0`)
- After scrolling past hero: add `backdrop-filter: blur(12px)` + semi-transparent white background (`background: rgba(255,255,255,0.85)`)
- Active page link: `color: #162A30; font-weight: 500; border-bottom: 1.5px solid #0F6680`
- No dividing lines between navbar and page content

---

## 5. Hero Section (Home)

### Layout

Two-column: left = text content, right = two floating pill CTAs

### Text content

**Eyebrow:** `WELCOME TO THE`
**English H1:** `Computational Intelligence in` / `Biomedical Imaging Laboratory`
**Chinese H1:** `智慧演算生醫影像實驗室`
**English subtitle:** `Department of Biomechatronics Engineering, National Taiwan University`
**Chinese subtitle:** `國立臺灣大學　生物機電工程學系`

**English body:**
> CIBI Lab develops AI methods that fuse heterogeneous data — medical images with clinical records, agricultural vision with robotic control — to generate insights that single-modality approaches cannot reach. We build tools that matter, grounded in rigorous mathematics and driven by real-world problems.

**Chinese body:**
> 智慧演算生醫影像實驗室以多模態人工智慧為核心，融合醫學影像與病歷資訊、農業視覺與機器人控制等異質資料，挖掘單一模態方法所無法觸及的洞見。我們相信嚴謹的數理基礎與真實問題的驅動，是每一次突破的起點。

### CTA Pill Anchors (right column)

Two vertically stacked pill-shaped buttons, `white-space: nowrap`:

- **Pill 1 (solid):** background `#0F6680`, white text — `Explore research` / `探索研究`
- **Pill 2 (ghost):** border `#C0DDE6`, body text colour — `Meet the team` / `認識團隊`

**Hover animation:** `padding-right` expands by 4px, arrow icon shifts right — suggests forward navigation.

**Click transition:** Astro View Transitions `slide-left` — current page slides left out, target page slides in from right.

### Stats row

Removed. No statistics display in hero.

---

## 6. PI Profile Section (Home)

### Layout

Two-column: left = photo + name + dept + affiliation pills, right = joint appointments + education timeline (left sub-column) + research interests + courses (right sub-column)

### Photo

- Ratio: **4:3** (landscape/horizontal)
- Placeholder: `public/assets/pi/default.jpg`

### Left column content

```
Prof. Cheng-Ying Chou          (EN)
周呈霙 教授                     (ZH)

Department of Biomechatronics Engineering, NTU   (EN)
國立臺灣大學　生物機電工程學系                    (ZH)
```

### Right column — Joint appointments

Displayed as plain text list above the divider, above Education:

```
EN:
  Master Program in Statistics
  Medical Devices and Imaging System
  Global Undergraduate Program in Semiconductors

ZH:
  統計碩士學位學程
  醫療器材與醫學影像研究所
  國際半導體學士學位學程
```

Thin divider line (`#EBF2FA`) separates joint appointments from education timeline.

### Right column — Education & experience

Timeline with dot indicators:

| Years | Role (EN) | Role (ZH) | Institution (EN) | Institution (ZH) |
|---|---|---|---|---|
| 2000–2005 | Ph.D., Chemical Engineering | 化學工程博士 | Rice University | 萊斯大學 |
| 2005–2007 | Senior Research Scientist | 資深研究員 | Illinois Institute of Technology, Biomedical Engineering | 伊黎諾理工學院，生物醫學工程系 |
| 2007–present | Professor, NTU Biomechatronics Engineering | 教授，國立臺灣大學生物機電工程學系 | — | — |

### Right column — Research interests

Display as coloured pill tags:

| EN | ZH | Domain colour |
|---|---|---|
| Medical Imaging AI | 醫療影像AI技術開發 | Medical Image (blue) |
| X-ray Phase Contrast Imaging | X光相位對比成像 | Medical Image (blue) |
| CT Image Reconstruction | 電腦斷層掃描影像重建 | Medical Image (blue) |
| Agricultural AI Applications | 人工智慧之農業應用 | Smart Agriculture (green) |
| Rapid Diagnostic Kit Development | 快篩檢測試劑研發 | Biosensing (purple) |

### Right column — Courses taught

Display as neutral pill tags (gray):

| EN | ZH |
|---|---|
| Experimental Design and Analysis in Engineering | 試驗設計之工程應用 |
| Probability and Statistics | 機率與統計 |
| Exploratory Multivariate Data Analysis | 探索式多變量資料分析 |

---

## 7. Publications Page

### Layout

Single column, grouped by year (newest first). No filters. No featured list.

### Each entry

```
[J/C]  Full citation text (DM Sans / JetBrains Mono)        [domain tag pill]
```

- `J` = journal (color `#8FADC7`), `C` = conference
- Citation: complete text from `citation` column in Google Sheets, no splitting
- Domain tag: coloured pill using domain colour system
- DOI: if present, wrap citation text in `<a href="doi">` link

### Floating back-to-top button

- Appears after user scrolls down 400px
- Position: bottom-right, `position: fixed; bottom: 24px; right: 24px`
- Style: circular button, background `#0F6680`, white arrow-up icon
- Hover: background darkens to `#0A4A5E`
- Animate in with Anime.js: `translateY(0)` from `translateY(16px)`, `opacity` 0 → 1

---

## 8. Research Page

### Layout

Top: four domain selector blocks (tabs). Below: content area for selected domain.

### Domain tabs

**Desktop:** icon + text label, full width divided into four equal columns.

**Mobile:** four circular icon-only buttons, centred, no text.

Default selected: **Medical Image**

### Each domain content area

Left column: **Recent Publications** (latest 3 from `publications` sheet filtered by domain)
Right column: **Recent Theses** (latest 3 from `members` sheet, `status=alumni`, filtered by domain, sorted by `year_grad` desc)

If no data: display subtle empty state text (`No records yet`)

### Domain descriptions (placeholder — to be updated)

| Domain | EN description |
|---|---|
| Medical Image | We develop computational methods for CT reconstruction, X-ray phase-contrast imaging, PET, and AI-assisted diagnosis — fusing imaging data with clinical records for multimodal insight. |
| Smart Agriculture | AIoT systems integrating computer vision with robotic control for precision farming — pest monitoring, crop yield prediction, and honeybee behaviour analysis. |
| Medical Data | Statistical and machine learning methods applied to electronic health records, clinical time-series, and multimodal patient data for early disease prediction and risk stratification. |
| Biosensing | Rapid diagnostic kit development, aptamer-protein binding prediction, and IoT-integrated biosensor design for clinical and environmental monitoring. |

---

## 9. Team Page

### Sections (in order, with section title displayed)

1. MSc students
2. PhD students
3. Alumni
4. Research assistant

### Sorting

- MSc / PhD: ascending `year_joined`
- Alumni: descending `year_grad`
- RA: no specific order

### Member card (MSc / PhD / RA)

- Photo ratio: **3:4** (portrait)
- Photo placeholder: `public/assets/members/default.jpg`
- Info below photo: name, group tag pill, `research_title`, email (if present)
- Width: 120px

### Alumni card

- Photo ratio: **3:4** (portrait)
- Photo placeholder: `public/assets/members/default.jpg`
- Info below photo: name + graduation year (e.g. `Jun Weng '23`), degree tag + group tag, `research_title` as link (if `thesis_url` present); plain text if not
- Width: 140px

### Group tag colours

| Group | Style |
|---|---|
| AI | Blue pill (`#E6F1FB` / `#0C447C`) |
| Statistics | Green pill (`#EAF3DE` / `#27500A`) |
| RA | Gray pill (`#F1EFE8` / `#444441`) |

---

## 10. Activities Page

### Layout

Vertically stacked year groups, **alternating left / right** by year:
- Even-indexed years (2026, 2024, 2022…): align left
- Odd-indexed years (2025, 2023, 2021…): align right

**Mobile:** all groups align left, no alternation.

Thin vertical connector line between year groups (`#D6E4F0`, 1px).

### Year heading

Large light-coloured year number (`#D6E4F0`, 22px), with short brand-colour underline below.

### Each year: horizontal scroll row of activity cards

- Card width: 180px, fixed
- Photo ratio: **4:3**
- Photo placeholder: `public/assets/gallery/default.jpg`
- Card info: title, date, type pill (`Academic` in blue / `Extracurricular` in purple)
- If `remark` ≠ NA: show remark text directly below a thin divider inside the card

### Asset folders

- Member photos: `public/assets/members/`
- Gallery photos: `public/assets/gallery/`
- Default placeholders: `default.jpg` in each respective folder

---

## 11. Footer

Minimal. Contains:

- Lab address
- Tel
- Email

No social links, no logo repeat, no copyright statement required.

---

## 12. Scroll Animation Plan (Anime.js + Intersection Observer)

All animations triggered by Intersection Observer (`threshold: 0.15`). Anime.js handles the actual transition.

| Page | Element | Animation | Stagger | Duration |
|---|---|---|---|---|
| All | Navbar on scroll | `backdrop-filter` + bg opacity via CSS transition | — | 200ms |
| Home | Hero text block | `opacity: 0→1`, `translateY: 20→0` | — | 600ms |
| Home | Hero pill CTAs | `opacity: 0→1`, `translateX: 12→0` | 120ms between pills | 400ms |
| Home | PI photo | `opacity: 0→1`, `scale: 0.97→1` | — | 500ms |
| Home | PI right column blocks | `opacity: 0→1`, `translateY: 12→0` | 100ms per block | 400ms |
| Publications | Year group headings | `opacity: 0→1`, `translateX: -8→0` | — | 350ms |
| Publications | Citation rows within group | `opacity: 0→1`, `translateY: 8→0` | 40ms per row | 300ms |
| Publications | Back-to-top button | `opacity: 0→1`, `translateY: 16→0` | — | 250ms |
| Research | Domain tab bar | `opacity: 0→1` | — | 300ms |
| Research | Domain content on tab switch | `opacity: 0→1`, `translateY: 8→0` | — | 300ms |
| Research | Publication / thesis rows | `opacity: 0→1`, `translateY: 8→0` | 60ms per row | 300ms |
| Team | Section titles | `opacity: 0→1`, `translateY: 10→0` | — | 350ms |
| Team | Member cards | `opacity: 0→1`, `translateX: -16→0` (left to right) | 80ms per card | 400ms |
| Activities | Year group headings | `opacity: 0→1`, `translateY: 8→0` | — | 350ms |
| Activities | Activity cards in row | `opacity: 0→1`, `translateX: -12→0` | 80ms per card | 350ms |

### Page transition (Astro View Transitions)

Add `<ViewTransitions />` to root layout. Use `transition:animate="slide"` on `<main>` for slide-left effect when navigating between pages.

---

## 13. Google Sheets Data Structure

Single file, three worksheets, each published as CSV.

### Sheet 1: `members`

| Column | Type | Required | Notes |
|---|---|---|---|
| `name_en` | text | ✓ | All caps |
| `name_zh` | text | | |
| `group` | enum | ✓ | `ai` / `statistics` / `ra` |
| `status` | enum | ✓ | `current` / `alumni` |
| `degree_type` | enum | ✓ | `ms` / `phd` / `ra` |
| `year_joined` | integer | ✓ | blank if unknown |
| `year_grad` | integer | | alumni only; blank if unknown |
| `domain` | enum | | `Medical Image` / `Smart Agriculture` / `Medical Data` / `Biosensing` / `NA` |
| `research_title_en` | text | ✓ | working title or confirmed thesis title |
| `research_title_zh` | text | | |
| `thesis_url` | url | | alumni only; `NA` if patent-protected or unavailable |
| `email` | text | | leave blank if not public |
| `photo_filename` | text | | e.g. `zhang-jing-han.jpg`; leave blank for default |

### Sheet 2: `publications`

| Column | Type | Required | Notes |
|---|---|---|---|
| `year` | integer | ✓ | |
| `pub_type` | enum | ✓ | `journal` / `conference` |
| `domain` | enum | ✓ | same four values as members |
| `citation` | long text | ✓ | full citation pasted verbatim |
| `doi` | url | | full URL e.g. `https://doi.org/…` |

### Sheet 3: `gallery`

| Column | Type | Required | Notes |
|---|---|---|---|
| `date` | date | ✓ | `YYYY-MM-DD` format |
| `type` | enum | ✓ | `academic` / `extracurricular` |
| `title_en` | text | ✓ | |
| `title_zh` | text | | fallback to EN if blank |
| `remark` | text | | `NA` if none |
| `photo_filename` | text | ✓ | e.g. `2026-christmas-01.jpg` |

---

## 14. Asset Folder Structure

```
public/
  assets/
    logo/
      CIBI_Lab_logo.png         ← navbar logo
    pi/
      chou-cheng-ying.jpg       ← PI photo (4:3)
    members/
      default.jpg               ← placeholder for missing member photos
      zhang-jing-han.jpg
      ...
    gallery/
      default.jpg               ← placeholder for missing activity photos
      2026-christmas-01.jpg
      ...
```

---

## 15. Bilingual Logic

Language toggle: single button in navbar switches between EN and ZH.

- Columns with `_en` / `_zh` suffix: front-end reads appropriate column based on active language
- `research_tags`, `doi`, `thesis_url`, `photo_filename`, all enum values: language-independent, shared
- `publications` sheet: no bilingual needed — academic citations are EN only
- If `_zh` field is blank: fall back to `_en` value (do not display empty string)

---

## 16. 404 Page

**Decision deferred.** Will be addressed during development phase. Suggested minimum: lab logo, "Page not found" message, link back to Home.

---

## 17. Outstanding Items (to be resolved during development)

- [ ] Confirm actual `year_joined` for alumni with `year_joined = 0`
- [ ] Confirm `year_grad` for Wan-Ting Wu, Hsiu-Tzu Liao, Si-Wei Chen
- [ ] Provide Research page domain description text (Chinese versions)
- [ ] Provide hero background video file (optional, loop autoplay)
- [ ] Upload member photos to `public/assets/members/`
- [ ] Upload gallery photos to `public/assets/gallery/`
- [ ] Confirm Google Analytics / tracking preference
- [ ] Design 404 page
- [ ] Set up Google Sheets CSV publish URLs for all three sheets
- [ ] Finalise Open Graph meta image for social sharing
