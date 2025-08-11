import { CategoryPage } from '../../components/CategoryPage';

const categoryData = {
  id: 'home',
  name: 'Home & Furniture',
  description: 'Transform your living space with our premium home and furniture collection.'
};

const subcategories = [
  { id: 'living-room', name: 'Living Room', href: '?subcategory=living-room' },
  { id: 'bedroom', name: 'Bedroom', href: '?subcategory=bedroom' },
  { id: 'kitchen', name: 'Kitchen & Dining', href: '?subcategory=kitchen' },
  { id: 'home-decor', name: 'Home Decor', href: '?subcategory=home-decor' },
];

const products = [
  {
    id: 1001,
    name: 'Modern Sofa Set',
    price: 899.99,
    image: 'https://placehold.co/300x300?text=Modern+Sofa+Set',
    rating: 4.7,
    reviewCount: 189,
    category: 'home',
    subcategory: 'living-room'
  },
  {
    id: 1002,
    name: 'King Size Bed Frame',
    price: 699.99,
    image: 'https://placehold.co/300x300?text=King+Bed+Frame',
    rating: 4.8,
    reviewCount: 145,
    category: 'home',
    subcategory: 'bedroom'
  },
  {
    id: 1003,
    name: 'Dining Table Set',
    price: 549.99,
    image: 'https://placehold.co/300x300?text=Dining+Table+Set',
    rating: 4.6,
    reviewCount: 167,
    category: 'home',
    subcategory: 'kitchen'
  },
  {
    id: 1004,
    name: 'Decorative Throw Pillows (Set of 3)',
    price: 49.99,
    image: 'https://placehold.co/300x300?text=Throw+Pillows',
    rating: 4.4,
    reviewCount: 278,
    category: 'home',
    subcategory: 'home-decor'
  },
  {
    id: 1005,
    name: 'Coffee Table',
    price: 199.99,
    image: 'https://placehold.co/300x300?text=Coffee+Table',
    rating: 4.5,
    reviewCount: 132,
    category: 'home',
    subcategory: 'living-room'
  },
  {
    id: 1006,
    name: 'Dresser with Mirror',
    price: 349.99,
    image: 'https://placehold.co/300x300?text=Dresser+with+Mirror',
    rating: 4.7,
    reviewCount: 98,
    category: 'home',
    subcategory: 'bedroom'
  },
  {
    id: 1007,
    name: 'Bar Stool Set (2 Pack)',
    price: 129.99,
    image: 'https://placehold.co/300x300?text=Bar+Stools',
    rating: 4.3,
    reviewCount: 87,
    category: 'home',
    subcategory: 'kitchen'
  },
  {
    id: 1008,
    name: 'Wall Art Canvas Set',
    price: 89.99,
    image: 'https://placehold.co/300x300?text=Wall+Art',
    rating: 4.5,
    reviewCount: 154,
    category: 'home',
    subcategory: 'home-decor'
  }
];

export const metadata = {
  title: 'Home & Furniture - Transform Your Living Space',
  description: 'Discover our collection of furniture and home decor to create your perfect living space.'
};

export default function HomePage() {
  return (
    <CategoryPage 
      category={categoryData}
      subcategories={subcategories}
      products={products}
    />
  );
}
