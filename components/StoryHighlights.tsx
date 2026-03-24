'use client';

import { useState } from 'react';
import { Photo } from '@/data/photos';
import HighlightCarousel from './HighlightCarousel';

const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? '';

interface HighlightItem {
  label: string;
  gradient: string;
  photos: Photo[];
  coverPhoto: Photo;
}

interface Props {
  items: HighlightItem[];
}

export default function StoryHighlights({ items }: Props) {
  const [open, setOpen] = useState<HighlightItem | null>(null);

  return (
    <>
      <div className="flex gap-8 md:gap-12 overflow-x-auto pb-4 no-scrollbar items-start justify-start md:justify-center">
        {items.map((item) => (
          <button
            key={item.label}
            onClick={() => setOpen(item)}
            className="flex flex-col items-center gap-3 shrink-0 group focus:outline-none"
          >
            <div
              className={`w-24 h-24 rounded-full p-1 bg-gradient-to-tr ${item.gradient} group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-md group-hover:shadow-lg`}
            >
              <div className="w-full h-full rounded-full border-4 border-surface overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`${BASE}/photos/${encodeURIComponent(item.coverPhoto.filename)}`}
                  alt={item.label}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <span className="text-sm font-bold text-primary text-center">{item.label}</span>
            <span className="text-[10px] text-on-surface-variant -mt-2">{item.photos.length}枚</span>
          </button>
        ))}
      </div>

      {open && (
        <HighlightCarousel
          title={open.label}
          gradient={open.gradient}
          photos={open.photos}
          onClose={() => setOpen(null)}
        />
      )}
    </>
  );
}
