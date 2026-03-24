'use client';

import { useEffect, useState } from 'react';
import { Heart, Images } from 'lucide-react';
import { Photo, formatDate } from '@/data/photos';
import Lightbox from './Lightbox';

const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? '';

function getMonthLabel(dateStr: string): string {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const [year, month] = dateStr.split('-');
  return `${months[parseInt(month) - 1]} ${year}`;
}

export default function PhotoStream({ photos }: { photos: Photo[] }) {
  const [liked, setLiked] = useState<Set<string>>(new Set());
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [showOnlyLiked, setShowOnlyLiked] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem('ivy-likes');
      if (stored) setLiked(new Set(JSON.parse(stored)));
    } catch {}
  }, []);

  const toggleLike = (id: string, e?: React.MouseEvent) => {
    e?.stopPropagation();
    setLiked((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      try { localStorage.setItem('ivy-likes', JSON.stringify([...next])); } catch {}
      return next;
    });
  };

  const displayPhotos = showOnlyLiked
    ? photos.filter((p) => liked.has(p.id))
    : photos;

  return (
    <>
      {/* Filter chips */}
      <div className="flex gap-3 mb-8">
        <button
          onClick={() => setShowOnlyLiked(false)}
          className={`px-5 py-2 rounded-full text-sm font-bold transition-all ${
            !showOnlyLiked
              ? 'bg-primary text-on-primary shadow-sm'
              : 'bg-surface-container text-on-surface-variant hover:bg-surface-container-high'
          }`}
        >
          すべて ({photos.length})
        </button>
        <button
          onClick={() => setShowOnlyLiked(true)}
          className={`flex items-center gap-1.5 px-5 py-2 rounded-full text-sm font-bold transition-all ${
            showOnlyLiked
              ? 'bg-secondary text-on-secondary shadow-sm'
              : 'bg-surface-container text-on-surface-variant hover:bg-surface-container-high'
          }`}
        >
          <Heart size={14} className={showOnlyLiked ? 'fill-on-secondary stroke-on-secondary' : ''} />
          お気に入り ({liked.size})
        </button>
        <button
          onClick={() => setShowOnlyLiked(false)}
          className="ml-auto flex items-center gap-1.5 px-5 py-2 rounded-full text-sm font-bold bg-surface-container text-on-surface-variant hover:bg-surface-container-high transition-all"
        >
          <Images size={14} />
          全部見る
        </button>
      </div>

      {/* Masonry photo grid */}
      {displayPhotos.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 text-on-surface-variant">
          <Heart size={40} className="mb-3 stroke-outline-variant" />
          <p className="text-sm font-medium">まだお気に入りがありません</p>
          <p className="text-xs mt-1 opacity-70">写真を開いてハートを押してみてね</p>
        </div>
      ) : (
        <div className="columns-1 sm:columns-2 gap-6 space-y-6">
          {displayPhotos.map((photo, idx) => {
            const isLiked = liked.has(photo.id);
            const originalIndex = photos.indexOf(photo);
            const offsetClass = idx % 2 === 1 ? 'sm:mt-10' : '';
            // Alternate subtle tilt for polaroid feel
            const tiltClass = idx % 3 === 0
              ? 'rotate-[0.8deg]'
              : idx % 3 === 1
              ? '-rotate-[0.8deg]'
              : 'rotate-[0.4deg]';
            return (
              <div
                key={photo.id}
                className={`break-inside-avoid group cursor-pointer transition-all duration-300 animate-pop-in ${offsetClass} ${tiltClass} hover:rotate-0 hover:scale-[1.02] hover:z-10 relative`}
                style={{ animationDelay: `${Math.min(idx * 70, 560)}ms` }}
                onClick={() => setActiveIndex(originalIndex)}
              >
                {/* Polaroid card */}
                <div className="bg-white p-2 pb-8 shadow-md group-hover:shadow-2xl transition-shadow duration-300">
                  <div className="overflow-hidden bg-surface-container-highest">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={`${BASE}/photos/${encodeURIComponent(photo.filename)}`}
                      alt="ivyの写真"
                      className="w-full object-cover group-hover:scale-[1.04] transition-transform duration-500"
                      loading="lazy"
                    />
                  </div>
                  <div className="pt-3 px-1">
                    <div className="flex justify-between items-center">
                      <span className="bg-primary/5 text-primary px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                        {getMonthLabel(photo.date)}
                      </span>
                      <button
                        onClick={(e) => toggleLike(photo.id, e)}
                        className={`hover:animate-wiggle transition-transform ${isLiked ? 'text-coral' : 'text-secondary'}`}
                        aria-label={isLiked ? 'いいね済み' : 'いいね'}
                      >
                        <Heart
                          size={22}
                          className={isLiked ? 'fill-coral stroke-coral' : 'stroke-secondary'}
                        />
                      </button>
                    </div>
                    <p className="mt-2 font-medium text-on-surface-variant text-sm">
                      {formatDate(photo.date)}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {activeIndex !== null && (
        <Lightbox
          photos={photos}
          initialIndex={activeIndex}
          liked={liked}
          onClose={() => setActiveIndex(null)}
          onToggleLike={toggleLike}
        />
      )}
    </>
  );
}
