import React from 'react';
import { BarChart3 } from 'lucide-react';
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer, Legend } from 'recharts';

interface StatsRadarCardProps {
  currentStats: {
    mind: number;
    body: number;
    spiritual: number;
    combat: number;
    connection: number;
  };
  startingStats: {
    mind: number;
    body: number;
    spiritual: number;
    combat: number;
    connection: number;
  };
}

export const StatsRadarCard: React.FC<StatsRadarCardProps> = ({
  currentStats,
  startingStats,
}) => {
  const radarData = [
    { stat: 'Mind', current: currentStats.mind, starting: startingStats.mind },
    { stat: 'Body', current: currentStats.body, starting: startingStats.body },
    { stat: 'Spiritual', current: currentStats.spiritual, starting: startingStats.spiritual },
    { stat: 'Combat', current: currentStats.combat, starting: startingStats.combat },
    { stat: 'Connection', current: currentStats.connection, starting: startingStats.connection },
  ];

  const calculateGrowth = (current: number, starting: number) => {
    return Math.round(((current - starting) / starting) * 100);
  };

  return (
    <div className="bg-[#1a1f3a] rounded-xl p-6 border border-[#4a90e2]/20">
      <div className="flex items-center space-x-3 mb-6">
        <BarChart3 className="w-6 h-6 text-[#4a90e2]" />
        <h2 className="text-xl font-bold text-white">Stats Progression</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <h3 className="text-white font-medium mb-3">Current vs Starting Stats</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={radarData}>
                <PolarGrid stroke="#1a1f3a" />
                <PolarAngleAxis 
                  dataKey="stat" 
                  tick={{ fill: '#9ca3af', fontSize: 12 }}
                />
                <PolarRadiusAxis 
                  angle={90} 
                  domain={[0, 10]} 
                  tick={{ fill: '#9ca3af', fontSize: 10 }}
                />
                <Radar
                  name="Starting"
                  dataKey="starting"
                  stroke="#6b7280"
                  fill="#6b7280"
                  fillOpacity={0.2}
                  strokeWidth={2}
                />
                <Radar
                  name="Current"
                  dataKey="current"
                  stroke="#4a90e2"
                  fill="#4a90e2"
                  fillOpacity={0.3}
                  strokeWidth={2}
                />
                <Legend 
                  wrapperStyle={{ color: '#fff' }}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div>
          <h3 className="text-white font-medium mb-3">Stat Growth</h3>
          <div className="space-y-4">
            {radarData.map((stat) => {
              const growth = calculateGrowth(stat.current, stat.starting);
              return (
                <div key={stat.stat} className="bg-[#0a0e27] rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-white font-medium">{stat.stat}:</span>
                    <span className="text-green-400 font-semibold">+{growth}%</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-400">
                    <span>{stat.starting}</span>
                    <span>→</span>
                    <span className="text-[#4a90e2] font-semibold">{stat.current}</span>
                  </div>
                  <div className="w-full bg-[#1a1f3a] rounded-full h-2 mt-2">
                    <div
                      className="bg-gradient-to-r from-[#4a90e2] to-[#6a5acd] h-2 rounded-full transition-all duration-500"
                      style={{ width: `${(stat.current / 10) * 100}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};