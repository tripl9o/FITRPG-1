import React, { useState, useEffect } from 'react';
import { Sword } from 'lucide-react';
import { Quest, QuestProgress } from '../../types/quests';
import { QuestCard } from './QuestCard';
import { LevelUpModal } from './Modals/LevelUpModal';
import { useUser } from '../../contexts/UserContext';
import { useNotifications } from '../../contexts/NotificationContext';
import { calculateLevel, getXPForNextLevel, getCurrentLevelXP } from '../../types/quests';

export const DailyQuestsCard: React.FC = () => {
  const { state, dispatch } = useUser();
  const { addNotification } = useNotifications();
  const [quests, setQuests] = useState<Quest[]>([]);
  const [questProgress, setQuestProgress] = useState<QuestProgress>({
    waterCups: 0,
    mealsLogged: 0,
    sleepHours: 0,
    workoutCompleted: false,
    brainChallengeCompleted: false,
    lastResetDate: new Date().toDateString(),
  });
  const [showLevelUp, setShowLevelUp] = useState(false);
  const [newLevel, setNewLevel] = useState(1);

  // Initialize quests and load progress
  useEffect(() => {
    const today = new Date().toDateString();
    const savedProgress = localStorage.getItem('fitRPG-quest-progress');
    
    let progress = questProgress;
    if (savedProgress) {
      const parsed = JSON.parse(savedProgress);
      // Reset if it's a new day
      if (parsed.lastResetDate !== today) {
        progress = {
          waterCups: 0,
          mealsLogged: 0,
          sleepHours: 0,
          workoutCompleted: false,
          brainChallengeCompleted: false,
          lastResetDate: today,
        };
      } else {
        progress = parsed;
      }
    }
    
    setQuestProgress(progress);
    
    // Initialize daily quests
    const dailyQuests: Quest[] = [
      {
        id: 'workout',
        title: 'Complete Workout',
        description: 'Finish any workout session',
        type: 'workout',
        xpReward: 50,
        goldReward: 10,
        statReward: { stat: 'body', amount: 2 },
        completed: progress.workoutCompleted,
        progress: progress.workoutCompleted ? 1 : 0,
        maxProgress: 1,
        resetDaily: true,
      },
      {
        id: 'water',
        title: 'Drink 8 Cups Water',
        description: 'Stay hydrated throughout the day',
        type: 'water',
        xpReward: 30,
        goldReward: 5,
        statReward: { stat: 'body', amount: 1 },
        completed: progress.waterCups >= 8,
        progress: progress.waterCups,
        maxProgress: 8,
        resetDaily: true,
      },
      {
        id: 'meals',
        title: 'Log 3 Meals',
        description: 'Track your nutrition intake',
        type: 'meals',
        xpReward: 40,
        goldReward: 8,
        statReward: { stat: 'mind', amount: 1 },
        completed: progress.mealsLogged >= 3,
        progress: progress.mealsLogged,
        maxProgress: 3,
        resetDaily: true,
      },
      {
        id: 'sleep',
        title: 'Sleep 7+ Hours',
        description: 'Get quality rest for recovery',
        type: 'sleep',
        xpReward: 35,
        goldReward: 7,
        statReward: { stat: 'spiritual', amount: 1 },
        completed: progress.sleepHours >= 7,
        progress: progress.sleepHours,
        maxProgress: 7,
        resetDaily: true,
      },
      {
        id: 'brain',
        title: 'Brain Challenge',
        description: 'Answer 3 trivia questions',
        type: 'brain',
        xpReward: 45,
        goldReward: 10,
        statReward: { stat: 'mind', amount: 2 },
        completed: progress.brainChallengeCompleted,
        progress: progress.brainChallengeCompleted ? 3 : 0,
        maxProgress: 3,
        resetDaily: true,
      },
    ];
    
    setQuests(dailyQuests);
  }, []);

  // Save progress to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('fitRPG-quest-progress', JSON.stringify(questProgress));
  }, [questProgress]);

  const handleQuestComplete = (questId: string, xp: number, gold: number) => {
    // Update quest completion
    setQuests(prev => prev.map(quest => 
      quest.id === questId ? { ...quest, completed: true } : quest
    ));

    // Update progress
    setQuestProgress(prev => ({
      ...prev,
      [`${questId}Completed`]: true,
    }));

    // Add XP and check for level up
    const currentTotalXP = state.profile.totalXP;
    const newTotalXP = currentTotalXP + xp;
    const currentLevel = calculateLevel(currentTotalXP);
    const levelAfterXP = calculateLevel(newTotalXP);

    dispatch({ type: 'ADD_XP', payload: xp });

    // Check for level up
    if (levelAfterXP > currentLevel) {
      setNewLevel(levelAfterXP);
      setShowLevelUp(true);
      addNotification({
        type: 'level-up',
        title: 'Level Up!',
        message: `Congratulations! You reached Level ${levelAfterXP}!`,
        icon: '🎉',
      });
    }
  };

  const handleQuestProgress = (questId: string, progress: number) => {
    // Update quest progress
    setQuests(prev => prev.map(quest => 
      quest.id === questId ? { ...quest, progress } : quest
    ));

    // Update progress state
    if (questId === 'water') {
      setQuestProgress(prev => ({ ...prev, waterCups: progress }));
    } else if (questId === 'meals') {
      setQuestProgress(prev => ({ ...prev, mealsLogged: progress }));
    } else if (questId === 'sleep') {
      setQuestProgress(prev => ({ ...prev, sleepHours: progress }));
    }
  };

  const completedQuests = quests.filter(q => q.completed).length;
  const totalXPToday = quests.filter(q => q.completed).reduce((sum, q) => sum + q.xpReward, 0);
  const totalGoldToday = quests.filter(q => q.completed).reduce((sum, q) => sum + q.goldReward, 0);

  // Calculate streak (simplified - would need more complex logic for real implementation)
  const currentStreak = completedQuests >= 3 ? 1 : 0; // Placeholder logic

  return (
    <>
      <div className="bg-[#1a1f3a] rounded-xl p-6 border border-[#4a90e2]/20 shadow-lg">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <Sword className="w-6 h-6 text-[#ffd700]" />
            <h2 className="text-xl font-bold text-white">Daily Quests</h2>
          </div>
          <div className="text-[#4a90e2] font-semibold">
            {completedQuests}/5 Complete
          </div>
        </div>

        <div className="space-y-4 mb-6">
          {quests.map(quest => (
            <QuestCard
              key={quest.id}
              quest={quest}
              onComplete={handleQuestComplete}
              onProgress={handleQuestProgress}
            />
          ))}
        </div>

        <div className="border-t border-[#4a90e2]/20 pt-4">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center space-x-4">
              <span className="text-gray-300">Today's Progress:</span>
              <span className="text-[#4a90e2] font-semibold">{totalXPToday} XP</span>
              <span className="text-[#ffd700] font-semibold">{totalGoldToday} Gold</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-gray-300">Current Streak:</span>
              <span className="text-[#ffd700] font-semibold">{currentStreak} days</span>
              <span className="text-xl">🔥</span>
            </div>
          </div>
        </div>
      </div>

      {showLevelUp && (
        <LevelUpModal
          newLevel={newLevel}
          onClose={() => setShowLevelUp(false)}
        />
      )}
    </>
  );
};