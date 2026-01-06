import React from 'react';
import { AvatarConfig } from '../../types/avatar';

interface AvatarProps {
  config: AvatarConfig;
  size?: 'small' | 'medium' | 'large';
  className?: string;
}

export const Avatar: React.FC<AvatarProps> = ({ 
  config, 
  size = 'medium',
  className = '' 
}) => {
  const sizeClasses = {
    small: 'w-16 h-16',
    medium: 'w-24 h-24',
    large: 'w-48 h-48',
  };

  return (
    <div className={`${sizeClasses[size]} ${className} relative`}>
      <svg
        viewBox="0 0 200 200"
        className="w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Background Circle */}
        <circle
          cx="100"
          cy="100"
          r="95"
          fill="url(#backgroundGradient)"
          stroke="#4a90e2"
          strokeWidth="3"
        />
        
        {/* Gradient Definitions */}
        <defs>
          <radialGradient id="backgroundGradient" cx="50%" cy="30%">
            <stop offset="0%" stopColor="#1a1f3a" />
            <stop offset="100%" stopColor="#0a0e27" />
          </radialGradient>
        </defs>

        {/* Body/Base */}
        <ellipse
          cx="100"
          cy="140"
          rx="35"
          ry="45"
          fill={config.skinTone}
          stroke="#333"
          strokeWidth="1"
        />

        {/* Head */}
        <circle
          cx="100"
          cy="80"
          r="30"
          fill={config.skinTone}
          stroke="#333"
          strokeWidth="1"
        />

        {/* Hair */}
        {config.hairStyle !== 'bald' && (
          <g>
            {config.hairStyle === 'short' && (
              <path
                d="M 70 65 Q 100 50 130 65 Q 130 75 125 80 Q 100 70 75 80 Q 70 75 70 65"
                fill={config.hairColor}
                stroke="#333"
                strokeWidth="1"
              />
            )}
            {config.hairStyle === 'long' && (
              <path
                d="M 65 65 Q 100 45 135 65 Q 135 85 130 95 Q 125 105 120 110 Q 100 70 80 110 Q 75 105 70 95 Q 65 85 65 65"
                fill={config.hairColor}
                stroke="#333"
                strokeWidth="1"
              />
            )}
            {config.hairStyle === 'spiky' && (
              <g>
                <path
                  d="M 75 65 L 80 45 L 85 65"
                  fill={config.hairColor}
                  stroke="#333"
                  strokeWidth="1"
                />
                <path
                  d="M 90 60 L 95 40 L 100 60"
                  fill={config.hairColor}
                  stroke="#333"
                  strokeWidth="1"
                />
                <path
                  d="M 105 60 L 110 40 L 115 60"
                  fill={config.hairColor}
                  stroke="#333"
                  strokeWidth="1"
                />
                <path
                  d="M 120 65 L 125 45 L 130 65"
                  fill={config.hairColor}
                  stroke="#333"
                  strokeWidth="1"
                />
              </g>
            )}
            {config.hairStyle === 'ponytail' && (
              <g>
                <path
                  d="M 70 65 Q 100 50 130 65 Q 130 75 125 80 Q 100 70 75 80 Q 70 75 70 65"
                  fill={config.hairColor}
                  stroke="#333"
                  strokeWidth="1"
                />
                <ellipse
                  cx="135"
                  cy="85"
                  rx="8"
                  ry="15"
                  fill={config.hairColor}
                  stroke="#333"
                  strokeWidth="1"
                />
              </g>
            )}
          </g>
        )}

        {/* Eyes */}
        <circle cx="90" cy="75" r="3" fill="#333" />
        <circle cx="110" cy="75" r="3" fill="#333" />
        <circle cx="91" cy="74" r="1" fill="#fff" />
        <circle cx="111" cy="74" r="1" fill="#fff" />

        {/* Nose */}
        <line x1="100" y1="80" x2="100" y2="85" stroke="#333" strokeWidth="1" />

        {/* Mouth */}
        <path d="M 95 90 Q 100 95 105 90" stroke="#333" strokeWidth="1.5" fill="none" />

        {/* Outfit */}
        {config.outfit === 'athletic' && (
          <g>
            {/* T-shirt */}
            <rect
              x="75"
              y="110"
              width="50"
              height="40"
              fill={config.outfitColor}
              stroke="#333"
              strokeWidth="1"
              rx="5"
            />
            {/* Shorts */}
            <rect
              x="80"
              y="150"
              width="40"
              height="25"
              fill="#333"
              stroke="#333"
              strokeWidth="1"
              rx="3"
            />
          </g>
        )}
        
        {config.outfit === 'casual' && (
          <g>
            {/* Hoodie */}
            <rect
              x="70"
              y="110"
              width="60"
              height="45"
              fill={config.outfitColor}
              stroke="#333"
              strokeWidth="1"
              rx="8"
            />
            {/* Hood outline */}
            <path
              d="M 75 110 Q 100 100 125 110"
              stroke="#333"
              strokeWidth="1"
              fill="none"
            />
            {/* Pants */}
            <rect
              x="75"
              y="155"
              width="50"
              height="30"
              fill="#2d3748"
              stroke="#333"
              strokeWidth="1"
              rx="3"
            />
          </g>
        )}
        
        {config.outfit === 'warrior' && (
          <g>
            {/* Tank top */}
            <rect
              x="80"
              y="110"
              width="40"
              height="35"
              fill={config.outfitColor}
              stroke="#333"
              strokeWidth="1"
              rx="3"
            />
            {/* Tactical pants */}
            <rect
              x="75"
              y="145"
              width="50"
              height="35"
              fill="#4a5568"
              stroke="#333"
              strokeWidth="1"
              rx="3"
            />
            {/* Cargo pockets */}
            <rect x="78" y="155" width="8" height="8" fill="#2d3748" rx="1" />
            <rect x="114" y="155" width="8" height="8" fill="#2d3748" rx="1" />
          </g>
        )}

        {/* Arms */}
        <ellipse
          cx="65"
          cy="125"
          rx="8"
          ry="20"
          fill={config.skinTone}
          stroke="#333"
          strokeWidth="1"
        />
        <ellipse
          cx="135"
          cy="125"
          rx="8"
          ry="20"
          fill={config.skinTone}
          stroke="#333"
          strokeWidth="1"
        />

        {/* Legs */}
        <ellipse
          cx="85"
          cy="180"
          rx="8"
          ry="15"
          fill={config.skinTone}
          stroke="#333"
          strokeWidth="1"
        />
        <ellipse
          cx="115"
          cy="180"
          rx="8"
          ry="15"
          fill={config.skinTone}
          stroke="#333"
          strokeWidth="1"
        />
      </svg>
    </div>
  );
};