import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { HiX } from 'react-icons/hi';

const AddPaymentMethodModal = ({ isOpen, onClose }) => {
  const { t } = useTranslation(); // Initialize the translation function
  const [apiKey, setApiKey] = useState('');
  const [url, setUrl] = useState('');

  if (!isOpen) {
    return null;
  }

  const handleSave = () => {
    console.log({ apiKey, url });
    onClose(); // Close modal after saving
  };

  return (
    // Backdrop
    <div
      className='fixed inset-0 bg-black/70 bg-opacity-70 flex justify-center items-center z-50 p-4'
      onClick={onClose}
    >
      {/* Modal Content */}
      <div
        className='relative bg-white rounded-lg w-full max-w-2xl overflow-hidden p-10'
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className='flex justify-between items-center pb-6 border-b border-gray-200'>
          <h2 className="text-gray-900 text-2xl font-semibold font-['Poppins'] leading-9">
            {/* Use t() for the title */}
            {t('dashboard.admin.settings.modal.title')}
          </h2>
          <button
            onClick={onClose}
            className='p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition'
            aria-label='Close'
          >
            <HiX className='w-6 h-6 text-gray-800' />
          </button>
        </div>

        {/* Form Fields */}
        <div className='py-8 space-y-6'>
          <div className='flex flex-col gap-2'>
            <label className="text-gray-900 text-base font-medium font-['Poppins'] leading-normal">
              {/* Use t() for the API Key label */}
              {t('dashboard.admin.settings.modal.apiKeyLabel')}
            </label>
            <input
              type='password'
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              // Use t() for the API Key placeholder
              placeholder={t(
                'dashboard.admin.settings.modal.apiKeyPlaceholder'
              )}
              className="self-stretch px-4 py-3 rounded border border-gray-200 text-sm font-['Lato']"
            />
          </div>
          <div className='flex flex-col gap-2'>
            <label className="text-gray-900 text-base font-medium font-['Poppins'] leading-normal">
              {/* Use t() for the URL label */}
              {t('dashboard.admin.settings.modal.urlLabel')}
            </label>
            <input
              type='text'
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              // Use t() for the URL placeholder
              placeholder={t('dashboard.admin.settings.modal.urlPlaceholder')}
              className="self-stretch px-4 py-3 rounded border border-gray-200 text-sm font-['Lato']"
            />
          </div>
        </div>

        {/* Footer Button */}
        <div className='pt-6'>
          <button
            onClick={handleSave}
            className="w-full py-3 bg-green-600 rounded text-white text-base font-medium font-['Poppins'] leading-normal hover:bg-green-700 transition"
          >
            {/* Use t() for the Save button */}
            {t('dashboard.admin.settings.modal.saveButton')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddPaymentMethodModal;
