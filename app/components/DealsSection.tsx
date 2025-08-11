"use client"

import { useState, useEffect } from 'react';
import { Star, ShoppingCart, Heart, Clock } from 'lucide-react';
import { Button } from "@/components/ui/button";
import CountdownTimer from "./CountdownTimer";
import { useWishlist } from "../context/WishlistContext";
import { useCart } from "../context/CartContext";
import { toast } from 'sonner';

interface Deal {
  id: number | string;
  name: string;
  brand: string;
  price: number;
  originalPrice: number;
  rating: number;
  reviews: number;
  image: string;
  endTime: string; // ISO string of when the deal ends
  claimed: number;
  stock: number;
}

export default function DealsSection() {
  const [deals, setDeals] = useState<Deal[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  console.log('Rendering DealsSection');
  
  // Get cart and wishlist contexts
  const { addToCart: addItemToCart } = useCart();
  const { toggleWishlistItem, isInWishlist } = useWishlist();
  
  // Debug log cart context
  useEffect(() => {
    console.group('🛒 DealsSection Cart Context');
    console.log('Add to cart function:', typeof addItemToCart === 'function' ? 'Available' : 'Missing');
    console.groupEnd();
  }, [addItemToCart]);
  
  // Check if cart context is properly initialized
  if (typeof addItemToCart !== 'function') {
    return (
      <div className="text-center py-12">
        <p className="text-red-500">Error: Shopping cart is not properly initialized. Please refresh the page.</p>
      </div>
    );
  }

  // Load deals when component mounts
  useEffect(() => {
    const fetchDeals = async () => {
      console.log('Fetching deals...');
      setLoading(true);
      setError(null);
      
      try {
        // In a real app, you would fetch this from your API
        // const response = await fetch('http://127.0.0.1:8000/api/deals');
        // const data = await response.json();
        
        // Mock data for now
        const mockDeals: Deal[] = [
          {
            id: 'deal-1',
            name: "Logitech MX Master 3S Wireless Mouse",
            brand: "Logitech",
            price: 79.99,
            originalPrice: 99.99,
            rating: 4.7,
            reviews: 9876,
            image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=300&h=300&fit=crop",
            endTime: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(), // 24h from now
            claimed: 67,
            stock: 15,
          },
          {
            id: 'deal-2',
            name: "Bose SoundLink Revolve+ Speaker",
            brand: "Bose",
            price: 199.99,
            originalPrice: 299.99,
            rating: 4.5,
            reviews: 7654,
            image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=300&h=300&fit=crop",
            endTime: new Date(Date.now() + 12 * 60 * 60 * 1000).toISOString(), // 12h from now
            claimed: 43,
            stock: 8,
          },
          {
            id: 'deal-3',
            name: "iPad Pro 12.9-inch M2",
            brand: "Apple",
            price: 999.99,
            originalPrice: 1199.99,
            rating: 4.9,
            reviews: 4567,
            image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=300&h=300&fit=crop",
            endTime: new Date(Date.now() + 6 * 60 * 60 * 1000).toISOString(), // 6h from now
            claimed: 89,
            stock: 5,
          },
        ];
        
        console.log('Deals loaded:', mockDeals);
        setDeals(mockDeals);
      } catch (error) {
        console.error('Error fetching deals:', error);
        setError('Failed to load deals. Please try again later.');
        toast.error('Failed to load deals');
      } finally {
        setLoading(false);
      }
    };

    // Add a small delay to simulate network request
    const timer = setTimeout(() => {
      fetchDeals();
    }, 300);
    
    return () => clearTimeout(timer);
  }, []);

  const handleAddToCart = (deal: Deal) => {
    console.group('🛒 handleAddToCart');
    try {
      console.log('Deal being added to cart:', deal);
      
      // Ensure all required fields are present and properly formatted
      const itemToAdd = {
        id: String(deal.id),
        name: deal.name || 'Unnamed Product',
        price: Number(deal.price) || 0,
        image: deal.image || '/placeholder-product.svg',
      };
      
      console.log('Formatted item to add:', itemToAdd);
      
      // Call addItemToCart with just the product (quantity is handled internally)
      addItemToCart(itemToAdd);
      
      console.log('addToCart was called successfully');
      
      // Show success message
      toast.success(`${itemToAdd.name} added to cart!`, {
        action: {
          label: 'View Cart',
          onClick: () => {
            window.location.href = '/cart';
          },
        },
      });
      
    } catch (error) {
      console.error('❌ Error in handleAddToCart:', error);
      toast.error('Failed to add to cart. Please try again.');
    } finally {
      console.groupEnd();
    }
  };

  const handleAddToWishlist = (e: React.MouseEvent, productId: string | number) => {
    e.stopPropagation();
    toggleWishlistItem(productId);
    const wasInWishlist = isInWishlist(productId);
    toast.success(wasInWishlist ? 'Removed from wishlist' : 'Added to wishlist');
  };
  return (
    <section className="bg-gradient-to-r from-red-50 to-orange-50 py-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <div className="inline-flex items-center bg-red-100 text-red-800 px-4 py-2 rounded-full text-sm font-semibold mb-4">
            <Clock className="w-4 h-4 mr-2" />
            Limited Time Offers
          </div>
          <h2 className="font-bold text-3xl text-gray-900 mb-4">Lightning Deals</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Exclusive discounts on premium products. These deals won't last long!
          </p>
        </div>

        {error ? (
          <div className="col-span-3 text-center py-12">
            <p className="text-red-500">{error}</p>
            <Button 
              onClick={() => window.location.reload()} 
              className="mt-4 bg-blue-600 hover:bg-blue-700"
            >
              Retry
            </Button>
          </div>
        ) : loading ? (
          <div className="col-span-3 flex flex-col items-center justify-center py-12 space-y-4">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
            <p className="text-gray-600">Loading amazing deals...</p>
          </div>
        ) : deals.length === 0 ? (
          <div className="col-span-3 text-center py-12">
            <p className="text-gray-500">No active deals at the moment. Check back soon!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {deals.map((deal) => (
              <div key={deal.id} className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100 hover:shadow-2xl transition-shadow duration-300">
                <div className="bg-gradient-to-r from-red-500 to-orange-500 text-white p-4 text-center">
                  <div className="flex items-center justify-center space-x-2 mb-2">
                    <CountdownTimer endTime={deal.endTime} className="text-white" />
                  </div>
                  <div className="flex justify-between items-center text-sm opacity-90">
                    <span>{deal.claimed}% claimed</span>
                    <span>{deal.stock} left</span>
                  </div>
                  <div className="w-full bg-red-400 rounded-full h-2 mt-2">
                    <div
                      className="bg-white h-2 rounded-full transition-all duration-300"
                      style={{ width: `${Math.min(deal.claimed, 100)}%` }}
                    ></div>
                  </div>
                </div>

              <div className="relative h-48 bg-gray-50 overflow-hidden group">
                <img
                  src={deal.image || "/placeholder.svg"}
                  alt={deal.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  onError={(e) => {
                    e.currentTarget.src = `https://via.placeholder.com/300x300/6B7280/FFFFFF?text=${deal.brand}`
                  }}
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                    {Math.round(((deal.originalPrice - deal.price) / deal.originalPrice) * 100)}% OFF
                  </span>
                </div>
                <div className="absolute top-4 right-4 flex flex-col space-y-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="rounded-full bg-white/90 hover:bg-white shadow-md"
                    onClick={(e) => handleAddToWishlist(e, deal.id)}
                  >
                    <Heart 
                      className={`h-5 w-5 ${isInWishlist(deal.id) ? 'fill-red-500 text-red-500' : 'text-gray-700'}`} 
                    />
                  </Button>
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-semibold text-blue-600 bg-blue-100 px-2 py-1 rounded-full">
                    {deal.brand}
                  </span>
                  <div className="flex items-center">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-sm font-medium text-gray-700 ml-1">{deal.rating}</span>
                    <span className="text-xs text-gray-500 ml-1">({deal.reviews})</span>
                  </div>
                </div>

                <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 h-14">
                  {deal.name}
                </h3>

                <div className="flex items-center justify-between mt-4">
                  <div>
                    <p className="text-2xl font-bold text-gray-900">${deal.price.toFixed(2)}</p>
                    <p className="text-sm text-gray-500 line-through">${deal.originalPrice.toFixed(2)}</p>
                  </div>
                  <Button 
                    size="sm" 
                    className="bg-orange-500 hover:bg-orange-600 transition-colors"
                    onClick={() => handleAddToCart(deal)}
                  >
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    Add to Cart
                  </Button>
                </div>
                {deal.stock < 10 && (
                  <div className="mt-3 text-sm text-red-500 font-medium">
                    Only {deal.stock} left in stock!
                  </div>
                )}
              </div>
              <div className="p-4 border-t">
                <Button 
                  className="w-full bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white font-semibold py-3"
                  onClick={() => handleAddToCart(deal)}
                >
                  Grab This Deal
                </Button>
              </div>
            </div>
          ))}
        </div>
        )}
      </div>
    </section>
  )
}
