import React, { useState } from 'react';
import { Check } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const NotificationPanel = () => {
    const { t } = useTranslation();
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      name: "Brian Griffin",
      message: "wants to collaborate",
      time: "2 hours ago",
      avatar: "BG",
      read: false
    },
    {
      id: 2,
      name: "Adam",
      message: "Hey Peter, we've got a new user research opportunity for you. Adam from The Mayor's Office is looking for people like you.",
      time: "1 month ago",
      avatar: "A",
      read: false
    },
    {
      id: 3,
      name: "Neil",
      message: "Hey Peter, we've got a new user research opportunity for you. Neil is looking for people like you.",
      time: "1 month ago",
      avatar: "N",
      read: false
    },
    {
      id: 4,
      name: "Quagmire",
      message: "Hey Peter, we've got a new user research opportunity for you. Quagmire from Giggity Co. is looking for people like you.",
      time: "1 month ago",
      avatar: "Q",
      read: false
    },
    {
      id: 5,
      name: "Herbert",
      message: "Hey Peter, we've got a new side project opportunity for you. Herbert from Children's Program is looking for people like you.",
      time: "1 month ago",
      avatar: "H",
      read: false
    },
    {
      id: 6,
      name: "Cleveland",
      message: "Hey Peter, we've got a new side project opportunity for you. Cleveland from The Post Office is looking for people like you.",
      time: "2 months ago",
      avatar: "C",
      read: false
    }
  ]);

  const markAsRead = (id) => {
    setNotifications(notifications.map(notif => 
      notif.id === id ? { ...notif, read: true } : notif
    ));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(notif => ({ ...notif, read: true })));
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  const getAvatarColor = (name) => {
    const colors = [
      'bg-slate-700',
      'bg-blue-500',
      'bg-orange-400',
      'bg-amber-600',
      'bg-cyan-500',
      'bg-orange-500'
    ];
    return colors[notifications.findIndex(n => n.name === name) % colors.length];
  };

  return (
    <div className="min-h-screen bg-[#F3F4F6] p-4 md:p-8 md:px-12">
      <div className="max-w-8xl mx-auto bg-white rounded-lg shadow-sm">
        {/* Header */}
        <div className="flex items-center justify-between p-4 md:p-6 border-b border-gray-200">
          <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-900">{t("dashboard.marketing.Notifications")}</h1>
          <button
            onClick={markAllAsRead}
            className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 transition-colors"
          >
            <span className="hidden sm:inline font-bold">{t("dashboard.marketing.MarkAllRead")}</span>
            <Check className="w-4 h-4" />
          </button>
        </div>

        {/* Notifications List */}
        <div className="divide-y divide-gray-100">
          {notifications.map((notif) => (
            <div
              key={notif.id}
              className={`flex gap-3 p-4 md:p-5 hover:bg-gray-50 transition-colors cursor-pointer ${
                !notif.read ? 'bg-blue-50/30' : ''
              }`}
              onClick={() => markAsRead(notif.id)}
            >
              {/* Avatar */}
              <div className="flex-shrink-0">
                <div className={`w-10 h-10 md:w-12 md:h-12 rounded-full ${getAvatarColor(notif.name)} flex items-center justify-center text-white font-semibold text-sm md:text-base`}>
                  {notif.avatar}
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1">
                    <p className="text-sm md:text-base text-gray-800 break-words">
                      <span className="font-semibold">{notif.name}</span>{' '}
                      <span className="text-gray-600">{notif.message}</span>
                    </p>
                    <p className="text-xs md:text-sm text-gray-500 mt-1">{notif.time}</p>
                  </div>
                  
                  {/* Unread indicator */}
                  {!notif.read && (
                    <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0 mt-2"></div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty state or unread count */}
        {unreadCount === 0 && (
          <div className="p-6 text-center text-gray-500 text-sm">
            {t("dashboard.marketing.NoUnreadNotifications")}
          </div>
        )}
      </div>
    </div>
  );
};

export default NotificationPanel;