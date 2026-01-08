import React, { useState, useEffect } from 'react';
import { MapPin, Camera, Mic, Phone, CheckCircle, Shield, Users, AlertCircle } from 'lucide-react';

interface SOSActiveProps {
  onResolved: () => void;
}

export function SOSActive({ onResolved }: SOSActiveProps) {
  const [elapsedTime, setElapsedTime] = useState(0);
  const [showResolution, setShowResolution] = useState(false);
  const [pin, setPin] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      setElapsedTime((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleResolution = () => {
    if (pin.length === 4) {
      onResolved();
    } else {
      alert('Please enter your 4-digit PIN to confirm you are safe');
    }
  };

  if (showResolution) {
    return (
      <div className="min-h-screen bg-white px-6 py-8 flex items-center justify-center">
        <div className="max-w-md w-full">
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-12 h-12 text-green-600" />
            </div>
            <h2 className="mb-2 text-gray-900">Are you safe now?</h2>
            <p className="text-gray-600">Enter your PIN to confirm and end SOS session</p>
          </div>

          <div className="space-y-4">
            <input
              type="password"
              maxLength={4}
              value={pin}
              onChange={(e) => setPin(e.target.value)}
              placeholder="Enter 4-digit PIN"
              className="w-full px-4 py-4 border-2 border-gray-300 rounded-xl text-center text-2xl tracking-widest focus:outline-none focus:border-purple-600"
            />

            <button
              onClick={handleResolution}
              className="w-full bg-green-600 text-white py-4 rounded-xl hover:bg-green-700"
            >
              Yes, I'm Safe
            </button>

            <button
              onClick={() => setShowResolution(false)}
              className="w-full border-2 border-red-600 text-red-600 py-4 rounded-xl hover:bg-red-50"
            >
              Still Unsafe - Continue Tracking
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-red-600">
      {/* Header */}
      <div className="bg-red-700 px-6 py-6 text-white">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-white rounded-full animate-pulse" />
            <span className="text-sm">SOS ACTIVE</span>
          </div>
          <span className="text-sm">{formatTime(elapsedTime)}</span>
        </div>
        <h1 className="text-white">Help is on the way</h1>
        <p className="text-red-100 text-sm mt-1">Stay calm. We've alerted your contacts and authorities.</p>
      </div>

      {/* Live Streaming Indicators */}
      <div className="bg-white m-4 rounded-2xl p-6 space-y-4">
        <h3 className="text-gray-900 mb-4">Live Streaming</h3>
        
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
            <MapPin className="w-6 h-6 text-blue-600" />
          </div>
          <div className="flex-1">
            <div className="text-gray-900">Location Tracking</div>
            <div className="text-sm text-green-600 flex items-center gap-1">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              Broadcasting
            </div>
          </div>
          <CheckCircle className="w-5 h-5 text-green-600" />
        </div>

        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
            <Camera className="w-6 h-6 text-red-600" />
          </div>
          <div className="flex-1">
            <div className="text-gray-900">Video Recording</div>
            <div className="text-sm text-green-600 flex items-center gap-1">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              Recording
            </div>
          </div>
          <CheckCircle className="w-5 h-5 text-green-600" />
        </div>

        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
            <Mic className="w-6 h-6 text-purple-600" />
          </div>
          <div className="flex-1">
            <div className="text-gray-900">Audio Recording</div>
            <div className="text-sm text-green-600 flex items-center gap-1">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              Active
            </div>
          </div>
          <CheckCircle className="w-5 h-5 text-green-600" />
        </div>
      </div>

      {/* Alerts Sent */}
      <div className="bg-white m-4 rounded-2xl p-6">
        <h3 className="text-gray-900 mb-4">Alerts Sent To</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
            <div className="flex items-center gap-3">
              <Users className="w-5 h-5 text-green-600" />
              <span className="text-gray-900">Guardians (3)</span>
            </div>
            <CheckCircle className="w-5 h-5 text-green-600" />
          </div>
          
          <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
            <div className="flex items-center gap-3">
              <Shield className="w-5 h-5 text-green-600" />
              <span className="text-gray-900">Police</span>
            </div>
            <CheckCircle className="w-5 h-5 text-green-600" />
          </div>
          
          <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
            <div className="flex items-center gap-3">
              <Users className="w-5 h-5 text-green-600" />
              <span className="text-gray-900">Volunteers</span>
            </div>
            <CheckCircle className="w-5 h-5 text-green-600" />
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="px-4 space-y-3">
        <a
          href="tel:911"
          className="w-full bg-white text-red-600 border-2 border-red-600 py-4 rounded-xl hover:bg-red-50 transition-colors flex items-center justify-center gap-2"
        >
          <Phone className="w-5 h-5" />
          Call Police (911)
        </a>

        <button className="w-full bg-white text-purple-600 border-2 border-purple-600 py-4 rounded-xl hover:bg-purple-50 transition-colors flex items-center justify-center gap-2">
          <Phone className="w-5 h-5" />
          Call Trusted Contact
        </button>

        <button
          onClick={() => setShowResolution(true)}
          className="w-full bg-gray-900 text-white py-4 rounded-xl hover:bg-gray-800 transition-colors"
        >
          I'm Safe (Requires PIN)
        </button>
      </div>

      {/* Status Footer */}
      <div className="px-4 py-6">
        <div className="bg-white/10 backdrop-blur-sm text-white p-4 rounded-xl flex items-center gap-3">
          <AlertCircle className="w-5 h-5" />
          <div className="text-sm">
            <div>Nearest volunteer: <strong>3 minutes away</strong></div>
            <div className="text-red-100 text-xs mt-1">Patrol car dispatched to your location</div>
          </div>
        </div>
      </div>
    </div>
  );
}
