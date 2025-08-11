import { notFound } from 'next/navigation';
import { Suspense } from 'react';
import { CategoryPage } from '@/app/components/CategoryPage';

// Types
interface Subcategory {
  id: string;
  name: string;
  description?: string;
}

interface Category {
  id: string;
  name: string;
  description: string;
  subcategories: Subcategory[];
}

interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  rating: number;
  reviewCount: number;
  category: string;
  subcategory: string;
}

// Mock data - in a real app, this would come from an API
const categoriesData: Record<string, Category> = {
  electronics: {
    id: 'electronics',
    name: 'Electronics',
    description: 'Discover the latest electronic devices and gadgets at the best prices.',
    subcategories: [
      { id: 'smartphones', name: 'Smartphones' },
      { id: 'laptops', name: 'Laptops' },
      { id: 'tablets', name: 'Tablets' },
      { id: 'desktops', name: 'Desktops' },
    ]
  },
  audio: {
    id: 'audio',
    name: 'Audio',
    description: 'Experience crystal clear sound with our premium audio equipment.',
    subcategories: [
      { id: 'headphones', name: 'Headphones' },
      { id: 'earbuds', name: 'Earbuds' },
      { id: 'speakers', name: 'Speakers' },
      { id: 'home-audio', name: 'Home Audio' },
    ]
  },
  computers: {
    id: 'computers',
    name: 'Computers',
    description: 'Powerful computers and accessories for work and play.',
    subcategories: [
      { id: 'laptops', name: 'Laptops' },
      { id: 'desktops', name: 'Desktops' },
      { id: 'monitors', name: 'Monitors' },
      { id: 'components', name: 'PC Components' },
    ]
  },
  beauty: {
    id: 'beauty',
    name: 'Beauty & Personal Care',
    description: 'Discover premium beauty products and personal care essentials for your daily routine.',
    subcategories: [
      { id: 'skincare', name: 'Skincare' },
      { id: 'makeup', name: 'Makeup' },
      { id: 'haircare', name: 'Hair Care' },
      { id: 'fragrance', name: 'Fragrance' },
    ]
  },
  clothing: {
    id: 'clothing',
    name: 'Clothing',
    description: 'Trendy and comfortable clothing for all occasions.',
    subcategories: [
      { id: 'mens', name: "Men's" },
      { id: 'womens', name: "Women's" },
      { id: 'kids', name: "Kids'" },
      { id: 'accessories', name: 'Accessories' },
    ]
  },
  home: {
    id: 'home',
    name: 'Home & Furniture',
    description: 'Furnish your home with our stylish and functional furniture.',
    subcategories: [
      { id: 'living-room', name: 'Living Room' },
      { id: 'bedroom', name: 'Bedroom' },
      { id: 'kitchen', name: 'Kitchen' },
      { id: 'bathroom', name: 'Bathroom' },
    ]
  },
  books: {
    id: 'books',
    name: 'Books & Media',
    description: 'Explore our vast collection of books and media.',
    subcategories: [
      { id: 'fiction', name: 'Fiction' },
      { id: 'non-fiction', name: 'Non-Fiction' },
      { id: 'academic', name: 'Academic' },
      { id: 'e-books', name: 'E-Books' },
    ]
  },
  sports: {
    id: 'sports',
    name: 'Sports & Outdoors',
    description: 'Gear up for your next adventure with our sports equipment.',
    subcategories: [
      { id: 'fitness', name: 'Fitness' },
      { id: 'team-sports', name: 'Team Sports' },
      { id: 'outdoor', name: 'Outdoor Recreation' },
      { id: 'accessories', name: 'Accessories' },
    ]
  },
  gaming: {
    id: 'gaming',
    name: 'Gaming',
    description: 'The latest gaming consoles, games, and accessories.',
    subcategories: [
      { id: 'consoles', name: 'Gaming Consoles' },
      { id: 'gaming-pcs', name: 'Gaming PCs' },
      { id: 'accessories', name: 'Accessories' },
      { id: 'games', name: 'Games' },
    ]
  },
  deals: {
    id: 'deals',
    name: 'Deals & Promotions',
    description: 'Check out our latest deals and promotions.',
    subcategories: [
      { id: 'daily-deals', name: 'Daily Deals' },
      { id: 'clearance', name: 'Clearance' },
      { id: 'bundle-offers', name: 'Bundle Offers' },
    ]
  }
};

// Mock products database
const allProducts: Record<string, Product[]> = {
  electronics: [
    { id: 1, name: 'Premium Smartphone X1', price: 999, image: '/placeholder-product.svg', rating: 4.5, reviewCount: 128, category: 'electronics', subcategory: 'smartphones' },
    { id: 2, name: '4K Smart TV 55"', price: 799, image: '/placeholder-product.svg', rating: 4.7, reviewCount: 245, category: 'electronics', subcategory: 'tvs' },
  ],
  audio: [
    { id: 101, name: 'Wireless Noise-Cancelling Headphones', price: 299, image: '/placeholder-product.svg', rating: 4.8, reviewCount: 245, category: 'audio', subcategory: 'headphones' },
    { id: 102, name: 'Bluetooth Speaker Pro', price: 199, image: '/placeholder-product.svg', rating: 4.6, reviewCount: 189, category: 'audio', subcategory: 'speakers' },
  ],
  beauty: [
    { id: 201, name: 'Vitamin C Serum', price: 29.99, image: '/placeholder-product.svg', rating: 4.7, reviewCount: 289, category: 'beauty', subcategory: 'skincare' },
    { id: 202, name: 'Matte Lipstick Set', price: 24.99, image: '/placeholder-product.svg', rating: 4.6, reviewCount: 198, category: 'beauty', subcategory: 'makeup' },
  ],
  clothing: [
    { id: 301, name: 'Classic White T-Shirt', price: 19.99, image: '/placeholder-product.svg', rating: 4.5, reviewCount: 156, category: 'clothing', subcategory: 'mens' },
    { id: 302, name: 'Summer Dress', price: 39.99, image: '/placeholder-product.svg', rating: 4.7, reviewCount: 201, category: 'clothing', subcategory: 'womens' },
  ],
  home: [
    { id: 401, name: 'Modern Sofa', price: 599, image: '/placeholder-product.svg', rating: 4.8, reviewCount: 145, category: 'home', subcategory: 'living-room' },
    { id: 402, name: 'Queen Size Bed Frame', price: 399, image: '/placeholder-product.svg', rating: 4.6, reviewCount: 98, category: 'home', subcategory: 'bedroom' },
  ],
  books: [
    { id: 501, name: 'Bestselling Novel', price: 14.99, image: '/placeholder-product.svg', rating: 4.5, reviewCount: 312, category: 'books', subcategory: 'fiction' },
    { id: 502, name: 'Self-Help Guide', price: 12.99, image: '/placeholder-product.svg', rating: 4.4, reviewCount: 187, category: 'books', subcategory: 'non-fiction' },
  ],
  sports: [
    { id: 601, name: 'Yoga Mat', price: 29.99, image: '/placeholder-product.svg', rating: 4.7, reviewCount: 234, category: 'sports', subcategory: 'fitness' },
    { id: 602, name: 'Running Shoes', price: 89.99, image: '/placeholder-product.svg', rating: 4.8, reviewCount: 312, category: 'sports', subcategory: 'fitness' },
  ],
  gaming: [
    { id: 701, name: 'Gaming Console', price: 499, image: '/placeholder-product.svg', rating: 4.9, reviewCount: 412, category: 'gaming', subcategory: 'consoles' },
    { id: 702, name: 'Wireless Gaming Controller', price: 59.99, image: '/placeholder-product.svg', rating: 4.7, reviewCount: 187, category: 'gaming', subcategory: 'accessories' },
  ],
  deals: [
    { id: 801, name: 'Limited Time Offer: Headphones', price: 199, originalPrice: 299, image: '/placeholder-product.svg', rating: 4.7, reviewCount: 245, category: 'deals', subcategory: 'daily-deals' },
    { id: 802, name: 'Clearance: Smart Watch', price: 149, originalPrice: 249, image: '/placeholder-product.svg', rating: 4.5, reviewCount: 187, category: 'deals', subcategory: 'clearance' },
  ]
};

interface PageProps {
  params: {
    categoryId: string;
    subcategoryId: string;
  };
}

export default async function SubcategoryPage({ params }: PageProps) {
  const { categoryId, subcategoryId } = params;
  
  const category = categoriesData[categoryId];
  
  if (!category) {
    notFound();
  }

  const subcategory = category.subcategories.find(
    (sub) => sub.id === subcategoryId
  );

  if (!subcategory) {
    notFound();
  }

  // Filter products for this subcategory
  const products = (allProducts[categoryId] || []).filter(
    (product) => product.subcategory === subcategoryId
  );

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CategoryPage 
        category={category}
        subcategory={subcategory}
        products={products}
      />
    </Suspense>
  );
}

export async function generateMetadata({ params }: PageProps) {
  const { categoryId, subcategoryId } = params;
  const category = categoriesData[categoryId];
  
  if (!category) {
    return {
      title: 'Category Not Found',
      description: 'The requested category was not found.'
    };
  }

  const subcategory = category.subcategories.find(
    (sub) => sub.id === subcategoryId
  );

  if (!subcategory) {
    return {
      title: 'Subcategory Not Found',
      description: 'The requested subcategory was not found.'
    };
  }

  return {
    title: `${subcategory.name} - ${category.name} | NexisCart`,
    description: `Shop the best ${subcategory.name} in ${category.name} at NexisCart. ${category.description}`,
  };
}

export async function generateStaticParams() {
  // Generate all possible category/subcategory combinations at build time
  return Object.values(categoriesData).flatMap((category) =>
    category.subcategories.map((subcategory) => ({
      categoryId: category.id,
      subcategoryId: subcategory.id,
    }))
  );
}

export const dynamicParams = false; // Return 404 for not generated pages
export const dynamic = 'error'; // Throw an error if any dynamic API routes are used
export const revalidate = 3600; // Revalidate at most every hour