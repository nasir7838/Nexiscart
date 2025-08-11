import { CategoryPage } from '../../components/CategoryPage';

const categoryData = {
  id: 'clothing',
  name: 'Clothing & Apparel',
  description: 'Discover the latest fashion trends and styles for every occasion.'
};

const subcategories = [
  { id: 'mens', name: "Men's", href: '?subcategory=mens' },
  { id: 'womens', name: "Women's", href: '?subcategory=womens' },
  { id: 'kids', name: "Kids'", href: '?subcategory=kids' },
  { id: 'accessories', name: 'Accessories', href: '?subcategory=accessories' },
];

const products = [
  {
    id: 901,
    name: 'Classic Denim Jeans',
    price: 59.99,
    image: 'https://placehold.co/300x300?text=Denim+Jeans',
    rating: 4.5,
    reviewCount: 245,
    category: 'clothing',
    subcategory: 'mens'
  },
  {
    id: 902,
    name: 'Floral Summer Dress',
    price: 45.99,
    image: 'https://placehold.co/300x300?text=Summer+Dress',
    rating: 4.7,
    reviewCount: 189,
    category: 'clothing',
    subcategory: 'womens'
  },
  {
    id: 903,
    name: 'Cotton T-Shirt Pack',
    price: 29.99,
    image: 'https://placehold.co/300x300?text=T-Shirt+Pack',
    rating: 4.4,
    reviewCount: 312,
    category: 'clothing',
    subcategory: 'kids'
  },
  {
    id: 904,
    name: 'Leather Belt',
    price: 34.99,
    image: 'https://placehold.co/300x300?text=Leather+Belt',
    rating: 4.2,
    reviewCount: 178,
    category: 'clothing',
    subcategory: 'accessories'
  },
  {
    id: 905,
    name: 'Winter Jacket',
    price: 129.99,
    image: 'https://placehold.co/300x300?text=Winter+Jacket',
    rating: 4.8,
    reviewCount: 156,
    category: 'clothing',
    subcategory: 'mens'
  },
  {
    id: 906,
    name: 'Yoga Pants',
    price: 39.99,
    image: 'https://placehold.co/300x300?text=Yoga+Pants',
    rating: 4.6,
    reviewCount: 267,
    category: 'clothing',
    subcategory: 'womens'
  },
  {
    id: 907,
    name: 'Kids Hoodie',
    price: 24.99,
    image: 'https://placehold.co/300x300?text=Kids+Hoodie',
    rating: 4.3,
    reviewCount: 143,
    category: 'clothing',
    subcategory: 'kids'
  },
  {
    id: 908,
    name: 'Wool Scarf',
    price: 19.99,
    image: 'https://placehold.co/300x300?text=Wool+Scarf',
    rating: 4.1,
    reviewCount: 98,
    category: 'clothing',
    subcategory: 'accessories'
  }
];

export const metadata = {
  title: 'Clothing & Apparel - Latest Fashion Trends',
  description: 'Browse our collection of clothing and accessories for men, women, and kids.'
};

export default function ClothingPage() {
  return (
    <CategoryPage 
      category={categoryData}
      subcategories={subcategories}
      products={products}
    />
  );
}
