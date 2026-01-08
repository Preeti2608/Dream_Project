import React, { useState } from 'react';
import { ArrowLeft, Bell, Check, Trash2, Shield, Users, MapPin, AlertTriangle } from 'lucide-react';
import { Screen } from '../App';

interface NotificationsProps {
  onNavigate: (screen: Screen) => void;
}

interface Notification {
  id: string;
  type: 'safety' | 'community' | 'volunteer' | 'alert';
  title: string;
  message: string;
  time: string;
  read: boolean;
  icon: any;
  iconColor: string;
}

export function Notifications({ onNavigate }: NotificationsProps) {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      type: 'alert',
      title: 'Safety Alert',
      message: 'High-risk zone reported near Linking Road. Avoid the area if possible.',
      time: '5 min ago',
      read: false,
      icon: AlertTriangle,
      iconColor: 'bg-red-500',
    },
    {
      id: '2',
      type: 'community',
      title: 'New Community Post',
      message: 'Anjali shared safety tips for late-night travel in Bandra.',
      time: '1 hour ago',
      read: false,
      icon: Users,
      iconColor: 'bg-blue-500',
    },
    {
      id: '3',
      type: 'volunteer',
      title: 'Volunteer Available',
      message: 'Rajesh K. is now available near your location (0.5 km away).',
      time: '2 hours ago',
      read: true,
      icon: Shield,
      iconColor: 'bg-purple-500',
    },
    {
      id: '4',
      type: 'safety',
      title: 'Safety Check-in',
      message: 'Your trusted contact "Maa" requested a safety check-in.',
      time: '3 hours ago',
      read: true,
      icon: MapPin,
      iconColor: 'bg-green-500',
    },
  ]);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAsRead = (id: string) => {
    setNotifications(
      notifications.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const deleteNotification = (id: string) => {
    setNotifications(notifications.filter((n) => n.id !== id));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, read: true })));
  };

  const clearAll = () => {
    setNotifications([]);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm px-6 py-4 sticky top-0 z-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => onNavigate('home')}
              className="text-gray-600 hover:text-gray-900"
            >
              <ArrowLeft className="w-6 h-6" />
            </button>
            <div>
              <h1 className="text-gray-900">Notifications</h1>
              <p className="text-sm text-gray-600">{unreadCount} unread</p>
            </div>
          </div>

          {notifications.length > 0 && (
            <div className="flex items-center gap-2">
              {unreadCount > 0 && (
                <button
                  onClick={markAllAsRead}
                  className="text-sm text-purple-600 hover:text-purple-700"
                >
                  Mark all read
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="px-6 py-6">
        {notifications.length === 0 ? (
          <div className="text-center py-16">
            <Bell className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-gray-900 mb-2">No notifications</h3>
            <p className="text-gray-600 text-sm">You're all caught up!</p>
          </div>
        ) : (
          <div className="space-y-3">
            {notifications.map((notification) => {
              const Icon = notification.icon;
              return (
                <div
                  key={notification.id}
                  className={`bg-white rounded-2xl p-4 shadow-sm transition-all ${
                    !notification.read ? 'ring-2 ring-purple-200' : ''
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div
                      className={`${notification.iconColor} w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0`}
                    >
                      <Icon className="w-6 h-6 text-white" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <h3 className="text-gray-900 text-sm">{notification.title}</h3>
                        {!notification.read && (
                          <div className="w-2 h-2 bg-purple-600 rounded-full flex-shrink-0 mt-1" />
                        )}
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{notification.message}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-500">{notification.time}</span>
                        <div className="flex items-center gap-2">
                          {!notification.read && (
                            <button
                              onClick={() => markAsRead(notification.id)}
                              className="text-xs text-purple-600 hover:text-purple-700 flex items-center gap-1"
                            >
                              <Check className="w-3 h-3" />
                              Mark read
                            </button>
                          )}
                          <button
                            onClick={() => deleteNotification(notification.id)}
                            className="text-xs text-red-600 hover:text-red-700 flex items-center gap-1"
                          >
                            <Trash2 className="w-3 h-3" />
                            Delete
                            </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {notifications.length > 0 && (
          <button
            onClick={clearAll}
            className="w-full mt-6 py-3 text-sm text-red-600 hover:text-red-700"
          >
            Clear All Notifications
          </button>
        )}
      </div>
    </div>
  );
}
