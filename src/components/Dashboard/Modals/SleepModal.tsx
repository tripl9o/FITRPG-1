import React, { useState } from 'react';
import { X, Moon } from 'lucide-react';

interface SleepModalProps {
  onClose: () => void;
  onSubmit: (hours: number) => void;
}

export const SleepModal: React.FC<SleepModalProps> = ({ onClose, onSubmit }) => {
  const [hours, setHours] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const hoursNum = parseFloat(hours);
    if (hoursNum > 0 && hoursNum <= 24) {
      onSubmit(hoursNum);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-[#1a1f3a] rounded-xl p-6 w-full max-w-md border border-[#4a90e2]/20">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <Moon className="w-6 h-6 text-[#4a90e2]" />
            <h2 className="text-xl font-bold text-white">Log Sleep</h2>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Hours slept last night:
            </label>
            <input
              type="number"
              min="0"
              max="24"
              step="0.5"
              value={hours}
              onChange={(e) => setHours(e.target.value)}
              className="w-full px-4 py-3 bg-[#0a0e27] border border-[#4a90e2]/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-[#4a90e2] transition-colors"
              placeholder="e.g., 7.5"
              required
            />
          </div>

          <div className="flex space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-3 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-3 bg-[#4a90e2] hover:bg-[#5a9ff2] text-white rounded-lg transition-colors"
            >
              Log Sleep
            </button>
          </div>
        </form>

        <div className="mt-4 p-3 bg-[#0a0e27] rounded-lg">
          <p className="text-gray-400 text-sm">
            💡 <strong>Tip:</strong> Adults need 7-9 hours of sleep for optimal recovery and performance!
          </p>
        </div>
      </div>
    </div>
  );
};