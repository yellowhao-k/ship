import Layout from '../components/Layout';
import { useState } from 'react';

export default function ContactUs() {
  const [status, setStatus] = useState<'idle'|'success'|'error'>('idle');
  const [form, setForm] = useState({ name: '', email: '', company: '', country: '', desiredService: '', message: '', websiteUrl: '' });

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    try {
      const res = await fetch('/api/inquiry', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) });
      const json = await res.json();
      setStatus(json.success ? 'success' : 'error');
    } catch {
      setStatus('error');
    }
  }

  return (
    <Layout>
      <h1>联系我们</h1>
      <section className="block" style={{ display:'grid', gap:'1.4rem', gridTemplateColumns:'repeat(auto-fit,minmax(260px,1fr))' }}>
        <div>
          <h2 style={{ marginTop:0 }}>联系方式</h2>
          <p style={{ margin:'0 0 .6rem' }}>热线：<a href="tel:13553796071">135-5379-6071</a></p>
          <p style={{ margin:'0 0 .6rem' }}>地址：深圳市宝安区福永街道怀德社区路干头二巷11号楼</p>
          <div style={{ width:'150px' }}>
            <img src="/images/wx.png" alt="微信二维码" style={{ width:'100%', height:'auto', borderRadius:'8px', border:'1px solid #d6e0e5' }} />
            <p style={{ margin:'.35rem 0 0', fontSize:'.65rem', color:'#486581' }}>扫码添加企业微信</p>
          </div>
        </div>
        <div>
          <h2 style={{ marginTop:0 }}>我们的优势</h2>
          <ul style={{ fontSize:'.8rem', lineHeight:'1.3rem', paddingLeft:'1rem' }}>
            <li>全链路节点实时跟踪，状态透明可视</li>
            <li>多渠道整合：海运 / 空运 / 快递 / 海外仓协同</li>
            <li>时效与赔付承诺，降低跨境运营风险</li>
            <li>收费结构公开，无隐形成本</li>
            <li>美国多仓 + 国内多运营中心联动</li>
            <li>运输保险全程覆盖，异常快速处理</li>
            <li>专业团队一对多贴心服务</li>
          </ul>
        </div>
      </section>
      <section className="block-alt">
        <h2 style={{ marginTop:0 }}>发送需求</h2>
        <form onSubmit={submit}>
          <input placeholder="姓名" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} required />
          <input placeholder="邮箱" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} required />
          <input placeholder="公司" value={form.company} onChange={e => setForm({ ...form, company: e.target.value })} />
          <input placeholder="国家" value={form.country} onChange={e => setForm({ ...form, country: e.target.value })} />
          <input placeholder="需求服务" value={form.desiredService} onChange={e => setForm({ ...form, desiredService: e.target.value })} />
          <textarea placeholder="具体需求" value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} required />
          {/* Honeypot */}
          <input style={{ display: 'none' }} tabIndex={-1} autoComplete="off" value={form.websiteUrl} onChange={e => setForm({ ...form, websiteUrl: e.target.value })} />
          <button type="submit">提交</button>
        </form>
        {status === 'success' && <p>已成功提交，我们将尽快联系您。</p>}
        {status === 'error' && <p>提交失败，请稍后再试。</p>}
      </section>
    </Layout>
  );
}

