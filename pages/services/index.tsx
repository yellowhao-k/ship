import Layout from '../../components/Layout';
import Link from 'next/link';
import { loadContent } from '../../lib/frontmatter';

export async function getStaticProps() {
  const services = loadContent('content/services', 'service');
  return { props: { services } };
}

export default function Services({ services }: any) {
  return (
    <Layout>
      <h1>业务范围</h1>
      <p className="services-intro">我们为跨境电商与外贸企业提供覆盖不同体量与场景的综合物流解决方案。结合海运、空运、快递、海外仓与增值服务，帮助您在成本、时效与稳定性之间取得最佳平衡。</p>
      <ul className="service-grid">
        {services.map((s: any) => (
          <li key={s.slug}>
            <Link href={`/services/${s.slug}`}>{s.title}</Link>
            {s.excerpt && <p className="svc-excerpt">{s.excerpt}</p>}
          </li>
        ))}
      </ul>
    </Layout>
  );
}
