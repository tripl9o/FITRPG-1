export interface Notification {
  id: string;
  type: 'level-up' | 'quest-complete' | 'achievement' | 'streak' | 'reminder' | 'warning';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  icon: string;
  data?: any;
}

export interface NotificationSettings {
  dailyReminders: {
    morningWorkout: { enabled: boolean; time: string };
    lunchLog: { enabled: boolean; time: string };
    waterCheck: { enabled: boolean; time: string };
    eveningWorkout: { enabled: boolean; time: string };
    dinnerLog: { enabled: boolean; time: string };
    sleepReminder: { enabled: boolean; time: string };
    brainChallenge: { enabled: boolean; time: string };
  };
  questReminders: {
    incompleteQuests: boolean;
    streakWarning: boolean;
  };
  achievements: {
    levelUps: boolean;
    achievementsUnlocked: boolean;
    newEquipment: boolean;
  };
  browserNotifications: boolean;
  soundEffects: boolean;
}