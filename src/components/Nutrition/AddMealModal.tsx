import React, { useState } from 'react';
import { X, Search, Plus } from 'lucide-react';
import { LoggedMeal, COMMON_FOODS, Food } from '../../types/nutrition';

interface AddMealModalProps {
  mealType: 'breakfast' | 'lunch' | 'dinner' | 'snack';
  initialData?: LoggedMeal;
  isEditing?: boolean;
  onClose: () => void;
  onSave: (meal: Omit<LoggedMeal, 'id' | 'timestamp'>) => void;
}

export const AddMealModal: React.FC<AddMealModalProps> = ({
  mealType,
  initialData,
  isEditing = false,
  onClose,
  onSave,
}) => {
  const [activeTab, setActiveTab] = useState<'search' | 'manual'>('search');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  
  // Manual entry form
  const [manualForm, setManualForm] = useState({
    name: initialData?.name || '',
    calories: initialData?.calories || 0,
    protein: initialData?.protein || 0,
    carbs: initialData?.carbs || 0,
    fat: initialData?.fat || 0,
    notes: initialData?.notes || '',
  });

  const categories = [
    { value: 'all', label: 'All Foods' },
    { value: 'protein', label: 'Protein' },
    { value: 'carbs', label: 'Carbs' },
    { value: 'fats', label: 'Fats' },
    { value: 'vegetables', label: 'Vegetables' },
    { value: 'fruits', label: 'Fruits' },
    { value: 'dairy', label: 'Dairy' },
    { value: 'prepared', label: 'Prepared' },
  ];

  const filteredFoods = COMMON_FOODS.filter(food => {
    const matchesSearch = food.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || food.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleFoodSelect = (food: Food) => {
    const meal = {
      name: food.name,
      calories: food.calories,
      protein: food.protein,
      carbs: food.carbs,
      fat: food.fat,
      type: mealType,
      notes: '',
    };
    onSave(meal);
  };

  const handleManualSave = () => {
    if (!manualForm.name.trim() || manualForm.calories <= 0) return;
    
    const meal = {
      name: manualForm.name.trim(),
      calories: manualForm.calories,
      protein: manualForm.protein,
      carbs: manualForm.carbs,
      fat: manualForm.fat,
      type: mealType,
      notes: manualForm.notes.trim(),
    };
    onSave(meal);
  };

  const updateManualForm = (field: string, value: string | number) => {
    setManualForm(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-[#1a1f3a] rounded-xl w-full max-w-2xl max-h-[90vh] overflow-hidden border border-[#4a90e2]/20">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-[#4a90e2]/20">
          <h2 className="text-xl font-bold text-white">
            {isEditing ? 'Edit' : 'Add'} {mealType.charAt(0).toUpperCase() + mealType.slice(1)}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-[#4a90e2]/20">
          <button
            onClick={() => setActiveTab('search')}
            className={`flex-1 py-3 px-4 text-center transition-colors ${
              activeTab === 'search'
                ? 'bg-[#4a90e2] text-white'
                : 'text-gray-400 hover:text-white hover:bg-[#4a90e2]/20'
            }`}
          >
            <Search className="w-4 h-4 inline mr-2" />
            Search Foods
          </button>
          <button
            onClick={() => setActiveTab('manual')}
            className={`flex-1 py-3 px-4 text-center transition-colors ${
              activeTab === 'manual'
                ? 'bg-[#4a90e2] text-white'
                : 'text-gray-400 hover:text-white hover:bg-[#4a90e2]/20'
            }`}
          >
            <Plus className="w-4 h-4 inline mr-2" />
            Manual Entry
          </button>
        </div>

        <div className="p-6 overflow-y-auto max-h-[60vh]">
          {activeTab === 'search' ? (
            <div className="space-y-4">
              {/* Search Input */}
              <div>
                <input
                  type="text"
                  placeholder="Search for foods..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-4 py-3 bg-[#0a0e27] border border-[#4a90e2]/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-[#4a90e2]"
                />
              </div>

              {/* Category Filter */}
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <button
                    key={category.value}
                    onClick={() => setSelectedCategory(category.value)}
                    className={`px-3 py-1 rounded-full text-sm transition-colors ${
                      selectedCategory === category.value
                        ? 'bg-[#4a90e2] text-white'
                        : 'bg-[#0a0e27] text-gray-400 hover:text-white hover:bg-[#4a90e2]/20'
                    }`}
                  >
                    {category.label}
                  </button>
                ))}
              </div>

              {/* Food Results */}
              <div className="space-y-2 max-h-96 overflow-y-auto">
                {filteredFoods.length === 0 ? (
                  <div className="text-center py-8 text-gray-400">
                    {searchQuery ? 'No foods found matching your search' : 'Start typing to search foods'}
                  </div>
                ) : (
                  filteredFoods.map((food) => (
                    <div
                      key={food.id}
                      className="bg-[#0a0e27] rounded-lg p-4 border border-[#4a90e2]/10 hover:border-[#4a90e2]/30 transition-colors"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <h4 className="text-white font-medium mb-1">{food.name}</h4>
                          <div className="flex items-center space-x-4 text-sm text-gray-400">
                            <span>{food.calories} cal</span>
                            <span>P: {food.protein}g</span>
                            <span>C: {food.carbs}g</span>
                            <span>F: {food.fat}g</span>
                          </div>
                          <div className="text-xs text-gray-500 mt-1">
                            Serving: {food.serving}
                          </div>
                        </div>
                        <button
                          onClick={() => handleFoodSelect(food)}
                          className="px-4 py-2 bg-[#4a90e2] hover:bg-[#5a9ff2] text-white rounded-lg transition-colors text-sm"
                        >
                          Add
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Meal Name *
                </label>
                <input
                  type="text"
                  value={manualForm.name}
                  onChange={(e) => updateManualForm('name', e.target.value)}
                  className="w-full px-4 py-3 bg-[#0a0e27] border border-[#4a90e2]/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-[#4a90e2]"
                  placeholder="Enter meal name"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Calories *
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={manualForm.calories || ''}
                    onChange={(e) => updateManualForm('calories', parseFloat(e.target.value) || 0)}
                    className="w-full px-4 py-3 bg-[#0a0e27] border border-[#4a90e2]/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-[#4a90e2]"
                    placeholder="0"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Protein (g)
                  </label>
                  <input
                    type="number"
                    min="0"
                    step="0.1"
                    value={manualForm.protein || ''}
                    onChange={(e) => updateManualForm('protein', parseFloat(e.target.value) || 0)}
                    className="w-full px-4 py-3 bg-[#0a0e27] border border-[#4a90e2]/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-[#4a90e2]"
                    placeholder="0"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Carbs (g)
                  </label>
                  <input
                    type="number"
                    min="0"
                    step="0.1"
                    value={manualForm.carbs || ''}
                    onChange={(e) => updateManualForm('carbs', parseFloat(e.target.value) || 0)}
                    className="w-full px-4 py-3 bg-[#0a0e27] border border-[#4a90e2]/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-[#4a90e2]"
                    placeholder="0"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Fat (g)
                  </label>
                  <input
                    type="number"
                    min="0"
                    step="0.1"
                    value={manualForm.fat || ''}
                    onChange={(e) => updateManualForm('fat', parseFloat(e.target.value) || 0)}
                    className="w-full px-4 py-3 bg-[#0a0e27] border border-[#4a90e2]/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-[#4a90e2]"
                    placeholder="0"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Notes (optional)
                </label>
                <textarea
                  value={manualForm.notes}
                  onChange={(e) => updateManualForm('notes', e.target.value)}
                  className="w-full px-4 py-3 bg-[#0a0e27] border border-[#4a90e2]/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-[#4a90e2] resize-none"
                  rows={3}
                  placeholder="Any additional notes..."
                />
              </div>

              <div className="flex space-x-3 pt-4">
                <button
                  onClick={onClose}
                  className="flex-1 px-4 py-3 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleManualSave}
                  disabled={!manualForm.name.trim() || manualForm.calories <= 0}
                  className="flex-1 px-4 py-3 bg-[#4a90e2] hover:bg-[#5a9ff2] text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isEditing ? 'Update' : 'Add'} Meal
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};