'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const brands = [
  { id: 1, name: 'Nike', logo: '/brands/nike.svg' },
  { id: 2, name: 'Adidas', logo: '/brands/adidas.svg' },
  { id: 3, name: 'Apple', logo: '/brands/apple.svg' },
  { id: 4, name: 'Samsung', logo: '/brands/samsung.svg' },
  { id: 5, name: 'Sony', logo: '/brands/sony.svg' },
  { id: 6, name: 'Microsoft', logo: '/brands/microsoft.svg' },
  { id: 7, name: 'Dell', logo: '/brands/dell.svg' },
  { id: 8, name: 'HP', logo: '/brands/hp.svg' },
];

function TrustedBrands() {
  const scrollContainer = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainer.current) {
      const scrollAmount = direction === 'right' ? 200 : -200;
      scrollContainer.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  // Auto-scroll effect
  useEffect(() => {
    const container = scrollContainer.current;
    if (!container) return;

    let scrollAmount = 0;
    const maxScroll = container.scrollWidth - container.clientWidth;
    
    const autoScroll = () => {
      if (scrollAmount >= maxScroll) {
        scrollAmount = 0;
        container.scrollTo({ left: 0, behavior: 'auto' });
      } else {
        scrollAmount += 1;
        container.scrollTo({ left: scrollAmount, behavior: 'auto' });
      }
    };

    const interval = setInterval(autoScroll, 50);
    return () => clearInterval(interval);
  }, []);

  if (typeof window === 'undefined') {
    return null; // Don't render on the server
  }

  return (
    <div className="w-full bg-white py-8 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-center text-lg font-medium text-gray-900 mb-6">
          Trusted by Leading Brands
        </h2>
        
        <div className="relative">
          <Button 
            variant="outline" 
            size="icon"
            onClick={() => scroll('left')}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 backdrop-blur-sm hover:bg-white shadow-md"
            aria-label="Scroll left"
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
          
          <div 
            ref={scrollContainer}
            className="flex space-x-8 overflow-x-auto py-4 scrollbar-hide"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {brands.map((brand) => (
              <div 
                key={brand.id} 
                className="flex-shrink-0 flex items-center justify-center p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200"
              >
                <div className="relative w-24 h-16">
                  <Image
                    src={brand.logo}
                    alt={brand.name}
                    fill
                    className="object-contain object-center"
                    sizes="(max-width: 768px) 6rem, 8rem"
                  />
                </div>
              </div>
            ))}
          </div>
          
          <Button 
            variant="outline" 
            size="icon"
            onClick={() => scroll('right')}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 backdrop-blur-sm hover:bg-white shadow-md"
            aria-label="Scroll right"
          >
            <ChevronRight className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
}

export default TrustedBrands;
