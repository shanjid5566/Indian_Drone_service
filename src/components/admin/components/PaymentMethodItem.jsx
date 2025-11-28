import React from 'react';
import { IoSettingsOutline } from 'react-icons/io5';

// Added onSettingsClick prop
const PaymentMethodItem = ({ method, onSettingsClick }) => {
  return (
    <div className='self-stretch px-6 py-3 flex justify-between items-center'>
      <div className='flex flex-col justify-center items-start gap-2'>
        <div className="text-gray-900 text-base font-medium font-['Poppins'] leading-normal">
          {method.name}
        </div>
        <div
          className={`text-xs font-normal font-['Lato'] leading-none ${method.statusColor}`}
        >
          {method.status}
        </div>
      </div>
      {/* Added onClick handler */}
      <button
        onClick={() => onSettingsClick(method)} 
        className='w-6 h-6 relative flex items-center justify-center text-gray-400 hover:text-gray-600 cursor-pointer' // Added cursor-pointer
        aria-label={`Configure ${method.name}`}
      >
        <IoSettingsOutline className='w-5 h-5' />
      </button>
    </div>
  );
};

export default PaymentMethodItem;
