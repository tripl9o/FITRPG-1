import React from 'react';
import { Building, Home, User } from 'lucide-react';
import { OptionCard } from '../OptionCard';
import { OnboardingData } from '../../../types/onboarding';

interface Step3Props {
  data: OnboardingData;
  updateData: (updates: Partial<OnboardingData>) => void;
}

const equipment = [
  {
    id: 'full-gym' as const,
    icon: Building,
    title: 'Full Gym',
    description: 'Access to commercial gym with all equipment',
  },
  {
    id: 'home-gym' as const,
    icon: Home,
    title: 'Home Gym',
    description: 'Dumbbells, resistance bands, and basic equipment',
  },
  {
    id: 'bodyweight' as const,
    icon: User,
    title: 'Bodyweight Only',
    description: 'No equipment needed - just your body',
  },
];

export const Step3Equipment: React.FC<Step3Props> = ({ data, updateData }) => {
  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-white mb-4">What equipment do you have access to?</h2>
        <p className="text-gray-400">We'll customize your workouts based on available equipment</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
        {equipment.map((item) => (
          <OptionCard
            key={item.id}
            icon={item.icon}
            title={item.title}
            description={item.description}
            isSelected={data.equipmentAccess === item.id}
            onClick={() => updateData({ equipmentAccess: item.id })}
          />
        ))}
      </div>
    </div>
  );
};