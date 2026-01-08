import React from 'react';
import { Phone, MessageCircle, Shield, Heart } from 'lucide-react';

const contacts = [
  {
    name: 'Emergency Services',
    number: '911',
    description: 'Immediate emergency assistance',
    icon: Phone,
    color: 'red',
  },
  {
    name: 'National Domestic Violence Hotline',
    number: '1-800-799-7233',
    description: '24/7 confidential support',
    icon: Heart,
    color: 'pink',
  },
  {
    name: 'RAINN (Sexual Assault Hotline)',
    number: '1-800-656-4673',
    description: 'Free, confidential counseling',
    icon: Shield,
    color: 'purple',
  },
  {
    name: 'Crisis Text Line',
    number: 'Text HOME to 741741',
    description: 'Text-based crisis support',
    icon: MessageCircle,
    color: 'blue',
  },
];

const colorClasses = {
  red: 'bg-red-100 text-red-600',
  pink: 'bg-pink-100 text-pink-600',
  purple: 'bg-purple-100 text-purple-600',
  blue: 'bg-blue-100 text-blue-600',
};

export function EmergencyContacts() {
  return (
    <section id="contacts" className="py-16 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="mb-4 text-gray-900">Emergency Contacts</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Keep these important numbers handy. Help is available 24/7.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {contacts.map((contact) => {
            const Icon = contact.icon;
            return (
              <div
                key={contact.number}
                className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow"
              >
                <div className={`w-12 h-12 rounded-lg ${colorClasses[contact.color]} flex items-center justify-center mb-4`}>
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="mb-2 text-gray-900">{contact.name}</h3>
                <a
                  href={`tel:${contact.number.replace(/[^0-9]/g, '')}`}
                  className="text-purple-600 hover:text-purple-700 block mb-2"
                >
                  {contact.number}
                </a>
                <p className="text-gray-600 text-sm">{contact.description}</p>
              </div>
            );
          })}
        </div>

        <div className="mt-12 bg-purple-50 border border-purple-200 rounded-xl p-6 text-center">
          <p className="text-gray-700">
            <strong>Remember:</strong> In immediate danger, always call 911 first.
          </p>
        </div>
      </div>
    </section>
  );
}
