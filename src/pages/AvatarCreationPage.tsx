import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../contexts/UserContext';
import { Sparkles } from 'lucide-react';
import { Avatar } from '../components/Avatar/Avatar';
import { ColorSwatch } from '../components/Avatar/ColorSwatch';
import { StyleSelector } from '../components/Avatar/StyleSelector';
import { 
  AvatarConfig, 
  HAIR_STYLES, 
  OUTFIT_STYLES, 
  HAIR_COLORS, 
  SKIN_TONES, 
  OUTFIT_COLORS 
} from '../types/avatar';

export const AvatarCreationPage: React.FC = () => {
  const navigate = useNavigate();
  const { dispatch } = useUser();
  
  const [avatarConfig, setAvatarConfig] = useState<AvatarConfig>({
    hairStyle: 'short',
    hairColor: '#4a2511',
    skinTone: '#f5d5c5',
    outfit: 'athletic',
    outfitColor: '#4a90e2',
    equipment: {
      weapon: null,
      armor: null,
      accessory: null,
    },
  });

  const updateAvatarConfig = (updates: Partial<AvatarConfig>) => {
    setAvatarConfig(prev => ({ ...prev, ...updates }));
  };

  const completeSetup = () => {
    // Initialize user stats and save avatar
    const userStats = {
      level: 1,
      xp: 0,
      xpToNextLevel: 100,
      stats: {
        mind: 1,
        body: 1,
        spiritual: 1,
        combat: 1,
        connection: 1,
      },
      gold: 0,
      streak: 0,
    };

    // Save avatar and stats to localStorage
    localStorage.setItem('fitRPG-avatar-config', JSON.stringify(avatarConfig));
    localStorage.setItem('fitRPG-user-stats', JSON.stringify(userStats));
    
    // Update user context
    dispatch({ 
      type: 'SET_PROFILE', 
      payload: {
        name: 'Player', // We'll get this from onboarding later
        level: 1,
        currentXP: 0,
        xpToNextLevel: 100,
        avatar: '🏃', // We'll update this to use the avatar component
        totalXP: 0,
      }
    });
    
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-[#0a0e27] text-white p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center">
          <Sparkles className="w-16 h-16 text-[#ffd700] mx-auto mb-4" />
          <h1 className="text-4xl font-bold mb-2 text-white">Create Your Character</h1>
          <p className="text-gray-400 mb-8">
            Customize your RPG avatar to represent you on your fitness journey
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* Avatar Preview */}
          <div className="bg-[#1a1f3a] rounded-xl p-8 border border-[#4a90e2]/20">
            <h2 className="text-xl font-semibold text-white mb-6 text-center">Preview</h2>
            <div className="flex justify-center">
              <Avatar config={avatarConfig} size="large" />
            </div>
          </div>

          {/* Customization Options */}
          <div className="space-y-6">
            {/* Hair Style */}
            <div className="bg-[#1a1f3a] rounded-xl p-6 border border-[#4a90e2]/20">
              <StyleSelector
                label="Hair Style"
                options={HAIR_STYLES}
                currentValue={avatarConfig.hairStyle}
                onChange={(value) => updateAvatarConfig({ hairStyle: value as any })}
              />
            </div>

            {/* Hair Color */}
            <div className="bg-[#1a1f3a] rounded-xl p-6 border border-[#4a90e2]/20">
              <h3 className="text-gray-300 font-medium mb-4">Hair Color:</h3>
              <div className="grid grid-cols-4 gap-3">
                {HAIR_COLORS.map((color) => (
                  <ColorSwatch
                    key={color.value}
                    color={color.value}
                    name={color.name}
                    isSelected={avatarConfig.hairColor === color.value}
                    onClick={() => updateAvatarConfig({ hairColor: color.value })}
                  />
                ))}
              </div>
            </div>

            {/* Skin Tone */}
            <div className="bg-[#1a1f3a] rounded-xl p-6 border border-[#4a90e2]/20">
              <h3 className="text-gray-300 font-medium mb-4">Skin Tone:</h3>
              <div className="grid grid-cols-3 gap-3">
                {SKIN_TONES.map((tone) => (
                  <ColorSwatch
                    key={tone.value}
                    color={tone.value}
                    name={tone.name}
                    isSelected={avatarConfig.skinTone === tone.value}
                    onClick={() => updateAvatarConfig({ skinTone: tone.value })}
                  />
                ))}
              </div>
            </div>

            {/* Outfit Style */}
            <div className="bg-[#1a1f3a] rounded-xl p-6 border border-[#4a90e2]/20">
              <StyleSelector
                label="Outfit"
                options={OUTFIT_STYLES}
                currentValue={avatarConfig.outfit}
                onChange={(value) => updateAvatarConfig({ outfit: value as any })}
              />
            </div>

            {/* Outfit Color */}
            <div className="bg-[#1a1f3a] rounded-xl p-6 border border-[#4a90e2]/20">
              <h3 className="text-gray-300 font-medium mb-4">Outfit Color:</h3>
              <div className="grid grid-cols-4 gap-3">
                {OUTFIT_COLORS.map((color) => (
                  <ColorSwatch
                    key={color.value}
                    color={color.value}
                    name={color.name}
                    isSelected={avatarConfig.outfitColor === color.value}
                    onClick={() => updateAvatarConfig({ outfitColor: color.value })}
                  />
                ))}
              </div>
            </div>

            {/* Create Character Button */}
            <button
              onClick={completeSetup}
              className="w-full bg-gradient-to-r from-[#4a90e2] to-[#6a5acd] hover:from-[#5a9ff2] hover:to-[#7a6add] 
                       text-white font-bold py-4 px-8 rounded-xl transition-all duration-200 
                       transform hover:scale-105 shadow-lg text-lg"
            >
              <Sparkles className="w-5 h-5 inline mr-2" />
              Create Character
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};