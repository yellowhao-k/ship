import { GetServerSideProps } from 'next';
import { loadContent, loadAllArticles } from '../lib/frontmatter';
import fs from 'fs';
import path from 'path';

function buildUrl(base: string, p: string) {
  return `${base}${p}`.replace(/(?<!:)\/\/+/, '/');
}

function escapeXml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_BASE_URL || 'https://www.example.com';

  // Collect dynamic content
  const services = loadContent('content/services', 'service');
  const cases = loadContent('content/cases', 'case');
  const articles = loadAllArticles();

  // Case & article categories (for index pages)
  const caseCategories = Array.from(new Set(cases.map((c: any) => c.category))).filter(Boolean);
  const articleCategories = Array.from(new Set(articles.map((a: any) => a.category))).filter(Boolean);

  // Static pages
  const staticPaths: { loc: string; priority?: number; changefreq?: string }[] = [
    { loc: '/', priority: 1.0 },
    { loc: '/about-us', priority: 0.8 },
    { loc: '/services', priority: 0.8 },
    { loc: '/cases', priority: 0.7 },
    { loc: '/industry-information', priority: 0.7 },
    { loc: '/inquiry', priority: 0.6 }
  ];

  type Entry = { loc: string; lastmod?: string; changefreq?: string; priority?: number };
  const entries: Entry[] = [];

  // Add static pages
  for (const s of staticPaths) entries.push({ loc: s.loc, priority: s.priority, changefreq: s.changefreq });

  // Services
  services.forEach((svc: any) => {
    entries.push({
      loc: `/services/${svc.slug}`,
      lastmod: svc.publishDate || new Date().toISOString().slice(0, 10),
      priority: 0.75
    });
  });

  // Cases
  cases.forEach((c: any) => {
    entries.push({
      loc: `/cases/${c.slug}`,
      lastmod: c.publishDate || new Date().toISOString().slice(0, 10),
      priority: 0.7
    });
  });

  // Case category index pages
  caseCategories.forEach(cat => {
    entries.push({ loc: `/cases/category/${cat}`, priority: 0.6 });
  });

  // Articles
  articles.forEach((a: any) => {
    entries.push({
      loc: `/industry-information/${a.category}/${a.slug}`,
      lastmod: a.publishDate || new Date().toISOString().slice(0, 10),
      priority: 0.65
    });
  });

  // Article categories
  articleCategories.forEach(cat => {
    entries.push({ loc: `/industry-information/category/${cat}`, priority: 0.55 });
  });

  // Build XML
  const xmlItems = entries
    .map(e => {
      const loc = escapeXml(buildUrl(baseUrl, e.loc));
      const lastmod = e.lastmod ? `<lastmod>${e.lastmod}</lastmod>` : '';
      const changefreq = e.changefreq ? `<changefreq>${e.changefreq}</changefreq>` : '';
      const priority = e.priority ? `<priority>${e.priority.toFixed(2)}</priority>` : '';
      return `<url><loc>${loc}</loc>${lastmod}${changefreq}${priority}</url>`;
    })
    .join('');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>` +
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${xmlItems}</urlset>`;

  res.setHeader('Content-Type', 'application/xml');
  res.write(xml);
  res.end();

  return { props: {} };
};

export default function SiteMap() {
  return null; // XML output only
}

