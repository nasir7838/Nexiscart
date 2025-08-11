'use client';

import { useContext, useCallback, useMemo } from 'react';
import { CartContext } from '../context/CartContext';
import type { CartItem } from '../context/CartContext';

// Re-export the CartItem type for use in other components
export type { CartItem };

interface UseCartReturn {
  items: CartItem[];
  addItem: (product: Omit<CartItem, 'quantity'>) => void;
  removeItem: (id: string | number) => void;
  updateItemQuantity: (id: string | number, quantity: number) => void;
  clearCart: () => void;
  getItemCount: () => number;
  getCartTotal: () => number;
  itemCount: number;
  total: number;
}

export function useCart(): UseCartReturn {
  const context = useContext(CartContext);
  
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  
  const { 
    items = [], 
    addToCart, 
    removeFromCart, 
    updateItemQuantity: updateQuantity, 
    clearCart, 
    getCartTotal, 
    getItemCount 
  } = context;
  
  const updateItemQuantity = useCallback((id: string | number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id);
    } else {
      updateQuantity(id, quantity);
    }
  }, [removeFromCart, updateQuantity]);
  
  const addItem = useCallback((product: Omit<CartItem, 'quantity'>) => {
    const newItem: CartItem = {
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1
    };
    addToCart(newItem);
  }, [addToCart]);
  
  const removeItem = useCallback((id: string | number) => {
    removeFromCart(id);
  }, [removeFromCart]);
  
  const clearCartHandler = useCallback(() => {
    clearCart();
  }, [clearCart]);
  
  // Memoize the item count and total to prevent unnecessary recalculations
  const itemCount = useMemo(() => getItemCount(), [getItemCount, items]);
  const total = useMemo(() => getCartTotal(), [getCartTotal, items]);
  
  // Memoize the entire return value to prevent unnecessary re-renders
  return useMemo(() => ({
    items,
    addItem,
    removeItem,
    updateItemQuantity,
    clearCart: clearCartHandler,
    getItemCount,
    getCartTotal,
    itemCount,
    total
  }), [items, addItem, removeItem, updateItemQuantity, clearCartHandler, getItemCount, getCartTotal, itemCount, total]);
}
