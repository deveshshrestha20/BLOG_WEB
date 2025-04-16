import Image from 'next/image';
import { useState } from 'react';

interface BlogImageProps {
  src: string;
  alt: string;
  fill?: boolean;
  width?: number;
  height?: number;
  sizes?: string;
  className?: string;
  priority?: boolean;
}

export default function BlogImage({
  src,
  alt,
  fill,
  width,
  height,
  sizes,
  className = '',
  priority = false,
}: BlogImageProps) {
  const [error, setError] = useState(false);

  // Fallback image URL - using a reliable placeholder
  const fallbackImage = 'https://images.unsplash.com/photo-1453928582365-b6ad33cbcf64?auto=format&fit=crop&q=80&w=1000&h=800';

  return (
    <Image
      src={error ? fallbackImage : src}
      alt={alt}
      fill={fill}
      width={!fill ? width : undefined}
      height={!fill ? height : undefined}
      sizes={sizes}
      className={`${className} transition-opacity duration-300`}
      priority={priority}
      onError={() => setError(true)}
      quality={90}
    />
  );
} 