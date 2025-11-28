import React from 'react';
import { useTranslation } from 'react-i18next';
import { HiX } from 'react-icons/hi';

const FieldAgentDetailsModal = ({
  isOpen,
  onClose,
  fieldAgent,
  onSuspend,
  onActivate,
}) => {
  const { t } = useTranslation();

  if (!isOpen || !fieldAgent) return null;

  const handleAction = () => {
    if (fieldAgent.status === 'Active') {
      onSuspend(fieldAgent.id);
    } else {
      onActivate(fieldAgent.id);
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
            {t('dashboard.admin.fieldAgentManagement.modal.title')}
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
            {/* Field Agent Info */}
            <div className='flex items-start gap-4'>
              <div className='w-20 h-20 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white text-2xl font-bold'>
                {fieldAgent.name
                  ?.split(' ')
                  .map((n) => n[0])
                  .join('')
                  .toUpperCase() || 'FA'}
              </div>
              <div className='flex-1'>
                <h3 className='text-xl font-semibold font-["Poppins"] text-[#1A1A1A]'>
                  {fieldAgent.name}
                </h3>
                <p className='text-sm text-gray-600 font-["Lato"] mt-1'>
                  {fieldAgent.area || 'N/A'}
                </p>
                <div className='mt-2'>
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                      fieldAgent.status === 'Active'
                        ? 'bg-[#F7FEE7] text-[#4D7C0F]'
                        : 'bg-[#FEF2F2] text-[#DC2626]'
                    }`}
                  >
                    {fieldAgent.status === 'Active'
                      ? t('dashboard.admin.fieldAgentManagement.status.active')
                      : t(
                          'dashboard.admin.fieldAgentManagement.status.suspended'
                        )}
                  </span>
                </div>
              </div>
            </div>

            {/* Details Grid */}
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
              <div>
                <label className='text-sm font-medium text-[#737373] font-["Lato"]'>
                  {t('dashboard.admin.fieldAgentManagement.modal.email')}
                </label>
                <p className='mt-1 text-base text-[#1A1A1A] font-["Lato"]'>
                  {fieldAgent.email}
                </p>
              </div>

              <div>
                <label className='text-sm font-medium text-[#737373] font-["Lato"]'>
                  {t('dashboard.admin.fieldAgentManagement.modal.phone')}
                </label>
                <p className='mt-1 text-base text-[#1A1A1A] font-["Lato"]'>
                  {fieldAgent.phone}
                </p>
              </div>

              <div className='md:col-span-2'>
                <label className='text-sm font-medium text-[#737373] font-["Lato"]'>
                  {t('dashboard.admin.fieldAgentManagement.modal.address')}
                </label>
                <p className='mt-1 text-base text-[#1A1A1A] font-["Lato"]'>
                  {fieldAgent.address}
                </p>
              </div>

              <div>
                <label className='text-sm font-medium text-[#737373] font-["Lato"]'>
                  {t(
                    'dashboard.admin.fieldAgentManagement.modal.totalAddCustomer'
                  )}
                </label>
                <p className='mt-1 text-base font-["Lato"] font-bold text-blue-600'>
                  {fieldAgent.totalAddCustomer}
                </p>
              </div>

              <div>
                <label className='text-sm font-medium text-[#737373] font-["Lato"]'>
                  {t(
                    'dashboard.admin.fieldAgentManagement.modal.totalAddOperator'
                  )}
                </label>
                <p className='mt-1 text-base font-["Lato"] font-bold text-blue-600'>
                  {fieldAgent.totalAddOperator}
                </p>
              </div>

              <div>
                <label className='text-sm font-medium text-[#737373] font-["Lato"]'>
                  {t(
                    'dashboard.admin.fieldAgentManagement.modal.totalBookOrders'
                  )}
                </label>
                <p className='mt-1 text-base font-["Lato"] font-bold text-green-600'>
                  {fieldAgent.totalBookOrders}
                </p>
              </div>

              <div>
                <label className='text-sm font-medium text-[#737373] font-["Lato"]'>
                  {t('dashboard.admin.fieldAgentManagement.modal.area')}
                </label>
                <p className='mt-1 text-base text-[#1A1A1A] font-["Lato"]'>
                  {fieldAgent.area || 'N/A'}
                </p>
              </div>

              <div>
                <label className='text-sm font-medium text-[#737373] font-["Lato"]'>
                  {t(
                    'dashboard.admin.fieldAgentManagement.modal.vehicleNumber'
                  )}
                </label>
                <p className='mt-1 text-base text-[#1A1A1A] font-mono'>
                  {fieldAgent.vehicleNumber || 'N/A'}
                </p>
              </div>

              <div>
                <label className='text-sm font-medium text-[#737373] font-["Lato"]'>
                  {t('dashboard.admin.fieldAgentManagement.modal.joinDate')}
                </label>
                <p className='mt-1 text-base text-[#1A1A1A] font-["Lato"]'>
                  {new Date(fieldAgent.joinDate).toLocaleDateString()}
                </p>
              </div>

              <div>
                <label className='text-sm font-medium text-[#737373] font-["Lato"]'>
                  {t('dashboard.admin.fieldAgentManagement.modal.agentId')}
                </label>
                <p className='mt-1 text-base text-[#1A1A1A] font-mono'>
                  {fieldAgent.id}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className='sticky bottom-0 bg-gray-50 px-4 sm:px-6 py-3 sm:py-4 border-t border-gray-200 flex flex-col-reverse sm:flex-row justify-end gap-2 sm:gap-3'>
          <button
            onClick={onClose}
            className='w-full sm:w-auto px-4 sm:px-6 py-2 sm:py-2.5 rounded-lg font-medium text-[#1A1A1A] font-["Poppins"] border border-gray-300 hover:bg-gray-100 transition-colors text-sm sm:text-base'
          >
            {t('dashboard.admin.fieldAgentManagement.modal.close')}
          </button>
          <button
            onClick={handleAction}
            className={`w-full sm:w-auto px-4 sm:px-6 py-2 sm:py-2.5 rounded-lg font-medium font-["Poppins"] transition-colors text-sm sm:text-base ${
              fieldAgent.status === 'Active'
                ? 'bg-red-600 text-white hover:bg-red-700'
                : 'bg-green-600 text-white hover:bg-green-700'
            }`}
          >
            {fieldAgent.status === 'Active'
              ? t('dashboard.admin.fieldAgentManagement.modal.suspend')
              : t('dashboard.admin.fieldAgentManagement.modal.activate')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default FieldAgentDetailsModal;
