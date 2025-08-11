"use client";

import ProductImage from "./ProductImage";
import { useRouter } from 'next/navigation';

interface Category {
  name: string;
  image: string;
  itemCount: string;
  color: {
    from: string;
    to: string;
  };
}

interface CategoryGridProps {
  categories: Category[];
}

export default function CategoryGrid({ categories = [] }: CategoryGridProps) {
  const router = useRouter();
  
  // If no categories, don't render anything
  if (categories.length === 0) {
    return null;
  }

  return (
    <section className="max-w-7xl mx-auto px-6">
      <div className="text-center mb-12">
        <h2 className="font-bold text-3xl text-gray-900 mb-4">Shop by Category</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Browse through our wide range of product categories
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
        {categories.map((category, index) => (
          <div
            key={category.name}
            onClick={() => router.push(`/category/${category.name.toLowerCase()}`)}
            className="group relative overflow-hidden rounded-2xl cursor-pointer transition-all duration-300 hover:shadow-xl"
          >
            <div className="aspect-square bg-gray-100 overflow-hidden">
              <img
                src={category.image}
                alt={category.name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                onError={(e) => {
                  // Fallback to a placeholder if the image fails to load
                  e.currentTarget.src = `https://placehold.co/400x400/374151/FFFFFF/png?text=${category.name}`;
                }}
              />
            </div>
            <div 
              className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-4 text-white"
            >
              <h3 className="font-bold text-lg mb-1">{category.name}</h3>
              <p className="text-sm opacity-90">{category.itemCount}</p>
            </div>
            <div 
              className={`absolute inset-0 bg-gradient-to-br from-${category.color.from} to-${category.color.to} mix-blend-overlay opacity-0 group-hover:opacity-50 transition-opacity duration-300`}
            />
          </div>
        ))}
      </div>
    </section>
  );
}
