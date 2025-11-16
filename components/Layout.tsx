import Link from 'next/link';
import { ReactNode } from 'react';
import Head from 'next/head';
import { hotline, address, industryInfoLinks, caseLinks, serviceLinks } from './FooterLinks';

export default function Layout({ children }: { children: ReactNode }) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_BASE_URL || 'https://www.example.com';
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Organization',
            name: '深圳时必达国际物流',
            url: baseUrl,
            logo: baseUrl + '/images/company.png',
            contactPoint: [{ '@type': 'ContactPoint', telephone: '135-5379-6071', contactType: 'customer service', areaServed: 'CN' }]
          }) }}
        />
      </Head>
      <header>
        <div className="nav-bar">
          <div className="brand"><Link href="/">深圳时必达国际物流</Link></div>
          <nav className="main-nav">
            <Link href="/">首页</Link>
            <Link href="/services">业务范围</Link>
            <Link href="/cases">客户案例</Link>
            <Link href="/industry-information">行业资讯</Link>
            <Link href="/about-us">关于我们</Link>
            <Link href="/inquiry">联系我们</Link>
          </nav>
        </div>
      </header>
      <main className="container">{children}</main>
      <div className="right-contact" aria-label="快速联系">
        <ul>
          <li className="contact-item" data-type="phone">
            <button aria-label="电话" type="button">
              <img src="/images/icons/phone.png" alt="" width="22" height="22" />
            </button>
            <div className="contact-pop"><a href="tel:13553796071">13553796071</a></div>
          </li>
          <li className="contact-item" data-type="wechat">
            <button aria-label="微信" type="button">
              <img src="/images/icons/wechat.png" alt="" width="22" height="22" />
            </button>
            <div className="contact-pop wechat">
              <img src="/images/wx.png" alt="微信二维码" loading="lazy" />
            </div>
          </li>
          <li className="contact-item" data-type="email">
            <button aria-label="邮箱" type="button">
              <img src="/images/icons/email.png" alt="" width="22" height="22" />
            </button>
            <div className="contact-pop"><a href="mailto:280934634@qq.com">280934634@qq.com</a></div>
          </li>
        </ul>
      </div>
      <footer>
        <div style={{ display:'grid', gap:'1.8rem', gridTemplateColumns:'repeat(auto-fit,minmax(220px,1fr))', maxWidth:'1180px', margin:'0 auto' }}>
          <div>
            <h3 style={{ margin:'0 0 .6rem', fontSize:'1rem', color:'#fff' }}>联系我们</h3>
            <p style={{ margin:'.35rem 0', fontSize:'.75rem', color:'#cfd8dc' }}>信息热线：<a href={`tel:${hotline.replace(/-/g,'')}`} style={{ color:'#cfd8dc' }}>{hotline}</a></p>
            <p style={{ margin:'.35rem 0', fontSize:'.75rem', color:'#cfd8dc' }}>地址：{address}</p>
            <div style={{ marginTop:'.6rem' }}>
              <img src="/images/wx.png" alt="微信二维码" style={{ width:'120px', height:'120px', borderRadius:'6px', border:'1px solid #2a3d4a' }} loading="lazy" />
              <p style={{ margin:'.35rem 0 0', fontSize:'.65rem', color:'#90a4ae' }}>扫码添加企业微信</p>
            </div>
          </div>
          <div>
            <h3 style={{ margin:'0 0 .6rem', fontSize:'1rem', color:'#fff' }}>行业资讯</h3>
            <ul style={{ listStyle:'none', margin:0, padding:0, fontSize:'.75rem' }}>
              {industryInfoLinks.map(l => (
                <li key={l.href} style={{ marginBottom:'.4rem' }}><Link href={l.href}>{l.label}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <h3 style={{ margin:'0 0 .6rem', fontSize:'1rem', color:'#fff' }}>客户案例</h3>
            <ul style={{ listStyle:'none', margin:0, padding:0, fontSize:'.75rem' }}>
              {caseLinks.map(l => (
                <li key={l.href} style={{ marginBottom:'.4rem' }}><Link href={l.href}>{l.label}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <h3 style={{ margin:'0 0 .6rem', fontSize:'1rem', color:'#fff' }}>业务范围</h3>
            <ul style={{ listStyle:'none', margin:0, padding:0, fontSize:'.75rem' }}>
              {serviceLinks.map(l => (
                <li key={l.href} style={{ marginBottom:'.4rem' }}><Link href={l.href}>{l.label}</Link></li>
              ))}
            </ul>
          </div>
        </div>
        <div style={{ marginTop:'2rem', textAlign:'center', fontSize:'.65rem', color:'#90a4ae' }}>© {new Date().getFullYear()} 深圳时必达国际物流 | <Link href="/privacy-policy">隐私政策</Link> | <Link href="/terms">条款</Link></div>
      </footer>
    </>
  );
}

