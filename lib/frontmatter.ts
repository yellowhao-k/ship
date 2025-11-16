// Minimal frontmatter parser (no external deps)
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export interface Frontmatter {
  [key: string]: any;
  title?: string;
  slug?: string;
  type?: string;
  status?: string;
  excerpt?: string;
  publishDate?: string;
}

export function parseFrontmatter(fileContent: string): { data: Frontmatter; body: string } {
  const parsed = matter(fileContent);
  return { data: parsed.data as Frontmatter, body: parsed.content };
}

export function loadContent(dir: string, filterType?: string) {
  const full = path.join(process.cwd(), dir);
  if (!fs.existsSync(full)) return [];
  return fs.readdirSync(full)
    .filter(f => f.endsWith('.mdx'))
    .map(filename => {
      const raw = fs.readFileSync(path.join(full, filename), 'utf-8');
      const { data, body } = parseFrontmatter(raw);
      if (filterType && data.type !== filterType) return null;
      return { ...data, body };
    })
    .filter(Boolean)
    .filter((item: any) => item.status !== 'draft');
}

// Load all article categories from predefined subdirectories.
export function loadAllArticles(categories: string[] = ['industry-updates','company-news','knowledge-base']) {
  const articles: any[] = [];
  for (const cat of categories) {
    const dir = `content/articles/${cat}`;
    if (!fs.existsSync(path.join(process.cwd(), dir))) continue;
    const items = loadContent(dir, 'article').map(a => ({ ...a, category: cat }));
    articles.push(...items);
  }
  // Generate fallback excerpt if missing (first 90 chars of body)
  for (const a of articles) {
    if (!a.excerpt) {
      const body = (a.body || '').replace(/[#>`*]/g,'').replace(/\r?\n+/g,' ').trim();
      a.excerpt = body.slice(0, 90) + (body.length > 90 ? '…' : '');
    }
  }
  // Sort by publishDate desc if present
  return articles.sort((a,b) => (new Date(b.publishDate || 0).getTime() - new Date(a.publishDate || 0).getTime()));
}
