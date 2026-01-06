import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../contexts/UserContext';
import { OnboardingData } from '../types/onboarding';
import { calculateAllStats } from '../utils/calculations';
import { ProgressBar } from '../components/Onboarding/ProgressBar';
import { StepNavigation } from '../components/Onboarding/StepNavigation';
import { Step1FitnessGoal } from '../components/Onboarding/Steps/Step1FitnessGoal';
import { Step2ExperienceLevel } from '../components/Onboarding/Steps/Step2ExperienceLevel';
import { Step3Equipment } from '../components/Onboarding/Steps/Step3Equipment';
import { Step4Frequency } from '../components/Onboarding/Steps/Step4Frequency';
import { Step5PersonalStats } from '../components/Onboarding/Steps/Step5PersonalStats';

export const OnboardingPage: React.FC = () => {
  const navigate = useNavigate();
  const { dispatch } = useUser();
  const [currentStep, setCurrentStep] = useState(1);
  const [onboardingData, setOnboardingData] = useState<OnboardingData>({
    fitnessGoal: null,
    experienceLevel: null,
    equipmentAccess: null,
    trainingFrequency: null,
    personalStats: {
      age: null,
      weight: null,
      weightUnit: 'lbs',
      height: null,
      heightUnit: 'ft',
      heightFeet: null,
      heightInches: null,
      gender: null,
      activityLevel: null,
    },
  });

  const totalSteps = 5;

  const updateData = (updates: Partial<OnboardingData>) => {
    setOnboardingData(prev => ({ ...prev, ...updates }));
  };

  const canGoNext = () => {
    switch (currentStep) {
      case 1:
        return onboardingData.fitnessGoal !== null;
      case 2:
        return onboardingData.experienceLevel !== null;
      case 3:
        return onboardingData.equipmentAccess !== null;
      case 4:
        return onboardingData.trainingFrequency !== null;
      case 5:
        const { personalStats } = onboardingData;
        const hasHeight = personalStats.heightUnit === 'ft' 
          ? personalStats.heightFeet && personalStats.heightInches !== null
          : personalStats.height;
        return personalStats.age && personalStats.weight && hasHeight && 
               personalStats.gender && personalStats.activityLevel;
      default:
        return false;
    }
  };

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(prev => prev + 1);
    } else {
      completeOnboarding();
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const completeOnboarding = () => {
    // Calculate stats
    const calculatedStats = calculateAllStats(onboardingData);
    const finalData = { ...onboardingData, calculatedStats };
    
    // Save to localStorage
    localStorage.setItem('fitRPG-onboarding-data', JSON.stringify(finalData));
    
    // Update user context
    dispatch({ type: 'SET_ONBOARDING_COMPLETE', payload: true });
    
    // Navigate to avatar creation (for now, go to dashboard)
    navigate('/avatar-creation');
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <Step1FitnessGoal data={onboardingData} updateData={updateData} />;
      case 2:
        return <Step2ExperienceLevel data={onboardingData} updateData={updateData} />;
      case 3:
        return <Step3Equipment data={onboardingData} updateData={updateData} />;
      case 4:
        return <Step4Frequency data={onboardingData} updateData={updateData} />;
      case 5:
        return <Step5PersonalStats data={onboardingData} updateData={updateData} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0e27] text-white flex items-center justify-center p-4">
      <div className="max-w-4xl w-full bg-[#1a1f3a] rounded-xl p-8 shadow-2xl border border-[#4a90e2]/20">
        <ProgressBar currentStep={currentStep} totalSteps={totalSteps} />
        
        <div className="min-h-[500px] flex flex-col justify-between">
          <div className="flex-1">
            {renderStep()}
          </div>
          
          <StepNavigation
            currentStep={currentStep}
            totalSteps={totalSteps}
            canGoNext={canGoNext()}
            onNext={handleNext}
            onBack={handleBack}
            isLastStep={currentStep === totalSteps}
          />
        </div>
      </div>
    </div>
  );
};