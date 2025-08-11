'use client';

import { useState } from 'react';
import Link from 'next/link';
import { X, Play } from 'lucide-react';
import { useRouter } from 'next/navigation';
import ProductImage from './ProductImage';

// Sample product data with images
const featuredProducts = [
  {
    id: 1,
    name: 'Premium Smartphone X1',
    price: 999,
    image: 'https://images.unsplash.com/photo-1611791484670-ae6e2c0bf122?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    category: 'Electronics',
  },
  {
    id: 2,
    name: 'Wireless Earbuds Pro',
    price: 199,
    image: 'https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    category: 'Audio',
  },
  {
    id: 3,
    name: 'Smart Watch Series 5',
    price: 299,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    category: 'Wearables',
  },
];

// Demo video modal component
const DemoVideoModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <div className="relative w-full max-w-4xl bg-gray-900 rounded-xl overflow-hidden">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 text-white hover:text-gray-300 transition-colors"
          aria-label="Close video"
        >
          <X size={24} />
        </button>
        <div className="aspect-video w-full bg-black rounded-lg overflow-hidden">
          <iframe
            className="w-full h-full"
            src="https://www.youtube.com/embed/7gZ2Vz7zFa8?autoplay=1&mute=1&rel=0&modestbranding=1"
            title="3D Product Visualization Demo"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            loading="lazy"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default function Hero() {
  const router = useRouter();
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  
  return (
    <section className="relative bg-gradient-to-r from-gray-900 via-blue-900 to-indigo-900 text-white overflow-hidden">
      {/* Background overlay */}
      <div className="absolute inset-0 bg-black/20"></div>

      {/* Container with responsive padding */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20 lg:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left content */}
          <div className="text-center lg:text-left">
            {/* Badge */}
            <div className="inline-flex items-center bg-blue-600/20 backdrop-blur-sm border border-blue-400/30 rounded-full px-3 py-1.5 md:px-4 md:py-2 mb-4 md:mb-6">
              <span className="w-1.5 h-1.5 md:w-2 md:h-2 bg-green-400 rounded-full mr-2 animate-pulse"></span>
              <span className="text-xs sm:text-sm font-medium">New: AI-Powered 3D Visualization</span>
            </div>

            {/* Main heading */}
            <h1 className="font-bold text-4xl sm:text-5xl lg:text-6xl leading-tight mb-4 md:mb-6">
              Experience Products in
              <span className="block bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent mt-1 md:mt-2">
                Stunning Reality
              </span>
            </h1>

            {/* Description */}
            <p className="text-base sm:text-lg md:text-xl text-gray-300 mb-6 md:mb-8 leading-relaxed max-w-2xl mx-auto lg:mx-0">
              Revolutionary shopping platform with photorealistic product visualization, AI recommendations, and
              immersive experiences.
            </p>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start">
              <Link 
                href="/categories/electronics"
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold text-base sm:text-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 text-center"
                aria-label="Explore our products"
              >
                Explore Products
              </Link>
              <button 
                onClick={() => setIsVideoOpen(true)}
                className="flex items-center justify-center gap-2 border-2 border-white/30 hover:bg-white/10 backdrop-blur-sm text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold text-base sm:text-lg transition-all duration-300"
                aria-label="Watch demo video"
              >
                <Play size={18} />
                Watch Demo
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 sm:gap-6 md:gap-8 mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-white/20">
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-blue-400">10M+</div>
                <div className="text-xs sm:text-sm text-gray-400">Products Available</div>
              </div>
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-cyan-400">99.8%</div>
                <div className="text-xs sm:text-sm text-gray-400">Customer Satisfaction</div>
              </div>
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-green-400">24/7</div>
                <div className="text-xs sm:text-sm text-gray-400">Expert Support</div>
              </div>
            </div>

            {/* View All Products Button */}
            <div className="mt-6 text-center lg:text-left">
              <Link 
                href="/products"
                className="inline-flex items-center gap-2 text-blue-300 hover:text-white text-sm font-medium transition-colors group"
                aria-label="View all products"
              >
                View all products
                <svg 
                  className="w-4 h-4 transition-transform group-hover:translate-x-1" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M14 5l7 7m0 0l-7 7m7-7H3" 
                  />
                </svg>
              </Link>
            </div>
          </div>

          {/* Right content - Product showcase */}
          <div className="relative w-full h-[500px] hidden lg:block">
            {/* Main featured product (center) */}
            <Link 
              href={`/product/${featuredProducts[0].id}`}
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 w-64 h-80 transition-all duration-300 hover:scale-105 group"
              aria-label={`View ${featuredProducts[0].name}`}
            >
              <div className="relative w-full h-full rounded-xl overflow-hidden shadow-2xl">
                <ProductImage
                  src={featuredProducts[0].image}
                  alt={featuredProducts[0].name}
                  className="w-full h-full group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors duration-300" />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-4">
                  <h3 className="font-semibold text-white text-base">{featuredProducts[0].name}</h3>
                  <p className="text-blue-300 text-sm">${featuredProducts[0].price}</p>
                </div>
              </div>
            </Link>

            {/* Secondary product (top right) */}
            <Link 
              href={`/product/${featuredProducts[1].id}`}
              className="absolute top-10 right-10 w-48 h-60 transform transition-all duration-300 hover:scale-105 z-5 group"
              aria-label={`View ${featuredProducts[1].name}`}
            >
              <div className="relative w-full h-full rounded-xl overflow-hidden shadow-xl">
                <ProductImage
                  src={featuredProducts[1].image}
                  alt={featuredProducts[1].name}
                  className="w-full h-full group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors duration-300" />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-3">
                  <h3 className="font-medium text-white text-sm">{featuredProducts[1].name}</h3>
                  <p className="text-blue-300 text-xs">${featuredProducts[1].price}</p>
                </div>
              </div>
            </Link>

            {/* Tertiary product (bottom left) */}
            <Link 
              href={`/product/${featuredProducts[2].id}`}
              className="absolute bottom-10 left-10 w-48 h-60 transform transition-all duration-300 hover:scale-105 z-5 group"
              aria-label={`View ${featuredProducts[2].name}`}
            >
              <div className="relative w-full h-full rounded-xl overflow-hidden shadow-xl">
                <ProductImage
                  src={featuredProducts[2].image}
                  alt={featuredProducts[2].name}
                  className="w-full h-full group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors duration-300" />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-3">
                  <h3 className="font-medium text-white text-sm">{featuredProducts[2].name}</h3>
                  <p className="text-blue-300 text-xs">${featuredProducts[2].price}</p>
                </div>
              </div>
            </Link>

            {/* Decorative elements */}
            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-blue-500/10 rounded-full filter blur-3xl"></div>
            <div className="absolute -top-10 -left-10 w-60 h-60 bg-indigo-500/10 rounded-full filter blur-3xl"></div>
          </div>
        </div>
      </div>
      
      {/* Demo Video Modal */}
      <DemoVideoModal 
        isOpen={isVideoOpen} 
        onClose={() => setIsVideoOpen(false)} 
      />
    </section>
  );
}
