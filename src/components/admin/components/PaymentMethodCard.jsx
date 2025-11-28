import React from 'react';
import PaymentMethodItem from './PaymentMethodItem';

// Add onSettingsClick to the props destructuring
const PaymentMethodCard = ({ title, methods, onSettingsClick }) => {
  return (
    <div className='flex-1 rounded-lg border border-gray-200 flex flex-col'>
      <div className='self-stretch px-6 py-3.5 border-b border-gray-200'>
        <div className="text-gray-900 text-xl font-medium font-['Poppins'] leading-loose">
          {title}
        </div>
      </div>
      <div className='self-stretch flex flex-col justify-center items-start'>
        {methods.map((method, index) => (
          <PaymentMethodItem
            key={method.id || index} 
            method={method}
            onSettingsClick={onSettingsClick}
          />
        ))}
      </div>
    </div>
  );
};

export default PaymentMethodCard;
