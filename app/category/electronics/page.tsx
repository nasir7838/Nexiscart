import { CategoryPage } from '../../components/CategoryPage';

const categoryData = {
  id: 'electronics',
  name: 'Electronics',
  description: 'Discover the latest electronic devices and gadgets at the best prices.'
};

const subcategories = [
  { id: 'smartphones', name: 'Smartphones', href: '?subcategory=smartphones' },
  { id: 'laptops', name: 'Laptops', href: '?subcategory=laptops' },
  { id: 'tablets', name: 'Tablets', href: '?subcategory=tablets' },
  { id: 'desktops', name: 'Desktops', href: '?subcategory=desktops' },
];

const products = [
  {
    id: 1,
    name: 'Premium Smartphone X1',
    price: 999,
    image: 'https://placehold.co/300x300?text=Smartphone+X1',
    rating: 4.5,
    reviewCount: 128,
    category: 'electronics',
    subcategory: 'smartphones'
  },
  {
    id: 2,
    name: 'Ultrabook Pro 2023',
    price: 1299,
    image: 'https://placehold.co/300x300?text=Ultrabook+Pro',
    rating: 4.7,
    reviewCount: 89,
    category: 'electronics',
    subcategory: 'laptops'
  },
  {
    id: 3,
    name: 'Tablet Air 10"',
    price: 499,
    image: 'https://placehold.co/300x300?text=Tablet+Air',
    rating: 4.3,
    reviewCount: 156,
    category: 'electronics',
    subcategory: 'tablets'
  },
  {
    id: 4,
    name: 'Gaming Desktop XT',
    price: 1999,
    image: 'https://placehold.co/300x300?text=Gaming+Desktop',
    rating: 4.8,
    reviewCount: 72,
    category: 'electronics',
    subcategory: 'desktops'
  },
  {
    id: 5,
    name: 'Budget Smartphone SE',
    price: 399,
    image: 'https://placehold.co/300x300?text=Budget+Smartphone',
    rating: 4.0,
    reviewCount: 210,
    category: 'electronics',
    subcategory: 'smartphones'
  },
  {
    id: 6,
    name: '2-in-1 Laptop Pro',
    price: 1099,
    image: 'https://placehold.co/300x300?text=2-in-1+Laptop',
    rating: 4.6,
    reviewCount: 64,
    category: 'electronics',
    subcategory: 'laptops'
  },
  {
    id: 7,
    name: 'Mini Tablet 8"',
    price: 299,
    image: 'https://placehold.co/300x300?text=Mini+Tablet',
    rating: 4.2,
    reviewCount: 98,
    category: 'electronics',
    subcategory: 'tablets'
  },
  {
    id: 8,
    name: 'All-in-One PC',
    price: 1499,
    image: 'https://placehold.co/300x300?text=All-in-One+PC',
    rating: 4.5,
    reviewCount: 53,
    category: 'electronics',
    subcategory: 'desktops'
  }
];

export const metadata = {
  title: 'Electronics - Our E-commerce Store',
  description: 'Browse our latest collection of electronic devices and gadgets.'
};

export default function ElectronicsPage() {
  return (
    <CategoryPage 
      category={categoryData}
      subcategories={subcategories}
      products={products}
    />
  );
}
