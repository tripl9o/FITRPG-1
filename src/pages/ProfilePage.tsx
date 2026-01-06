import React from 'react';
import { User, Settings } from 'lucide-react';
import { NotificationSettings } from '../components/Notifications/NotificationSettings';

export const ProfilePage: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-white">Profile</h1>
        <User className="w-8 h-8 text-[#ffd700]" />
      </div>
      
      <div className="space-y-6">
        {/* Profile Overview */}
        <div className="bg-[#1a1f3a] rounded-lg p-8 border border-[#4a90e2]/20 text-center">
          <User className="w-16 h-16 text-[#4a90e2] mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-white mb-2">User Profile</h3>
          <p className="text-gray-400">Avatar customization and achievements coming soon!</p>
        </div>

        {/* Notification Settings */}
        <NotificationSettings />
      </div>
    </div>
  );
};