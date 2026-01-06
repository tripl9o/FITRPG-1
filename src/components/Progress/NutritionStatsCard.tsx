import React from 'react';
import { Utensils } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

interface NutritionStatsCardProps {
  avgCalories: number;
  calorieGoal: number;
  avgMacros: { protein: number; carbs: number; fat: number };
  macroGoals: { protein: number; carbs: number; fat: number };
  calorieData: Array<{ date: string; calories: number; goal: number }>;
  macroData: Array<{ week: string; protein: number; carbs: number; fat: number }>;
  consistency: {
    thisWeek: number;
    thisMonth: number;
    streak: number;
  };
}

export const NutritionStatsCard: React.FC<NutritionStatsCardProps> = ({
  avgCalories,
  calorieGoal,
  avgMacros,
  macroGoals,
  calorieData,
  macroData,
  consistency,
}) => {
  const accuracy = Math.round((avgCalories / calorieGoal) * 100);

  return (
    <div className="bg-[#1a1f3a] rounded-xl p-6 border border-[#4a90e2]/20">
      <div className="flex items-center space-x-3 mb-6">
        <Utensils className="w-6 h-6 text-[#4a90e2]" />
        <h2 className="text-xl font-bold text-white">Nutrition Statistics</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="bg-[#0a0e27] rounded-lg p-4">
          <div className="text-center mb-4">
            <div className="text-2xl font-bold text-[#4a90e2] mb-1">{avgCalories.toLocaleString()}</div>
            <div className="text-gray-400 text-sm">Avg Daily Calories</div>
            <div className="text-green-400 text-sm">Goal: {calorieGoal.toLocaleString()} ({accuracy}% accuracy)</div>
          </div>
        </div>

        <div className="bg-[#0a0e27] rounded-lg p-4">
          <h4 className="text-white font-medium mb-3">Average Macros</h4>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-400">Protein:</span>
              <span className="text-[#4a90e2]">{avgMacros.protein}g / {macroGoals.protein}g</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Carbs:</span>
              <span className="text-green-400">{avgMacros.carbs}g / {macroGoals.carbs}g</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Fat:</span>
              <span className="text-orange-400">{avgMacros.fat}g / {macroGoals.fat}g</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div>
          <h3 className="text-white font-medium mb-3">Daily Calories (Last 30 Days)</h3>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={calorieData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1a1f3a" />
                <XAxis 
                  dataKey="date" 
                  stroke="#9ca3af" 
                  fontSize={12}
                  tickFormatter={(value) => new Date(value).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                />
                <YAxis stroke="#9ca3af" fontSize={12} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1a1f3a', 
                    border: '1px solid #4a90e2', 
                    borderRadius: '8px',
                    color: '#fff'
                  }}
                  labelFormatter={(value) => new Date(value).toLocaleDateString()}
                />
                <Line 
                  type="monotone" 
                  dataKey="goal" 
                  stroke="#6b7280" 
                  strokeWidth={2} 
                  strokeDasharray="5 5"
                  name="Goal"
                  dot={false}
                />
                <Line 
                  type="monotone" 
                  dataKey="calories" 
                  stroke="#4a90e2" 
                  strokeWidth={2}
                  name="Actual"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div>
          <h3 className="text-white font-medium mb-3">Weekly Macro Breakdown</h3>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={macroData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1a1f3a" />
                <XAxis dataKey="week" stroke="#9ca3af" fontSize={12} />
                <YAxis stroke="#9ca3af" fontSize={12} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1a1f3a', 
                    border: '1px solid #4a90e2', 
                    borderRadius: '8px',
                    color: '#fff'
                  }}
                />
                <Bar dataKey="protein" stackId="a" fill="#4a90e2" name="Protein" />
                <Bar dataKey="carbs" stackId="a" fill="#10b981" name="Carbs" />
                <Bar dataKey="fat" stackId="a" fill="#f59e0b" name="Fat" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="bg-[#0a0e27] rounded-lg p-4">
        <h3 className="text-white font-medium mb-3">Meal Logging Consistency</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center">
            <div className="text-xl font-bold text-green-400 mb-1">{consistency.thisWeek}/7</div>
            <div className="text-gray-400 text-sm">This Week</div>
          </div>
          <div className="text-center">
            <div className="text-xl font-bold text-[#4a90e2] mb-1">{consistency.thisMonth}/30</div>
            <div className="text-gray-400 text-sm">This Month ({Math.round((consistency.thisMonth / 30) * 100)}%)</div>
          </div>
          <div className="text-center">
            <div className="text-xl font-bold text-[#ffd700] mb-1">{consistency.streak} days 🔥</div>
            <div className="text-gray-400 text-sm">Current Streak</div>
          </div>
        </div>
      </div>
    </div>
  );
};