# International Logistics Website (Scaffold)

This repository contains an initial scaffold for a freight forwarding marketing + SEO site using Next.js + MDX content files.

## What's Included
- Basic Next.js config (TypeScript)
- Minimal layout (navigation + footer)
- Static generation for service pages using custom frontmatter parser
- Inquiry form + API route (placeholder persistence/email)
- Placeholder content (services, one case, one article)
- SEO utility stubs (title, description, JSON-LD skeletons)
- Prisma schema (MySQL) for storing inquiry leads
- Sitemap generation placeholder script

## Next Steps
1. Install dependencies: `npm install`
2. (Done) MDX frontmatter parsing via `gray-matter`; to render full MDX use `next-mdx-remote` (planned)
3. Implement Prisma migration: `npx prisma migrate dev` (after setting `DATABASE_URL`)
4. Add email sending in `pages/api/inquiry.ts`
5. (Done) Basic templates + MDX rendering for services/cases/articles
6. (Partial) Structured data (breadcrumbs + service schema) added; extend Article/Case schema
7. Integrate analytics & monitoring

## Environment Variables
Create `.env.local`:
```
DATABASE_URL=mysql://user:pass@host:3306/dbname
INQUIRY_EMAIL_TO=sales@example.com
EMAIL_API_KEY=your-sendgrid-or-resend-key
SITE_BASE_URL=https://www.example.com
NEXT_PUBLIC_SITE_BASE_URL=https://www.example.com
```

## Development
```
npm run dev
```

If MDX rendering is added (body currently raw text preview), integrate `next-mdx-remote`:
```
import { MDXRemote } from 'next-mdx-remote';
```
Parse and serialize during `getStaticProps`.

## Build
```
npm run build && npm start
```

## Notes
- Simple frontmatter parser avoids external dependencies; replace with Contentlayer for robustness.
- Ensure Chinese keywords appear naturally; avoid keyword stuffing for SEO.
