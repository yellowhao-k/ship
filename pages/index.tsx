import Layout from '../components/Layout';
import Link from 'next/link';
import { loadContent, loadAllArticles } from '../lib/frontmatter';
import Carousel from '../components/Carousel';
import AdvantageGrid from '../components/AdvantageGrid';
import PartnerWall from '../components/PartnerWall';
import HomeCaseShowcase from '../components/HomeCaseShowcase';

export async function getStaticProps() {
  const services = loadContent('content/services', 'service').slice(0, 5);
  // Load all published cases (carousel will chunk into groups of 4)
  const cases = loadContent('content/cases', 'case');
  const articles = loadAllArticles();
  return { props: { services, cases, articles } };
}

export default function Home({ services, cases, articles }: any) {
  return (
    <Layout>
      <section className="hero">
        <div className="hero-text">
          <h1>国际物流的领导者</h1>
          <p>我们与多个物流渠道的整合，使您能够高效管理国际运输，确保货物安全及时到达目的地。</p>
          <p><Link href="/inquiry" className="cta-btn">联系我们 →</Link></p>
        </div>
        <div className="hero-image">
          <img src="/images/hero-2.png" alt="深圳时必达国际物流 服务示意" />
        </div>
      </section>
      <h2>我们的优势与业务范围</h2>
      <Carousel />
      <section className="block-alt">
        <AdvantageGrid />
      </section>
      <section className="block">
        <h2>业务范围</h2>
        <ul>
          {services.map((s: any) => (
            <li key={s.slug} className="card"><Link href={`/services/${s.slug}`}>{s.title}</Link><p className="muted">{s.excerpt}</p></li>
          ))}
        </ul>
      </section>
      <section className="block-alt home-cases">
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
          <h2 style={{ margin:0 }}>客户案例</h2>
          <Link href="/cases" style={{ fontSize:'0.75rem', fontWeight:600, textDecoration:'none', background:'#eef5f9', padding:'.45rem .75rem', borderRadius:'14px', color:'#056' }}>查看更多 →</Link>
        </div>
        <HomeCaseShowcase cases={cases} limit={4} />
      </section>
      <section className="block">
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
          <h2 style={{ margin:0 }}>行业资讯</h2>
          <Link href="/industry-information" style={{ fontSize:'0.75rem', fontWeight:600, textDecoration:'none', background:'#eef5f9', padding:'.45rem .75rem', borderRadius:'14px', color:'#056' }}>更多资讯 →</Link>
        </div>
        <div style={{ display:'flex', gap:'1rem', flexWrap:'wrap', marginTop:'1rem' }}>
          <div style={{ flex:'1 1 240px' }}>
            <h3 style={{ margin:'0 0 .5rem', fontSize:'0.95rem' }}>行业新闻</h3>
            <ul style={{ margin:0, padding:'0 0 0 1rem' }}>
              {articles.filter((a: any) => a.category === 'industry-updates').slice(0,3).map((a: any) => (
                <li key={a.slug} style={{ marginBottom:'.4rem' }}><Link href={`/industry-information/${a.category}/${a.slug}`}>{a.title}</Link></li>
              ))}
            </ul>
          </div>
          <div style={{ flex:'1 1 240px' }}>
            <h3 style={{ margin:'0 0 .5rem', fontSize:'0.95rem' }}>公司动态</h3>
            <ul style={{ margin:0, padding:'0 0 0 1rem' }}>
              {articles.filter((a: any) => a.category === 'company-news').slice(0,3).map((a: any) => (
                <li key={a.slug} style={{ marginBottom:'.4rem' }}><Link href={`/industry-information/${a.category}/${a.slug}`}>{a.title}</Link></li>
              ))}
            </ul>
          </div>
          <div style={{ flex:'1 1 240px' }}>
            <h3 style={{ margin:'0 0 .5rem', fontSize:'0.95rem' }}>知识百科</h3>
            <ul style={{ margin:0, padding:'0 0 0 1rem' }}>
              {articles.filter((a: any) => a.category === 'knowledge-base').slice(0,3).map((a: any) => (
                <li key={a.slug} style={{ marginBottom:'.4rem' }}><Link href={`/industry-information/${a.category}/${a.slug}`}>{a.title}</Link></li>
              ))}
            </ul>
          </div>
        </div>
      </section>
      <section className="block-alt">
        <h2 className="partners-title">合作伙伴</h2>
        <PartnerWall />
      </section>
    </Layout>
  );
}
