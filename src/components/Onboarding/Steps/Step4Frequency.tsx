import React from 'react';
import { Calendar } from 'lucide-react';
import { OnboardingData } from '../../../types/onboarding';

interface Step4Props {
  data: OnboardingData;
  updateData: (updates: Partial<OnboardingData>) => void;
}

const frequencies = [3, 4, 5, 6] as const;

export const Step4Frequency: React.FC<Step4Props> = ({ data, updateData }) => {
  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <Calendar className="w-16 h-16 text-[#4a90e2] mx-auto mb-4" />
        <h2 className="text-3xl font-bold text-white mb-4">How many days per week can you train?</h2>
        <p className="text-gray-400">Be realistic - consistency is more important than frequency</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
        {frequencies.map((days) => (
          <button
            key={days}
            onClick={() => updateData({ trainingFrequency: days })}
            className={`
              p-6 rounded-xl border-2 transition-all duration-200 transform hover:scale-105
              ${data.trainingFrequency === days
                ? 'border-[#4a90e2] bg-[#4a90e2]/10 shadow-lg shadow-[#4a90e2]/20'
                : 'border-[#1a1f3a] bg-[#1a1f3a] hover:border-[#4a90e2]/50 hover:bg-[#4a90e2]/5'
              }
            `}
          >
            <div className="text-center">
              <div className={`text-3xl font-bold mb-2 ${
                data.trainingFrequency === days ? 'text-[#4a90e2]' : 'text-gray-300'
              }`}>
                {days}
              </div>
              <div className={`text-sm ${
                data.trainingFrequency === days ? 'text-white' : 'text-gray-400'
              }`}>
                {days === 1 ? 'day' : 'days'}
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};