export interface Quest {
  id: string;
  title: string;
  description: string;
  type: 'workout' | 'water' | 'meals' | 'sleep' | 'brain';
  xpReward: number;
  goldReward: number;
  statReward: {
    stat: 'mind' | 'body' | 'spiritual' | 'combat' | 'connection';
    amount: number;
  };
  completed: boolean;
  progress: number;
  maxProgress: number;
  resetDaily: boolean;
}

export interface QuestProgress {
  waterCups: number;
  mealsLogged: number;
  sleepHours: number;
  workoutCompleted: boolean;
  brainChallengeCompleted: boolean;
  lastResetDate: string;
}

export interface BrainQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  funFact: string;
  category: 'fitness' | 'nutrition' | 'science' | 'general';
}

export const BRAIN_QUESTIONS: BrainQuestion[] = [
  {
    id: '1',
    question: 'Which muscle is the largest in the human body?',
    options: ['Biceps', 'Quadriceps', 'Gluteus Maximus', 'Latissimus Dorsi'],
    correctAnswer: 2,
    funFact: 'The gluteus maximus is not only the largest muscle but also one of the strongest!',
    category: 'fitness'
  },
  {
    id: '2',
    question: 'How much water should an average adult drink per day?',
    options: ['4 cups', '6 cups', '8 cups', '12 cups'],
    correctAnswer: 2,
    funFact: 'The "8x8 rule" (8 cups of 8 ounces) is a good baseline, but needs vary by person and activity level.',
    category: 'nutrition'
  },
  {
    id: '3',
    question: 'What percentage of the human body is made up of water?',
    options: ['45%', '60%', '75%', '85%'],
    correctAnswer: 1,
    funFact: 'Adult bodies are about 60% water, while babies are about 75% water!',
    category: 'science'
  },
  {
    id: '4',
    question: 'Which macronutrient provides 4 calories per gram?',
    options: ['Fat', 'Protein', 'Carbohydrates', 'Both B and C'],
    correctAnswer: 3,
    funFact: 'Both protein and carbohydrates provide 4 calories per gram, while fat provides 9 calories per gram.',
    category: 'nutrition'
  },
  {
    id: '5',
    question: 'How many bones are in the adult human body?',
    options: ['186', '206', '226', '246'],
    correctAnswer: 1,
    funFact: 'Babies are born with about 270 bones, but many fuse together as they grow!',
    category: 'science'
  },
  {
    id: '6',
    question: 'What is the recommended amount of sleep for adults?',
    options: ['5-6 hours', '6-7 hours', '7-9 hours', '9-11 hours'],
    correctAnswer: 2,
    funFact: 'Most adults need 7-9 hours of sleep for optimal health and cognitive function.',
    category: 'general'
  },
  {
    id: '7',
    question: 'Which exercise works the most muscle groups simultaneously?',
    options: ['Bicep Curls', 'Leg Press', 'Burpees', 'Calf Raises'],
    correctAnswer: 2,
    funFact: 'Burpees are a full-body exercise that work your arms, chest, quads, glutes, hamstrings, and abs!',
    category: 'fitness'
  },
  {
    id: '8',
    question: 'What is the powerhouse of the cell?',
    options: ['Nucleus', 'Mitochondria', 'Ribosome', 'Cytoplasm'],
    correctAnswer: 1,
    funFact: 'Mitochondria produce ATP, the energy currency of cells. Exercise increases mitochondrial density!',
    category: 'science'
  },
  {
    id: '9',
    question: 'Which vitamin is produced when skin is exposed to sunlight?',
    options: ['Vitamin A', 'Vitamin C', 'Vitamin D', 'Vitamin E'],
    correctAnswer: 2,
    funFact: 'Vitamin D is crucial for bone health and immune function. Just 10-15 minutes of sunlight can help!',
    category: 'nutrition'
  },
  {
    id: '10',
    question: 'What is the strongest muscle in the human body relative to its size?',
    options: ['Heart', 'Jaw (Masseter)', 'Tongue', 'Calf'],
    correctAnswer: 1,
    funFact: 'The masseter (jaw muscle) can exert a force of up to 200 pounds on the molars!',
    category: 'fitness'
  }
];

export const XP_THRESHOLDS = [0, 100, 250, 450, 700, 1000, 1400, 1900, 2500, 3200, 4000];

export const calculateLevel = (totalXP: number): number => {
  for (let i = XP_THRESHOLDS.length - 1; i >= 0; i--) {
    if (totalXP >= XP_THRESHOLDS[i]) {
      return i + 1;
    }
  }
  return 1;
};

export const getXPForNextLevel = (currentLevel: number): number => {
  return XP_THRESHOLDS[currentLevel] || XP_THRESHOLDS[XP_THRESHOLDS.length - 1];
};

export const getCurrentLevelXP = (totalXP: number, currentLevel: number): number => {
  const currentLevelThreshold = XP_THRESHOLDS[currentLevel - 1] || 0;
  return totalXP - currentLevelThreshold;
};