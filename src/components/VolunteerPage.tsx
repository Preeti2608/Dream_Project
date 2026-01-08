import React, { useState } from 'react';
import { Home, Users, Map, Shield, UserCircle, Phone, MessageCircle, Navigation, Star, Clock, Award, TrendingUp, X, Check, MapPin } from 'lucide-react';
import { Screen } from '../App';

interface VolunteerPageProps {
  onNavigate: (screen: Screen) => void;
}

interface Alert {
  id: number;
  user: string;
  distance: string;
  location: string;
  time: string;
  status?: string;
  eta?: string;
  phone?: string;
}

const initialIncomingAlerts: Alert[] = [
  {
    id: 1,
    user: 'User #4521',
    distance: '350m',
    location: 'Linking Road, Bandra',
    time: '2 min ago',
  },
  {
    id: 2,
    user: 'User #8934',
    distance: '1.2km',
    location: 'Carter Road',
    time: '5 min ago',
  },
];

const nearbyVolunteers = [
  {
    id: 1,
    name: 'Rajesh Kumar',
    distance: '0.5 km',
    rating: 4.8,
    responses: 32,
    status: 'available',
    phone: '+91 98765 43214',
  },
  {
    id: 2,
    name: 'Priya Malhotra',
    distance: '0.7 km',
    rating: 4.9,
    responses: 45,
    status: 'available',
    phone: '+91 98765 43215',
  },
  {
    id: 3,
    name: 'Arjun Singh',
    distance: '1.2 km',
    rating: 4.7,
    responses: 28,
    status: 'busy',
    phone: '+91 98765 43216',
  },
];

export function VolunteerPage({ onNavigate }: VolunteerPageProps) {
  const [isAvailable, setIsAvailable] = useState(false);
  const [incomingAlerts, setIncomingAlerts] = useState<Alert[]>(initialIncomingAlerts);
  const [acceptedAlerts, setAcceptedAlerts] = useState<Alert[]>([]);
  const [activeTab, setActiveTab] = useState<'volunteer' | 'find'>('volunteer');
  const [selectedAlert, setSelectedAlert] = useState<Alert | null>(null);
  const [showRegistration, setShowRegistration] = useState(false);
  const [regName, setRegName] = useState('');
  const [regPhone, setRegPhone] = useState('');
  const [regAddress, setRegAddress] = useState('');
  const [regEmergency, setRegEmergency] = useState('');

  const handleAcceptAlert = (alertItem: Alert) => {
    setAcceptedAlerts([...acceptedAlerts, { ...alertItem, status: 'En Route', eta: '3 min' }]);
    setIncomingAlerts(incomingAlerts.filter(a => a.id !== alertItem.id));
    setSelectedAlert(null);
    alert('Alert accepted! User has been notified.');
  };

  const handleDeclineAlert = (id: number) => {
    setIncomingAlerts(incomingAlerts.filter(a => a.id !== id));
    setSelectedAlert(null);
  };

  const handleCompleteAlert = (id: number) => {
    setAcceptedAlerts(acceptedAlerts.filter(a => a.id !== id));
    alert('Thank you for helping! Your response has been recorded.');
  };

  const handleRequestHelp = (volunteer: typeof nearbyVolunteers[0]) => {
    alert(`Sending help request to ${volunteer.name}...`);
  };

  const handleVolunteerRegistration = () => {
    if (!regName.trim() || !regPhone.trim() || !regAddress.trim() || !regEmergency.trim()) {
      alert('Please fill all fields');
      return;
    }
    alert(`Thank you for registering, ${regName}! 🙏\n\nYour application is being reviewed. You'll receive a confirmation call within 24 hours.\n\nNext Steps:\n✓ Background verification\n✓ Safety training session\n✓ Volunteer ID card\n\nWelcome to the SafeSpace community! 💜`);
    setShowRegistration(false);
    setRegName('');
    setRegPhone('');
    setRegAddress('');
    setRegEmergency('');
  };

  const renderVolunteerDashboard = () => (
    <>
      {/* Availability Toggle */}
      <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-gray-900 mb-1">Volunteer Status</h2>
            <p className="text-sm text-gray-600">
              {isAvailable ? 'You are currently available' : 'You are currently offline'}
            </p>
          </div>
          <button
            onClick={() => setIsAvailable(!isAvailable)}
            className={`w-20 h-10 rounded-full transition-colors ${
              isAvailable ? 'bg-green-500' : 'bg-gray-300'
            }`}
          >
            <div
              className={`w-8 h-8 bg-white rounded-full shadow-md transition-transform ${
                isAvailable ? 'translate-x-11' : 'translate-x-1'
              }`}
            />
          </button>
        </div>

        {isAvailable && (
          <div className="bg-green-50 border border-green-200 rounded-xl p-4">
            <div className="flex items-center gap-2 text-green-700">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span className="text-sm">You'll receive alerts from users nearby</span>
            </div>
          </div>
        )}

        {!isAvailable && (
          <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
            <p className="text-sm text-gray-600">
              Enable availability to start receiving help requests
            </p>
          </div>
        )}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded-xl p-4 text-center shadow-md">
          <div className="text-2xl text-purple-600 mb-1">24</div>
          <div className="text-xs text-gray-600">Responses</div>
        </div>
        <div className="bg-white rounded-xl p-4 text-center shadow-md">
          <div className="text-2xl text-green-600 mb-1">4.8</div>
          <div className="text-xs text-gray-600">Rating</div>
        </div>
        <div className="bg-white rounded-xl p-4 text-center shadow-md">
          <div className="text-2xl text-blue-600 mb-1">12</div>
          <div className="text-xs text-gray-600">This Month</div>
        </div>
      </div>

      {/* Achievements */}
      <div className="bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl p-6 mb-6 text-white">
        <div className="flex items-center gap-3 mb-3">
          <Award className="w-8 h-8" />
          <div>
            <h3 className="text-white mb-1">Community Hero</h3>
            <p className="text-purple-100 text-sm">You've helped 24 people!</p>
          </div>
        </div>
        <div className="bg-white bg-opacity-20 rounded-lg p-3">
          <div className="flex items-center justify-between text-sm mb-1">
            <span>Next milestone: 30 responses</span>
            <span>24/30</span>
          </div>
          <div className="w-full bg-white bg-opacity-30 rounded-full h-2">
            <div className="bg-white rounded-full h-2" style={{ width: '80%' }} />
          </div>
        </div>
      </div>

      {/* Incoming Alerts */}
      {isAvailable && incomingAlerts.length > 0 && (
        <div className="mb-6">
          <h3 className="text-gray-900 mb-4 flex items-center gap-2">
            <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
            Incoming Help Requests
          </h3>
          <div className="space-y-3">
            {incomingAlerts.map((alert) => (
              <div key={alert.id} className="bg-white rounded-2xl p-5 shadow-md border-2 border-red-200">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <div className="text-gray-900 mb-1">{alert.user}</div>
                    <div className="text-sm text-gray-600 flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      {alert.location}
                    </div>
                    <div className="text-xs text-gray-500 mt-1">{alert.time}</div>
                  </div>
                  <span className="px-3 py-1 bg-red-100 text-red-600 text-xs rounded-full">
                    {alert.distance}
                  </span>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => setSelectedAlert(alert)}
                    className="flex-1 bg-green-600 text-white py-3 rounded-xl hover:bg-green-700 flex items-center justify-center gap-2"
                  >
                    <Check className="w-4 h-4" />
                    Accept
                  </button>
                  <button
                    onClick={() => handleDeclineAlert(alert.id)}
                    className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-xl hover:bg-gray-300 flex items-center justify-center gap-2"
                  >
                    <X className="w-4 h-4" />
                    Decline
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Accepted Alerts */}
      {acceptedAlerts.length > 0 && (
        <div className="mb-6">
          <h3 className="text-gray-900 mb-4">Active Responses</h3>
          <div className="space-y-3">
            {acceptedAlerts.map((alert) => (
              <div key={alert.id} className="bg-white rounded-2xl p-5 shadow-md border-2 border-green-200">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="text-gray-900 mb-1">{alert.user}</div>
                    <div className="text-sm text-gray-600">{alert.location}</div>
                  </div>
                  <span className="px-3 py-1 bg-green-100 text-green-600 text-xs rounded-full">
                    {alert.status}
                  </span>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => onNavigate('map')}
                    className="flex-1 bg-purple-600 text-white py-3 rounded-xl hover:bg-purple-700 flex items-center justify-center gap-2"
                  >
                    <Navigation className="w-4 h-4" />
                    Navigate
                  </button>
                  <button
                    onClick={() => handleCompleteAlert(alert.id)}
                    className="flex-1 bg-green-600 text-white py-3 rounded-xl hover:bg-green-700"
                  >
                    Mark Complete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {isAvailable && incomingAlerts.length === 0 && acceptedAlerts.length === 0 && (
        <div className="text-center py-12 bg-white rounded-2xl shadow-md">
          <Shield className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-gray-900 mb-2">No active alerts</h3>
          <p className="text-gray-600 text-sm">You'll be notified when someone nearby needs help</p>
        </div>
      )}
    </>
  );

  const renderFindVolunteers = () => (
    <div className="space-y-4">
      <div className="bg-purple-100 border border-purple-200 rounded-2xl p-4 mb-4">
        <div className="flex items-center gap-2 text-purple-700 mb-2">
          <Users className="w-5 h-5" />
          <span className="text-sm">3 volunteers available near you</span>
        </div>
        <p className="text-xs text-purple-600">
          These volunteers are ready to help if you need assistance
        </p>
      </div>

      {nearbyVolunteers.map((volunteer) => (
        <div key={volunteer.id} className="bg-white rounded-2xl p-5 shadow-md">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white">
                {volunteer.name.split(' ').map(n => n[0]).join('')}
              </div>
              <div>
                <div className="text-gray-900 mb-1">{volunteer.name}</div>
                <div className="flex items-center gap-3 text-xs text-gray-600">
                  <span className="flex items-center gap-1">
                    <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                    {volunteer.rating}
                  </span>
                  <span>{volunteer.responses} responses</span>
                </div>
              </div>
            </div>
            <span className={`px-3 py-1 text-xs rounded-full ${
              volunteer.status === 'available' 
                ? 'bg-green-100 text-green-600' 
                : 'bg-gray-100 text-gray-600'
            }`}>
              {volunteer.status === 'available' ? '✓ Available' : 'Busy'}
            </span>
          </div>

          <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
            <MapPin className="w-4 h-4" />
            <span>{volunteer.distance} away from you</span>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => handleRequestHelp(volunteer)}
              disabled={volunteer.status === 'busy'}
              className="flex-1 bg-purple-600 text-white py-3 rounded-xl hover:bg-purple-700 disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              <Shield className="w-4 h-4" />
              Request Help
            </button>
            <a
              href={`tel:${volunteer.phone}`}
              className="flex-1 bg-green-600 text-white py-3 rounded-xl hover:bg-green-700 flex items-center justify-center gap-2"
            >
              <Phone className="w-4 h-4" />
              Call
            </a>
          </div>
        </div>
      ))}

      <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl p-6 text-white">
        <h3 className="mb-2">Become a Volunteer</h3>
        <p className="text-blue-100 text-sm mb-4">
          Join our community of heroes and help keep others safe
        </p>
        <button className="bg-white text-purple-600 px-6 py-3 rounded-xl hover:bg-blue-50 transition-colors" onClick={() => setShowRegistration(true)}>
          Register as Volunteer
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 pb-20">
      {/* Header */}
      <div className="bg-white shadow-sm px-6 py-4">
        <h1 className="text-gray-900">
          {activeTab === 'volunteer' ? 'Volunteer Dashboard' : 'Find Volunteers'}
        </h1>
        <p className="text-gray-600 text-sm">
          {activeTab === 'volunteer' ? 'Help keep your community safe' : 'Connect with nearby volunteers'}
        </p>
      </div>

      {/* Tabs */}
      <div className="bg-white border-b border-gray-200 px-6 py-2">
        <div className="flex gap-4">
          <button
            onClick={() => setActiveTab('volunteer')}
            className={`pb-3 px-1 ${
              activeTab === 'volunteer'
                ? 'text-purple-600 border-b-2 border-purple-600'
                : 'text-gray-500'
            }`}
          >
            My Dashboard
          </button>
          <button
            onClick={() => setActiveTab('find')}
            className={`pb-3 px-1 ${
              activeTab === 'find'
                ? 'text-purple-600 border-b-2 border-purple-600'
                : 'text-gray-500'
            }`}
          >
            Find Volunteers
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="px-6 py-6">
        {activeTab === 'volunteer' ? renderVolunteerDashboard() : renderFindVolunteers()}
      </div>

      {/* Alert Detail Modal */}
      {selectedAlert && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-6">
          <div className="bg-white rounded-3xl w-full max-w-md p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-gray-900">Help Request Details</h2>
              <button onClick={() => setSelectedAlert(null)} className="text-gray-500">
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-4 mb-6">
              <div>
                <div className="text-sm text-gray-600 mb-1">User</div>
                <div className="text-gray-900">{selectedAlert.user}</div>
              </div>
              <div>
                <div className="text-sm text-gray-600 mb-1">Location</div>
                <div className="text-gray-900 flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-purple-600" />
                  {selectedAlert.location}
                </div>
              </div>
              <div>
                <div className="text-sm text-gray-600 mb-1">Distance</div>
                <div className="text-gray-900">{selectedAlert.distance}</div>
              </div>
              <div>
                <div className="text-sm text-gray-600 mb-1">Time</div>
                <div className="text-gray-900">{selectedAlert.time}</div>
              </div>
            </div>

            <div className="space-y-2">
              <button
                onClick={() => handleAcceptAlert(selectedAlert)}
                className="w-full bg-green-600 text-white py-4 rounded-xl hover:bg-green-700 flex items-center justify-center gap-2"
              >
                <Check className="w-5 h-5" />
                Accept & Navigate
              </button>
              <button
                onClick={() => setSelectedAlert(null)}
                className="w-full bg-gray-100 text-gray-700 py-4 rounded-xl hover:bg-gray-200"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Volunteer Registration Modal */}
      {showRegistration && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-6">
          <div className="bg-white rounded-3xl w-full max-w-md p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-gray-900">Register as Volunteer</h2>
              <button onClick={() => setShowRegistration(false)} className="text-gray-500">
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-4 mb-6">
              <div>
                <div className="text-sm text-gray-600 mb-1">Name</div>
                <input
                  type="text"
                  value={regName}
                  onChange={(e) => setRegName(e.target.value)}
                  className="w-full border border-gray-300 rounded-xl px-4 py-3"
                />
              </div>
              <div>
                <div className="text-sm text-gray-600 mb-1">Phone Number</div>
                <input
                  type="tel"
                  value={regPhone}
                  onChange={(e) => setRegPhone(e.target.value)}
                  className="w-full border border-gray-300 rounded-xl px-4 py-3"
                />
              </div>
              <div>
                <div className="text-sm text-gray-600 mb-1">Address</div>
                <input
                  type="text"
                  value={regAddress}
                  onChange={(e) => setRegAddress(e.target.value)}
                  className="w-full border border-gray-300 rounded-xl px-4 py-3"
                />
              </div>
              <div>
                <div className="text-sm text-gray-600 mb-1">Emergency Contact</div>
                <input
                  type="tel"
                  value={regEmergency}
                  onChange={(e) => setRegEmergency(e.target.value)}
                  className="w-full border border-gray-300 rounded-xl px-4 py-3"
                />
              </div>
            </div>

            <div className="space-y-2">
              <button
                onClick={handleVolunteerRegistration}
                className="w-full bg-purple-600 text-white py-4 rounded-xl hover:bg-purple-700"
              >
                Register
              </button>
              <button
                onClick={() => setShowRegistration(false)}
                className="w-full bg-gray-100 text-gray-700 py-4 rounded-xl hover:bg-gray-200"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

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
          <button className="flex flex-col items-center gap-1 text-purple-600">
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