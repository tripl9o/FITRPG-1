import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Clock, Plus, Check, X } from 'lucide-react';
import { WorkoutDay, LoggedSet, LoggedExercise } from '../../types/workouts';

interface WorkoutSessionProps {
  workoutDay: WorkoutDay;
  onComplete: (exercises: LoggedExercise[], stats: any) => void;
  onCancel: () => void;
}

export const WorkoutSession: React.FC<WorkoutSessionProps> = ({
  workoutDay,
  onComplete,
  onCancel,
}) => {
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [loggedExercises, setLoggedExercises] = useState<LoggedExercise[]>([]);
  const [currentSets, setCurrentSets] = useState<LoggedSet[]>([]);
  const [restTimer, setRestTimer] = useState<number>(0);
  const [isResting, setIsResting] = useState(false);
  const [startTime] = useState(new Date());

  const currentExercise = workoutDay.exercises[currentExerciseIndex];
  const isLastExercise = currentExerciseIndex === workoutDay.exercises.length - 1;
  const completedExercises = loggedExercises.length;

  // Initialize sets for current exercise
  useEffect(() => {
    const existingLog = loggedExercises.find(e => e.exerciseId === currentExercise.id);
    if (existingLog) {
      setCurrentSets(existingLog.sets);
    } else {
      // Initialize with target number of sets
      const initialSets: LoggedSet[] = Array.from({ length: currentExercise.sets }, () => ({
        weight: 0,
        reps: 0,
        completed: false,
      }));
      setCurrentSets(initialSets);
    }
  }, [currentExerciseIndex, currentExercise.id, loggedExercises]);

  // Rest timer countdown
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isResting && restTimer > 0) {
      interval = setInterval(() => {
        setRestTimer(prev => {
          if (prev <= 1) {
            setIsResting(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isResting, restTimer]);

  const updateSet = (setIndex: number, field: 'weight' | 'reps', value: number) => {
    const newSets = [...currentSets];
    newSets[setIndex] = {
      ...newSets[setIndex],
      [field]: value,
      completed: newSets[setIndex].weight > 0 && newSets[setIndex].reps > 0,
    };
    setCurrentSets(newSets);
  };

  const addSet = () => {
    setCurrentSets([...currentSets, { weight: 0, reps: 0, completed: false }]);
  };

  const startRestTimer = () => {
    const restMinutes = parseInt(currentExercise.rest.split(' ')[0]) || 2;
    setRestTimer(restMinutes * 60);
    setIsResting(true);
  };

  const saveCurrentExercise = () => {
    const exerciseLog: LoggedExercise = {
      exerciseId: currentExercise.id,
      name: currentExercise.name,
      sets: currentSets.filter(set => set.completed),
      skipped: currentSets.filter(set => set.completed).length === 0,
    };

    setLoggedExercises(prev => {
      const filtered = prev.filter(e => e.exerciseId !== currentExercise.id);
      return [...filtered, exerciseLog];
    });
  };

  const goToNextExercise = () => {
    saveCurrentExercise();
    if (isLastExercise) {
      completeWorkout();
    } else {
      setCurrentExerciseIndex(prev => prev + 1);
      startRestTimer();
    }
  };

  const goToPreviousExercise = () => {
    saveCurrentExercise();
    if (currentExerciseIndex > 0) {
      setCurrentExerciseIndex(prev => prev - 1);
    }
  };

  const completeWorkout = () => {
    saveCurrentExercise();
    
    const endTime = new Date();
    const duration = Math.round((endTime.getTime() - startTime.getTime()) / 1000 / 60);
    
    const allExercises = [...loggedExercises];
    const totalSets = allExercises.reduce((sum, ex) => sum + ex.sets.length, 0);
    const totalReps = allExercises.reduce((sum, ex) => 
      sum + ex.sets.reduce((repSum, set) => repSum + set.reps, 0), 0
    );
    const totalVolume = allExercises.reduce((sum, ex) => 
      sum + ex.sets.reduce((volSum, set) => volSum + (set.weight * set.reps), 0), 0
    );

    const stats = {
      duration,
      totalSets,
      totalReps,
      totalVolume,
      exercisesCompleted: allExercises.filter(ex => !ex.skipped).length,
    };

    onComplete(allExercises, stats);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const completedSets = currentSets.filter(set => set.completed).length;
  const progressPercentage = ((completedExercises + (completedSets / currentSets.length)) / workoutDay.exercises.length) * 100;

  return (
    <div className="bg-[#1a1f3a] rounded-xl p-6 border border-[#4a90e2]/20">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-white">Workout in Progress</h2>
          <p className="text-gray-400">Exercise {currentExerciseIndex + 1} of {workoutDay.exercises.length}</p>
        </div>
        <button
          onClick={onCancel}
          className="p-2 text-gray-400 hover:text-white transition-colors"
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-[#0a0e27] rounded-full h-2 mb-6">
        <div
          className="bg-gradient-to-r from-[#4a90e2] to-[#6a5acd] h-full rounded-full transition-all duration-300"
          style={{ width: `${progressPercentage}%` }}
        />
      </div>

      {/* Current Exercise */}
      <div className="bg-[#0a0e27] rounded-lg p-6 mb-6">
        <h3 className="text-lg font-semibold text-white mb-2">{currentExercise.name}</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div>
            <span className="text-gray-400 text-sm">Target:</span>
            <div className="text-white">{currentExercise.sets} sets × {currentExercise.reps}</div>
          </div>
          <div>
            <span className="text-gray-400 text-sm">Rest:</span>
            <div className="text-white">{currentExercise.rest}</div>
          </div>
          <div>
            <span className="text-gray-400 text-sm">Progress:</span>
            <div className="text-[#4a90e2]">{completedSets}/{currentSets.length} sets</div>
          </div>
        </div>
        
        {currentExercise.notes && (
          <div className="bg-[#1a1f3a] rounded-lg p-3 mb-4">
            <span className="text-gray-400 text-sm">Notes:</span>
            <p className="text-gray-300">{currentExercise.notes}</p>
          </div>
        )}
      </div>

      {/* Set Logging */}
      <div className="space-y-4 mb-6">
        <h4 className="text-white font-medium">Log Sets:</h4>
        {currentSets.map((set, index) => (
          <div key={index} className={`flex items-center space-x-3 p-3 rounded-lg ${
            set.completed ? 'bg-green-900/20 border border-green-500/30' : 'bg-[#0a0e27]'
          }`}>
            <span className="text-gray-300 w-12">Set {index + 1}:</span>
            <input
              type="number"
              placeholder="Weight"
              value={set.weight || ''}
              onChange={(e) => updateSet(index, 'weight', parseFloat(e.target.value) || 0)}
              className="w-20 px-3 py-2 bg-[#1a1f3a] border border-[#4a90e2]/20 rounded text-white focus:outline-none focus:border-[#4a90e2]"
            />
            <span className="text-gray-400">lbs ×</span>
            <input
              type="number"
              placeholder="Reps"
              value={set.reps || ''}
              onChange={(e) => updateSet(index, 'reps', parseInt(e.target.value) || 0)}
              className="w-16 px-3 py-2 bg-[#1a1f3a] border border-[#4a90e2]/20 rounded text-white focus:outline-none focus:border-[#4a90e2]"
            />
            <span className="text-gray-400">reps</span>
            {set.completed && <Check className="w-5 h-5 text-green-500" />}
          </div>
        ))}
        
        <button
          onClick={addSet}
          className="flex items-center space-x-2 px-4 py-2 bg-[#4a90e2]/20 hover:bg-[#4a90e2]/30 text-[#4a90e2] rounded-lg transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Add Set</span>
        </button>
      </div>

      {/* Rest Timer */}
      {isResting && (
        <div className="bg-[#0a0e27] rounded-lg p-4 mb-6 text-center">
          <div className="flex items-center justify-center space-x-2 mb-2">
            <Clock className="w-5 h-5 text-[#4a90e2]" />
            <span className="text-white font-medium">Rest Timer</span>
          </div>
          <div className="text-2xl font-bold text-[#4a90e2]">{formatTime(restTimer)}</div>
          <button
            onClick={() => setIsResting(false)}
            className="mt-2 px-4 py-2 bg-[#4a90e2] hover:bg-[#5a9ff2] text-white rounded-lg text-sm transition-colors"
          >
            Skip Rest
          </button>
        </div>
      )}

      {/* Navigation */}
      <div className="flex items-center justify-between">
        <button
          onClick={goToPreviousExercise}
          disabled={currentExerciseIndex === 0}
          className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
            currentExerciseIndex === 0
              ? 'text-gray-500 cursor-not-allowed'
              : 'text-gray-300 hover:text-white hover:bg-[#4a90e2]/20'
          }`}
        >
          <ChevronLeft className="w-5 h-5" />
          <span>Previous</span>
        </button>

        <button
          onClick={goToNextExercise}
          className="flex items-center space-x-2 px-6 py-3 bg-[#4a90e2] hover:bg-[#5a9ff2] text-white rounded-lg transition-colors"
        >
          <span>{isLastExercise ? 'Finish Workout' : 'Next Exercise'}</span>
          {!isLastExercise && <ChevronRight className="w-5 h-5" />}
        </button>
      </div>
    </div>
  );
};