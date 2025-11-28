import React, { useState, useRef, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Header } from '../common/Header';
import Sidebar from './SideBar';


export const MarketingDashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const mainRef = useRef(null);

  useEffect(() => {
    if (mainRef.current) {
      if (typeof mainRef.current.scrollTo === 'function') {
        mainRef.current.scrollTo({ top: 0, left: 0, behavior: 'auto' });
      } else {
        mainRef.current.scrollTop = 0;
      }
    }
  }, [location.pathname]);

  return (
    <div className='flex h-screen bg-gray-50'>
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className='flex-1 flex flex-col overflow-hidden'>
        <Header />
        <main ref={mainRef} className='flex-1 overflow-x-hidden overflow-y-auto'>
          <div className=''>
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};
