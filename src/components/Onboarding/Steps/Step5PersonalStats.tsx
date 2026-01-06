import React from 'react';
import { User } from 'lucide-react';
import { OnboardingData } from '../../../types/onboarding';

interface Step5Props {
  data: OnboardingData;
  updateData: (updates: Partial<OnboardingData>) => void;
}

export const Step5PersonalStats: React.FC<Step5Props> = ({ data, updateData }) => {
  const updatePersonalStats = (updates: Partial<OnboardingData['personalStats']>) => {
    updateData({
      personalStats: {
        ...data.personalStats,
        ...updates,
      },
    });
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <User className="w-16 h-16 text-[#4a90e2] mx-auto mb-4" />
        <h2 className="text-3xl font-bold text-white mb-4">Tell us about yourself</h2>
        <p className="text-gray-400">This information helps us calculate your personalized nutrition goals</p>
      </div>

      <div className="max-w-2xl mx-auto space-y-6">
        {/* Age */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Age</label>
          <input
            type="number"
            min="13"
            max="100"
            value={data.personalStats.age || ''}
            onChange={(e) => updatePersonalStats({ age: parseInt(e.target.value) || null })}
            className="w-full px-4 py-3 bg-[#1a1f3a] border border-[#4a90e2]/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-[#4a90e2] transition-colors"
            placeholder="Enter your age"
          />
        </div>

        {/* Weight */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Weight</label>
          <div className="flex space-x-2">
            <input
              type="number"
              min="50"
              max="500"
              value={data.personalStats.weight || ''}
              onChange={(e) => updatePersonalStats({ weight: parseFloat(e.target.value) || null })}
              className="flex-1 px-4 py-3 bg-[#1a1f3a] border border-[#4a90e2]/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-[#4a90e2] transition-colors"
              placeholder="Enter weight"
            />
            <select
              value={data.personalStats.weightUnit}
              onChange={(e) => updatePersonalStats({ weightUnit: e.target.value as 'lbs' | 'kg' })}
              className="px-4 py-3 bg-[#1a1f3a] border border-[#4a90e2]/20 rounded-lg text-white focus:outline-none focus:border-[#4a90e2] transition-colors"
            >
              <option value="lbs">lbs</option>
              <option value="kg">kg</option>
            </select>
          </div>
        </div>

        {/* Height */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Height</label>
          <div className="flex space-x-2">
            {data.personalStats.heightUnit === 'ft' ? (
              <>
                <input
                  type="number"
                  min="3"
                  max="8"
                  value={data.personalStats.heightFeet || ''}
                  onChange={(e) => updatePersonalStats({ heightFeet: parseInt(e.target.value) || null })}
                  className="flex-1 px-4 py-3 bg-[#1a1f3a] border border-[#4a90e2]/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-[#4a90e2] transition-colors"
                  placeholder="Feet"
                />
                <input
                  type="number"
                  min="0"
                  max="11"
                  value={data.personalStats.heightInches || ''}
                  onChange={(e) => updatePersonalStats({ heightInches: parseInt(e.target.value) || null })}
                  className="flex-1 px-4 py-3 bg-[#1a1f3a] border border-[#4a90e2]/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-[#4a90e2] transition-colors"
                  placeholder="Inches"
                />
              </>
            ) : (
              <input
                type="number"
                min="100"
                max="250"
                value={data.personalStats.height || ''}
                onChange={(e) => updatePersonalStats({ height: parseFloat(e.target.value) || null })}
                className="flex-1 px-4 py-3 bg-[#1a1f3a] border border-[#4a90e2]/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-[#4a90e2] transition-colors"
                placeholder="Enter height in cm"
              />
            )}
            <select
              value={data.personalStats.heightUnit}
              onChange={(e) => updatePersonalStats({ 
                heightUnit: e.target.value as 'ft' | 'cm',
                height: null,
                heightFeet: null,
                heightInches: null,
              })}
              className="px-4 py-3 bg-[#1a1f3a] border border-[#4a90e2]/20 rounded-lg text-white focus:outline-none focus:border-[#4a90e2] transition-colors"
            >
              <option value="ft">ft/in</option>
              <option value="cm">cm</option>
            </select>
          </div>
        </div>

        {/* Gender */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Gender</label>
          <select
            value={data.personalStats.gender || ''}
            onChange={(e) => updatePersonalStats({ gender: e.target.value as any })}
            className="w-full px-4 py-3 bg-[#1a1f3a] border border-[#4a90e2]/20 rounded-lg text-white focus:outline-none focus:border-[#4a90e2] transition-colors"
          >
            <option value="">Select gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
            <option value="prefer-not-to-say">Prefer not to say</option>
          </select>
        </div>

        {/* Activity Level */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Activity Level</label>
          <select
            value={data.personalStats.activityLevel || ''}
            onChange={(e) => updatePersonalStats({ activityLevel: e.target.value as any })}
            className="w-full px-4 py-3 bg-[#1a1f3a] border border-[#4a90e2]/20 rounded-lg text-white focus:outline-none focus:border-[#4a90e2] transition-colors"
          >
            <option value="">Select activity level</option>
            <option value="sedentary">Sedentary (little/no exercise)</option>
            <option value="lightly-active">Lightly Active (1-3 days/week)</option>
            <option value="moderately-active">Moderately Active (3-5 days/week)</option>
            <option value="very-active">Very Active (6-7 days/week)</option>
            <option value="extremely-active">Extremely Active (athlete/physical job)</option>
          </select>
        </div>
      </div>
    </div>
  );
};