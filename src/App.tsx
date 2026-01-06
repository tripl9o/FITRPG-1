import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { UserProvider, useUser } from './contexts/UserContext';
import { NotificationProvider } from './contexts/NotificationContext';
import { Layout } from './components/Layout/Layout';
import { OnboardingPage } from './pages/OnboardingPage';
import { AvatarCreationPage } from './pages/AvatarCreationPage';
import { DashboardPage } from './pages/DashboardPage';
import { CalculatorsPage } from './pages/CalculatorsPage';
import { WorkoutsPage } from './pages/WorkoutsPage';
import { NutritionPage } from './pages/NutritionPage';
import { ProgressPage } from './pages/ProgressPage';
import { ProfilePage } from './pages/ProfilePage';
import { AIPersonalizationPage } from './pages/AIPersonalizationPage';

const AppRoutes: React.FC = () => {
  const { state } = useUser();
  
  return (
    <Routes>
      <Route 
        path="/" 
        element={
          state.isOnboardingComplete ? 
          <Navigate to="/dashboard" replace /> : 
          <Navigate to="/onboarding" replace />
        } 
      />
      <Route path="/onboarding" element={<OnboardingPage />} />
      <Route path="/avatar-creation" element={<AvatarCreationPage />} />
      <Route path="/" element={<Layout />}>
        <Route path="dashboard" element={<DashboardPage />} />
        <Route path="ai-personalization" element={<AIPersonalizationPage />} />
        <Route path="calculators" element={<CalculatorsPage />} />
        <Route path="workouts" element={<WorkoutsPage />} />
        <Route path="nutrition" element={<NutritionPage />} />
        <Route path="progress" element={<ProgressPage />} />
        <Route path="profile" element={<ProfilePage />} />
      </Route>
    </Routes>
  );
};

function App() {
  return (
    <UserProvider>
      <NotificationProvider>
        <Router>
          <AppRoutes />
        </Router>
      </NotificationProvider>
    </UserProvider>
  );
}

export default App;