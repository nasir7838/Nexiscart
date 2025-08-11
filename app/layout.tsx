import type React from "react"
import type { Metadata } from "next"
import { Inter, Poppins } from "next/font/google"
import "./globals.css"
import Header from "./components/Header"
import { CartProvider } from "./context/CartContext"
import { WishlistProvider } from "./context/WishlistContext"
import { Toaster } from "sonner"
import { SessionProvider } from "@/components/providers/SessionProvider";
import dynamic from 'next/dynamic';

// Import the wrapper component that handles the dynamic import
const TrustedBrandsClient = dynamic(
  () => import('./components/TrustedBrandsWrapper'),
  { loading: () => <div className="h-24 bg-gray-50 w-full flex items-center justify-center">Loading brands...</div> }
);

const inter = Inter({ subsets: ["latin"] })
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
})

export const metadata: Metadata = {
  title: "NexisCart - Professional E-Commerce Platform",
  description: "Enterprise-grade shopping experience with 3D product visualization",
}

// Function to fetch categories from the backend
async function getCategories() {
  try {
    const res = await fetch('http://127.0.0.1:8000/categories/', { 
      cache: 'no-store',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    if (!res.ok) {
      console.error('Failed to fetch categories');
      return [];
    }
    
    return await res.json();
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const categories = await getCategories();

  return (
    <html lang="en">
      <body className={`${inter.className} bg-gray-50 antialiased`}>
        <Toaster position="top-center" richColors />
        <SessionProvider>
          <CartProvider>
            <WishlistProvider>
              <Header categories={categories} />
              <main className="min-h-screen">
                {children}
                <TrustedBrandsClient />
              </main>
            </WishlistProvider>
          </CartProvider>
        </SessionProvider>
      </body>
    </html>
  )
}
