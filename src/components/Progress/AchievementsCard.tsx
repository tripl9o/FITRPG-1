import React from 'react';
import { Trophy, Star, Lock } from 'lucide-react';

interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  unlocked: boolean;
  unlockedDate?: string;
  progress?: number;
  maxProgress?: number;
}

interface AchievementsCardProps {
  achievements: Achievement[];
  totalUnlocked: number;
  totalAchievements: number;
}

export const AchievementsCard: React.FC<AchievementsCardProps> = ({
  achievements,
  totalUnlocked,
  totalAchievements,
}) => {
  const recentAchievements = achievements
    .filter(a => a.unlocked && a.unlockedDate)
    .sort((a, b) => new Date(b.unlockedDate!).getTime() - new Date(a.unlockedDate!).getTime())
    .slice(0, 3);

  const inProgressAchievements = achievements
    .filter(a => !a.unlocked && a.progress !== undefined)
    .slice(0, 2);

  return (
    <div className="bg-[#1a1f3a] rounded-xl p-6 border border-[#4a90e2]/20">
      <div className="flex items-center space-x-3 mb-6">
        <Trophy className="w-6 h-6 text-[#ffd700]" />
        <h2 className="text-xl font-bold text-white">Achievements</h2>
      </div>

      <div className="bg-[#0a0e27] rounded-lg p-4 mb-6 text-center">
        <div className="text-3xl font-bold text-[#ffd700] mb-2">
          {totalUnlocked}/{totalAchievements}
        </div>
        <div className="text-gray-400">Total Unlocked</div>
        <div className="w-full bg-[#1a1f3a] rounded-full h-3 mt-3">
          <div
            className="bg-gradient-to-r from-[#ffd700] to-[#4a90e2] h-3 rounded-full transition-all duration-500"
            style={{ width: `${(totalUnlocked / totalAchievements) * 100}%` }}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <h3 className="text-white font-medium mb-4">Recent Achievements</h3>
          <div className="space-y-3">
            {recentAchievements.map((achievement) => (
              <div key={achievement.id} className="bg-[#0a0e27] rounded-lg p-4 border border-[#ffd700]/20">
                <div className="flex items-start space-x-3">
                  <div className="text-2xl">{achievement.icon}</div>
                  <div className="flex-1">
                    <h4 className="text-white font-semibold mb-1">{achievement.name}</h4>
                    <p className="text-gray-400 text-sm mb-2">{achievement.description}</p>
                    <div className="flex items-center space-x-2">
                      <Star className="w-4 h-4 text-[#ffd700]" />
                      <span className="text-[#ffd700] text-sm">
                        Unlocked: {new Date(achievement.unlockedDate!).toLocaleDateString('en-US', { 
                          month: 'short', 
                          day: 'numeric' 
                        })}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-white font-medium mb-4">In Progress</h3>
          <div className="space-y-3">
            {inProgressAchievements.map((achievement) => (
              <div key={achievement.id} className="bg-[#0a0e27] rounded-lg p-4 border border-[#4a90e2]/20">
                <div className="flex items-start space-x-3">
                  <div className="text-2xl opacity-50">{achievement.icon}</div>
                  <div className="flex-1">
                    <h4 className="text-white font-semibold mb-1">{achievement.name}</h4>
                    <p className="text-gray-400 text-sm mb-3">{achievement.description}</p>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-400">Progress:</span>
                        <span className="text-[#4a90e2]">
                          {achievement.progress}/{achievement.maxProgress}
                        </span>
                      </div>
                      <div className="w-full bg-[#1a1f3a] rounded-full h-2">
                        <div
                          className="bg-[#4a90e2] h-2 rounded-full transition-all duration-300"
                          style={{ 
                            width: `${((achievement.progress || 0) / (achievement.maxProgress || 1)) * 100}%` 
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            <button className="w-full p-4 bg-[#0a0e27] hover:bg-[#4a90e2]/10 border border-[#4a90e2]/20 hover:border-[#4a90e2]/40 rounded-lg transition-all duration-200 text-[#4a90e2] hover:text-white">
              View All Achievements
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};