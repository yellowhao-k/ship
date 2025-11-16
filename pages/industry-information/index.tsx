import Layout from '../../components/Layout';
import Link from 'next/link';
import Head from 'next/head';
import { loadAllArticles } from '../../lib/frontmatter';

export async function getStaticProps() {
  const articles = loadAllArticles();
  return { props: { articles } };
}

export default function IndustryInfo({ articles }: any) {
  const categories: string[] = ['industry-updates','company-news','knowledge-base'];
  const labelMap: Record<string,string> = {
    'industry-updates':'行业新闻',
    'company-news':'公司动态',
    'knowledge-base':'知识百科'
  };
  const grouped: Record<string, any[]> = {};
  for (const c of categories) grouped[c] = [];
  articles.forEach((a: any) => { if (grouped[a.category]) grouped[a.category].push(a); });
  return (
    <Layout>
      <Head><title>行业资讯 | 深圳时必达国际物流</title></Head>
      <h1>行业资讯</h1>
      <div className="news-nav">
        {categories.map(cat => (
          <Link key={cat} href={`/industry-information/category/${cat}`}>{labelMap[cat]}</Link>
        ))}
      </div>
      {categories.map(cat => (
        <section key={cat} className="news-section" data-category={cat}>
          <h2 className="news-section-title">{labelMap[cat]}</h2>
          <div className="news-list">
            {grouped[cat].slice(0,6).map((a: any) => {
              const date = a.publishDate ? new Date(a.publishDate).toLocaleDateString('zh-CN') : '';
              return (
                <article key={a.slug} className="news-item" itemScope itemType="https://schema.org/NewsArticle">
                  <div className="news-thumb">
                    <Link href={`/industry-information/${a.category}/${a.slug}`}>
                      <img src={a.featuredImage || '/images/articles/company-news-1.svg'} alt={a.title} loading="lazy" />
                    </Link>
                  </div>
                  <div className="news-info">
                    <Link href={`/industry-information/${a.category}/${a.slug}`} className="news-title" itemProp="headline">{a.title}</Link>
                    <p className="news-excerpt" itemProp="description">{a.excerpt}</p>
                    <div className="news-meta-line">
                      <span className={`news-cat badge-${a.category}`}>{labelMap[a.category]}</span>
                      <time className="news-date" itemProp="datePublished" dateTime={a.publishDate}>{date}</time>
                      <Link href={`/industry-information/${a.category}/${a.slug}`} className="news-link">详情 →</Link>
                    </div>
                  </div>
                  <meta itemProp="author" content={a.author || '深圳时必达国际物流'} />
                  <meta itemProp="dateModified" content={a.publishDate} />
                </article>
              );
            })}
          </div>
          {grouped[cat].length > 6 && (
            <div className="news-more">
              <Link href={`/industry-information/category/${cat}`}>查看更多{labelMap[cat]} →</Link>
            </div>
          )}
        </section>
      ))}
    </Layout>
  );
}
