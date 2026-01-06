import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface StyleSelectorProps {
  label: string;
  options: readonly string[];
  currentValue: string;
  onChange: (value: string) => void;
  formatLabel?: (value: string) => string;
}

export const StyleSelector: React.FC<StyleSelectorProps> = ({
  label,
  options,
  currentValue,
  onChange,
  formatLabel = (value) => value.charAt(0).toUpperCase() + value.slice(1),
}) => {
  const currentIndex = options.indexOf(currentValue as any);
  
  const goToPrevious = () => {
    const newIndex = currentIndex > 0 ? currentIndex - 1 : options.length - 1;
    onChange(options[newIndex]);
  };
  
  const goToNext = () => {
    const newIndex = currentIndex < options.length - 1 ? currentIndex + 1 : 0;
    onChange(options[newIndex]);
  };

  return (
    <div className="flex items-center justify-between bg-[#1a1f3a] rounded-lg p-4 border border-[#4a90e2]/20">
      <span className="text-gray-300 font-medium min-w-0 flex-shrink-0">{label}:</span>
      
      <div className="flex items-center space-x-3 ml-4">
        <button
          onClick={goToPrevious}
          className="p-2 rounded-lg bg-[#4a90e2]/20 hover:bg-[#4a90e2]/30 text-[#4a90e2] transition-colors"
          aria-label="Previous option"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
        
        <span className="text-white font-semibold min-w-[100px] text-center">
          {formatLabel(currentValue)}
        </span>
        
        <button
          onClick={goToNext}
          className="p-2 rounded-lg bg-[#4a90e2]/20 hover:bg-[#4a90e2]/30 text-[#4a90e2] transition-colors"
          aria-label="Next option"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};