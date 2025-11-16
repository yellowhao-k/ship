import Link from 'next/link';
import { useState, useEffect } from 'react';

interface CaseItem {
  slug: string;
  title: string;
  featuredImage?: string;
  publishDate?: string;
  category?: string;
  body?: string;
  excerpt?: string;
  challenge?: string;
  solution?: string;
}

function buildExcerpt(c: CaseItem): string {
  const source = c.excerpt || c.challenge || c.solution || c.body || '';
  const cleaned = source.replace(/[#*>`]/g, '').replace(/\r?\n+/g, ' ').trim();
  return cleaned.length > 90 ? cleaned.slice(0, 90) + '…' : cleaned;
}

export default function HomeCaseShowcase({ cases, limit = 4 }: { cases: CaseItem[]; limit?: number }) {
  const shown = cases.slice(0, limit);
  if (!shown.length) return <p>暂无案例</p>;
  return (
    <div style={{ display:'flex', gap:'1rem', overflowX:'auto', padding:'0.5rem 0' }}>
      {shown.map(item => {
        const date = item.publishDate ? new Date(item.publishDate).toLocaleDateString('zh-CN') : '';
        return (
          <div
            key={item.slug}
            style={{
              minWidth:'240px',
              background:'#fff',
              border:'1px solid #e3e9ee',
              borderRadius:'18px',
              boxShadow:'0 2px 6px rgba(0,0,0,.06)',
              display:'flex',
              flexDirection:'column',
              overflow:'hidden'
            }}
          >
            <div style={{ height:'140px', background:'#f5f7f9', borderBottom:'1px solid #e3e9ee', overflow:'hidden' }}>
              {item.featuredImage ? (
                <img
                  src={item.featuredImage}
                  alt={item.title}
                  style={{ width:'100%', height:'100%', objectFit:'cover', display:'block' }}
                />
              ) : (
                <div style={{ width:'100%', height:'100%', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'.8rem', color:'#667' }}>图片</div>
              )}
            </div>
            <div style={{ padding:'0.7rem 0.75rem 0.8rem', display:'flex', flexDirection:'column', flex:1 }}>
              <h3 style={{ margin:'0 0 .4rem', fontSize:'0.95rem', lineHeight:'1.25rem', fontWeight:600 }}>{item.title}</h3>
              <div style={{ marginTop:'auto', display:'flex', justifyContent:'space-between', fontSize:'0.65rem', alignItems:'center' }}>
                <Link href={`/cases/${item.slug}`} style={{ background:'#eef5f9', padding:'.35rem .6rem', borderRadius:'14px', fontWeight:600, textDecoration:'none', color:'#056' }}>查看详情</Link>
                <span style={{ color:'#6b7c88' }}>{date}</span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
