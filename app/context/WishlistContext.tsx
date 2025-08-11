'use client';

import { createContext, useContext, useState, useCallback, ReactNode, useEffect } from 'react';

interface WishlistContextType {
  wishlist: Set<string | number>;
  toggleWishlistItem: (productId: string | number) => void;
  isInWishlist: (productId: string | number) => boolean;
}

const WISHLIST_STORAGE_KEY = 'nexis_wishlist';

const WishlistContext = createContext<WishlistContextType | null>(null);

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [wishlist, setWishlist] = useState<Set<string | number>>(new Set());
  const [isMounted, setIsMounted] = useState(false);

  // Load wishlist from localStorage on mount
  useEffect(() => {
    try {
      const savedWishlist = localStorage.getItem(WISHLIST_STORAGE_KEY);
      if (savedWishlist) {
        const parsed = JSON.parse(savedWishlist);
        console.log('Loaded wishlist from storage:', parsed);
        setWishlist(new Set(parsed));
      } else {
        console.log('No saved wishlist found in storage');
      }
      setIsMounted(true);
    } catch (error) {
      console.error('Error loading wishlist from localStorage:', error);
    }
  }, []);

  // Save wishlist to localStorage whenever it changes
  useEffect(() => {
    if (!isMounted) return;
    
    try {
      const wishlistArray = Array.from(wishlist);
      console.log('Saving wishlist to storage:', wishlistArray);
      localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(wishlistArray));
    } catch (error) {
      console.error('Error saving wishlist to localStorage:', error);
    }
  }, [wishlist, isMounted]);

  const toggleWishlistItem = useCallback((productId: string | number) => {
    // Convert productId to string to ensure consistent type comparison
    const id = String(productId);
    console.log('Toggling wishlist item (original id, string id):', productId, id);
    
    setWishlist(prev => {
      const newWishlist = new Set(prev);
      if (newWishlist.has(id)) {
        console.log('Removing from wishlist:', id);
        newWishlist.delete(id);
      } else {
        console.log('Adding to wishlist:', id);
        newWishlist.add(id);
      }
      console.log('New wishlist state:', Array.from(newWishlist));
      return newWishlist;
    });
  }, []);

  const isInWishlist = useCallback((productId: string | number) => {
    // Convert productId to string for consistent comparison
    const id = String(productId);
    const inWishlist = wishlist.has(id);
    console.log(`Checking if ${id} is in wishlist:`, inWishlist);
    console.log('Current wishlist:', Array.from(wishlist));
    return inWishlist;
  }, [wishlist]);

  return (
    <WishlistContext.Provider value={{ wishlist, toggleWishlistItem, isInWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
}
