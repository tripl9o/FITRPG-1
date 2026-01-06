import React from 'react';
import { Calendar } from 'lucide-react';

interface TimeRangeFilterProps {
  selectedRange: 'today' | 'week' | 'month' | 'all';
  onRangeChange: (range: 'today' | 'week' | 'month' | 'all') => void;
}

export const TimeRangeFilter: React.FC<TimeRangeFilterProps> = ({
  selectedRange,
  onRangeChange,
}) => {
  const ranges = [
    { value: 'today' as const, label: 'Today' },
    { value: 'week' as const, label: 'Week' },
    { value: 'month' as const, label: 'Month' },
    { value: 'all' as const, label: 'All Time' },
  ];

  return (
    <div className="bg-[#1a1f3a] rounded-xl p-4 border border-[#4a90e2]/20 mb-6 sticky top-4 z-10">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Calendar className="w-5 h-5 text-[#4a90e2]" />
          <span className="text-white font-medium">Time Range:</span>
        </div>
        <div className="flex space-x-1 bg-[#0a0e27] rounded-lg p-1">
          {ranges.map((range) => (
            <button
              key={range.value}
              onClick={() => onRangeChange(range.value)}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                selectedRange === range.value
                  ? 'bg-[#4a90e2] text-white shadow-lg'
                  : 'text-gray-400 hover:text-white hover:bg-[#4a90e2]/20'
              }`}
            >
              {range.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};