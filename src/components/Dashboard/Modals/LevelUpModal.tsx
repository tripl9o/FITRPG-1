import React, { useEffect, useState } from 'react';
import { Sparkles, Star } from 'lucide-react';

interface LevelUpModalProps {
  newLevel: number;
  onClose: () => void;
}

export const LevelUpModal: React.FC<LevelUpModalProps> = ({ newLevel, onClose }) => {
  const [showAnimation, setShowAnimation] = useState(false);

  useEffect(() => {
    setShowAnimation(true);
    const timer = setTimeout(() => {
      setShowAnimation(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
      <div className="text-center">
        {/* Animated Background */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className={`absolute w-2 h-2 bg-[#ffd700] rounded-full animate-ping ${
                showAnimation ? 'opacity-100' : 'opacity-0'
              }`}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${1 + Math.random()}s`,
              }}
            />
          ))}
        </div>

        {/* Main Content */}
        <div className="relative z-10">
          <div className={`transform transition-all duration-1000 ${
            showAnimation ? 'scale-110' : 'scale-100'
          }`}>
            <Sparkles className="w-24 h-24 text-[#ffd700] mx-auto mb-4 animate-pulse" />
          </div>
          
          <h1 className={`text-6xl font-bold text-white mb-4 transform transition-all duration-1000 ${
            showAnimation ? 'scale-125' : 'scale-100'
          }`}>
            LEVEL UP!
          </h1>
          
          <div className="bg-gradient-to-r from-[#4a90e2] to-[#ffd700] text-transparent bg-clip-text">
            <h2 className="text-4xl font-bold mb-6">
              Level {newLevel}
            </h2>
          </div>

          <div className="bg-[#1a1f3a] rounded-xl p-6 border border-[#ffd700]/30 mb-6 max-w-md mx-auto">
            <h3 className="text-xl font-semibold text-white mb-4">Stats Increased!</h3>
            <div className="space-y-2 text-left">
              <div className="flex items-center justify-between">
                <span className="text-gray-300">All Stats:</span>
                <span className="text-green-400 font-semibold">+1</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-300">Bonus Stat:</span>
                <span className="text-[#ffd700] font-semibold">+2</span>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-center space-x-2 mb-8">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-6 h-6 ${
                  i < newLevel ? 'text-[#ffd700] fill-current' : 'text-gray-600'
                } ${showAnimation ? 'animate-pulse' : ''}`}
                style={{ animationDelay: `${i * 0.2}s` }}
              />
            ))}
          </div>

          <button
            onClick={onClose}
            className="px-8 py-4 bg-gradient-to-r from-[#4a90e2] to-[#ffd700] text-white font-bold rounded-xl text-lg transform hover:scale-105 transition-all duration-200 shadow-lg"
          >
            Continue Your Journey
          </button>
        </div>
      </div>
    </div>
  );
};