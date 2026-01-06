export interface OnboardingData {
  fitnessGoal: 'lose-fat' | 'gain-muscle' | 'get-toned' | 'general-fitness' | null;
  experienceLevel: 'beginner' | 'intermediate' | 'advanced' | null;
  equipmentAccess: 'full-gym' | 'home-gym' | 'bodyweight' | null;
  trainingFrequency: 3 | 4 | 5 | 6 | null;
  personalStats: {
    age: number | null;
    weight: number | null;
    weightUnit: 'lbs' | 'kg';
    height: number | null;
    heightUnit: 'ft' | 'cm';
    heightFeet?: number | null;
    heightInches?: number | null;
    gender: 'male' | 'female' | 'other' | 'prefer-not-to-say' | null;
    activityLevel: 'sedentary' | 'lightly-active' | 'moderately-active' | 'very-active' | 'extremely-active' | null;
  };
  calculatedStats?: {
    bmr: number;
    tdee: number;
    recommendedCalories: number;
    macros: {
      protein: number;
      fat: number;
      carbs: number;
    };
  };
}

export interface OnboardingStep {
  id: number;
  title: string;
  isComplete: boolean;
}