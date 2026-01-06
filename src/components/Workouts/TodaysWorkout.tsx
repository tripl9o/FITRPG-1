import React from 'react';
import { Play, Clock, Target } from 'lucide-react';
import { WorkoutPlan, WorkoutDay } from '../../types/workouts';

interface TodaysWorkoutProps {
  activePlan: WorkoutPlan | null;
  currentDay: WorkoutDay | null;
  onStartWorkout: () => void;
}

export const TodaysWorkout: React.FC<TodaysWorkoutProps> = ({
  activePlan,
  currentDay,
  onStartWorkout,
}) => {
  if (!activePlan || !currentDay) {
    return (
      <div className="bg-[#1a1f3a] rounded-xl p-6 border border-[#4a90e2]/20">
        <div className="flex items-center space-x-3 mb-4">
          <Target className="w-6 h-6 text-[#4a90e2]" />
          <h2 className="text-xl font-bold text-white">Today's Workout</h2>
        </div>
        
        <div className="text-center py-8">
          <div className="text-gray-400 mb-4">No active workout plan set</div>
          <div className="space-y-3">
            <p className="text-gray-300 text-sm">
              Generate a personalized workout plan with AI or set an existing plan as active.
            </p>
            <button className="px-6 py-3 bg-[#4a90e2] hover:bg-[#5a9ff2] text-white rounded-lg transition-colors">
              Generate Plan with AI
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#1a1f3a] rounded-xl p-6 border border-[#4a90e2]/20">
      <div className="flex items-center space-x-3 mb-6">
        <Target className="w-6 h-6 text-[#4a90e2]" />
        <h2 className="text-xl font-bold text-white">Today's Workout</h2>
      </div>
      
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold text-white mb-1">
            DAY {currentDay.day} - {currentDay.name.toUpperCase()}
          </h3>
          <p className="text-gray-400 text-sm">{activePlan.splitType}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-[#0a0e27] rounded-lg p-3">
            <div className="flex items-center space-x-2 mb-1">
              <Clock className="w-4 h-4 text-[#4a90e2]" />
              <span className="text-gray-300 text-sm">Duration</span>
            </div>
            <div className="text-white font-semibold">{currentDay.estimatedDuration} min</div>
          </div>
          
          <div className="bg-[#0a0e27] rounded-lg p-3">
            <div className="flex items-center space-x-2 mb-1">
              <Target className="w-4 h-4 text-[#4a90e2]" />
              <span className="text-gray-300 text-sm">Exercises</span>
            </div>
            <div className="text-white font-semibold">{currentDay.exercises.length}</div>
          </div>
          
          <div className="bg-[#0a0e27] rounded-lg p-3">
            <div className="flex items-center space-x-2 mb-1">
              <Play className="w-4 h-4 text-[#4a90e2]" />
              <span className="text-gray-300 text-sm">Status</span>
            </div>
            <div className="text-gray-400 font-semibold">Not Started</div>
          </div>
        </div>

        <div className="bg-[#0a0e27] rounded-lg p-4">
          <h4 className="text-white font-medium mb-2">Exercise Preview:</h4>
          <div className="space-y-1">
            {currentDay.exercises.slice(0, 3).map((exercise, index) => (
              <div key={exercise.id} className="text-gray-300 text-sm">
                {index + 1}. {exercise.name} - {exercise.sets} sets × {exercise.reps}
              </div>
            ))}
            {currentDay.exercises.length > 3 && (
              <div className="text-gray-400 text-sm">
                +{currentDay.exercises.length - 3} more exercises
              </div>
            )}
          </div>
        </div>

        <button
          onClick={onStartWorkout}
          className="w-full py-4 bg-gradient-to-r from-[#4a90e2] to-[#6a5acd] hover:from-[#5a9ff2] hover:to-[#7a6add] text-white font-bold rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg"
        >
          <div className="flex items-center justify-center space-x-2">
            <Play className="w-5 h-5" />
            <span>Start Workout</span>
          </div>
        </button>
      </div>
    </div>
  );
};