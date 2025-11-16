import Link from 'next/link';

interface RelatedContentProps {
  serviceSlug?: string;
  articles: any[];
  cases: any[];
}

export default function RelatedContent({ articles, cases }: RelatedContentProps) {
  return (
    <aside style={{ marginTop:'2rem' }}>
      <h3 style={{ margin:'0 0 .75rem' }}>相关内容</h3>
      <ul style={{ listStyle:'none', margin:0, padding:0, fontSize:'.75rem', lineHeight:'1.2rem' }}>
        {articles.map((a: any) => (
          <li key={a.slug} style={{ marginBottom:'.45rem' }}>
            <Link href={`/industry-information/${a.category}/${a.slug}`}>{a.title}</Link>
          </li>
        ))}
        {cases.map((c: any) => (
          <li key={c.slug} style={{ marginBottom:'.45rem' }}>
            <Link href={`/cases/${c.slug}`}>{c.title}</Link>
          </li>
        ))}
      </ul>
    </aside>
  );
}
