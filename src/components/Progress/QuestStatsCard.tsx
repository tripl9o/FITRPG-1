import React from 'react';
import { Sword } from 'lucide-react';

interface QuestStatsCardProps {
  totalCompleted: number;
  completionRate: number;
  currentStreak: number;
  longestStreak: number;
  questBreakdown: {
    workout: { completed: number; total: number };
    water: { completed: number; total: number };
    meals: { completed: number; total: number };
    sleep: { completed: number; total: number };
    brain: { completed: number; total: number };
  };
  heatmapData: Array<{ date: string; completed: number; total: number }>;
}

export const QuestStatsCard: React.FC<QuestStatsCardProps> = ({
  totalCompleted,
  completionRate,
  currentStreak,
  longestStreak,
  questBreakdown,
  heatmapData,
}) => {
  const getHeatmapColor = (completed: number, total: number) => {
    const percentage = total > 0 ? completed / total : 0;
    if (percentage >= 1) return 'bg-green-600';
    if (percentage >= 0.6) return 'bg-green-400';
    if (percentage >= 0.4) return 'bg-yellow-400';
    if (percentage > 0) return 'bg-yellow-200';
    return 'bg-gray-600';
  };

  const questTypes = [
    { key: 'workout', name: 'Workout', icon: '💪' },
    { key: 'water', name: 'Water', icon: '💧' },
    { key: 'meals', name: 'Meals', icon: '🍽️' },
    { key: 'sleep', name: 'Sleep', icon: '😴' },
    { key: 'brain', name: 'Brain', icon: '🧠' },
  ];

  return (
    <div className="bg-[#1a1f3a] rounded-xl p-6 border border-[#4a90e2]/20">
      <div className="flex items-center space-x-3 mb-6">
        <Sword className="w-6 h-6 text-[#ffd700]" />
        <h2 className="text-xl font-bold text-white">Quest Statistics</h2>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-[#0a0e27] rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-[#4a90e2] mb-1">{totalCompleted}</div>
          <div className="text-gray-400 text-sm">Total Completed</div>
        </div>
        <div className="bg-[#0a0e27] rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-green-400 mb-1">{completionRate}%</div>
          <div className="text-gray-400 text-sm">Completion Rate</div>
        </div>
        <div className="bg-[#0a0e27] rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-[#ffd700] mb-1">{currentStreak} 🔥</div>
          <div className="text-gray-400 text-sm">Current Streak</div>
        </div>
        <div className="bg-[#0a0e27] rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-purple-400 mb-1">{longestStreak}</div>
          <div className="text-gray-400 text-sm">Longest Streak</div>
        </div>
      </div>

      <div className="mb-6">
        <h3 className="text-white font-medium mb-3">Quest Completion Heatmap (Last 90 Days)</h3>
        <div className="bg-[#0a0e27] rounded-lg p-3 max-w-full overflow-hidden">
          <div className="grid grid-cols-13 gap-0.5 max-w-full">
            {heatmapData.slice(-91).map((day, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-sm ${getHeatmapColor(day.completed, day.total)} hover:scale-125 transition-transform cursor-pointer`}
                title={`${new Date(day.date).toLocaleDateString()}: ${day.completed}/${day.total} quests`}
              />
            ))}
          </div>
          <div className="flex items-center justify-between mt-2 text-xs text-gray-400">
            <span>Less</span>
            <div className="flex space-x-0.5">
              <div className="w-2 h-2 bg-gray-600 rounded-sm" />
              <div className="w-2 h-2 bg-yellow-200 rounded-sm" />
              <div className="w-2 h-2 bg-yellow-400 rounded-sm" />
              <div className="w-2 h-2 bg-green-400 rounded-sm" />
              <div className="w-2 h-2 bg-green-600 rounded-sm" />
            </div>
            <span>More</span>
          </div>
          
          {/* Week labels for better orientation */}
          <div className="grid grid-cols-13 gap-0.5 mt-2 text-xs text-gray-500">
            {Array.from({ length: 13 }, (_, i) => (
              <div key={i} className="text-center">
                {i % 4 === 0 ? `W${Math.floor(i / 4) * 4 + 1}` : ''}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="text-white font-medium mb-3">Quest Breakdown</h3>
          <div className="space-y-3">
            {questTypes.map((quest) => {
              const data = questBreakdown[quest.key as keyof typeof questBreakdown];
              const percentage = Math.round((data.completed / data.total) * 100);
              return (
                <div key={quest.key} className="bg-[#0a0e27] rounded-lg p-3">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <span>{quest.icon}</span>
                      <span className="text-white">{quest.name}:</span>
                    </div>
                    <span className="text-[#4a90e2] font-semibold">{percentage}%</span>
                  </div>
                  <div className="flex items-center justify-between text-sm text-gray-400">
                    <span>{data.completed}/{data.total}</span>
                    <div className="w-24 bg-[#1a1f3a] rounded-full h-2">
                      <div
                        className="bg-[#4a90e2] h-2 rounded-full transition-all duration-300"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div>
          <h3 className="text-white font-medium mb-3">Performance Insights</h3>
          <div className="space-y-3">
            <div className="bg-[#0a0e27] rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-2">
                <span className="text-green-400">✓</span>
                <span className="text-white font-medium">Most Consistent:</span>
              </div>
              <p className="text-gray-400 text-sm">Water Quest (91% completion rate)</p>
            </div>
            
            <div className="bg-[#0a0e27] rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-2">
                <span className="text-yellow-400">⚠</span>
                <span className="text-white font-medium">Needs Improvement:</span>
              </div>
              <p className="text-gray-400 text-sm">Brain Challenge (72% completion rate)</p>
            </div>

            <div className="bg-[#0a0e27] rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-2">
                <span className="text-[#4a90e2]">💡</span>
                <span className="text-white font-medium">Tip:</span>
              </div>
              <p className="text-gray-400 text-sm">Set a daily reminder for brain challenges to improve consistency.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};