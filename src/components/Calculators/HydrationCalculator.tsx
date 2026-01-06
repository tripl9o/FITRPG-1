import React, { useState, useEffect } from 'react';
import { Droplets } from 'lucide-react';

export const HydrationCalculator: React.FC = () => {
  const [weight, setWeight] = useState<number>(150);
  const [weightUnit, setWeightUnit] = useState<'lbs' | 'kg'>('lbs');
  const [activityLevel, setActivityLevel] = useState<string>('moderate');
  const [climate, setClimate] = useState<string>('normal');
  const [waterIntake, setWaterIntake] = useState<number>(0);

  // Pre-fill with user data
  useEffect(() => {
    const onboardingData = localStorage.getItem('fitRPG-onboarding-data');
    if (onboardingData) {
      const data = JSON.parse(onboardingData);
      const stats = data.personalStats;
      
      setWeight(stats.weight || 150);
      setWeightUnit(stats.weightUnit || 'lbs');
      
      // Map activity level
      const activityMap: { [key: string]: string } = {
        'sedentary': 'low',
        'lightly-active': 'low',
        'moderately-active': 'moderate',
        'very-active': 'high',
        'extremely-active': 'high'
      };
      setActivityLevel(activityMap[stats.activityLevel] || 'moderate');
    }
  }, []);

  // Calculate water intake in real-time
  useEffect(() => {
    if (weight) {
      // Convert weight to lbs for calculation
      const weightLbs = weightUnit === 'kg' ? weight * 2.20462 : weight;
      
      // Base calculation: 0.5-1 oz per lb of body weight
      let baseOz = weightLbs * 0.67; // Start with 2/3 oz per lb
      
      // Activity level adjustments
      const activityMultipliers = {
        'low': 1.0,
        'moderate': 1.2,
        'high': 1.5
      };
      baseOz *= activityMultipliers[activityLevel as keyof typeof activityMultipliers];
      
      // Climate adjustments
      const climateMultipliers = {
        'cold': 0.9,
        'normal': 1.0,
        'hot': 1.3,
        'humid': 1.4
      };
      baseOz *= climateMultipliers[climate as keyof typeof climateMultipliers];
      
      setWaterIntake(Math.round(baseOz));
      
      // Save to user profile
      const savedProfile = localStorage.getItem('fitRPG-user-data');
      if (savedProfile) {
        const profile = JSON.parse(savedProfile);
        profile.calculatedValues = {
          ...profile.calculatedValues,
          waterIntake: Math.round(baseOz)
        };
        localStorage.setItem('fitRPG-user-data', JSON.stringify(profile));
      }
    }
  }, [weight, weightUnit, activityLevel, climate]);

  const cups = Math.round(waterIntake / 8); // 8 oz per cup
  const liters = (waterIntake * 0.0295735).toFixed(1); // Convert oz to liters

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-white mb-2">Hydration Calculator</h2>
        <p className="text-gray-400">Calculate your daily water intake needs</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Inputs */}
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Body Weight</label>
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
            <label className="block text-sm font-medium text-gray-300 mb-3">Activity Level</label>
            <div className="space-y-2">
              {[
                { value: 'low', label: 'Low Activity', description: 'Minimal exercise, desk job' },
                { value: 'moderate', label: 'Moderate Activity', description: 'Regular exercise 3-5x/week' },
                { value: 'high', label: 'High Activity', description: 'Intense training, physical job' }
              ].map((level) => (
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
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-3">Climate</label>
            <div className="grid grid-cols-2 gap-2">
              {[
                { value: 'cold', label: 'Cold', icon: '❄️' },
                { value: 'normal', label: 'Normal', icon: '🌤️' },
                { value: 'hot', label: 'Hot', icon: '☀️' },
                { value: 'humid', label: 'Humid', icon: '💧' }
              ].map((climateOption) => (
                <button
                  key={climateOption.value}
                  onClick={() => setClimate(climateOption.value)}
                  className={`p-3 rounded-lg border text-center transition-all duration-200 ${
                    climate === climateOption.value
                      ? 'border-[#4a90e2] bg-[#4a90e2]/10 text-white'
                      : 'border-[#4a90e2]/20 bg-[#0a0e27] text-gray-300 hover:border-[#4a90e2]/40'
                  }`}
                >
                  <div className="text-2xl mb-1">{climateOption.icon}</div>
                  <div className="font-medium">{climateOption.label}</div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="bg-[#0a0e27] rounded-lg p-6 border border-[#4a90e2]/20">
          <div className="text-center mb-6">
            <Droplets className="w-12 h-12 text-[#4a90e2] mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">Daily Water Goal</h3>
          </div>
          
          <div className="space-y-4">
            <div className="text-center">
              <div className="text-4xl font-bold text-[#4a90e2] mb-2">
                {cups} <span className="text-lg text-gray-400">cups</span>
              </div>
              <div className="text-gray-400">
                {waterIntake} oz • {liters} liters
              </div>
            </div>

            <div className="grid grid-cols-8 gap-1 mb-4">
              {Array.from({ length: 8 }).map((_, i) => (
                <div
                  key={i}
                  className="aspect-square bg-[#1a1f3a] rounded-full border-2 border-[#4a90e2]/20 flex items-center justify-center"
                >
                  <Droplets className="w-4 h-4 text-[#4a90e2]/40" />
                </div>
              ))}
            </div>

            <div className="space-y-3">
              <div className="bg-[#1a1f3a] rounded-lg p-4">
                <h4 className="text-white font-medium mb-2">💡 Hydration Tips:</h4>
                <ul className="text-gray-300 text-sm space-y-1">
                  <li>• Start your day with a glass of water</li>
                  <li>• Drink before, during, and after workouts</li>
                  <li>• Monitor urine color (pale yellow is ideal)</li>
                  <li>• Increase intake in hot weather or when sick</li>
                </ul>
              </div>

              <div className="bg-[#1a1f3a] rounded-lg p-4">
                <h4 className="text-white font-medium mb-2">🎯 Track Your Progress:</h4>
                <p className="text-gray-300 text-sm">
                  Use the daily water quest on your dashboard to track your hydration throughout the day.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};