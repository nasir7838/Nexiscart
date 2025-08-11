"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ChevronDown, ChevronRight, Search, X, Menu, ShoppingBag, Headphones, Laptop, Smartphone, Watch, Camera, Gamepad, Home, Shirt, Heart, Tv, Speaker, BookOpen, Activity, Sparkles } from 'lucide-react'
import { useRouter } from 'next/navigation'

interface Category {
  id: string;
  name: string;
  icon: React.ReactNode;
  subcategories: {
    id: string;
    name: string;
    href: string;
  }[];
}

const productCategories: Category[] = [
  {
    id: 'electronics',
    name: 'Electronics',
    icon: <Smartphone className="w-5 h-5" />,
    subcategories: [
      { id: 'smartphones', name: 'Smartphones', href: '/category/electronics/smartphones' },
      { id: 'laptops', name: 'Laptops', href: '/category/electronics/laptops' },
      { id: 'tablets', name: 'Tablets', href: '/category/electronics/tablets' },
      { id: 'desktops', name: 'Desktops', href: '/category/electronics/desktops' },
    ]
  },
  {
    id: 'audio',
    name: 'Audio',
    icon: <Headphones className="w-5 h-5" />,
    subcategories: [
      { id: 'headphones', name: 'Headphones', href: '/category/audio/headphones' },
      { id: 'earbuds', name: 'Earbuds', href: '/category/audio/earbuds' },
      { id: 'speakers', name: 'Speakers', href: '/category/audio/speakers' },
      { id: 'home-audio', name: 'Home Audio', href: '/category/audio/home-audio' },
    ]
  },

  {
    id: 'clothing',
    name: 'Clothing',
    icon: <Shirt className="w-5 h-5" />,
    subcategories: [
      { id: 'mens', name: "Men's", href: '/category/clothing/mens' },
      { id: 'womens', name: "Women's", href: '/category/clothing/womens' },
      { id: 'kids', name: "Kids'", href: '/category/clothing/kids' },
      { id: 'accessories', name: 'Accessories', href: '/category/clothing/accessories' },
    ]
  },
  {
    id: 'home',
    name: 'Home & Furniture',
    icon: <Home className="w-5 h-5" />,
    subcategories: [
      { id: 'living-room', name: 'Living Room', href: '/category/home/living-room' },
      { id: 'bedroom', name: 'Bedroom', href: '/category/home/bedroom' },
      { id: 'kitchen', name: 'Kitchen & Dining', href: '/category/home/kitchen' },
      { id: 'home-decor', name: 'Home Decor', href: '/category/home/home-decor' },
    ]
  },
  {
    id: 'books',
    name: 'Books & Media',
    icon: <BookOpen className="w-5 h-5" />,
    subcategories: [
      { id: 'fiction', name: 'Fiction', href: '/category/books/fiction' },
      { id: 'non-fiction', name: 'Non-Fiction', href: '/category/books/non-fiction' },
      { id: 'academic', name: 'Academic', href: '/category/books/academic' },
      { id: 'e-books', name: 'E-Books', href: '/category/books/e-books' },
    ]
  },
  {
    id: 'sports',
    name: 'Sports & Outdoors',
    icon: <Activity className="w-5 h-5" />,
    subcategories: [
      { id: 'fitness', name: 'Fitness', href: '/category/sports/fitness' },
      { id: 'team-sports', name: 'Team Sports', href: '/category/sports/team-sports' },
      { id: 'outdoor', name: 'Outdoor Recreation', href: '/category/sports/outdoor' },
      { id: 'accessories', name: 'Accessories', href: '/category/sports/accessories' },
    ]
  },
  {
    id: 'beauty',
    name: 'Beauty & Personal Care',
    icon: <Sparkles className="w-5 h-5" />,
    subcategories: [
      { id: 'skincare', name: 'Skincare', href: '/category/beauty/skincare' },
      { id: 'makeup', name: 'Makeup', href: '/category/beauty/makeup' },
      { id: 'haircare', name: 'Hair Care', href: '/category/beauty/haircare' },
      { id: 'fragrance', name: 'Fragrance', href: '/category/beauty/fragrance' },
    ]
  },
  {
    id: 'gaming',
    name: 'Gaming',
    icon: <Gamepad className="w-5 h-5" />,
    subcategories: [
      { id: 'consoles', name: 'Gaming Consoles', href: '/category/gaming/consoles' },
      { id: 'gaming-pcs', name: 'Gaming PCs', href: '/category/gaming/gaming-pcs' },
      { id: 'accessories', name: 'Gaming Accessories', href: '/category/gaming/accessories' },
      { id: 'games', name: 'Games', href: '/category/gaming/games' },
    ]
  },
  {
    id: 'deals',
    name: 'Deals & Promotions',
    icon: <ShoppingBag className="w-5 h-5" />,
    subcategories: [
      { id: 'daily-deals', name: 'Daily Deals', href: '/deals/daily' },
      { id: 'clearance', name: 'Clearance', href: '/deals/clearance' },
      { id: 'bundle-offers', name: 'Bundle Offers', href: '/deals/bundles' },
    ]
  }
];

interface NavigationProps {
  className?: string;
}

const Navigation: React.FC<NavigationProps> = ({ className = '' }) => {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState('')
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeCategory, setActiveCategory] = useState<string | null>(null)

  // Handle scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Handle search submission
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`)
      setIsSearchOpen(false)
      setSearchQuery('')
    }
  }

  // Toggle mobile menu
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
    if (isSearchOpen) setIsSearchOpen(false)
  }

  // Toggle search
  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen)
    if (isMobileMenuOpen) setIsMobileMenuOpen(false)
  }

  // Toggle category in mobile view
  const toggleCategory = (categoryId: string) => {
    setActiveCategory(activeCategory === categoryId ? null : categoryId)
  }

  // Use the productCategories directly
  const displayCategories = productCategories;

  return (
    <>
      {/* Mobile Search Bar */}
      {isSearchOpen && (
        <div className="lg:hidden fixed top-0 left-0 w-full bg-white z-50 p-4 shadow-md">
        <div className="flex items-center">
          <button 
            onClick={toggleSearch}
            className="mr-2 text-gray-600"
            aria-label="Close search"
          >
            <X className="w-6 h-6" />
          </button>
          <form onSubmit={handleSearch} className="flex-1 flex">
            <input
              type="text"
              id="mobile-search"
              name="q"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for products..."
              className="flex-1 border border-gray-300 rounded-l-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              autoFocus
              aria-label="Search products"
            />
            <button 
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded-r-md hover:bg-blue-700"
              aria-label="Submit search"
            >
              <Search className="w-5 h-5" />
            </button>
          </form>
        </div>
      </div>
      )}

      {/* Mobile Menu Button */}
      <div className="lg:hidden flex items-center justify-between p-4 bg-white border-b border-gray-200">
        <button 
          onClick={toggleMobileMenu}
          className="text-gray-700 hover:text-blue-600"
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <Menu className="w-6 h-6" />
          )}
        </button>
        
        <Link href="/" className="text-xl font-bold text-gray-800">
          Nexis
        </Link>
        
        <div className="flex items-center space-x-4">
          <button 
            onClick={toggleSearch}
            className="text-gray-700 hover:text-blue-600"
            aria-label="Search"
          >
            <Search className="w-5 h-5" />
          </button>
          <Link href="/cart" className="relative text-gray-700 hover:text-blue-600">
            <ShoppingBag className="w-5 h-5" />
            <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
              0
            </span>
          </Link>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 bg-white z-40 mt-16 overflow-y-auto">
          <div className="px-4 py-2">
            <h3 className="px-4 py-2 text-sm font-medium text-gray-500 uppercase tracking-wider">
              Categories
            </h3>
            <nav className="mt-2">
              {displayCategories.map((category) => (
                <div key={category.id} className="border-b border-gray-200">
                  <button
                    onClick={() => toggleCategory(category.id)}
                    className="w-full flex items-center justify-between px-4 py-3 text-sm font-medium text-gray-900 hover:bg-gray-50"
                  >
                    <div className="flex items-center">
                      <span className="text-gray-500 mr-3">
                        {category.icon}
                      </span>
                      {category.name}
                    </div>
                    <ChevronRight 
                      className={`w-4 h-4 text-gray-500 transition-transform ${
                        activeCategory === category.id ? 'rotate-90' : ''
                      }`}
                    />
                  </button>
                  {activeCategory === category.id && (
                    <div className="pl-12 pr-4 pb-2">
                      {category.subcategories.map((subcategory) => (
                        <Link
                          key={subcategory.id}
                          href={subcategory.href}
                          className="block py-2 text-sm text-gray-600 hover:text-blue-600"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          {subcategory.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </nav>
          </div>
        </div>
      )}

      {/* Desktop Navigation */}
      <div className={`hidden lg:block bg-white shadow-sm ${isScrolled ? 'fixed top-0 left-0 right-0 z-40' : ''}`}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex-shrink-0">
              <Link href="/" className="text-2xl font-bold text-gray-800">
                Nexis
              </Link>
            </div>
            
            {/* Categories */}
            <div className="hidden lg:flex space-x-1">
              {displayCategories.map((category) => (
                <div key={category.id} className="relative group">
                  <button
                    className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-md group"
                    onMouseEnter={() => setActiveCategory(category.id)}
                    onMouseLeave={() => setActiveCategory(null)}
                    type="button"
                    aria-haspopup="true"
                    aria-expanded={activeCategory === category.id}
                  >
                    <span className="text-gray-500 mr-2">
                      {category.icon}
                    </span>
                    {category.name}
                    <ChevronDown className="ml-1 w-4 h-4 text-gray-500" />
                  </button>
                  
                  {/* Dropdown Menu */}
                  {activeCategory === category.id && (
                    <div 
                      className="absolute left-0 mt-0 w-56 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 z-50"
                      onMouseEnter={() => setActiveCategory(category.id)}
                      onMouseLeave={() => setActiveCategory(null)}
                    >
                      <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby={`category-${category.id}-button`}>
                        {category.subcategories.map((subcategory) => (
                          <Link
                            key={subcategory.id}
                            href={subcategory.href}
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            role="menuitem"
                          >
                            {subcategory.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

       
          </div>
        </div>
      </div>
    </>
  )
}

export default Navigation;
