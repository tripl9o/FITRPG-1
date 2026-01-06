import React from 'react';
import { Video as LucideIcon } from 'lucide-react';

interface OptionCardProps {
  icon: LucideIcon;
  title: string;
  description?: string;
  isSelected: boolean;
  onClick: () => void;
  className?: string;
}

export const OptionCard: React.FC<OptionCardProps> = ({
  icon: Icon,
  title,
  description,
  isSelected,
  onClick,
  className = '',
}) => {
  return (
    <button
      onClick={onClick}
      className={`
        w-full p-6 rounded-xl border-2 transition-all duration-200 transform hover:scale-105
        ${isSelected 
          ? 'border-[#4a90e2] bg-[#4a90e2]/10 shadow-lg shadow-[#4a90e2]/20' 
          : 'border-[#1a1f3a] bg-[#1a1f3a] hover:border-[#4a90e2]/50 hover:bg-[#4a90e2]/5'
        }
        ${className}
      `}
    >
      <div className="flex flex-col items-center text-center space-y-3">
        <Icon className={`w-12 h-12 ${isSelected ? 'text-[#4a90e2]' : 'text-gray-400'}`} />
        <h3 className={`text-lg font-semibold ${isSelected ? 'text-white' : 'text-gray-300'}`}>
          {title}
        </h3>
        {description && (
          <p className={`text-sm ${isSelected ? 'text-gray-200' : 'text-gray-400'}`}>
            {description}
          </p>
        )}
      </div>
    </button>
  );
};