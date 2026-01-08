import React, { useState } from 'react';
import { ArrowLeft, Shield, Eye, EyeOff, Lock, Trash2, Download, AlertCircle } from 'lucide-react';
import { Screen } from '../App';

interface PrivacyControlsProps {
  onNavigate: (screen: Screen) => void;
}

export function PrivacyControls({ onNavigate }: PrivacyControlsProps) {
  const [settings, setSettings] = useState({
    shareLocationSOS: true,
    shareLocationAlways: false,
    autoRecordVideo: true,
    autoRecordAudio: true,
    shareWithCommunity: false,
    anonymousMode: true,
    dataRetention: '90',
  });

  const handleToggle = (key: string) => {
    setSettings({ ...settings, [key]: !settings[key as keyof typeof settings] });
  };

  const handleDeleteData = () => {
    if (confirm('Are you sure you want to delete all your data? This action cannot be undone.')) {
      alert('Data deletion initiated. You will receive a confirmation email within 24 hours.');
    }
  };

  const handleExportData = () => {
    alert('Your data export has been initiated. You will receive a download link via email within 24 hours.');
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
          <h1 className="text-gray-900">Privacy Controls</h1>
        </div>
      </div>

      {/* Content */}
      <div className="px-6 py-8 max-w-4xl mx-auto space-y-6">
        {/* Privacy Overview */}
        <div className="bg-purple-50 border border-purple-200 rounded-2xl p-6">
          <div className="flex items-start gap-3">
            <Shield className="w-6 h-6 text-purple-600 flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-gray-900 mb-2">Your Privacy is Protected</h3>
              <p className="text-sm text-gray-700">
                You have full control over what information is shared and when. All emergency data is encrypted and only shared with your designated contacts during active SOS situations.
              </p>
            </div>
          </div>
        </div>

        {/* Location Sharing */}
        <div className="bg-white rounded-2xl shadow-md p-6">
          <h3 className="text-gray-900 mb-4">Location Sharing</h3>
          <div className="space-y-4">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="text-gray-900 mb-1">Share during SOS only</div>
                <div className="text-sm text-gray-600">Location is shared only when emergency is triggered</div>
              </div>
              <button
                onClick={() => handleToggle('shareLocationSOS')}
                className={`w-12 h-6 rounded-full transition-colors flex-shrink-0 ml-4 ${
                  settings.shareLocationSOS ? 'bg-purple-600' : 'bg-gray-300'
                }`}
              >
                <div
                  className={`w-5 h-5 bg-white rounded-full shadow-md transition-transform ${
                    settings.shareLocationSOS ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            <div className="flex items-start justify-between border-t border-gray-200 pt-4">
              <div className="flex-1">
                <div className="text-gray-900 mb-1">Always share location</div>
                <div className="text-sm text-gray-600">Continuous location tracking (not recommended)</div>
              </div>
              <button
                onClick={() => handleToggle('shareLocationAlways')}
                className={`w-12 h-6 rounded-full transition-colors flex-shrink-0 ml-4 ${
                  settings.shareLocationAlways ? 'bg-purple-600' : 'bg-gray-300'
                }`}
              >
                <div
                  className={`w-5 h-5 bg-white rounded-full shadow-md transition-transform ${
                    settings.shareLocationAlways ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          </div>
        </div>

        {/* Recording Settings */}
        <div className="bg-white rounded-2xl shadow-md p-6">
          <h3 className="text-gray-900 mb-4">Emergency Recording</h3>
          <div className="space-y-4">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="text-gray-900 mb-1">Auto-record video</div>
                <div className="text-sm text-gray-600">Automatically record video during SOS</div>
              </div>
              <button
                onClick={() => handleToggle('autoRecordVideo')}
                className={`w-12 h-6 rounded-full transition-colors flex-shrink-0 ml-4 ${
                  settings.autoRecordVideo ? 'bg-purple-600' : 'bg-gray-300'
                }`}
              >
                <div
                  className={`w-5 h-5 bg-white rounded-full shadow-md transition-transform ${
                    settings.autoRecordVideo ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            <div className="flex items-start justify-between border-t border-gray-200 pt-4">
              <div className="flex-1">
                <div className="text-gray-900 mb-1">Auto-record audio</div>
                <div className="text-sm text-gray-600">Automatically record audio during SOS</div>
              </div>
              <button
                onClick={() => handleToggle('autoRecordAudio')}
                className={`w-12 h-6 rounded-full transition-colors flex-shrink-0 ml-4 ${
                  settings.autoRecordAudio ? 'bg-purple-600' : 'bg-gray-300'
                }`}
              >
                <div
                  className={`w-5 h-5 bg-white rounded-full shadow-md transition-transform ${
                    settings.autoRecordAudio ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          </div>
        </div>

        {/* Community Settings */}
        <div className="bg-white rounded-2xl shadow-md p-6">
          <h3 className="text-gray-900 mb-4">Community Features</h3>
          <div className="space-y-4">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="text-gray-900 mb-1">Anonymous mode</div>
                <div className="text-sm text-gray-600">Hide your identity in community posts</div>
              </div>
              <button
                onClick={() => handleToggle('anonymousMode')}
                className={`w-12 h-6 rounded-full transition-colors flex-shrink-0 ml-4 ${
                  settings.anonymousMode ? 'bg-purple-600' : 'bg-gray-300'
                }`}
              >
                <div
                  className={`w-5 h-5 bg-white rounded-full shadow-md transition-transform ${
                    settings.anonymousMode ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            <div className="flex items-start justify-between border-t border-gray-200 pt-4">
              <div className="flex-1">
                <div className="text-gray-900 mb-1">Share with community</div>
                <div className="text-sm text-gray-600">Allow community to see your safety reports</div>
              </div>
              <button
                onClick={() => handleToggle('shareWithCommunity')}
                className={`w-12 h-6 rounded-full transition-colors flex-shrink-0 ml-4 ${
                  settings.shareWithCommunity ? 'bg-purple-600' : 'bg-gray-300'
                }`}
              >
                <div
                  className={`w-5 h-5 bg-white rounded-full shadow-md transition-transform ${
                    settings.shareWithCommunity ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          </div>
        </div>

        {/* Data Retention */}
        <div className="bg-white rounded-2xl shadow-md p-6">
          <h3 className="text-gray-900 mb-4">Data Retention</h3>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Keep incident data for</label>
            <select
              value={settings.dataRetention}
              onChange={(e) => setSettings({ ...settings, dataRetention: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-600"
            >
              <option value="30">30 days</option>
              <option value="60">60 days</option>
              <option value="90">90 days (Recommended)</option>
              <option value="180">180 days</option>
              <option value="365">1 year</option>
            </select>
          </div>
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
            <div className="flex items-start gap-2">
              <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-gray-700">
                We recommend keeping data for at least 90 days for legal purposes. Data is automatically deleted after the retention period.
              </p>
            </div>
          </div>
        </div>

        {/* Data Management */}
        <div className="bg-white rounded-2xl shadow-md p-6">
          <h3 className="text-gray-900 mb-4">Data Management</h3>
          <div className="space-y-3">
            <button
              onClick={handleExportData}
              className="w-full flex items-center justify-between p-4 border-2 border-gray-300 rounded-xl hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <Download className="w-5 h-5 text-purple-600" />
                <div className="text-left">
                  <div className="text-gray-900">Export My Data</div>
                  <div className="text-sm text-gray-600">Download all your data</div>
                </div>
              </div>
            </button>

            <button
              onClick={handleDeleteData}
              className="w-full flex items-center justify-between p-4 border-2 border-red-300 rounded-xl hover:bg-red-50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <Trash2 className="w-5 h-5 text-red-600" />
                <div className="text-left">
                  <div className="text-gray-900">Delete All My Data</div>
                  <div className="text-sm text-red-600">This action cannot be undone</div>
                </div>
              </div>
            </button>
          </div>
        </div>

        {/* Privacy Policy */}
        <div className="bg-white rounded-2xl shadow-md p-6">
          <h3 className="text-gray-900 mb-3">Learn More</h3>
          <div className="space-y-2">
            <button className="w-full text-left text-purple-600 hover:text-purple-700 py-2">
              → Privacy Policy
            </button>
            <button className="w-full text-left text-purple-600 hover:text-purple-700 py-2">
              → Terms of Service
            </button>
            <button className="w-full text-left text-purple-600 hover:text-purple-700 py-2">
              → Data Protection FAQs
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
