import React from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation, NavLink } from 'react-router-dom';
import { HiMenuAlt2, HiX } from 'react-icons/hi';
import { FiTarget } from 'react-icons/fi';

import { FiUsers } from 'react-icons/fi';
import { FaChartBar } from 'react-icons/fa6';
import { BiGridAlt } from 'react-icons/bi';
import SmoothScroll from '../utility/SmoothScroll';

const MarketingSidebar = ({ sidebarOpen, setSidebarOpen }) => {
  const { t } = useTranslation();
  const location = useLocation();

  const menuItems = [
    {
      id: 'dashboard',
      label: t('navigation.dashboard'),
      icon: BiGridAlt,
      path: '', // This will be the index route
    },
    {
      id: 'campaigns',
      label: t('sidebar.marketing.campaigns'),
      icon: FiTarget,
      path: 'campaigns',
    },
    {
      id: 'Lead_managment',
      label: t('sidebar.marketing.leadManagement'),
      icon: FiUsers,
      path: 'LeadManagment',
    },
    {
      id: 'analytics',
      label: t('sidebar.marketing.analytics'),
      icon: FaChartBar,
      path: 'analytics',
    },
  ];
  console.log(location);
  return (
    <>
      {/* Mobile Menu Button */}
      {!sidebarOpen && (
        <div className='lg:hidden fixed top-4 left-4 z-50'>
          <button
            onClick={() => setSidebarOpen(true)}
            className=' p-3  hover:bg-gray-50 transition-all duration-200 '
          >
            <HiMenuAlt2 className='w-8 h-7 text-gray-700' />
          </button>
        </div>
      )}

      {/* Sidebar */}
      <div
        className={`bg-[#EAEDF4] shadow-lg transform ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0 transition-transform duration-300 ease-in-out fixed lg:static inset-y-0 left-0 z-50 xl:pt-3 pt-10 lg:pt-0 w-[304px] xl:pl-9 overflow-y-auto`}
      >
        <div className='flex flex-col h-full'>
          {/* manual close btn */}
          <button
            onClick={() => setSidebarOpen(false)}
            className='absolute top-4 right-3 rounded-full lg:hidden'
          >
            <HiX className='w-5 h-5 text-gray-700' />
          </button>
          {/* Menu Items */}
          <SmoothScroll
            root={false}
            className='flex-1 px-3 py-4 overflow-y-auto'
          >
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.id}
                  to={item.path} // "" | "campaigns" | "LeadManagment" | "analytics"
                  end={item.path === ''} // শুধু index route-এ exact match
                  className={({ isActive }) =>
                    `w-full flex items-center gap-3 px-4 py-3 text-left rounded-lg mb-1 border-l-4 transition-all duration-300 ${
                      isActive
                        ? 'bg-white border-green-600 font-semibold shadow-sm'
                        : 'border-transparent text-black hover:bg-gray-50'
                    }`
                  }
                  onClick={() => setSidebarOpen(false)}
                >
                  <Icon
                    className={`w-5 h-5 ${/* isActive handled above */ ''}`}
                  />
                  <span>{item.label}</span>
                </NavLink>
              );
            })}
          </SmoothScroll>
        </div>
      </div>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className='fixed inset-0 z-30 bg-black/40 lg:hidden'
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </>
  );
};

export default MarketingSidebar;
