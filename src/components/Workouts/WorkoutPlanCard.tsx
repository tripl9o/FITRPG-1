import React from 'react';
import { Calendar, Clock, Trash2, Eye, Play } from 'lucide-react';
import { WorkoutPlan } from '../../types/workouts';

interface WorkoutPlanCardProps {
  plan: WorkoutPlan;
  onView: (plan: WorkoutPlan) => void;
  onSetActive: (planId: string) => void;
  onDelete: (planId: string) => void;
}

export const WorkoutPlanCard: React.FC<WorkoutPlanCardProps> = ({
  plan,
  onView,
  onSetActive,
  onDelete,
}) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const getLastUsedText = () => {
    if (!plan.lastUsed) return 'Never used';
    
    const lastUsed = new Date(plan.lastUsed);
    const today = new Date();
    const diffTime = Math.abs(today.getTime() - lastUsed.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return 'Today';
    if (diffDays === 2) return 'Yesterday';
    if (diffDays <= 7) return `${diffDays - 1} days ago`;
    return formatDate(plan.lastUsed);
  };

  return (
    <div className={`bg-[#0a0e27] rounded-lg p-4 border transition-all duration-200 hover:border-[#4a90e2]/40 ${
      plan.isActive ? 'border-[#4a90e2] shadow-lg shadow-[#4a90e2]/20' : 'border-[#4a90e2]/20'
    }`}>
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <h3 className="text-white font-semibold text-lg mb-1">{plan.name}</h3>
          <p className="text-gray-400 text-sm mb-2">{plan.splitType}</p>
          
          <div className="flex items-center space-x-4 text-sm text-gray-400">
            <div className="flex items-center space-x-1">
              <Calendar className="w-4 h-4" />
              <span>Created: {formatDate(plan.createdAt)}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Clock className="w-4 h-4" />
              <span>Last used: {getLastUsedText()}</span>
            </div>
          </div>
        </div>
        
        {plan.isActive && (
          <div className="bg-[#4a90e2] text-white px-2 py-1 rounded text-xs font-semibold">
            ACTIVE
          </div>
        )}
      </div>

      <div className="flex items-center space-x-2">
        <button
          onClick={() => onView(plan)}
          className="flex items-center space-x-1 px-3 py-2 bg-[#1a1f3a] hover:bg-[#4a90e2]/20 text-gray-300 hover:text-white rounded-lg text-sm transition-colors"
        >
          <Eye className="w-4 h-4" />
          <span>View</span>
        </button>
        
        {!plan.isActive && (
          <button
            onClick={() => onSetActive(plan.id)}
            className="flex items-center space-x-1 px-3 py-2 bg-[#4a90e2] hover:bg-[#5a9ff2] text-white rounded-lg text-sm transition-colors"
          >
            <Play className="w-4 h-4" />
            <span>Set Active</span>
          </button>
        )}
        
        <button
          onClick={() => onDelete(plan.id)}
          className="flex items-center space-x-1 px-3 py-2 bg-red-600/20 hover:bg-red-600/30 text-red-400 hover:text-red-300 rounded-lg text-sm transition-colors"
        >
          <Trash2 className="w-4 h-4" />
          <span>Delete</span>
        </button>
      </div>
    </div>
  );
};