import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface StepNavigationProps {
  currentStep: number;
  totalSteps: number;
  canGoNext: boolean;
  onNext: () => void;
  onBack: () => void;
  isLastStep: boolean;
}

export const StepNavigation: React.FC<StepNavigationProps> = ({
  currentStep,
  totalSteps,
  canGoNext,
  onNext,
  onBack,
  isLastStep,
}) => {
  return (
    <div className="flex justify-between items-center mt-8">
      <button
        onClick={onBack}
        disabled={currentStep === 1}
        className={`
          flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all duration-200
          ${currentStep === 1
            ? 'text-gray-500 cursor-not-allowed'
            : 'text-gray-300 hover:text-white hover:bg-[#1a1f3a]'
          }
        `}
      >
        <ChevronLeft className="w-5 h-5" />
        <span>Back</span>
      </button>

      <button
        onClick={onNext}
        disabled={!canGoNext}
        className={`
          flex items-center space-x-2 px-8 py-3 rounded-lg font-semibold transition-all duration-200 transform
          ${canGoNext
            ? 'bg-gradient-to-r from-[#4a90e2] to-[#6a5acd] hover:from-[#5a9ff2] hover:to-[#7a6add] text-white hover:scale-105 shadow-lg'
            : 'bg-gray-600 text-gray-400 cursor-not-allowed'
          }
        `}
      >
        <span>{isLastStep ? 'Complete Setup' : 'Next'}</span>
        {!isLastStep && <ChevronRight className="w-5 h-5" />}
      </button>
    </div>
  );
};