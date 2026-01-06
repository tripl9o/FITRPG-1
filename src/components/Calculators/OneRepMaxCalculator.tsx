import React, { useState, useEffect } from 'react';
import { Dumbbell } from 'lucide-react';

export const OneRepMaxCalculator: React.FC = () => {
  const [exercises, setExercises] = useState([
    { name: 'Bench Press', weight: 0, reps: 0, oneRepMax: 0 },
    { name: 'Squat', weight: 0, reps: 0, oneRepMax: 0 },
    { name: 'Deadlift', weight: 0, reps: 0, oneRepMax: 0 },
    { name: 'Overhead Press', weight: 0, reps: 0, oneRepMax: 0 }
  ]);
  const [weightUnit, setWeightUnit] = useState<'lbs' | 'kg'>('lbs');

  // Pre-fill weight unit from user data
  useEffect(() => {
    const onboardingData = localStorage.getItem('fitRPG-onboarding-data');
    if (onboardingData) {
      const data = JSON.parse(onboardingData);
      setWeightUnit(data.personalStats?.weightUnit || 'lbs');
    }
  }, []);

  // Calculate 1RM using Brzycki formula: Weight / (1.0278 - 0.0278 × Reps)
  const calculateOneRepMax = (weight: number, reps: number): number => {
    if (weight <= 0 || reps <= 0 || reps > 15) return 0;
    return Math.round(weight / (1.0278 - 0.0278 * reps));
  };

  const updateExercise = (index: number, field: 'weight' | 'reps', value: number) => {
    const newExercises = [...exercises];
    newExercises[index][field] = value;
    newExercises[index].oneRepMax = calculateOneRepMax(
      newExercises[index].weight,
      newExercises[index].reps
    );
    setExercises(newExercises);

    // Save to user profile
    const savedProfile = localStorage.getItem('fitRPG-user-data');
    if (savedProfile) {
      const profile = JSON.parse(savedProfile);
      const oneRepMaxes = newExercises.reduce((acc, exercise) => {
        if (exercise.oneRepMax > 0) {
          acc[exercise.name.toLowerCase().replace(' ', '')] = exercise.oneRepMax;
        }
        return acc;
      }, {} as { [key: string]: number });

      profile.calculatedValues = {
        ...profile.calculatedValues,
        oneRepMaxes
      };
      localStorage.setItem('fitRPG-user-data', JSON.stringify(profile));
    }
  };

  const getStrengthLevel = (exercise: string, oneRepMax: number, bodyWeight: number = 150): string => {
    // Strength standards (approximate, for 150lb person)
    const standards = {
      'Bench Press': { beginner: 135, intermediate: 185, advanced: 225, elite: 275 },
      'Squat': { beginner: 185, intermediate: 255, advanced: 315, elite: 405 },
      'Deadlift': { beginner: 225, intermediate: 315, advanced: 405, elite: 495 },
      'Overhead Press': { beginner: 95, intermediate: 125, advanced: 155, elite: 185 }
    };

    const exerciseStandards = standards[exercise as keyof typeof standards];
    if (!exerciseStandards || oneRepMax === 0) return 'Not tested';

    // Adjust for body weight (rough approximation)
    const adjustment = bodyWeight / 150;
    const adjusted = {
      beginner: exerciseStandards.beginner * adjustment,
      intermediate: exerciseStandards.intermediate * adjustment,
      advanced: exerciseStandards.advanced * adjustment,
      elite: exerciseStandards.elite * adjustment
    };

    if (oneRepMax >= adjusted.elite) return 'Elite';
    if (oneRepMax >= adjusted.advanced) return 'Advanced';
    if (oneRepMax >= adjusted.intermediate) return 'Intermediate';
    if (oneRepMax >= adjusted.beginner) return 'Beginner';
    return 'Novice';
  };

  const getPercentageReps = (oneRepMax: number) => {
    return [
      { percentage: 95, weight: Math.round(oneRepMax * 0.95), reps: '1-2' },
      { percentage: 90, weight: Math.round(oneRepMax * 0.90), reps: '2-4' },
      { percentage: 85, weight: Math.round(oneRepMax * 0.85), reps: '4-6' },
      { percentage: 80, weight: Math.round(oneRepMax * 0.80), reps: '6-8' },
      { percentage: 75, weight: Math.round(oneRepMax * 0.75), reps: '8-10' },
      { percentage: 70, weight: Math.round(oneRepMax * 0.70), reps: '10-12' }
    ];
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-white mb-2">One Rep Max Calculator</h2>
        <p className="text-gray-400">Calculate your maximum strength for key lifts</p>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-300 mb-2">Weight Unit</label>
        <select
          value={weightUnit}
          onChange={(e) => setWeightUnit(e.target.value as 'lbs' | 'kg')}
          className="px-4 py-2 bg-[#0a0e27] border border-[#4a90e2]/20 rounded-lg text-white focus:outline-none focus:border-[#4a90e2]"
        >
          <option value="lbs">lbs</option>
          <option value="kg">kg</option>
        </select>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {exercises.map((exercise, index) => (
          <div key={exercise.name} className="bg-[#0a0e27] rounded-lg p-6 border border-[#4a90e2]/20">
            <div className="flex items-center space-x-3 mb-4">
              <Dumbbell className="w-6 h-6 text-[#4a90e2]" />
              <h3 className="text-lg font-semibold text-white">{exercise.name}</h3>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm text-gray-300 mb-1">Weight ({weightUnit})</label>
                  <input
                    type="number"
                    value={exercise.weight || ''}
                    onChange={(e) => updateExercise(index, 'weight', parseFloat(e.target.value) || 0)}
                    className="w-full px-3 py-2 bg-[#1a1f3a] border border-[#4a90e2]/20 rounded text-white focus:outline-none focus:border-[#4a90e2]"
                    placeholder="0"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-300 mb-1">Reps</label>
                  <input
                    type="number"
                    value={exercise.reps || ''}
                    onChange={(e) => updateExercise(index, 'reps', parseInt(e.target.value) || 0)}
                    className="w-full px-3 py-2 bg-[#1a1f3a] border border-[#4a90e2]/20 rounded text-white focus:outline-none focus:border-[#4a90e2]"
                    placeholder="0"
                    max="15"
                  />
                </div>
              </div>

              {exercise.oneRepMax > 0 && (
                <div className="space-y-3">
                  <div className="text-center p-3 bg-[#1a1f3a] rounded-lg">
                    <div className="text-2xl font-bold text-[#4a90e2]">
                      {exercise.oneRepMax} {weightUnit}
                    </div>
                    <div className="text-sm text-gray-400">Estimated 1RM</div>
                    <div className="text-sm text-[#ffd700] mt-1">
                      {getStrengthLevel(exercise.name, exercise.oneRepMax)} Level
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h4 className="text-sm font-medium text-gray-300">Training Percentages:</h4>
                    <div className="space-y-1">
                      {getPercentageReps(exercise.oneRepMax).slice(0, 3).map((rep) => (
                        <div key={rep.percentage} className="flex justify-between text-sm">
                          <span className="text-gray-400">{rep.percentage}%:</span>
                          <span className="text-white">{rep.weight} {weightUnit} × {rep.reps}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="bg-[#0a0e27] rounded-lg p-6 border border-[#4a90e2]/20">
        <h3 className="text-lg font-semibold text-white mb-4">💡 How to Use</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-300">
          <div>
            <h4 className="text-white font-medium mb-2">Testing Guidelines:</h4>
            <ul className="space-y-1">
              <li>• Warm up thoroughly before testing</li>
              <li>• Use proper form throughout</li>
              <li>• Test with 3-8 reps for accuracy</li>
              <li>• Have a spotter for safety</li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-medium mb-2">Training Applications:</h4>
            <ul className="space-y-1">
              <li>• Use percentages to plan workouts</li>
              <li>• Track strength progress over time</li>
              <li>• Set realistic strength goals</li>
              <li>• Compare to strength standards</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};