import React, { useState, useRef, useEffect } from 'react';
import { Bell, X } from 'lucide-react';
import { useNotifications } from '../../contexts/NotificationContext';

export const NotificationBell: React.FC = () => {
  const { state, dispatch } = useNotifications();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleMarkAsRead = (notificationId: string) => {
    dispatch({ type: 'MARK_AS_READ', payload: notificationId });
  };

  const handleMarkAllAsRead = () => {
    dispatch({ type: 'MARK_ALL_AS_READ' });
  };

  const formatTimeAgo = (timestamp: string) => {
    const now = new Date();
    const time = new Date(timestamp);
    const diffInMinutes = Math.floor((now.getTime() - time.getTime()) / (1000 * 60));

    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes} minute${diffInMinutes > 1 ? 's' : ''} ago`;
    
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`;
    
    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays} day${diffInDays > 1 ? 's' : ''} ago`;
  };

  const getNotificationIcon = (type: string) => {
    const iconMap: { [key: string]: string } = {
      'level-up': '🎉',
      'quest-complete': '⚔️',
      'achievement': '🏆',
      'streak': '🔥',
      'reminder': '⏰',
      'warning': '⚠️',
    };
    return iconMap[type] || '📢';
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 text-gray-300 hover:text-white transition-colors"
      >
        <Bell className="w-6 h-6" />
        {state.unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-semibold">
            {state.unreadCount > 9 ? '9+' : state.unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-80 bg-[#1a1f3a] border border-[#4a90e2]/20 rounded-lg shadow-xl z-50 max-h-96 overflow-hidden">
          <div className="p-4 border-b border-[#4a90e2]/20">
            <div className="flex items-center justify-between">
              <h3 className="text-white font-semibold">Notifications</h3>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="max-h-80 overflow-y-auto">
            {state.notifications.length === 0 ? (
              <div className="p-6 text-center text-gray-400">
                <Bell className="w-12 h-12 mx-auto mb-3 opacity-50" />
                <p>No notifications yet</p>
              </div>
            ) : (
              <div className="divide-y divide-[#4a90e2]/10">
                {state.notifications.slice(0, 10).map((notification) => (
                  <div
                    key={notification.id}
                    className={`p-4 hover:bg-[#4a90e2]/5 transition-colors cursor-pointer ${
                      !notification.read ? 'bg-[#4a90e2]/10' : ''
                    }`}
                    onClick={() => handleMarkAsRead(notification.id)}
                  >
                    <div className="flex items-start space-x-3">
                      <span className="text-2xl">{getNotificationIcon(notification.type)}</span>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-white font-medium text-sm">{notification.title}</h4>
                        <p className="text-gray-400 text-sm mt-1">{notification.message}</p>
                        <p className="text-gray-500 text-xs mt-2">{formatTimeAgo(notification.timestamp)}</p>
                      </div>
                      {!notification.read && (
                        <div className="w-2 h-2 bg-[#4a90e2] rounded-full flex-shrink-0 mt-2" />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {state.notifications.length > 0 && state.unreadCount > 0 && (
            <div className="p-4 border-t border-[#4a90e2]/20">
              <button
                onClick={handleMarkAllAsRead}
                className="w-full py-2 px-4 bg-[#4a90e2] hover:bg-[#5a9ff2] text-white rounded-lg text-sm transition-colors"
              >
                Mark All as Read
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};