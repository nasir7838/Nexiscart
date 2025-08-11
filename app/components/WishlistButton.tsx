"use client";

import { useState, useEffect } from 'react';
import { Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface WishlistButtonProps {
  productId: string;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export function WishlistButton({ 
  productId, 
  className = '',
  size = 'md'
}: WishlistButtonProps) {
  const [isInWishlist, setIsInWishlist] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Check if item is in wishlist on component mount
  useEffect(() => {
    const checkWishlistStatus = () => {
      if (typeof window !== 'undefined') {
        const wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
        setIsInWishlist(wishlist.includes(productId));
      }
    };
    
    checkWishlistStatus();
  }, [productId]);

  const toggleWishlist = () => {
    try {
      setIsLoading(true);
      
      if (typeof window !== 'undefined') {
        const wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
        let updatedWishlist;
        
        if (isInWishlist) {
          updatedWishlist = wishlist.filter((id: string) => id !== productId);
          console.log('Removed from wishlist');
        } else {
          updatedWishlist = [...wishlist, productId];
          console.log('Added to wishlist');
        }
        
        localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
        setIsInWishlist(!isInWishlist);
      }
      
    } catch (error) {
      console.error('Error updating wishlist:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const sizeClasses = {
    sm: 'h-8 w-8',
    md: 'h-10 w-10',
    lg: 'h-12 w-12',
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleWishlist}
      disabled={isLoading}
      className={`rounded-full ${sizeClasses[size]} ${className} ${
        isInWishlist ? 'text-red-500 hover:text-red-600' : 'text-gray-400 hover:text-gray-500'
      }`}
      aria-label={isInWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
    >
      <Heart className={`h-5 w-5 ${isInWishlist ? 'fill-current' : ''}`} />
    </Button>
  );
}
