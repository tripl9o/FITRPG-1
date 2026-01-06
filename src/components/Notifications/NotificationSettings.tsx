import React from 'react';
import { Bell, Volume2, VolumeX } from 'lucide-react';
import { useNotifications } from '../../contexts/NotificationContext';

export const NotificationSettings: React.FC = () => {
  const { state, dispatch } = useNotifications();

  const updateDailyReminder = (key: string, field: 'enabled' | 'time', value: boolean | string) => {
    dispatch({
      type: 'UPDATE_SETTINGS',
      payload: {
        dailyReminders: {
          ...state.settings.dailyReminders,
          [key]: {
            ...state.settings.dailyReminders[key as keyof typeof state.settings.dailyReminders],
            [field]: value,
          },
        },
      },
    });
  };

  const updateQuestReminder = (key: string, value: boolean) => {
    dispatch({
      type: 'UPDATE_SETTINGS',
      payload: {
        questReminders: {
          ...state.settings.questReminders,
          [key]: value,
        },
      },
    });
  };

  const updateAchievementSetting = (key: string, value: boolean) => {
    dispatch({
      type: 'UPDATE_SETTINGS',
      payload: {
        achievements: {
          ...state.settings.achievements,
          [key]: value,
        },
      },
    });
  };

  const updateGeneralSetting = (key: string, value: boolean) => {
    dispatch({
      type: 'UPDATE_SETTINGS',
      payload: {
        [key]: value,
      },
    });
  };

  const requestNotificationPermission = async () => {
    if ('Notification' in window) {
      const permission = await Notification.requestPermission();
      updateGeneralSetting('browserNotifications', permission === 'granted');
    }
  };

  return (
    <div className="bg-[#1a1f3a] rounded-xl p-6 border border-[#4a90e2]/20">
      <div className="flex items-center space-x-3 mb-6">
        <Bell className="w-6 h-6 text-[#4a90e2]" />
        <h2 className="text-xl font-bold text-white">Notification Settings</h2>
      </div>

      <div className="space-y-8">
        {/* General Settings */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">General</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Bell className="w-5 h-5 text-gray-400" />
                <div>
                  <span className="text-white">Browser Notifications</span>
                  <p className="text-gray-400 text-sm">Show notifications in your browser</p>
                </div>
              </div>
              <button
                onClick={requestNotificationPermission}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  state.settings.browserNotifications ? 'bg-[#4a90e2]' : 'bg-gray-600'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    state.settings.browserNotifications ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                {state.settings.soundEffects ? (
                  <Volume2 className="w-5 h-5 text-gray-400" />
                ) : (
                  <VolumeX className="w-5 h-5 text-gray-400" />
                )}
                <div>
                  <span className="text-white">Sound Effects</span>
                  <p className="text-gray-400 text-sm">Play sounds for achievements and actions</p>
                </div>
              </div>
              <button
                onClick={() => updateGeneralSetting('soundEffects', !state.settings.soundEffects)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  state.settings.soundEffects ? 'bg-[#4a90e2]' : 'bg-gray-600'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    state.settings.soundEffects ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          </div>
        </div>

        {/* Daily Reminders */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Daily Reminders</h3>
          <div className="space-y-4">
            {Object.entries(state.settings.dailyReminders).map(([key, setting]) => {
              const labels: { [key: string]: string } = {
                morningWorkout: 'Morning Workout',
                lunchLog: 'Lunch Log',
                waterCheck: 'Water Check',
                eveningWorkout: 'Evening Workout',
                dinnerLog: 'Dinner Log',
                sleepReminder: 'Sleep Reminder',
                brainChallenge: 'Brain Challenge',
              };

              return (
                <div key={key} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      checked={setting.enabled}
                      onChange={(e) => updateDailyReminder(key, 'enabled', e.target.checked)}
                      className="w-4 h-4 text-[#4a90e2] bg-[#0a0e27] border-gray-600 rounded focus:ring-[#4a90e2] focus:ring-2"
                    />
                    <span className="text-white">{labels[key]}</span>
                  </div>
                  <input
                    type="time"
                    value={setting.time}
                    onChange={(e) => updateDailyReminder(key, 'time', e.target.value)}
                    disabled={!setting.enabled}
                    className="px-3 py-1 bg-[#0a0e27] border border-[#4a90e2]/20 rounded text-white text-sm focus:outline-none focus:border-[#4a90e2] disabled:opacity-50"
                  />
                </div>
              );
            })}
          </div>
        </div>

        {/* Quest Reminders */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Quest Reminders</h3>
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <input
                type="checkbox"
                checked={state.settings.questReminders.incompleteQuests}
                onChange={(e) => updateQuestReminder('incompleteQuests', e.target.checked)}
                className="w-4 h-4 text-[#4a90e2] bg-[#0a0e27] border-gray-600 rounded focus:ring-[#4a90e2] focus:ring-2"
              />
              <span className="text-white">Incomplete quests at 8 PM</span>
            </div>
            <div className="flex items-center space-x-3">
              <input
                type="checkbox"
                checked={state.settings.questReminders.streakWarning}
                onChange={(e) => updateQuestReminder('streakWarning', e.target.checked)}
                className="w-4 h-4 text-[#4a90e2] bg-[#0a0e27] border-gray-600 rounded focus:ring-[#4a90e2] focus:ring-2"
              />
              <span className="text-white">Streak about to break warning</span>
            </div>
          </div>
        </div>

        {/* Achievement Notifications */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Achievement Notifications</h3>
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <input
                type="checkbox"
                checked={state.settings.achievements.levelUps}
                onChange={(e) => updateAchievementSetting('levelUps', e.target.checked)}
                className="w-4 h-4 text-[#4a90e2] bg-[#0a0e27] border-gray-600 rounded focus:ring-[#4a90e2] focus:ring-2"
              />
              <span className="text-white">Level-ups</span>
            </div>
            <div className="flex items-center space-x-3">
              <input
                type="checkbox"
                checked={state.settings.achievements.achievementsUnlocked}
                onChange={(e) => updateAchievementSetting('achievementsUnlocked', e.target.checked)}
                className="w-4 h-4 text-[#4a90e2] bg-[#0a0e27] border-gray-600 rounded focus:ring-[#4a90e2] focus:ring-2"
              />
              <span className="text-white">Achievements unlocked</span>
            </div>
            <div className="flex items-center space-x-3">
              <input
                type="checkbox"
                checked={state.settings.achievements.newEquipment}
                onChange={(e) => updateAchievementSetting('newEquipment', e.target.checked)}
                className="w-4 h-4 text-[#4a90e2] bg-[#0a0e27] border-gray-600 rounded focus:ring-[#4a90e2] focus:ring-2"
              />
              <span className="text-white">New equipment available</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};