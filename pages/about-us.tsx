import Layout from '../components/Layout';
import Head from 'next/head';
import Link from 'next/link';

export default function AboutUs() {
  return (
    <Layout>
      <Head>
        <title>关于我们 | 深圳时必达国际物流</title>
        <meta
          name="description"
          content="深圳时必达跨境供应链有限公司—专注跨境电商物流，覆盖国内多个运营中心与美国海外仓。提供FBA头程、散货双清、整柜配送、超大件卡派、私人物品运输与全国上门取件服务。"
        />
      </Head>
      <h1>关于我们</h1>
      <section className="block">
        <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap', alignItems: 'flex-start' }}>
          <div style={{ flex: '1 1 340px', minWidth: 280 }}>
            <p>
              深圳时必达跨境供应链有限公司成立于 2020 年 5 月 20 日，隶属于广州康祥幸运物流有限公司，是一家专注跨境电商物流的综合服务商。我们坚持“客户第一、合作共赢”的理念，以专业与高效获得众多商家信赖，被视为跨境物流中值得依赖的合作伙伴之一。
            </p>
            <p>
              公司在全国布局多个运营中心，覆盖义乌、青岛、厦门、上海、深圳、广州、东莞等重要城市；并在美国洛杉矶、休斯顿、萨凡纳、芝加哥、纽约等地建立自营海外仓，为卖家全球配送提供强大支撑。
            </p>
          </div>
          <figure style={{ flex: '1 1 300px', textAlign: 'center', margin: 0 }}>
            <img
              src="/images/company.png"
              alt="公司形象"
              style={{ maxWidth: '100%', height: 'auto', borderRadius: '6px' }}
              loading="lazy"
            />
            <figcaption style={{ fontSize: '0.75rem', color: '#666', marginTop: '.5rem' }}>
              深圳时必达跨境供应链有限公司
            </figcaption>
          </figure>
        </div>
      </section>
      <section className="block-alt content-indent">
        <h2 className="title-shift accent-left">使命与愿景</h2>
        <p>
          让跨境电商物流更透明、高效、低风险。我们通过数字化节点跟踪、标准化操作流程与多渠道整合能力，持续提升跨境供应链体验，帮助卖家稳健拓展全球市场。
        </p>
      </section>
      <section className="block">
        <h2 className="title-shift-small">运营与仓储网络</h2>
        <ul className="list-indent">
          <li>
            <strong>国内运营中心：</strong>义乌、青岛、厦门、上海、深圳、广州、东莞等城市协同联动。
          </li>
          <li>
            <strong>美国自营仓：</strong>洛杉矶、休斯顿、萨凡纳、芝加哥、纽约（持续拓展中）。
          </li>
        </ul>
      </section>
      <section className="block-alt">
        <h2 className="title-shift">核心服务</h2>
        <ul className="list-indent">
          <li>亚马逊 FBA 头程运输</li>
          <li>散货双清包税到门</li>
          <li>整柜到港 / 整柜双清包税配送</li>
          <li>超大件美国本土卡派服务</li>
          <li>私人物品门到门运输</li>
          <li>国内上门取件与集货</li>
        </ul>
      </section>
      <section className="block">
        <h2>服务覆盖区域</h2>
        <p>美国、加拿大、欧洲多国及东南亚地区；国内支持全国范围揽收，灵活满足不同类型客户的发货需求。</p>
      </section>
      <section className="block-alt">
        <h2 className="title-shift">核心优势</h2>
        <ul className="list-indent">
          <li>全链路物流节点实时可查</li>
          <li>多对一客户服务体系高效响应</li>
          <li>收费公开透明，无任何隐形成本</li>
          <li>时效承诺，未达按协议处理</li>
          <li>运输保险全程覆盖，丢件破损可赔付</li>
          <li>全国区域可安排上门收货</li>
        </ul>
      </section>
      <section className="block">
        <h2>我们的承诺</h2>
        <p>
          我们以稳定履约率、低异常率和持续优化的运营体系，保障跨境卖家业务的可持续增长。选择时必达，即选择更高确定性的全球配送协同与风险控制。
        </p>
      </section>
      <section className="block-alt" style={{ textAlign: 'center' }}>
        <h2 className="no-accent" style={{ marginTop: 0 }}>开启更高效的跨境物流体验</h2>
        <p>即刻提交您的需求，我们的专业团队将为您定制合适的物流解决方案。</p>
        <p>
          <Link href="/inquiry" className="cta-btn">
            提交需求 →
          </Link>
        </p>
      </section>
    </Layout>
  );
}
