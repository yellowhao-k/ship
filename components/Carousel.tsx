import { useEffect, useState } from 'react';
import styles from './Carousel.module.css';

export interface Slide {
  title: string;
  subtitle?: string;
  href?: string;
  bg?: string;
}

const defaultSlides: Slide[] = [
  { title: '海运双清包税到门', subtitle: '整柜/拼箱 DDP 服务', href: '/services/sea-freight-double-customs-clearance-including-tax', bg: '#004b70' },
  { title: '空运双清包税到门', subtitle: '高时效保税仓分拨', href: '/services/air-freight-double-customs-clearance-bonded-door-delivery', bg: '#0e5d8a' },
  { title: '海外仓一件代发', subtitle: 'FBA 头程 + 库存周转', href: '/services/overseas-warehouse-drop-shipping', bg: '#176a96' },
  { title: '国际小包快递专线', subtitle: '轻小件稳定时效', href: '/services/express-parcel-dedicated-line', bg: '#1d77a3' }
];

export default function Carousel({ slides = defaultSlides, interval = 5000 }: { slides?: Slide[]; interval?: number }) {
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const timer = setInterval(() => setIdx(i => (i + 1) % slides.length), interval);
    return () => clearInterval(timer);
  }, [slides.length, interval]);

  function prev() { setIdx(i => (i - 1 + slides.length) % slides.length); }
  function next() { setIdx(i => (i + 1) % slides.length); }

  return (
    <div className={styles.wrapper}>
      {slides.map((s, i) => (
        <a
          key={s.title}
          href={s.href}
          className={styles.slide + ' ' + (i === idx ? styles.active : styles.inactive)}
          style={{ background: s.bg }}
          aria-hidden={i !== idx}
        >
          <div className={styles.content}>
            <h2>{s.title}</h2>
            {s.subtitle && <p>{s.subtitle}</p>}
          </div>
        </a>
      ))}
      <button className={styles.prev} onClick={prev} aria-label="上一张">‹</button>
      <button className={styles.next} onClick={next} aria-label="下一张">›</button>
      <div className={styles.dots}>
        {slides.map((_, i) => (
          <button key={i} className={i === idx ? styles.dotActive : styles.dot} onClick={() => setIdx(i)} aria-label={`切换到第 ${i + 1} 张`} />
        ))}
      </div>
    </div>
  );
}

