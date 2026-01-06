import React from 'react';
import { Star } from 'lucide-react';
import { OptionCard } from '../OptionCard';
import { OnboardingData } from '../../../types/onboarding';

interface Step2Props {
  data: OnboardingData;
  updateData: (updates: Partial<OnboardingData>) => void;
}

const StarRating: React.FC<{ count: number; isSelected: boolean }> = ({ count, isSelected }) => (
  <div className="flex space-x-1">
    {[...Array(3)].map((_, i) => (
      <Star
        key={i}
        className={`w-6 h-6 ${
          i < count
            ? isSelected ? 'text-[#ffd700] fill-current' : 'text-gray-400 fill-current'
            : 'text-gray-600'
        }`}
      />
    ))}
  </div>
);

const levels = [
  {
    id: 'beginner' as const,
    title: 'Beginner',
    description: 'New to fitness or returning after a long break',
    stars: 1,
  },
  {
    id: 'intermediate' as const,
    title: 'Intermediate',
    description: 'Regular exercise for 6+ months',
    stars: 2,
  },
  {
    id: 'advanced' as const,
    title: 'Advanced',
    description: 'Consistent training for 2+ years',
    stars: 3,
  },
];

export const Step2ExperienceLevel: React.FC<Step2Props> = ({ data, updateData }) => {
  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-white mb-4">What's your fitness experience?</h2>
        <p className="text-gray-400">This helps us recommend the right workout intensity</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
        {levels.map((level) => (
          <div key={level.id} className="relative">
            <OptionCard
              icon={() => <StarRating count={level.stars} isSelected={data.experienceLevel === level.id} />}
              title={level.title}
              description={level.description}
              isSelected={data.experienceLevel === level.id}
              onClick={() => updateData({ experienceLevel: level.id })}
            />
          </div>
        ))}
      </div>
    </div>
  );
};