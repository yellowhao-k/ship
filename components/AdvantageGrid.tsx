import Link from 'next/link';
import styles from './AdvantageGrid.module.css';

interface Item { slug: string; label: string; desc: string; }
const items: Item[] = [
  { slug: 'sea-freight-double-customs-clearance-including-tax', label: '海运包税', desc: '整柜/拼箱 DDP 到门' },
  { slug: 'air-freight-double-customs-clearance-bonded-door-delivery', label: '空运包税', desc: '高时效保税分拨' },
  { slug: 'overseas-warehouse-drop-shipping', label: '海外仓', desc: '一件代发 & FBA 头程' },
  { slug: 'door-to-door-service', label: '门到门', desc: '端到端整体方案' },
  { slug: 'express-parcel-dedicated-line', label: '国际小包', desc: '轻小件稳定时效' }
];

export default function AdvantageGrid() {
  return (
    <div className={styles.grid}>
      {items.map(i => (
        <Link
          key={i.slug}
          href={`/services/${i.slug}`}
          className={styles.card}
          aria-label={`${i.label}：${i.desc}`}
        >
          <span className={styles.label}>{i.label}</span>
          <span className={styles.desc}>{i.desc}</span>
        </Link>
      ))}
    </div>
  );
}
