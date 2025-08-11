'use client';

import { useState, useMemo } from 'react';

// A simple SVG placeholder component
const PlaceholderSvg = () => (
  <div className="w-full h-full flex items-center justify-center bg-gray-100">
    <svg 
      width="100%" 
      height="100%" 
      viewBox="0 0 400 300" 
      xmlns="http://www.w3.org/2000/svg"
      className="text-gray-300"
    >
      <rect width="100%" height="100%" fill="#f3f4f6" />
      <text 
        x="50%" 
        y="50%" 
        fontFamily="Arial" 
        fontSize="14" 
        textAnchor="middle" 
        dominantBaseline="middle"
        fill="#666"
      >
        Loading...
      </text>
    </svg>
  </div>
);

interface ProductImageProps {
  src: string;
  alt: string;
  className?: string;
}

export default function ProductImage({ src, alt, className = '' }: ProductImageProps) {
  const [imgSrc, setImgSrc] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  // Handle image loading
  const handleLoad = () => {
    setIsLoading(false);
    setHasError(false);
  };

  // Handle image errors
  const handleError = () => {
    setIsLoading(false);
    setHasError(true);
  };

  // Only set the image source if it's different from the current one
  useMemo(() => {
    setImgSrc(src);
    setIsLoading(true);
    setHasError(false);
  }, [src]);

  // If there was an error loading the image, show the placeholder
  if (hasError) {
    return (
      <div className={`relative ${className}`}>
        <PlaceholderSvg />
      </div>
    );
  }

  return (
    <div className={`relative ${className}`}>
      {imgSrc && (
        <img
          src={imgSrc}
          alt={alt}
          className={`w-full h-full object-cover transition-opacity duration-300 ${
            isLoading ? 'opacity-0' : 'opacity-100'
          }`}
          onError={handleError}
          onLoad={handleLoad}
          loading="lazy"
        />
      )}
      {isLoading && <PlaceholderSvg />}
    </div>
  );
}
