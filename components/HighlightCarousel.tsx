'use client';

import { useState, useRef } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { Photo, formatDate } from '@/data/photos';

const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? '';

interface Props {
  title: string;
  gradient: string;
  photos: Photo[];
  onClose: () => void;
}

export default function HighlightCarousel({ title, gradient, photos, onClose }: Props) {
  const [idx, setIdx] = useState(0);
  const touchStartX = useRef<number | null>(null);

  const prev = () => setIdx(i => (i - 1 + photos.length) % photos.length);
  const next = () => setIdx(i => (i + 1) % photos.length);

  // Swipe support
  const onTouchStart = (e: React.TouchEvent) => { touchStartX.current = e.touches[0].clientX; };
  const onTouchEnd   = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(dx) > 40) dx < 0 ? next() : prev();
    touchStartX.current = null;
  };

  if (photos.length === 0) return null;
  const photo = photos[idx];

  return (
    <div
      className="fixed inset-0 z-[100] bg-black/70 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-surface rounded-3xl w-full max-w-sm overflow-hidden shadow-2xl animate-slide-up"
        onClick={e => e.stopPropagation()}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        {/* Header */}
        <div className={`px-6 py-4 bg-gradient-to-r ${gradient} flex items-center justify-between`}>
          <h2 className="font-display text-xl font-black text-primary">{title}</h2>
          <button onClick={onClose} className="bg-surface/60 rounded-full p-1.5 hover:bg-surface/80 transition-colors">
            <X size={18} className="text-primary" />
          </button>
        </div>

        {/* Photo with wheel feel: adjacent photos peeking */}
        <div className="relative overflow-hidden bg-surface-container-highest" style={{ height: '72vw', maxHeight: '340px' }}>
          {/* Prev photo peek */}
          {photos.length > 1 && (
            <div className="absolute left-0 top-0 h-full w-12 overflow-hidden opacity-30">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`${BASE}/photos/${encodeURIComponent(photos[(idx - 1 + photos.length) % photos.length].filename)}`}
                alt="" className="h-full w-auto object-cover scale-90 origin-right"
              />
            </div>
          )}

          {/* Current photo */}
          <div
            key={idx}
            className="absolute inset-0 mx-10 animate-fade-in"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`${BASE}/photos/${encodeURIComponent(photo.filename)}`}
              alt="ivyの写真"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Next photo peek */}
          {photos.length > 1 && (
            <div className="absolute right-0 top-0 h-full w-12 overflow-hidden opacity-30">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`${BASE}/photos/${encodeURIComponent(photos[(idx + 1) % photos.length].filename)}`}
                alt="" className="h-full w-auto object-cover scale-90 origin-left"
              />
            </div>
          )}

          {/* Nav arrows */}
          {photos.length > 1 && (
            <>
              <button
                onClick={prev}
                className="absolute left-2 top-1/2 -translate-y-1/2 bg-surface/80 rounded-full p-2 shadow hover:scale-110 transition-transform z-10"
              >
                <ChevronLeft size={20} className="text-primary" />
              </button>
              <button
                onClick={next}
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-surface/80 rounded-full p-2 shadow hover:scale-110 transition-transform z-10"
              >
                <ChevronRight size={20} className="text-primary" />
              </button>
            </>
          )}
        </div>

        {/* Date + dots */}
        <div className="p-5 text-center">
          <p className="font-medium text-primary text-sm">{formatDate(photo.date)}</p>
          <p className="text-xs text-on-surface-variant mt-0.5">{idx + 1} / {photos.length} 枚</p>

          {/* Dot indicator (max 10 dots shown) */}
          <div className="flex justify-center gap-1.5 mt-3 flex-wrap">
            {photos.slice(0, 10).map((_, i) => (
              <button
                key={i}
                onClick={() => setIdx(i)}
                className={`rounded-full transition-all duration-200 ${
                  i === idx % 10
                    ? 'bg-primary w-5 h-2'
                    : 'bg-outline-variant w-2 h-2'
                }`}
              />
            ))}
            {photos.length > 10 && (
              <span className="text-[10px] text-on-surface-variant self-center">…</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
