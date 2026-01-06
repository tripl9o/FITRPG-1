import React from 'react';
import { Outlet } from 'react-router-dom';
import { Navbar } from '../Navigation/Navbar';
import { SideNavigation } from '../Navigation/SideNavigation';
import { BottomNavigation } from '../Navigation/BottomNavigation';

export const Layout: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#0a0e27] text-white flex flex-col">
      {/* Top Navbar */}
      <Navbar />
      
      {/* Main Content Area */}
      <div className="flex-1 flex">
        {/* Side Navigation - Desktop */}
        <SideNavigation />
        
        {/* Page Content */}
        <main className="flex-1 p-4 lg:p-6 pb-20 lg:pb-6 overflow-y-auto">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
      
      {/* Bottom Navigation - Mobile */}
      <BottomNavigation />
    </div>
  );
};