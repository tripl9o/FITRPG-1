export interface Exercise {
  id: string;
  name: string;
  sets: number;
  reps: string;
  rest: string;
  notes: string;
  targetWeight?: number;
  muscleGroups: string[];
}

export interface WorkoutDay {
  day: number;
  name: string;
  warmup: string;
  exercises: Exercise[];
  cooldown: string;
  estimatedDuration: number;
}

export interface WorkoutPlan {
  id: string;
  name: string;
  splitType: string;
  overview: string;
  weeklySchedule: WorkoutDay[];
  progressionTips: string;
  createdAt: string;
  lastUsed?: string;
  isActive: boolean;
}

export interface LoggedSet {
  weight: number;
  reps: number;
  completed: boolean;
  restTime?: number;
}

export interface LoggedExercise {
  exerciseId: string;
  name: string;
  sets: LoggedSet[];
  notes?: string;
  skipped: boolean;
}

export interface WorkoutSession {
  id: string;
  planId: string;
  dayNumber: number;
  dayName: string;
  startTime: string;
  endTime?: string;
  exercises: LoggedExercise[];
  totalVolume: number;
  totalSets: number;
  totalReps: number;
  duration: number;
  completed: boolean;
  xpEarned: number;
  goldEarned: number;
}

export interface WorkoutHistory {
  sessions: WorkoutSession[];
  totalWorkouts: number;
  thisWeekCount: number;
  currentStreak: number;
  totalVolume: number;
  averageDuration: number;
}