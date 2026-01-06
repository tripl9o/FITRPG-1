import React from 'react';
import { useState, useEffect } from 'react';
import { Utensils, Calendar, Camera } from 'lucide-react';
import { useUser } from '../contexts/UserContext';
import { useNotifications } from '../contexts/NotificationContext';
import { DailyNutrition, LoggedMeal } from '../types/nutrition';
import { NutritionProgress } from '../components/Nutrition/NutritionProgress';
import { MealSection } from '../components/Nutrition/MealSection';
import { MealPlansTab } from '../components/Nutrition/MealPlansTab';

export const NutritionPage: React.FC = () => {
  const { state, dispatch } = useUser();
  const { addNotification } = useNotifications();
  const [activeTab, setActiveTab] = useState<'today' | 'plans' | 'scanner'>('today');
  const [dailyNutrition, setDailyNutrition] = useState<DailyNutrition>({
    date: new Date().toISOString().split('T')[0],
    meals: [],
    totals: { calories: 0, protein: 0, carbs: 0, fat: 0 },
    goals: { calories: 2200, protein: 180, carbs: 220, fat: 70 }
  });

  // Load user's nutrition goals and today's meals
  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    
    // Load nutrition goals from onboarding data
    const onboardingData = localStorage.getItem('fitRPG-onboarding-data');
    if (onboardingData) {
      const data = JSON.parse(onboardingData);
      if (data.calculatedStats) {
        setDailyNutrition(prev => ({
          ...prev,
          goals: {
            calories: data.calculatedStats.recommendedCalories || 2200,
            protein: data.calculatedStats.macros?.protein || 180,
            carbs: data.calculatedStats.macros?.carbs || 220,
            fat: data.calculatedStats.macros?.fat || 70
          }
        }));
      }
    }

    // Load today's meals
    const savedNutrition = localStorage.getItem('fitRPG-daily-nutrition');
    if (savedNutrition) {
      const nutritionData = JSON.parse(savedNutrition);
      if (nutritionData[today]) {
        setDailyNutrition(prev => ({
          ...prev,
          ...nutritionData[today]
        }));
      }
    }
  }, []);

  // Save nutrition data whenever it changes
  useEffect(() => {
    const savedNutrition = JSON.parse(localStorage.getItem('fitRPG-daily-nutrition') || '{}');
    savedNutrition[dailyNutrition.date] = dailyNutrition;
    localStorage.setItem('fitRPG-daily-nutrition', JSON.stringify(savedNutrition));
  }, [dailyNutrition]);

  const calculateTotals = (meals: LoggedMeal[]) => {
    return meals.reduce(
      (totals, meal) => ({
        calories: totals.calories + meal.calories,
        protein: totals.protein + meal.protein,
        carbs: totals.carbs + meal.carbs,
        fat: totals.fat + meal.fat,
      }),
      { calories: 0, protein: 0, carbs: 0, fat: 0 }
    );
  };

  const handleAddMeal = (mealData: Omit<LoggedMeal, 'id' | 'timestamp'>) => {
    const newMeal: LoggedMeal = {
      ...mealData,
      id: `meal_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      timestamp: new Date().toISOString(),
    };

    const updatedMeals = [...dailyNutrition.meals, newMeal];
    const newTotals = calculateTotals(updatedMeals);

    setDailyNutrition(prev => ({
      ...prev,
      meals: updatedMeals,
      totals: newTotals,
    }));

    // Check if this completes the meals quest
    checkMealsQuest(updatedMeals);
  };

  const handleEditMeal = (mealId: string, updates: Partial<LoggedMeal>) => {
    const updatedMeals = dailyNutrition.meals.map(meal =>
      meal.id === mealId ? { ...meal, ...updates } : meal
    );
    const newTotals = calculateTotals(updatedMeals);

    setDailyNutrition(prev => ({
      ...prev,
      meals: updatedMeals,
      totals: newTotals,
    }));
  };

  const handleDeleteMeal = (mealId: string) => {
    const updatedMeals = dailyNutrition.meals.filter(meal => meal.id !== mealId);
    const newTotals = calculateTotals(updatedMeals);

    setDailyNutrition(prev => ({
      ...prev,
      meals: updatedMeals,
      totals: newTotals,
    }));

    // Update quest progress
    checkMealsQuest(updatedMeals);
  };

  const handleImportPlan = (mealsToImport: Omit<LoggedMeal, 'id' | 'timestamp'>[]) => {
    const newMeals = mealsToImport.map(mealData => ({
      ...mealData,
      id: `meal_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      timestamp: new Date().toISOString(),
    }));

    const updatedMeals = [...dailyNutrition.meals, ...newMeals];
    const newTotals = calculateTotals(updatedMeals);

    setDailyNutrition(prev => ({
      ...prev,
      meals: updatedMeals,
      totals: newTotals,
    }));

    checkMealsQuest(updatedMeals);
  };

  const checkMealsQuest = (meals: LoggedMeal[]) => {
    const mealTypes = ['breakfast', 'lunch', 'dinner'];
    const loggedMealTypes = new Set(meals.map(meal => meal.type));
    const mealsLogged = mealTypes.filter(type => loggedMealTypes.has(type as any)).length;

    // Update quest progress
    const questProgress = JSON.parse(localStorage.getItem('fitRPG-quest-progress') || '{}');
    const previousMealsLogged = questProgress.mealsLogged || 0;
    questProgress.mealsLogged = mealsLogged;
    localStorage.setItem('fitRPG-quest-progress', JSON.stringify(questProgress));

    // Complete quest if 3 meals logged
    if (mealsLogged >= 3 && previousMealsLogged < 3) {
      dispatch({ type: 'ADD_XP', payload: 40 });
      addNotification({
        type: 'quest-complete',
        title: 'Quest Complete!',
        message: 'Log 3 Meals completed! +40 XP, +8 Gold',
        icon: '🍽️',
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-white">Nutrition</h1>
        <Utensils className="w-8 h-8 text-[#ffd700]" />
      </div>
      
      {/* Tabs */}
      <div className="flex space-x-1 bg-[#1a1f3a] rounded-lg p-1">
        <button
          onClick={() => setActiveTab('today')}
          className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-md transition-all duration-200 ${
            activeTab === 'today'
              ? 'bg-[#4a90e2] text-white shadow-lg'
              : 'text-gray-400 hover:text-white hover:bg-[#4a90e2]/20'
          }`}
        >
          <Calendar className="w-5 h-5" />
          <span className="font-medium">Today's Meals</span>
        </button>
        <button
          onClick={() => setActiveTab('plans')}
          className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-md transition-all duration-200 ${
            activeTab === 'plans'
              ? 'bg-[#4a90e2] text-white shadow-lg'
              : 'text-gray-400 hover:text-white hover:bg-[#4a90e2]/20'
          }`}
        >
          <Utensils className="w-5 h-5" />
          <span className="font-medium">My Meal Plans</span>
        </button>
        <button
          onClick={() => setActiveTab('scanner')}
          className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-md transition-all duration-200 ${
            activeTab === 'scanner'
              ? 'bg-[#4a90e2] text-white shadow-lg'
              : 'text-gray-400 hover:text-white hover:bg-[#4a90e2]/20'
          }`}
        >
          <Camera className="w-5 h-5" />
          <span className="font-medium">Food Scanner</span>
        </button>
      </div>

      {/* Content */}
      {activeTab === 'today' && (
        <div>
          <NutritionProgress dailyNutrition={dailyNutrition} />
          
          <div className="space-y-4">
            <MealSection
              type="breakfast"
              meals={dailyNutrition.meals}
              onAddMeal={handleAddMeal}
              onEditMeal={handleEditMeal}
              onDeleteMeal={handleDeleteMeal}
            />
            <MealSection
              type="lunch"
              meals={dailyNutrition.meals}
              onAddMeal={handleAddMeal}
              onEditMeal={handleEditMeal}
              onDeleteMeal={handleDeleteMeal}
            />
            <MealSection
              type="dinner"
              meals={dailyNutrition.meals}
              onAddMeal={handleAddMeal}
              onEditMeal={handleEditMeal}
              onDeleteMeal={handleDeleteMeal}
            />
            <MealSection
              type="snack"
              meals={dailyNutrition.meals}
              onAddMeal={handleAddMeal}
              onEditMeal={handleEditMeal}
              onDeleteMeal={handleDeleteMeal}
            />
          </div>
        </div>
      )}

      {activeTab === 'plans' && (
        <MealPlansTab onImportPlan={handleImportPlan} />
      )}

      {activeTab === 'scanner' && (
        <div className="bg-[#1a1f3a] rounded-xl p-8 border border-[#4a90e2]/20 text-center">
          <Camera className="w-16 h-16 text-[#4a90e2] mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-white mb-2">Food Scanner</h3>
          <p className="text-gray-400">Coming soon - Scan barcodes and food labels to instantly log nutrition!</p>
        </div>
      )}
    </div>
  );
};