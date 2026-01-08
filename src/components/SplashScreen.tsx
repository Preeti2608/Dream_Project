import React from 'react';
import { Shield } from 'lucide-react';

export function SplashScreen() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-700 to-pink-600 flex items-center justify-center animate-fade-in">
      <div className="text-center text-white px-8">
        <div className="mb-8 flex justify-center">
          <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-2xl">
            <Shield className="w-14 h-14 text-purple-700" />
          </div>
        </div>
        
        <h1 className="mb-4 text-white">SafeSpace</h1>
        
        <p className="text-xl mb-2 text-purple-100">
          Safe. Connected. Protected.
        </p>
        
        <p className="text-sm text-purple-200 opacity-80">
          Powered by AI & Community Support
        </p>
      </div>
    </div>
  );
}
