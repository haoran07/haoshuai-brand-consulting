'use client';

import { CSSProperties, useEffect, useRef, useState } from 'react';

type Point = { x: number; y: number };

export default function RevealPortrait() {
  const frameRef = useRef<HTMLDivElement>(null);
  const raw = useRef<Point>({ x: -999, y: -999 });
  const smooth = useRef<Point>({ x: -999, y: -999 });
  const raf = useRef<number | null>(null);
  const [position, setPosition] = useState({ x: 50, y: 50, active: false });

  useEffect(() => {
    const move = (event: MouseEvent) => {
      raw.current = { x: event.clientX, y: event.clientY };
    };

    const animate = () => {
      smooth.current.x += (raw.current.x - smooth.current.x) * 0.14;
      smooth.current.y += (raw.current.y - smooth.current.y) * 0.14;
      const frame = frameRef.current;
      if (frame) {
        const rect = frame.getBoundingClientRect();
        const x = ((smooth.current.x - rect.left) / rect.width) * 100;
        const y = ((smooth.current.y - rect.top) / rect.height) * 100;
        const active = x > -18 && x < 118 && y > -12 && y < 112;
        setPosition({ x, y, active });
      }
      raf.current = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', move, { passive: true });
    raf.current = requestAnimationFrame(animate);
    return () => {
      window.removeEventListener('mousemove', move);
      if (raf.current !== null) cancelAnimationFrame(raf.current);
    };
  }, []);

  const style = {
    '--reveal-x': `${position.x}%`,
    '--reveal-y': `${position.y}%`,
  } as CSSProperties;

  return (
    <div ref={frameRef} className={`portrait portraitReveal ${position.active ? 'is-revealing' : ''}`} style={style}>
      <img className="portraitBase" src="/images/haoshuai-suit.png" alt="郝帅身穿现代西装的侧面肖像" />
      <img className="portraitAlter" src="/images/haoshuai-wukong.png" alt="" aria-hidden="true" />
      <div className="portraitCaption"><span>专业之下，自有锋芒</span><small>MOVE TO REVEAL</small></div>
    </div>
  );
}
