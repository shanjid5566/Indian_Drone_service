import React from 'react';
import { useTranslation } from 'react-i18next';
import { NavLink, useLocation } from 'react-router-dom';
import { HiMenuAlt2, HiX } from 'react-icons/hi';
import {
  LayoutDashboard,
  Users,
  Briefcase,
  CreditCard,
  BarChart3,
  AlertTriangle,
  Settings,
} from 'lucide-react';
import SmoothScroll from '../utility/SmoothScroll';

const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {
  const { t } = useTranslation();
  const location = useLocation();

  const menuItems = [
    {
      id: 'dashboard',
      label: t('navigation.dashboard'),
      icon: LayoutDashboard,
      path: '', // This will be the index route
    },
    {
      id: 'users',
      label: t('sidebar.admin.userManagement'),
      icon: Users,
      path: 'users',
    },
    {
      id: 'jobs',
      label: t('sidebar.admin.jobs'),
      icon: Briefcase,
      path: 'jobs',
    },
    {
      id: 'payments',
      label: t('sidebar.admin.paymentsManagement'),
      icon: CreditCard,
      path: 'payments',
    },
    {
      id: 'reports',
      label: t('sidebar.admin.reports'),
      icon: BarChart3,
      path: 'reports',
    },
    {
      id: 'complaints',
      label: t('sidebar.admin.complaints'),
      icon: AlertTriangle,
      path: 'complaints',
      isRed: true, // Special red styling for complaints
    },
    {
      id: 'services',
      label: t('sidebar.admin.services'),
      icon: Settings,
      path: 'services',
    },
  ];

  return (
    <>
      {/* Mobile Menu Button */}
      {!sidebarOpen && (
        <div className='lg:hidden fixed top-4 left-4 z-50'>
          <div className='lg:hidden fixed top-4 left-4 z-50'>
            <button
              onClick={() => setSidebarOpen(true)}
              className=' p-3  hover:bg-gray-50 transition-all duration-200 '
            >
              <HiMenuAlt2 className='w-8 h-7 text-gray-700' />
            </button>
          </div>
        </div>
      )}

      {/* Sidebar */}
      <div
        className={`bg-[#F5F7FA] shadow-lg transform ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0 transition-transform duration-300 ease-in-out fixed lg:static inset-y-0 xl:pt-3 left-0 z-50 w-[304px] pt-10 lg:pt-0 xl:pl-9 overflow-y-auto`}
      >
        <div className='flex flex-col h-full'>
          {/* manual close btn */}
          <button
            onClick={() => setSidebarOpen(false)}
            className='absolute top-4 right-3 rounded-full lg:hidden'
          >
            <HiX className='w-7 h-7 text-gray-700' />
          </button>
          {/* Menu Items */}
          <SmoothScroll
            root={false}
            className='flex-1 px-3 py-4 overflow-y-auto'
          >
            {menuItems.map((item) => {
              const Icon = item.icon;
              // Check if current path matches this menu item or its sub-routes
              const isActiveRoute =
                (item.path === '' && location.pathname === '/admin') ||
                (item.path !== '' &&
                  location.pathname.includes(`/admin/${item.path}`));

              return (
                <NavLink
                  key={item.id}
                  to={item.path}
                  end={item.path === ''}
                  className={() =>
                    `w-full flex items-center gap-3 px-4 py-3 text-left rounded-lg mb-1 border-l-4 transition-all duration-300 ${
                      isActiveRoute
                        ? 'bg-white border-green-600 font-semibold shadow-sm'
                        : 'border-transparent text-black hover:bg-gray-50'
                    }`
                  }
                  onClick={() => setSidebarOpen(false)}
                >
                  <Icon
                    className={`w-5 h-5 ${item.isRed ? 'text-red-600' : ''}`}
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

export default Sidebar;
