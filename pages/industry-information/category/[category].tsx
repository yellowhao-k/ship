import Layout from '../../../components/Layout';
import Link from 'next/link';
import Head from 'next/head';
import { loadAllArticles } from '../../../lib/frontmatter';
import { GetStaticPaths, GetStaticProps } from 'next';

export const getStaticPaths: GetStaticPaths = async () => {
  const categories = ['industry-updates','company-news','knowledge-base'];
  return { paths: categories.map(c => ({ params: { category: c } })), fallback: false };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const all = loadAllArticles();
  const articles = all.filter((a: any) => a.category === params?.category);
  return { props: { articles, category: params?.category } };
};

export default function CategoryArticles({ articles, category }: any) {
  const labelMap: Record<string,string> = {
    'industry-updates':'行业新闻',
    'company-news':'公司动态',
    'knowledge-base':'知识百科'
  };
  return (
    <Layout>
      <Head><title>{labelMap[category] || category} | 行业资讯 | 深圳时必达国际物流</title></Head>
      <h1>{labelMap[category] || category}</h1>
      <div className="news-list">
        {articles.map((a: any) => {
          const date = a.publishDate ? new Date(a.publishDate).toLocaleDateString('zh-CN') : '';
          return (
            <article key={a.slug} className="news-item" itemScope itemType="https://schema.org/NewsArticle">
              <div className="news-thumb">
                <Link href={`/industry-information/${category}/${a.slug}`}>
                  <img src={a.featuredImage || '/images/articles/company-news-1.svg'} alt={a.title} loading="lazy" />
                </Link>
              </div>
              <div className="news-info">
                <Link href={`/industry-information/${category}/${a.slug}`} className="news-title" itemProp="headline">{a.title}</Link>
                <p className="news-excerpt" itemProp="description">{a.excerpt}</p>
                <div className="news-meta-line">
                  <span className={`news-cat badge-${category}`}>{labelMap[category] || category}</span>
                  <time className="news-date" itemProp="datePublished" dateTime={a.publishDate}>{date}</time>
                  <Link href={`/industry-information/${category}/${a.slug}`} className="news-link">详情 →</Link>
                </div>
              </div>
              <meta itemProp="author" content={a.author || '深圳时必达国际物流'} />
              <meta itemProp="dateModified" content={a.publishDate} />
            </article>
          );
        })}
      </div>
      <p style={{ marginTop:'1.4rem' }}><Link href="/industry-information">返回行业资讯首页</Link></p>
    </Layout>
  );
}
