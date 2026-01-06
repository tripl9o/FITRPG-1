import React, { useState, useEffect } from 'react';
import { Bot, Dumbbell, Utensils, ArrowLeft, Save, RotateCcw, Download, Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface WorkoutPlan {
  planName: string;
  splitType: string;
  overview: string;
  weeklySchedule: Array<{
    day: number;
    name: string;
    warmup: string;
    exercises: Array<{
      name: string;
      sets: number;
      reps: string;
      rest: string;
      notes: string;
    }>;
    cooldown: string;
  }>;
  progressionTips: string;
}

interface MealPlan {
  planName: string;
  totalCalories: number;
  totalMacros: {
    protein: number;
    carbs: number;
    fat: number;
  };
  meals: Array<{
    type: string;
    name: string;
    prepTime: string;
    ingredients: Array<{
      item: string;
      amount: string;
      calories: number;
    }>;
    totalCalories: number;
    macros: {
      protein: number;
      carbs: number;
      fat: number;
    };
    instructions: string[];
    substitutions: string;
  }>;
  mealPrepTips: string;
}

export const AIPersonalizationPage: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'workout' | 'meal'>('workout');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedWorkoutPlan, setGeneratedWorkoutPlan] = useState<WorkoutPlan | null>(null);
  const [generatedMealPlan, setGeneratedMealPlan] = useState<MealPlan | null>(null);

  // Workout form state
  const [workoutDays, setWorkoutDays] = useState<number>(4);
  const [sessionDuration, setSessionDuration] = useState<number>(60);

  // Meal form state
  const [dietaryPreferences, setDietaryPreferences] = useState<string[]>(['No restrictions']);
  const [allergies, setAllergies] = useState<string>('');
  const [mealsPerDay, setMealsPerDay] = useState<string>('3 meals');

  // Load user data from localStorage
  const [userData, setUserData] = useState<any>(null);

  useEffect(() => {
    const onboardingData = localStorage.getItem('fitRPG-onboarding-data');
    if (onboardingData) {
      setUserData(JSON.parse(onboardingData));
    }
  }, []);

  const handleDietaryPreferenceToggle = (preference: string) => {
    if (preference === 'No restrictions') {
      setDietaryPreferences(['No restrictions']);
    } else {
      const newPrefs = dietaryPreferences.filter(p => p !== 'No restrictions');
      if (dietaryPreferences.includes(preference)) {
        const filtered = newPrefs.filter(p => p !== preference);
        setDietaryPreferences(filtered.length === 0 ? ['No restrictions'] : filtered);
      } else {
        setDietaryPreferences([...newPrefs, preference]);
      }
    }
  };

  const generateWorkoutPlan = async () => {
    setIsGenerating(true);
    
    // Simulate AI generation with realistic data
    setTimeout(() => {
      const mockPlan: WorkoutPlan = {
        planName: `${workoutDays}-Day ${userData?.experienceLevel === 'beginner' ? 'Full Body' : 'Push/Pull/Legs'} Split`,
        splitType: userData?.experienceLevel === 'beginner' ? 'Full Body' : 'Push/Pull/Legs',
        overview: `This ${workoutDays}-day plan is designed for ${userData?.experienceLevel} level athletes focusing on ${userData?.fitnessGoal}. Each session is optimized for ${sessionDuration} minutes with ${userData?.equipmentAccess} equipment.`,
        weeklySchedule: [
          {
            day: 1,
            name: "Push Day (Chest, Shoulders, Triceps)",
            warmup: "5 min light cardio + dynamic arm circles and shoulder rolls",
            exercises: [
              {
                name: "Barbell Bench Press",
                sets: 4,
                reps: "8-10",
                rest: "2-3 min",
                notes: "Control the descent, explosive press up"
              },
              {
                name: "Overhead Press",
                sets: 3,
                reps: "8-10",
                rest: "2 min",
                notes: "Keep core tight, press straight up"
              },
              {
                name: "Incline Dumbbell Press",
                sets: 3,
                reps: "10-12",
                rest: "90 sec",
                notes: "45-degree angle, full range of motion"
              },
              {
                name: "Lateral Raises",
                sets: 3,
                reps: "12-15",
                rest: "60 sec",
                notes: "Slight bend in elbows, control the weight"
              },
              {
                name: "Tricep Dips",
                sets: 3,
                reps: "10-12",
                rest: "90 sec",
                notes: "Full range of motion, lean forward slightly"
              }
            ],
            cooldown: "5 min upper body stretching focusing on chest and shoulders"
          },
          {
            day: 2,
            name: "Pull Day (Back, Biceps)",
            warmup: "5 min light cardio + arm swings and band pull-aparts",
            exercises: [
              {
                name: "Deadlifts",
                sets: 4,
                reps: "6-8",
                rest: "3 min",
                notes: "Keep back straight, drive through heels"
              },
              {
                name: "Pull-ups/Lat Pulldowns",
                sets: 3,
                reps: "8-10",
                rest: "2 min",
                notes: "Full range of motion, squeeze shoulder blades"
              },
              {
                name: "Barbell Rows",
                sets: 3,
                reps: "8-10",
                rest: "2 min",
                notes: "Pull to lower chest, control the weight"
              },
              {
                name: "Face Pulls",
                sets: 3,
                reps: "12-15",
                rest: "60 sec",
                notes: "Pull to face level, squeeze rear delts"
              },
              {
                name: "Barbell Curls",
                sets: 3,
                reps: "10-12",
                rest: "90 sec",
                notes: "Control the negative, no swinging"
              }
            ],
            cooldown: "5 min back and bicep stretching"
          },
          {
            day: 3,
            name: "Legs (Quads, Hamstrings, Glutes, Calves)",
            warmup: "5 min light cardio + leg swings and bodyweight squats",
            exercises: [
              {
                name: "Squats",
                sets: 4,
                reps: "8-10",
                rest: "3 min",
                notes: "Depth to parallel, drive through heels"
              },
              {
                name: "Romanian Deadlifts",
                sets: 3,
                reps: "10-12",
                rest: "2 min",
                notes: "Feel stretch in hamstrings, control the weight"
              },
              {
                name: "Bulgarian Split Squats",
                sets: 3,
                reps: "10-12 each leg",
                rest: "90 sec",
                notes: "Focus on front leg, maintain balance"
              },
              {
                name: "Leg Press",
                sets: 3,
                reps: "12-15",
                rest: "2 min",
                notes: "Full range of motion, control the negative"
              },
              {
                name: "Calf Raises",
                sets: 4,
                reps: "15-20",
                rest: "60 sec",
                notes: "Full stretch and contraction"
              }
            ],
            cooldown: "5 min leg stretching focusing on quads and hamstrings"
          }
        ],
        progressionTips: "Add 5-10 lbs when you can complete all sets with perfect form. Focus on progressive overload week by week. Track your workouts to monitor progress."
      };

      setGeneratedWorkoutPlan(mockPlan);
      setIsGenerating(false);
    }, 3000);
  };

  const generateMealPlan = async () => {
    setIsGenerating(true);
    
    // Simulate AI generation with realistic data
    setTimeout(() => {
      const mockPlan: MealPlan = {
        planName: `${userData?.calculatedStats?.recommendedCalories || 2200} Cal ${userData?.fitnessGoal === 'gain-muscle' ? 'Muscle Gain' : 'Fat Loss'} Plan`,
        totalCalories: userData?.calculatedStats?.recommendedCalories || 2200,
        totalMacros: userData?.calculatedStats?.macros || {
          protein: 180,
          carbs: 220,
          fat: 70
        },
        meals: [
          {
            type: "Breakfast",
            name: "Protein Oatmeal Bowl",
            prepTime: "10 minutes",
            ingredients: [
              { item: "Rolled oats", amount: "80g", calories: 304 },
              { item: "Vanilla protein powder", amount: "30g", calories: 120 },
              { item: "Banana", amount: "1 medium", calories: 105 },
              { item: "Almond butter", amount: "1 tbsp", calories: 98 }
            ],
            totalCalories: 627,
            macros: { protein: 35, carbs: 65, fat: 15 },
            instructions: [
              "Cook oats with water or milk according to package directions",
              "Mix in protein powder while oats are still warm",
              "Slice banana and add on top",
              "Drizzle with almond butter"
            ],
            substitutions: "Can swap protein powder for Greek yogurt, or almond butter for peanut butter"
          },
          {
            type: "Lunch",
            name: "Grilled Chicken & Quinoa Bowl",
            prepTime: "20 minutes",
            ingredients: [
              { item: "Chicken breast", amount: "150g", calories: 231 },
              { item: "Quinoa (cooked)", amount: "100g", calories: 120 },
              { item: "Mixed vegetables", amount: "150g", calories: 50 },
              { item: "Olive oil", amount: "1 tbsp", calories: 120 },
              { item: "Avocado", amount: "1/2 medium", calories: 120 }
            ],
            totalCalories: 641,
            macros: { protein: 40, carbs: 35, fat: 25 },
            instructions: [
              "Season and grill chicken breast until cooked through",
              "Cook quinoa according to package directions",
              "Steam or sauté mixed vegetables with olive oil",
              "Slice avocado and combine all ingredients in a bowl"
            ],
            substitutions: "Can use salmon instead of chicken, or brown rice instead of quinoa"
          },
          {
            type: "Dinner",
            name: "Lean Beef Stir-Fry",
            prepTime: "15 minutes",
            ingredients: [
              { item: "Lean ground beef", amount: "120g", calories: 250 },
              { item: "Brown rice (cooked)", amount: "100g", calories: 112 },
              { item: "Broccoli", amount: "200g", calories: 68 },
              { item: "Bell peppers", amount: "100g", calories: 31 },
              { item: "Sesame oil", amount: "1 tsp", calories: 40 }
            ],
            totalCalories: 501,
            macros: { protein: 35, carbs: 40, fat: 12 },
            instructions: [
              "Cook ground beef in a large pan until browned",
              "Add vegetables and stir-fry for 5-7 minutes",
              "Season with soy sauce and sesame oil",
              "Serve over brown rice"
            ],
            substitutions: "Can use turkey instead of beef, or cauliflower rice for lower carbs"
          },
          {
            type: "Snack",
            name: "Greek Yogurt & Berries",
            prepTime: "2 minutes",
            ingredients: [
              { item: "Greek yogurt (plain)", amount: "200g", calories: 130 },
              { item: "Mixed berries", amount: "100g", calories: 57 },
              { item: "Honey", amount: "1 tsp", calories: 21 },
              { item: "Almonds", amount: "15g", calories: 87 }
            ],
            totalCalories: 295,
            macros: { protein: 20, carbs: 25, fat: 8 },
            instructions: [
              "Add berries to Greek yogurt",
              "Drizzle with honey",
              "Top with chopped almonds"
            ],
            substitutions: "Can use any seasonal fruit, or walnuts instead of almonds"
          }
        ],
        mealPrepTips: "Cook all proteins on Sunday. Pre-cut vegetables and store in containers. Cook grains in bulk and portion out. Prepare overnight oats for quick breakfasts."
      };

      setGeneratedMealPlan(mockPlan);
      setIsGenerating(false);
    }, 3000);
  };

  const saveWorkoutPlan = () => {
    if (!generatedWorkoutPlan) return;
    
    const savedPlans = JSON.parse(localStorage.getItem('fitRPG-workout-plans') || '[]');
    const newPlan = {
      id: `plan_${Date.now()}`,
      name: generatedWorkoutPlan.planName,
      createdAt: new Date().toISOString().split('T')[0],
      data: generatedWorkoutPlan
    };
    
    savedPlans.push(newPlan);
    localStorage.setItem('fitRPG-workout-plans', JSON.stringify(savedPlans));
    
    // Show success message (you could add a toast notification here)
    alert('Workout plan saved successfully!');
  };

  const saveMealPlan = () => {
    if (!generatedMealPlan) return;
    
    const savedPlans = JSON.parse(localStorage.getItem('fitRPG-meal-plans') || '[]');
    const newPlan = {
      id: `plan_${Date.now()}`,
      name: generatedMealPlan.planName,
      createdAt: new Date().toISOString().split('T')[0],
      totalCalories: generatedMealPlan.totalCalories,
      totalMacros: generatedMealPlan.totalMacros,
      meals: generatedMealPlan.meals.map(meal => ({
        type: meal.type.toLowerCase(),
        name: meal.name,
        calories: meal.totalCalories,
        protein: meal.macros.protein,
        carbs: meal.macros.carbs,
        fat: meal.macros.fat,
        ingredients: meal.ingredients.map(ingredient => ingredient.item),
        instructions: meal.instructions
      }))
    };
    
    savedPlans.push(newPlan);
    localStorage.setItem('fitRPG-meal-plans', JSON.stringify(savedPlans));
    
    alert('Meal plan saved successfully!');
  };

  const resetWorkoutForm = () => {
    setGeneratedWorkoutPlan(null);
    setWorkoutDays(4);
    setSessionDuration(60);
  };

  const resetMealForm = () => {
    setGeneratedMealPlan(null);
    setDietaryPreferences(['No restrictions']);
    setAllergies('');
    setMealsPerDay('3 meals');
  };

  if (!userData) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <Bot className="w-16 h-16 text-[#4a90e2] mx-auto mb-4" />
          <p className="text-gray-400">Loading your profile data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Bot className="w-8 h-8 text-[#4a90e2]" />
          <h1 className="text-3xl font-bold text-white">AI Personalization Hub</h1>
        </div>
        <button
          onClick={() => navigate('/dashboard')}
          className="flex items-center space-x-2 px-4 py-2 bg-[#1a1f3a] hover:bg-[#4a90e2]/20 text-gray-300 hover:text-white rounded-lg transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Dashboard</span>
        </button>
      </div>

      {/* Tabs */}
      <div className="flex space-x-1 bg-[#1a1f3a] rounded-lg p-1">
        <button
          onClick={() => setActiveTab('workout')}
          className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-md transition-all duration-200 ${
            activeTab === 'workout'
              ? 'bg-[#4a90e2] text-white shadow-lg'
              : 'text-gray-400 hover:text-white hover:bg-[#4a90e2]/20'
          }`}
        >
          <Dumbbell className="w-5 h-5" />
          <span className="font-medium">Workout Generator</span>
        </button>
        <button
          onClick={() => setActiveTab('meal')}
          className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-md transition-all duration-200 ${
            activeTab === 'meal'
              ? 'bg-[#4a90e2] text-white shadow-lg'
              : 'text-gray-400 hover:text-white hover:bg-[#4a90e2]/20'
          }`}
        >
          <Utensils className="w-5 h-5" />
          <span className="font-medium">Meal Generator</span>
        </button>
      </div>

      {/* Content */}
      <div className="bg-[#1a1f3a] rounded-xl p-6 border border-[#4a90e2]/20">
        {activeTab === 'workout' ? (
          <div>
            {!generatedWorkoutPlan ? (
              <div className="space-y-6">
                <div className="flex items-center space-x-3 mb-6">
                  <Dumbbell className="w-6 h-6 text-[#4a90e2]" />
                  <h2 className="text-xl font-bold text-white">Generate Your Workout Plan</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Training Days */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-3">
                      Training Days Per Week:
                    </label>
                    <div className="grid grid-cols-4 gap-2">
                      {[3, 4, 5, 6].map((days) => (
                        <button
                          key={days}
                          onClick={() => setWorkoutDays(days)}
                          className={`py-3 px-4 rounded-lg font-semibold transition-all duration-200 ${
                            workoutDays === days
                              ? 'bg-[#4a90e2] text-white'
                              : 'bg-[#0a0e27] text-gray-300 hover:bg-[#4a90e2]/20 hover:text-white'
                          }`}
                        >
                          {days}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Session Duration */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-3">
                      Session Duration:
                    </label>
                    <div className="grid grid-cols-4 gap-2">
                      {[30, 45, 60, 90].map((duration) => (
                        <button
                          key={duration}
                          onClick={() => setSessionDuration(duration)}
                          className={`py-3 px-4 rounded-lg font-semibold transition-all duration-200 ${
                            sessionDuration === duration
                              ? 'bg-[#4a90e2] text-white'
                              : 'bg-[#0a0e27] text-gray-300 hover:bg-[#4a90e2]/20 hover:text-white'
                          }`}
                        >
                          {duration}m
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Profile Summary */}
                <div className="bg-[#0a0e27] rounded-lg p-4">
                  <h3 className="text-gray-300 font-medium mb-2">Using your profile data:</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div>
                      <span className="text-gray-400">Goal:</span>
                      <span className="text-[#4a90e2] font-semibold ml-2 capitalize">
                        {userData.fitnessGoal?.replace('-', ' ')}
                      </span>
                    </div>
                    <div>
                      <span className="text-gray-400">Experience:</span>
                      <span className="text-[#4a90e2] font-semibold ml-2 capitalize">
                        {userData.experienceLevel}
                      </span>
                    </div>
                    <div>
                      <span className="text-gray-400">Equipment:</span>
                      <span className="text-[#4a90e2] font-semibold ml-2 capitalize">
                        {userData.equipmentAccess?.replace('-', ' ')}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Generate Button */}
                <button
                  onClick={generateWorkoutPlan}
                  disabled={isGenerating}
                  className="w-full py-4 bg-gradient-to-r from-[#4a90e2] to-[#6a5acd] hover:from-[#5a9ff2] hover:to-[#7a6add] text-white font-bold rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                  {isGenerating ? (
                    <div className="flex items-center justify-center space-x-2">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>🤖 Your AI trainer is designing your plan...</span>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center space-x-2">
                      <Bot className="w-5 h-5" />
                      <span>Generate Workout Plan</span>
                    </div>
                  )}
                </button>

                {isGenerating && (
                  <p className="text-center text-gray-400 text-sm">
                    This usually takes 5-10 seconds
                  </p>
                )}
              </div>
            ) : (
              <div className="space-y-6">
                {/* Plan Header */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-xl">✓</span>
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-white">Your Workout Plan</h2>
                      <p className="text-gray-400">{generatedWorkoutPlan.planName}</p>
                    </div>
                  </div>
                </div>

                {/* Plan Overview */}
                <div className="bg-[#0a0e27] rounded-lg p-4">
                  <h3 className="text-white font-semibold mb-2">Overview</h3>
                  <p className="text-gray-300 text-sm">{generatedWorkoutPlan.overview}</p>
                </div>

                {/* Weekly Schedule */}
                <div className="space-y-4">
                  {generatedWorkoutPlan.weeklySchedule.map((day, index) => (
                    <div key={index} className="bg-[#0a0e27] rounded-lg p-4">
                      <h3 className="text-white font-semibold mb-3 flex items-center">
                        <span className="bg-[#4a90e2] text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3">
                          {day.day}
                        </span>
                        {day.name}
                      </h3>
                      
                      <div className="space-y-3">
                        <div>
                          <h4 className="text-gray-300 font-medium text-sm mb-1">Warm-up:</h4>
                          <p className="text-gray-400 text-sm">{day.warmup}</p>
                        </div>

                        <div>
                          <h4 className="text-gray-300 font-medium text-sm mb-2">Exercises:</h4>
                          <div className="space-y-2">
                            {day.exercises.map((exercise, exerciseIndex) => (
                              <div key={exerciseIndex} className="bg-[#1a1f3a] rounded-lg p-3">
                                <div className="flex items-start justify-between mb-1">
                                  <h5 className="text-white font-medium">{exercise.name}</h5>
                                  <span className="text-[#4a90e2] text-sm font-semibold">
                                    {exercise.sets} × {exercise.reps}
                                  </span>
                                </div>
                                <div className="flex items-center space-x-4 text-sm text-gray-400">
                                  <span>Rest: {exercise.rest}</span>
                                  <span>•</span>
                                  <span>{exercise.notes}</span>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div>
                          <h4 className="text-gray-300 font-medium text-sm mb-1">Cool-down:</h4>
                          <p className="text-gray-400 text-sm">{day.cooldown}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Progression Tips */}
                <div className="bg-[#0a0e27] rounded-lg p-4">
                  <h3 className="text-white font-semibold mb-2 flex items-center">
                    <span className="mr-2">📈</span>
                    Progression Strategy
                  </h3>
                  <p className="text-gray-300 text-sm">{generatedWorkoutPlan.progressionTips}</p>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-3">
                  <button
                    onClick={saveWorkoutPlan}
                    className="flex items-center space-x-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
                  >
                    <Save className="w-4 h-4" />
                    <span>Save Plan</span>
                  </button>
                  <button
                    onClick={resetWorkoutForm}
                    className="flex items-center space-x-2 px-4 py-2 bg-[#4a90e2] hover:bg-[#5a9ff2] text-white rounded-lg transition-colors"
                  >
                    <RotateCcw className="w-4 h-4" />
                    <span>Regenerate</span>
                  </button>
                  <button
                    onClick={() => window.print()}
                    className="flex items-center space-x-2 px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors"
                  >
                    <Download className="w-4 h-4" />
                    <span>Export PDF</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div>
            {!generatedMealPlan ? (
              <div className="space-y-6">
                <div className="flex items-center space-x-3 mb-6">
                  <Utensils className="w-6 h-6 text-[#4a90e2]" />
                  <h2 className="text-xl font-bold text-white">Generate Your Meal Plan</h2>
                </div>

                <div className="space-y-6">
                  {/* Dietary Preferences */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-3">
                      Dietary Preferences:
                    </label>
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
                      {['Vegetarian', 'Vegan', 'Keto', 'Paleo', 'No restrictions'].map((pref) => (
                        <button
                          key={pref}
                          onClick={() => handleDietaryPreferenceToggle(pref)}
                          className={`py-2 px-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                            dietaryPreferences.includes(pref)
                              ? 'bg-[#4a90e2] text-white'
                              : 'bg-[#0a0e27] text-gray-300 hover:bg-[#4a90e2]/20 hover:text-white'
                          }`}
                        >
                          {pref}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Allergies */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-3">
                      Allergies/Exclusions:
                    </label>
                    <input
                      type="text"
                      value={allergies}
                      onChange={(e) => setAllergies(e.target.value)}
                      placeholder="e.g., nuts, dairy, gluten"
                      className="w-full px-4 py-3 bg-[#0a0e27] border border-[#4a90e2]/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-[#4a90e2] transition-colors"
                    />
                  </div>

                  {/* Meals Per Day */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-3">
                      Meals Per Day:
                    </label>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                      {['3 meals', '3 meals + 2 snacks', '5-6 small meals'].map((option) => (
                        <button
                          key={option}
                          onClick={() => setMealsPerDay(option)}
                          className={`py-3 px-4 rounded-lg font-medium transition-all duration-200 ${
                            mealsPerDay === option
                              ? 'bg-[#4a90e2] text-white'
                              : 'bg-[#0a0e27] text-gray-300 hover:bg-[#4a90e2]/20 hover:text-white'
                          }`}
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Nutrition Summary */}
                <div className="bg-[#0a0e27] rounded-lg p-4">
                  <h3 className="text-gray-300 font-medium mb-2">Using your calculated needs:</h3>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <span className="text-gray-400">Daily Calories:</span>
                      <span className="text-[#4a90e2] font-semibold ml-2">
                        {userData.calculatedStats?.recommendedCalories || 2200} cal
                      </span>
                    </div>
                    <div>
                      <span className="text-gray-400">Protein:</span>
                      <span className="text-[#4a90e2] font-semibold ml-2">
                        {userData.calculatedStats?.macros?.protein || 180}g
                      </span>
                    </div>
                    <div>
                      <span className="text-gray-400">Carbs:</span>
                      <span className="text-[#4a90e2] font-semibold ml-2">
                        {userData.calculatedStats?.macros?.carbs || 220}g
                      </span>
                    </div>
                    <div>
                      <span className="text-gray-400">Fat:</span>
                      <span className="text-[#4a90e2] font-semibold ml-2">
                        {userData.calculatedStats?.macros?.fat || 70}g
                      </span>
                    </div>
                  </div>
                </div>

                {/* Generate Button */}
                <button
                  onClick={generateMealPlan}
                  disabled={isGenerating}
                  className="w-full py-4 bg-gradient-to-r from-[#4a90e2] to-[#6a5acd] hover:from-[#5a9ff2] hover:to-[#7a6add] text-white font-bold rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                  {isGenerating ? (
                    <div className="flex items-center justify-center space-x-2">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>🤖 Your AI nutritionist is crafting your meals...</span>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center space-x-2">
                      <Bot className="w-5 h-5" />
                      <span>Generate Meal Plan</span>
                    </div>
                  )}
                </button>

                {isGenerating && (
                  <p className="text-center text-gray-400 text-sm">
                    This usually takes 5-10 seconds
                  </p>
                )}
              </div>
            ) : (
              <div className="space-y-6">
                {/* Plan Header */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-xl">✓</span>
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-white">Your Meal Plan</h2>
                      <p className="text-gray-400">{generatedMealPlan.planName}</p>
                    </div>
                  </div>
                </div>

                {/* Daily Totals */}
                <div className="bg-[#0a0e27] rounded-lg p-4">
                  <h3 className="text-white font-semibold mb-3">Daily Totals</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                    <div>
                      <div className="text-2xl font-bold text-[#4a90e2]">{generatedMealPlan.totalCalories}</div>
                      <div className="text-gray-400 text-sm">Calories</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-[#4a90e2]">{generatedMealPlan.totalMacros.protein}g</div>
                      <div className="text-gray-400 text-sm">Protein</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-[#4a90e2]">{generatedMealPlan.totalMacros.carbs}g</div>
                      <div className="text-gray-400 text-sm">Carbs</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-[#4a90e2]">{generatedMealPlan.totalMacros.fat}g</div>
                      <div className="text-gray-400 text-sm">Fat</div>
                    </div>
                  </div>
                </div>

                {/* Meals */}
                <div className="space-y-4">
                  {generatedMealPlan.meals.map((meal, index) => (
                    <div key={index} className="bg-[#0a0e27] rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="text-white font-semibold flex items-center">
                          <span className="mr-2">
                            {meal.type === 'Breakfast' ? '🍳' : 
                             meal.type === 'Lunch' ? '🥗' : 
                             meal.type === 'Dinner' ? '🍽️' : '🍎'}
                          </span>
                          {meal.type} - {meal.name}
                        </h3>
                        <span className="text-gray-400 text-sm">Prep: {meal.prepTime}</span>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <h4 className="text-gray-300 font-medium text-sm mb-2">Ingredients:</h4>
                          <ul className="space-y-1">
                            {meal.ingredients.map((ingredient, ingredientIndex) => (
                              <li key={ingredientIndex} className="text-gray-400 text-sm flex justify-between">
                                <span>• {ingredient.item} - {ingredient.amount}</span>
                                <span>{ingredient.calories} cal</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div>
                          <h4 className="text-gray-300 font-medium text-sm mb-2">Instructions:</h4>
                          <ol className="space-y-1">
                            {meal.instructions.map((instruction, instructionIndex) => (
                              <li key={instructionIndex} className="text-gray-400 text-sm">
                                {instructionIndex + 1}. {instruction}
                              </li>
                            ))}
                          </ol>
                        </div>
                      </div>

                      <div className="mt-3 pt-3 border-t border-[#1a1f3a]">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4 text-sm">
                            <span className="text-[#4a90e2] font-semibold">{meal.totalCalories} cal</span>
                            <span className="text-gray-400">P: {meal.macros.protein}g</span>
                            <span className="text-gray-400">C: {meal.macros.carbs}g</span>
                            <span className="text-gray-400">F: {meal.macros.fat}g</span>
                          </div>
                        </div>
                        {meal.substitutions && (
                          <p className="text-gray-400 text-sm mt-2">
                            <span className="text-[#ffd700]">💡 Tip:</span> {meal.substitutions}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Meal Prep Tips */}
                <div className="bg-[#0a0e27] rounded-lg p-4">
                  <h3 className="text-white font-semibold mb-2 flex items-center">
                    <span className="mr-2">📝</span>
                    Meal Prep Tips
                  </h3>
                  <p className="text-gray-300 text-sm">{generatedMealPlan.mealPrepTips}</p>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-3">
                  <button
                    onClick={saveMealPlan}
                    className="flex items-center space-x-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
                  >
                    <Save className="w-4 h-4" />
                    <span>Save Plan</span>
                  </button>
                  <button
                    onClick={resetMealForm}
                    className="flex items-center space-x-2 px-4 py-2 bg-[#4a90e2] hover:bg-[#5a9ff2] text-white rounded-lg transition-colors"
                  >
                    <RotateCcw className="w-4 h-4" />
                    <span>Regenerate</span>
                  </button>
                  <button
                    onClick={() => navigate('/nutrition')}
                    className="flex items-center space-x-2 px-4 py-2 bg-[#ffd700] hover:bg-[#ffd700]/80 text-black rounded-lg transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add to Today</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};