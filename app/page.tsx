// app/page.tsx

import Hero from "./components/Hero"
import CategoryGrid from "./components/CategoryGrid"
import FeaturedProducts from "./components/FeaturedProducts"
import DealsSection from "./components/DealsSection"
import TrendingSection from "./components/TrendingSection"
import BrandShowcase from "./components/BrandShowcase"
import NoProductsPlaceholder from "./components/NoProductsPlaceholder"

// This async function fetches product data from the backend.
async function getTrendingProducts() {
  try {
    console.log('Fetching products from backend...');
    const res = await fetch('http://127.0.0.1:8000/items/', { 
      cache: 'no-store',
      headers: {
        'Content-Type': 'application/json',
      },
      signal: AbortSignal.timeout(5000) // Increased timeout to 5 seconds
    });

    console.log('Response status:', res.status);
    
    if (!res.ok) {
      const errorText = await res.text();
      console.error('Error response:', errorText);
      throw new Error(`Failed to fetch data: ${res.status} ${res.statusText}`);
    }

    const data = await res.json();
    console.log('Products fetched successfully:', data);
    return data;
  } catch (error) {
    console.error('Error in getTrendingProducts:', error);
    return null;
  }
}

// Function to fetch categories from the backend
async function getCategories() {
  try {
    const res = await fetch('http://127.0.0.1:8000/categories/', {
      cache: 'no-store',
      headers: {
        'Content-Type': 'application/json',
      },
      signal: AbortSignal.timeout(5000)
    });

    if (!res.ok) {
      throw new Error('Failed to fetch categories');
    }

    return await res.json();
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
}

// The page component is async to allow for server-side data fetching.
export default async function HomePage() {
  // Fetch both products and categories in parallel
  const [products, categories] = await Promise.all([
    getTrendingProducts(),
    getCategories()
  ]);
  
  // If there was an error, products will be null
  const trendingProducts = products || [];

  return (
    <div className="space-y-16">
      <Hero />
      <CategoryGrid categories={categories} />
      <FeaturedProducts products={trendingProducts} />
      <DealsSection />
      
      {products === null ? (
        <NoProductsPlaceholder />
      ) : (
        <TrendingSection products={trendingProducts} />
      )}
      
      <BrandShowcase />
    </div>
  )
}