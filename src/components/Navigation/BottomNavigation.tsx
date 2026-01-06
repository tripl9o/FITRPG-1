import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  Home,
  Calculator,
  Dumbbell,
  Utensils,
  TrendingUp,
  User,
} from 'lucide-react';

const navigationItems = [
  { path: '/dashboard', icon: Home, label: 'Dashboard' },
  { path: '/calculators', icon: Calculator, label: 'Calc' },
  { path: '/workouts', icon: Dumbbell, label: 'Workouts' },
  { path: '/nutrition', icon: Utensils, label: 'Nutrition' },
  { path: '/progress', icon: TrendingUp, label: 'Progress' },
  { path: '/profile', icon: User, label: 'Profile' },
];

export const BottomNavigation: React.FC = () => {
  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-[#0a0e27] border-t border-[#1a1f3a] px-2 py-2 z-50">
      <div className="grid grid-cols-6 gap-1">
        {navigationItems.map(({ path, icon: Icon, label }) => (
          <NavLink
            key={path}
            to={path}
            className={({ isActive }) =>
              `flex flex-col items-center justify-center py-2 px-1 rounded-lg transition-all duration-200 ${
                isActive
                  ? 'bg-[#4a90e2] text-white'
                  : 'text-gray-400 hover:text-white hover:bg-[#1a1f3a]'
              }`
            }
          >
            <Icon className="w-5 h-5 mb-1" />
            <span className="text-xs font-medium truncate">{label}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  );
};