import React from 'react';
import { AvatarCard } from '../components/Dashboard/AvatarCard';
import { DailyQuestsCard } from '../components/Dashboard/DailyQuestsCard';
import { QuickActionsCard } from '../components/Dashboard/QuickActionsCard';

export const DashboardPage: React.FC = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Avatar Card - Left Column */}
      <div className="lg:col-span-1">
        <AvatarCard />
      </div>
      
      {/* Main Content - Right Columns */}
      <div className="lg:col-span-2 space-y-6">
        {/* Daily Quests */}
        <DailyQuestsCard />
        
        {/* Quick Actions */}
        <QuickActionsCard />
      </div>
    </div>
  );
};