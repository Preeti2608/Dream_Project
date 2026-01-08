import React, { useState } from 'react';
import { Users, MapPin, Mic, Camera, CheckCircle, Plus, X, AlertCircle } from 'lucide-react';

interface SafetySetupProps {
  onComplete: () => void;
}

type SetupStep = 'contacts' | 'location' | 'permissions' | 'privacy';

interface Contact {
  id: string;
  name: string;
  phone: string;
  relation: string;
  status: 'confirmed' | 'pending';
}

export function SafetySetup({ onComplete }: SafetySetupProps) {
  const [currentStep, setCurrentStep] = useState<SetupStep>('contacts');
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [showAddContact, setShowAddContact] = useState(false);
  const [newContact, setNewContact] = useState({ name: '', phone: '', relation: 'Friend' });
  const [locationPermission, setLocationPermission] = useState<string | null>(null);
  const [micEnabled, setMicEnabled] = useState(false);
  const [cameraEnabled, setCameraEnabled] = useState(false);
  const [privacyAccepted, setPrivacyAccepted] = useState(false);

  const addContact = () => {
    if (newContact.name && newContact.phone) {
      setContacts([
        ...contacts,
        {
          id: Date.now().toString(),
          ...newContact,
          status: 'pending',
        },
      ]);
      setNewContact({ name: '', phone: '', relation: 'Friend' });
      setShowAddContact(false);
    }
  };

  const removeContact = (id: string) => {
    setContacts(contacts.filter((c) => c.id !== id));
  };

  const renderContactsStep = () => (
    <div className="space-y-4">
      <div className="text-center mb-6">
        <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Users className="w-8 h-8 text-purple-600" />
        </div>
        <h2 className="mb-2 text-gray-900">Add Your Guardians</h2>
        <p className="text-gray-600">These people receive alerts during emergencies</p>
      </div>

      {/* Contact List */}
      <div className="space-y-3">
        {contacts.map((contact) => (
          <div key={contact.id} className="bg-white border border-gray-200 rounded-xl p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                contact.status === 'confirmed' ? 'bg-green-100' : 'bg-gray-100'
              }`}>
                {contact.status === 'confirmed' ? (
                  <CheckCircle className="w-5 h-5 text-green-600" />
                ) : (
                  <AlertCircle className="w-5 h-5 text-gray-400" />
                )}
              </div>
              <div>
                <div className="text-gray-900">{contact.name}</div>
                <div className="text-sm text-gray-500">{contact.relation} • {contact.phone}</div>
              </div>
            </div>
            <button
              onClick={() => removeContact(contact.id)}
              className="text-red-500 hover:text-red-700"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        ))}
      </div>

      {/* Add Contact Form */}
      {showAddContact ? (
        <div className="bg-purple-50 border border-purple-200 rounded-xl p-4 space-y-3">
          <input
            type="text"
            placeholder="Name"
            value={newContact.name}
            onChange={(e) => setNewContact({ ...newContact, name: e.target.value })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
          />
          <input
            type="tel"
            placeholder="Phone Number"
            value={newContact.phone}
            onChange={(e) => setNewContact({ ...newContact, phone: e.target.value })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
          />
          <select
            value={newContact.relation}
            onChange={(e) => setNewContact({ ...newContact, relation: e.target.value })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
          >
            <option>Mother</option>
            <option>Father</option>
            <option>Sister</option>
            <option>Brother</option>
            <option>Friend</option>
            <option>Partner</option>
          </select>
          <div className="flex gap-2">
            <button
              onClick={addContact}
              className="flex-1 bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700"
            >
              Add
            </button>
            <button
              onClick={() => setShowAddContact(false)}
              className="flex-1 bg-gray-200 text-gray-700 py-2 rounded-lg hover:bg-gray-300"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setShowAddContact(true)}
          className="w-full border-2 border-dashed border-purple-300 text-purple-600 py-4 rounded-xl hover:bg-purple-50 transition-colors flex items-center justify-center gap-2"
        >
          <Plus className="w-5 h-5" />
          Add Contact
        </button>
      )}

      <button
        onClick={() => setCurrentStep('location')}
        disabled={contacts.length === 0}
        className="w-full bg-purple-600 text-white py-4 rounded-xl hover:bg-purple-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed mt-6"
      >
        Continue
      </button>
    </div>
  );

  const renderLocationStep = () => (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <MapPin className="w-8 h-8 text-purple-600" />
        </div>
        <h2 className="mb-2 text-gray-900">Location Access</h2>
        <p className="text-gray-600">Allow location access so we can send help fast</p>
      </div>

      <div className="space-y-3">
        <button
          onClick={() => setLocationPermission('always')}
          className={`w-full p-4 rounded-xl border-2 transition-all ${
            locationPermission === 'always'
              ? 'border-purple-600 bg-purple-50'
              : 'border-gray-200 bg-white hover:border-purple-300'
          }`}
        >
          <div className="flex items-center justify-between">
            <div className="text-left">
              <div className="text-gray-900">Allow Always</div>
              <div className="text-sm text-gray-600">Recommended for best protection</div>
            </div>
            {locationPermission === 'always' && (
              <CheckCircle className="w-6 h-6 text-purple-600" />
            )}
          </div>
        </button>

        <button
          onClick={() => setLocationPermission('while-using')}
          className={`w-full p-4 rounded-xl border-2 transition-all ${
            locationPermission === 'while-using'
              ? 'border-purple-600 bg-purple-50'
              : 'border-gray-200 bg-white hover:border-purple-300'
          }`}
        >
          <div className="flex items-center justify-between">
            <div className="text-left">
              <div className="text-gray-900">Allow While Using App</div>
              <div className="text-sm text-gray-600">Limited background protection</div>
            </div>
            {locationPermission === 'while-using' && (
              <CheckCircle className="w-6 h-6 text-purple-600" />
            )}
          </div>
        </button>

        <button
          onClick={() => {
            setLocationPermission('deny');
            alert('⚠️ Warning: Some safety features will be limited without location access.');
          }}
          className="w-full p-4 rounded-xl border-2 border-gray-200 bg-white hover:border-red-300 transition-all"
        >
          <div className="text-left">
            <div className="text-gray-900">Deny</div>
            <div className="text-sm text-red-600">Not recommended</div>
          </div>
        </button>
      </div>

      <button
        onClick={() => setCurrentStep('permissions')}
        disabled={!locationPermission}
        className="w-full bg-purple-600 text-white py-4 rounded-xl hover:bg-purple-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
      >
        Continue
      </button>
    </div>
  );

  const renderPermissionsStep = () => (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="mb-2 text-gray-900">Additional Permissions</h2>
        <p className="text-gray-600">Enable features for enhanced safety</p>
      </div>

      <div className="space-y-4">
        <div className={`p-6 rounded-xl border-2 transition-all ${
          micEnabled ? 'border-purple-600 bg-purple-50' : 'border-gray-200 bg-white'
        }`}>
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
              <Mic className="w-6 h-6 text-purple-600" />
            </div>
            <div className="flex-1">
              <h3 className="mb-1 text-gray-900">Microphone Access</h3>
              <p className="text-sm text-gray-600 mb-3">
                Allow microphone for distress detection and audio recording during emergencies
              </p>
              <button
                onClick={() => setMicEnabled(!micEnabled)}
                className={`px-6 py-2 rounded-lg transition-colors ${
                  micEnabled
                    ? 'bg-purple-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {micEnabled ? 'Enabled' : 'Enable'}
              </button>
            </div>
          </div>
        </div>

        <div className={`p-6 rounded-xl border-2 transition-all ${
          cameraEnabled ? 'border-purple-600 bg-purple-50' : 'border-gray-200 bg-white'
        }`}>
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
              <Camera className="w-6 h-6 text-purple-600" />
            </div>
            <div className="flex-1">
              <h3 className="mb-1 text-gray-900">Camera Access</h3>
              <p className="text-sm text-gray-600 mb-3">
                Allow camera for auto-evidence recording during emergencies
              </p>
              <button
                onClick={() => setCameraEnabled(!cameraEnabled)}
                className={`px-6 py-2 rounded-lg transition-colors ${
                  cameraEnabled
                    ? 'bg-purple-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {cameraEnabled ? 'Enabled' : 'Enable'}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="flex gap-3">
        <button
          onClick={() => setCurrentStep('privacy')}
          className="flex-1 bg-purple-600 text-white py-4 rounded-xl hover:bg-purple-700 transition-colors"
        >
          Continue
        </button>
        <button
          onClick={() => setCurrentStep('privacy')}
          className="px-6 py-4 text-gray-600 hover:text-gray-800"
        >
          Skip
        </button>
      </div>
    </div>
  );

  const renderPrivacyStep = () => (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="mb-2 text-gray-900">Privacy Control</h2>
        <p className="text-gray-600">Your data, your control</p>
      </div>

      <div className="bg-purple-50 border border-purple-200 rounded-xl p-6">
        <h3 className="mb-3 text-gray-900">How We Protect Your Privacy</h3>
        <ul className="space-y-2 text-sm text-gray-700">
          <li className="flex items-start gap-2">
            <CheckCircle className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
            <span>Your location is shared only during active SOS emergencies</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
            <span>Emergency recordings are encrypted and stored securely</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
            <span>You can delete your data at any time from settings</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
            <span>We never sell your personal information</span>
          </li>
        </ul>
      </div>

      <label className="flex items-start gap-3 cursor-pointer">
        <input
          type="checkbox"
          checked={privacyAccepted}
          onChange={(e) => setPrivacyAccepted(e.target.checked)}
          className="w-5 h-5 text-purple-600 mt-1 rounded focus:ring-purple-600"
        />
        <span className="text-gray-700">
          I understand my SOS data is shared only during emergency situations
        </span>
      </label>

      <button
        onClick={onComplete}
        disabled={!privacyAccepted}
        className="w-full bg-purple-600 text-white py-4 rounded-xl hover:bg-purple-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
      >
        Complete Setup
      </button>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 px-6 py-8">
      <div className="max-w-md mx-auto">
        {/* Progress Indicator */}
        <div className="mb-8">
          <div className="flex justify-between mb-2">
            {['contacts', 'location', 'permissions', 'privacy'].map((step, index) => (
              <div
                key={step}
                className={`w-1/4 h-1 rounded ${
                  ['contacts', 'location', 'permissions', 'privacy'].indexOf(currentStep) >= index
                    ? 'bg-purple-600'
                    : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
          <p className="text-sm text-gray-600 text-center">
            Step {['contacts', 'location', 'permissions', 'privacy'].indexOf(currentStep) + 1} of 4
          </p>
        </div>

        {/* Content */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          {currentStep === 'contacts' && renderContactsStep()}
          {currentStep === 'location' && renderLocationStep()}
          {currentStep === 'permissions' && renderPermissionsStep()}
          {currentStep === 'privacy' && renderPrivacyStep()}
        </div>
      </div>
    </div>
  );
}
