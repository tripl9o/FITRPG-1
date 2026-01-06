import React from 'react';
import { Trophy, Clock, Target, TrendingUp, Award } from 'lucide-react';
import { useNotifications } from '../../contexts/NotificationContext';

interface WorkoutCompleteProps {
  stats: {
    duration: number;
    totalSets: number;
    totalReps: number;
    totalVolume: number;
    exercisesCompleted: number;
  };
  rewards: {
    xp: number;
    gold: number;
    bodyStats: number;
  };
  onFinish: () => void;
}

export const WorkoutComplete: React.FC<WorkoutCompleteProps> = ({
  stats,
  rewards,
  onFinish,
}) => {
  const { addNotification } = useNotifications();

  React.useEffect(() => {
    // Add workout completion notification
    addNotification({
      type: 'quest-complete',
      title: 'Workout Complete!',
      message: `Great job! +${rewards.xp} XP, +${rewards.gold} Gold, +${rewards.bodyStats} Body`,
      icon: '💪',
    });
  }, [addNotification, rewards]);

  return (
    <div className="bg-[#1a1f3a] rounded-xl p-8 border border-[#4a90e2]/20 text-center">
      <div className="mb-6">
        <Trophy className="w-16 h-16 text-[#ffd700] mx-auto mb-4" />
        <h2 className="text-3xl font-bold text-white mb-2">🎉 WORKOUT COMPLETE!</h2>
        <p className="text-gray-300">Great job! You crushed it!</p>
      </div>

      {/* Workout Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-[#0a0e27] rounded-lg p-4">
          <Clock className="w-6 h-6 text-[#4a90e2] mx-auto mb-2" />
          <div className="text-2xl font-bold text-white">{stats.duration}</div>
          <div className="text-gray-400 text-sm">minutes</div>
        </div>
        
        <div className="bg-[#0a0e27] rounded-lg p-4">
          <Target className="w-6 h-6 text-[#4a90e2] mx-auto mb-2" />
          <div className="text-2xl font-bold text-white">{stats.exercisesCompleted}</div>
          <div className="text-gray-400 text-sm">exercises</div>
        </div>
        
        <div className="bg-[#0a0e27] rounded-lg p-4">
          <TrendingUp className="w-6 h-6 text-[#4a90e2] mx-auto mb-2" />
          <div className="text-2xl font-bold text-white">{stats.totalSets}</div>
          <div className="text-gray-400 text-sm">total sets</div>
        </div>
        
        <div className="bg-[#0a0e27] rounded-lg p-4">
          <Award className="w-6 h-6 text-[#4a90e2] mx-auto mb-2" />
          <div className="text-2xl font-bold text-white">{stats.totalReps}</div>
          <div className="text-gray-400 text-sm">total reps</div>
        </div>
      </div>

      {/* Volume */}
      <div className="bg-[#0a0e27] rounded-lg p-4 mb-8">
        <h3 className="text-white font-semibold mb-2">Total Volume</h3>
        <div className="text-3xl font-bold text-[#4a90e2]">
          {stats.totalVolume.toLocaleString()} <span className="text-lg text-gray-400">lbs</span>
        </div>
      </div>

      {/* Rewards */}
      <div className="bg-gradient-to-r from-[#4a90e2]/20 to-[#6a5acd]/20 rounded-lg p-6 mb-8 border border-[#4a90e2]/30">
        <h3 className="text-white font-semibold mb-4">REWARDS EARNED</h3>
        <div className="flex items-center justify-center space-x-8">
          <div className="text-center">
            <div className="text-2xl font-bold text-[#4a90e2]">+{rewards.xp}</div>
            <div className="text-gray-300 text-sm">XP</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-[#ffd700]">+{rewards.gold}</div>
            <div className="text-gray-300 text-sm">Gold</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-400">+{rewards.bodyStats}</div>
            <div className="text-gray-300 text-sm">Body</div>
          </div>
        </div>
      </div>

      <button
        onClick={onFinish}
        className="w-full py-4 bg-gradient-to-r from-[#4a90e2] to-[#6a5acd] hover:from-[#5a9ff2] hover:to-[#7a6add] text-white font-bold rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg text-lg"
      >
        Finish Workout
      </button>
    </div>
  );
};