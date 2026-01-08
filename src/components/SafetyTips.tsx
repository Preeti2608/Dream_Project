import React from 'react';
import { Eye, Users, Smartphone, Home, Car, Lock } from 'lucide-react';

const tips = [
  {
    icon: Eye,
    title: 'Stay Aware',
    description: 'Always be mindful of your surroundings and trust your instincts.',
  },
  {
    icon: Smartphone,
    title: 'Share Your Location',
    description: 'Let trusted contacts know where you are, especially when traveling alone.',
  },
  {
    icon: Users,
    title: 'Use the Buddy System',
    description: 'Travel with friends or colleagues whenever possible, especially at night.',
  },
  {
    icon: Lock,
    title: 'Secure Your Space',
    description: 'Keep doors and windows locked, and verify visitors before opening.',
  },
  {
    icon: Car,
    title: 'Safe Transportation',
    description: 'Verify ride-share details, sit in back seat, and share trip info with friends.',
  },
  {
    icon: Home,
    title: 'Home Safety',
    description: 'Install proper lighting, security systems, and establish emergency exits.',
  },
];

export function SafetyTips() {
  return (
    <section id="tips" className="py-16 lg:py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="mb-4 text-gray-900">Safety Tips</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Practical advice to help you stay safe in various situations.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {tips.map((tip) => {
            const Icon = tip.icon;
            return (
              <div
                key={tip.title}
                className="bg-white rounded-xl p-6 hover:shadow-md transition-shadow"
              >
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="mb-2 text-gray-900">{tip.title}</h3>
                <p className="text-gray-600">{tip.description}</p>
              </div>
            );
          })}
        </div>

        <div className="mt-12 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-8 text-white">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="mb-4">Download Our Safety Checklist</h3>
              <p className="mb-6 opacity-90">
                Get a comprehensive safety checklist to keep yourself protected in different scenarios.
              </p>
              <button className="px-6 py-3 bg-white text-purple-600 rounded-lg hover:bg-gray-100 transition-colors">
                Download Checklist
              </button>
            </div>
            <div>
              <img
                src="https://images.unsplash.com/photo-1562388364-cfca9bff0b41?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZWxwaW5nJTIwaGFuZHMlMjBzdXBwb3J0fGVufDF8fHx8MTc2NjU5NDg3NXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Support and help"
                className="rounded-xl w-full h-64 object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
