import { CategoryPage } from '../../components/CategoryPage';

const categoryData = {
  id: 'computers',
  name: 'Computers',
  description: 'Powerful computers and accessories for work and play.'
};

const subcategories = [
  { id: 'laptops', name: 'Laptops', href: '?subcategory=laptops' },
  { id: 'desktops', name: 'Desktops', href: '?subcategory=desktops' },
  { id: 'monitors', name: 'Monitors', href: '?subcategory=monitors' },
  { id: 'components', name: 'PC Components', href: '?subcategory=components' },
];

const products = [
  {
    id: 201,
    name: 'Ultra-Thin Laptop Pro',
    price: 1299,
    image: 'https://placehold.co/300x300?text=Ultra+Thin+Laptop',
    rating: 4.7,
    reviewCount: 189,
    category: 'computers',
    subcategory: 'laptops'
  },
  {
    id: 202,
    name: 'Gaming Desktop PC',
    price: 1799,
    image: 'https://placehold.co/300x300?text=Gaming+Desktop',
    rating: 4.9,
    reviewCount: 234,
    category: 'computers',
    subcategory: 'desktops'
  },
  {
    id: 203,
    name: '27" 4K Monitor',
    price: 499,
    image: 'https://placehold.co/300x300?text=4K+Monitor',
    rating: 4.6,
    reviewCount: 156,
    category: 'computers',
    subcategory: 'monitors'
  },
  {
    id: 204,
    name: 'Mechanical Keyboard',
    price: 129,
    image: 'https://placehold.co/300x300?text=Mechanical+Keyboard',
    rating: 4.5,
    reviewCount: 278,
    category: 'computers',
    subcategory: 'components'
  }
];

export const metadata = {
  title: 'Computers & Accessories - Latest Tech',
  description: 'Browse our collection of computers, laptops, and computer accessories.'
};

export default function ComputersPage() {
  return (
    <CategoryPage 
      category={categoryData}
      subcategories={subcategories}
      products={products}
    />
  );
}
