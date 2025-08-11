import { CategoryPage } from '../../components/CategoryPage';

const categoryData = {
  id: 'books',
  name: 'Books & Media',
  description: 'Explore our vast collection of books, e-books, and media for all ages and interests.'
};

const subcategories = [
  { id: 'fiction', name: 'Fiction', href: '?subcategory=fiction' },
  { id: 'non-fiction', name: 'Non-Fiction', href: '?subcategory=non-fiction' },
  { id: 'academic', name: 'Academic', href: '?subcategory=academic' },
  { id: 'e-books', name: 'E-Books', href: '?subcategory=e-books' },
];

const products = [
  {
    id: 2001,
    name: 'The Midnight Library',
    price: 15.99,
    image: 'https://placehold.co/300x300?text=The+Midnight+Library',
    rating: 4.6,
    reviewCount: 245,
    category: 'books',
    subcategory: 'fiction'
  },
  {
    id: 2002,
    name: 'Atomic Habits',
    price: 12.99,
    image: 'https://placehold.co/300x300?text=Atomic+Habits',
    rating: 4.8,
    reviewCount: 312,
    category: 'books',
    subcategory: 'non-fiction'
  },
  {
    id: 2003,
    name: 'Introduction to Algorithms',
    price: 89.99,
    image: 'https://placehold.co/300x300?text=Algorithms+Book',
    rating: 4.7,
    reviewCount: 189,
    category: 'books',
    subcategory: 'academic'
  },
  {
    id: 2004,
    name: 'The Psychology of Money (E-Book)',
    price: 9.99,
    image: 'https://placehold.co/300x300?text=Psychology+of+Money',
    rating: 4.5,
    reviewCount: 267,
    category: 'books',
    subcategory: 'e-books'
  },
  {
    id: 2005,
    name: 'Project Hail Mary',
    price: 14.99,
    image: 'https://placehold.co/300x300?text=Project+Hail+Mary',
    rating: 4.8,
    reviewCount: 198,
    category: 'books',
    subcategory: 'fiction'
  },
  {
    id: 2006,
    name: 'Sapiens: A Brief History of Humankind',
    price: 16.99,
    image: 'https://placehold.co/300x300?text=Sapiens',
    rating: 4.7,
    reviewCount: 289,
    category: 'books',
    subcategory: 'non-fiction'
  },
  {
    id: 2007,
    name: 'Calculus: Early Transcendentals',
    price: 129.99,
    image: 'https://placehold.co/300x300?text=Calculus+Book',
    rating: 4.5,
    reviewCount: 143,
    category: 'books',
    subcategory: 'academic'
  },
  {
    id: 2008,
    name: 'Dune (E-Book)',
    price: 7.99,
    image: 'https://placehold.co/300x300?text=Dune+Ebook',
    rating: 4.6,
    reviewCount: 321,
    category: 'books',
    subcategory: 'e-books'
  }
];

export const metadata = {
  title: 'Books & Media - Explore Our Collection',
  description: 'Discover books, e-books, and academic resources for readers of all interests.'
};

export default function BooksPage() {
  return (
    <CategoryPage 
      category={categoryData}
      subcategories={subcategories}
      products={products}
    />
  );
}
