# Design Brief — Backend Developer Personal Portfolio

> Use this document as the prompt/context for **Stitch AI** (or any AI UI tool) to generate a Figma-ready design.
> It describes the product, the real backend data structure, how the site works, the design system, and every screen to design.

---

## 1. Product summary

A **personal portfolio + CV website for a backend developer** (Django/Python). It is a single, long, scroll-based **landing page** (not separate pages) plus one standalone **printable Resume/CV page**. Top navigation buttons smooth-scroll to sections on the same page.

- **Owner:** Abilov Dilshod Bekzod o'g'li — Backend Developer
- **Brand:** "CodeDevion" emblem logo (a glowing `</>` code mark) + the owner's name
- **Languages:** fully trilingual — **Uzbek (uz), English (en), Russian (ru)**. A language switcher in the header changes ALL content, including the CV.
- **Themes:** **Dark and Light** mode (dark is primary), toggled in the header.
- **Vibe:** modern, clean, "developer/terminal" aesthetic — monospace accents, subtle glow, dot-grid background, smooth micro-animations. Think Vercel / Linear / a polished dev portfolio.

---

## 2. Tech stack (for context)

- **Backend:** Django + Django REST Framework, PostgreSQL, Redis, Celery, Docker. REST API under `/api/v1/`.
- **Frontend:** Next.js (App Router) + Tailwind CSS, next-intl (i18n), next-themes (dark/light).
- The frontend fetches all dynamic content from the REST API.

---

## 3. Backend data structure (drives the content)

The design must present these real entities. Each is a REST resource.

### 3.1 Skills — `GET /api/v1/skills/`
Fields: `name`, `category` (one of: `backend`, `database`, `devops`, `tools`, `design`, `other`), `proficiency_level` (1–100), `years_experience`, `icon_url`, `order`.
Example data: Python, Django, Django REST Framework, PostgreSQL, Redis, Docker, Linux, Nginx, Git, GitHub, GitLab, AI/LLM, Machine Learning, Computer Vision (YOLO), OpenCV. (~23 skills.) **No front-end skills.**

### 3.2 Projects — `GET /api/v1/portfolio/projects/`
Fields: `name`, `description_uz/en/ru`, `technologies` (string array), `github_url`, `demo_url`, `is_private` (bool), `project_type` (`pet`/`work`/`opensource`), `status` (`active`/`completed`/`archived`), `is_featured` (bool), `images` (array of {image, caption}).
Example: Bellissimo Bot (Telegram bot), Voice AI Agent, Education Platform, Kahoot Clone, AI Chatbot, Git Report (AI commit analyzer), Government projects (UZINFOCOM).
**Private projects** show a lock icon + a warning note ("This project is private — only authorized users can access it").

### 3.3 Experience — `GET /api/v1/experience/`
Fields: `company`, `position`, `description_uz/en/ru`, `start_date`, `end_date` (null = current), `technologies`, `responsibilities`.
Example: UZINFOCOM — Backend Developer (2026 – present).

### 3.4 Academic works — `GET /api/v1/academic/works/`
Fields: `title_uz/en/ru`, `abstract_uz/en/ru`, `work_type` (`thesis`/`course`/`dgu`/`article`/`conference`/`certificate`), `year`, `keywords`, `authors`, `supervisor`, `file` (PDF), `source_url`, `doi`, `openaire_url`, `certificate_url`, `diploma_url`.
Example: conference papers (ICMSI, EIMRC), a journal article, a thesis, a software certificate (DGU), an award certificate.

### 3.5 Social links — `GET /api/v1/contact/socials/`
Fields: `platform` (github/linkedin/telegram/instagram/twitter/youtube/facebook/email/website), `label`, `url`, `order`.

### 3.6 Contact — `POST /api/v1/contact/send/`
A message form: `name`, `email`, `subject_type` (job/collab/question/other), `message`.

### 3.7 Blog (exists in backend, optional to design) — `GET /api/v1/blog/`
Articles with `title_*`, `cover_image`, `category`, `tags`, `read_time`, `published_at`. Not yet shown on the site; design an optional Blog section/cards if desired.

---

## 4. Site architecture & sections (single scrolling page)

Order from top to bottom. Header is sticky; nav links scroll to the matching section and the active section is highlighted (scroll-spy).

1. **Header (sticky):** brand logo (emblem + name with a subtle particle animation over the name) on the left; nav (Home, About, Skills, Projects, Academic, Contact) center/right; language switcher + theme toggle on the right. Clicking the logo opens a centered full-screen "showcase" overlay (big animated logo + name).
2. **Hero:** "Open to work" status pill (pulsing dot); greeting "Hi, my name is"; large gradient **name** with a small floating logo beside it and tiny particles drifting over the letters; role line "Backend Developer"; short bio; CTA buttons **[View Projects →] [Download Resume ↓]**; row of social icons. Background: dot-grid + soft accent glow.
3. **Tech marquee:** an infinite horizontal scrolling strip of technology chips (Python, Django, PostgreSQL, Docker…), with edge fades.
4. **Stats:** 4 metric tiles (e.g., Projects, Technologies, Years exp., Articles).
5. **About:** two large image cards side by side — **Education (university)** and **Work (company)**. Each card is ~75% photo / ~25% text (period, title, place) with a small secondary thumbnail in the corner. Below: a grid of "principles/values" with check icons.
6. **Skills:** filterable grid by category (All, Backend, Database, DevOps, Tools, …). Each skill shows name + proficiency (e.g., a bar or level). 
7. **Projects:** filterable grid of project cards (filter by type/tech). Card = title, status dot, type badge, description, tech badges, links (Code / Demo). Private projects show a lock + warning note.
8. **Academic (Scientific works):** grid of cards — type badge (Thesis/Article/DGU/Conference/Certificate) + year, title, abstract, keywords, supervisor, a small **certificate/diploma image thumbnail** (click to enlarge), and link chips (DOI · Source · OpenAIRE · PDF).
9. **Contact:** left = message form (name, email, subject select, message, send button); right = social links as a 2-column grid of labeled cards.
10. **Footer:** brand logo + tagline; quick anchor nav; social icons; copyright. (Hidden when printing.)

### Standalone screen
11. **Resume / CV page** (`/resume`, separate route): a clean A4 "paper" styled like a classic resume, renders in the selected language, with a **"Download PDF"** button (browser print → save as PDF). Sections: Header (photo + name + role + phone/email/location), Summary, Experience, Projects, Education, Skills (grouped by category), Languages, Certifications & Publications. White background, dark text, single accent color, must fit on one page.

---

## 5. Design system

### Colors (CSS variables already used)
**Dark (primary):**
- background `#0a0a0a`, background-alt `#111111`, surface `#1a1a1a`, border `#2a2a2a`
- foreground `#ffffff`, muted `#a0a0a0`
- **accent `#00d9ff`** (cyan), accent-hover `#33e1ff`, accent-foreground `#0a0a0a`

**Light:**
- background `#ffffff`, background-alt `#f8f8f8`, surface `#f2f2f2`, border `#e5e5e5`
- foreground `#0a0a0a`, muted `#555555`
- **accent `#0066cc`** (blue), accent-foreground `#ffffff`

Gradients: text gradient from foreground → accent. Accent glow blobs (blurred radial) behind hero/cards.

### Typography
- **Sans:** Geist (UI text).
- **Mono:** JetBrains Mono (logo, code-style labels, periods/years, eyebrows, terminal accents).
- Big bold headings; mono used for small "developer" labels and the brand.

### Shape & style
- Rounded corners (cards `rounded-2xl`, chips `rounded-lg/full`).
- Thin borders + subtle shadow/glow on hover.
- **Dot-grid** background in hero; soft blurred accent glows.
- Status pill with a pulsing green dot.
- Badges/chips for tech, types, statuses.

### Signature animations (express in the design as motion notes)
- Brand name: tiny **particles drifting/scattering** over the letters.
- About card images **auto-swap every 2s** with a **"shatter" effect** (the big image breaks into many tiny tiles that fly toward the small thumbnail; the thumbnail grows into the big slot). Also triggerable by clicking the thumbnail.
- Logo: gentle **float** + a slowly **rotating conic-gradient glow ring**.
- Infinite **marquee** for tech chips.
- Smooth fade-up on section reveal; smooth anchor scrolling with active-link highlight.

---

## 6. Internationalization & theming
- Every text block has uz/en/ru variants; the **language switcher** in the header swaps all content live, including the CV.
- **Theme toggle** switches dark/light; all tokens above must have both variants. Dark is the default/primary look.

---

## 7. What to generate in Stitch (screen list)

Please produce these screens, in **dark mode first**, then light variants, desktop + mobile:

1. **Landing — Hero** (with header, status pill, gradient name + floating logo, CTAs, socials, dot-grid + glow).
2. **Landing — About** (two 75%-image place-cards: education + work, with the shatter-swap thumbnails; values grid).
3. **Landing — Skills** (category filter + skill grid with proficiency).
4. **Landing — Projects** (filter bar + project cards, including a **private** card with lock + warning).
5. **Landing — Academic** (cards with type badge, certificate thumbnail, DOI/Source/OpenAIRE/PDF chips).
6. **Landing — Contact + Footer** (form + 2-col social cards + footer).
7. **Header states** (logo showcase overlay; mobile menu; language + theme controls).
8. **Resume / CV page** (printable A4, single accent color, photo + name header, all CV sections, Download PDF button) — show uz/en/ru variants if possible.
9. **(Optional) Blog** section/cards.

### Guidance for the designer/AI
- Keep it **clean, modern, developer-themed**; mono accents; cyan-on-near-black for dark, blue-on-white for light.
- Use real-feeling content from section 3 (real project/skill/academic names) so the layout is realistic.
- Emphasize the **brand logo + animated name**, the **image place-cards in About**, and the **academic cards with certificate thumbnails** — these are the standout pieces.
- Reusable components: header/nav, brand logo, status pill, stat tile, skill chip/bar, project card, academic card, place-card (image + text), social card, badges/chips, buttons (primary accent + outline), form inputs, footer.

---

*End of brief. Paste this into Stitch AI as the project description/prompt, then ask it to generate the screens listed in section 7.*
