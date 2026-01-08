import React, { useState } from 'react';
import { ArrowLeft, Download, Eye, Video, Mic, MapPin, Clock, Shield, AlertCircle } from 'lucide-react';
import { Screen } from '../App';

interface IncidentHistoryProps {
  onNavigate: (screen: Screen) => void;
}

interface Incident {
  id: string;
  date: string;
  time: string;
  duration: string;
  location: string;
  trigger: string;
  status: 'resolved' | 'active';
  responseTime: string;
  hasVideo: boolean;
  hasAudio: boolean;
}

export function IncidentHistory({ onNavigate }: IncidentHistoryProps) {
  const [incidents] = useState<Incident[]>([
    {
      id: '1',
      date: 'Dec 28, 2024',
      time: '10:45 PM',
      duration: '12 min',
      location: 'Linking Road, Bandra, Mumbai',
      trigger: 'Manual SOS',
      status: 'resolved',
      responseTime: '2 min',
      hasVideo: true,
      hasAudio: true,
    },
    {
      id: '2',
      date: 'Dec 15, 2024',
      time: '8:30 PM',
      duration: '8 min',
      location: 'Sector 18, Noida',
      trigger: 'AI Detection',
      status: 'resolved',
      responseTime: '1 min',
      hasVideo: true,
      hasAudio: false,
    },
  ]);

  const [selectedIncident, setSelectedIncident] = useState<Incident | null>(null);

  const handleDownloadReport = (incident: Incident) => {
    alert(`Downloading incident report for ${incident.date}...`);
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
          <h1 className="text-gray-900">Incident History</h1>
        </div>
      </div>

      {/* Content */}
      <div className="px-6 py-8 max-w-4xl mx-auto">
        {incidents.length > 0 ? (
          <div className="space-y-4">
            {incidents.map((incident) => (
              <div key={incident.id} className="bg-white rounded-2xl shadow-md p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-gray-900">{incident.date}</h3>
                      <span className={`px-3 py-1 rounded-full text-xs ${
                        incident.status === 'resolved'
                          ? 'bg-green-100 text-green-700'
                          : 'bg-red-100 text-red-700'
                      }`}>
                        {incident.status === 'resolved' ? 'Resolved' : 'Active'}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600">{incident.time}</p>
                  </div>
                  <button
                    onClick={() => setSelectedIncident(incident)}
                    className="flex items-center gap-2 text-purple-600 hover:text-purple-700"
                  >
                    <Eye className="w-5 h-5" />
                    <span className="text-sm">View Details</span>
                  </button>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                  <div>
                    <div className="text-xs text-gray-500 mb-1">Duration</div>
                    <div className="text-sm text-gray-900 flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {incident.duration}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500 mb-1">Trigger</div>
                    <div className="text-sm text-gray-900">{incident.trigger}</div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500 mb-1">Response</div>
                    <div className="text-sm text-gray-900">{incident.responseTime}</div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500 mb-1">Evidence</div>
                    <div className="flex items-center gap-2">
                      {incident.hasVideo && <Video className="w-4 h-4 text-purple-600" />}
                      {incident.hasAudio && <Mic className="w-4 h-4 text-purple-600" />}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
                  <MapPin className="w-4 h-4" />
                  <span>{incident.location}</span>
                </div>

                <button
                  onClick={() => handleDownloadReport(incident)}
                  className="w-full bg-purple-50 text-purple-600 py-3 rounded-xl hover:bg-purple-100 transition-colors flex items-center justify-center gap-2"
                >
                  <Download className="w-4 h-4" />
                  Download Report (for FIR)
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-md p-12 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-gray-900 mb-2">No Incidents Recorded</h3>
            <p className="text-gray-600">Great! You haven't triggered any SOS alerts.</p>
          </div>
        )}

        {/* Info Card */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mt-6">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <div className="text-sm text-gray-700">
              <p className="mb-2">
                All incident recordings are encrypted and stored securely for 90 days.
              </p>
              <p>
                You can download reports to submit as evidence for legal proceedings (FIR filing).
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Detail Modal */}
      {selectedIncident && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-6">
          <div className="bg-white rounded-3xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-gray-900">Incident Details</h2>
              <button
                onClick={() => setSelectedIncident(null)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>

            <div className="space-y-6">
              {/* Timeline */}
              <div className="bg-purple-50 rounded-xl p-4">
                <h3 className="text-gray-900 mb-3">Timeline</h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-purple-600 rounded-full mt-2" />
                    <div>
                      <div className="text-sm text-gray-900">SOS Triggered</div>
                      <div className="text-xs text-gray-600">{selectedIncident.time}</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-purple-600 rounded-full mt-2" />
                    <div>
                      <div className="text-sm text-gray-900">Alerts Sent</div>
                      <div className="text-xs text-gray-600">3 guardians, Police, Volunteers</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-purple-600 rounded-full mt-2" />
                    <div>
                      <div className="text-sm text-gray-900">Volunteer Responded</div>
                      <div className="text-xs text-gray-600">{selectedIncident.responseTime} later</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-green-600 rounded-full mt-2" />
                    <div>
                      <div className="text-sm text-gray-900">Incident Resolved</div>
                      <div className="text-xs text-gray-600">{selectedIncident.duration} total</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Evidence */}
              <div>
                <h3 className="text-gray-900 mb-3">Evidence Recorded</h3>
                <div className="grid grid-cols-2 gap-3">
                  <div className={`p-4 rounded-xl border-2 ${
                    selectedIncident.hasVideo
                      ? 'border-purple-600 bg-purple-50'
                      : 'border-gray-200 bg-gray-50'
                  }`}>
                    <Video className={`w-6 h-6 mb-2 ${
                      selectedIncident.hasVideo ? 'text-purple-600' : 'text-gray-400'
                    }`} />
                    <div className="text-sm text-gray-900">Video Recording</div>
                    <div className="text-xs text-gray-600">
                      {selectedIncident.hasVideo ? 'Available' : 'Not recorded'}
                    </div>
                  </div>
                  <div className={`p-4 rounded-xl border-2 ${
                    selectedIncident.hasAudio
                      ? 'border-purple-600 bg-purple-50'
                      : 'border-gray-200 bg-gray-50'
                  }`}>
                    <Mic className={`w-6 h-6 mb-2 ${
                      selectedIncident.hasAudio ? 'text-purple-600' : 'text-gray-400'
                    }`} />
                    <div className="text-sm text-gray-900">Audio Recording</div>
                    <div className="text-xs text-gray-600">
                      {selectedIncident.hasAudio ? 'Available' : 'Not recorded'}
                    </div>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3">
                <button
                  onClick={() => handleDownloadReport(selectedIncident)}
                  className="flex-1 bg-purple-600 text-white py-3 rounded-xl hover:bg-purple-700 transition-colors flex items-center justify-center gap-2"
                >
                  <Download className="w-4 h-4" />
                  Download Full Report
                </button>
                <button
                  onClick={() => setSelectedIncident(null)}
                  className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}