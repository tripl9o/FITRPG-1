import React from 'react';
import { DailyNutrition } from '../../types/nutrition';

interface NutritionProgressProps {
  dailyNutrition: DailyNutrition;
}

export const NutritionProgress: React.FC<NutritionProgressProps> = ({ dailyNutrition }) => {
  const { totals, goals } = dailyNutrition;
  
  const caloriesProgress = (totals.calories / goals.calories) * 100;
  const proteinProgress = (totals.protein / goals.protein) * 100;
  const carbsProgress = (totals.carbs / goals.carbs) * 100;
  const fatProgress = (totals.fat / goals.fat) * 100;
  
  const remaining = Math.max(0, goals.calories - totals.calories);

  const ProgressBar: React.FC<{ 
    label: string; 
    current: number; 
    goal: number; 
    unit: string; 
    color: string;
  }> = ({ label, current, goal, unit, color }) => {
    const percentage = Math.min((current / goal) * 100, 100);
    const isOver = current > goal;
    
    return (
      <div className="mb-3">
        <div className="flex justify-between items-center mb-1">
          <span className="text-gray-300 text-sm">{label}:</span>
          <span className={`text-sm font-semibold ${
            isOver ? 'text-red-400' : current >= goal * 0.9 ? 'text-green-400' : 'text-white'
          }`}>
            {Math.round(current)}/{goal}{unit}
          </span>
        </div>
        <div className="w-full bg-[#1a1f3a] rounded-full h-2 overflow-hidden">
          <div
            className={`h-full transition-all duration-300 ${
              isOver ? 'bg-red-500' : `bg-gradient-to-r ${color}`
            }`}
            style={{ width: `${Math.min(percentage, 100)}%` }}
          />
        </div>
        {isOver && (
          <div className="text-xs text-red-400 mt-1">
            +{Math.round(current - goal)}{unit} over goal
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="bg-[#1a1f3a] rounded-xl p-6 border border-[#4a90e2]/20 mb-6">
      <div className="flex items-center space-x-3 mb-4">
        <span className="text-2xl">📊</span>
        <h2 className="text-xl font-bold text-white">Today's Nutrition</h2>
      </div>

      {/* Daily Calories */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-gray-300">Daily Goal:</span>
          <span className="text-white font-semibold">{goals.calories.toLocaleString()} calories</span>
        </div>
        <div className="w-full bg-[#0a0e27] rounded-full h-4 overflow-hidden mb-2">
          <div
            className={`h-full transition-all duration-500 ${
              caloriesProgress > 100 
                ? 'bg-red-500' 
                : 'bg-gradient-to-r from-[#4a90e2] to-[#6a5acd]'
            }`}
            style={{ width: `${Math.min(caloriesProgress, 100)}%` }}
          />
        </div>
        <div className="flex justify-between items-center text-sm">
          <span className="text-[#4a90e2] font-semibold">
            {totals.calories.toLocaleString()}/{goals.calories.toLocaleString()}
          </span>
          <span className={`font-semibold ${
            remaining > 0 ? 'text-gray-300' : 'text-red-400'
          }`}>
            {remaining > 0 ? `${remaining} remaining` : `${Math.abs(remaining)} over`}
          </span>
        </div>
      </div>

      {/* Macros */}
      <div className="space-y-1">
        <ProgressBar
          label="Protein"
          current={totals.protein}
          goal={goals.protein}
          unit="g"
          color="from-blue-500 to-blue-600"
        />
        <ProgressBar
          label="Carbs"
          current={totals.carbs}
          goal={goals.carbs}
          unit="g"
          color="from-green-500 to-green-600"
        />
        <ProgressBar
          label="Fat"
          current={totals.fat}
          goal={goals.fat}
          unit="g"
          color="from-orange-500 to-orange-600"
        />
      </div>
    </div>
  );
};