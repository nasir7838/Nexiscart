import { CategoryPage } from '../../components/CategoryPage';

const categoryData = {
  id: 'beauty',
  name: 'Beauty & Personal Care',
  description: 'Discover premium beauty products and personal care essentials for your daily routine.'
};

const subcategories = [
  { id: 'skincare', name: 'Skincare', href: '?subcategory=skincare' },
  { id: 'makeup', name: 'Makeup', href: '?subcategory=makeup' },
  { id: 'haircare', name: 'Hair Care', href: '?subcategory=haircare' },
  { id: 'fragrance', name: 'Fragrance', href: '?subcategory=fragrance' },
];

const products = [
  {
    id: 4001,
    name: 'Vitamin C Serum',
    price: 29.99,
    image: 'https://placehold.co/300x300?text=Vitamin+C+Serum',
    rating: 4.7,
    reviewCount: 289,
    category: 'beauty',
    subcategory: 'skincare'
  },
  {
    id: 4002,
    name: 'Matte Lipstick Set',
    price: 24.99,
    image: 'https://placehold.co/300x300?text=Lipstick+Set',
    rating: 4.6,
    reviewCount: 198,
    category: 'beauty',
    subcategory: 'makeup'
  },
  {
    id: 4003,
    name: 'Hydrating Shampoo & Conditioner Set',
    price: 34.99,
    image: 'https://placehold.co/300x300?text=Shampoo+Set',
    rating: 4.5,
    reviewCount: 245,
    category: 'beauty',
    subcategory: 'haircare'
  },
  {
    id: 4004,
    name: 'Eau de Parfum',
    price: 79.99,
    image: 'https://placehold.co/300x300?text=Perfume',
    rating: 4.8,
    reviewCount: 167,
    category: 'beauty',
    subcategory: 'fragrance'
  },
  {
    id: 4005,
    name: 'Sunscreen SPF 50',
    price: 19.99,
    image: 'https://placehold.co/300x300?text=Sunscreen',
    rating: 4.7,
    reviewCount: 312,
    category: 'beauty',
    subcategory: 'skincare'
  },
  {
    id: 4006,
    name: 'Eyeshadow Palette',
    price: 39.99,
    image: 'https://placehold.co/300x300?text=Eyeshadow+Palette',
    rating: 4.6,
    reviewCount: 178,
    category: 'beauty',
    subcategory: 'makeup'
  },
  {
    id: 4007,
    name: 'Hair Growth Serum',
    price: 29.99,
    image: 'https://placehold.co/300x300?text=Hair+Serum',
    rating: 4.4,
    reviewCount: 156,
    category: 'beauty',
    subcategory: 'haircare'
  },
  {
    id: 4008,
    name: 'Cologne Gift Set',
    price: 59.99,
    image: 'https://placehold.co/300x300?text=Cologne+Set',
    rating: 4.7,
    reviewCount: 143,
    category: 'beauty',
    subcategory: 'fragrance'
  }
];

export const metadata = {
  title: 'Beauty & Personal Care - Your Daily Essentials',
  description: 'Explore our collection of skincare, makeup, haircare, and fragrance products.'
};

export default function BeautyPage() {
  return (
    <CategoryPage 
      category={categoryData}
      subcategories={subcategories}
      products={products}
    />
  );
}
