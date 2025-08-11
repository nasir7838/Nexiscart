import { CategoryPage } from '../../components/CategoryPage';

const categoryData = {
  id: 'audio',
  name: 'Audio',
  description: 'Experience crystal clear sound with our premium audio equipment.'
};

const subcategories = [
  { id: 'headphones', name: 'Headphones', href: '?subcategory=headphones' },
  { id: 'earbuds', name: 'Earbuds', href: '?subcategory=earbuds' },
  { id: 'speakers', name: 'Speakers', href: '?subcategory=speakers' },
  { id: 'home-audio', name: 'Home Audio', href: '?subcategory=home-audio' },
];

const products = [
  {
    id: 101,
    name: 'Wireless Noise-Cancelling Headphones',
    price: 299,
    image: 'https://placehold.co/300x300?text=Wireless+Headphones',
    rating: 4.8,
    reviewCount: 245,
    category: 'audio',
    subcategory: 'headphones'
  },
  {
    id: 102,
    name: 'True Wireless Earbuds Pro',
    price: 199,
    image: 'https://placehold.co/300x300?text=Wireless+Earbuds',
    rating: 4.6,
    reviewCount: 189,
    category: 'audio',
    subcategory: 'earbuds'
  },
  {
    id: 103,
    name: 'Portable Bluetooth Speaker',
    price: 129,
    image: 'https://placehold.co/300x300?text=Bluetooth+Speaker',
    rating: 4.4,
    reviewCount: 167,
    category: 'audio',
    subcategory: 'speakers'
  },
  {
    id: 104,
    name: 'Home Theater System',
    price: 599,
    image: 'https://placehold.co/300x300?text=Home+Theater',
    rating: 4.7,
    reviewCount: 98,
    category: 'audio',
    subcategory: 'home-audio'
  }
];

export const metadata = {
  title: 'Audio Equipment - Premium Sound Experience',
  description: 'Discover our range of high-quality audio equipment for every need.'
};

export default function AudioPage() {
  return (
    <CategoryPage 
      category={categoryData}
      subcategories={subcategories}
      products={products}
    />
  );
}
