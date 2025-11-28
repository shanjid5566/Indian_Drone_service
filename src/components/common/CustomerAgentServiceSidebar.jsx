import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';
import { HiMenuAlt2, HiX } from 'react-icons/hi';
import { PiUsersThreeBold } from 'react-icons/pi';
import { FiShoppingCart } from 'react-icons/fi';
import { FaRegCreditCard } from 'react-icons/fa';
import { LuHeadset, LuMessageCircle } from 'react-icons/lu';
import { BiGridAlt } from 'react-icons/bi';
import SmoothScroll from '../utility/SmoothScroll';

const CustomerAgentServiceSidebar = ({ sidebarOpen, setSidebarOpen }) => {
  const { t } = useTranslation();

  const menuItems = [
    {
      id: 'dashboard',
      label: t('sidebar.employee.dashboard'),
      icon: BiGridAlt,
      path: '',
    },
    {
      id: 'customer',
      label: t('sidebar.employee.customer'),
      icon: PiUsersThreeBold,
      path: 'customers',
    },
    {
      id: 'orders',
      label: t('sidebar.employee.orders'),
      icon: FiShoppingCart,
      path: 'orders',
    },
    {
      id: 'payments',
      label: t('sidebar.employee.payments'),
      icon: FaRegCreditCard,
      path: 'payments',
    },
    {
      id: 'support',
      label: t('sidebar.employee.support'),
      icon: LuHeadset,
      path: 'supports',
    },
    {
      id: 'message',
      label: 'Message',
      icon: LuMessageCircle,
      path: 'messages',
    },
  ];

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
        className={`bg-[#F5F7FA] shadow-lg transform ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0 transition-transform duration-300 ease-in-out fixed lg:static inset-y-0 xl:pt-2 left-0 z-50 w-[304px] xl:pl-9 overflow-y-auto pt-10`}
      >
        <div className='flex flex-col h-full'>
          {/* Close Button for Mobile */}
          <div className='lg:hidden right-3'>
            <button
              onClick={() => setSidebarOpen(false)}
              className='absolute top-4 right-3 rounded-full lg:hidden'
            >
              <HiX className='w-7 h-7 text-gray-700' />
            </button>
          </div>

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
                  to={item.path}
                  end={item.path === ''}
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

export default CustomerAgentServiceSidebar;
