import React, { useState, useEffect } from 'react';
import { useUser } from '../../contexts/UserContext';
import { calculateMacros, calculateAllStats } from '../../utils/calculations';

export const MacroCalculator: React.FC = () => {
  const { state } = useUser();
  const [dailyCalories, setDailyCalories] = useState<number>(2200);
  const [weight, setWeight] = useState<number>(150);
  const [weightUnit, setWeightUnit] = useState<'lbs' | 'kg'>('lbs');
  const [macroSplit, setMacroSplit] = useState<string>('high-protein');
  const [customProtein, setCustomProtein] = useState<number>(40);
  const [customCarbs, setCustomCarbs] = useState<number>(40);
  const [customFat, setCustomFat] = useState<number>(20);
  const [macros, setMacros] = useState({ protein: 0, carbs: 0, fat: 0 });

  // Pre-fill with user data
  useEffect(() => {
    const onboardingData = localStorage.getItem('fitRPG-onboarding-data');
    if (onboardingData) {
      const data = JSON.parse(onboardingData);
      const stats = data.personalStats;
      
      setWeight(stats.weight || 150);
      setWeightUnit(stats.weightUnit || 'lbs');
      
      if (data.calculatedStats) {
        setDailyCalories(data.calculatedStats.recommendedCalories || 2200);
      }
    }
  }, []);

  // Calculate macros in real-time
  useEffect(() => {
    if (dailyCalories && weight) {
      let calculatedMacros;
      
      if (macroSplit === 'custom') {
        // Custom percentages
        const proteinCals = (dailyCalories * customProtein) / 100;
        const carbCals = (dailyCalories * customCarbs) / 100;
        const fatCals = (dailyCalories * customFat) / 100;
        
        calculatedMacros = {
          protein: Math.round(proteinCals / 4),
          carbs: Math.round(carbCals / 4),
          fat: Math.round(fatCals / 9)
        };
      } else {
        // Preset splits
        const splits = {
          'balanced': { protein: 30, carbs: 40, fat: 30 },
          'high-protein': { protein: 40, carbs: 40, fat: 20 },
          'low-carb': { protein: 30, carbs: 20, fat: 50 },
          'keto': { protein: 25, carbs: 5, fat: 70 }
        };
        
        const split = splits[macroSplit as keyof typeof splits];
        const proteinCals = (dailyCalories * split.protein) / 100;
        const carbCals = (dailyCalories * split.carbs) / 100;
        const fatCals = (dailyCalories * split.fat) / 100;
        
        calculatedMacros = {
          protein: Math.round(proteinCals / 4),
          carbs: Math.round(carbCals / 4),
          fat: Math.round(fatCals / 9)
        };
      }
      
      setMacros(calculatedMacros);
      
      // Save to user profile
      const savedProfile = localStorage.getItem('fitRPG-user-data');
      if (savedProfile) {
        const profile = JSON.parse(savedProfile);
        profile.calculatedValues = {
          ...profile.calculatedValues,
          dailyCalories,
          macros: calculatedMacros
        };
        localStorage.setItem('fitRPG-user-data', JSON.stringify(profile));
      }
    }
  }, [dailyCalories, weight, weightUnit, macroSplit, customProtein, customCarbs, customFat]);

  const macroSplits = [
    { value: 'balanced', label: 'Balanced', description: '30% Protein, 40% Carbs, 30% Fat' },
    { value: 'high-protein', label: 'High Protein', description: '40% Protein, 40% Carbs, 20% Fat' },
    { value: 'low-carb', label: 'Low Carb', description: '30% Protein, 20% Carbs, 50% Fat' },
    { value: 'keto', label: 'Keto', description: '25% Protein, 5% Carbs, 70% Fat' },
    { value: 'custom', label: 'Custom', description: 'Set your own percentages' }
  ];

  const getPercentages = () => {
    if (macroSplit === 'custom') {
      return { protein: customProtein, carbs: customCarbs, fat: customFat };
    }
    
    const splits = {
      'balanced': { protein: 30, carbs: 40, fat: 30 },
      'high-protein': { protein: 40, carbs: 40, fat: 20 },
      'low-carb': { protein: 30, carbs: 20, fat: 50 },
      'keto': { protein: 25, carbs: 5, fat: 70 }
    };
    
    return splits[macroSplit as keyof typeof splits] || { protein: 40, carbs: 40, fat: 20 };
  };

  const percentages = getPercentages();

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-white mb-2">Macro Calculator</h2>
        <p className="text-gray-400">Calculate your daily protein, carbs, and fat targets</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Inputs */}
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Daily Calorie Goal</label>
            <input
              type="number"
              value={dailyCalories || ''}
              onChange={(e) => setDailyCalories(parseInt(e.target.value) || 0)}
              className="w-full px-4 py-3 bg-[#0a0e27] border border-[#4a90e2]/20 rounded-lg text-white focus:outline-none focus:border-[#4a90e2]"
              placeholder="e.g., 2200"
            />
            <p className="text-gray-400 text-sm mt-1">Based on your TDEE and goal</p>
          </div>

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
            <label className="block text-sm font-medium text-gray-300 mb-3">Macro Split</label>
            <div className="space-y-2">
              {macroSplits.map((split) => (
                <button
                  key={split.value}
                  onClick={() => setMacroSplit(split.value)}
                  className={`w-full p-3 rounded-lg border text-left transition-all duration-200 ${
                    macroSplit === split.value
                      ? 'border-[#4a90e2] bg-[#4a90e2]/10 text-white'
                      : 'border-[#4a90e2]/20 bg-[#0a0e27] text-gray-300 hover:border-[#4a90e2]/40'
                  }`}
                >
                  <div className="font-medium">{split.label}</div>
                  <div className="text-sm text-gray-400">{split.description}</div>
                </button>
              ))}
            </div>
          </div>

          {macroSplit === 'custom' && (
            <div className="bg-[#0a0e27] rounded-lg p-4 border border-[#4a90e2]/20">
              <h4 className="text-white font-medium mb-3">Custom Percentages</h4>
              <div className="space-y-3">
                <div>
                  <label className="block text-sm text-gray-300 mb-1">Protein %</label>
                  <input
                    type="number"
                    value={customProtein}
                    onChange={(e) => setCustomProtein(parseInt(e.target.value) || 0)}
                    className="w-full px-3 py-2 bg-[#1a1f3a] border border-[#4a90e2]/20 rounded text-white focus:outline-none focus:border-[#4a90e2]"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-300 mb-1">Carbs %</label>
                  <input
                    type="number"
                    value={customCarbs}
                    onChange={(e) => setCustomCarbs(parseInt(e.target.value) || 0)}
                    className="w-full px-3 py-2 bg-[#1a1f3a] border border-[#4a90e2]/20 rounded text-white focus:outline-none focus:border-[#4a90e2]"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-300 mb-1">Fat %</label>
                  <input
                    type="number"
                    value={customFat}
                    onChange={(e) => setCustomFat(parseInt(e.target.value) || 0)}
                    className="w-full px-3 py-2 bg-[#1a1f3a] border border-[#4a90e2]/20 rounded text-white focus:outline-none focus:border-[#4a90e2]"
                  />
                </div>
                <div className="text-sm text-gray-400">
                  Total: {customProtein + customCarbs + customFat}% 
                  {customProtein + customCarbs + customFat !== 100 && (
                    <span className="text-red-400 ml-2">Should equal 100%</span>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Results */}
        <div className="bg-[#0a0e27] rounded-lg p-6 border border-[#4a90e2]/20">
          <h3 className="text-xl font-semibold text-white mb-6">Your Daily Macros</h3>
          
          <div className="space-y-6">
            {/* Protein */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-white font-medium">Protein</span>
                <span className="text-[#4a90e2] font-semibold">{macros.protein}g</span>
              </div>
              <div className="w-full bg-[#1a1f3a] rounded-full h-3 overflow-hidden mb-1">
                <div
                  className="bg-gradient-to-r from-[#4a90e2] to-[#6a5acd] h-full transition-all duration-300"
                  style={{ width: `${percentages.protein}%` }}
                />
              </div>
              <div className="flex justify-between text-sm text-gray-400">
                <span>{macros.protein * 4} calories</span>
                <span>{percentages.protein}%</span>
              </div>
            </div>

            {/* Carbs */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-white font-medium">Carbs</span>
                <span className="text-[#4a90e2] font-semibold">{macros.carbs}g</span>
              </div>
              <div className="w-full bg-[#1a1f3a] rounded-full h-3 overflow-hidden mb-1">
                <div
                  className="bg-gradient-to-r from-green-500 to-emerald-500 h-full transition-all duration-300"
                  style={{ width: `${percentages.carbs}%` }}
                />
              </div>
              <div className="flex justify-between text-sm text-gray-400">
                <span>{macros.carbs * 4} calories</span>
                <span>{percentages.carbs}%</span>
              </div>
            </div>

            {/* Fat */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-white font-medium">Fat</span>
                <span className="text-[#4a90e2] font-semibold">{macros.fat}g</span>
              </div>
              <div className="w-full bg-[#1a1f3a] rounded-full h-3 overflow-hidden mb-1">
                <div
                  className="bg-gradient-to-r from-orange-500 to-red-500 h-full transition-all duration-300"
                  style={{ width: `${percentages.fat}%` }}
                />
              </div>
              <div className="flex justify-between text-sm text-gray-400">
                <span>{macros.fat * 9} calories</span>
                <span>{percentages.fat}%</span>
              </div>
            </div>
          </div>

          <div className="mt-6 space-y-4">
            <div className="bg-[#1a1f3a] rounded-lg p-4">
              <h4 className="text-white font-medium mb-2">💡 Recommendations:</h4>
              <ul className="text-gray-300 text-sm space-y-1">
                <li>• Spread protein throughout the day</li>
                <li>• Time carbs around workouts</li>
                <li>• Include healthy fats with each meal</li>
              </ul>
            </div>

            <div className="bg-[#1a1f3a] rounded-lg p-4">
              <h4 className="text-white font-medium mb-2">🎯 Track Your Progress:</h4>
              <p className="text-gray-300 text-sm">
                Use the Nutrition page to log your meals and track these macro targets daily.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};