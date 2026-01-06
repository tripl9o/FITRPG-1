import React from 'react';
import { useState, useEffect } from 'react';
import { TrendingUp, Download } from 'lucide-react';
import { useUser } from '../contexts/UserContext';
import { TimeRangeFilter } from '../components/Progress/TimeRangeFilter';
import { LevelProgressCard } from '../components/Progress/LevelProgressCard';
import { StatsRadarCard } from '../components/Progress/StatsRadarCard';
import { WorkoutStatsCard } from '../components/Progress/WorkoutStatsCard';
import { NutritionStatsCard } from '../components/Progress/NutritionStatsCard';
import { QuestStatsCard } from '../components/Progress/QuestStatsCard';
import { AchievementsCard } from '../components/Progress/AchievementsCard';

export const ProgressPage: React.FC = () => {
  const { state } = useUser();
  const [timeRange, setTimeRange] = useState<'today' | 'week' | 'month' | 'all'>('month');
  const [progressData, setProgressData] = useState<any>(null);

  useEffect(() => {
    // Load and aggregate data from localStorage
    loadProgressData();
  }, [timeRange]);

  const loadProgressData = () => {
    // Generate mock data for demonstration
    // In a real app, this would aggregate data from localStorage
    const mockData = {
      xpData: generateXPData(),
      workoutStats: generateWorkoutStats(),
      nutritionStats: generateNutritionStats(),
      questStats: generateQuestStats(),
      achievements: generateAchievements(),
    };
    
    setProgressData(mockData);
  };

  const generateXPData = () => {
    const data = [];
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - 30);
    
    let cumulativeXP = 0;
    for (let i = 0; i < 30; i++) {
      const date = new Date(startDate);
      date.setDate(date.getDate() + i);
      const dailyXP = Math.floor(Math.random() * 100) + 50;
      cumulativeXP += dailyXP;
      
      data.push({
        date: date.toISOString(),
        xp: dailyXP,
        cumulative: cumulativeXP,
      });
    }
    return data;
  };

  const generateWorkoutStats = () => {
    return {
      totalWorkouts: 87,
      thisWeekCount: 5,
      avgDuration: 52,
      totalVolume: 1200000,
      weeklyData: Array.from({ length: 12 }, (_, i) => ({
        week: `W${i + 1}`,
        workouts: Math.floor(Math.random() * 3) + 3,
      })),
      strengthData: Array.from({ length: 12 }, (_, i) => {
        const date = new Date();
        date.setMonth(date.getMonth() - (11 - i));
        return {
          date: date.toISOString(),
          bench: 135 + (i * 7),
          squat: 185 + (i * 10),
          deadlift: 225 + (i * 15),
        };
      }),
      topExercises: [
        { name: 'Bench Press', sessions: 45 },
        { name: 'Squats', sessions: 42 },
        { name: 'Deadlift', sessions: 38 },
        { name: 'Overhead Press', sessions: 35 },
      ],
    };
  };

  const generateNutritionStats = () => {
    return {
      avgCalories: 2180,
      calorieGoal: 2200,
      avgMacros: { protein: 175, carbs: 218, fat: 68 },
      macroGoals: { protein: 180, carbs: 220, fat: 70 },
      calorieData: Array.from({ length: 30 }, (_, i) => {
        const date = new Date();
        date.setDate(date.getDate() - (29 - i));
        return {
          date: date.toISOString(),
          calories: 2200 + (Math.random() - 0.5) * 400,
          goal: 2200,
        };
      }),
      macroData: Array.from({ length: 4 }, (_, i) => ({
        week: `Week ${i + 1}`,
        protein: 175 + Math.random() * 20,
        carbs: 218 + Math.random() * 30,
        fat: 68 + Math.random() * 15,
      })),
      consistency: {
        thisWeek: 6,
        thisMonth: 25,
        streak: 12,
      },
    };
  };

  const generateQuestStats = () => {
    return {
      totalCompleted: 312,
      completionRate: 74,
      currentStreak: 12,
      longestStreak: 28,
      questBreakdown: {
        workout: { completed: 78, total: 90 },
        water: { completed: 82, total: 90 },
        meals: { completed: 75, total: 90 },
        sleep: { completed: 80, total: 90 },
        brain: { completed: 65, total: 90 },
      },
      heatmapData: Array.from({ length: 91 }, (_, i) => {
        const date = new Date();
        date.setDate(date.getDate() - (90 - i));
        const completed = Math.floor(Math.random() * 6);
        return {
          date: date.toISOString(),
          completed,
          total: 5,
        };
      }),
    };
  };

  const generateAchievements = () => {
    const allAchievements = [
      {
        id: 'week-warrior',
        name: 'Week Warrior',
        description: 'Complete 7-day streak',
        icon: '🏅',
        unlocked: true,
        unlockedDate: '2025-01-12',
      },
      {
        id: 'iron-lifter',
        name: 'Iron Lifter',
        description: 'Complete 50 workouts',
        icon: '💪',
        unlocked: true,
        unlockedDate: '2025-01-10',
      },
      {
        id: 'data-driven',
        name: 'Data Driven',
        description: 'Log nutrition for 30 days',
        icon: '📊',
        unlocked: false,
        progress: 25,
        maxProgress: 30,
      },
      {
        id: 'hydration-hero',
        name: 'Hydration Hero',
        description: 'Drink 8 cups of water for 14 days straight',
        icon: '💧',
        unlocked: false,
        progress: 8,
        maxProgress: 14,
      },
    ];

    return {
      achievements: allAchievements,
      totalUnlocked: allAchievements.filter(a => a.unlocked).length,
      totalAchievements: 50, // Total possible achievements
    };
  };

  const handleExportData = () => {
    // Export functionality
    const dataToExport = {
      user: state.profile,
      progressData,
      exportDate: new Date().toISOString(),
    };
    
    const blob = new Blob([JSON.stringify(dataToExport, null, 2)], {
      type: 'application/json',
    });
    
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `fitrpg-progress-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  if (!progressData) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <TrendingUp className="w-16 h-16 text-[#4a90e2] mx-auto mb-4 animate-pulse" />
          <p className="text-gray-400">Loading your progress data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <h1 className="text-3xl font-bold text-white">Progress Tracking</h1>
        </div>
        <TrendingUp className="w-8 h-8 text-[#ffd700]" />
      </div>
      
      <TimeRangeFilter
        selectedRange={timeRange}
        onRangeChange={setTimeRange}
      />

      <div className="flex justify-end mb-6">
        <button
          onClick={handleExportData}
          className="flex items-center space-x-2 px-4 py-2 bg-[#4a90e2] hover:bg-[#5a9ff2] text-white rounded-lg transition-colors"
        >
          <Download className="w-4 h-4" />
          <span>Export Data</span>
        </button>
      </div>

      <div className="space-y-6">
        {/* Level & XP Progress */}
        <LevelProgressCard
          currentLevel={state.profile.level}
          totalXP={state.profile.totalXP}
          avgXPPerDay={Math.round(state.profile.totalXP / 30)} // Simplified calculation
          xpData={progressData.xpData}
        />

        {/* Stats Evolution */}
        <StatsRadarCard
          currentStats={{
            mind: 8,
            body: 10,
            spiritual: 6,
            combat: 8,
            connection: 4,
          }}
          startingStats={{
            mind: 1,
            body: 1,
            spiritual: 1,
            combat: 1,
            connection: 1,
          }}
        />

        {/* Workout Statistics */}
        <WorkoutStatsCard {...progressData.workoutStats} />

        {/* Nutrition Statistics */}
        <NutritionStatsCard {...progressData.nutritionStats} />

        {/* Quest Statistics */}
        <QuestStatsCard {...progressData.questStats} />

        {/* Achievements */}
        <AchievementsCard {...progressData.achievements} />
      </div>
    </div>
  );
};