'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Heart, Images } from 'lucide-react';
import { Photo } from '@/data/photos';
import Lightbox from './Lightbox';

interface GalleryProps {
  photos: Photo[];
}

export default function Gallery({ photos }: GalleryProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [liked, setLiked] = useState<Set<string>>(new Set());
  const [showOnlyLiked, setShowOnlyLiked] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem('ivy-likes');
      if (stored) setLiked(new Set(JSON.parse(stored)));
    } catch {}
  }, []);

  const toggleLike = (id: string) => {
    setLiked((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      try {
        localStorage.setItem('ivy-likes', JSON.stringify([...next]));
      } catch {}
      return next;
    });
  };

  const displayPhotos = showOnlyLiked
    ? photos.filter((p) => liked.has(p.id))
    : photos;

  const openLightbox = (photo: Photo) => {
    setActiveIndex(photos.indexOf(photo));
  };

  return (
    <>
      {/* Filter chips */}
      <div className="flex items-center gap-2 px-4 pb-5">
        <button
          onClick={() => setShowOnlyLiked(false)}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-all ${
            !showOnlyLiked
              ? 'bg-bark-500 text-white shadow-sm'
              : 'bg-bark-100 text-bark-500 hover:bg-bark-200'
          }`}
        >
          <Images size={14} />
          すべて ({photos.length})
        </button>
        <button
          onClick={() => setShowOnlyLiked(true)}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-all ${
            showOnlyLiked
              ? 'bg-rose-400 text-white shadow-sm'
              : 'bg-rose-50 text-rose-400 hover:bg-rose-100'
          }`}
        >
          <Heart size={14} className={showOnlyLiked ? 'fill-white' : ''} />
          お気に入り ({liked.size})
        </button>
      </div>

      {/* Photo grid */}
      {displayPhotos.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 text-bark-300">
          <Heart size={40} className="mb-3 stroke-bark-200" />
          <p className="text-sm font-medium">まだお気に入りがありません</p>
          <p className="text-xs mt-1 text-bark-200">写真を開いてハートを押してみてね</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-1.5 px-2">
          {displayPhotos.map((photo) => {
            const isLiked = liked.has(photo.id);
            return (
              <button
                key={photo.id}
                onClick={() => openLightbox(photo)}
                className="photo-tile relative aspect-square overflow-hidden rounded-xl bg-bark-100 group hover:scale-[1.02] hover:shadow-md transition-all duration-200"
                aria-label="ivyの写真を開く"
              >
                <Image
                  src={`${process.env.NEXT_PUBLIC_BASE_PATH ?? ''}/photos/${encodeURIComponent(photo.filename)}`}
                  alt="ivyの写真"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  loading="lazy"
                />
                {isLiked && (
                  <div className="absolute bottom-2 right-2 pointer-events-none">
                    <Heart size={16} className="fill-rose-400 stroke-rose-400 drop-shadow-sm" />
                  </div>
                )}
              </button>
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
