import styles from './PartnerWall.module.css';

interface Partner { name: string; logo: string; alt: string; href: string; }

// Eight partners; we duplicate when rendering for seamless infinite scroll.
const partners: Partner[] = [
  { name: 'Carrier A', logo: '/images/partners/partner-1.jpg', alt: 'Carrier A 标志', href: 'https://example.com/carrier-a' },
  { name: 'Carrier B', logo: '/images/partners/partner-2.jpg', alt: 'Carrier B 标志', href: 'https://example.com/carrier-b' },
  { name: 'Warehouse Net', logo: '/images/partners/partner-3.jpg', alt: 'Warehouse Net 标志', href: 'https://example.com/warehouse-net' },
  { name: 'Express X', logo: '/images/partners/partner-4.jpg', alt: 'Express X 标志', href: 'https://example.com/express-x' },
  { name: 'Logistics Y', logo: '/images/partners/partner-5.jpg', alt: 'Logistics Y 标志', href: 'https://example.com/logistics-y' },
  { name: 'Supply Z', logo: '/images/partners/partner-6.jpg', alt: 'Supply Z 标志', href: 'https://example.com/supply-z' },
  { name: 'Freight Plus', logo: '/images/partners/partner-7.jpg', alt: 'Freight Plus 标志', href: 'https://example.com/freight-plus' },
  { name: 'Global Hub', logo: '/images/partners/partner-8.jpg', alt: 'Global Hub 标志', href: 'https://example.com/global-hub' }
];

export default function PartnerWall() {
  return (
    <div className={styles.wall} aria-label="合作伙伴滚动展示">
      <div className={styles.track}>
        {[...partners, ...partners].map((p, i) => (
          <a
            key={p.name + '-' + i}
            href={p.href}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.partner}
            title={p.name}
            aria-label={p.alt}
          >
            <img src={p.logo} alt={p.alt} loading="lazy" />
          </a>
        ))}
      </div>
    </div>
  );
}
