import React, { useState } from 'react';
import { ArrowLeft, Plus, Phone, Mail, Edit2, Trash2, CheckCircle, AlertCircle, X } from 'lucide-react';
import { Screen } from '../App';

interface TrustedContactsProps {
  onNavigate: (screen: Screen) => void;
}

interface Contact {
  id: string;
  name: string;
  phone: string;
  email: string;
  relation: string;
  status: 'confirmed' | 'pending';
}

export function TrustedContacts({ onNavigate }: TrustedContactsProps) {
  const [contacts, setContacts] = useState<Contact[]>([
    {
      id: '1',
      name: 'Maa',
      phone: '+91 98765 43211',
      email: 'mother@email.com',
      relation: 'Mother',
      status: 'confirmed',
    },
    {
      id: '2',
      name: 'Papa',
      phone: '+91 98765 43212',
      email: 'father@email.com',
      relation: 'Father',
      status: 'confirmed',
    },
    {
      id: '3',
      name: 'Anjali',
      phone: '+91 98765 43213',
      email: 'anjali@email.com',
      relation: 'Friend',
      status: 'pending',
    },
  ]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [editingContact, setEditingContact] = useState<Contact | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    relation: 'Friend',
  });

  const handleAddContact = () => {
    const newContact: Contact = {
      id: Date.now().toString(),
      ...formData,
      status: 'pending',
    };
    setContacts([...contacts, newContact]);
    setFormData({ name: '', phone: '', email: '', relation: 'Friend' });
    setShowAddModal(false);
  };

  const handleEditContact = () => {
    if (editingContact) {
      setContacts(contacts.map(c => 
        c.id === editingContact.id 
          ? { ...editingContact, ...formData }
          : c
      ));
      setEditingContact(null);
      setFormData({ name: '', phone: '', email: '', relation: 'Friend' });
    }
  };

  const handleDeleteContact = (id: string) => {
    if (confirm('Are you sure you want to remove this contact?')) {
      setContacts(contacts.filter(c => c.id !== id));
    }
  };

  const openAddModal = () => {
    setFormData({ name: '', phone: '', email: '', relation: 'Friend' });
    setEditingContact(null);
    setShowAddModal(true);
  };

  const openEditModal = (contact: Contact) => {
    setFormData({
      name: contact.name,
      phone: contact.phone,
      email: contact.email,
      relation: contact.relation,
    });
    setEditingContact(contact);
    setShowAddModal(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50">
      {/* Header */}
      <div className="bg-white shadow-sm px-6 py-4 sticky top-0 z-10">
        <div className="flex items-center justify-between max-w-4xl mx-auto">
          <div className="flex items-center gap-4">
            <button
              onClick={() => onNavigate('profile')}
              className="text-gray-600 hover:text-gray-900"
            >
              <ArrowLeft className="w-6 h-6" />
            </button>
            <h1 className="text-gray-900">Trusted Contacts</h1>
          </div>
          <button
            onClick={openAddModal}
            className="flex items-center gap-2 bg-purple-600 text-white px-4 py-2 rounded-xl hover:bg-purple-700 transition-colors"
          >
            <Plus className="w-5 h-5" />
            <span className="hidden sm:inline">Add Contact</span>
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="px-6 py-8 max-w-4xl mx-auto">
        <div className="bg-purple-50 border border-purple-200 rounded-xl p-4 mb-6">
          <p className="text-sm text-gray-700">
            These contacts will receive emergency alerts when you trigger SOS. Make sure they are aware and have accepted to be your guardians.
          </p>
        </div>

        {/* Contacts List */}
        <div className="space-y-4">
          {contacts.map((contact) => (
            <div key={contact.id} className="bg-white rounded-2xl shadow-md p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start gap-4">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                    contact.status === 'confirmed' ? 'bg-green-100' : 'bg-gray-100'
                  }`}>
                    {contact.status === 'confirmed' ? (
                      <CheckCircle className="w-6 h-6 text-green-600" />
                    ) : (
                      <AlertCircle className="w-6 h-6 text-gray-400" />
                    )}
                  </div>
                  <div>
                    <h3 className="text-gray-900 mb-1">{contact.name}</h3>
                    <span className={`inline-block px-3 py-1 rounded-full text-xs ${
                      contact.status === 'confirmed'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-yellow-100 text-yellow-700'
                    }`}>
                      {contact.status === 'confirmed' ? 'Confirmed' : 'Pending'}
                    </span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => openEditModal(contact)}
                    className="p-2 text-purple-600 hover:bg-purple-50 rounded-lg transition-colors"
                  >
                    <Edit2 className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => handleDeleteContact(contact.id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-3 text-gray-600">
                  <Phone className="w-4 h-4" />
                  <span>{contact.phone}</span>
                </div>
                <div className="flex items-center gap-3 text-gray-600">
                  <Mail className="w-4 h-4" />
                  <span>{contact.email}</span>
                </div>
                <div className="flex items-center gap-3 text-gray-600">
                  <span className="w-4 h-4 flex items-center justify-center">👤</span>
                  <span>{contact.relation}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {contacts.length === 0 && (
          <div className="bg-white rounded-2xl shadow-md p-12 text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Phone className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-gray-900 mb-2">No Contacts Added</h3>
            <p className="text-gray-600 mb-6">Add trusted contacts who will receive emergency alerts</p>
            <button
              onClick={openAddModal}
              className="bg-purple-600 text-white px-6 py-3 rounded-xl hover:bg-purple-700 transition-colors"
            >
              Add Your First Contact
            </button>
          </div>
        )}
      </div>

      {/* Add/Edit Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-6">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-gray-900">
                {editingContact ? 'Edit Contact' : 'Add Contact'}
              </h2>
              <button
                onClick={() => {
                  setShowAddModal(false);
                  setEditingContact(null);
                }}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-gray-700 mb-2">Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-600"
                  placeholder="John Doe"
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-2">Phone Number</label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-600"
                  placeholder="+1 (555) 000-0000"
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-600"
                  placeholder="john@example.com"
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-2">Relation</label>
                <select
                  value={formData.relation}
                  onChange={(e) => setFormData({ ...formData, relation: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-600"
                >
                  <option>Mother</option>
                  <option>Father</option>
                  <option>Sister</option>
                  <option>Brother</option>
                  <option>Friend</option>
                  <option>Partner</option>
                  <option>Roommate</option>
                  <option>Colleague</option>
                </select>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  onClick={() => {
                    setShowAddModal(false);
                    setEditingContact(null);
                  }}
                  className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={editingContact ? handleEditContact : handleAddContact}
                  className="flex-1 px-6 py-3 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition-colors"
                >
                  {editingContact ? 'Save Changes' : 'Add Contact'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}