import React from 'react';
import { useTranslation } from 'react-i18next';
import { HiX } from 'react-icons/hi';

const UserDetailsModal = ({ isOpen, onClose, user, onApprove, onReject }) => {
  const { t } = useTranslation();

  if (!isOpen || !user) {
    return null;
  }

  const handleApproveClick = () => {
    onApprove(user.id);
    onClose();
  };

  const handleRejectClick = () => {
    onReject(user.id);
    onClose();
  };

  return (
    <div
      className='fixed inset-0 bg-black/70 bg-opacity-70 flex justify-center items-center z-50 p-3 sm:p-4'
      onClick={onClose}
    >
      <div
        className='bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto p-4 sm:p-6 md:p-8 lg:p-12 relative'
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className='absolute top-3 right-3 sm:top-4 sm:right-4 w-8 h-8 sm:w-10 sm:h-10 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300 transition'
          aria-label='Close'
        >
          <HiX className='w-5 h-5 sm:w-6 sm:h-6 text-gray-800' />
        </button>

        <div className='flex flex-col md:flex-row items-center gap-4 sm:gap-6 mb-6 sm:mb-8 mt-8 sm:mt-0'>
          <img
            className='w-24 h-24 sm:w-32 sm:h-32 md:w-36 md:h-36 rounded-full object-cover border-4 border-gray-100'
            src={user.avatarUrl}
            alt={user.name}
          />
          <div className='text-center md:text-left'>
            <h2 className='text-xl sm:text-2xl font-semibold text-gray-900 leading-tight sm:leading-9'>
              {user.name}
            </h2>
            <p className='text-sm sm:text-base text-gray-700 mt-2'>
              {user.phone}
            </p>
            <p className='text-sm sm:text-base text-gray-700'>{user.email}</p>
            <p className='text-sm sm:text-base text-gray-700 break-words'>
              {user.fullAddress}
            </p>
          </div>
        </div>

        <div>
          <h3 className='text-lg sm:text-xl font-semibold text-gray-900 leading-tight sm:leading-9 mb-4 sm:mb-6'>
            {t('dashboard.admin.userManagement.modal.aboutTitle')}
          </h3>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-x-8 sm:gap-x-12 gap-y-3 sm:gap-y-4'>
            <div className='text-sm sm:text-base text-gray-500'>
              {t('dashboard.admin.userManagement.modal.fullName')}
            </div>
            <div className='text-sm sm:text-base font-medium text-gray-900 break-words'>
              {user.name}
            </div>
            <div className='text-sm sm:text-base text-gray-500'>
              {t('dashboard.admin.userManagement.modal.phoneNumber')}
            </div>
            <div className='text-sm sm:text-base font-medium text-gray-900'>
              {user.phone}
            </div>
            <div className='text-sm sm:text-base text-gray-500'>
              {t('dashboard.admin.userManagement.modal.email')}
            </div>
            <div className='text-sm sm:text-base font-medium text-gray-900 break-words'>
              {user.email}
            </div>
            <div className='text-sm sm:text-base text-gray-500'>
              {t('dashboard.admin.userManagement.modal.latLong')}
            </div>
            <div className='text-sm sm:text-base font-medium text-gray-900 break-words'>
              {user.latitudeLongitude}
            </div>
            <div className='text-sm sm:text-base text-gray-500'>
              {t('dashboard.admin.userManagement.modal.industry')}
            </div>
            <div className='text-sm sm:text-base font-medium text-gray-900 break-words'>
              {user.industry}
            </div>
          </div>
        </div>

        <p className='mt-6 sm:mt-8 text-sm sm:text-base text-gray-700 leading-relaxed'>
          {user.description}
        </p>

        {/* Conditional Buttons for Pending Status */}
        {user.status === 'pending' && (
          <div className='mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-gray-200 flex flex-col-reverse sm:flex-row justify-end gap-3 sm:gap-4'>
            <button
              onClick={handleRejectClick}
              className='w-full sm:w-auto px-4 sm:px-6 py-2 sm:py-2.5 bg-white text-gray-700 font-semibold border border-gray-300 rounded-lg hover:bg-gray-50 transition text-sm sm:text-base'
            >
              {t('dashboard.admin.userManagement.modal.cancelButton')}
            </button>
            <button
              onClick={handleApproveClick}
              className='w-full sm:w-auto px-4 sm:px-6 py-2 sm:py-2.5 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition text-sm sm:text-base'
            >
              {t('dashboard.admin.userManagement.modal.approveButton')}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserDetailsModal;
