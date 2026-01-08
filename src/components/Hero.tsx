import React, { useState } from 'react';
import { Shield, Phone, MapPin, AlertCircle } from 'lucide-react';

export function Hero() {
  const [emergencyActivated, setEmergencyActivated] = useState(false);

  const handleEmergencyClick = () => {
    setEmergencyActivated(true);
    // Simulate emergency action
    setTimeout(() => {
      alert('Emergency services contacted! Stay safe.');
      setEmergencyActivated(false);
    }, 1000);
  };

  return (
    <div className="relative bg-gradient-to-br from-purple-50 to-pink-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="flex items-center gap-2 mb-6">
              <Shield className="w-8 h-8 text-purple-600" />
              <span className="text-purple-600">SafeSpace</span>
            </div>
            <h1 className="mb-6 text-gray-900">
              Your Safety, Our Priority
            </h1>
            <p className="text-gray-600 mb-8">
              A comprehensive platform dedicated to women's safety. Access emergency services, 
              safety tips, and support resources whenever you need them.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={handleEmergencyClick}
                disabled={emergencyActivated}
                className={`px-8 py-4 rounded-lg transition-all ${
                  emergencyActivated
                    ? 'bg-red-700 scale-95'
                    : 'bg-red-600 hover:bg-red-700'
                } text-white flex items-center justify-center gap-2 shadow-lg`}
              >
                <AlertCircle className="w-5 h-5" />
                {emergencyActivated ? 'Contacting...' : 'Emergency SOS'}
              </button>
              
              <a
                href="tel:911"
                className="px-8 py-4 bg-white border-2 border-purple-600 text-purple-600 rounded-lg hover:bg-purple-50 transition-colors flex items-center justify-center gap-2"
              >
                <Phone className="w-5 h-5" />
                Call Emergency
              </a>
            </div>

            <div className="mt-8 grid grid-cols-3 gap-4">
              <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                <div className="text-purple-600 mb-1">24/7</div>
                <div className="text-gray-600 text-sm">Support</div>
              </div>
              <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                <div className="text-purple-600 mb-1">100%</div>
                <div className="text-gray-600 text-sm">Confidential</div>
              </div>
              <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                <div className="text-purple-600 mb-1">Free</div>
                <div className="text-gray-600 text-sm">Resources</div>
              </div>
            </div>
          </div>

          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1765553397415-4e2be21c9a99?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b21lbiUyMGVtcG93ZXJtZW50JTIwc2FmZXR5fGVufDF8fHx8MTc2NjU5NDg3NXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
              alt="Women's safety and empowerment"
              className="rounded-2xl shadow-2xl w-full h-[500px] object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
