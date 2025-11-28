import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import { Header } from './Header';
import { useAuth } from '../../hooks/useAuth';
import MarketingSidebar from './MarketingSidebar';
import CustomerAgentServiceSidebar from './CustomerAgentServiceSidebar';
import SmoothScroll from '../utility/SmoothScroll';

export const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user } = useAuth();

  return (
    <div className='flex flex-col h-screen '>
      <Header /> {/* Navbar at the top */}
      <div className='flex flex-1 overflow-hidden'>
        {user?.role === 'admin' && (
          <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        )}
        {user?.role === 'marketing' && (
          <MarketingSidebar
            sidebarOpen={sidebarOpen}
            setSidebarOpen={setSidebarOpen}
          />
        )}
        {user?.role === 'employee' && (
          <CustomerAgentServiceSidebar
            sidebarOpen={sidebarOpen}
            setSidebarOpen={setSidebarOpen}
          />
        )}

        {/* {user?.role === 'field_agent' && (
      <FieldSidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
    )} */}
        <SmoothScroll
          root={false}
          className='flex-1 overflow-x-hidden overflow-y-auto bg-[#fafffd]'
        >
          <div className='w-full '>
            <Outlet />
          </div>
        </SmoothScroll>
      </div>
    </div>
  );
};
