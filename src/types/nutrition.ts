export interface Food {
  id: string;
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  serving: string;
  category: 'protein' | 'carbs' | 'fats' | 'vegetables' | 'fruits' | 'dairy' | 'prepared';
}

export interface LoggedMeal {
  id: string;
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  type: 'breakfast' | 'lunch' | 'dinner' | 'snack';
  timestamp: string;
  notes?: string;
}

export interface DailyNutrition {
  date: string;
  meals: LoggedMeal[];
  totals: {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
  };
  goals: {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
  };
}

export interface SavedMealPlan {
  id: string;
  name: string;
  createdAt: string;
  totalCalories: number;
  totalMacros: {
    protein: number;
    carbs: number;
    fat: number;
  };
  meals: Array<{
    type: 'breakfast' | 'lunch' | 'dinner' | 'snack';
    name: string;
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
    ingredients?: string[];
    instructions?: string[];
  }>;
}

export const COMMON_FOODS: Food[] = [
  // Proteins
  { id: 'chicken-breast-grilled', name: 'Chicken Breast (4oz, grilled)', calories: 187, protein: 35, carbs: 0, fat: 4, serving: '4oz', category: 'protein' },
  { id: 'chicken-breast-raw', name: 'Chicken Breast (4oz, raw)', calories: 136, protein: 25, carbs: 0, fat: 3, serving: '4oz', category: 'protein' },
  { id: 'salmon-fillet', name: 'Salmon Fillet (4oz)', calories: 206, protein: 28, carbs: 0, fat: 9, serving: '4oz', category: 'protein' },
  { id: 'ground-beef-lean', name: 'Ground Beef 93/7 (4oz)', calories: 186, protein: 26, carbs: 0, fat: 8, serving: '4oz', category: 'protein' },
  { id: 'eggs-large', name: 'Large Eggs (2 eggs)', calories: 140, protein: 12, carbs: 1, fat: 10, serving: '2 eggs', category: 'protein' },
  { id: 'protein-powder', name: 'Whey Protein Powder (1 scoop)', calories: 120, protein: 25, carbs: 3, fat: 1, serving: '1 scoop', category: 'protein' },
  { id: 'tofu-firm', name: 'Firm Tofu (4oz)', calories: 94, protein: 10, carbs: 2, fat: 6, serving: '4oz', category: 'protein' },
  { id: 'greek-yogurt', name: 'Greek Yogurt Plain (1 cup)', calories: 130, protein: 23, carbs: 9, fat: 0, serving: '1 cup', category: 'protein' },
  { id: 'tuna-canned', name: 'Tuna in Water (1 can)', calories: 100, protein: 22, carbs: 0, fat: 1, serving: '1 can', category: 'protein' },
  { id: 'cottage-cheese', name: 'Cottage Cheese (1 cup)', calories: 220, protein: 25, carbs: 8, fat: 10, serving: '1 cup', category: 'protein' },

  // Carbs
  { id: 'brown-rice', name: 'Brown Rice (1 cup cooked)', calories: 216, protein: 5, carbs: 45, fat: 2, serving: '1 cup', category: 'carbs' },
  { id: 'white-rice', name: 'White Rice (1 cup cooked)', calories: 205, protein: 4, carbs: 45, fat: 0, serving: '1 cup', category: 'carbs' },
  { id: 'quinoa', name: 'Quinoa (1 cup cooked)', calories: 222, protein: 8, carbs: 39, fat: 4, serving: '1 cup', category: 'carbs' },
  { id: 'oats-rolled', name: 'Rolled Oats (1 cup dry)', calories: 307, protein: 11, carbs: 55, fat: 5, serving: '1 cup dry', category: 'carbs' },
  { id: 'sweet-potato', name: 'Sweet Potato (1 medium baked)', calories: 112, protein: 2, carbs: 26, fat: 0, serving: '1 medium', category: 'carbs' },
  { id: 'banana', name: 'Banana (1 medium)', calories: 105, protein: 1, carbs: 27, fat: 0, serving: '1 medium', category: 'carbs' },
  { id: 'apple', name: 'Apple (1 medium)', calories: 95, protein: 0, carbs: 25, fat: 0, serving: '1 medium', category: 'carbs' },
  { id: 'whole-wheat-bread', name: 'Whole Wheat Bread (2 slices)', calories: 160, protein: 8, carbs: 28, fat: 2, serving: '2 slices', category: 'carbs' },
  { id: 'pasta-whole-wheat', name: 'Whole Wheat Pasta (1 cup cooked)', calories: 174, protein: 7, carbs: 37, fat: 1, serving: '1 cup', category: 'carbs' },
  { id: 'berries-mixed', name: 'Mixed Berries (1 cup)', calories: 70, protein: 1, carbs: 17, fat: 0, serving: '1 cup', category: 'fruits' },

  // Fats
  { id: 'olive-oil', name: 'Olive Oil (1 tbsp)', calories: 119, protein: 0, carbs: 0, fat: 14, serving: '1 tbsp', category: 'fats' },
  { id: 'avocado', name: 'Avocado (1/2 medium)', calories: 160, protein: 2, carbs: 9, fat: 15, serving: '1/2 medium', category: 'fats' },
  { id: 'almonds', name: 'Almonds (1 oz)', calories: 164, protein: 6, carbs: 6, fat: 14, serving: '1 oz', category: 'fats' },
  { id: 'peanut-butter', name: 'Peanut Butter (2 tbsp)', calories: 188, protein: 8, carbs: 8, fat: 16, serving: '2 tbsp', category: 'fats' },
  { id: 'walnuts', name: 'Walnuts (1 oz)', calories: 185, protein: 4, carbs: 4, fat: 18, serving: '1 oz', category: 'fats' },
  { id: 'cheese-cheddar', name: 'Cheddar Cheese (1 oz)', calories: 113, protein: 7, carbs: 1, fat: 9, serving: '1 oz', category: 'dairy' },

  // Vegetables
  { id: 'broccoli', name: 'Broccoli (1 cup)', calories: 25, protein: 3, carbs: 5, fat: 0, serving: '1 cup', category: 'vegetables' },
  { id: 'spinach', name: 'Spinach (2 cups raw)', calories: 14, protein: 2, carbs: 2, fat: 0, serving: '2 cups', category: 'vegetables' },
  { id: 'carrots', name: 'Carrots (1 cup)', calories: 52, protein: 1, carbs: 12, fat: 0, serving: '1 cup', category: 'vegetables' },
  { id: 'bell-pepper', name: 'Bell Pepper (1 medium)', calories: 31, protein: 1, carbs: 7, fat: 0, serving: '1 medium', category: 'vegetables' },
  { id: 'cucumber', name: 'Cucumber (1 cup sliced)', calories: 16, protein: 1, carbs: 4, fat: 0, serving: '1 cup', category: 'vegetables' },
  { id: 'tomato', name: 'Tomato (1 medium)', calories: 22, protein: 1, carbs: 5, fat: 0, serving: '1 medium', category: 'vegetables' },

  // Prepared Foods
  { id: 'protein-smoothie', name: 'Protein Smoothie (basic)', calories: 250, protein: 30, carbs: 20, fat: 5, serving: '1 serving', category: 'prepared' },
  { id: 'chicken-salad', name: 'Grilled Chicken Salad', calories: 350, protein: 35, carbs: 15, fat: 18, serving: '1 serving', category: 'prepared' },
  { id: 'turkey-sandwich', name: 'Turkey Sandwich', calories: 320, protein: 25, carbs: 35, fat: 10, serving: '1 sandwich', category: 'prepared' },
  { id: 'protein-oatmeal', name: 'Protein Oatmeal Bowl', calories: 450, protein: 35, carbs: 55, fat: 10, serving: '1 bowl', category: 'prepared' },
];