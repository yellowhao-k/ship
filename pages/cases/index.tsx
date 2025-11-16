import Layout from '../../components/Layout';
import { loadContent } from '../../lib/frontmatter';
import Link from 'next/link';

export async function getStaticProps() {
  const cases = loadContent('content/cases', 'case');
  return { props: { cases } };
}

export default function CaseIndex({ cases }: any) {
  const categories = ['sea', 'air', 'express', 'overseas-warehouse'];
  return (
    <Layout>
      <h1>客户案例</h1>
      <div className="case-list">
        {cases.map((c: any) => {
          const date = c.publishDate ? new Date(c.publishDate).toLocaleDateString('zh-CN') : '';
          return (
            <div key={c.slug} className="case-item">
              <div className="case-thumb">
                {c.featuredImage ? (
                  <img src={c.featuredImage} alt={c.title} />
                ) : (
                  <div className="thumb-placeholder">图片</div>
                )}
              </div>
              <div className="case-info">
                <h2 className="case-title"><Link href={`/cases/${c.slug}`}>{c.title}</Link></h2>
                <div className="case-meta">
                  <span>{c.category}</span>
                  <span>{date}</span>
                  <Link href={`/cases/${c.slug}`} className="case-link">查看详情 →</Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </Layout>
  );
}
