import React, { useState, useEffect } from 'react';
import { Bot, Plus, Eye, Trash2, Calendar } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { SavedMealPlan, LoggedMeal } from '../../types/nutrition';

interface MealPlansTabProps {
  onImportPlan: (meals: Omit<LoggedMeal, 'id' | 'timestamp'>[]) => void;
}

export const MealPlansTab: React.FC<MealPlansTabProps> = ({ onImportPlan }) => {
  const navigate = useNavigate();
  const [savedPlans, setSavedPlans] = useState<SavedMealPlan[]>([]);
  const [viewingPlan, setViewingPlan] = useState<SavedMealPlan | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem('fitRPG-meal-plans');
    if (saved) {
      setSavedPlans(JSON.parse(saved));
    }
  }, []);

  const handleDeletePlan = (planId: string) => {
    const updatedPlans = savedPlans.filter(plan => plan.id !== planId);
    setSavedPlans(updatedPlans);
    localStorage.setItem('fitRPG-meal-plans', JSON.stringify(updatedPlans));
  };

  const handleUsePlan = (plan: SavedMealPlan) => {
    const mealsToImport: Omit<LoggedMeal, 'id' | 'timestamp'>[] = plan.meals.map(meal => ({
      name: meal.name,
      calories: meal.calories,
      protein: meal.protein,
      carbs: meal.carbs,
      fat: meal.fat,
      type: meal.type,
      notes: meal.ingredients ? `Ingredients: ${meal.ingredients.join(', ')}` : '',
    }));

    if (confirm(`Add all meals from "${plan.name}" to today?`)) {
      onImportPlan(mealsToImport);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  return (
    <>
      <div className="space-y-6">
        {/* Generate New Plan */}
        <div className="bg-[#1a1f3a] rounded-xl p-6 border border-[#4a90e2]/20">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-white mb-2">My Meal Plans</h2>
              <p className="text-gray-400">Manage your AI-generated meal plans</p>
            </div>
            <button
              onClick={() => navigate('/ai-personalization')}
              className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-[#4a90e2] to-[#6a5acd] hover:from-[#5a9ff2] hover:to-[#7a6add] text-white rounded-lg transition-all duration-200 transform hover:scale-105"
            >
              <Bot className="w-5 h-5" />
              <span>Generate New Plan</span>
            </button>
          </div>
        </div>

        {/* Saved Plans */}
        <div className="space-y-4">
          {savedPlans.length === 0 ? (
            <div className="bg-[#1a1f3a] rounded-xl p-8 border border-[#4a90e2]/20 text-center">
              <Bot className="w-16 h-16 text-[#4a90e2] mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">No Meal Plans Yet</h3>
              <p className="text-gray-400 mb-4">
                Generate your first personalized meal plan with AI
              </p>
              <button
                onClick={() => navigate('/ai-personalization')}
                className="px-6 py-3 bg-[#4a90e2] hover:bg-[#5a9ff2] text-white rounded-lg transition-colors"
              >
                Get Started
              </button>
            </div>
          ) : (
            savedPlans.map(plan => (
              <div key={plan.id} className="bg-[#1a1f3a] rounded-xl p-6 border border-[#4a90e2]/20">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-white mb-2">{plan.name}</h3>
                    <div className="flex items-center space-x-4 text-sm text-gray-400 mb-3">
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-4 h-4" />
                        <span>Created: {formatDate(plan.createdAt)}</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-6 text-sm">
                      <span className="text-[#4a90e2] font-semibold">
                        {plan.totalCalories.toLocaleString()} cal
                      </span>
                      <span className="text-gray-300">
                        {plan.totalMacros.protein}g P
                      </span>
                      <span className="text-gray-300">
                        {plan.totalMacros.carbs}g C
                      </span>
                      <span className="text-gray-300">
                        {plan.totalMacros.fat}g F
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2 ml-4">
                    <button
                      onClick={() => setViewingPlan(plan)}
                      className="flex items-center space-x-1 px-3 py-2 bg-[#0a0e27] hover:bg-[#4a90e2]/20 text-gray-300 hover:text-white rounded-lg text-sm transition-colors"
                    >
                      <Eye className="w-4 h-4" />
                      <span>View</span>
                    </button>
                    <button
                      onClick={() => handleUsePlan(plan)}
                      className="flex items-center space-x-1 px-3 py-2 bg-[#4a90e2] hover:bg-[#5a9ff2] text-white rounded-lg text-sm transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Use Today</span>
                    </button>
                    <button
                      onClick={() => handleDeletePlan(plan.id)}
                      className="flex items-center space-x-1 px-3 py-2 bg-red-600/20 hover:bg-red-600/30 text-red-400 hover:text-red-300 rounded-lg text-sm transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                      <span>Delete</span>
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* View Plan Modal */}
      {viewingPlan && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-[#1a1f3a] rounded-xl w-full max-w-4xl max-h-[90vh] overflow-hidden border border-[#4a90e2]/20">
            <div className="flex items-center justify-between p-6 border-b border-[#4a90e2]/20">
              <h2 className="text-xl font-bold text-white">{viewingPlan.name}</h2>
              <button
                onClick={() => setViewingPlan(null)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                ×
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto max-h-[70vh]">
              {/* Plan Overview */}
              <div className="bg-[#0a0e27] rounded-lg p-4 mb-6">
                <h3 className="text-white font-semibold mb-3">Daily Totals</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-[#4a90e2]">
                      {viewingPlan.totalCalories.toLocaleString()}
                    </div>
                    <div className="text-gray-400 text-sm">Calories</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-[#4a90e2]">
                      {viewingPlan.totalMacros.protein}g
                    </div>
                    <div className="text-gray-400 text-sm">Protein</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-[#4a90e2]">
                      {viewingPlan.totalMacros.carbs}g
                    </div>
                    <div className="text-gray-400 text-sm">Carbs</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-[#4a90e2]">
                      {viewingPlan.totalMacros.fat}g
                    </div>
                    <div className="text-gray-400 text-sm">Fat</div>
                  </div>
                </div>
              </div>

              {/* Meals */}
              <div className="space-y-4">
                {viewingPlan.meals.map((meal, index) => (
                  <div key={index} className="bg-[#0a0e27] rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="text-white font-medium capitalize">
                        {meal.type} - {meal.name}
                      </h4>
                      <div className="flex items-center space-x-4 text-sm text-gray-400">
                        <span>{meal.calories} cal</span>
                        <span>P: {meal.protein}g</span>
                        <span>C: {meal.carbs}g</span>
                        <span>F: {meal.fat}g</span>
                      </div>
                    </div>
                    
                    {meal.ingredients && (
                      <div className="mb-2">
                        <h5 className="text-gray-300 text-sm font-medium mb-1">Ingredients:</h5>
                        <ul className="text-gray-400 text-sm">
                          {meal.ingredients.map((ingredient, i) => (
                            <li key={i}>• {ingredient}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                    
                    {meal.instructions && (
                      <div>
                        <h5 className="text-gray-300 text-sm font-medium mb-1">Instructions:</h5>
                        <ol className="text-gray-400 text-sm">
                          {meal.instructions.map((instruction, i) => (
                            <li key={i}>{i + 1}. {instruction}</li>
                          ))}
                        </ol>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
            
            <div className="p-6 border-t border-[#4a90e2]/20">
              <div className="flex space-x-3">
                <button
                  onClick={() => {
                    handleUsePlan(viewingPlan);
                    setViewingPlan(null);
                  }}
                  className="flex-1 px-4 py-3 bg-[#4a90e2] hover:bg-[#5a9ff2] text-white rounded-lg transition-colors"
                >
                  Use This Plan Today
                </button>
                <button
                  onClick={() => setViewingPlan(null)}
                  className="px-6 py-3 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};