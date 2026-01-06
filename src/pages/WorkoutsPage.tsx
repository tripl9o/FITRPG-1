import React from 'react';
import { useState, useEffect } from 'react';
import { Dumbbell, Plus, BarChart3 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../contexts/UserContext';
import { WorkoutPlan, WorkoutDay, LoggedExercise, WorkoutSession } from '../types/workouts';
import { WorkoutPlanCard } from '../components/Workouts/WorkoutPlanCard';
import { TodaysWorkout } from '../components/Workouts/TodaysWorkout';
import { WorkoutSession as WorkoutSessionComponent } from '../components/Workouts/WorkoutSession';
import { WorkoutComplete } from '../components/Workouts/WorkoutComplete';

export const WorkoutsPage: React.FC = () => {
  const navigate = useNavigate();
  const { state, dispatch } = useUser();
  const [activeTab, setActiveTab] = useState<'plans' | 'today' | 'history'>('today');
  const [workoutPlans, setWorkoutPlans] = useState<WorkoutPlan[]>([]);
  const [activePlan, setActivePlan] = useState<WorkoutPlan | null>(null);
  const [currentDay, setCurrentDay] = useState<WorkoutDay | null>(null);
  const [workoutInProgress, setWorkoutInProgress] = useState(false);
  const [workoutComplete, setWorkoutComplete] = useState(false);
  const [workoutStats, setWorkoutStats] = useState<any>(null);
  const [workoutHistory, setWorkoutHistory] = useState<WorkoutSession[]>([]);

  // Load workout plans and history
  useEffect(() => {
    const savedPlans = localStorage.getItem('fitRPG-workout-plans');
    if (savedPlans) {
      const plans = JSON.parse(savedPlans);
      setWorkoutPlans(plans);
      
      const active = plans.find((plan: WorkoutPlan) => plan.isActive);
      if (active) {
        setActivePlan(active);
        // Determine current day (simplified - would be more complex in real app)
        if (active.weeklySchedule && active.weeklySchedule.length > 0) {
          const dayIndex = new Date().getDay(); // 0 = Sunday
          const workoutDay = active.weeklySchedule[dayIndex % active.weeklySchedule.length];
          setCurrentDay(workoutDay);
        } else {
          setCurrentDay(null);
        }
      }
    }

    const savedHistory = localStorage.getItem('fitRPG-workout-history');
    if (savedHistory) {
      setWorkoutHistory(JSON.parse(savedHistory));
    }
  }, []);

  const handleSetActivePlan = (planId: string) => {
    const updatedPlans = workoutPlans.map(plan => ({
      ...plan,
      isActive: plan.id === planId,
      lastUsed: plan.id === planId ? new Date().toISOString() : plan.lastUsed,
    }));
    
    setWorkoutPlans(updatedPlans);
    localStorage.setItem('fitRPG-workout-plans', JSON.stringify(updatedPlans));
    
    const newActivePlan = updatedPlans.find(plan => plan.id === planId);
    if (newActivePlan) {
      setActivePlan(newActivePlan);
      if (newActivePlan.weeklySchedule && newActivePlan.weeklySchedule.length > 0) {
        const dayIndex = new Date().getDay();
        const workoutDay = newActivePlan.weeklySchedule[dayIndex % newActivePlan.weeklySchedule.length];
        setCurrentDay(workoutDay);
      } else {
        setCurrentDay(null);
      }
    }
  };

  const handleDeletePlan = (planId: string) => {
    const updatedPlans = workoutPlans.filter(plan => plan.id !== planId);
    setWorkoutPlans(updatedPlans);
    localStorage.setItem('fitRPG-workout-plans', JSON.stringify(updatedPlans));
    
    if (activePlan?.id === planId) {
      setActivePlan(null);
      setCurrentDay(null);
    }
  };

  const handleStartWorkout = () => {
    setWorkoutInProgress(true);
  };

  const handleWorkoutComplete = (exercises: LoggedExercise[], stats: any) => {
    // Create workout session
    const session: WorkoutSession = {
      id: `session_${Date.now()}`,
      planId: activePlan!.id,
      dayNumber: currentDay!.day,
      dayName: currentDay!.name,
      startTime: new Date().toISOString(),
      endTime: new Date().toISOString(),
      exercises,
      totalVolume: stats.totalVolume,
      totalSets: stats.totalSets,
      totalReps: stats.totalReps,
      duration: stats.duration,
      completed: true,
      xpEarned: 50,
      goldEarned: 10,
    };

    // Save to history
    const updatedHistory = [session, ...workoutHistory];
    setWorkoutHistory(updatedHistory);
    localStorage.setItem('fitRPG-workout-history', JSON.stringify(updatedHistory));

    // Award XP and complete quest
    dispatch({ type: 'ADD_XP', payload: 50 });
    
    // Complete workout quest
    const questProgress = localStorage.getItem('fitRPG-quest-progress');
    if (questProgress) {
      const progress = JSON.parse(questProgress);
      progress.workoutCompleted = true;
      localStorage.setItem('fitRPG-quest-progress', JSON.stringify(progress));
    }

    setWorkoutStats({
      ...stats,
      rewards: { xp: 50, gold: 10, bodyStats: 2 }
    });
    setWorkoutInProgress(false);
    setWorkoutComplete(true);
  };

  const handleFinishWorkout = () => {
    setWorkoutComplete(false);
    setWorkoutStats(null);
  };

  if (workoutComplete && workoutStats) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-white">Workouts</h1>
          <Dumbbell className="w-8 h-8 text-[#ffd700]" />
        </div>
        <WorkoutComplete
          stats={workoutStats}
          rewards={workoutStats.rewards}
          onFinish={handleFinishWorkout}
        />
      </div>
    );
  }

  if (workoutInProgress && currentDay) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-white">Workouts</h1>
          <Dumbbell className="w-8 h-8 text-[#ffd700]" />
        </div>
        <WorkoutSessionComponent
          workoutDay={currentDay}
          onComplete={handleWorkoutComplete}
          onCancel={() => setWorkoutInProgress(false)}
        />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-white">Workouts</h1>
        <Dumbbell className="w-8 h-8 text-[#ffd700]" />
      </div>
      
      {/* Tabs */}
      <div className="flex space-x-1 bg-[#1a1f3a] rounded-lg p-1">
        <button
          onClick={() => setActiveTab('today')}
          className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-md transition-all duration-200 ${
            activeTab === 'today'
              ? 'bg-[#4a90e2] text-white shadow-lg'
              : 'text-gray-400 hover:text-white hover:bg-[#4a90e2]/20'
          }`}
        >
          <Dumbbell className="w-5 h-5" />
          <span className="font-medium">Today's Workout</span>
        </button>
        <button
          onClick={() => setActiveTab('plans')}
          className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-md transition-all duration-200 ${
            activeTab === 'plans'
              ? 'bg-[#4a90e2] text-white shadow-lg'
              : 'text-gray-400 hover:text-white hover:bg-[#4a90e2]/20'
          }`}
        >
          <Plus className="w-5 h-5" />
          <span className="font-medium">My Plans</span>
        </button>
        <button
          onClick={() => setActiveTab('history')}
          className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-md transition-all duration-200 ${
            activeTab === 'history'
              ? 'bg-[#4a90e2] text-white shadow-lg'
              : 'text-gray-400 hover:text-white hover:bg-[#4a90e2]/20'
          }`}
        >
          <BarChart3 className="w-5 h-5" />
          <span className="font-medium">History</span>
        </button>
      </div>

      {/* Content */}
      {activeTab === 'today' && (
        <TodaysWorkout
          activePlan={activePlan}
          currentDay={currentDay}
          onStartWorkout={handleStartWorkout}
        />
      )}

      {activeTab === 'plans' && (
        <div className="space-y-6">
          {/* Generate New Plan Button */}
          <div className="bg-[#1a1f3a] rounded-xl p-6 border border-[#4a90e2]/20">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-white mb-2">My Workout Plans</h2>
                <p className="text-gray-400">Manage your AI-generated workout plans</p>
              </div>
              <button
                onClick={() => navigate('/ai-personalization')}
                className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-[#4a90e2] to-[#6a5acd] hover:from-[#5a9ff2] hover:to-[#7a6add] text-white rounded-lg transition-all duration-200 transform hover:scale-105"
              >
                <Plus className="w-5 h-5" />
                <span>Generate New Plan</span>
              </button>
            </div>
          </div>

          {/* Saved Plans */}
          <div className="space-y-4">
            {workoutPlans.length === 0 ? (
              <div className="bg-[#1a1f3a] rounded-xl p-8 border border-[#4a90e2]/20 text-center">
                <Dumbbell className="w-16 h-16 text-[#4a90e2] mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">No Workout Plans Yet</h3>
                <p className="text-gray-400 mb-4">
                  Generate your first personalized workout plan with AI
                </p>
                <button
                  onClick={() => navigate('/ai-personalization')}
                  className="px-6 py-3 bg-[#4a90e2] hover:bg-[#5a9ff2] text-white rounded-lg transition-colors"
                >
                  Get Started
                </button>
              </div>
            ) : (
              workoutPlans.map(plan => (
                <WorkoutPlanCard
                  key={plan.id}
                  plan={plan}
                  onView={(plan) => console.log('View plan:', plan)}
                  onSetActive={handleSetActivePlan}
                  onDelete={handleDeletePlan}
                />
              ))
            )}
          </div>
        </div>
      )}

      {activeTab === 'history' && (
        <div className="bg-[#1a1f3a] rounded-xl p-6 border border-[#4a90e2]/20">
          <h2 className="text-xl font-bold text-white mb-6">Workout History</h2>
          
          {workoutHistory.length === 0 ? (
            <div className="text-center py-8">
              <BarChart3 className="w-16 h-16 text-[#4a90e2] mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-white mb-2">No Workouts Yet</h3>
              <p className="text-gray-400">Complete your first workout to see your progress here!</p>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-[#0a0e27] rounded-lg p-4">
                  <div className="text-2xl font-bold text-[#4a90e2]">{workoutHistory.length}</div>
                  <div className="text-gray-400 text-sm">Total Workouts</div>
                </div>
                <div className="bg-[#0a0e27] rounded-lg p-4">
                  <div className="text-2xl font-bold text-[#4a90e2]">
                    {Math.round(workoutHistory.reduce((sum, w) => sum + w.duration, 0) / workoutHistory.length)}
                  </div>
                  <div className="text-gray-400 text-sm">Avg Duration (min)</div>
                </div>
                <div className="bg-[#0a0e27] rounded-lg p-4">
                  <div className="text-2xl font-bold text-[#4a90e2]">
                    {workoutHistory.reduce((sum, w) => sum + w.totalVolume, 0).toLocaleString()}
                  </div>
                  <div className="text-gray-400 text-sm">Total Volume (lbs)</div>
                </div>
              </div>

              <div className="space-y-3">
                {workoutHistory.slice(0, 10).map(session => (
                  <div key={session.id} className="bg-[#0a0e27] rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-white font-medium">{session.dayName}</h4>
                        <p className="text-gray-400 text-sm">
                          {new Date(session.startTime).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="text-right">
                        <div className="text-[#4a90e2] font-semibold">
                          {session.totalVolume.toLocaleString()} lbs
                        </div>
                        <div className="text-gray-400 text-sm">{session.duration} min</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
      </div>
  );
};