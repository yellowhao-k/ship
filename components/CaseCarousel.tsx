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

export default function CaseCarousel({ cases, auto = true, interval = 4500 }: { cases: CaseItem[]; auto?: boolean; interval?: number }) {
  const [index, setIndex] = useState(0);
  const [visibleCount] = useState(4);

  useEffect(() => {
    function update() {
      const w = window.innerWidth;
      if (w < 640) setVisibleCount(1);
      else if (w < 1100) setVisibleCount(2);
      else setVisibleCount(4);
    }
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  useEffect(() => {
    if (!auto || cases.length <= visibleCount) return;
    const t = setInterval(() => {
      setIndex(i => {
        const maxStart = cases.length - visibleCount;
        return i >= maxStart ? 0 : i + 1;
      });
    }, interval);
    return () => clearInterval(t);
  }, [auto, interval, cases.length, visibleCount]);

  function prev() {
    setIndex(i => {
      const maxStart = cases.length - visibleCount;
      return i <= 0 ? maxStart : i - 1;
    });
  }
  function next() {
    setIndex(i => {
      const maxStart = cases.length - visibleCount;
      return i >= maxStart ? 0 : i + 1;
    });
  }

  if (!cases.length) return <p className="muted">暂无案例</p>;
  const translatePercent = index * 25;
  return (
    <div className={styles.wrapper}>
      <div className={styles.viewport}>
        <div className={styles.track} style={{ transform: `translateX(-${translatePercent}%)` }}>
          {cases.map(c => {
            const date = c.publishDate ? new Date(c.publishDate).toLocaleDateString('zh-CN') : '';
            return (
              <div className={styles.card} key={c.slug}>
                <div className={styles.imgWrap}>
                  {c.featuredImage ? (
                    <img src={c.featuredImage} alt={c.title} />
                  ) : (
                    <div className={styles.placeholder}>图片</div>
                  )}
                </div>
                <div className={styles.body}>
                  <h3 className={styles.title}>{c.title}</h3>
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
      {cases.length > visibleCount && (
        <div className={styles.controls}>
          <button onClick={prev} aria-label="上一�? className={styles.btn}>�?/button>
          <div className={styles.dots}>
            {Array.from({ length: cases.length - visibleCount + 1 }).map((_, i) => (
              <button key={i} onClick={() => setIndex(i)} className={i === index ? styles.dotActive : styles.dot} aria-label={`位置 ${i + 1}`} />
            ))}
          </div>
          <button onClick={next} aria-label="下一�? className={styles.btn}>�?/button>
        </div>
      )}
    </div>
  );
}
