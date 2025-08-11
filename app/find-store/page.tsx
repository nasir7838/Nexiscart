'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import L from 'leaflet';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Loader2, MapPin, Search, X, Clock, Phone, ChevronRight, ArrowRight } from 'lucide-react';

// Dynamically import Map components to avoid SSR issues
const MapContainer = dynamic(
  () => import('react-leaflet').then((mod) => mod.MapContainer),
  { ssr: false }
);
const TileLayer = dynamic(
  () => import('react-leaflet').then((mod) => mod.TileLayer),
  { ssr: false }
);
const Marker = dynamic(
  () => import('react-leaflet').then((mod) => mod.Marker),
  { ssr: false }
);
const Popup = dynamic(
  () => import('react-leaflet').then((mod) => mod.Popup),
  { ssr: false }
);

type Position = {
  lat: number;
  lng: number;
};

type Store = {
  id: number;
  name: string;
  address: string;
  city: string;
  phone: string;
  distance: string;
  hours: string;
  position: Position;
};

// Mock store data
const MOCK_STORES: Store[] = [
  {
    id: 1,
    name: 'Nexis Main Store',
    address: '123 Shopping District',
    city: 'New Delhi, 110001',
    phone: '8860011172',
    distance: '0.5 km',
    hours: 'Mon-Sun: 9:00 AM - 10:00 PM',
    position: { lat: 28.6139, lng: 77.2090 }
  },
  {
    id: 2,
    name: 'Nexis Electronics Hub',
    address: '456 Tech Park',
    city: 'Gurugram, 122002',
    phone: '8860011173',
    distance: '2.3 km',
    hours: 'Mon-Sun: 10:00 AM - 9:00 PM',
    position: { lat: 28.4595, lng: 77.0266 }
  },
  {
    id: 3,
    name: 'Nexis Fashion Outlet',
    address: '789 Style Street',
    city: 'Noida, 201301',
    phone: '8860011174',
    distance: '5.1 km',
    hours: 'Mon-Sun: 10:00 AM - 10:00 PM',
    position: { lat: 28.5355, lng: 77.3910 }
  }
];

export default function FindStorePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const mapRef = useRef<L.Map | null>(null);
  const [userLocation, setUserLocation] = useState<Position | null>(null);
  const [selectedStore, setSelectedStore] = useState<Store | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [filteredStores, setFilteredStores] = useState<Store[]>(MOCK_STORES);
  const [mapCenter, setMapCenter] = useState<[number, number]>([28.6139, 77.2090]); // Default to New Delhi
  const [zoom, setZoom] = useState(12);

  // Get user's location when component mounts
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userLoc = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          setUserLocation(userLoc);
          setMapCenter([userLoc.lat, userLoc.lng]);
          setZoom(13);
        },
        (error) => {
          console.error('Error getting location:', error);
          setError('Unable to retrieve your location. Using default location.');
        }
      );
    } else {
      setError('Geolocation is not supported by your browser. Using default location.');
    }
    
    // Set loading to false after initial setup
    setIsLoading(false);
  }, []);

  // Update filtered stores when search query changes
  useEffect(() => {
    if (!searchQuery.trim()) {
      setFilteredStores(MOCK_STORES);
      return;
    }

    const filtered = MOCK_STORES.filter(
      store =>
        store.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        store.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
        store.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
        store.phone.includes(searchQuery)
    );

    setFilteredStores(filtered);
    
    // If only one result, center the map on it
    if (filtered.length === 1) {
      const store = filtered[0];
      setMapCenter([store.position.lat, store.position.lng]);
      setZoom(14);
    }
  }, [searchQuery]);

  // Update map center when search results change
  useEffect(() => {
    if (mapRef.current && filteredStores.length > 0) {
      const bounds = L.latLngBounds(
        filteredStores.map(store => [store.position.lat, store.position.lng])
      );
      
      if (userLocation) {
        bounds.extend([userLocation.lat, userLocation.lng]);
      }
      
      mapRef.current.fitBounds(bounds, { padding: [50, 50] });
    }
  }, [filteredStores, userLocation]);

  // Handle store click from list
  const handleStoreClick = (store: Store) => {
    setSelectedStore(store);
    setMapCenter([store.position.lat, store.position.lng]);
    setZoom(15);
    
    // In a real implementation, you might want to open the popup here
    // This would require using a ref to the marker and calling markerRef.current.openPopup()
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Filter stores based on search query
    const filtered = MOCK_STORES.filter(store => 
      store.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      store.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
      store.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
      store.phone.includes(searchQuery)
    );
    
    setFilteredStores(filtered);
    
    // The map will automatically update via the filteredStores effect
  };

  const handleUseMyLocation = () => {
    setIsLoading(true);
    
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userLoc = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          setUserLocation(userLoc);
          
          // In a real app, you would calculate distances from user's location
          // For demo, we'll just show all stores
          setFilteredStores(MOCK_STORES);
          
          // Center map on user's location
          if (mapRef.current) {
            mapRef.current.setView([userLoc.lat, userLoc.lng], 12);
          }
          
          setIsLoading(false);
        },
        (error) => {
          console.error('Error getting location:', error);
          setError('Unable to retrieve your location. Please enter a location manually.');
          setIsLoading(false);
        }
      );
    } else {
      setError('Geolocation is not supported by your browser. Please enter a location manually.');
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Find a Store</h1>
      
      {/* Search and filter section */}
      <div className="mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <Input
              type="text"
              placeholder="Search by city, address, or store name"
              className="pl-10 w-full"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button 
            onClick={handleSearch}
            disabled={isLoading}
            className="w-full md:w-auto"
          >
            {isLoading ? (
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            ) : (
              <Search className="w-4 h-4 mr-2" />
            )}
            Search
          </Button>
          <Button 
            variant="outline" 
            onClick={handleUseMyLocation}
            disabled={isLoading || !navigator.geolocation}
            className="w-full md:w-auto"
          >
            <MapPin className="w-4 h-4 mr-2" />
            Use My Location
          </Button>
        </div>
        
        {error && (
          <p className="mt-2 text-sm text-red-500">{error}</p>
        )}
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Store list */}
        <div className="w-full lg:w-1/3">
          <h2 className="text-lg font-semibold mb-4">
            {filteredStores.length} {filteredStores.length === 1 ? 'Store' : 'Stores'} Found
          </h2>
          
          <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
            {filteredStores.length > 0 ? (
              filteredStores.map((store) => (
                <div 
                  key={store.id} 
                  className={`p-4 border rounded-lg cursor-pointer hover:shadow-md transition-shadow ${
                    selectedStore?.id === store.id ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
                  }`}
                  onClick={() => handleStoreClick(store)}
                >
                  <h3 className="font-semibold text-lg">{store.name}</h3>
                  <p className="text-gray-600 mt-1">{store.address}</p>
                  <p className="text-gray-600">{store.city}</p>
                  <div className="mt-2 flex items-center text-sm text-gray-500">
                    <MapPin className="w-4 h-4 mr-1" />
                    {store.distance} away
                  </div>
                  <div className="mt-2 flex items-center text-sm text-gray-500">
                    <Clock className="w-4 h-4 mr-1" />
                    {store.hours}
                  </div>
                  <a 
                    href={`tel:${store.phone}`}
                    className="mt-3 inline-flex items-center text-blue-600 hover:text-blue-800 text-sm"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Phone className="w-4 h-4 mr-1" />
                    {store.phone}
                  </a>
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-gray-500">
                No stores found matching your search.
              </div>
            )}
          </div>
        </div>

        {/* Map */}
        <div className="w-full lg:w-2/3 rounded-lg overflow-hidden border border-gray-200 bg-gray-100" style={{ height: '600px' }}>
          {isLoading ? (
            <div className="h-full flex items-center justify-center">
              <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
            </div>
          ) : (
            <MapContainer
              center={mapCenter}
              zoom={zoom}
              style={{ height: '100%', width: '100%' }}
              zoomControl={false}
              ref={mapRef}
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />
              {filteredStores.map((store) => (
                <Marker
                  key={store.id}
                  position={[store.position.lat, store.position.lng]}
                  eventHandlers={{
                    click: () => handleStoreClick(store),
                  }}
                >
                  <Popup>
                    <div className="p-2">
                      <h3 className="font-bold">{store.name}</h3>
                      <p className="text-sm">{store.address}</p>
                      <p className="text-sm">{store.city}</p>
                      <p className="text-sm">Phone: {store.phone}</p>
                      <p className="text-sm">Hours: {store.hours}</p>
                    </div>
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          )}
        </div>
      </div>

      {/* Store details modal */}
      {selectedStore && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-2xl font-bold">{selectedStore.name}</h2>
                <button 
                  onClick={() => setSelectedStore(null)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold">Address</h3>
                  <p>{selectedStore.address}</p>
                  <p>{selectedStore.city}</p>
                </div>
                
                <div>
                  <h3 className="font-semibold">Hours</h3>
                  <p>{selectedStore.hours}</p>
                </div>
                
                <div>
                  <h3 className="font-semibold">Contact</h3>
                  <a 
                    href={`tel:${selectedStore.phone}`}
                    className="flex items-center text-blue-600 hover:text-blue-800"
                  >
                    <Phone className="w-4 h-4 mr-2" />
                    {selectedStore.phone}
                  </a>
                </div>
                
                <div className="pt-4 border-t">
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={() => {
                      // Open directions in new tab
                      const url = `https://www.openstreetmap.org/directions?engine=osrm_car&route=${userLocation?.lat}%2C${userLocation?.lng}%3B${selectedStore.position.lat}%2C${selectedStore.position.lng}`;
                      window.open(url, '_blank');
                    }}
                  >
                    <ArrowRight className="w-4 h-4 mr-2" />
                    Get Directions
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
