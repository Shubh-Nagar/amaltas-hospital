import { ImageIcon } from 'lucide-react';
import type { ImageAsset } from '@/types';
import { cn } from '@/lib/utils';
import { placeholderGradient } from '@/lib/utils';

/**
 * Renders a real image when available, otherwise a tasteful gradient tile with
 * a caption — NEVER a stock photo. Missing assets stay visibly "to-be-supplied"
 * so the content team can spot them. Prevents layout shift via aspect ratio.
 */
export function Placeholder({
  asset,
  aspect = 'aspect-[4/3]',
  className,
  rounded = 'rounded-2xl',
  label,
}: {
  asset?: ImageAsset;
  aspect?: string;
  className?: string;
  rounded?: string;
  label?: string;
}) {
  const showImage = asset && asset.src && !asset.placeholder;
  if (showImage) {
    return (
      <img
        src={asset.src}
        alt={asset.alt}
        width={asset.width}
        height={asset.height}
        loading="lazy"
        decoding="async"
        className={cn('h-full w-full object-cover', aspect, rounded, className)}
      />
    );
  }
  const caption = label ?? asset?.alt ?? 'Image';
  return (
    <div
      role="img"
      aria-label={`${caption} (photo to be added)`}
      className={cn('relative flex items-center justify-center overflow-hidden', aspect, rounded, className)}
      style={{ background: placeholderGradient(caption) }}
    >
      <div className="flex flex-col items-center gap-1.5 px-4 text-center text-brand-800/70">
        <ImageIcon className="h-6 w-6" aria-hidden />
        <span className="text-xs font-medium">{caption}</span>
      </div>
    </div>
  );
}
