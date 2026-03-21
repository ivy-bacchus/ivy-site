'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import Image from 'next/image';
import { X, ChevronLeft, ChevronRight, Play, Pause, Heart } from 'lucide-react';
import { Photo, formatDate } from '@/data/photos';

interface LightboxProps {
  photos: Photo[];
  initialIndex: number;
  liked: Set<string>;
  onClose: () => void;
  onToggleLike: (id: string) => void;
}

export default function Lightbox({
  photos,
  initialIndex,
  liked,
  onClose,
  onToggleLike,
}: LightboxProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progressKey, setProgressKey] = useState(0);
  const [heartAnim, setHeartAnim] = useState(false);
  const touchStartX = useRef<number | null>(null);

  const current = photos[currentIndex];
  const isLiked = liked.has(current.id);

  const goPrev = useCallback(() => {
    setCurrentIndex((i) => (i - 1 + photos.length) % photos.length);
    setProgressKey((k) => k + 1);
  }, [photos.length]);

  const goNext = useCallback(() => {
    setCurrentIndex((i) => (i + 1) % photos.length);
    setProgressKey((k) => k + 1);
  }, [photos.length]);

  // Slideshow timer
  useEffect(() => {
    if (!isPlaying) return;
    const timer = setInterval(goNext, 3500);
    return () => clearInterval(timer);
  }, [isPlaying, goNext]);

  // Keyboard navigation
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') goPrev();
      if (e.key === 'ArrowRight') goNext();
      if (e.key === ' ') {
        e.preventDefault();
        setIsPlaying((p) => !p);
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [onClose, goPrev, goNext]);

  // Lock body scroll
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      diff > 0 ? goNext() : goPrev();
    }
    touchStartX.current = null;
  };

  const handleLike = () => {
    onToggleLike(current.id);
    setHeartAnim(true);
    setTimeout(() => setHeartAnim(false), 350);
  };

  const handleDoubleClick = () => {
    handleLike();
  };

  return (
    <div
      className="lightbox-overlay fixed inset-0 z-[100] flex flex-col bg-black/95 animate-fade-in"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Top bar */}
      <div className="flex items-center justify-between px-4 py-3 text-white/80 shrink-0">
        <span className="text-sm font-medium">
          {formatDate(current.date)}
        </span>
        <span className="text-sm text-white/50">
          {currentIndex + 1} / {photos.length}
        </span>
        <button
          onClick={onClose}
          className="p-2 rounded-full hover:bg-white/10 transition-colors active:bg-white/20"
          aria-label="閉じる"
        >
          <X size={22} />
        </button>
      </div>

      {/* Slideshow progress bar */}
      {isPlaying && (
        <div className="h-0.5 w-full bg-white/10 shrink-0">
          <div
            key={progressKey}
            className="h-full bg-white/60 progress-bar"
          />
        </div>
      )}

      {/* Photo */}
      <div className="relative flex-1 flex items-center justify-center min-h-0">
        {/* Prev button */}
        <button
          onClick={goPrev}
          className="absolute left-2 z-10 p-2 rounded-full bg-black/30 text-white hover:bg-black/50 transition-colors hidden sm:flex items-center justify-center"
          aria-label="前の写真"
        >
          <ChevronLeft size={28} />
        </button>

        {/* Image */}
        <div
          className="relative w-full h-full"
          onDoubleClick={handleDoubleClick}
        >
          <Image
            key={current.id}
            src={`${process.env.NEXT_PUBLIC_BASE_PATH ?? ''}/photos/${encodeURIComponent(current.filename)}`}
            alt={`ivyの写真 ${formatDate(current.date)}`}
            fill
            className="object-contain animate-fade-in"
            sizes="100vw"
            priority
          />
        </div>

        {/* Next button */}
        <button
          onClick={goNext}
          className="absolute right-2 z-10 p-2 rounded-full bg-black/30 text-white hover:bg-black/50 transition-colors hidden sm:flex items-center justify-center"
          aria-label="次の写真"
        >
          <ChevronRight size={28} />
        </button>
      </div>

      {/* Bottom bar */}
      <div className="flex items-center justify-between px-6 py-4 shrink-0">
        {/* Like button */}
        <button
          onClick={handleLike}
          className="flex items-center gap-2 text-white/80 active:scale-90 transition-transform"
          aria-label={isLiked ? 'いいね済み' : 'いいね'}
        >
          <Heart
            size={28}
            className={`transition-colors ${heartAnim ? 'animate-heart-pop' : ''} ${
              isLiked ? 'fill-rose-400 stroke-rose-400' : 'stroke-white/80'
            }`}
          />
        </button>

        {/* Slideshow toggle */}
        <button
          onClick={() => setIsPlaying((p) => !p)}
          className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-white text-sm hover:bg-white/20 transition-colors active:bg-white/30"
          aria-label={isPlaying ? '一時停止' : 'スライドショー開始'}
        >
          {isPlaying ? <Pause size={18} /> : <Play size={18} />}
          <span>{isPlaying ? '停止' : 'スライドショー'}</span>
        </button>

        {/* Dot indicator (mobile) */}
        <div className="w-7 flex justify-end">
          <span className="text-white/40 text-xs">{isLiked ? '♥' : ''}</span>
        </div>
      </div>

      {/* Swipe hint */}
      <p className="text-center pb-3 text-white/20 text-xs shrink-0 sm:hidden">
        スワイプで切り替え
      </p>
    </div>
  );
}
