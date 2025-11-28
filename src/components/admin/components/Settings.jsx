import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { IoArrowBack } from 'react-icons/io5';
import PaymentMethodCard from './PaymentMethodCard';
import AddPaymentMethodModal from '../../common/AddPaymentMethodModal';
import PaymentMethodConfigModal from '../../common/PaymentMethodConfigModal'; 
import { Header } from '../../common/Header';

const Settings = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isConfigModalOpen, setIsConfigModalOpen] = useState(false); 
  const [selectedMethod, setSelectedMethod] = useState(null); 

  const paymentMethods = {
    indianSystems1: [
      {
        id: 'upi',
        name: 'UPI Gateway',
        status: 'UPI Gateway',
        statusColor: 'text-gray-900',
      },
      {
        id: 'bbps',
        name: 'BBPS',
        status: t('dashboard.admin.settings.status.testing'),
        statusColor: 'text-gray-400',
      },
      {
        id: 'aeps',
        name: 'AePS',
        status: 'UPI Gateway',
        statusColor: 'text-gray-900',
      },
      {
        id: 'rupay',
        name: 'RuPAY',
        status: t('dashboard.admin.settings.status.active'),
        statusColor: 'text-green-500',
      },
      {
        id: 'imps',
        name: 'IMPS',
        status: t('dashboard.admin.settings.status.active'),
        statusColor: 'text-green-500',
      },
    ],
    international: [
      {
        id: 'paypal',
        name: 'PayPal',
        status: t('dashboard.admin.settings.status.active'),
        statusColor: 'text-green-500',
      },
      {
        id: 'stripe',
        name: 'Stripe',
        status: t('dashboard.admin.settings.status.active'),
        statusColor: 'text-green-500',
      },
    ],
    indianSystems2: [
      {
        id: 'razorpay',
        name: 'Razorpay',
        status: t('dashboard.admin.settings.status.active'),
        statusColor: 'text-green-500',
      },
      {
        id: 'payu',
        name: 'PayU',
        status: t('dashboard.admin.settings.status.active'),
        statusColor: 'text-green-500',
      },
    ],
    walletServices: [
      {
        id: 'paytm',
        name: 'Paytm',
        status: t('dashboard.admin.settings.status.active'),
        statusColor: 'text-green-500',
      },
      {
        id: 'phonepe',
        name: 'PhonePe',
        status: t('dashboard.admin.settings.status.active'),
        statusColor: 'text-green-500',
      },
      {
        id: 'gpay',
        name: 'Google Pay',
        status: t('dashboard.admin.settings.status.active'),
        statusColor: 'text-green-500',
      },
    ],
  };

  // Handler to open the config modal
  const handleOpenConfigModal = (method) => {
    setSelectedMethod(method);
    setIsConfigModalOpen(true);
  };

  // Handler to close the config modal
  const handleCloseConfigModal = () => {
    setIsConfigModalOpen(false);
    setSelectedMethod(null); 
  };

  return (
    <>
      <Header />
      <div className='w-full min-h-screen bg-[#FAFFFD] p-6 md:p-10 lg:p-12'>
        <div className='max-w-7xl mx-auto'>
          {/* Back Button */}
          <div className='mb-8'>
            <button
              onClick={() => navigate(-1)}
              className='flex items-center gap-3 text-gray-800 hover:text-black cursor-pointer'
            >
              <IoArrowBack className='w-6 h-6' />
            </button>
          </div>

          {/* Main Content */}
          <div className='flex flex-col justify-start items-start gap-10'>
            {/* Header Section */}
            <div className='self-stretch flex flex-col md:flex-row justify-between items-start md:items-center gap-4'>
              <div className='flex-1'>
                <h1 className="text-gray-900 text-2xl font-semibold font-['Poppins'] leading-9">
                  {t('dashboard.admin.settings.title')}
                </h1>
                <p className="text-gray-500 text-base font-normal font-['Lato'] leading-normal mt-1">
                  {t('dashboard.admin.settings.subtitle')}
                </p>
              </div>
              <button
                onClick={() => setIsAddModalOpen(true)}
                className="px-6 py-3 cursor-pointer bg-green-600 rounded text-white text-base font-medium font-['Poppins'] leading-normal hover:bg-green-700 transition"
              >
                {t('dashboard.admin.settings.addPaymentButton')}
              </button>
            </div>

            {/* Cards Grid - Pass the handler down */}
            <div className='w-full grid grid-cols-1 md:grid-cols-2 gap-6'>
              <PaymentMethodCard
                title={t('dashboard.admin.settings.indianSystems')}
                methods={paymentMethods.indianSystems1}
                onSettingsClick={handleOpenConfigModal} 
              />
              <PaymentMethodCard
                title={t('dashboard.admin.settings.international')}
                methods={paymentMethods.international}
                onSettingsClick={handleOpenConfigModal} 
              />
              <PaymentMethodCard
                title={t('dashboard.admin.settings.indianSystems')}
                methods={paymentMethods.indianSystems2}
                onSettingsClick={handleOpenConfigModal} 
              />
              <PaymentMethodCard
                title={t('dashboard.admin.settings.walletServices')}
                methods={paymentMethods.walletServices}
                onSettingsClick={handleOpenConfigModal} 
              />
            </div>
          </div>
        </div>
      </div>

      {/* Add Payment Method Modal */}
      <AddPaymentMethodModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
      />

      {/* Configure Payment Method Modal */}
      <PaymentMethodConfigModal
        isOpen={isConfigModalOpen}
        onClose={handleCloseConfigModal}
        method={selectedMethod} // Pass selected method data
      />
    </>
  );
};

export default Settings;
