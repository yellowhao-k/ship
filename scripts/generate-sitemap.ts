// Placeholder sitemap generator (Node script)
// In real use, glob content folders and parse frontmatter.
import { writeFileSync, readdirSync, readFileSync, existsSync } from 'fs';
import path from 'path';
import matter from 'gray-matter';

const baseUrl = process.env.SITE_BASE_URL || 'https://www.example.com';

function collect(dir: string) {
  const full = path.join(process.cwd(), dir);
  if (!existsSync(full)) return [];
  return readdirSync(full)
    .filter(f => f.endsWith('.mdx'))
    .map(f => {
      const raw = readFileSync(path.join(full, f), 'utf-8');
      const fm = matter(raw).data as any;
      if (fm.status !== 'published') return null;
      return fm.slug || f.replace(/\.mdx$/, '');
    }).filter(Boolean) as string[];
}

const serviceSlugs = collect('content/services');
const caseSlugs = collect('content/cases');
const articleCategories = ['industry-updates','company-news','knowledge-base'];
let articleSlugs: string[] = [];
for (const cat of articleCategories) {
  const slugs = collect(`content/articles/${cat}`);
  articleSlugs.push(...slugs.map(s => `${cat}/${s}`));
}

const urls: string[] = [
  '/',
  '/services/',
  ...serviceSlugs.map(s => `/services/${s}/`),
  '/cases/',
  ...caseSlugs.map(s => `/cases/${s}/`),
  '/industry-information/',
  ...articleSlugs.map(s => `/industry-information/${s}/`),
  '/about-us/',
  '/inquiry/'
];

const xmlItems = urls.map(u => `<url><loc>${baseUrl}${u}</loc></url>`).join('');
const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${xmlItems}</urlset>`;
writeFileSync('public/sitemap.xml', xml);
console.log('Sitemap written with', urls.length, 'URLs');
