# Usage Guide (Content & Publishing)

## 1. Setup
- Install dependencies: `npm install`
- Dev server: `npm run dev`
- Environment variables (example):
  - `INQUIRY_EMAIL_TO` (sales inbox)
  - `EMAIL_API_KEY` (SendGrid/Resend)
  - `DATABASE_URL` (if using Postgres/Prisma)

## 2. Content Structure
- Services: `content/services/*.mdx`
- Cases: `content/cases/*.mdx`
- Articles:
  - `content/articles/company-news/*.mdx`
  - `content/articles/media-reports/*.mdx`
  - `content/articles/industry-updates/*.mdx`

## 3. Frontmatter Fields
Service:
```
type: service
title: "..."
slug: "..."
status: "published" | "draft"
primaryKeyword: "..."
secondaryKeywords: ["...", "..."]
excerpt: "Short summary"
advantages: ["...", "..."]
heroImage: "/images/services/slug.jpg"
publishDate: "YYYY-MM-DD"
```
Case:
```
type: case
title: "..."
slug: "..."
category: "sea" | "air" | "express" | "overseas-warehouse"
status: "published" | "draft"
relatedService: "service-slug"
challenge: "..."
solution: "..."
resultMetrics:
  transitTimeReductionPercent: 0
  costSavingPercent: 0
publishDate: "YYYY-MM-DD"
featuredImage: "/images/cases/slug.jpg"
```
Article:
```
type: article
title: "..."
slug: "..."
category: "company-news" | "media-reports" | "industry-updates"
status: "published" | "draft"
excerpt: "Short summary"
tags: ["tag1", "tag2"]
publishDate: "YYYY-MM-DD"
author: "Name"
featuredImage: "/images/articles/slug.jpg"
```

## 4. Adding New Content
1. Create MDX file with required frontmatter.
2. Write body (use headings H2/H3 for sections).
3. Ensure at least one internal link (e.g., link case to service).
4. Add alt text for images used in body.
5. Commit & push; build deploys and page appears if `status: published`.

## 5. Draft vs Published
- `draft`: excluded from sitemap, optionally marked `noindex`.
- `published`: included in sitemap & open to indexing.
- Change status then redeploy or wait for ISR revalidation.

## 6. SEO Checklist Before Publishing
- Unique primary keyword (no overlap with other pages).
- Meta title <= 60 chars; description 140–160 chars.
- One H1 only; descriptive H2/H3.
- Add FAQ section (optional) for rich results.
- Add related links (services ↔ articles ↔ cases).

## 7. Breadcrumbs
- Auto-generated from URL segments.
- Validate display: Home > Industry Information > Company News > Article Title.
- JSON-LD rendered with each page.

## 8. Inquiry Form Usage
- Located at `/inquiry`.
- Submission triggers API route; data stored in DB table `InquiryLead`.
- Email summary sent to `INQUIRY_EMAIL_TO`.
- View leads via admin tool or direct DB query.

## 9. Redirects (Slug Changes)
- Avoid changing slugs; if required, add entry in `next.config.js` redirects.
- Keep old URL 301 forwarding to new to preserve SEO.

## 10. Sitemap Generation
- Automated script scans `content/**` for `status: published`.
- Run manually: `npm run sitemap` (script writes `public/sitemap.xml`).
- Submit sitemap URL in Search Console after deployment.

## 11. Image Guidelines
- Place images under `/public/images/...`.
- Compress (≤ 250KB hero, ≤ 120KB inline).
- Provide descriptive `alt` text (include keyword only if natural).

## 12. Performance Tips
- Limit carousel slides (4–6) and compress images.
- Lazy-load non-critical below-the-fold sections.
- Defer analytics script (load after page interactive).
- Use responsive image sizes with `sizes` prop.

## 13. Accessibility
- Alt text required for all images.
- Use semantic elements: `<header>`, `<nav>`, `<main>`, `<footer>`.
- Maintain color contrast (WCAG AA).

## 14. Monitoring & Analytics
- GA4 or Plausible script added to layout.
- Track events: inquiry submit, case detail view, carousel interaction.
- Review Search Console weekly for coverage / queries.

## 15. Updating a Page
- Edit MDX file; commit & push.
- For critical changes (title/slug), update meta & redirects.
- Re-run sitemap script if adding/removing published pages (auto in CI).

## 16. Common Pitfalls
- Duplicated keywords → maintain keyword mapping document.
- Missing alt text → audit images before deploy.
- Uncompressed images → run through compression tool.
- Forgetting internal links → leads to orphan pages; add at least 2.

## 17. Future Enhancements
- Tag listing pages
- FAQ component with JSON-LD
- Multilingual content folders `/content/zh/...`
- Case study metrics visualization

## 18. Support Scripts (Planned)
- `scripts/generate-sitemap.ts`
- `scripts/check-frontmatter.ts` (ensures required fields & status)

## 19. Lead Export
- Implement CLI or API route to export `InquiryLead` as CSV (`/api/leads/export?token=...`).
- Include columns: name, company, email, country, desiredService, message, created_at.

## 20. Deployment Notes
- Prefer Vercel for ISR & image optimization.
- Set `revalidate` time (e.g., 900s) for frequently updated content.
- Environment variables configured in Vercel dashboard.

