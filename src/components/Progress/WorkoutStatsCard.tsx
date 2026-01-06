import React from 'react';
import { Dumbbell, TrendingUp } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';

interface WorkoutStatsCardProps {
  totalWorkouts: number;
  thisWeekCount: number;
  avgDuration: number;
  totalVolume: number;
  weeklyData: Array<{ week: string; workouts: number }>;
  strengthData: Array<{ date: string; bench: number; squat: number; deadlift: number }>;
  topExercises: Array<{ name: string; sessions: number }>;
}

export const WorkoutStatsCard: React.FC<WorkoutStatsCardProps> = ({
  totalWorkouts,
  thisWeekCount,
  avgDuration,
  totalVolume,
  weeklyData,
  strengthData,
  topExercises,
}) => {
  const strengthProgress = [
    { exercise: 'Bench Press', start: 135, current: 225, growth: 67 },
    { exercise: 'Squat', start: 185, current: 315, growth: 70 },
    { exercise: 'Deadlift', start: 225, current: 405, growth: 80 },
  ];

  return (
    <div className="bg-[#1a1f3a] rounded-xl p-6 border border-[#4a90e2]/20">
      <div className="flex items-center space-x-3 mb-6">
        <Dumbbell className="w-6 h-6 text-[#4a90e2]" />
        <h2 className="text-xl font-bold text-white">Workout Statistics</h2>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-[#0a0e27] rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-[#4a90e2] mb-1">{totalWorkouts}</div>
          <div className="text-gray-400 text-sm">Total Workouts</div>
        </div>
        <div className="bg-[#0a0e27] rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-green-400 mb-1">{thisWeekCount}/6</div>
          <div className="text-gray-400 text-sm">This Week</div>
        </div>
        <div className="bg-[#0a0e27] rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-[#ffd700] mb-1">{avgDuration}</div>
          <div className="text-gray-400 text-sm">Avg Minutes</div>
        </div>
        <div className="bg-[#0a0e27] rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-purple-400 mb-1">{(totalVolume / 1000000).toFixed(1)}M</div>
          <div className="text-gray-400 text-sm">Total Volume (lbs)</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div>
          <h3 className="text-white font-medium mb-3">Workouts Per Week (Last 12 Weeks)</h3>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={weeklyData}>
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
                <Bar dataKey="workouts" fill="#4a90e2" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div>
          <h3 className="text-white font-medium mb-3">Most Frequent Exercises</h3>
          <div className="space-y-3">
            {topExercises.map((exercise, index) => (
              <div key={exercise.name} className="flex items-center justify-between p-3 bg-[#0a0e27] rounded-lg">
                <div className="flex items-center space-x-3">
                  <span className="text-[#4a90e2] font-bold">{index + 1}.</span>
                  <span className="text-white">{exercise.name}</span>
                </div>
                <span className="text-gray-400">{exercise.sessions} sessions</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <h3 className="text-white font-medium mb-3">Strength Progress</h3>
          <div className="space-y-3">
            {strengthProgress.map((lift) => (
              <div key={lift.exercise} className="bg-[#0a0e27] rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-white font-medium">{lift.exercise}:</span>
                  <span className="text-green-400 font-semibold">+{lift.growth}%</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-400">
                  <span>{lift.start} lbs</span>
                  <span>→</span>
                  <span className="text-[#4a90e2] font-semibold">{lift.current} lbs</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-white font-medium mb-3">Strength Over Time</h3>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={strengthData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1a1f3a" />
                <XAxis 
                  dataKey="date" 
                  stroke="#9ca3af" 
                  fontSize={12}
                  tickFormatter={(value) => new Date(value).toLocaleDateString('en-US', { month: 'short' })}
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
                <Line type="monotone" dataKey="bench" stroke="#4a90e2" strokeWidth={2} name="Bench Press" />
                <Line type="monotone" dataKey="squat" stroke="#ffd700" strokeWidth={2} name="Squat" />
                <Line type="monotone" dataKey="deadlift" stroke="#10b981" strokeWidth={2} name="Deadlift" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};