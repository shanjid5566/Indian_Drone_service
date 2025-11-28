import React from 'react';
import {
  HiOutlineUsers,
  HiOutlineBriefcase,
  HiOutlineCurrencyDollar,
  HiOutlineExclamation,
  HiTicket,
} from 'react-icons/hi';

// Consolidated configuration object for icons and their styles
const iconConfig = {
  users: {
    Icon: HiOutlineUsers,
    bgColor: 'bg-blue-100',
    iconColor: 'text-blue-600',
  },
  briefcase: {
    Icon: HiOutlineBriefcase,
    bgColor: 'bg-green-100',
    iconColor: 'text-green-600',
  },
  dollar: {
    Icon: HiOutlineCurrencyDollar,
    bgColor: 'bg-emerald-100',
    iconColor: 'text-emerald-600',
  },
  warning: {
    Icon: HiOutlineExclamation,
    bgColor: 'bg-red-100',
    iconColor: 'text-red-600',
  },
  ticket: {
    Icon: HiTicket,
    bgColor: 'bg-red-100',
    iconColor: 'text-red-600',
  },
  default: {
    Icon: HiOutlineUsers,
    bgColor: 'bg-gray-100',
    iconColor: 'text-gray-600',
  },
};

const StatsCard = ({ stat, onClick }) => {
  // Destructure styles and the Icon component from the config object
  const { Icon, bgColor, iconColor } =
    iconConfig[stat.icon] || iconConfig.default;

  const isTicket = stat.icon === 'ticket';

  return (
    <div
      className={`bg-white p-6 rounded-xl shadow-sm transition-all duration-200 ${
        onClick
          ? 'cursor-pointer hover:shadow-lg hover:scale-[1.02]'
          : 'hover:shadow-md'
      }`}
      onClick={onClick}
    >
      <div className='flex items-center justify-between'>
        <div className='flex-1'>
          <p
            className={`text-sm font-medium mb-1 ${
              isTicket ? 'text-red-600' : 'text-gray-600'
            }`}
          >
            {stat.label}
          </p>
          <p
            className={`text-2xl font-bold mb-2 ${
              isTicket ? 'text-red-600' : 'text-gray-900'
            }`}
          >
            {stat.value}
          </p>
          {stat.change && (
            <p
              className={`text-sm flex items-center ${
                stat.changeType === 'positive'
                  ? 'text-green-600'
                  : 'text-red-600'
              }`}
            >
              <span
                className={`inline-block w-2 h-2 rounded-full mr-2 ${
                  stat.changeType === 'positive' ? 'bg-green-500' : 'bg-red-500'
                }`}
              ></span>
              {stat.change}
            </p>
          )}
        </div>
        <div className={`p-3 rounded-lg ${bgColor}`}>
          <Icon className={`w-6 h-6 ${iconColor}`} />
        </div>
      </div>
    </div>
  );
};

export default StatsCard;
