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

  // Load likes from localStorage
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
    const originalIndex = photos.indexOf(photo);
    setActiveIndex(originalIndex);
  };

  return (
    <>
      {/* Filter bar */}
      <div className="flex items-center gap-3 px-4 pb-4">
        <button
          onClick={() => setShowOnlyLiked(false)}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
            !showOnlyLiked
              ? 'bg-bark-500 text-white'
              : 'bg-bark-100 text-bark-600 hover:bg-bark-200'
          }`}
        >
          <Images size={14} />
          すべて ({photos.length})
        </button>
        <button
          onClick={() => setShowOnlyLiked(true)}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
            showOnlyLiked
              ? 'bg-rose-400 text-white'
              : 'bg-rose-50 text-rose-400 hover:bg-rose-100'
          }`}
        >
          <Heart size={14} className={showOnlyLiked ? 'fill-white' : ''} />
          お気に入り ({liked.size})
        </button>
      </div>

      {/* Photo grid */}
      {displayPhotos.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 text-gray-400">
          <Heart size={40} className="mb-3 stroke-gray-300" />
          <p className="text-sm">まだお気に入りがありません</p>
          <p className="text-xs mt-1">写真を開いてハートを押してみてね</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-1 px-1">
          {displayPhotos.map((photo) => {
            const isLiked = liked.has(photo.id);
            return (
              <button
                key={photo.id}
                onClick={() => openLightbox(photo)}
                className="photo-tile relative aspect-square overflow-hidden rounded-sm bg-bark-100 group"
                aria-label={`ivyの写真を開く`}
              >
                <Image
                  src={`${process.env.NEXT_PUBLIC_BASE_PATH ?? ''}/photos/${encodeURIComponent(photo.filename)}`}
                  alt="ivyの写真"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  loading="lazy"
                />
                {/* Like indicator */}
                {isLiked && (
                  <div className="absolute bottom-1.5 right-1.5 pointer-events-none">
                    <Heart
                      size={16}
                      className="fill-rose-400 stroke-rose-400 drop-shadow-sm"
                    />
                  </div>
                )}
              </button>
            );
          })}
        </div>
      )}

      {/* Lightbox */}
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
