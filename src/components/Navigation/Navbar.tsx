import React from 'react';
import { Shield } from 'lucide-react';
import { useUser } from '../../contexts/UserContext';
import { Avatar } from '../Avatar/Avatar';
import { NotificationBell } from '../Notifications/NotificationBell';

export const Navbar: React.FC = () => {
  const { state } = useUser();
  
  // Load avatar config from localStorage if available
  const avatarConfig = React.useMemo(() => {
    try {
      const saved = localStorage.getItem('fitRPG-avatar-config');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  }, []);

  return (
    <nav className="bg-[#0a0e27] border-b border-[#1a1f3a] px-4 py-3">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center space-x-3">
          <Shield className="w-8 h-8 text-[#4a90e2]" />
          <h1 className="text-xl font-bold text-white">FitRPG</h1>
        </div>

        {/* Level & XP Display */}
        <div className="flex items-center space-x-4">
          <div className="hidden sm:flex items-center space-x-2">
            <span className="text-[#ffd700] font-semibold">
              Level {state.profile.level}
            </span>
            <div className="w-24 bg-[#1a1f3a] rounded-full h-2 overflow-hidden">
              <div
                className="bg-gradient-to-r from-[#4a90e2] to-[#ffd700] h-full transition-all duration-300"
                style={{
                  width: `${(state.profile.currentXP / state.profile.xpToNextLevel) * 100}%`,
                }}
              />
            </div>
            <span className="text-gray-300 text-sm">
              {state.profile.currentXP}/{state.profile.xpToNextLevel} XP
            </span>
          </div>
          <NotificationBell />
          <div className="flex items-center">
            {avatarConfig ? (
              <Avatar config={avatarConfig} size="small" />
            ) : (
              <div className="text-2xl">{state.profile.avatar}</div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};