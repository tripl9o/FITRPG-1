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
  { path: '/calculators', icon: Calculator, label: 'Calculators' },
  { path: '/workouts', icon: Dumbbell, label: 'Workouts' },
  { path: '/nutrition', icon: Utensils, label: 'Nutrition' },
  { path: '/progress', icon: TrendingUp, label: 'Progress' },
  { path: '/profile', icon: User, label: 'Profile' },
];

export const SideNavigation: React.FC = () => {
  return (
    <aside className="hidden lg:flex flex-col w-64 bg-[#0a0e27] border-r border-[#1a1f3a] h-full">
      <nav className="flex-1 px-4 py-6 space-y-2">
        {navigationItems.map(({ path, icon: Icon, label }) => (
          <NavLink
            key={path}
            to={path}
            className={({ isActive }) =>
              `flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                isActive
                  ? 'bg-[#4a90e2] text-white shadow-lg'
                  : 'text-gray-300 hover:bg-[#1a1f3a] hover:text-white'
              }`
            }
          >
            <Icon className="w-5 h-5" />
            <span className="font-medium">{label}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};