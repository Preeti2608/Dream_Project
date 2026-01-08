import React, { useState } from 'react';
import { ArrowLeft, Phone, MapPin, Navigation, Shield, Clock, Star } from 'lucide-react';
import { Screen } from '../App';

interface PoliceStationsProps {
  onNavigate: (screen: Screen) => void;
}

const policeStations = [
  {
    id: 1,
    name: 'Bandra Police Station',
    address: 'Hill Road, Bandra West, Mumbai - 400050',
    phone: '022-26420111',
    distance: '0.8 km',
    rating: 4.5,
    open24x7: true,
    lat: 19.0680,
    lng: 72.8290,
  },
  {
    id: 2,
    name: 'Khar Police Station',
    address: 'Linking Road, Khar West, Mumbai - 400052',
    phone: '022-26482222',
    distance: '1.2 km',
    rating: 4.3,
    open24x7: true,
    lat: 19.0738,
    lng: 72.8351,
  },
  {
    id: 3,
    name: 'Santacruz Police Station',
    address: 'SV Road, Santacruz West, Mumbai - 400054',
    phone: '022-26603333',
    distance: '2.1 km',
    rating: 4.4,
    open24x7: true,
    lat: 19.0825,
    lng: 72.8367,
  },
];

const emergencyNumbers = [
  { name: 'Police Emergency', number: '100', icon: '🚓' },
  { name: 'Women Helpline', number: '1091', icon: '👮‍♀️' },
  { name: 'Women Helpline (Domestic Abuse)', number: '181', icon: '🛡️' },
  { name: 'Ambulance', number: '108', icon: '🚑' },
  { name: 'Fire Brigade', number: '101', icon: '🚒' },
];

export function PoliceStations({ onNavigate }: PoliceStationsProps) {
  const [selectedStation, setSelectedStation] = useState<typeof policeStations[0] | null>(null);

  const handleCall = (phone: string) => {
    window.location.href = `tel:${phone}`;
  };

  const handleGetDirections = (lat: number, lng: number) => {
    window.open(`https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}&travelmode=driving`, '_blank');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 pb-6">
      {/* Header */}
      <div className="bg-white shadow-sm px-6 py-4 sticky top-0 z-10">
        <div className="flex items-center gap-4">
          <button
            onClick={() => onNavigate('profile')}
            className="text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div>
            <h1 className="text-gray-900">Police Stations</h1>
            <p className="text-sm text-gray-600">Nearby police stations & emergency contacts</p>
          </div>
        </div>
      </div>

      <div className="px-6 py-6 space-y-6">
        {/* Emergency Numbers */}
        <div className="bg-white rounded-2xl p-5 shadow-md">
          <h2 className="text-gray-900 mb-4 flex items-center gap-2">
            <Shield className="w-5 h-5 text-red-600" />
            Emergency Numbers
          </h2>
          <div className="space-y-2">
            {emergencyNumbers.map((emergency) => (
              <button
                key={emergency.number}
                onClick={() => handleCall(emergency.number)}
                className="w-full bg-red-50 hover:bg-red-100 border border-red-200 rounded-xl p-4 flex items-center justify-between transition-colors"
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{emergency.icon}</span>
                  <div className="text-left">
                    <div className="text-gray-900 text-sm">{emergency.name}</div>
                    <div className="text-red-600">{emergency.number}</div>
                  </div>
                </div>
                <Phone className="w-5 h-5 text-red-600" />
              </button>
            ))}
          </div>
        </div>

        {/* Quick Call Button */}
        <button
          onClick={() => handleCall('100')}
          className="w-full bg-gradient-to-r from-red-600 to-red-700 text-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all"
        >
          <div className="flex items-center justify-center gap-3 mb-2">
            <Phone className="w-8 h-8" />
            <span className="text-2xl">Call Police (100)</span>
          </div>
          <p className="text-red-100 text-sm">Tap to call emergency services instantly</p>
        </button>

        {/* Nearby Police Stations */}
        <div>
          <h2 className="text-gray-900 mb-4">Nearby Police Stations</h2>
          <div className="space-y-4">
            {policeStations.map((station) => (
              <div key={station.id} className="bg-white rounded-2xl p-5 shadow-md">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h3 className="text-gray-900 mb-1">{station.name}</h3>
                    <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                      <MapPin className="w-4 h-4" />
                      <span>{station.distance} away</span>
                    </div>
                    <p className="text-sm text-gray-600">{station.address}</p>
                  </div>
                  {station.open24x7 && (
                    <span className="px-3 py-1 bg-green-100 text-green-600 text-xs rounded-full whitespace-nowrap">
                      24x7 Open
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
                  <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                  <span>{station.rating} Rating</span>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => handleCall(station.phone)}
                    className="flex-1 bg-green-600 text-white py-3 rounded-xl hover:bg-green-700 flex items-center justify-center gap-2"
                  >
                    <Phone className="w-4 h-4" />
                    Call
                  </button>
                  <button
                    onClick={() => handleGetDirections(station.lat, station.lng)}
                    className="flex-1 bg-purple-600 text-white py-3 rounded-xl hover:bg-purple-700 flex items-center justify-center gap-2"
                  >
                    <Navigation className="w-4 h-4" />
                    Directions
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Safety Tips */}
        <div className="bg-blue-50 border border-blue-200 rounded-2xl p-5">
          <h3 className="text-blue-900 mb-3">📱 Safety Tips</h3>
          <ul className="text-sm text-blue-700 space-y-2">
            <li>• Save emergency numbers on speed dial</li>
            <li>• Always note down the nearest police station when traveling</li>
            <li>• Share your location with trusted contacts in emergency</li>
            <li>• Keep your phone charged at all times</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
