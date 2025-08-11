'use client';

import { useState } from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronRight, Home, Heart, Star, Filter, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

// Define the Product interface
type Product = {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  rating: number;
  reviewCount: number;
  category: string;
  subcategory: string;
  isNew?: boolean;
  isBestseller?: boolean;
  isOnSale?: boolean;
  brand?: string;
  createdAt: string;
};

// Mock products data
const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Wireless Earbuds Pro',
    price: 129.99,
    originalPrice: 159.99,
    image: '/products/earbuds.jpg',
    rating: 4.5,
    reviewCount: 1245,
    category: 'electronics',
    subcategory: 'audio',
    isNew: true,
    isBestseller: true,
    isOnSale: true,
    brand: 'AudioTech',
    createdAt: '2023-06-15'
  },
  {
    id: '2',
    name: 'Smartphone X',
    price: 899.99,
    image: '/products/phone.jpg',
    rating: 4.8,
    reviewCount: 2345,
    category: 'electronics',
    subcategory: 'phones',
    isNew: true,
    brand: 'TechGiant',
    createdAt: '2023-07-10'
  },
  {
    id: '3',
    name: 'Gaming Laptop',
    price: 1499.99,
    image: '/products/laptop.jpg',
    rating: 4.7,
    reviewCount: 1890,
    category: 'electronics',
    subcategory: 'computers',
    isBestseller: true,
    brand: 'GameMaster',
    createdAt: '2023-05-22'
  },
  {
    id: '4',
    name: 'Wireless Gaming Controller',
    price: 59.99,
    originalPrice: 69.99,
    image: '/products/controller.jpg',
    rating: 4.6,
    reviewCount: 876,
    category: 'electronics',
    subcategory: 'gaming',
    isOnSale: true,
    brand: 'GameMaster',
    createdAt: '2023-04-15'
  },
  {
    id: '5',
    name: 'Noise Cancelling Headphones',
    price: 299.99,
    image: '/products/headphones.jpg',
    rating: 4.9,
    reviewCount: 3120,
    category: 'electronics',
    subcategory: 'audio',
    isBestseller: true,
    brand: 'AudioTech',
    createdAt: '2023-03-05'
  },
  {
    id: '6',
    name: 'Smart Watch Pro',
    price: 249.99,
    originalPrice: 299.99,
    image: '/products/smartwatch.jpg',
    rating: 4.5,
    reviewCount: 1540,
    category: 'electronics',
    subcategory: 'wearables',
    isOnSale: true,
    brand: 'TechGiant',
    createdAt: '2023-06-30'
  },
  {
    id: '7',
    name: '4K Action Camera',
    price: 349.99,
    image: '/products/camera.jpg',
    rating: 4.7,
    reviewCount: 920,
    category: 'electronics',
    subcategory: 'cameras',
    isNew: true,
    brand: 'ActionPro',
    createdAt: '2023-07-15'
  },
  {
    id: '8',
    name: 'Portable Bluetooth Speaker',
    price: 89.99,
    originalPrice: 119.99,
    image: '/products/speaker.jpg',
    rating: 4.4,
    reviewCount: 2100,
    category: 'electronics',
    subcategory: 'audio',
    isOnSale: true,
    brand: 'AudioTech',
    createdAt: '2023-05-10'
  }
];

// Define types for better type safety
interface Subcategory {
  id: string;
  name: string;
  count: number;
  href: string;
}

interface Category {
  id: string;
  name: string;
  count: number;
  description: string;
  banner: string;
  subcategories: Subcategory[];
}

// Main categories from the sidebar
const mainCategories: Category[] = [
  { 
    id: 'electronics',
    name: 'Electronics', 
    count: 15420, 
    description: 'Discover the latest in consumer electronics and gadgets.',
    banner: '/electronics-banner.jpg',
    subcategories: [
      { id: 'computers', name: 'Computers', count: 5230, href: '/category/electronics/computers' },
      { id: 'phones', name: 'Phones', count: 6780, href: '/category/electronics/phones' },
      { id: 'audio', name: 'Audio', count: 2450, href: '/category/electronics/audio' },
      { id: 'gaming', name: 'Gaming', count: 960, href: '/category/electronics/gaming' }
    ] 
  },
  { 
    id: 'home-garden',
    name: 'Home & Garden', 
    count: 8934, 
    description: 'Everything you need for your home and outdoor spaces.',
    banner: '/home-garden-banner.jpg',
    subcategories: [
      { id: 'furniture', name: 'Furniture', count: 2540, href: '/category/home-garden/furniture' },
      { id: 'kitchen', name: 'Kitchen', count: 3120, href: '/category/home-garden/kitchen' },
      { id: 'decor', name: 'Decor', count: 1870, href: '/category/home-garden/decor' },
      { id: 'tools', name: 'Tools', count: 1404, href: '/category/home-garden/tools' }
    ] 
  },
  { 
    id: 'fashion',
    name: 'Fashion', 
    count: 12567, 
    description: 'Trendy and timeless fashion for everyone.',
    banner: '/fashion-banner.jpg',
    subcategories: [
      { id: 'mens', name: "Men's", count: 4560, href: '/category/fashion/mens' },
      { id: 'womens', name: "Women's", count: 6230, href: '/category/fashion/womens' },
      { id: 'kids', name: 'Kids', count: 1250, href: '/category/fashion/kids' },
      { id: 'shoes', name: 'Shoes', count: 527, href: '/category/fashion/shoes' }
    ] 
  },
  { 
    id: 'sports',
    name: 'Sports', 
    count: 6789, 
    description: 'Gear and equipment for all your sports and fitness needs.',
    banner: '/sports-banner.jpg',
    subcategories: [
      { id: 'fitness', name: 'Fitness', count: 2340, href: '/category/sports/fitness' },
      { id: 'outdoor', name: 'Outdoor', count: 1980, href: '/category/sports/outdoor' },
      { id: 'team-sports', name: 'Team Sports', count: 1560, href: '/category/sports/team-sports' },
      { id: 'water-sports', name: 'Water Sports', count: 909, href: '/category/sports/water-sports' }
    ] 
  },
  { 
    id: 'books',
    name: 'Books', 
    count: 45678, 
    description: 'Explore our vast collection of books for all readers.',
    banner: '/books-banner.jpg',
    subcategories: [
      { id: 'fiction', name: 'Fiction', count: 18760, href: '/category/books/fiction' },
      { id: 'non-fiction', name: 'Non-fiction', count: 14560, href: '/category/books/non-fiction' },
      { id: 'textbooks', name: 'Textbooks', count: 8760, href: '/category/books/textbooks' },
      { id: 'childrens', name: "Children's", count: 3598, href: "/category/books/childrens" }
    ] 
  }
];

// Sample products for demonstration
const sampleProducts = [
  // Electronics
  { 
    id: 101, 
    name: 'Ultra HD Smart TV', 
    brand: 'Samsung',
    price: 799.99, 
    originalPrice: 999.99,
    rating: 4.7,
    reviewCount: 2456,
    isNew: true,
    isBestseller: true,
    category: 'electronics',
    subcategory: 'tvs',
    image: '/placeholder-electronics-1.jpg'
  },
  { 
    id: 102, 
    name: 'Wireless Earbuds Pro', 
    brand: 'Sony',
    price: 199.99, 
    rating: 4.8,
    reviewCount: 3421,
    isBestseller: true,
    category: 'electronics',
    subcategory: 'audio',
    image: '/placeholder-electronics-2.jpg'
  },
  
  // Home & Garden
  { 
    id: 201, 
    name: 'Memory Foam Mattress', 
    brand: 'Casper',
    price: 899.00, 
    originalPrice: 1099.00,
    rating: 4.9,
    reviewCount: 5678,
    isBestseller: true,
    category: 'home-garden',
    subcategory: 'furniture',
    image: '/placeholder-home-1.jpg'
  },
  
  // Fashion
  { 
    id: 301, 
    name: 'Slim Fit Jeans', 
    brand: 'Levi\'s',
    price: 59.99, 
    rating: 4.6,
    reviewCount: 4321,
    category: 'fashion',
    subcategory: 'mens',
    image: '/placeholder-fashion-1.jpg'
  },
  
  // Sports
  { 
    id: 401, 
    name: 'Yoga Mat', 
    brand: 'Liforme',
    price: 89.99, 
    rating: 4.8,
    reviewCount: 1234,
    isNew: true,
    category: 'sports',
    subcategory: 'fitness',
    image: '/placeholder-sports-1.jpg'
  },
  
  // Books
  { 
    id: 501, 
    name: 'Atomic Habits', 
    author: 'James Clear',
    price: 14.99, 
    originalPrice: 19.99,
    rating: 4.9,
    reviewCount: 9876,
    isBestseller: true,
    category: 'books',
    subcategory: 'non-fiction',
    image: '/placeholder-books-1.jpg'
  }
];

export default function CategoryPage({ params }: { params: { slug: string[] } }) {
  // Ensure React is in scope for JSX
  const React = require('react');
  const { slug } = params;
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('featured');
  const [showFilters, setShowFilters] = useState<boolean>(false);

  // Get the current category and subcategory from the URL
  const categoryId = slug?.[0] || '';
  const subcategoryId = slug?.[1] || '';

  // Get the current category data
  const currentCategory = mainCategories.find(cat => cat.id === categoryId);
  
  if (!currentCategory) {
    notFound();
    return null; // Add return to satisfy TypeScript
  }

  // Get the current subcategory if it exists
  const currentSubcategory = subcategoryId 
    ? currentCategory.subcategories.find((sub: Subcategory) => sub.id === subcategoryId)
    : null;

  // Filter products based on the current category and subcategory
  const filteredProducts = mockProducts.filter((product: Product) => {
    const matchesCategory = product.category === currentCategory.id;
    const matchesSubcategory = !subcategoryId || product.subcategory === subcategoryId;
    return matchesCategory && matchesSubcategory;
  });

  // Sort products based on selected sort option
  const sortedProducts = [...filteredProducts].sort((a: Product, b: Product) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'rating':
        return b.rating - a.rating;
      case 'newest':
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      default:
        return 0; // 'featured' - maintain original order
    }
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumbs */}
      <nav className="flex mb-6 text-sm text-gray-600">
        <ol className="flex items-center space-x-2">
          <li>
            <Link href="/" className="hover:text-pink-600 flex items-center transition-colors">
              <Home className="w-4 h-4 mr-1" />
              Home
            </Link>
          </li>
          <li className="flex items-center">
            <ChevronRight className="w-4 h-4 mx-2 text-gray-400" />
            <Link 
              href="/beauty"
              className="hover:text-pink-600 capitalize transition-colors"
            >
              Beauty
            </Link>
          </li>
          {categoryId && (
            <li className="flex items-center">
              <ChevronRight className="w-4 h-4 mx-2 text-gray-400" />
              <Link 
                href={`/category/${categoryId}`}
                className="hover:text-pink-600 capitalize transition-colors"
              >
                {currentCategory.name}
              </Link>
            </li>
          )}
          {subcategoryId && (
            <li className="flex items-center">
              <ChevronRight className="w-4 h-4 mx-2 text-gray-400" />
              <span className="text-gray-500 capitalize">
                {subcategoryId.replace(/-/g, ' ')}
              </span>
            </li>
          )}
        </ol>
      </nav>

      {/* Category Banner */}
      {currentCategory.banner && (
        <div 
        className="relative rounded-xl overflow-hidden mb-10 h-64 bg-cover bg-center"
        style={{ backgroundImage: `url(${currentCategory.banner || '/category-banner-placeholder.jpg'})` }}
      >
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative z-10 h-full flex items-center px-8 md:px-16">
          <div className="max-w-xl text-white">
            <h1 className="text-3xl md:text-4xl font-bold mb-3 drop-shadow">
              {currentCategory.name}
            </h1>
            <p className="text-gray-100 mb-6 drop-shadow">
              {currentCategory.description}
            </p>
            <Button className="bg-white text-pink-600 hover:bg-gray-100">
              Shop Now
            </Button>
          </div>
        </div>
      </div>
      )}

      {/* Filters and Sorting */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <p className="text-gray-600">
          Showing <span className="font-medium">{filteredProducts.length}</span> products
        </p>
        <div className="flex gap-3 w-full md:w-auto">
          <div className="relative flex-1 md:w-48">
            <select className="w-full pl-3 pr-10 py-2 border border-gray-300 rounded-md focus:ring-pink-500 focus:border-pink-500 text-sm">
              <option>Sort by: Featured</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
              <option>Top Rated</option>
              <option>Newest</option>
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
              <ChevronDown className="h-4 w-4 text-gray-400" />
            </div>
          </div>
          <Button variant="outline" className="flex items-center gap-2">
            <Filter className="w-4 h-4" />
            <span>Filters</span>
          </Button>
        </div>
      </div>

      {/* Subcategories */}
      {currentCategory.subcategories && (
        <div className="mb-8">
          <h3 className="text-sm font-medium text-gray-900 mb-3">Shop by Category</h3>
          <div className="flex flex-wrap gap-2">
            {currentCategory.subcategories.map((subcategory) => (
              <Link
                key={subcategory.id}
                href={subcategory.href}
                className={`inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                  currentSubcategory?.id === subcategory.id
                    ? 'bg-primary text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {subcategory.name}
                <span className="ml-1.5 text-xs bg-white/20 text-white px-1.5 py-0.5 rounded-full">
                  {subcategory.count.toLocaleString()}
                </span>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {sortedProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {sortedProducts.map((product: Product) => (
              <div key={product.id} className="group relative bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                <div className="relative aspect-square overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <button className="absolute top-3 right-3 p-1.5 rounded-full bg-white/80 text-gray-700 hover:bg-white hover:text-primary transition-colors">
                    <Heart className="w-5 h-5" />
                  </button>
                  <div className="absolute top-3 left-3 flex flex-col space-y-1.5">
                    {product.isNew && (
                      <Badge variant="default" className="text-xs">New</Badge>
                    )}
                    {product.isBestseller && (
                      <Badge variant="secondary" className="text-xs">Bestseller</Badge>
                    )}
                    {product.isOnSale && (
                      <Badge variant="destructive" className="text-xs">Sale</Badge>
                    )}
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-medium text-gray-900 mb-1 line-clamp-2">
                    {product.name}
                  </h3>
                  <div className="flex items-center mb-2">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < Math.floor(product.rating)
                              ? 'text-yellow-400 fill-current'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-xs text-gray-500 ml-1">
                      ({product.reviewCount})
                    </span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-lg font-bold text-gray-900">
                      ${product.price.toFixed(2)}
                    </span>
                    {product.originalPrice && (
                      <span className="ml-2 text-sm text-gray-500 line-through">
                        ${product.originalPrice.toFixed(2)}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <h3 className="text-lg font-medium text-gray-900 mb-2">No products found</h3>
            <p className="text-gray-500 mb-6">
              We couldn't find any products matching your selection.
            </p>
            <Button
              variant="outline"
              onClick={() => {
                setActiveFilter('all');
                setSortBy('featured');
              }}
            >
              Clear all filters
            </Button>
          </div>
        )}
      </div>

      {/* Empty State */}
      {sortedProducts.length === 0 && (
        <div className="text-center py-16">
          <h3 className="text-lg font-medium text-gray-900 mb-2">No products found</h3>
          <p className="text-gray-500 mb-6">
            We couldn't find any products matching your criteria.
          </p>
          <div className="flex gap-3 justify-center">
            <Button 
              variant="outline" 
              onClick={() => {
                setActiveFilter('all');
                setSortBy('featured');
              }}
            >
              Clear filters
            </Button>
            <Link href="/" className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-pink-600 hover:bg-pink-700">
              Continue Shopping
            </Link>
          </div>
        </div>
      )}

      {/* Category Description */}
      {!subcategoryId && (
        <div className="mt-12 mb-16 max-w-4xl mx-auto">
          <div className="bg-gray-50 rounded-xl p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              {currentCategory ? `About ${currentCategory.name}` : 'Category'}
            </h2>
            {currentCategory && (
              <div className="prose prose-pink max-w-none">
                <p className="text-gray-600">
                  {currentCategory.description}
                </p>
                
                <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-3">
                  Shop by Category
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {currentCategory.subcategories.map((subcat: Subcategory) => (
                    <Link
                      key={subcat.id}
                      href={subcat.href}
                      className="text-pink-600 hover:text-pink-700 hover:underline text-sm"
                    >
                      {subcat.name} ({subcat.count.toLocaleString()})
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
