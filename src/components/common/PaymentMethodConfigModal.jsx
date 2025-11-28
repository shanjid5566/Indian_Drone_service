import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { HiX, HiChevronDown } from 'react-icons/hi';

const PaymentMethodConfigModal = ({ isOpen, onClose, method }) => {
  const { t } = useTranslation();
  // Initialize state with passed method data or defaults
  const [apiKey, setApiKey] = useState('');
  const [status, setStatus] = useState('Active'); // Default to Active
  const [webhookUrl, setWebhookUrl] = useState('');

  // Update state when the method prop changes (when modal opens for a different method)
  useEffect(() => {
    if (method) {
      setApiKey('***********'); // Placeholder, actual key likely shouldn't be displayed
      setStatus(
        method.status === t('dashboard.admin.settings.status.testing')
          ? 'Testing'
          : 'Active'
      );
      setWebhookUrl('https://api.droneplatform.com/webhooks/payments'); // Example URL
    } else {
      // Reset when no method is selected (e.g., modal closes)
      setApiKey('');
      setStatus('Active');
      setWebhookUrl('');
    }
  }, [method, t]);

  if (!isOpen || !method) {
    return null;
  }

  const handleSave = () => {
    console.log('Saving Configuration for:', method.name, {
      apiKey,
      status,
      webhookUrl,
    });
    // Add actual save logic here (e.g., API call)
    onClose();
  };

  return (
    // Backdrop
    <div
      className='fixed inset-0 bg-black/70 bg-opacity-70 flex justify-center items-center z-50 p-4'
      onClick={onClose}
    >
      {/* Modal Content */}
      <div
        className='relative bg-white rounded-lg w-full max-w-xl overflow-hidden p-10'
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className='flex justify-between items-center pb-6 border-b border-gray-200 mb-8'>
          <h2 className="text-gray-900 text-2xl font-semibold font-['Poppins'] leading-9">
            {/* Dynamic title based on method name could be added later if needed */}
            {t('dashboard.admin.settings.configModal.title')} ({method.name})
          </h2>
          <button
            onClick={onClose}
            className='p-3 bg-gray-100 rounded-full hover:bg-gray-200 transition'
            aria-label='Close'
          >
            <HiX className='w-6 h-6 text-gray-800' />
          </button>
        </div>

        {/* Form Fields */}
        <div className='space-y-6'>
          {/* API Key */}
          <div className='flex flex-col gap-2'>
            <label className="text-gray-900 text-base font-medium font-['Poppins'] leading-normal">
              {t('dashboard.admin.settings.configModal.apiKeyLabel')}
            </label>
            <input
              type='password'
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              className="self-stretch px-4 py-3 rounded border border-gray-200 text-sm font-['Lato']"
            />
          </div>

          {/* Status Dropdown */}
          <div className='flex flex-col gap-2'>
            <label className="text-gray-900 text-base font-medium font-['Poppins'] leading-normal">
              {t('dashboard.admin.settings.configModal.statusLabel')}
            </label>
            <div className='relative'>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="appearance-none w-full px-4 py-3 rounded border border-gray-200 text-sm font-['Lato'] bg-white pr-8" // Added pr-8 for icon space
              >
                <option value='Active'>
                  {t('dashboard.admin.settings.status.active')}
                </option>
                <option value='Testing'>
                  {t('dashboard.admin.settings.status.testing')}
                </option>
              </select>
              <HiChevronDown className='absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none' />
            </div>
          </div>

          {/* Webhook URL */}
          <div className='flex flex-col gap-2'>
            <label className="text-gray-900 text-base font-medium font-['Poppins'] leading-normal">
              {t('dashboard.admin.settings.configModal.webhookUrlLabel')}
            </label>
            <input
              type='text'
              value={webhookUrl}
              onChange={(e) => setWebhookUrl(e.target.value)}
              className="self-stretch px-4 py-3 rounded border border-gray-200 text-sm font-['Lato']"
            />
          </div>
        </div>

        {/* Footer Buttons */}
        <div className='mt-10 pt-6 space-y-4'>
          <button
            onClick={handleSave}
            className="w-full py-3 bg-green-600 rounded text-white text-base font-medium font-['Poppins'] leading-normal hover:bg-green-700 transition cursor-pointer"
          >
            {t('dashboard.admin.settings.configModal.saveButton')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentMethodConfigModal;
