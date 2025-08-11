"use client";

import { useSearchParams } from 'next/navigation';
import ProductCard from './ProductCard';
import { Button } from '@/components/ui/button';
import { ChevronLeft } from 'lucide-react';
import Link from 'next/link';

interface CategoryPageProps {
  category: {
    id: string;
    name: string;
    description: string;
  };
  subcategories: Array<{
    id: string;
    name: string;
    href: string;
  }>;
  products: Array<{
    id: number;
    name: string;
    price: number;
    image: string;
    rating: number;
    reviewCount: number;
    category: string;
    subcategory: string;
  }>;
}

export function CategoryPage({ category, subcategories, products }: CategoryPageProps) {
  const searchParams = useSearchParams();
  const subcategory = searchParams.get('subcategory');

  // Filter products by subcategory if one is selected
  const filteredProducts = subcategory 
    ? products.filter(p => p.subcategory === subcategory)
    : products;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Button variant="ghost" asChild className="mb-4">
          <Link href="/" className="flex items-center">
            <ChevronLeft className="w-4 h-4 mr-1" />
            Back to Home
          </Link>
        </Button>
        
        <h1 className="text-3xl font-bold mb-2">{category.name}</h1>
        <p className="text-gray-600 mb-6">{category.description}</p>
        
        {/* Subcategories */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold mb-3">Shop by Category</h2>
          <div className="flex flex-wrap gap-2">
            <Button
              variant={!subcategory ? 'default' : 'outline'}
              asChild
            >
              <Link href={`/category/${category.id}`}>All {category.name}</Link>
            </Button>
            {subcategories.map((sub) => (
              <Button
                key={sub.id}
                variant={sub.id === subcategory ? 'default' : 'outline'}
                asChild
              >
                <Link href={`/category/${category.id}?subcategory=${sub.id}`}>
                  {sub.name}
                </Link>
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">
            {subcategory 
              ? `No products found in ${subcategories.find(s => s.id === subcategory)?.name || 'this category'}.`
              : 'No products found in this category.'
            }
          </p>
        </div>
      )}
    </div>
  );
}
