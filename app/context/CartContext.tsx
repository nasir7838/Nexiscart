'use client';

import { createContext, useContext, useState, useEffect, ReactNode, useCallback, useRef } from 'react';
import { toast } from 'sonner';

export interface CartItem {
  id: string | number;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

export interface CartContextType {
  items: CartItem[];
  itemCount: number;
  total: number;  // Added total property
  addToCart: (product: Omit<CartItem, 'quantity'>) => void;
  removeFromCart: (productId: string | number) => void;
  updateItemQuantity: (productId: string | number, quantity: number) => void;
  clearCart: () => void;
  getCartTotal: () => number;
  getItemCount: () => number;
}

export const CartContext = createContext<CartContextType | null>(null);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

// Key for localStorage
const CART_STORAGE_KEY = 'nexis_cart';

// Load cart from localStorage with validation
const loadCartFromStorage = (): CartItem[] => {
  if (typeof window === 'undefined') {
    console.log('Running on server side, returning empty cart');
    return [];
  }

  try {
    const savedCart = localStorage.getItem(CART_STORAGE_KEY);
    if (!savedCart) {
      console.log('No saved cart found in localStorage');
      return [];
    }

    const parsedCart = JSON.parse(savedCart);
    
    // Validate the parsed cart is an array
    if (!Array.isArray(parsedCart)) {
      console.warn('Saved cart is not an array, resetting cart');
      return [];
    }

    // Validate each item in the cart
    const validatedCart = parsedCart.filter((item: any) => {
      const isValid = item && 
        item.id !== undefined && 
        item.name !== undefined &&
        typeof item.price === 'number' &&
        item.image !== undefined &&
        typeof item.quantity === 'number';
      
      if (!isValid) {
        console.warn('Invalid cart item found:', item);
      }
      
      return isValid;
    });

    console.log('Successfully loaded cart from localStorage:', validatedCart);
    return validatedCart;
  } catch (error) {
    console.error('Error loading cart from localStorage:', error);
    // In case of error, return an empty array to reset the cart
    return [];
  }
};

export function CartProvider({ children }: { children: ReactNode }): React.ReactElement {
  const [items, setItems] = useState<CartItem[]>([]);
  const isInitialized = useRef(false);

  // Load cart from localStorage on mount
  useEffect(() => {
    if (isInitialized.current) return;
    
    try {
      const savedCart = loadCartFromStorage();
      console.log('Initial cart load:', savedCart);
      setItems(savedCart);
    } catch (error) {
      console.error('Error loading cart:', error);
    } finally {
      isInitialized.current = true;
    }
  }, []);

  // Save to localStorage when items change
  useEffect(() => {
    if (!isInitialized.current) return;
    
    try {
      console.log('Saving cart to localStorage:', items);
      if (typeof window !== 'undefined') {
        localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
      }
    } catch (error) {
      console.error('Error saving cart to localStorage:', error);
    }
  }, [items]);

  const addToCart = useCallback((product: Omit<CartItem, 'quantity'> & { quantity?: number }) => {
    console.group('🛒 addToCart');
    try {
      if (!product || !product.id) {
        console.error('Invalid product:', product);
        toast.error('Cannot add invalid product to cart');
        return;
      }

      console.log('Product being added:', product);
      
      setItems((prevItems) => {
        try {
          console.log('Current cart items before update:', prevItems);
          
          // Ensure product.id is a string for consistent comparison
          const productId = String(product.id);
          console.log('Product ID (string):', productId);
          
          // Find if the product already exists in the cart
          const existingItemIndex = prevItems.findIndex(item => String(item.id) === productId);
          console.log('Existing item index:', existingItemIndex);
          
          let updatedItems;
          
          if (existingItemIndex >= 0) {
            // Item exists, increment quantity
            console.log('Incrementing quantity of existing item');
            updatedItems = [...prevItems];
            updatedItems[existingItemIndex] = {
              ...updatedItems[existingItemIndex],
              quantity: updatedItems[existingItemIndex].quantity + 1
            };
          } else {
            // Item doesn't exist, add new item
            console.log('Adding new item to cart');
            const newItem: CartItem = { 
              ...product, 
              id: productId,
              quantity: 1 
            };
            console.log('New item created:', newItem);
            updatedItems = [...prevItems, newItem];
          }
          
          console.log('Cart items after update:', updatedItems);
          
          // Save to localStorage
          if (typeof window !== 'undefined') {
            try {
              console.log('Saving to localStorage...');
              localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(updatedItems));
              console.log('✅ Successfully saved to localStorage');
              
              // Show success message
              toast.success(`${product.name} added to cart!`, {
                action: {
                  label: 'View Cart',
                  onClick: () => {
                    window.location.href = '/cart';
                  },
                },
              });
            } catch (error) {
              console.error('Error saving to localStorage:', error);
              toast.error('Failed to save cart');
            }
          }
          
          return updatedItems;
        } catch (error) {
          console.error('Error in addToCart setItems callback:', error);
          toast.error('Failed to update cart');
          return prevItems; // Return previous state on error
        }
      });
    } catch (error) {
      console.error('Unexpected error in addToCart:', error);
      toast.error('An unexpected error occurred');
    } finally {
      console.groupEnd();
    }
  }, []);

  const removeFromCart = (productId: string | number) => {
    setItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === productId);
      if (existingItem && existingItem.quantity > 1) {
        return prevItems.map((item) =>
          item.id === productId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        );
      }
      return prevItems.filter((item) => item.id !== productId);
    });
  };

  const updateItemQuantity = useCallback((productId: string | number, quantity: number) => {
    setItems((prevItems) => {
      return prevItems.map((item) =>
        item.id === productId
          ? { ...item, quantity: Math.max(1, quantity) }
          : item
      );
    });
  }, []);

  const clearCart = () => {
    setItems([]);
  };

  const getCartTotal = () => {
    return items.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  const getItemCount = () => {
    return items.reduce((total, item) => total + item.quantity, 0);
  };

  // Calculate item count from items array
  const itemCount = items.reduce((total, item) => total + item.quantity, 0);
  
  // Calculate total from items array
  const total = getCartTotal();

  // Memoize the context value to prevent unnecessary re-renders
  const contextValue = {
    items,
    itemCount,
    total,
    addToCart,
    removeFromCart,
    updateItemQuantity,
    clearCart,
    getCartTotal,
    getItemCount,
  };

  // Log when the context value changes
  useEffect(() => {
    console.group('Cart Context Value Update');
    console.log('Current cart items:', items);
    console.log('Item count:', itemCount);
    console.log('Total:', total);
    console.groupEnd();
  }, [items, itemCount, total]);

  return (
    <CartContext.Provider value={contextValue}>
      {children}
    </CartContext.Provider>
  );
}
