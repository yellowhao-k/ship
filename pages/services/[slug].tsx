import Layout from '../../components/Layout';
import { loadContent } from '../../lib/frontmatter';
import { GetStaticPaths, GetStaticProps } from 'next';
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote';
import RelatedContent from '../../components/RelatedContent';
import { serialize } from 'next-mdx-remote/serialize';
import Head from 'next/head';
import { buildMetaTitle, buildMetaDescription, serviceJsonLd, breadcrumbJsonLd, organizationJsonLd } from '../../lib/seo';
import Breadcrumbs from '../../components/Breadcrumbs';

export const getStaticPaths: GetStaticPaths = async () => {
  const services = loadContent('content/services', 'service');
  return { paths: services.map((s: any) => ({ params: { slug: s.slug } })), fallback: false };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const services = loadContent('content/services', 'service');
  const service = services.find((s: any) => s.slug === params?.slug);
  if (!service) return { notFound: true };
  let relatedArticles: any[] = [];
  try { relatedArticles = loadContent('content/articles/industry-updates', 'article').slice(0,2); } catch {}
  const relatedCases = loadContent('content/cases', 'case').slice(0,1);
  const mdxSource = await serialize(service.body || '');
  return { props: { service, mdxSource, relatedArticles, relatedCases } };
};

export default function ServicePage({ service, mdxSource, relatedArticles, relatedCases }: { service: any; mdxSource: MDXRemoteSerializeResult; relatedArticles: any[]; relatedCases: any[] }) {
  if (!service) return null;
  const title = buildMetaTitle(service.title);
  const description = buildMetaDescription(service.excerpt || service.body?.slice(0,160));
  const baseUrl = process.env.NEXT_PUBLIC_SITE_BASE_URL || 'https://www.example.com';
  const jsonLd = serviceJsonLd({ title: service.title, description, slug: service.slug, baseUrl });
  const orgLd = organizationJsonLd({ name: '深圳时必达国际物流', url: baseUrl, logo: `${baseUrl}/images/company.png`, phone: '135-5379-6071', address: '深圳市宝安区福永街道怀德社区路干头二巷11号楼' });
  const breadcrumbs = breadcrumbJsonLd(['services', service.slug], baseUrl);
  return (
    <Layout>
      <Head>
        <title>{title}</title>
        {description && <meta name="description" content={description} />}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgLd) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }} />
        <link rel="canonical" href={`${baseUrl}/services/${service.slug}`} />
      </Head>
      <Breadcrumbs />
      <h1>{service.title}</h1>
      <p className="muted">{service.excerpt}</p>
      <section className="block">
        <MDXRemote {...mdxSource} />
        <RelatedContent articles={relatedArticles} cases={relatedCases} />
      </section>
    </Layout>
  );
}
