import React, { useState, useEffect } from 'react';
import { Shield, Bell, Settings, Phone, Users, Timer, Navigation, Home, Map, UserCircle, Video, Mic, AlertCircle, TrendingUp, Clock, MessageCircle } from 'lucide-react';
import { Screen } from '../App';
import { useUser } from '../contexts/UserContext';

interface HomeDashboardProps {
  onNavigate: (screen: Screen) => void;
  onSOSTrigger: () => void;
}

export function HomeDashboard({ onNavigate, onSOSTrigger }: HomeDashboardProps) {
  const { userData } = useUser();
  const [sosCountdown, setSOSCountdown] = useState<number | null>(null);
  const [aiMonitoring, setAIMonitoring] = useState(true);
  const [fakeCallActive, setFakeCallActive] = useState(false);
  const [safetyTimerActive, setSafetyTimerActive] = useState(false);
  const [timerMinutes, setTimerMinutes] = useState(30);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleSOSPress = () => {
    let count = 3;
    setSOSCountdown(count);
    
    const interval = setInterval(() => {
      count--;
      if (count <= 0) {
        clearInterval(interval);
        setSOSCountdown(null);
        onSOSTrigger();
      } else {
        setSOSCountdown(count);
      }
    }, 1000);
  };

  const handleCancelSOS = () => {
    setSOSCountdown(null);
  };

  const handleFakeCall = () => {
    setFakeCallActive(true);
    // Simulate incoming call screen
    setTimeout(() => {
      setFakeCallActive(false);
    }, 5000);
  };

  const handleSafetyTimer = () => {
    if (!safetyTimerActive) {
      setSafetyTimerActive(true);
      // In a real app, this would set a timer that alerts contacts if not disabled
      alert(`Safety timer set for ${timerMinutes} minutes. Your trusted contacts will be notified if you don't check in.`);
    } else {
      setSafetyTimerActive(false);
      alert('Safety timer cancelled');
    }
  };

  const quickActions = [
    { 
      icon: Users, 
      label: 'Walk With Me', 
      color: 'bg-blue-500',
      action: () => alert('Finding nearby volunteers to walk with you...'),
    },
    { 
      icon: Phone, 
      label: 'Fake Call', 
      color: 'bg-green-500',
      action: handleFakeCall,
    },
    { 
      icon: Timer, 
      label: safetyTimerActive ? 'Timer Active' : 'Safety Timer', 
      color: safetyTimerActive ? 'bg-orange-600' : 'bg-orange-500',
      action: handleSafetyTimer,
    },
    { 
      icon: Navigation, 
      label: 'Safe Route', 
      color: 'bg-purple-500',
      action: () => onNavigate('map'),
    },
  ];

  const getGreeting = () => {
    const hour = currentTime.getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 17) return 'Good Afternoon';
    return 'Good Evening';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 pb-20">
      {/* Fake Call Overlay */}
      {fakeCallActive && (
        <div className="fixed inset-0 bg-black z-50 flex flex-col items-center justify-center">
          <div className="w-32 h-32 bg-purple-600 rounded-full mb-6 flex items-center justify-center">
            <Phone className="w-16 h-16 text-white" />
          </div>
          <div className="text-white text-2xl mb-2">Mom Calling...</div>
          <div className="text-gray-400 mb-8">Mobile</div>
          <div className="flex gap-8">
            <button 
              onClick={() => setFakeCallActive(false)}
              className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center"
            >
              <Phone className="w-8 h-8 text-white rotate-135" />
            </button>
            <button 
              onClick={() => setFakeCallActive(false)}
              className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center"
            >
              <Phone className="w-8 h-8 text-white" />
            </button>
          </div>
        </div>
      )}

      {/* Top Bar */}
      <div className="bg-white shadow-sm px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Shield className="w-6 h-6 text-purple-600" />
            <span className="text-gray-900">SafeSpace</span>
          </div>
          
          <div className="flex items-center gap-2">
            <span className="text-sm text-green-600 flex items-center gap-1">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              {aiMonitoring ? 'Protected' : 'Safe Mode'}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button 
              onClick={() => onNavigate('notifications')}
              className="relative text-gray-600 hover:text-gray-900"
            >
              <Bell className="w-6 h-6" />
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-white text-xs flex items-center justify-center">
                2
              </span>
            </button>
            <button 
              onClick={() => onNavigate('profile')}
              className="text-gray-600 hover:text-gray-900"
            >
              <Settings className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-6 py-8">
        {/* Greeting */}
        <div className="mb-8">
          <h1 className="mb-2 text-gray-900">{getGreeting()}, {userData.name.split(' ')[0]}</h1>
          <p className="text-gray-600">We're here to protect you 24/7</p>
          <div className="mt-2 flex items-center gap-2 text-sm text-gray-500">
            <Clock className="w-4 h-4" />
            <span>{currentTime.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}</span>
            <span className="mx-2">•</span>
            <span>{userData.city}</span>
          </div>
        </div>

        {/* SOS Button */}
        <div className="mb-8 flex flex-col items-center">
          {sosCountdown !== null ? (
            <div className="relative">
              <div className="w-64 h-64 bg-gradient-to-br from-red-500 to-red-700 rounded-full flex items-center justify-center shadow-2xl animate-pulse">
                <div className="text-center text-white">
                  <div className="text-6xl mb-2">{sosCountdown}</div>
                  <div className="text-sm">Triggering SOS...</div>
                </div>
              </div>
              <button
                onClick={handleCancelSOS}
                className="absolute -bottom-16 left-1/2 -translate-x-1/2 bg-gray-900 text-white px-8 py-3 rounded-full hover:bg-gray-800"
              >
                ❌ Cancel
              </button>
            </div>
          ) : (
            <button
              onMouseDown={handleSOSPress}
              className="w-64 h-64 bg-gradient-to-br from-red-500 to-red-700 rounded-full flex items-center justify-center shadow-2xl hover:shadow-3xl active:scale-95 transition-all relative"
            >
              <div className="text-center text-white">
                <Shield className="w-20 h-20 mx-auto mb-3" />
                <div className="text-xl mb-1">HOLD FOR SOS</div>
                <div className="text-sm opacity-80">Emergency Alert</div>
              </div>
              <div className="absolute inset-0 rounded-full animate-ping opacity-20 bg-red-500" />
            </button>
          )}
          
          {sosCountdown === null && (
            <div className="mt-6 text-center">
              <p className="text-gray-600 text-sm mb-2">
                🤳 Shake phone 3 times to auto-alert
              </p>
              <p className="text-xs text-gray-500">
                Volume buttons 5 times also works
              </p>
            </div>
          )}
        </div>

        {/* Emergency Services - NEW */}
        <div className="mb-8">
          <h3 className="mb-4 text-gray-900">Emergency Services</h3>
          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={() => onNavigate('police-stations')}
              className="bg-gradient-to-br from-red-600 to-red-700 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all active:scale-95 text-white"
            >
              <div className="flex items-center justify-center mb-3">
                <Shield className="w-8 h-8" />
              </div>
              <div className="text-center">
                <div className="mb-1">Police Stations</div>
                <div className="text-xs opacity-80">Nearby help</div>
              </div>
            </button>
            
            <button
              onClick={() => onNavigate('chat')}
              className="bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all active:scale-95 text-white relative"
            >
              <div className="flex items-center justify-center mb-3">
                <MessageCircle className="w-8 h-8" />
              </div>
              <div className="text-center">
                <div className="mb-1">Safety Chat</div>
                <div className="text-xs opacity-80">Connect now</div>
              </div>
              <span className="absolute top-3 right-3 px-2 py-1 bg-green-500 text-white text-xs rounded-full">
                24 online
              </span>
            </button>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mb-8">
          <h3 className="mb-4 text-gray-900">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-4">
            {quickActions.map((action) => {
              const Icon = action.icon;
              return (
                <button
                  key={action.label}
                  onClick={action.action}
                  className="bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transition-all active:scale-95"
                >
                  <div className={`w-12 h-12 ${action.color} rounded-xl flex items-center justify-center mb-3`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-gray-900 text-sm">{action.label}</div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Safety Status */}
        <div className="bg-white rounded-2xl p-5 shadow-md mb-6">
          <h3 className="text-gray-900 mb-4 flex items-center gap-2">
            <Shield className="w-5 h-5 text-purple-600" />
            Safety Status
          </h3>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <div className="text-sm text-gray-900">AI Monitoring</div>
                  <div className="text-xs text-gray-500">Real-time threat detection</div>
                </div>
              </div>
              <button
                onClick={() => setAIMonitoring(!aiMonitoring)}
                className={`w-12 h-6 rounded-full transition-colors ${
                  aiMonitoring ? 'bg-green-500' : 'bg-gray-300'
                }`}
              >
                <div
                  className={`w-5 h-5 bg-white rounded-full shadow-md transition-transform ${
                    aiMonitoring ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Video className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <div className="text-sm text-gray-900">Live Streaming</div>
                  <div className="text-xs text-gray-500">Emergency recording ready</div>
                </div>
              </div>
              <div className="text-xs text-green-600 flex items-center gap-1">
                <span className="w-2 h-2 bg-green-500 rounded-full" />
                Ready
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Mic className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <div className="text-sm text-gray-900">Audio Recording</div>
                  <div className="text-xs text-gray-500">Background monitoring</div>
                </div>
              </div>
              <div className="text-xs text-green-600 flex items-center gap-1">
                <span className="w-2 h-2 bg-green-500 rounded-full" />
                Active
              </div>
            </div>
          </div>
        </div>

        {/* Location & Accuracy */}
        <div className="bg-white rounded-2xl p-4 shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-gray-700 text-sm">Location Tracking</span>
              <div className="text-xs text-gray-500 mt-1">
                📍 {userData.city}
              </div>
            </div>
            <span className="text-green-600 flex items-center gap-1 text-sm">
              <span className="w-2 h-2 bg-green-500 rounded-full" />
              ±8m Accuracy
            </span>
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-6 py-3 shadow-lg">
        <div className="flex items-center justify-around max-w-md mx-auto">
          <button
            onClick={() => onNavigate('home')}
            className="flex flex-col items-center gap-1 text-purple-600"
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