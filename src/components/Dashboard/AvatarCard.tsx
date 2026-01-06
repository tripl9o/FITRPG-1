import React from 'react';
import { useUser } from '../../contexts/UserContext';
import { Avatar } from '../Avatar/Avatar';

export const AvatarCard: React.FC = () => {
  const { state } = useUser();
  
  // Load avatar config from localStorage
  const avatarConfig = React.useMemo(() => {
    try {
      const saved = localStorage.getItem('fitRPG-avatar-config');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  }, []);

  const progressPercentage = (state.profile.currentXP / state.profile.xpToNextLevel) * 100;

  const StatBar: React.FC<{ label: string; value: number; max: number }> = ({ label, value, max }) => {
    const percentage = (value / max) * 100;
    return (
      <div className="flex items-center justify-between mb-2">
        <span className="text-gray-300 text-sm w-20">{label}:</span>
        <div className="flex-1 mx-3">
          <div className="w-full bg-[#1a1f3a] rounded-full h-2 overflow-hidden">
            <div
              className="bg-gradient-to-r from-[#4a90e2] to-[#6a5acd] h-full transition-all duration-300"
              style={{ width: `${percentage}%` }}
            />
          </div>
        </div>
        <span className="text-gray-400 text-sm w-8">{value}/{max}</span>
      </div>
    );
  };

  return (
    <div className="bg-[#1a1f3a] rounded-xl p-6 border border-[#4a90e2]/20 shadow-lg">
      {/* Avatar Display */}
      <div className="flex justify-center mb-6">
        {avatarConfig ? (
          <Avatar config={avatarConfig} size="large" />
        ) : (
          <div className="w-48 h-48 bg-[#0a0e27] rounded-full flex items-center justify-center text-6xl">
            🏃
          </div>
        )}
      </div>

      {/* Level and XP */}
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-white mb-2">
          Level {state.profile.level} Warrior
        </h2>
        <div className="w-full bg-[#0a0e27] rounded-full h-3 overflow-hidden mb-2">
          <div
            className="bg-gradient-to-r from-[#4a90e2] to-[#ffd700] h-full transition-all duration-500"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
        <p className="text-gray-300 text-sm">
          {state.profile.currentXP}/{state.profile.xpToNextLevel} XP
        </p>
      </div>

      {/* Stats */}
      <div className="space-y-2 mb-6">
        <StatBar label="Mind" value={1} max={10} />
        <StatBar label="Body" value={1} max={10} />
        <StatBar label="Spiritual" value={1} max={10} />
        <StatBar label="Combat" value={1} max={10} />
        <StatBar label="Connection" value={1} max={10} />
      </div>

      {/* Equipment Slots */}
      <div className="grid grid-cols-3 gap-3">
        <div className="bg-[#0a0e27] rounded-lg p-4 border-2 border-dashed border-gray-600 text-center">
          <div className="text-gray-500 text-sm">Weapon</div>
          <div className="text-gray-600 text-xs mt-1">Empty</div>
        </div>
        <div className="bg-[#0a0e27] rounded-lg p-4 border-2 border-dashed border-gray-600 text-center">
          <div className="text-gray-500 text-sm">Armor</div>
          <div className="text-gray-600 text-xs mt-1">Empty</div>
        </div>
        <div className="bg-[#0a0e27] rounded-lg p-4 border-2 border-dashed border-gray-600 text-center">
          <div className="text-gray-500 text-sm">Accessory</div>
          <div className="text-gray-600 text-xs mt-1">Empty</div>
        </div>
      </div>
    </div>
  );
};