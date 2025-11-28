import React from 'react';
import { useTranslation } from 'react-i18next';
import { HiX } from 'react-icons/hi';

const CustomerDetailsModal = ({
  isOpen,
  onClose,
  customer,
  onSuspend,
  onActivate,
}) => {
  const { t } = useTranslation();

  if (!isOpen || !customer) return null;

  const handleAction = () => {
    if (customer.status === 'active') {
      onSuspend(customer.id);
    } else {
      onActivate(customer.id);
    }
    onClose();
  };

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4'>
      {/* Backdrop */}
      <div
        className='absolute inset-0 bg-black/70 bg-opacity-50'
        onClick={onClose}
      />

      {/* Modal */}
      <div className='relative bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto'>
        {/* Header */}
        <div className='sticky top-0 bg-white border-b border-gray-200 px-4 sm:px-6 py-3 sm:py-4 flex justify-between items-center'>
          <h2 className='text-lg sm:text-xl font-semibold font-["Poppins"] text-[#1A1A1A]'>
            {t('dashboard.admin.customerManagement.modal.title')}
          </h2>
          <button
            onClick={onClose}
            className='text-gray-400 hover:text-gray-600 transition-colors'
          >
            <HiX className='w-5 h-5 sm:w-6 sm:h-6' />
          </button>
        </div>

        {/* Body */}
        <div className='px-4 sm:px-6 py-4 sm:py-6'>
          <div className='space-y-6'>
            {/* Customer Info */}
            <div className='flex items-start gap-4'>
              <img
                src={
                  customer.avatarUrl ||
                  'https://randomuser.me/api/portraits/lego/1.jpg'
                }
                alt={customer.name}
                className='w-20 h-20 rounded-full object-cover'
              />
              <div className='flex-1'>
                <h3 className='text-xl font-semibold font-["Poppins"] text-[#1A1A1A]'>
                  {customer.name}
                </h3>
                <div className='mt-2'>
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                      customer.status === 'active'
                        ? 'bg-[#F7FEE7] text-[#4D7C0F]'
                        : 'bg-[#FEF2F2] text-[#DC2626]'
                    }`}
                  >
                    {customer.status === 'active'
                      ? t('dashboard.admin.customerManagement.status.active')
                      : t(
                          'dashboard.admin.customerManagement.status.suspended'
                        )}
                  </span>
                </div>
              </div>
            </div>

            {/* Details Grid */}
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
              <div>
                <label className='text-sm font-medium text-[#737373] font-["Lato"]'>
                  {t('dashboard.admin.customerManagement.modal.email')}
                </label>
                <p className='mt-1 text-base text-[#1A1A1A] font-["Lato"]'>
                  {customer.email}
                </p>
              </div>

              <div>
                <label className='text-sm font-medium text-[#737373] font-["Lato"]'>
                  {t('dashboard.admin.customerManagement.modal.phone')}
                </label>
                <p className='mt-1 text-base text-[#1A1A1A] font-["Lato"]'>
                  {customer.phone}
                </p>
              </div>

              <div className='md:col-span-2'>
                <label className='text-sm font-medium text-[#737373] font-["Lato"]'>
                  {t('dashboard.admin.customerManagement.modal.address')}
                </label>
                <p className='mt-1 text-base text-[#1A1A1A] font-["Lato"]'>
                  {customer.address}
                </p>
              </div>

              <div>
                <label className='text-sm font-medium text-[#737373] font-["Lato"]'>
                  {t('dashboard.admin.customerManagement.modal.totalOrders')}
                </label>
                <p className='mt-1 text-base text-[#1A1A1A] font-["Lato"] font-semibold'>
                  {customer.totalOrders}
                </p>
              </div>

              <div>
                <label className='text-sm font-medium text-[#737373] font-["Lato"]'>
                  {t(
                    'dashboard.admin.customerManagement.modal.registrationDate'
                  )}
                </label>
                <p className='mt-1 text-base text-[#1A1A1A] font-["Lato"]'>
                  {new Date(customer.registrationDate).toLocaleDateString()}
                </p>
              </div>

              <div>
                <label className='text-sm font-medium text-[#737373] font-["Lato"]'>
                  {t('dashboard.admin.customerManagement.modal.lastActive')}
                </label>
                <p className='mt-1 text-base text-[#1A1A1A] font-["Lato"]'>
                  {new Date(customer.lastActive).toLocaleString()}
                </p>
              </div>

              <div>
                <label className='text-sm font-medium text-[#737373] font-["Lato"]'>
                  {t('dashboard.admin.customerManagement.modal.customerId')}
                </label>
                <p className='mt-1 text-base text-[#1A1A1A] font-mono'>
                  {customer.id}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className='sticky bottom-0 bg-gray-50 border-t border-gray-200 px-4 sm:px-6 py-3 sm:py-4 flex flex-col-reverse sm:flex-row justify-end gap-2 sm:gap-3'>
          <button
            onClick={onClose}
            className='w-full sm:w-auto px-4 sm:px-6 py-2 sm:py-2.5 rounded-lg border border-gray-300 text-[#1A1A1A] text-sm font-medium font-["Poppins"] hover:bg-gray-100 transition-colors'
          >
            {t('dashboard.admin.customerManagement.modal.close')}
          </button>
          <button
            onClick={handleAction}
            className={`w-full sm:w-auto px-4 sm:px-6 py-2 sm:py-2.5 rounded-lg text-white text-sm font-medium font-["Poppins"] transition-colors ${
              customer.status === 'active'
                ? 'bg-[#DC2626] hover:bg-[#B91C1C]'
                : 'bg-[#84CC16] hover:bg-[#65A30D]'
            }`}
          >
            {customer.status === 'active'
              ? t('dashboard.admin.customerManagement.modal.suspend')
              : t('dashboard.admin.customerManagement.modal.activate')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CustomerDetailsModal;
