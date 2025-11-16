# International Logistics Website Roadmap (Next.js + MDX)

## Phase 0 – Preparation (Week 0)
- Finalize sitemap & navigation labels
- Map primary keyword per service page
- Collect case study data (challenge, solution, metrics)
- Gather partner logos (SVG/PNG) & alt text
- Decide Pages vs App Router (default: Pages for simplicity)
- Confirm company name for meta templates

## Phase 1 – Foundation (Weeks 1–2)
- Initialize Next.js project & repo
- Configure TypeScript, ESLint, Prettier (optional)
- Global layout: header, nav, footer, responsive grid
- Theme tokens (colors, spacing, typography) or Tailwind setup
- Implement breadcrumb component (derives from route segments)
- Basic pages scaffolding (index, about-us, inquiry)

## Phase 2 – Content Infrastructure (Week 3)
- Add MDX support (contentlayer or next-mdx-remote)
- Define content folders: services, cases, articles
- Frontmatter schema (service, case, article fields)
- Draft example MDX files (1 service, 1 case, 1 article)
- Utility to load published vs draft content

## Phase 3 – Page Templates & Components (Weeks 4–5)
- Service detail template + services index grid
- Case studies index (category tabs) + case detail page
- Industry information landing + category listing + article detail page
- Carousel component (slides managed via JSON/MDX)
- Advantage/Service scope icon grid
- Partner logos wall
- Popular links footer groups
- Related content component (services ↔ cases ↔ articles)

## Phase 4 – Inquiry System (Week 6)
- Inquiry form (validation, honeypot, CAPTCHA stub)
- API route `POST /api/inquiry` (store lead + send email)
- Simple persistence (SQLite via Prisma or JSON file initially)
- Success confirmation & thank-you UX

## Phase 5 – SEO Layer (Week 7)
- Dynamic meta title/description generator
- JSON-LD: Organization, BreadcrumbList, Service, Article, (FAQ later)
- XML sitemap generator script (published content only)
- robots.txt (allow prod, disallow drafts)
- Open Graph/Twitter cards

## Phase 6 – Performance & QA (Week 8)
- Image optimization: Next/Image, WebP/AVIF
- Lighthouse audit & Core Web Vitals tweaks (preload hero, fonts)
- 404 page + redirect map (for slug changes)
- Accessibility checks (alt text, landmarks)

## Phase 7 – Content Population (Week 9)
- All service pages (6 core + optional more-services)
- Articles: 3 per category (company-news, media-reports, industry-updates)
- Case studies: 4–6 with metrics
- Partner entries (logos + descriptions)

## Phase 8 – Launch & Monitoring (Week 10)
- Deploy to Vercel (ISR if needed)
- Configure Analytics (GA4 or Plausible)
- Verify Search Console & submit sitemap
- Error tracking (Sentry) & uptime monitoring

## Phase 9 – Growth Iteration (Post-Launch)
- Add FAQ sections (FAQPage schema) to service pages
- Internal linking optimization (automated related content)
- Quarterly content review (refresh older articles)
- Lead export (CSV) + basic dashboard
- Multilingual planning (`/en/`, `/zh/`) hreflang strategy

## Milestone Acceptance Criteria
- Foundation: Navigation + footer + baseline pages render
- Content Infrastructure: MDX parsing & published filtering works
- Templates: All index/detail pages display sample content
- Inquiry: Submissions stored & email sent
- SEO Layer: Rich Results test passes for Article & Breadcrumb
- Performance: LCP < 2.5s mobile on test pages
- Population: All planned content present & indexed (no 404s)
- Launch: Sitemap submitted, analytics collecting data

## Key Risks & Mitigations
- Thin service content → enforce minimum word count & FAQs
- Form spam → honeypot + conditional CAPTCHA + rate limiting
- Slug changes → maintain redirects file; avoid frequent edits
- Build time scaling → use ISR for frequent article additions
- Image bloat → standardized image sizes + compression pipeline

## Tools & Libraries (Proposed — 深圳时必达国际物流)
- Next.js (Pages Router) + TypeScript
- MDX via Contentlayer
- Styling: Tailwind CSS (or CSS Modules)
- Forms: React Hook Form (optional)
- Email: Resend or SendGrid API
- DB: SQLite (dev) → Postgres (prod) via Prisma (minimal)
- Analytics: GA4 or Plausible
- CAPTCHA: hCaptcha or reCAPTCHA v3
- Deployment: Vercel

## Immediate Next Steps
1. Confirm router choice (Pages vs App)
2. Define brand palette for 深圳时必达国际物流
3. Supply primary keywords list
4. Gather initial case metrics & partner logos
5. Decide email service for inquiries
