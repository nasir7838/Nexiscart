"use client";

import ProductCard from './ProductCard';
import { Button } from '@/components/ui/button';
import { ChevronLeft } from 'lucide-react';
import Link from 'next/link';

interface CategoryPageProps {
  category: {
    id: string;
    name: string;
    description: string;
    subcategories: Array<{
      id: string;
      name: string;
    }>;
  };
  subcategory?: {
    id: string;
    name: string;
    description?: string;
  };
  products: Array<{
    id: number;
    name: string;
    price: number;
    originalPrice?: number;
    image: string;
    rating: number;
    reviewCount: number;
    category: string;
    subcategory: string;
  }>;
}

export function CategoryPage({ 
  category, 
  subcategory,
  products 
}: CategoryPageProps) {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Button variant="ghost" asChild className="mb-4">
          <Link href="/" className="flex items-center">
            <ChevronLeft className="w-4 h-4 mr-1" />
            Back to Home
          </Link>
        </Button>
        
        <h1 className="text-3xl font-bold mb-2">
          {subcategory ? subcategory.name : category.name}
        </h1>
        <p className="text-gray-600 mb-6">
          {subcategory?.description || category.description}
        </p>

        {/* Subcategory Navigation */}
        {category.subcategories && category.subcategories.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-8">
            <Button
              variant={!subcategory ? 'default' : 'outline'}
              asChild
            >
              <Link href={`/category/${category.id}`}>
                All {category.name}
              </Link>
            </Button>
            {category.subcategories.map((sub) => (
              <Button
                key={sub.id}
                variant={subcategory?.id === sub.id ? 'default' : 'outline'}
                asChild
              >
                <Link 
                  href={`/category/${category.id}/${sub.id}`}
                >
                  {sub.name}
                </Link>
              </Button>
            ))}
          </div>
        )}
      </div>

      {/* Products Grid */}
      {products.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <h3 className="text-lg font-medium text-gray-900">No products found</h3>
          <p className="mt-1 text-gray-500">
            We couldn't find any products in this category.
          </p>
        </div>
      )}
    </div>
  );
}
