import Layout from '../../../components/Layout';
import { loadContent } from '../../../lib/frontmatter';
import { GetStaticPaths, GetStaticProps } from 'next';
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote';
import { serialize } from 'next-mdx-remote/serialize';
import Head from 'next/head';
import { buildMetaTitle, buildMetaDescription, breadcrumbJsonLd, articleJsonLd } from '../../../lib/seo';
import Breadcrumbs from '../../../components/Breadcrumbs';

export const getStaticPaths: GetStaticPaths = async () => {
  const categories = ['industry-updates','company-news','knowledge-base'];
  const paths: any[] = [];
  for (const cat of categories) {
    const articles = loadContent(`content/articles/${cat}`, 'article');
    for (const a of articles) paths.push({ params: { category: cat, slug: a.slug } });
  }
  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const categories = ['industry-updates','company-news','knowledge-base'];
  let article: any = null;
  for (const cat of categories) {
    const list = loadContent(`content/articles/${cat}`, 'article');
    const found = list.find((a: any) => a.slug === params?.slug);
    if (found) { article = { ...found, category: cat }; break; }
  }
  if (!article) return { notFound: true };
  const mdxSource = await serialize(article.body || '');
  return { props: { article, mdxSource } };
};

export default function ArticlePage({ article, mdxSource }: { article: any; mdxSource: MDXRemoteSerializeResult }) {
  if (!article) return null;
  const title = buildMetaTitle(article.title);
  const description = buildMetaDescription(article.excerpt || article.body?.slice(0,160));
  const baseUrl = process.env.NEXT_PUBLIC_SITE_BASE_URL || 'https://www.example.com';
  const breadcrumbs = breadcrumbJsonLd(['industry-information', article.category, article.slug], baseUrl);
  const jsonLd = articleJsonLd({
    title: article.title,
    description,
    slug: article.slug,
    category: article.category,
    image: article.heroImage,
    publishDate: article.publishDate,
    baseUrl,
    siteName: '深圳时必达国际物流'
  });
  return (
    <Layout>
      <Head>
        <title>{title}</title>
        {description && <meta name="description" content={description} />}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <link rel="canonical" href={`${baseUrl}/industry-information/${article.category}/${article.slug}`} />
      </Head>
      <Breadcrumbs />
      <h1>{article.title}</h1>
      <section className="block">
        <MDXRemote {...mdxSource} />
      </section>
    </Layout>
  );
}
