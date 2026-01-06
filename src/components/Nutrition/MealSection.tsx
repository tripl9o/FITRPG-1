import React, { useState } from 'react';
import { Plus, Eye, CreditCard as Edit, Trash2 } from 'lucide-react';
import { LoggedMeal } from '../../types/nutrition';
import { AddMealModal } from './AddMealModal';

interface MealSectionProps {
  type: 'breakfast' | 'lunch' | 'dinner' | 'snack';
  meals: LoggedMeal[];
  onAddMeal: (meal: Omit<LoggedMeal, 'id' | 'timestamp'>) => void;
  onEditMeal: (mealId: string, meal: Partial<LoggedMeal>) => void;
  onDeleteMeal: (mealId: string) => void;
}

const mealIcons = {
  breakfast: '🍳',
  lunch: '🍽️',
  dinner: '🍲',
  snack: '🍎'
};

const mealLabels = {
  breakfast: 'BREAKFAST',
  lunch: 'LUNCH',
  dinner: 'DINNER',
  snack: 'SNACKS'
};

export const MealSection: React.FC<MealSectionProps> = ({
  type,
  meals,
  onAddMeal,
  onEditMeal,
  onDeleteMeal,
}) => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingMeal, setEditingMeal] = useState<LoggedMeal | null>(null);

  const mealsByType = meals.filter(meal => meal.type === type);
  const totalCalories = mealsByType.reduce((sum, meal) => sum + meal.calories, 0);
  const totalProtein = mealsByType.reduce((sum, meal) => sum + meal.protein, 0);
  const totalCarbs = mealsByType.reduce((sum, meal) => sum + meal.carbs, 0);
  const totalFat = mealsByType.reduce((sum, meal) => sum + meal.fat, 0);

  const handleAddMeal = (mealData: Omit<LoggedMeal, 'id' | 'timestamp'>) => {
    onAddMeal({ ...mealData, type });
    setShowAddModal(false);
  };

  const handleEditMeal = (mealData: Omit<LoggedMeal, 'id' | 'timestamp'>) => {
    if (editingMeal) {
      onEditMeal(editingMeal.id, mealData);
      setEditingMeal(null);
    }
  };

  return (
    <>
      <div className="bg-[#1a1f3a] rounded-xl p-6 border border-[#4a90e2]/20 mb-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <span className="text-2xl">{mealIcons[type]}</span>
            <h3 className="text-lg font-bold text-white">{mealLabels[type]}</h3>
            {mealsByType.length > 0 && (
              <span className="text-gray-400 text-sm">
                {totalCalories} cal
              </span>
            )}
          </div>
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center space-x-2 px-4 py-2 bg-[#4a90e2] hover:bg-[#5a9ff2] text-white rounded-lg transition-colors text-sm"
          >
            <Plus className="w-4 h-4" />
            <span>Add {type === 'snack' ? 'Snack' : 'Meal'}</span>
          </button>
        </div>

        {mealsByType.length === 0 ? (
          <div className="text-center py-6 text-gray-400">
            <span>No {type === 'snack' ? 'snacks' : 'meal'} logged</span>
          </div>
        ) : (
          <div className="space-y-3">
            {mealsByType.map((meal) => (
              <div
                key={meal.id}
                className="bg-[#0a0e27] rounded-lg p-4 border border-[#4a90e2]/10"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h4 className="text-white font-medium mb-1">{meal.name}</h4>
                    <div className="flex items-center space-x-4 text-sm text-gray-400">
                      <span>{meal.calories} cal</span>
                      <span>P: {Math.round(meal.protein)}g</span>
                      <span>C: {Math.round(meal.carbs)}g</span>
                      <span>F: {Math.round(meal.fat)}g</span>
                    </div>
                    {meal.notes && (
                      <p className="text-gray-400 text-sm mt-2">{meal.notes}</p>
                    )}
                  </div>
                  <div className="flex items-center space-x-2 ml-4">
                    <button
                      onClick={() => setEditingMeal(meal)}
                      className="p-2 text-gray-400 hover:text-white hover:bg-[#4a90e2]/20 rounded-lg transition-colors"
                      title="Edit meal"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => onDeleteMeal(meal.id)}
                      className="p-2 text-gray-400 hover:text-red-400 hover:bg-red-500/20 rounded-lg transition-colors"
                      title="Delete meal"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
            
            {mealsByType.length > 1 && (
              <div className="border-t border-[#4a90e2]/20 pt-3 mt-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-300 font-medium">Total:</span>
                  <div className="flex items-center space-x-4 text-gray-300">
                    <span>{totalCalories} cal</span>
                    <span>P: {Math.round(totalProtein)}g</span>
                    <span>C: {Math.round(totalCarbs)}g</span>
                    <span>F: {Math.round(totalFat)}g</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {showAddModal && (
        <AddMealModal
          mealType={type}
          onClose={() => setShowAddModal(false)}
          onSave={handleAddMeal}
        />
      )}

      {editingMeal && (
        <AddMealModal
          mealType={type}
          initialData={editingMeal}
          onClose={() => setEditingMeal(null)}
          onSave={handleEditMeal}
          isEditing
        />
      )}
    </>
  );
};