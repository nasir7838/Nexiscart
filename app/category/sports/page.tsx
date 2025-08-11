import { CategoryPage } from '../../components/CategoryPage';

const categoryData = {
  id: 'sports',
  name: 'Sports & Outdoors',
  description: 'Gear up for your next adventure with our premium sports and outdoor equipment.'
};

const subcategories = [
  { id: 'fitness', name: 'Fitness', href: '?subcategory=fitness' },
  { id: 'team-sports', name: 'Team Sports', href: '?subcategory=team-sports' },
  { id: 'outdoor', name: 'Outdoor Recreation', href: '?subcategory=outdoor' },
  { id: 'accessories', name: 'Accessories', href: '?subcategory=accessories' },
];

const products = [
  {
    id: 3001,
    name: 'Yoga Mat with Strap',
    price: 34.99,
    image: 'https://placehold.co/300x300?text=Yoga+Mat',
    rating: 4.7,
    reviewCount: 189,
    category: 'sports',
    subcategory: 'fitness'
  },
  {
    id: 3002,
    name: 'Basketball (Official Size 7)',
    price: 29.99,
    image: 'https://placehold.co/300x300?text=Basketball',
    rating: 4.8,
    reviewCount: 245,
    category: 'sports',
    subcategory: 'team-sports'
  },
  {
    id: 3003,
    name: 'Camping Tent (4-Person)',
    price: 149.99,
    image: 'https://placehold.co/300x300?text=Camping+Tent',
    rating: 4.6,
    reviewCount: 167,
    category: 'sports',
    subcategory: 'outdoor'
  },
  {
    id: 3004,
    name: 'Sports Water Bottle (32oz)',
    price: 19.99,
    image: 'https://placehold.co/300x300?text=Water+Bottle',
    rating: 4.5,
    reviewCount: 312,
    category: 'sports',
    subcategory: 'accessories'
  },
  {
    id: 3005,
    name: 'Adjustable Dumbbell Set',
    price: 199.99,
    image: 'https://placehold.co/300x300?text=Dumbbell+Set',
    rating: 4.8,
    reviewCount: 178,
    category: 'sports',
    subcategory: 'fitness'
  },
  {
    id: 3006,
    name: 'Soccer Ball (Size 5)',
    price: 39.99,
    image: 'https://placehold.co/300x300?text=Soccer+Ball',
    rating: 4.7,
    reviewCount: 156,
    category: 'sports',
    subcategory: 'team-sports'
  },
  {
    id: 3007,
    name: 'Hiking Backpack (50L)',
    price: 89.99,
    image: 'https://placehold.co/300x300?text=Hiking+Backpack',
    rating: 4.6,
    reviewCount: 143,
    category: 'sports',
    subcategory: 'outdoor'
  },
  {
    id: 3008,
    name: 'Fitness Tracker Watch',
    price: 79.99,
    image: 'https://placehold.co/300x300?text=Fitness+Tracker',
    rating: 4.4,
    reviewCount: 267,
    category: 'sports',
    subcategory: 'accessories'
  }
];

export const metadata = {
  title: 'Sports & Outdoors - Gear Up for Adventure',
  description: 'Find everything you need for fitness, team sports, and outdoor adventures.'
};

export default function SportsPage() {
  return (
    <CategoryPage 
      category={categoryData}
      subcategories={subcategories}
      products={products}
    />
  );
}
