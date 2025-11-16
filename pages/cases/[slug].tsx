import Layout from '../../components/Layout';
import { loadContent } from '../../lib/frontmatter';
import { GetStaticPaths, GetStaticProps } from 'next';
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote';
import { serialize } from 'next-mdx-remote/serialize';
import Head from 'next/head';
import { buildMetaTitle, buildMetaDescription, breadcrumbJsonLd, caseJsonLd } from '../../lib/seo';
import Breadcrumbs from '../../components/Breadcrumbs';

export const getStaticPaths: GetStaticPaths = async () => {
  const cases = loadContent('content/cases', 'case');
  return { paths: cases.map((c: any) => ({ params: { slug: c.slug } })), fallback: false };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const cases = loadContent('content/cases', 'case');
  const caseStudy = cases.find((c: any) => c.slug === params?.slug);
  if (!caseStudy) return { notFound: true };
  const mdxSource = await serialize(caseStudy.body || '');
  return { props: { caseStudy, mdxSource } };
};

export default function CaseDetail({ caseStudy, mdxSource }: { caseStudy: any; mdxSource: MDXRemoteSerializeResult }) {
  if (!caseStudy) return null;
  const title = buildMetaTitle(caseStudy.title);
  const description = buildMetaDescription(caseStudy.excerpt || caseStudy.challenge || '案例详情');
  const baseUrl = process.env.NEXT_PUBLIC_SITE_BASE_URL || 'https://www.example.com';
  const breadcrumbs = breadcrumbJsonLd(['cases', caseStudy.slug], baseUrl);
  const jsonLd = caseJsonLd({
    title: caseStudy.title,
    description,
    slug: caseStudy.slug,
    image: caseStudy.featuredImage,
    publishDate: caseStudy.publishDate,
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
        <link rel="canonical" href={`${baseUrl}/cases/${caseStudy.slug}`} />
      </Head>
      <Breadcrumbs />
      <h1>{caseStudy.title}</h1>
      <p className="muted">分类: {caseStudy.category} · 时效提升 {caseStudy.resultMetrics?.transitTimeReductionPercent}% · 成本节约 {caseStudy.resultMetrics?.costSavingPercent}%</p>
      <section className="block">
        <MDXRemote {...mdxSource} />
      </section>
    </Layout>
  );
}
