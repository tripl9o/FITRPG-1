import React from 'react';

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ currentStep, totalSteps }) => {
  const progress = (currentStep / totalSteps) * 100;

  return (
    <div className="w-full mb-8">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium text-gray-300">
          Step {currentStep} of {totalSteps}
        </span>
        <span className="text-sm font-medium text-[#4a90e2]">
          {Math.round(progress)}% Complete
        </span>
      </div>
      <div className="w-full bg-[#1a1f3a] rounded-full h-2 overflow-hidden">
        <div
          className="bg-gradient-to-r from-[#4a90e2] to-[#ffd700] h-full transition-all duration-500 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
};