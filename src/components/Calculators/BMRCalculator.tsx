import React, { useState, useEffect } from 'react';
import { useUser } from '../../contexts/UserContext';
import { calculateBMR } from '../../utils/calculations';

export const BMRCalculator: React.FC = () => {
  const { state } = useUser();
  const [age, setAge] = useState<number>(0);
  const [weight, setWeight] = useState<number>(0);
  const [height, setHeight] = useState<number>(0);
  const [heightFeet, setHeightFeet] = useState<number>(0);
  const [heightInches, setHeightInches] = useState<number>(0);
  const [gender, setGender] = useState<string>('male');
  const [weightUnit, setWeightUnit] = useState<'lbs' | 'kg'>('lbs');
  const [heightUnit, setHeightUnit] = useState<'ft' | 'cm'>('ft');
  const [bmr, setBmr] = useState<number>(0);

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
    }
  }, []);

  // Calculate BMR in real-time
  useEffect(() => {
    if (age && weight && (height || (heightFeet && heightInches !== null)) && gender) {
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
      setBmr(calculatedBMR);
      
      // Save to user profile
      const savedProfile = localStorage.getItem('fitRPG-user-data');
      if (savedProfile) {
        const profile = JSON.parse(savedProfile);
        profile.calculatedValues = {
          ...profile.calculatedValues,
          bmr: Math.round(calculatedBMR)
        };
        localStorage.setItem('fitRPG-user-data', JSON.stringify(profile));
      }
    }
  }, [age, weight, height, heightFeet, heightInches, gender, weightUnit, heightUnit]);

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-white mb-2">BMR Calculator</h2>
        <p className="text-gray-400">Calculate your Basal Metabolic Rate - calories burned at rest</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Inputs */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Age</label>
            <input
              type="number"
              value={age || ''}
              onChange={(e) => setAge(parseInt(e.target.value) || 0)}
              className="w-full px-4 py-3 bg-[#0a0e27] border border-[#4a90e2]/20 rounded-lg text-white focus:outline-none focus:border-[#4a90e2]"
              placeholder="Enter age"
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
                placeholder="Weight"
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
            <label className="block text-sm font-medium text-gray-300 mb-2">Height</label>
            <div className="flex space-x-2">
              {heightUnit === 'ft' ? (
                <>
                  <input
                    type="number"
                    value={heightFeet || ''}
                    onChange={(e) => setHeightFeet(parseInt(e.target.value) || 0)}
                    className="flex-1 px-4 py-3 bg-[#0a0e27] border border-[#4a90e2]/20 rounded-lg text-white focus:outline-none focus:border-[#4a90e2]"
                    placeholder="Feet"
                  />
                  <input
                    type="number"
                    value={heightInches || ''}
                    onChange={(e) => setHeightInches(parseInt(e.target.value) || 0)}
                    className="flex-1 px-4 py-3 bg-[#0a0e27] border border-[#4a90e2]/20 rounded-lg text-white focus:outline-none focus:border-[#4a90e2]"
                    placeholder="Inches"
                  />
                </>
              ) : (
                <input
                  type="number"
                  value={height || ''}
                  onChange={(e) => setHeight(parseFloat(e.target.value) || 0)}
                  className="flex-1 px-4 py-3 bg-[#0a0e27] border border-[#4a90e2]/20 rounded-lg text-white focus:outline-none focus:border-[#4a90e2]"
                  placeholder="Height in cm"
                />
              )}
              <select
                value={heightUnit}
                onChange={(e) => setHeightUnit(e.target.value as 'ft' | 'cm')}
                className="px-4 py-3 bg-[#0a0e27] border border-[#4a90e2]/20 rounded-lg text-white focus:outline-none focus:border-[#4a90e2]"
              >
                <option value="ft">ft/in</option>
                <option value="cm">cm</option>
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

        {/* Results */}
        <div className="bg-[#0a0e27] rounded-lg p-6 border border-[#4a90e2]/20">
          <h3 className="text-xl font-semibold text-white mb-4">Your BMR</h3>
          
          <div className="text-center mb-6">
            <div className="text-4xl font-bold text-[#4a90e2] mb-2">
              {Math.round(bmr)} <span className="text-lg text-gray-400">cal/day</span>
            </div>
            <p className="text-gray-400 text-sm">Calories burned at complete rest</p>
          </div>

          <div className="space-y-3">
            <div className="bg-[#1a1f3a] rounded-lg p-4">
              <h4 className="text-white font-medium mb-2">💡 What this means:</h4>
              <p className="text-gray-300 text-sm">
                Your body burns {Math.round(bmr)} calories per day just to maintain basic functions 
                like breathing, circulation, and cell production.
              </p>
            </div>

            <div className="bg-[#1a1f3a] rounded-lg p-4">
              <h4 className="text-white font-medium mb-2">🎯 Next Steps:</h4>
              <p className="text-gray-300 text-sm">
                Calculate your TDEE to see how many calories you burn with daily activities and exercise.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};