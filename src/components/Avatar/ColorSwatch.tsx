import React from 'react';

interface ColorSwatchProps {
  color: string;
  name: string;
  isSelected: boolean;
  onClick: () => void;
}

export const ColorSwatch: React.FC<ColorSwatchProps> = ({
  color,
  name,
  isSelected,
  onClick,
}) => {
  return (
    <button
      onClick={onClick}
      className={`
        w-10 h-10 rounded-full border-2 transition-all duration-200 transform hover:scale-110
        ${isSelected 
          ? 'border-[#ffd700] shadow-lg shadow-[#ffd700]/30 scale-110' 
          : 'border-gray-600 hover:border-[#4a90e2]'
        }
      `}
      style={{ backgroundColor: color }}
      title={name}
      aria-label={`Select ${name} color`}
    >
      {isSelected && (
        <div className="w-full h-full rounded-full border-2 border-white/50" />
      )}
    </button>
  );
};