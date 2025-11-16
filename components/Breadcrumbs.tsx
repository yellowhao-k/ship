import Link from 'next/link';
import { useRouter } from 'next/router';

export default function Breadcrumbs() {
  const router = useRouter();
  const parts = router.asPath.split('?')[0].split('/').filter(Boolean);
  const crumbs = [{ label:'首页', href:'/' }, ...parts.map((p, idx) => ({ label: p, href: '/' + parts.slice(0, idx+1).join('/') }))];
  return (
    <nav className="breadcrumb" aria-label="Breadcrumb">
      {crumbs.map((c,i) => (
        <span key={c.href}>
          {i < crumbs.length - 1 ? <Link href={c.href}>{c.label}</Link> : <span>{c.label}</span>}
          {i < crumbs.length - 1 && ' / '}
        </span>
      ))}
    </nav>
  );
}

