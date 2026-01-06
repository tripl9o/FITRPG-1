import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Bot, Dumbbell, TrendingUp, Target } from 'lucide-react';

export const QuickActionsCard: React.FC = () => {
  const navigate = useNavigate();

  const actions = [
    {
      icon: Bot,
      title: 'AI Personalization Hub',
      description: 'Generate Workout & Meal Plans',
      onClick: () => navigate('/ai-personalization'),
      gradient: 'from-purple-500 to-pink-500',
    },
    {
      icon: Dumbbell,
      title: 'Start Workout',
      description: 'Begin today\'s training',
      onClick: () => navigate('/workouts'),
      gradient: 'from-blue-500 to-cyan-500',
    },
    {
      icon: TrendingUp,
      title: 'View Progress',
      description: 'Check your stats and charts',
      onClick: () => navigate('/progress'),
      gradient: 'from-green-500 to-emerald-500',
    },
  ];

  return (
    <div className="bg-[#1a1f3a] rounded-xl p-6 border border-[#4a90e2]/20 shadow-lg">
      <div className="flex items-center space-x-3 mb-6">
        <Target className="w-6 h-6 text-[#ffd700]" />
        <h2 className="text-xl font-bold text-white">Quick Actions</h2>
      </div>

      <div className="space-y-4">
        {actions.map((action, index) => (
          <button
            key={index}
            onClick={action.onClick}
            className="w-full p-4 rounded-lg bg-[#0a0e27] border border-[#4a90e2]/20 hover:border-[#4a90e2]/40 transition-all duration-200 transform hover:scale-105 group"
          >
            <div className="flex items-center space-x-4">
              <div className={`p-3 rounded-lg bg-gradient-to-r ${action.gradient} group-hover:scale-110 transition-transform duration-200`}>
                <action.icon className="w-6 h-6 text-white" />
              </div>
              <div className="text-left">
                <h3 className="text-white font-semibold group-hover:text-[#4a90e2] transition-colors">
                  {action.title}
                </h3>
                <p className="text-gray-400 text-sm">{action.description}</p>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};