import React from 'react';
import { useState } from 'react';
import { Calculator, Activity, Zap, Apple, Droplets, Moon, Dumbbell } from 'lucide-react';
import { BMRCalculator } from '../components/Calculators/BMRCalculator';
import { TDEECalculator } from '../components/Calculators/TDEECalculator';
import { MacroCalculator } from '../components/Calculators/MacroCalculator';
import { HydrationCalculator } from '../components/Calculators/HydrationCalculator';
import { OneRepMaxCalculator } from '../components/Calculators/OneRepMaxCalculator';

export const CalculatorsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('bmr');

  const calculators = [
    { id: 'bmr', name: 'BMR', icon: Activity, description: 'Basal Metabolic Rate' },
    { id: 'tdee', name: 'TDEE', icon: Zap, description: 'Total Daily Energy' },
    { id: 'macros', name: 'Macros', icon: Apple, description: 'Protein/Carbs/Fat' },
    { id: 'hydration', name: 'Hydration', icon: Droplets, description: 'Water Intake' },
    { id: 'onerepmax', name: '1RM', icon: Dumbbell, description: 'One Rep Max' }
  ];

  const renderCalculator = () => {
    switch (activeTab) {
      case 'bmr':
        return <BMRCalculator />;
      case 'tdee':
        return <TDEECalculator />;
      case 'macros':
        return <MacroCalculator />;
      case 'hydration':
        return <HydrationCalculator />;
      case 'onerepmax':
        return <OneRepMaxCalculator />;
      default:
        return <BMRCalculator />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-white">Calculators</h1>
        <Calculator className="w-8 h-8 text-[#ffd700]" />
      </div>
      
      {/* Calculator Tabs */}
      <div className="bg-[#1a1f3a] rounded-lg p-1 border border-[#4a90e2]/20">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-1">
          {calculators.map((calc) => (
            <button
              key={calc.id}
              onClick={() => setActiveTab(calc.id)}
              className={`flex flex-col items-center justify-center p-3 rounded-lg transition-all duration-200 ${
                activeTab === calc.id
                  ? 'bg-[#4a90e2] text-white shadow-lg'
                  : 'text-gray-400 hover:text-white hover:bg-[#4a90e2]/20'
              }`}
            >
              <calc.icon className="w-6 h-6 mb-1" />
              <span className="font-medium text-sm">{calc.name}</span>
              <span className="text-xs opacity-75">{calc.description}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Calculator Content */}
      <div className="bg-[#1a1f3a] rounded-lg p-6 border border-[#4a90e2]/20">
        {renderCalculator()}
      </div>
    </div>
  );
};