import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';
import { Notification as AppNotification, NotificationSettings } from '../types/notifications';

interface NotificationState {
  notifications: AppNotification[];
  settings: NotificationSettings;
  unreadCount: number;
}

type NotificationAction =
  | { type: 'ADD_NOTIFICATION'; payload: Omit<AppNotification, 'id' | 'timestamp' | 'read'> }
  | { type: 'MARK_AS_READ'; payload: string }
  | { type: 'MARK_ALL_AS_READ' }
  | { type: 'UPDATE_SETTINGS'; payload: Partial<NotificationSettings> }
  | { type: 'LOAD_FROM_STORAGE'; payload: NotificationState };

const initialSettings: NotificationSettings = {
  dailyReminders: {
    morningWorkout: { enabled: true, time: '09:00' },
    lunchLog: { enabled: true, time: '12:30' },
    waterCheck: { enabled: true, time: '15:00' },
    eveningWorkout: { enabled: true, time: '18:00' },
    dinnerLog: { enabled: true, time: '19:00' },
    sleepReminder: { enabled: true, time: '22:00' },
    brainChallenge: { enabled: false, time: '20:00' },
  },
  questReminders: {
    incompleteQuests: true,
    streakWarning: true,
  },
  achievements: {
    levelUps: true,
    achievementsUnlocked: true,
    newEquipment: true,
  },
  browserNotifications: false,
  soundEffects: true,
};

const initialState: NotificationState = {
  notifications: [],
  settings: initialSettings,
  unreadCount: 0,
};

const notificationReducer = (state: NotificationState, action: NotificationAction): NotificationState => {
  switch (action.type) {
    case 'ADD_NOTIFICATION':
      const newNotification: AppNotification = {
        ...action.payload,
        id: `notification_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        timestamp: new Date().toISOString(),
        read: false,
      };
      
      return {
        ...state,
        notifications: [newNotification, ...state.notifications].slice(0, 50), // Keep last 50
        unreadCount: state.unreadCount + 1,
      };
    
    case 'MARK_AS_READ':
      return {
        ...state,
        notifications: state.notifications.map(notification =>
          notification.id === action.payload
            ? { ...notification, read: true }
            : notification
        ),
        unreadCount: Math.max(0, state.unreadCount - 1),
      };
    
    case 'MARK_ALL_AS_READ':
      return {
        ...state,
        notifications: state.notifications.map(notification => ({ ...notification, read: true })),
        unreadCount: 0,
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

const NotificationContext = createContext<{
  state: NotificationState;
  dispatch: React.Dispatch<NotificationAction>;
  addNotification: (notification: Omit<AppNotification, 'id' | 'timestamp' | 'read'>) => void;
  playSound: (soundType: string) => void;
} | null>(null);

export const NotificationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(notificationReducer, initialState);

  // Load from localStorage on mount
  useEffect(() => {
    const savedState = localStorage.getItem('fitRPG-notifications');
    if (savedState) {
      try {
        const parsedState = JSON.parse(savedState);
        dispatch({ type: 'LOAD_FROM_STORAGE', payload: parsedState });
      } catch (error) {
        console.error('Failed to load notification data:', error);
      }
    }
  }, []);

  // Save to localStorage whenever state changes
  useEffect(() => {
    localStorage.setItem('fitRPG-notifications', JSON.stringify(state));
  }, [state]);

  // Request browser notification permission
  useEffect(() => {
    if (state.settings.browserNotifications && 'Notification' in window) {
      if (Notification.permission === 'default') {
        Notification.requestPermission().then(permission => {
          if (permission !== 'granted') {
            dispatch({
              type: 'UPDATE_SETTINGS',
              payload: { browserNotifications: false }
            });
          }
        });
      }
    }
  }, [state.settings.browserNotifications]);

  const addNotification = (notification: Omit<AppNotification, 'id' | 'timestamp' | 'read'>) => {
    dispatch({ type: 'ADD_NOTIFICATION', payload: notification });
    
    // Play sound effect
    if (state.settings.soundEffects) {
      playSound(notification.type);
    }
    
    // Show browser notification if enabled
    if (state.settings.browserNotifications && 'Notification' in window && Notification.permission === 'granted') {
      new Notification(notification.title, {
        body: notification.message,
        icon: '/vite.svg', // You can replace with a proper icon
        tag: notification.type,
      });
    }
  };

  const playSound = (soundType: string) => {
    if (!state.settings.soundEffects) return;
    
    try {
      // Create audio context for better browser support
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      
      // Simple beep sounds using Web Audio API
      const soundMap: { [key: string]: { frequency: number; duration: number; volume: number } } = {
        'quest-complete': { frequency: 800, duration: 0.3, volume: 0.1 },
        'level-up': { frequency: 523, duration: 0.8, volume: 0.15 },
        'achievement': { frequency: 659, duration: 0.6, volume: 0.12 },
        'streak': { frequency: 440, duration: 0.4, volume: 0.1 },
        'reminder': { frequency: 330, duration: 0.2, volume: 0.08 },
        'warning': { frequency: 220, duration: 0.5, volume: 0.1 },
        'button-click': { frequency: 1000, duration: 0.1, volume: 0.05 },
        'xp-gain': { frequency: 880, duration: 0.2, volume: 0.08 },
      };
      
      const sound = soundMap[soundType] || soundMap['button-click'];
      
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      oscillator.frequency.setValueAtTime(sound.frequency, audioContext.currentTime);
      oscillator.type = 'sine';
      
      gainNode.gain.setValueAtTime(0, audioContext.currentTime);
      gainNode.gain.linearRampToValueAtTime(sound.volume, audioContext.currentTime + 0.01);
      gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + sound.duration);
      
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + sound.duration);
    } catch (error) {
      // Fallback for browsers that don't support Web Audio API
      console.log(`🔊 ${soundType} sound would play here`);
    }
  };

  return (
    <NotificationContext.Provider value={{ state, dispatch, addNotification, playSound }}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
};