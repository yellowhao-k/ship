import { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from './CaseCarousel.module.css';

interface CaseItem {
  slug: string;
  title: string;
  featuredImage?: string;
  publishDate?: string;
  category?: string;
}

// New carousel implementation: 4 cards visible, shift one card per step.
export default function CaseCarouselNew({ cases, auto = true, interval = 4500 }: { cases: CaseItem[]; auto?: boolean; interval?: number }) {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(4);

  // Responsive visible count (desktop wide = 5, normal = 4, tablet = 2, mobile = 1)
  useEffect(() => {
    function calc() {
      const w = window.innerWidth;
      if (w >= 1500) setVisible(5);
      else if (w >= 1100) setVisible(4);
      else if (w >= 760) setVisible(2);
      else setVisible(1);
    }
    calc();
    window.addEventListener('resize', calc);
    return () => window.removeEventListener('resize', calc);
  }, []);

  useEffect(() => {
    if (!auto || cases.length <= visible) return;
    const t = setInterval(() => {
      setIndex(i => {
        const maxStart = cases.length - visible;
        return i >= maxStart ? 0 : i + 1;
      });
    }, interval);
    return () => clearInterval(t);
  }, [auto, interval, cases.length, visible]);

  function prev() {
    setIndex(i => {
      const maxStart = cases.length - visible;
      return i <= 0 ? maxStart : i - 1;
    });
  }
  function next() {
    setIndex(i => {
      const maxStart = cases.length - visible;
      return i >= maxStart ? 0 : i + 1;
    });
  }

  if (!cases.length) return <p className="muted">暂无案例</p>;
  const stepPercent = 100 / visible; // width of one card
  const translatePercent = index * stepPercent;
  return (
    <div className={styles.wrapper}>
      <div className={styles.viewport}>
        <div
          className={styles.track}
          style={{ transform: `translateX(-${translatePercent}%)`, ['--visible' as any]: visible }}
        >
          {cases.map(c => {
            const date = c.publishDate ? new Date(c.publishDate).toLocaleDateString('zh-CN') : '';
            // Build a content snippet: prefer explicit excerpt; fallback to challenge/solution; then body text.
            const rawExcerpt: string | undefined = (c as any).excerpt || (c as any).challenge || (c as any).solution;
            let bodyText: string = (c as any).body || '';
            if (bodyText) {
              // strip markdown headings / symbols
              bodyText = bodyText.replace(/[#*>`]/g, '').replace(/\r?\n+/g, ' ').trim();
            }
            const fallbackFromBody = bodyText ? bodyText.slice(0, 80) : '';
            const composed = rawExcerpt || fallbackFromBody;
            const excerpt = composed ? (composed.length > 80 ? composed.slice(0, 80) + '…' : composed) : '';
            return (
              <div className={styles.card} key={c.slug}>
                <div className={styles.imgWrap}>
                  {c.featuredImage ? (
                    <img src={c.featuredImage} alt={c.title} />
                  ) : (
                    <div className={styles.placeholder}>暂无图片</div>
                  )}
                </div>
                <div className={styles.body}>
                  <h3 className={styles.title}>{c.title}</h3>
                  {excerpt && <p className={styles.excerpt}>{excerpt}</p>}
                  <div className={styles.meta}> 
                    <Link href={`/cases/${c.slug}`} className={styles.detail}>查看详情</Link>
                    <span className={styles.date}>{date}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      {cases.length > visible && (
        <div className={styles.controls}>
          <button onClick={prev} aria-label="上一条" className={styles.btn}>‹</button>
          <div className={styles.dots}>
            {Array.from({ length: cases.length - visible + 1 }).map((_, i) => (
              <button
                key={i}
                onClick={() => setIndex(i)}
                className={i === index ? styles.dotActive : styles.dot}
                aria-label={`位置 ${i + 1}`}
              />
            ))}
          </div>
          <button onClick={next} aria-label="下一条" className={styles.btn}>›</button>
        </div>
      )}
    </div>
  );
}
