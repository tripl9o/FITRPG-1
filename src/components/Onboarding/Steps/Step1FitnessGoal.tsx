import React from 'react';
import { Flame, Dumbbell, Target, Heart } from 'lucide-react';
import { OptionCard } from '../OptionCard';
import { OnboardingData } from '../../../types/onboarding';

interface Step1Props {
  data: OnboardingData;
  updateData: (updates: Partial<OnboardingData>) => void;
}

const goals = [
  {
    id: 'lose-fat' as const,
    icon: Flame,
    title: 'Lose Fat',
    description: 'Burn calories and reduce body fat percentage',
  },
  {
    id: 'gain-muscle' as const,
    icon: Dumbbell,
    title: 'Gain Muscle',
    description: 'Build lean muscle mass and strength',
  },
  {
    id: 'get-toned' as const,
    icon: Target,
    title: 'Get Toned',
    description: 'Build muscle while losing fat for definition',
  },
  {
    id: 'general-fitness' as const,
    icon: Heart,
    title: 'General Fitness',
    description: 'Improve overall health and wellness',
  },
];

export const Step1FitnessGoal: React.FC<Step1Props> = ({ data, updateData }) => {
  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-white mb-4">What's your primary fitness goal?</h2>
        <p className="text-gray-400">Choose the goal that best describes what you want to achieve</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto">
        {goals.map((goal) => (
          <OptionCard
            key={goal.id}
            icon={goal.icon}
            title={goal.title}
            description={goal.description}
            isSelected={data.fitnessGoal === goal.id}
            onClick={() => updateData({ fitnessGoal: goal.id })}
          />
        ))}
      </div>
    </div>
  );
};