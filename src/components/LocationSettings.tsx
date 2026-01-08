import React, { useState } from 'react';
import { ArrowLeft, MapPin, Navigation, Check, AlertCircle, RefreshCw } from 'lucide-react';
import { Screen } from '../App';

interface LocationSettingsProps {
  onNavigate: (screen: Screen) => void;
}

export function LocationSettings({ onNavigate }: LocationSettingsProps) {
  const [locationPermission, setLocationPermission] = useState<'always' | 'while-using' | 'denied'>('always');
  const [highAccuracy, setHighAccuracy] = useState(true);
  const [backgroundLocation, setBackgroundLocation] = useState(true);
  const [locationAccuracy, setLocationAccuracy] = useState('Good');

  const handleTestLocation = () => {
    alert('Testing location... Current accuracy: High (±5 meters)');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50">
      {/* Header */}
      <div className="bg-white shadow-sm px-6 py-4 sticky top-0 z-10">
        <div className="flex items-center gap-4 max-w-4xl mx-auto">
          <button
            onClick={() => onNavigate('profile')}
            className="text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-gray-900">Location Settings</h1>
        </div>
      </div>

      {/* Content */}
      <div className="px-6 py-8 max-w-4xl mx-auto space-y-6">
        {/* Current Status */}
        <div className="bg-white rounded-2xl shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-900">Current Status</h3>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span className="text-sm text-green-600">{locationAccuracy}</span>
            </div>
          </div>

          <div className="bg-gray-50 rounded-xl p-4 mb-4">
            <div className="flex items-center gap-3 mb-3">
              <MapPin className="w-5 h-5 text-purple-600" />
              <div>
                <div className="text-sm text-gray-600">Current Location</div>
                <div className="text-gray-900">Bandra West, Mumbai</div>
              </div>
            </div>
            <div className="text-xs text-gray-500">
              Lat: 19.0596 | Long: 72.8295 | Accuracy: ±8m
            </div>
          </div>

          <button
            onClick={handleTestLocation}
            className="w-full flex items-center justify-center gap-2 bg-purple-50 text-purple-600 py-3 rounded-xl hover:bg-purple-100 transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
            Test Location Accuracy
          </button>
        </div>

        {/* Permission Level */}
        <div className="bg-white rounded-2xl shadow-md p-6">
          <h3 className="text-gray-900 mb-4">Location Permission</h3>
          
          <div className="space-y-3">
            <button
              onClick={() => setLocationPermission('always')}
              className={`w-full p-4 rounded-xl border-2 transition-all text-left ${
                locationPermission === 'always'
                  ? 'border-purple-600 bg-purple-50'
                  : 'border-gray-200 bg-white hover:border-purple-300'
              }`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-gray-900 mb-1">Allow Always</div>
                  <div className="text-sm text-gray-600">Best protection - works in background</div>
                </div>
                {locationPermission === 'always' && (
                  <Check className="w-6 h-6 text-purple-600" />
                )}
              </div>
            </button>

            <button
              onClick={() => setLocationPermission('while-using')}
              className={`w-full p-4 rounded-xl border-2 transition-all text-left ${
                locationPermission === 'while-using'
                  ? 'border-purple-600 bg-purple-50'
                  : 'border-gray-200 bg-white hover:border-purple-300'
              }`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-gray-900 mb-1">While Using App</div>
                  <div className="text-sm text-gray-600">Limited - only when app is open</div>
                </div>
                {locationPermission === 'while-using' && (
                  <Check className="w-6 h-6 text-purple-600" />
                )}
              </div>
            </button>

            <button
              onClick={() => {
                setLocationPermission('denied');
                alert('⚠️ Warning: Location features will be severely limited. Emergency response may be delayed.');
              }}
              className={`w-full p-4 rounded-xl border-2 transition-all text-left ${
                locationPermission === 'denied'
                  ? 'border-red-600 bg-red-50'
                  : 'border-gray-200 bg-white hover:border-red-300'
              }`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-gray-900 mb-1">Deny</div>
                  <div className="text-sm text-red-600">Not recommended</div>
                </div>
                {locationPermission === 'denied' && (
                  <AlertCircle className="w-6 h-6 text-red-600" />
                )}
              </div>
            </button>
          </div>
        </div>

        {/* Advanced Settings */}
        <div className="bg-white rounded-2xl shadow-md p-6">
          <h3 className="text-gray-900 mb-4">Advanced Settings</h3>
          
          <div className="space-y-4">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="text-gray-900 mb-1">High accuracy mode</div>
                <div className="text-sm text-gray-600">Uses GPS, WiFi, and mobile networks</div>
              </div>
              <button
                onClick={() => setHighAccuracy(!highAccuracy)}
                className={`w-12 h-6 rounded-full transition-colors flex-shrink-0 ml-4 ${
                  highAccuracy ? 'bg-purple-600' : 'bg-gray-300'
                }`}
              >
                <div
                  className={`w-5 h-5 bg-white rounded-full shadow-md transition-transform ${
                    highAccuracy ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            <div className="flex items-start justify-between border-t border-gray-200 pt-4">
              <div className="flex-1">
                <div className="text-gray-900 mb-1">Background location</div>
                <div className="text-sm text-gray-600">Track location even when app is closed</div>
              </div>
              <button
                onClick={() => setBackgroundLocation(!backgroundLocation)}
                className={`w-12 h-6 rounded-full transition-colors flex-shrink-0 ml-4 ${
                  backgroundLocation ? 'bg-purple-600' : 'bg-gray-300'
                }`}
              >
                <div
                  className={`w-5 h-5 bg-white rounded-full shadow-md transition-transform ${
                    backgroundLocation ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          </div>
        </div>

        {/* Battery Impact */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-6">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-gray-900 mb-2">Battery Impact</h3>
              <p className="text-sm text-gray-700 mb-3">
                High accuracy and background location may increase battery usage. We've optimized the app to minimize impact.
              </p>
              <div className="flex items-center gap-2 text-sm">
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 bg-green-500 rounded-full" />
                  <span className="text-gray-700">Current: Low impact</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Location History */}
        <div className="bg-white rounded-2xl shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-900">Location History</h3>
            <button className="text-purple-600 hover:text-purple-700 text-sm">
              View All
            </button>
          </div>
          
          <div className="space-y-3">
            <div className="flex items-start gap-3 pb-3 border-b border-gray-200">
              <Navigation className="w-5 h-5 text-gray-400 mt-1" />
              <div className="flex-1">
                <div className="text-sm text-gray-900">Last SOS Location</div>
                <div className="text-xs text-gray-600">Sector 14 Park • Dec 28, 2024</div>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Navigation className="w-5 h-5 text-gray-400 mt-1" />
              <div className="flex-1">
                <div className="text-sm text-gray-900">Frequently Visited</div>
                <div className="text-xs text-gray-600">Home, Office, Gym</div>
              </div>
            </div>
          </div>
        </div>

        {/* Info */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
          <div className="flex items-start gap-2">
            <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <div className="text-sm text-gray-700">
              <p className="mb-2">
                Your location is only shared during active SOS emergencies with your trusted contacts and emergency services.
              </p>
              <p>
                We do not track or store your location history for any other purpose.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}