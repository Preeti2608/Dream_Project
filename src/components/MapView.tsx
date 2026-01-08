import React, { useState } from 'react';
import { Home, Users, Map, Shield, UserCircle, MapPin, AlertTriangle, Navigation, X, Layers, Search, Phone, Info, ChevronRight } from 'lucide-react';
import { Screen } from '../App';

interface MapViewProps {
  onNavigate: (screen: Screen) => void;
}

interface DangerZone {
  id: number;
  x: number;
  y: number;
  type: 'high' | 'medium' | 'safe';
  label: string;
  reports: number;
}

interface Responder {
  id: number;
  x: number;
  y: number;
  type: 'volunteer' | 'police';
  label: string;
  distance: string;
  eta?: string;
  phone?: string;
  lat: number;
  lng: number;
}

interface Location {
  id: number;
  name: string;
  area: string;
  lat: number;
  lng: number;
  category: 'landmark' | 'station' | 'hospital' | 'police' | 'mall' | 'restaurant';
}

const popularLocations: Location[] = [
  // Landmarks
  { id: 1, name: 'Gateway of India', area: 'Colaba, Mumbai', lat: 18.9220, lng: 72.8347, category: 'landmark' },
  { id: 2, name: 'Marine Drive', area: 'South Mumbai', lat: 18.9432, lng: 72.8236, category: 'landmark' },
  { id: 3, name: 'Bandra-Worli Sea Link', area: 'Bandra West', lat: 19.0330, lng: 72.8169, category: 'landmark' },
  { id: 4, name: 'Siddhivinayak Temple', area: 'Prabhadevi', lat: 19.0176, lng: 72.8305, category: 'landmark' },
  { id: 5, name: 'Haji Ali Dargah', area: 'Mahalaxmi', lat: 18.9826, lng: 72.8089, category: 'landmark' },
  
  // Railway Stations
  { id: 6, name: 'Bandra Station', area: 'Bandra West', lat: 19.0544, lng: 72.8406, category: 'station' },
  { id: 7, name: 'Andheri Station', area: 'Andheri West', lat: 19.1197, lng: 72.8464, category: 'station' },
  { id: 8, name: 'Dadar Station', area: 'Dadar', lat: 19.0185, lng: 72.8433, category: 'station' },
  { id: 9, name: 'Churchgate Station', area: 'Churchgate', lat: 18.9352, lng: 72.8268, category: 'station' },
  { id: 10, name: 'CST Station', area: 'Fort', lat: 18.9398, lng: 72.8355, category: 'station' },
  
  // Hospitals
  { id: 11, name: 'Lilavati Hospital', area: 'Bandra West', lat: 19.0564, lng: 72.8286, category: 'hospital' },
  { id: 12, name: 'Hinduja Hospital', area: 'Mahim', lat: 19.0388, lng: 72.8396, category: 'hospital' },
  { id: 13, name: 'KEM Hospital', area: 'Parel', lat: 19.0040, lng: 72.8414, category: 'hospital' },
  
  // Police Stations
  { id: 14, name: 'Bandra Police Station', area: 'Bandra West', lat: 19.0680, lng: 72.8290, category: 'police' },
  { id: 15, name: 'Andheri Police Station', area: 'Andheri West', lat: 19.1136, lng: 72.8697, category: 'police' },
  { id: 16, name: 'Khar Police Station', area: 'Khar West', lat: 19.0728, lng: 72.8345, category: 'police' },
  
  // Malls
  { id: 17, name: 'Phoenix Marketcity', area: 'Kurla', lat: 19.0880, lng: 72.8915, category: 'mall' },
  { id: 18, name: 'Inorbit Mall', area: 'Malad', lat: 19.1761, lng: 72.8347, category: 'mall' },
  { id: 19, name: 'R City Mall', area: 'Ghatkopar', lat: 19.0868, lng: 72.9081, category: 'mall' },
  { id: 20, name: 'Palladium Mall', area: 'Lower Parel', lat: 19.0011, lng: 72.8297, category: 'mall' },
  
  // Popular Areas
  { id: 21, name: 'Linking Road', area: 'Bandra West', lat: 19.0545, lng: 72.8278, category: 'landmark' },
  { id: 22, name: 'Carter Road', area: 'Bandra West', lat: 19.0566, lng: 72.8200, category: 'landmark' },
  { id: 23, name: 'Hill Road', area: 'Bandra West', lat: 19.0580, lng: 72.8270, category: 'landmark' },
  { id: 24, name: 'Juhu Beach', area: 'Juhu', lat: 19.0990, lng: 72.8265, category: 'landmark' },
  { id: 25, name: 'Colaba Causeway', area: 'Colaba', lat: 18.9067, lng: 72.8147, category: 'landmark' },
];

const dangerZones: DangerZone[] = [
  { id: 1, x: 35, y: 45, type: 'high', label: 'Linking Road - Late Night Risk', reports: 12 },
  { id: 2, x: 28, y: 55, type: 'medium', label: 'Carter Road - Moderate', reports: 7 },
  { id: 3, x: 50, y: 35, type: 'safe', label: 'Hill Road - Well Lit', reports: 0 },
  { id: 4, x: 60, y: 65, type: 'high', label: 'SV Road Junction - High Risk', reports: 15 },
];

const responders: Responder[] = [
  { id: 1, x: 40, y: 50, type: 'volunteer', label: 'Volunteer - Rajesh K.', distance: '0.5 km', phone: '+91 98765 43214', lat: 19.0620, lng: 72.8310 },
  { id: 2, x: 55, y: 40, type: 'police', label: 'Bandra Police Station', distance: '0.8 km', eta: '3 min', phone: '100', lat: 19.0680, lng: 72.8290 },
  { id: 3, x: 25, y: 60, type: 'volunteer', label: 'Volunteer - Priya M.', distance: '0.7 km', phone: '+91 98765 43215', lat: 19.0580, lng: 72.8380 },
];

export function MapView({ onNavigate }: MapViewProps) {
  const [showLegend, setShowLegend] = useState(true);
  const [mapLayer, setMapLayer] = useState<'street' | 'satellite'>('street');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMarker, setSelectedMarker] = useState<DangerZone | Responder | Location | null>(null);
  const [showSearchResults, setShowSearchResults] = useState(false);

  const handleGetDirections = (lat: number, lng: number) => {
    window.open(`https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}&travelmode=walking`, '_blank');
  };

  const handleOpenLocation = (lat: number, lng: number, name: string) => {
    // Open Google Maps with the location
    window.open(`https://www.google.com/maps/search/?api=1&query=${lat},${lng}`, '_blank');
    setSearchQuery('');
    setShowSearchResults(false);
  };

  const filteredLocations = popularLocations.filter((location) => {
    const query = searchQuery.toLowerCase();
    return (
      location.name.toLowerCase().includes(query) ||
      location.area.toLowerCase().includes(query)
    );
  });

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'landmark': return '🏛️';
      case 'station': return '🚉';
      case 'hospital': return '🏥';
      case 'police': return '👮';
      case 'mall': return '🛍️';
      case 'restaurant': return '🍽️';
      default: return '📍';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'landmark': return 'text-purple-600';
      case 'station': return 'text-blue-600';
      case 'hospital': return 'text-red-600';
      case 'police': return 'text-blue-700';
      case 'mall': return 'text-pink-600';
      case 'restaurant': return 'text-orange-600';
      default: return 'text-gray-600';
    }
  };

  const isDangerZone = (marker: any): marker is DangerZone => {
    return 'type' in marker && (marker.type === 'high' || marker.type === 'medium' || marker.type === 'safe');
  };

  const isResponder = (marker: any): marker is Responder => {
    return 'type' in marker && (marker.type === 'volunteer' || marker.type === 'police');
  };

  const isLocation = (marker: any): marker is Location => {
    return 'category' in marker;
  };

  return (
    <div className="min-h-screen bg-white pb-20">
      {/* Header */}
      <div className="bg-white shadow-sm px-6 py-4">
        <h1 className="text-gray-900">Safety Map</h1>
        <p className="text-gray-600 text-sm">Real-time safety information for Mumbai</p>
      </div>

      {/* Search Bar */}
      <div className="px-6 py-3 bg-white border-b border-gray-200 relative">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 z-10" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setShowSearchResults(e.target.value.length > 0);
            }}
            onFocus={() => searchQuery.length > 0 && setShowSearchResults(true)}
            placeholder="Search location in Mumbai..."
            className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-600"
          />
          {searchQuery && (
            <button
              onClick={() => {
                setSearchQuery('');
                setShowSearchResults(false);
              }}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Search Results Dropdown */}
        {showSearchResults && filteredLocations.length > 0 && (
          <div className="absolute top-full left-6 right-6 mt-2 bg-white rounded-2xl shadow-2xl border border-gray-200 max-h-[60vh] overflow-y-auto z-50">
            <div className="p-2">
              <div className="px-3 py-2 text-xs text-gray-500">
                {filteredLocations.length} {filteredLocations.length === 1 ? 'result' : 'results'}
              </div>
              {filteredLocations.map((location) => (
                <button
                  key={location.id}
                  onClick={() => handleOpenLocation(location.lat, location.lng, location.name)}
                  className="w-full flex items-center gap-3 px-3 py-3 hover:bg-purple-50 rounded-xl transition-colors text-left"
                >
                  <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-xl">{getCategoryIcon(location.category)}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-gray-900 truncate">{location.name}</div>
                    <div className="text-xs text-gray-500 truncate">{location.area}</div>
                  </div>
                  <div className={`text-xs px-2 py-1 rounded-full ${
                    location.category === 'police' ? 'bg-blue-100 text-blue-700' :
                    location.category === 'hospital' ? 'bg-red-100 text-red-700' :
                    location.category === 'station' ? 'bg-blue-100 text-blue-700' :
                    location.category === 'mall' ? 'bg-pink-100 text-pink-700' :
                    'bg-purple-100 text-purple-700'
                  }`}>
                    {location.category}
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {showSearchResults && searchQuery && filteredLocations.length === 0 && (
          <div className="absolute top-full left-6 right-6 mt-2 bg-white rounded-2xl shadow-2xl border border-gray-200 z-50 p-6 text-center">
            <div className="text-gray-400 mb-2">
              <Search className="w-12 h-12 mx-auto mb-3" />
            </div>
            <p className="text-gray-600">No locations found</p>
            <p className="text-xs text-gray-500 mt-1">Try searching for landmarks, stations, or areas in Mumbai</p>
          </div>
        )}
      </div>

      {/* Map Container */}
      <div className="relative h-[calc(100vh-260px)] overflow-hidden">
        {/* Map Background */}
        <div className={`w-full h-full ${mapLayer === 'street' ? 'bg-gray-100' : 'bg-gray-800'}`}>
          {/* Street Map Pattern */}
          {mapLayer === 'street' ? (
            <div className="w-full h-full relative">
              {/* Grid lines to simulate map */}
              <svg className="w-full h-full absolute inset-0" style={{ opacity: 0.3 }}>
                {/* Vertical lines */}
                {Array.from({ length: 10 }).map((_, i) => (
                  <line
                    key={`v-${i}`}
                    x1={`${i * 10}%`}
                    y1="0"
                    x2={`${i * 10}%`}
                    y2="100%"
                    stroke="#9ca3af"
                    strokeWidth="1"
                  />
                ))}
                {/* Horizontal lines */}
                {Array.from({ length: 10 }).map((_, i) => (
                  <line
                    key={`h-${i}`}
                    x1="0"
                    y1={`${i * 10}%`}
                    x2="100%"
                    y2={`${i * 10}%`}
                    stroke="#9ca3af"
                    strokeWidth="1"
                  />
                ))}
                {/* Main roads */}
                <line x1="30%" y1="0" x2="30%" y2="100%" stroke="#6b7280" strokeWidth="3" />
                <line x1="60%" y1="0" x2="60%" y2="100%" stroke="#6b7280" strokeWidth="3" />
                <line x1="0" y1="40%" x2="100%" y2="40%" stroke="#6b7280" strokeWidth="3" />
                <line x1="0" y1="70%" x2="100%" y2="70%" stroke="#6b7280" strokeWidth="3" />
              </svg>

              {/* Area labels */}
              <div className="absolute top-[15%] left-[15%] text-gray-600 text-xs">Bandra West</div>
              <div className="absolute top-[15%] right-[15%] text-gray-600 text-xs">Khar</div>
              <div className="absolute bottom-[15%] left-[15%] text-gray-600 text-xs">Bandra Station</div>
            </div>
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-gray-700 via-gray-800 to-gray-900" />
          )}

          {/* User Location */}
          <div 
            className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer z-10"
            style={{ left: '45%', top: '48%' }}
          >
            <div className="relative group">
              <div className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center shadow-lg border-3 border-white animate-pulse">
                <MapPin className="w-5 h-5 text-white" />
              </div>
              <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 hidden group-hover:block bg-white rounded-lg shadow-lg p-2 whitespace-nowrap text-xs">
                📍 Your Location - Bandra West
              </div>
            </div>
          </div>

          {/* Danger Zones */}
          {dangerZones.map((zone) => (
            <div 
              key={zone.id}
              className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer z-10"
              style={{ left: `${zone.x}%`, top: `${zone.y}%` }}
              onClick={() => setSelectedMarker(zone)}
            >
              {/* Zone Circle */}
              <div 
                className={`absolute inset-0 rounded-full ${
                  zone.type === 'high' ? 'bg-red-500' : zone.type === 'medium' ? 'bg-orange-400' : 'bg-green-500'
                }`}
                style={{
                  width: zone.type === 'high' ? '120px' : zone.type === 'medium' ? '100px' : '80px',
                  height: zone.type === 'high' ? '120px' : zone.type === 'medium' ? '100px' : '80px',
                  opacity: 0.15,
                  transform: 'translate(-50%, -50%)',
                }}
              />
              {/* Marker Icon */}
              <div className="relative group">
                <div className={`w-9 h-9 ${
                  zone.type === 'high' ? 'bg-red-500' : zone.type === 'medium' ? 'bg-orange-400' : 'bg-green-500'
                } rounded-full flex items-center justify-center shadow-lg border-3 border-white`}>
                  <span className="text-white text-lg">
                    {zone.type === 'high' ? '⚠️' : zone.type === 'medium' ? '⚡' : '✓'}
                  </span>
                </div>
                <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 hidden group-hover:block bg-white rounded-lg shadow-lg p-2 whitespace-nowrap text-xs">
                  {zone.label}
                </div>
              </div>
            </div>
          ))}

          {/* Responders */}
          {responders.map((responder) => (
            <div 
              key={responder.id}
              className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer z-10"
              style={{ left: `${responder.x}%`, top: `${responder.y}%` }}
              onClick={() => setSelectedMarker(responder)}
            >
              <div className="relative group">
                <div className={`w-9 h-9 ${
                  responder.type === 'volunteer' ? 'bg-purple-600' : 'bg-blue-600'
                } rounded-full flex items-center justify-center shadow-lg border-3 border-white`}>
                  <span className="text-white text-lg">
                    {responder.type === 'volunteer' ? '🛡️' : '👮'}
                  </span>
                </div>
                <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 hidden group-hover:block bg-white rounded-lg shadow-lg p-2 whitespace-nowrap text-xs">
                  {responder.label}
                </div>
              </div>
            </div>
          ))}

          {/* Popular Locations */}
          {popularLocations.map((location) => (
            <div 
              key={location.id}
              className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer z-10"
              style={{ left: `${location.x}%`, top: `${location.y}%` }}
              onClick={() => setSelectedMarker(location)}
            >
              <div className="relative group">
                <div className={`w-9 h-9 ${
                  location.category === 'landmark' ? 'bg-gray-500' : 
                  location.category === 'station' ? 'bg-gray-500' : 
                  location.category === 'hospital' ? 'bg-gray-500' : 
                  location.category === 'police' ? 'bg-gray-500' : 
                  location.category === 'mall' ? 'bg-gray-500' : 
                  location.category === 'restaurant' ? 'bg-gray-500' : 'bg-gray-500'
                } rounded-full flex items-center justify-center shadow-lg border-3 border-white`}>
                  <span className="text-white text-lg">
                    {location.category === 'landmark' ? '🏛️' : 
                    location.category === 'station' ? '🚉' : 
                    location.category === 'hospital' ? '🏥' : 
                    location.category === 'police' ? '👮' : 
                    location.category === 'mall' ? '🛍️' : 
                    location.category === 'restaurant' ? '🍽️' : '📍'}
                  </span>
                </div>
                <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 hidden group-hover:block bg-white rounded-lg shadow-lg p-2 whitespace-nowrap text-xs">
                  {location.name}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Map Controls */}
        <div className="absolute top-4 right-4 z-20 space-y-2">
          <button
            onClick={() => setMapLayer(mapLayer === 'street' ? 'satellite' : 'street')}
            className="bg-white rounded-lg shadow-lg p-3 hover:bg-gray-50 flex items-center gap-2"
          >
            <Layers className="w-5 h-5 text-gray-700" />
            <span className="text-sm text-gray-700">{mapLayer === 'street' ? 'Satellite' : 'Street'}</span>
          </button>
        </div>

        {/* Legend */}
        {showLegend && (
          <div className="absolute top-4 left-4 bg-white rounded-xl shadow-lg p-4 max-w-xs z-20">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-gray-900 text-sm">Map Legend</h3>
              <button onClick={() => setShowLegend(false)} className="text-gray-500">
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="space-y-2 text-xs">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-red-500 rounded-full" />
                <span className="text-gray-700">High Risk Zone</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-orange-400 rounded-full" />
                <span className="text-gray-700">Medium Risk</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded-full" />
                <span className="text-gray-700">Safe Zone</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="w-3 h-3 text-purple-600" />
                <span className="text-gray-700">Volunteer</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="w-3 h-3 text-blue-600" />
                <span className="text-gray-700">Police</span>
              </div>
            </div>
          </div>
        )}

        {!showLegend && (
          <button
            onClick={() => setShowLegend(true)}
            className="absolute top-4 left-4 bg-white rounded-lg shadow-lg px-4 py-2 text-xs text-purple-600 hover:bg-purple-50 z-20"
          >
            Show Legend
          </button>
        )}
      </div>

      {/* Marker Detail Panel */}
      {selectedMarker && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-end justify-center z-50">
          <div className="bg-white rounded-t-3xl w-full max-w-2xl p-6 animate-slide-up">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-gray-900">
                {isLocation(selectedMarker) ? selectedMarker.name : selectedMarker.label}
              </h2>
              <button onClick={() => setSelectedMarker(null)} className="text-gray-500">
                <X className="w-6 h-6" />
              </button>
            </div>

            {isDangerZone(selectedMarker) ? (
              <div>
                <div className="flex items-center gap-4 mb-4">
                  <span className={`px-3 py-1 rounded-full text-sm ${
                    selectedMarker.type === 'high' 
                      ? 'bg-red-100 text-red-600' 
                      : selectedMarker.type === 'medium'
                      ? 'bg-orange-100 text-orange-600'
                      : 'bg-green-100 text-green-600'
                  }`}>
                    {selectedMarker.type === 'high' ? 'High Risk' : selectedMarker.type === 'medium' ? 'Medium Risk' : 'Safe Zone'}
                  </span>
                  {selectedMarker.reports > 0 && (
                    <span className="text-sm text-gray-600">{selectedMarker.reports} reports</span>
                  )}
                </div>
                {selectedMarker.reports > 0 ? (
                  <p className="text-sm text-gray-600 mb-4">
                    ⚠️ Multiple safety incidents reported in this area. Exercise caution.
                  </p>
                ) : (
                  <p className="text-sm text-gray-600 mb-4">
                    ✓ This area is considered safe with good lighting and regular patrols.
                  </p>
                )}
                <button className="w-full bg-purple-600 text-white py-4 rounded-xl hover:bg-purple-700 flex items-center justify-center gap-2">
                  <Navigation className="w-5 h-5" />
                  Avoid This Area
                </button>
              </div>
            ) : isResponder(selectedMarker) ? (
              <div>
                <div className="space-y-3 mb-4">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <MapPin className="w-4 h-4" />
                    <span>{selectedMarker.distance} away</span>
                  </div>
                  {selectedMarker.eta && (
                    <div className="text-sm text-green-600">
                      🚓 ETA: {selectedMarker.eta}
                    </div>
                  )}
                </div>
                <div className="space-y-2">
                  <button
                    onClick={() => handleGetDirections(selectedMarker.lat, selectedMarker.lng)}
                    className="w-full bg-purple-600 text-white py-4 rounded-xl hover:bg-purple-700 flex items-center justify-center gap-2"
                  >
                    <Navigation className="w-5 h-5" />
                    Get Directions
                  </button>
                  {selectedMarker.phone && (
                    <a
                      href={`tel:${selectedMarker.phone}`}
                      className="w-full bg-green-600 text-white py-4 rounded-xl hover:bg-green-700 flex items-center justify-center gap-2 block"
                    >
                      <Phone className="w-5 h-5" />
                      Call {selectedMarker.type === 'police' ? 'Station' : 'Volunteer'}
                    </a>
                  )}
                </div>
              </div>
            ) : isLocation(selectedMarker) ? (
              <div>
                <div className="space-y-3 mb-4">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <span className="text-2xl">{getCategoryIcon(selectedMarker.category)}</span>
                    <span>{selectedMarker.area}</span>
                  </div>
                  <p className="text-sm text-gray-600">
                    Tap "Get Directions" to open Google Maps and navigate to {selectedMarker.name}.
                  </p>
                </div>
                <div className="space-y-2">
                  <button
                    onClick={() => handleGetDirections(selectedMarker.lat, selectedMarker.lng)}
                    className="w-full bg-purple-600 text-white py-4 rounded-xl hover:bg-purple-700 flex items-center justify-center gap-2"
                  >
                    <Navigation className="w-5 h-5" />
                    Get Directions
                  </button>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      )}

      {/* Quick Stats */}
      <div className="fixed bottom-24 left-0 right-0 px-6 z-10">
        <div className="bg-white rounded-2xl shadow-lg p-4 max-w-md mx-auto">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-xl text-red-600 mb-1">2</div>
              <div className="text-xs text-gray-600">High Risk</div>
            </div>
            <div>
              <div className="text-xl text-purple-600 mb-1">3</div>
              <div className="text-xs text-gray-600">Volunteers</div>
            </div>
            <div>
              <div className="text-xl text-blue-600 mb-1">1</div>
              <div className="text-xs text-gray-600">Police</div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-6 py-3 shadow-lg z-20">
        <div className="flex items-center justify-around max-w-md mx-auto">
          <button
            onClick={() => onNavigate('home')}
            className="flex flex-col items-center gap-1 text-gray-500 hover:text-gray-900"
          >
            <Home className="w-6 h-6" />
            <span className="text-xs">Home</span>
          </button>
          <button
            onClick={() => onNavigate('community')}
            className="flex flex-col items-center gap-1 text-gray-500 hover:text-gray-900"
          >
            <Users className="w-6 h-6" />
            <span className="text-xs">Community</span>
          </button>
          <button className="flex flex-col items-center gap-1 text-purple-600">
            <Map className="w-6 h-6" />
            <span className="text-xs">Map</span>
          </button>
          <button
            onClick={() => onNavigate('volunteers')}
            className="flex flex-col items-center gap-1 text-gray-500 hover:text-gray-900"
          >
            <Shield className="w-6 h-6" />
            <span className="text-xs">Volunteers</span>
          </button>
          <button
            onClick={() => onNavigate('profile')}
            className="flex flex-col items-center gap-1 text-gray-500 hover:text-gray-900"
          >
            <UserCircle className="w-6 h-6" />
            <span className="text-xs">Profile</span>
          </button>
        </div>
      </div>
    </div>
  );
}