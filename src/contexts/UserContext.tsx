import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';
import { AvatarConfig } from '../types/avatar';

// Types
interface UserProfile {
  name: string;
  level: number;
  currentXP: number;
  xpToNextLevel: number;
  avatar: string;
  totalXP: number;
  avatarConfig?: AvatarConfig;
}

interface DailyQuest {
  id: string;
  title: string;
  description: string;
  xpReward: number;
  completed: boolean;
  type: 'workout' | 'nutrition' | 'hydration' | 'steps';
}

interface UserSettings {
  theme: 'dark' | 'light';
  notifications: boolean;
  units: 'metric' | 'imperial';
}

interface UserState {
  profile: UserProfile;
  dailyQuests: DailyQuest[];
  settings: UserSettings;
  isOnboardingComplete: boolean;
}

// Actions
type UserAction =
  | { type: 'SET_PROFILE'; payload: UserProfile }
  | { type: 'ADD_XP'; payload: number }
  | { type: 'COMPLETE_QUEST'; payload: string }
  | { type: 'SET_ONBOARDING_COMPLETE'; payload: boolean }
  | { type: 'UPDATE_SETTINGS'; payload: Partial<UserSettings> }
  | { type: 'LOAD_FROM_STORAGE'; payload: UserState };

// Initial state
const initialState: UserState = {
  profile: {
    name: '',
    level: 1,
    currentXP: 0,
    xpToNextLevel: 100,
    avatar: '🏃',
    totalXP: 0,
  },
  dailyQuests: [],
  settings: {
    theme: 'dark',
    notifications: true,
    units: 'metric',
  },
  isOnboardingComplete: false,
};

// Reducer
const userReducer = (state: UserState, action: UserAction): UserState => {
  switch (action.type) {
    case 'SET_PROFILE':
      return {
        ...state,
        profile: action.payload,
      };
    case 'ADD_XP':
      const newTotalXP = state.profile.totalXP + action.payload;
      const newCurrentXP = state.profile.currentXP + action.payload;
      let newLevel = state.profile.level;
      let remainingXP = newCurrentXP;

      // Level up calculation
      while (remainingXP >= state.profile.xpToNextLevel) {
        remainingXP -= state.profile.xpToNextLevel;
        newLevel++;
      }

      return {
        ...state,
        profile: {
          ...state.profile,
          level: newLevel,
          currentXP: remainingXP,
          xpToNextLevel: newLevel * 100, // XP requirement increases with level
          totalXP: newTotalXP,
        },
      };
    case 'COMPLETE_QUEST':
      return {
        ...state,
        dailyQuests: state.dailyQuests.map(quest =>
          quest.id === action.payload ? { ...quest, completed: true } : quest
        ),
      };
    case 'SET_ONBOARDING_COMPLETE':
      return {
        ...state,
        isOnboardingComplete: action.payload,
      };
    case 'UPDATE_SETTINGS':
      return {
        ...state,
        settings: { ...state.settings, ...action.payload },
      };
    case 'LOAD_FROM_STORAGE':
      return action.payload;
    default:
      return state;
  }
};

// Context
const UserContext = createContext<{
  state: UserState;
  dispatch: React.Dispatch<UserAction>;
} | null>(null);

// Provider
export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(userReducer, initialState);

  // Load from localStorage on mount
  useEffect(() => {
    const savedState = localStorage.getItem('fitRPG-user-data');
    if (savedState) {
      try {
        const parsedState = JSON.parse(savedState);
        dispatch({ type: 'LOAD_FROM_STORAGE', payload: parsedState });
      } catch (error) {
        console.error('Failed to load user data from localStorage:', error);
      }
    }
  }, []);

  // Save to localStorage whenever state changes
  useEffect(() => {
    localStorage.setItem('fitRPG-user-data', JSON.stringify(state));
  }, [state]);

  return (
    <UserContext.Provider value={{ state, dispatch }}>
      {children}
    </UserContext.Provider>
  );
};

// Hook
export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};