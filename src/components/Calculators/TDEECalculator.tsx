import React, { useState, useEffect } from 'react';
import { useUser } from '../../contexts/UserContext';
import { calculateBMR, calculateTDEE } from '../../utils/calculations';

export const TDEECalculator: React.FC = () => {
  const { state } = useUser();
  const [age, setAge] = useState<number>(0);
  const [weight, setWeight] = useState<number>(0);
  const [height, setHeight] = useState<number>(0);
  const [heightFeet, setHeightFeet] = useState<number>(0);
  const [heightInches, setHeightInches] = useState<number>(0);
  const [gender, setGender] = useState<string>('male');
  const [weightUnit, setWeightUnit] = useState<'lbs' | 'kg'>('lbs');
  const [heightUnit, setHeightUnit] = useState<'ft' | 'cm'>('ft');
  const [activityLevel, setActivityLevel] = useState<string>('moderately-active');
  const [bmr, setBmr] = useState<number>(0);
  const [tdee, setTdee] = useState<number>(0);

  // Pre-fill with user data
  useEffect(() => {
    const onboardingData = localStorage.getItem('fitRPG-onboarding-data');
    if (onboardingData) {
      const data = JSON.parse(onboardingData);
      const stats = data.personalStats;
      
      setAge(stats.age || 25);
      setWeight(stats.weight || 150);
      setHeight(stats.height || 70);
      setHeightFeet(stats.heightFeet || 5);
      setHeightInches(stats.heightInches || 10);
      setGender(stats.gender || 'male');
      setWeightUnit(stats.weightUnit || 'lbs');
      setHeightUnit(stats.heightUnit || 'ft');
      setActivityLevel(stats.activityLevel || 'moderately-active');
    }
  }, []);

  // Calculate TDEE in real-time
  useEffect(() => {
    if (age && weight && (height || (heightFeet && heightInches !== null)) && gender && activityLevel) {
      const calculatedBMR = calculateBMR(
        weight,
        height,
        age,
        gender,
        weightUnit,
        heightUnit,
        heightFeet,
        heightInches
      );
      const calculatedTDEE = calculateTDEE(calculatedBMR, activityLevel);
      
      setBmr(calculatedBMR);
      setTdee(calculatedTDEE);
      
      // Save to user profile
      const savedProfile = localStorage.getItem('fitRPG-user-data');
      if (savedProfile) {
        const profile = JSON.parse(savedProfile);
        profile.calculatedValues = {
          ...profile.calculatedValues,
          bmr: Math.round(calculatedBMR),
          tdee: Math.round(calculatedTDEE)
        };
        localStorage.setItem('fitRPG-user-data', JSON.stringify(profile));
      }
    }
  }, [age, weight, height, heightFeet, heightInches, gender, weightUnit, heightUnit, activityLevel]);

  const activityLevels = [
    { value: 'sedentary', label: 'Sedentary', description: 'Little/no exercise', multiplier: 1.2 },
    { value: 'lightly-active', label: 'Lightly Active', description: '1-3 days/week', multiplier: 1.375 },
    { value: 'moderately-active', label: 'Moderately Active', description: '3-5 days/week', multiplier: 1.55 },
    { value: 'very-active', label: 'Very Active', description: '6-7 days/week', multiplier: 1.725 },
    { value: 'extremely-active', label: 'Extremely Active', description: 'Athlete/physical job', multiplier: 1.9 },
  ];

  const selectedActivity = activityLevels.find(level => level.value === activityLevel);

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-white mb-2">TDEE Calculator</h2>
        <p className="text-gray-400">Total Daily Energy Expenditure - calories burned including activity</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Basic Info */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-white">Basic Information</h3>
          
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Age</label>
            <input
              type="number"
              value={age || ''}
              onChange={(e) => setAge(parseInt(e.target.value) || 0)}
              className="w-full px-4 py-3 bg-[#0a0e27] border border-[#4a90e2]/20 rounded-lg text-white focus:outline-none focus:border-[#4a90e2]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Weight</label>
            <div className="flex space-x-2">
              <input
                type="number"
                value={weight || ''}
                onChange={(e) => setWeight(parseFloat(e.target.value) || 0)}
                className="flex-1 px-4 py-3 bg-[#0a0e27] border border-[#4a90e2]/20 rounded-lg text-white focus:outline-none focus:border-[#4a90e2]"
              />
              <select
                value={weightUnit}
                onChange={(e) => setWeightUnit(e.target.value as 'lbs' | 'kg')}
                className="px-4 py-3 bg-[#0a0e27] border border-[#4a90e2]/20 rounded-lg text-white focus:outline-none focus:border-[#4a90e2]"
              >
                <option value="lbs">lbs</option>
                <option value="kg">kg</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Gender</label>
            <select
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              className="w-full px-4 py-3 bg-[#0a0e27] border border-[#4a90e2]/20 rounded-lg text-white focus:outline-none focus:border-[#4a90e2]"
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>
        </div>

        {/* Activity Level */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-white">Activity Level</h3>
          
          <div className="space-y-2">
            {activityLevels.map((level) => (
              <button
                key={level.value}
                onClick={() => setActivityLevel(level.value)}
                className={`w-full p-3 rounded-lg border text-left transition-all duration-200 ${
                  activityLevel === level.value
                    ? 'border-[#4a90e2] bg-[#4a90e2]/10 text-white'
                    : 'border-[#4a90e2]/20 bg-[#0a0e27] text-gray-300 hover:border-[#4a90e2]/40'
                }`}
              >
                <div className="font-medium">{level.label}</div>
                <div className="text-sm text-gray-400">{level.description}</div>
                <div className="text-xs text-[#4a90e2]">BMR × {level.multiplier}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Results */}
        <div className="bg-[#0a0e27] rounded-lg p-6 border border-[#4a90e2]/20">
          <h3 className="text-xl font-semibold text-white mb-4">Your TDEE</h3>
          
          <div className="space-y-4">
            <div className="text-center">
              <div className="text-3xl font-bold text-[#4a90e2] mb-1">
                {Math.round(tdee)} <span className="text-lg text-gray-400">cal/day</span>
              </div>
              <p className="text-gray-400 text-sm">Total daily calories burned</p>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center p-3 bg-[#1a1f3a] rounded-lg">
                <span className="text-gray-300">BMR (at rest):</span>
                <span className="text-white font-semibold">{Math.round(bmr)} cal</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-[#1a1f3a] rounded-lg">
                <span className="text-gray-300">Activity calories:</span>
                <span className="text-[#4a90e2] font-semibold">+{Math.round(tdee - bmr)} cal</span>
              </div>
            </div>

            <div className="bg-[#1a1f3a] rounded-lg p-4">
              <h4 className="text-white font-medium mb-2">💡 What this means:</h4>
              <p className="text-gray-300 text-sm">
                You burn approximately {Math.round(tdee)} calories per day with your current activity level.
              </p>
            </div>

            <div className="bg-[#1a1f3a] rounded-lg p-4">
              <h4 className="text-white font-medium mb-2">🎯 Next Steps:</h4>
              <p className="text-gray-300 text-sm">
                Use this number to calculate your daily calorie needs based on your fitness goals.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};