"use client"

"use client";

import { useState, useRef, useEffect, useCallback } from "react"
import Link from "next/link"
import { useRouter, usePathname } from "next/navigation"
import { Search, User, Heart, ShoppingCart, MapPin, ChevronDown, X, Loader2, Menu, LogOut, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useCart } from "../context/CartContext"
import { useAuth } from "@/hooks/use-auth"
import { signOut } from "next-auth/react"
import Navigation from "./Navigation"
import { cn } from "@/lib/utils"
import Image from "next/image"
import { toast } from "sonner"

// Add this type for the search suggestion item
type SuggestionItem = {
  id: string;
  name: string;
  category: string;
}

interface HeaderProps {
  categories: any[]; // You might want to define a proper type for categories
}

export default function Header({ categories = [] }: HeaderProps) {
  const router = useRouter()
  const pathname = usePathname()
  const [searchQuery, setSearchQuery] = useState("")
  const [suggestions, setSuggestions] = useState<SuggestionItem[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)
  
  const searchInputRef = useRef<HTMLInputElement>(null)
  const searchFormRef = useRef<HTMLFormElement>(null)
  // Get cart context with debug logging
  const cart = useCart();
  const { items, itemCount, removeFromCart, getCartTotal } = cart || {};
  
  // Debug log cart state changes
  useEffect(() => {
    console.group('🛒 Header Cart State Update');
    console.log('Cart items:', items);
    console.log('Item count:', itemCount);
    console.log('Cart context:', cart);
    console.groupEnd();
  }, [items, itemCount, cart]);
  const { user, isAuthenticated, logout, isLoading: isAuthLoading } = useAuth()
  const [deliveryLocation, setDeliveryLocation] = useState('Select your location')
  const [isLocating, setIsLocating] = useState(false)

  // Function to get current location
  const getCurrentLocation = () => {
    if (!navigator.geolocation) {
      alert('Geolocation is not supported by your browser')
      return
    }

    setIsLocating(true)
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords
          // Using OpenStreetMap Nominatim for reverse geocoding
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&addressdetails=1`
          )
          const data = await response.json()
          
          // Format the address
          const address = data.address
          let displayAddress = ''
          
          if (address.city || address.town || address.village) {
            displayAddress = address.city || address.town || address.village
            if (address.postcode) {
              displayAddress += ` ${address.postcode}`
            }
          } else if (address.county) {
            displayAddress = address.county
          } else {
            displayAddress = 'Your current location'
          }
          
          setDeliveryLocation(`Deliver to ${displayAddress}`)
          // You might want to save this to local storage or state management
          localStorage.setItem('deliveryLocation', JSON.stringify({
            display: displayAddress,
            coordinates: { latitude, longitude },
            fullAddress: data.display_name
          }))
        } catch (error) {
          console.error('Error getting location:', error)
          setDeliveryLocation('Error getting location')
        } finally {
          setIsLocating(false)
        }
      },
      (error) => {
        console.error('Error getting location:', error)
        setDeliveryLocation('Unable to get location')
        setIsLocating(false)
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    )
  }

  // Load saved location on component mount
  useEffect(() => {
    const savedLocation = localStorage.getItem('deliveryLocation')
    if (savedLocation) {
      const { display } = JSON.parse(savedLocation)
      setDeliveryLocation(`Deliver to ${display}`)
    }
  }, [])

  // Enhanced search suggestions with categories
  const popularSearches: SuggestionItem[] = [
    { id: '1', name: 'Wireless Earbuds', category: 'Audio' },
    { id: '2', name: 'Smart Watches', category: 'Wearables' },
    { id: '3', name: 'Laptops', category: 'Computers' },
    { id: '4', name: 'Smartphones', category: 'Electronics' },
    { id: '5', name: 'Headphones', category: 'Audio' },
    { id: '6', name: 'Cameras', category: 'Photography' }
  ]
  
  // Close menus when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchFormRef.current && !searchFormRef.current.contains(event.target as Node)) {
        setIsSearchOpen(false)
      }
    }
    
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])
  
  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false)
    setIsSearchOpen(false)
  }, [pathname])

  // Handle search submission
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`)
      setSearchQuery('')
      setSuggestions([])
      setIsSearchOpen(false)
    }
  }

  // Clear search query
  const clearSearch = () => {
    setSearchQuery('')
    searchInputRef.current?.focus()
  }

  // Fetch search suggestions
  useEffect(() => {
    const fetchSuggestions = async () => {
      if (!searchQuery.trim()) {
        setSuggestions([])
        return
      }

      setIsLoading(true)
      
      try {
        // Simulate API call for search suggestions
        await new Promise(resolve => setTimeout(resolve, 200))
        
        // Filter popular searches for demo
        const filtered = popularSearches.filter(item =>
          item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.category.toLowerCase().includes(searchQuery.toLowerCase())
        )
        setSuggestions(filtered.slice(0, 5))
      } catch (error) {
        console.error('Error fetching search suggestions:', error)
        setSuggestions([])
      } finally {
        setIsLoading(false)
      }
    }

    const debounceTimer = setTimeout(fetchSuggestions, 200)
    return () => clearTimeout(debounceTimer)
  }, [searchQuery])

  // Handle keyboard navigation for suggestions
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!suggestions.length) return

    let newIndex = -1;
    const lastIndex = suggestions.length - 1;
    const currentActive = document.activeElement as HTMLElement;
    const items = Array.from(
      document.querySelectorAll('[role="suggestion-item"]')
    ) as HTMLElement[];

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        if (currentActive === searchInputRef.current) {
          newIndex = 0;
        } else {
          const currentIndex = items.indexOf(currentActive);
          newIndex = currentIndex < lastIndex ? currentIndex + 1 : 0;
        }
        break;
        
      case 'ArrowUp':
        e.preventDefault();
        if (currentActive === searchInputRef.current) {
          newIndex = lastIndex;
        } else {
          const currentIndex = items.indexOf(currentActive);
          newIndex = currentIndex > 0 ? currentIndex - 1 : lastIndex;
        }
        break;
        
      case 'Escape':
        setSuggestions([]);
        searchInputRef.current?.blur();
        break;
        
      case 'Enter':
        if (suggestions.length > 0) {
          handleSuggestionClick(suggestions[0]);
        }
        break;
        
      default:
        return;
    }

    if (newIndex >= 0 && items[newIndex]) {
      items[newIndex].focus();
    }
  };

  // Handle suggestion click
  const handleSuggestionClick = (suggestion: SuggestionItem) => {
    setSearchQuery(suggestion.name);
    router.push(`/search?q=${encodeURIComponent(suggestion.name)}`);
    setSuggestions([]);
    setIsSearchOpen(false);
  };

  // Toggle mobile menu
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
    if (isSearchOpen) setIsSearchOpen(false)
  }

  // Toggle user menu
  const toggleUserMenu = () => {
    setIsUserMenuOpen(!isUserMenuOpen)
  }

  // Handle user actions
  const handleUserAction = (action: string) => {
    switch (action) {
      case 'profile':
        router.push('/account/profile')
        break
      case 'orders':
        router.push('/account/orders')
        break
      case 'wishlist':
        router.push('/account/wishlist')
        break
      case 'logout':
        logout()
        break
      default:
        break
    }
    setIsUserMenuOpen(false)
  }

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      {/* Top Bar */}
      <div className="hidden md:block bg-gray-900 text-white text-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <div className="relative group">
                <div className="flex items-center text-xs text-white hover:text-gray-300 cursor-pointer">
                  <MapPin className="w-4 h-4 mr-1 flex-shrink-0" />
                  <span className="truncate max-w-[120px] sm:max-w-[180px]">{deliveryLocation}</span>
                  <ChevronDown className="w-3 h-3 ml-1 flex-shrink-0" />
                </div>
                <div className="absolute left-0 mt-1 w-64 bg-white rounded-md shadow-lg py-1 z-50 hidden group-hover:block">
                  <button 
                    onClick={getCurrentLocation}
                    disabled={isLocating}
                    className="flex items-center w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    {isLocating ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Detecting location...
                      </>
                    ) : (
                      <>
                        <MapPin className="w-4 h-4 mr-2 text-blue-500" />
                        Use current location
                      </>
                    )}
                  </button>
                  <div className="border-t border-gray-100 my-1"></div>
                  <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    Enter a different address
                  </button>
                </div>
              </div>
              <a 
                href="tel:8860011172"
                className="hidden sm:inline hover:underline hover:text-white transition-colors"
                title="Call Customer Service"
              >
                Customer Service: 8860011172
              </a>
            </div>
            <div className="flex items-center space-x-6">
              <button 
                onClick={() => router.push('/track-order')}
                className="hover:text-blue-300 transition-colors"
              >
                Track Your Order
              </button>
              <button 
                onClick={() => router.push('/find-store')}
                className="hidden sm:inline hover:text-blue-300 transition-colors"
              >
                Find a Store
              </button>
              <div className="relative group">
                <button className="flex items-center space-x-1 hover:text-blue-300 transition-colors">
                  <span>English</span>
                  <ChevronDown className="w-3 h-3" />
                </button>
                <div className="absolute right-0 mt-2 w-40 bg-white rounded-md shadow-lg py-1 z-50 hidden group-hover:block">
                  <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    English
                  </button>
                  <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    Español
                  </button>
                  <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    Français
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={toggleMobileMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-gray-900 hover:bg-gray-100 focus:outline-none"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              <Menu className={`${isMobileMenuOpen ? 'hidden' : 'block'} h-6 w-6`} />
              <X className={`${isMobileMenuOpen ? 'block' : 'hidden'} h-6 w-6`} />
            </button>
          </div>

          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-lg flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-xl">N</span>
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-xl text-gray-900">NexisCart</span>
                <span className="hidden sm:block text-xs text-gray-500 -mt-1">Professional Shopping</span>
              </div>
            </Link>
          </div>

          {/* Search Bar - Hidden on mobile */}
          <div className="hidden md:flex flex-1 max-w-2xl mx-4 lg:mx-8 relative">
            <form 
              ref={searchFormRef}
              onSubmit={handleSearch}
              className="relative w-full"
            >
              <Input
                ref={searchInputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Search for products, brands, and more..."
                className="w-full pl-4 pr-10 py-2 border-2 border-gray-300 focus:border-blue-500 focus:ring-0 rounded-r-none"
                onFocus={() => setIsSearchOpen(true)}
                aria-label="Search products"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={clearSearch}
                  className="absolute right-12 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  aria-label="Clear search"
                >
                  <X className="w-5 h-5" />
                </button>
              )}
              <Button 
                type="submit"
                className="absolute right-0 top-0 h-full bg-blue-600 hover:bg-blue-700 text-white rounded-l-none px-4"
                aria-label="Search"
              >
                <Search className="w-5 h-5" />
              </Button>
            </form>

            {/* Search Suggestions */}
            {(suggestions.length > 0 || isLoading) && isSearchOpen && (
              <div className="absolute z-50 w-full mt-1 bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden top-full">
                {isLoading ? (
                  <div className="p-4 text-center text-gray-500">
                    <Loader2 className="w-5 h-5 mx-auto animate-spin" />
                  </div>
                ) : (
                  <ul>
                    {suggestions.map((suggestion) => (
                      <li key={suggestion.id}>
                        <button
                          type="button"
                          onClick={() => handleSuggestionClick(suggestion)}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              handleSuggestionClick(suggestion);
                            }
                          }}
                          role="suggestion-item"
                          tabIndex={0}
                          className="w-full text-left px-4 py-3 hover:bg-gray-50 focus:bg-gray-50 focus:outline-none transition-colors flex items-center"
                        >
                          <Search className="w-4 h-4 text-gray-400 mr-3 flex-shrink-0" />
                          <div>
                            <div className="font-medium text-gray-900">{suggestion.name}</div>
                            <div className="text-xs text-gray-500">in {suggestion.category}</div>
                          </div>
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}
          </div>

          {/* Right Side */}
          <div className="flex items-center space-x-1 sm:space-x-3">
            {/* Mobile search button */}
            <button 
              className="md:hidden p-2 text-gray-700 hover:text-blue-600 rounded-full hover:bg-gray-100"
              onClick={() => {
                setIsSearchOpen(!isSearchOpen)
                if (!isSearchOpen) {
                  setTimeout(() => searchInputRef.current?.focus(), 100)
                }
              }}
              aria-label="Search"
            >
              <Search className="w-6 h-6" />
            </button>

            {/* User account */}
            <div className="relative">
              <button 
                onClick={toggleUserMenu}
                className="p-2 text-gray-700 hover:text-blue-600 rounded-full hover:bg-gray-100 flex flex-col items-center"
                aria-expanded={isUserMenuOpen}
                aria-haspopup="true"
              >
                <User className="w-6 h-6" />
                <span className="text-xs mt-1 hidden sm:block">
                  {isAuthenticated ? user?.name?.split(' ')[0] || 'Account' : 'Account'}
                </span>
              </button>
              
              {/* User dropdown */}
              {isUserMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                  {isAuthenticated ? (
                    <>
                      <button 
                        onClick={() => handleUserAction('profile')}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        My Profile
                      </button>
                      <Link 
                        href="/orders"
                        onClick={() => setIsUserMenuOpen(false)}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        My Orders
                      </Link>
                      
                      <button 
                        onClick={async () => {
                          try {
                            // First clear local state
                            logout();
                            
                            // Try to sign out with NextAuth
                            try {
                              await signOut({ redirect: false });
                            } catch (signOutError) {
                              console.log('Sign out completed, but the response was not JSON');
                              // This is fine, we'll continue with the redirect
                            }
                            
                            // Force a full page reload to clear all auth state
                            window.location.href = '/';
                            
                            // Show success message
                            toast.success('Successfully signed out');
                          } catch (error) {
                            console.error('Error during sign out:', error);
                            toast.error('Error signing out. Please try again.');
                          } finally {
                            setIsUserMenuOpen(false);
                          }
                        }}
                        className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 flex items-center"
                      >
                        <LogOut className="w-4 h-4 mr-2" />
                        Sign out
                      </button>
                    </>
                  ) : (
                    <>
                      <button 
                        onClick={() => router.push('/login')}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Sign in
                      </button>
                      <button 
                        onClick={() => router.push('/register')}
                        className="block w-full text-left px-4 py-2 text-sm text-blue-600 hover:bg-gray-100"
                      >
                        Create account
                      </button>
                    </>
                  )}
                </div>
              )}
            </div>

            {/* Wishlist */}
            <Link 
              href="/wishlist" 
              className="p-2 text-gray-700 hover:text-blue-600 rounded-full hover:bg-gray-100 flex flex-col items-center"
              aria-label="Wishlist"
            >
              <Heart className="w-6 h-6" />
              <span className="text-xs mt-1 hidden sm:block">Wishlist</span>
            </Link>

            {/* Cart with Dropdown */}
            <div className="relative group">
              <Link 
                href="/cart" 
                className="p-2 text-gray-700 hover:text-blue-600 rounded-full hover:bg-gray-100 flex flex-col items-center relative"
                aria-label="Shopping cart"
              >
                <ShoppingCart className="w-6 h-6" />
                {itemCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                    {itemCount > 9 ? '9+' : itemCount}
                  </span>
                )}
                <span className="text-xs mt-1 hidden sm:block">Cart</span>
              </Link>
              
              {/* Cart Dropdown */}
              {itemCount > 0 && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-xl border border-gray-200 z-50 hidden group-hover:block">
                  <div className="p-4 border-b border-gray-200">
                    <h3 className="font-medium text-gray-900">Your Cart ({itemCount} {itemCount === 1 ? 'item' : 'items'})</h3>
                  </div>
                  
                  <div className="max-h-96 overflow-y-auto">
                    {items.map((item: { id: string | number; image: string; name: string; quantity: number; price: number; }) => (
                      <div key={item.id} className="flex items-center p-4 border-b border-gray-100 hover:bg-gray-50">
                        <div className="relative w-16 h-16 bg-gray-100 rounded-md overflow-hidden">
                          <Image
                            src={item.image || '/placeholder-product.svg'}
                            alt={item.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="ml-4 flex-1">
                          <h4 className="text-sm font-medium text-gray-900 line-clamp-1">{item.name}</h4>
                          <div className="flex items-center justify-between mt-1">
                            <span className="text-sm text-gray-600">Qty: {item.quantity}</span>
                            <span className="text-sm font-medium text-gray-900">${(item.price * item.quantity).toFixed(2)}</span>
                          </div>
                        </div>
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            removeFromCart(item.id);
                            toast.success('Item removed from cart');
                          }}
                          className="ml-2 text-gray-400 hover:text-red-500"
                          aria-label="Remove item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                  
                  <div className="p-4 border-t border-gray-200">
                    <div className="flex justify-between items-center mb-4">
                      <span className="font-medium text-gray-700">Subtotal:</span>
                      <span className="font-bold text-gray-900">${getCartTotal().toFixed(2)}</span>
                    </div>
                    <div className="flex space-x-2">
                      <Link 
                        href="/cart" 
                        className="flex-1 text-center px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                        onClick={(e) => e.stopPropagation()}
                      >
                        View Cart
                      </Link>
                      <Link 
                        href="/checkout" 
                        className="flex-1 text-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
                        onClick={(e) => e.stopPropagation()}
                      >
                        Checkout
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Mobile search bar */}
        {isSearchOpen && (
          <div className="md:hidden py-3">
            <form 
              ref={searchFormRef}
              onSubmit={handleSearch}
              className="relative"
            >
              <Input
                ref={searchInputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Search for products, brands, and more..."
                className="w-full pl-4 pr-10 py-3 border-2 border-gray-300 focus:border-blue-500 focus:ring-0 rounded-lg"
                onFocus={() => setIsSearchOpen(true)}
                autoFocus
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={clearSearch}
                  className="absolute right-12 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  aria-label="Clear search"
                >
                  <X className="w-5 h-5" />
                </button>
              )}
              <Button 
                type="submit"
                className="absolute right-0 top-0 h-full bg-blue-600 hover:bg-blue-700 text-white rounded-l-none px-4"
                aria-label="Search"
              >
                <Search className="w-5 h-5" />
              </Button>
            </form>

            {/* Mobile Search Suggestions */}
            {(suggestions.length > 0 || isLoading) && isSearchOpen && (
              <div className="absolute z-50 w-full left-0 right-0 mt-1 bg-white shadow-lg border border-gray-200 overflow-y-auto max-h-[60vh]">
                {isLoading ? (
                  <div className="p-4 text-center text-gray-500">
                    <Loader2 className="w-5 h-5 mx-auto animate-spin" />
                  </div>
                ) : (
                  <ul>
                    {suggestions.map((suggestion) => (
                      <li key={suggestion.id}>
                        <button
                          type="button"
                          onClick={() => handleSuggestionClick(suggestion)}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              handleSuggestionClick(suggestion);
                            }
                          }}
                          role="suggestion-item"
                          tabIndex={0}
                          className="w-full text-left px-4 py-3 hover:bg-gray-50 focus:bg-gray-50 focus:outline-none transition-colors flex items-center border-b border-gray-100"
                        >
                          <Search className="w-4 h-4 text-gray-400 mr-3 flex-shrink-0" />
                          <div>
                            <div className="font-medium text-gray-900">{suggestion.name}</div>
                            <div className="text-xs text-gray-500">in {suggestion.category}</div>
                          </div>
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Navigation */}
      <div className="border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Navigation className="hidden md:block" />
        </div>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <div className="pt-2 pb-3 space-y-1">
            <Link
              href="/"
              className="block px-4 py-2 text-base font-medium text-gray-700 hover:bg-gray-100"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/deals"
              className="block px-4 py-2 text-base font-medium text-gray-700 hover:bg-gray-100"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Today's Deals
            </Link>
            <Link
              href="/categories"
              className="block px-4 py-2 text-base font-medium text-gray-700 hover:bg-gray-100"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Categories
            </Link>
            <Link
              href="/new-releases"
              className="block px-4 py-2 text-base font-medium text-gray-700 hover:bg-gray-100"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              New Releases
            </Link>
            <Link
              href="/customer-service"
              className="block px-4 py-2 text-base font-medium text-gray-700 hover:bg-gray-100"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Customer Service
            </Link>
          </div>
          
          {!isAuthenticated ? (
            <div className="pt-4 pb-3 border-t border-gray-200">
              <div className="px-4 space-y-3">
                <Button 
                  onClick={() => {
                    router.push('/login')
                    setIsMobileMenuOpen(false)
                  }}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                >
                  Sign in
                </Button>
                <p className="text-center text-sm text-gray-600">
                  New customer?{' '}
                  <Link 
                    href="/register" 
                    className="text-blue-600 hover:text-blue-500 font-medium"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Start here
                  </Link>
                </p>
              </div>
            </div>
          ) : (
            <div className="pt-4 pb-3 border-t border-gray-200">
              <div className="px-4">
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0">
                    <User className="h-10 w-10 rounded-full bg-gray-200 p-2 text-gray-500" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {user?.name || 'Your Account'}
                    </p>
                    <p className="text-sm text-gray-500 truncate">
                      {user?.email || 'Manage your account'}
                    </p>
                  </div>
                </div>
                
                <div className="mt-4 space-y-1">
                  <button
                    onClick={() => {
                      router.push('/account/orders')
                      setIsMobileMenuOpen(false)
                    }}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md"
                  >
                    Your Orders
                  </button>
                  <button
                    onClick={() => {
                      router.push('/account/wishlist')
                      setIsMobileMenuOpen(false)
                    }}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md"
                  >
                    Your Wishlist
                  </button>
                  <button
                    onClick={() => {
                      router.push('/account/settings')
                      setIsMobileMenuOpen(false)
                    }}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md"
                  >
                    Account Settings
                  </button>
                  <button
                    onClick={() => {
                      logout()
                      setIsMobileMenuOpen(false)
                    }}
                    className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 rounded-md flex items-center"
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Sign Out
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </header>
  )
}