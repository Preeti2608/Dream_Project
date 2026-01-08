import React from 'react';
import { BookOpen, Video, FileText, Users } from 'lucide-react';

const resources = [
  {
    icon: BookOpen,
    title: 'Educational Articles',
    description: 'Learn about self-defense, legal rights, and safety strategies.',
    link: '#',
  },
  {
    icon: Video,
    title: 'Video Tutorials',
    description: 'Watch instructional videos on personal safety and self-defense techniques.',
    link: '#',
  },
  {
    icon: FileText,
    title: 'Legal Resources',
    description: 'Understand your rights and access legal support information.',
    link: '#',
  },
  {
    icon: Users,
    title: 'Support Groups',
    description: 'Connect with community groups and find local support networks.',
    link: '#',
  },
];

export function Resources() {
  return (
    <section id="resources" className="py-16 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h2 className="mb-4 text-gray-900">Resources & Support</h2>
            <p className="text-gray-600 mb-6">
              Access a wide range of educational materials, legal information, and support 
              networks to empower yourself with knowledge and community backing.
            </p>
            <p className="text-gray-600">
              Remember, you're not alone. There are people and organizations ready to help 
              and support you through any situation.
            </p>
          </div>
          <div>
            <img
              src="https://images.unsplash.com/photo-1761070813557-2fafa2f02475?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb21tdW5pdHklMjBzYWZldHl8ZW58MXx8fHwxNzY2NTk0ODc2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
              alt="Community support"
              className="rounded-2xl shadow-xl w-full h-80 object-cover"
            />
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {resources.map((resource) => {
            const Icon = resource.icon;
            return (
              <a
                key={resource.title}
                href={resource.link}
                className="block bg-gray-50 rounded-xl p-6 hover:bg-purple-50 hover:border-purple-200 border border-transparent transition-all group"
              >
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-purple-200 transition-colors">
                  <Icon className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="mb-2 text-gray-900">{resource.title}</h3>
                <p className="text-gray-600 text-sm">{resource.description}</p>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
