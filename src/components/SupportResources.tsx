import React, { useState } from 'react';
import { ArrowLeft, Phone, MessageCircle, FileText, Users, Scale, Heart, ExternalLink, Copy, Check } from 'lucide-react';
import { Screen } from '../App';

interface SupportResourcesProps {
  onNavigate: (screen: Screen) => void;
}

export function SupportResources({ onNavigate }: SupportResourcesProps) {
  const [copiedNumber, setCopiedNumber] = useState<string | null>(null);

  const emergencyContacts = [
    { name: 'Police Emergency', number: '100', description: 'Immediate police assistance' },
    { name: 'Women Helpline', number: '1091', description: '24/7 support for women in distress' },
    { name: 'National Commission for Women', number: '7827-170-170', description: 'Legal and counseling support' },
    { name: 'One Stop Centre', number: '181', description: 'Integrated support for women'},
    { name: 'Child Helpline', number: '1098', description: 'For minors in distress' },
    { name: 'Senior Citizen Helpline', number: '14567', description: 'Elderly care and emergency' },
  ];

  const legalResources = [
    {
      title: 'How to File an FIR',
      description: 'Step-by-step guide to filing a First Information Report',
      icon: FileText,
    },
    {
      title: 'Know Your Rights',
      description: 'Legal rights and protections for women',
      icon: Scale,
    },
    {
      title: 'Evidence Collection',
      description: 'What to preserve and how to document incidents',
      icon: FileText,
    },
  ];

  const counselingServices = [
    {
      name: 'iCall - Tata Institute',
      description: 'Psychosocial helpline service',
      link: 'icallhelpline.org',
    },
    {
      name: 'NIMHANS',
      description: 'Mental health counseling and support',
      link: 'nimhans.ac.in',
    },
    {
      name: 'Vandrevala Foundation',
      description: 'Free 24/7 mental health helpline',
      link: 'vandrevalafoundation.com',
    },
  ];

  const ngoPartners = [
    {
      name: 'Shakti Shalini',
      description: 'Shelter and support for women in distress',
      phone: '011-24373737',
    },
    {
      name: 'Sneha Foundation',
      description: 'Crisis intervention and counseling',
      phone: '044-24640050',
    },
    {
      name: 'Sakhya',
      description: 'Women safety and self-defense training',
      phone: '020-25654066',
    },
  ];

  const handleCopyNumber = (number: string) => {
    navigator.clipboard.writeText(number);
    setCopiedNumber(number);
    setTimeout(() => setCopiedNumber(null), 2000);
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
          <h1 className="text-gray-900">Support & Resources</h1>
        </div>
      </div>

      {/* Content */}
      <div className="px-6 py-8 max-w-4xl mx-auto space-y-8">
        {/* Emergency Contacts */}
        <div>
          <h2 className="text-gray-900 mb-4">Emergency Contacts</h2>
          <div className="space-y-3">
            {emergencyContacts.map((contact, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-md p-6">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <h3 className="text-gray-900 mb-1">{contact.name}</h3>
                    <p className="text-sm text-gray-600 mb-3">{contact.description}</p>
                    <div className="flex items-center gap-3">
                      <a
                        href={`tel:${contact.number}`}
                        className="flex items-center gap-2 text-purple-600 hover:text-purple-700"
                      >
                        <Phone className="w-4 h-4" />
                        <span className="text-sm">{contact.number}</span>
                      </a>
                      <button
                        onClick={() => handleCopyNumber(contact.number)}
                        className="flex items-center gap-1 text-gray-600 hover:text-gray-800"
                      >
                        {copiedNumber === contact.number ? (
                          <Check className="w-4 h-4 text-green-600" />
                        ) : (
                          <Copy className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Legal Resources */}
        <div>
          <h2 className="text-gray-900 mb-4">Legal Resources</h2>
          <div className="grid md:grid-cols-3 gap-4">
            {legalResources.map((resource, index) => {
              const Icon = resource.icon;
              return (
                <button
                  key={index}
                  className="bg-white rounded-2xl shadow-md p-6 text-left hover:shadow-lg transition-shadow"
                >
                  <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-purple-600" />
                  </div>
                  <h3 className="text-gray-900 mb-2">{resource.title}</h3>
                  <p className="text-sm text-gray-600 mb-3">{resource.description}</p>
                  <div className="flex items-center gap-1 text-purple-600 text-sm">
                    <span>Learn More</span>
                    <ExternalLink className="w-4 h-4" />
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Counseling Services */}
        <div>
          <h2 className="text-gray-900 mb-4">Counseling & Mental Health</h2>
          <div className="bg-white rounded-2xl shadow-md p-6">
            <div className="flex items-start gap-3 mb-6">
              <Heart className="w-6 h-6 text-pink-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-gray-900 mb-2">Your Mental Health Matters</h3>
                <p className="text-sm text-gray-600">
                  Professional support can help you process difficult experiences and build resilience.
                </p>
              </div>
            </div>
            <div className="space-y-3">
              {counselingServices.map((service, index) => (
                <div key={index} className="border-t border-gray-200 pt-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="text-gray-900 mb-1">{service.name}</h4>
                      <p className="text-sm text-gray-600 mb-2">{service.description}</p>
                      <a
                        href={`https://${service.link}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-purple-600 hover:text-purple-700 flex items-center gap-1"
                      >
                        {service.link}
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* NGO Partners */}
        <div>
          <h2 className="text-gray-900 mb-4">NGO & Community Partners</h2>
          <div className="space-y-3">
            {ngoPartners.map((ngo, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-md p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Users className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-gray-900 mb-1">{ngo.name}</h3>
                    <p className="text-sm text-gray-600 mb-3">{ngo.description}</p>
                    <div className="flex items-center gap-3">
                      <a
                        href={`tel:${ngo.phone}`}
                        className="flex items-center gap-2 text-purple-600 hover:text-purple-700"
                      >
                        <Phone className="w-4 h-4" />
                        <span className="text-sm">{ngo.phone}</span>
                      </a>
                      <button
                        onClick={() => handleCopyNumber(ngo.phone)}
                        className="flex items-center gap-1 text-gray-600 hover:text-gray-800"
                      >
                        {copiedNumber === ngo.phone ? (
                          <Check className="w-4 h-4 text-green-600" />
                        ) : (
                          <Copy className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Self Care Tips */}
        <div className="bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl shadow-md p-6 text-white">
          <h3 className="mb-4">Self-Care Reminder</h3>
          <ul className="space-y-2 text-sm text-purple-100">
            <li className="flex items-start gap-2">
              <span>•</span>
              <span>It's okay to ask for help - reaching out is a sign of strength</span>
            </li>
            <li className="flex items-start gap-2">
              <span>•</span>
              <span>Take time to process your feelings at your own pace</span>
            </li>
            <li className="flex items-start gap-2">
              <span>•</span>
              <span>Connect with trusted friends and family</span>
            </li>
            <li className="flex items-start gap-2">
              <span>•</span>
              <span>Your safety and well-being are the top priorities</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}