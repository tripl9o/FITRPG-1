import React, { useState } from 'react';
import { Sword, Droplets, Utensils, Moon, Brain, Plus } from 'lucide-react';
import { Quest } from '../../types/quests';
import { useNotifications } from '../../contexts/NotificationContext';
import { SleepModal } from './Modals/SleepModal';
import { BrainChallengeModal } from './Modals/BrainChallengeModal';

interface QuestCardProps {
  quest: Quest;
  onComplete: (questId: string, xp: number, gold: number) => void;
  onProgress: (questId: string, progress: number) => void;
}

export const QuestCard: React.FC<QuestCardProps> = ({ quest, onComplete, onProgress }) => {
  const { addNotification } = useNotifications();
  const [showSleepModal, setShowSleepModal] = useState(false);
  const [showBrainModal, setShowBrainModal] = useState(false);

  const getQuestIcon = () => {
    switch (quest.type) {
      case 'workout': return <Sword className="w-5 h-5" />;
      case 'water': return <Droplets className="w-5 h-5" />;
      case 'meals': return <Utensils className="w-5 h-5" />;
      case 'sleep': return <Moon className="w-5 h-5" />;
      case 'brain': return <Brain className="w-5 h-5" />;
      default: return <Sword className="w-5 h-5" />;
    }
  };

  const handleWaterIncrement = () => {
    if (quest.progress < quest.maxProgress) {
      const newProgress = quest.progress + 1;
      onProgress(quest.id, newProgress);
      if (newProgress >= quest.maxProgress) {
        onComplete(quest.id, quest.xpReward, quest.goldReward);
        addNotification({
          type: 'quest-complete',
          title: 'Quest Complete!',
          message: `${quest.title} completed! +${quest.xpReward} XP, +${quest.goldReward} Gold`,
          icon: '💧',
        });
      }
    }
  };

  const handleSleepLog = (hours: number) => {
    onProgress(quest.id, hours);
    if (hours >= 7) {
      onComplete(quest.id, quest.xpReward, quest.goldReward);
      addNotification({
        type: 'quest-complete',
        title: 'Quest Complete!',
        message: `${quest.title} completed! +${quest.xpReward} XP, +${quest.goldReward} Gold`,
        icon: '😴',
      });
    }
    setShowSleepModal(false);
  };

  const handleBrainChallengeComplete = () => {
    onComplete(quest.id, quest.xpReward, quest.goldReward);
    addNotification({
      type: 'quest-complete',
      title: 'Quest Complete!',
      message: `${quest.title} completed! +${quest.xpReward} XP, +${quest.goldReward} Gold`,
      icon: '🧠',
    });
    setShowBrainModal(false);
  };

  const renderProgressIndicator = () => {
    if (quest.type === 'water') {
      return (
        <div className="flex items-center space-x-1 mb-2">
          {Array.from({ length: quest.maxProgress }).map((_, i) => (
            <div
              key={i}
              className={`w-3 h-3 rounded-full ${
                i < quest.progress ? 'bg-[#4a90e2]' : 'bg-gray-600'
              }`}
            />
          ))}
        </div>
      );
    }
    
    if (quest.type === 'meals') {
      return (
        <div className="flex items-center space-x-1 mb-2">
          {Array.from({ length: quest.maxProgress }).map((_, i) => (
            <div
              key={i}
              className={`w-3 h-3 rounded-full ${
                i < quest.progress ? 'bg-[#4a90e2]' : 'bg-gray-600'
              }`}
            />
          ))}
        </div>
      );
    }
    
    return null;
  };

  const renderActionButton = () => {
    if (quest.completed) return null;

    switch (quest.type) {
      case 'water':
        return quest.progress < quest.maxProgress ? (
          <button
            onClick={handleWaterIncrement}
            className="flex items-center space-x-1 px-3 py-1 bg-[#4a90e2] hover:bg-[#5a9ff2] text-white rounded-lg text-sm transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>+1 Cup</span>
          </button>
        ) : null;
      
      case 'sleep':
        return (
          <button
            onClick={() => setShowSleepModal(true)}
            className="px-3 py-1 bg-[#4a90e2] hover:bg-[#5a9ff2] text-white rounded-lg text-sm transition-colors"
          >
            Log Sleep
          </button>
        );
      
      case 'brain':
        return (
          <button
            onClick={() => setShowBrainModal(true)}
            className="px-3 py-1 bg-[#4a90e2] hover:bg-[#5a9ff2] text-white rounded-lg text-sm transition-colors"
          >
            Start Challenge
          </button>
        );
      
      default:
        return null;
    }
  };

  return (
    <>
      <div
        className={`p-4 rounded-lg border transition-all duration-200 ${
          quest.completed
            ? 'bg-green-900/20 border-green-500/30'
            : 'bg-[#0a0e27] border-[#4a90e2]/20 hover:border-[#4a90e2]/40'
        }`}
      >
        <div className="flex items-start justify-between mb-2">
          <div className="flex items-center space-x-3">
            <div className={`p-2 rounded-lg ${quest.completed ? 'bg-green-500' : 'bg-[#4a90e2]'}`}>
              {quest.completed ? '✓' : getQuestIcon()}
            </div>
            <div>
              <h4 className={`font-semibold ${quest.completed ? 'text-green-400' : 'text-white'}`}>
                {quest.title}
              </h4>
              <p className="text-gray-400 text-sm">{quest.description}</p>
            </div>
          </div>
          {renderActionButton()}
        </div>
        
        {renderProgressIndicator()}
        
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center space-x-4 text-gray-400">
            <span>+{quest.xpReward} XP</span>
            <span>+{quest.goldReward} Gold</span>
            <span>+{quest.statReward.amount} {quest.statReward.stat}</span>
          </div>
        </div>
      </div>

      {showSleepModal && (
        <SleepModal
          onClose={() => setShowSleepModal(false)}
          onSubmit={handleSleepLog}
        />
      )}

      {showBrainModal && (
        <BrainChallengeModal
          onClose={() => setShowBrainModal(false)}
          onComplete={handleBrainChallengeComplete}
        />
      )}
    </>
  );
};