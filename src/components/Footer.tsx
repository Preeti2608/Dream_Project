import React from 'react';
import { Shield, Mail, Phone, MapPin } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Shield className="w-6 h-6 text-purple-400" />
              <span>SafeSpace</span>
            </div>
            <p className="text-gray-400 text-sm">
              Dedicated to providing resources and support for women's safety worldwide.
            </p>
          </div>

          <div>
            <h4 className="mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#contacts" className="text-gray-400 hover:text-white transition-colors">
                  Emergency Contacts
                </a>
              </li>
              <li>
                <a href="#tips" className="text-gray-400 hover:text-white transition-colors">
                  Safety Tips
                </a>
              </li>
              <li>
                <a href="#resources" className="text-gray-400 hover:text-white transition-colors">
                  Resources
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4">Support</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4">Contact</h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                support@safespace.org
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                1-800-SAFE-NOW
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-400">
            <p>&copy; 2025 SafeSpace. All rights reserved.</p>
            <div className="bg-red-600 text-white px-4 py-2 rounded-lg">
              <strong>Emergency: Call 911</strong>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
