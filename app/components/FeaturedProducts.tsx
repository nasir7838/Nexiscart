"use client"

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Star, Heart, ShoppingCart, Eye } from 'lucide-react';
import { toast } from 'sonner';
import { useWishlist } from "../context/WishlistContext";
import { Button } from "@/components/ui/button"
import ProductImage from "./ProductImage"
import { useCart } from "@/hooks/use-cart"

interface Product {
  id: number | string;  // Can be either number or string
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
  model?: string;  // Added to match the API response
}

interface FeaturedProductsProps {
  products: Product[];
}

export default function FeaturedProducts({ products = [] }: FeaturedProductsProps) {
  const router = useRouter();
  const [hoveredProduct, setHoveredProduct] = useState<string | number | null>(null);
  const [isAdding, setIsAdding] = useState<string | number | null>(null);
  const { addItem, itemCount } = useCart();
  const { toggleWishlistItem, isInWishlist } = useWishlist();

  // Handle view all products click
  const handleViewAll = () => {
    router.push('/products');
  };

  // Handle add to wishlist
  const handleAddToWishlist = (productId: string | number, e: React.MouseEvent) => {
    e.stopPropagation();
    console.log('=== handleAddToWishlist called with:', productId);
    const wasInWishlist = isInWishlist(productId);
    console.log('Was in wishlist before toggle:', wasInWishlist);
    
    toggleWishlistItem(productId);
    
    // Check the state after a small delay to allow for state update
    setTimeout(() => {
      console.log('After toggle - is in wishlist:', isInWishlist(productId));
    }, 0);
    
    toast.success(
      wasInWishlist 
        ? 'Removed from wishlist' 
        : 'Added to wishlist'
    );
  };

  // Handle quick view
  const handleQuickView = (product: Product, e: React.MouseEvent) => {
    e.stopPropagation();
    // You can implement a modal or navigate to product detail page
    toast.info(`Quick view for ${product.name}`);
    // Example: router.push(`/products/${product.id}`);
  };

  // Take first 4 products or all if less than 4
  const featuredProducts = products.slice(0, 4);

  const handleAddToCart = async (product: Product) => {
    try {
      setIsAdding(product.id);
      
      // Add the product to the cart
      addItem({
        id: String(product.id), // Ensure ID is a string
        name: product.name,
        price: product.price,
        image: product.image
      });
      
      // Show success message
      alert(`${product.name} has been added to your cart!\nTotal items in cart: ${itemCount + 1}`);
      
    } catch (error) {
      console.error('Error adding to cart:', error);
      alert('Failed to add item to cart. Please try again.');
    } finally {
      setIsAdding(null);
    }
  };

  return (
    <section className="max-w-7xl mx-auto px-6">
      <div className="flex items-center justify-between mb-12">
        <div>
          <h2 className="font-bold text-3xl text-gray-900 mb-2">Featured Products</h2>
          <p className="text-gray-600">Handpicked products with premium quality</p>
        </div>
        <Button 
          variant="outline" 
          className="border-blue-200 text-blue-600 hover:bg-blue-50 bg-transparent hover:text-blue-700 transition-colors"
          onClick={handleViewAll}
        >
          View All Products
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {featuredProducts.map((product) => (
          <div
            key={product.id}
            className="group bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100"
            onMouseEnter={() => setHoveredProduct(product.id)}
            onMouseLeave={() => setHoveredProduct(null)}
          >
            <div className="relative overflow-hidden aspect-square bg-gray-50">
              <ProductImage 
                src={product.image} 
                alt={product.name}
                className={`w-full h-full object-cover transition-transform duration-300 ${hoveredProduct === product.id ? 'scale-105' : ''}`}
              />
              <div className={`absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center space-x-2 ${hoveredProduct === product.id ? 'opacity-100' : ''}`}>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className={`rounded-full transition-colors ${isInWishlist(String(product.id)) ? 'bg-red-50 hover:bg-red-100' : 'bg-white/90 hover:bg-white'}`}
                  onClick={(e) => handleAddToWishlist(String(product.id), e)}
                  aria-label={isInWishlist(String(product.id)) ? 'Remove from wishlist' : 'Add to wishlist'}
                >
                  <Heart 
                    className={`h-5 w-5 ${isInWishlist(String(product.id)) ? 'fill-red-500 text-red-500' : 'text-gray-700'}`} 
                  />
                </Button>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="rounded-full bg-white/90 hover:bg-white transition-colors"
                  onClick={(e) => handleQuickView(product, e)}
                  aria-label="Quick view"
                >
                  <Eye className="h-5 w-5 text-gray-700" />
                </Button>
              </div>
            </div>

            <div className="p-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-500">{product.brand}</span>
                <div className="flex items-center">
                  <Star className="h-4 w-4 text-yellow-400 fill-current" />
                  <span className="ml-1 text-sm text-gray-700">{product.rating}</span>
                  <span className="mx-1 text-gray-300">•</span>
                  <span className="text-sm text-gray-500">{product.reviews.toLocaleString()}</span>
                </div>
              </div>
              
              <h3 className="font-medium text-gray-900 mb-2 line-clamp-2 h-12">{product.name}</h3>
              
              <div className="flex items-center justify-between mt-4">
                <div>
                  <span className="text-lg font-bold text-gray-900">${product.price.toFixed(2)}</span>
                  {product.originalPrice && (
                    <span className="ml-2 text-sm text-gray-500 line-through">${product.originalPrice.toFixed(2)}</span>
                  )}
                </div>
                <Button 
                  size="sm" 
                  className="bg-blue-600 hover:bg-blue-700"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleAddToCart(product);
                  }}
                  disabled={isAdding === product.id}
                >
                  {isAdding === product.id ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Adding...
                    </>
                  ) : (
                    <>
                      <ShoppingCart className="h-4 w-4 mr-2" />
                      Add
                    </>
                  )}
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
