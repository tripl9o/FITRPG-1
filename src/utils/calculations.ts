import { OnboardingData } from '../types/onboarding';

// Activity level multipliers for TDEE calculation
const ACTIVITY_MULTIPLIERS = {
  'sedentary': 1.2,
  'lightly-active': 1.375,
  'moderately-active': 1.55,
  'very-active': 1.725,
  'extremely-active': 1.9,
};

// Goal-based calorie adjustments
const GOAL_ADJUSTMENTS = {
  'lose-fat': -500,
  'gain-muscle': 300,
  'get-toned': -200,
  'general-fitness': 0,
};

export const calculateBMR = (
  weight: number,
  height: number,
  age: number,
  gender: string,
  weightUnit: 'lbs' | 'kg',
  heightUnit: 'ft' | 'cm',
  heightFeet?: number,
  heightInches?: number
): number => {
  // Convert weight to kg if needed
  const weightKg = weightUnit === 'lbs' ? weight * 0.453592 : weight;
  
  // Convert height to cm if needed
  let heightCm: number;
  if (heightUnit === 'ft' && heightFeet && heightInches !== undefined) {
    heightCm = (heightFeet * 12 + heightInches) * 2.54;
  } else {
    heightCm = heightUnit === 'ft' ? height * 30.48 : height;
  }

  // Mifflin-St Jeor Equation
  if (gender === 'male') {
    return 10 * weightKg + 6.25 * heightCm - 5 * age + 5;
  } else {
    return 10 * weightKg + 6.25 * heightCm - 5 * age - 161;
  }
};

export const calculateTDEE = (bmr: number, activityLevel: string): number => {
  const multiplier = ACTIVITY_MULTIPLIERS[activityLevel as keyof typeof ACTIVITY_MULTIPLIERS] || 1.2;
  return bmr * multiplier;
};

export const calculateRecommendedCalories = (tdee: number, goal: string): number => {
  const adjustment = GOAL_ADJUSTMENTS[goal as keyof typeof GOAL_ADJUSTMENTS] || 0;
  return Math.round(tdee + adjustment);
};

export const calculateMacros = (
  calories: number,
  weight: number,
  weightUnit: 'lbs' | 'kg'
): { protein: number; fat: number; carbs: number } => {
  // Convert weight to lbs for protein calculation
  const weightLbs = weightUnit === 'kg' ? weight * 2.20462 : weight;
  
  // Protein: 1g per lb bodyweight
  const proteinGrams = Math.round(weightLbs);
  const proteinCalories = proteinGrams * 4;
  
  // Fat: 25% of total calories
  const fatCalories = Math.round(calories * 0.25);
  const fatGrams = Math.round(fatCalories / 9);
  
  // Carbs: remaining calories
  const remainingCalories = calories - proteinCalories - fatCalories;
  const carbGrams = Math.round(remainingCalories / 4);
  
  return {
    protein: proteinGrams,
    fat: fatGrams,
    carbs: carbGrams,
  };
};

export const calculateAllStats = (data: OnboardingData) => {
  const { personalStats, fitnessGoal } = data;
  
  if (!personalStats.age || !personalStats.weight || !personalStats.height || 
      !personalStats.gender || !personalStats.activityLevel || !fitnessGoal) {
    return null;
  }

  const bmr = calculateBMR(
    personalStats.weight,
    personalStats.height,
    personalStats.age,
    personalStats.gender,
    personalStats.weightUnit,
    personalStats.heightUnit,
    personalStats.heightFeet || undefined,
    personalStats.heightInches || undefined
  );

  const tdee = calculateTDEE(bmr, personalStats.activityLevel);
  const recommendedCalories = calculateRecommendedCalories(tdee, fitnessGoal);
  const macros = calculateMacros(recommendedCalories, personalStats.weight, personalStats.weightUnit);

  return {
    bmr: Math.round(bmr),
    tdee: Math.round(tdee),
    recommendedCalories,
    macros,
  };
};