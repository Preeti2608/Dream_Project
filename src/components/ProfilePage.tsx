import React, { useState } from 'react';
import { Home, Users, Map, Shield, UserCircle, ChevronRight, Bell, Lock, MapPin, Mic, Camera, LogOut, Trash2, FileText, HeartHandshake, Phone, MessageCircle } from 'lucide-react';
import { Screen } from '../App';
import { useUser } from '../contexts/UserContext';

interface ProfilePageProps {
  onNavigate: (screen: Screen) => void;
}

export function ProfilePage({ onNavigate }: ProfilePageProps) {
  const { userData } = useUser();
  const [shareLocationSOS, setShareLocationSOS] = useState(true);
  const [autoRecordVideo, setAutoRecordVideo] = useState(true);
  const [shakeToTrigger, setShakeToTrigger] = useState(true);
  const [aiSensitivity, setAISensitivity] = useState(50);

  const settingsSections = [
    {
      title: 'Account',
      items: [
        { icon: UserCircle, label: 'Edit Profile', action: () => onNavigate('edit-profile') },
        { icon: Phone, label: 'Trusted Contacts', action: () => onNavigate('trusted-contacts'), badge: '3' },
      ],
    },
    {
      title: 'Safety & Support',
      items: [
        { icon: Shield, label: 'Police Stations', action: () => onNavigate('police-stations') },
        { icon: MessageCircle, label: 'Community Chat', action: () => onNavigate('chat'), badge: 'New' },
      ],
    },
    {
      title: 'Privacy & Safety',
      items: [
        { icon: Lock, label: 'Privacy Controls', action: () => onNavigate('privacy-controls') },
        { icon: MapPin, label: 'Location Settings', action: () => onNavigate('location-settings') },
      ],
    },
    {
      title: 'Support',
      items: [
        { icon: FileText, label: 'Incident History', action: () => onNavigate('incident-history') },
        { icon: HeartHandshake, label: 'Support & Resources', action: () => onNavigate('support-resources') },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 pb-20">
      {/* Header */}
      <div className="bg-gradient-to-br from-purple-600 to-pink-600 px-6 py-8 text-white">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center">
            <UserCircle className="w-12 h-12 text-purple-600" />
          </div>
          <div>
            <h1 className="text-white mb-1">{userData.name}</h1>
            <p className="text-purple-100 text-sm">{userData.email}</p>
            <p className="text-purple-100 text-sm">{userData.city}</p>
          </div>
        </div>
        
        <div className="grid grid-cols-3 gap-3 mt-6">
          <div className="bg-white/20 backdrop-blur-sm rounded-xl p-3 text-center">
            <div className="text-xl mb-1">24/7</div>
            <div className="text-xs text-purple-100">Protected</div>
          </div>
          <div className="bg-white/20 backdrop-blur-sm rounded-xl p-3 text-center">
            <div className="text-xl mb-1">3</div>
            <div className="text-xs text-purple-100">Guardians</div>
          </div>
          <div className="bg-white/20 backdrop-blur-sm rounded-xl p-3 text-center">
            <div className="text-xl mb-1">0</div>
            <div className="text-xs text-purple-100">Incidents</div>
          </div>
        </div>
      </div>

      <div className="px-6 py-6 space-y-6">
        {/* Quick Settings */}
        <div className="bg-white rounded-2xl shadow-md p-6">
          <h3 className="text-gray-900 mb-4">Quick Settings</h3>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-purple-600" />
                <span className="text-gray-700">Share location only during SOS</span>
              </div>
              <button
                onClick={() => setShareLocationSOS(!shareLocationSOS)}
                className={`w-12 h-6 rounded-full transition-colors ${
                  shareLocationSOS ? 'bg-purple-600' : 'bg-gray-300'
                }`}
              >
                <div
                  className={`w-5 h-5 bg-white rounded-full shadow-md transition-transform ${
                    shareLocationSOS ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Camera className="w-5 h-5 text-purple-600" />
                <span className="text-gray-700">Auto-record video</span>
              </div>
              <button
                onClick={() => setAutoRecordVideo(!autoRecordVideo)}
                className={`w-12 h-6 rounded-full transition-colors ${
                  autoRecordVideo ? 'bg-purple-600' : 'bg-gray-300'
                }`}
              >
                <div
                  className={`w-5 h-5 bg-white rounded-full shadow-md transition-transform ${
                    autoRecordVideo ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Shield className="w-5 h-5 text-purple-600" />
                <span className="text-gray-700">Shake to trigger SOS</span>
              </div>
              <button
                onClick={() => setShakeToTrigger(!shakeToTrigger)}
                className={`w-12 h-6 rounded-full transition-colors ${
                  shakeToTrigger ? 'bg-purple-600' : 'bg-gray-300'
                }`}
              >
                <div
                  className={`w-5 h-5 bg-white rounded-full shadow-md transition-transform ${
                    shakeToTrigger ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            <div className="pt-2">
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-700">AI Sensitivity</span>
                <span className="text-purple-600">{aiSensitivity}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={aiSensitivity}
                onChange={(e) => setAISensitivity(Number(e.target.value))}
                className="w-full accent-purple-600"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>Low</span>
                <span>High</span>
              </div>
            </div>
          </div>
        </div>

        {/* Settings Sections */}
        {settingsSections.map((section, idx) => (
          <div key={idx} className="bg-white rounded-2xl shadow-md overflow-hidden">
            <div className="px-6 py-3 bg-gray-50 border-b border-gray-200">
              <h3 className="text-gray-900">{section.title}</h3>
            </div>
            <div className="divide-y divide-gray-200">
              {section.items.map((item, itemIdx) => {
                const Icon = item.icon;
                return (
                  <button
                    key={itemIdx}
                    onClick={item.action}
                    className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <Icon className="w-5 h-5 text-gray-600" />
                      <span className="text-gray-700">{item.label}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      {item.badge && (
                        <span className="px-2 py-1 bg-purple-100 text-purple-600 text-xs rounded-full">
                          {item.badge}
                        </span>
                      )}
                      <ChevronRight className="w-5 h-5 text-gray-400" />
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        ))}

        {/* Emergency Contacts */}
        <div className="bg-red-50 border border-red-200 rounded-2xl p-6">
          <h3 className="text-gray-900 mb-3">Emergency Contacts</h3>
          <div className="space-y-2 text-sm text-gray-700">
            <div className="flex items-center justify-between">
              <span>Police Emergency</span>
              <a href="tel:100" className="text-red-600 hover:text-red-700">100</a>
            </div>
            <div className="flex items-center justify-between">
              <span>Women Helpline</span>
              <a href="tel:1091" className="text-red-600 hover:text-red-700">1091</a>
            </div>
          </div>
        </div>

        {/* Danger Zone */}
        <div className="bg-white rounded-2xl shadow-md overflow-hidden">
          <div className="px-6 py-3 bg-red-50 border-b border-red-200">
            <h3 className="text-red-600">Danger Zone</h3>
          </div>
          <div className="divide-y divide-gray-200">
            <button className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors">
              <div className="flex items-center gap-3">
                <Trash2 className="w-5 h-5 text-red-600" />
                <span className="text-gray-700">Delete All Data</span>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </button>
            <button className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors">
              <div className="flex items-center gap-3">
                <LogOut className="w-5 h-5 text-red-600" />
                <span className="text-gray-700">Log Out</span>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </button>
          </div>
        </div>

        {/* App Info */}
        <div className="text-center text-sm text-gray-500 py-4">
          SafeSpace v1.0.0
          <div className="mt-1">© 2025 SafeSpace. All rights reserved.</div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-6 py-3 shadow-lg">
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
          <button
            onClick={() => onNavigate('map')}
            className="flex flex-col items-center gap-1 text-gray-500 hover:text-gray-900"
          >
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
          <button className="flex flex-col items-center gap-1 text-purple-600">
            <UserCircle className="w-6 h-6" />
            <span className="text-xs">Profile</span>
          </button>
        </div>
      </div>
    </div>
  );
}