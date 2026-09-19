import { useEffect } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import type { ImageAsset } from '@/types';

/**
 * Full-size photo viewer with keyboard (Escape / arrow keys) and click
 * navigation between photos. `index === null` renders nothing.
 */
export function Lightbox({
  photos,
  index,
  onClose,
  onChange,
}: {
  photos: ImageAsset[];
  index: number | null;
  onClose: () => void;
  onChange: (index: number) => void;
}) {
  const open = index !== null;
  const count = photos.length;

  const goPrev = () => { if (index !== null) onChange((index - 1 + count) % count); };
  const goNext = () => { if (index !== null) onChange((index + 1) % count); };

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') goPrev();
      if (e.key === 'ArrowRight') goNext();
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, index, count]);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  if (!open || index === null) return null;
  const photo = photos[index];

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 sm:p-8"
      role="dialog"
      aria-modal="true"
      aria-label={`Photo ${index + 1} of ${count}`}
    >
      <button
        className="absolute inset-0"
        aria-label="Close photo viewer"
        onClick={onClose}
      />

      <button
        onClick={onClose}
        className="absolute right-4 top-4 z-10 inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
        aria-label="Close"
      >
        <X className="h-6 w-6" aria-hidden />
      </button>

      {count > 1 && (
        <button
          onClick={(e) => { e.stopPropagation(); goPrev(); }}
          className="absolute left-2 top-1/2 z-10 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white sm:left-4"
          aria-label="Previous photo"
        >
          <ChevronLeft className="h-7 w-7" aria-hidden />
        </button>
      )}

      <img
        src={photo.src}
        alt={photo.alt}
        className="relative max-h-full max-w-full select-none rounded-lg object-contain shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      />

      {count > 1 && (
        <button
          onClick={(e) => { e.stopPropagation(); goNext(); }}
          className="absolute right-2 top-1/2 z-10 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white sm:right-4"
          aria-label="Next photo"
        >
          <ChevronRight className="h-7 w-7" aria-hidden />
        </button>
      )}

      {count > 1 && (
        <p className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-white/10 px-3 py-1 text-sm text-white">
          {index + 1} / {count}
        </p>
      )}
    </div>
  );
}
