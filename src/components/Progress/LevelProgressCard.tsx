import React from 'react';
import { Zap, TrendingUp } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface LevelProgressCardProps {
  currentLevel: number;
  totalXP: number;
  avgXPPerDay: number;
  xpData: Array<{ date: string; xp: number; cumulative: number }>;
}

export const LevelProgressCard: React.FC<LevelProgressCardProps> = ({
  currentLevel,
  totalXP,
  avgXPPerDay,
  xpData,
}) => {
  const nextLevelXP = currentLevel * 100; // Simplified calculation
  const daysToNextLevel = Math.ceil((nextLevelXP - (totalXP % nextLevelXP)) / avgXPPerDay);

  const milestones = [
    { level: 5, date: 'Jan 5', reached: currentLevel >= 5 },
    { level: 10, date: 'Jan 12', reached: currentLevel >= 10 },
    { level: 15, date: `~${daysToNextLevel} days`, reached: currentLevel >= 15 },
  ];

  return (
    <div className="bg-[#1a1f3a] rounded-xl p-6 border border-[#4a90e2]/20">
      <div className="flex items-center space-x-3 mb-6">
        <Zap className="w-6 h-6 text-[#ffd700]" />
        <h2 className="text-xl font-bold text-white">Level Progression</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-[#0a0e27] rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-[#4a90e2] mb-1">{currentLevel}</div>
          <div className="text-gray-400 text-sm">Current Level</div>
        </div>
        <div className="bg-[#0a0e27] rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-[#ffd700] mb-1">{totalXP.toLocaleString()}</div>
          <div className="text-gray-400 text-sm">Total XP Earned</div>
        </div>
        <div className="bg-[#0a0e27] rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-green-400 mb-1">{avgXPPerDay}</div>
          <div className="text-gray-400 text-sm">Avg XP/Day</div>
        </div>
      </div>

      <div className="mb-6">
        <h3 className="text-white font-medium mb-3">XP Progress Over Time</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={xpData}>
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
                formatter={(value: number, name: string) => [
                  `${value} XP`, 
                  name === 'xp' ? 'Daily XP' : 'Total XP'
                ]}
              />
              <Line 
                type="monotone" 
                dataKey="xp" 
                stroke="#4a90e2" 
                strokeWidth={2}
                dot={{ fill: '#4a90e2', strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, stroke: '#4a90e2', strokeWidth: 2, fill: '#ffd700' }}
              />
              <Line 
                type="monotone" 
                dataKey="cumulative" 
                stroke="#ffd700" 
                strokeWidth={2}
                strokeDasharray="5 5"
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div>
        <h3 className="text-white font-medium mb-3">Level Milestones</h3>
        <div className="space-y-2">
          {milestones.map((milestone) => (
            <div key={milestone.level} className="flex items-center justify-between p-3 bg-[#0a0e27] rounded-lg">
              <div className="flex items-center space-x-3">
                <div className={`w-3 h-3 rounded-full ${
                  milestone.reached ? 'bg-green-500' : 'bg-gray-600'
                }`} />
                <span className="text-white">Level {milestone.level}</span>
              </div>
              <span className="text-gray-400 text-sm">{milestone.date}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};