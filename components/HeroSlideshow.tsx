'use client';

import { useState, useEffect } from 'react';
import { Photo } from '@/data/photos';

const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? '';

export default function HeroSlideshow({ photos }: { photos: Photo[] }) {
  const [currentIdx, setCurrentIdx] = useState(photos.length - 1);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setCurrentIdx((prev) => (prev - 1 + photos.length) % photos.length);
        setVisible(true);
      }, 600);
    }, 4500);
    return () => clearInterval(interval);
  }, [photos.length]);

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={`${BASE}/photos/${encodeURIComponent(photos[currentIdx].filename)}`}
      alt="ivyの写真"
      className={`w-full h-full object-cover rounded-full shadow-2xl border-[10px] border-white/60 transition-opacity duration-700 ${visible ? 'opacity-100' : 'opacity-0'}`}
    />
  );
}
