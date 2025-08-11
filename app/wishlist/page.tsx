'use client';

import { Heart, ArrowLeft, ShoppingCart, X } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../hooks/use-cart';
import Image from 'next/image';
import { toast } from 'sonner';
import { useEffect, useState } from 'react';

interface Product {
  id: number | string;
  name: string;
  brand: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviews: number;
  image: string;
  category: string;
  inStock: boolean;
  fastDelivery: boolean;
  model?: string;
}

export default function WishlistPage() {
  const { wishlist, toggleWishlistItem, isInWishlist } = useWishlist();
  const { addItem } = useCart();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch all products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        console.log('Fetching products from backend...');
        const response = await fetch('http://127.0.0.1:8000/items/', { 
          cache: 'no-store',
          headers: {
            'Content-Type': 'application/json',
          },
          signal: AbortSignal.timeout(5000)
        });

        console.log('Response status:', response.status);
        
        if (!response.ok) {
          const errorText = await response.text();
          console.error('Error response:', errorText);
          throw new Error(`Failed to fetch data: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        console.log('Products fetched successfully:', data);
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
        toast.error('Failed to load products. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Filter products to only show those in the wishlist
  const wishlistProducts = products.filter(product => 
    Array.from(wishlist).includes(String(product.id))
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex items-center mb-6">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/">
              <ArrowLeft className="h-5 w-5" />
            </Link>
          </Button>
          <h1 className="text-2xl font-bold text-gray-900 ml-2">My Wishlist</h1>
          <span className="ml-2 text-gray-500">({wishlist.size} items)</span>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
          </div>
        ) : wishlist.size > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {wishlistProducts.map((product) => (
              <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden group">
                <div className="relative aspect-square bg-gray-100">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="rounded-full bg-white/90 hover:bg-white"
                      onClick={() => {
                        addItem({
                          id: String(product.id),
                          name: product.name,
                          price: product.price,
                          image: product.image,
                        });
                        toast.success('Added to cart');
                      }}
                    >
                      <ShoppingCart className="h-5 w-5 text-gray-700" />
                    </Button>
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex justify-between items-start">
                    <h3 className="font-medium text-gray-900">{product.name}</h3>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="text-gray-400 hover:text-red-500"
                      onClick={() => toggleWishlistItem(product.id)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                  <p className="text-lg font-bold text-gray-900 mt-1">${product.price.toFixed(2)}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="mx-auto h-24 w-24 text-gray-400">
              <Heart className="h-full w-full" />
            </div>
            <h3 className="mt-2 text-lg font-medium text-gray-900">Your wishlist is empty</h3>
            <p className="mt-1 text-gray-500">Save your favorite items here for later.</p>
            <div className="mt-6">
              <Button asChild>
                <Link href="/">
                  Continue Shopping
                </Link>
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
