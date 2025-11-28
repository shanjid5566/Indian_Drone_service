import React from 'react';
import { useTranslation } from 'react-i18next';
import { HiX } from 'react-icons/hi';

const EmployeeDetailsModal = ({
  isOpen,
  onClose,
  employee,
  onActivate,
  onDeactivate,
}) => {
  const { t } = useTranslation();

  if (!isOpen || !employee) return null;

  const handleAction = () => {
    if (employee.status === 'active') {
      onDeactivate(employee.id);
    } else {
      onActivate(employee.id);
    }
    onClose();
  };

  const formatSalary = (salary) => {
    if (!salary) return 'N/A';
    return `₹${salary.toLocaleString('en-IN')}`;
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
            {t('dashboard.admin.employeeManagement.modal.title')}
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
            {/* Employee Info */}
            <div className='flex items-start gap-4'>
              <div className='w-20 h-20 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center text-white text-2xl font-bold'>
                {employee.name
                  ?.split(' ')
                  .map((n) => n[0])
                  .join('')
                  .toUpperCase() || 'E'}
              </div>
              <div className='flex-1'>
                <h3 className='text-xl font-semibold font-["Poppins"] text-[#1A1A1A]'>
                  {employee.name}
                </h3>
                <p className='text-sm text-gray-600 font-["Lato"] mt-1'>
                  {employee.role} ({employee.roleCode})
                </p>
                <div className='mt-2'>
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                      employee.status === 'active'
                        ? 'bg-[#F7FEE7] text-[#4D7C0F]'
                        : 'bg-[#FEF2F2] text-[#DC2626]'
                    }`}
                  >
                    {employee.status === 'active'
                      ? t('dashboard.admin.employeeManagement.status.active')
                      : t('dashboard.admin.employeeManagement.status.inactive')}
                  </span>
                </div>
              </div>
            </div>

            {/* Details Grid */}
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
              <div>
                <label className='text-sm font-medium text-[#737373] font-["Lato"]'>
                  {t('dashboard.admin.employeeManagement.modal.email')}
                </label>
                <p className='mt-1 text-base text-[#1A1A1A] font-["Lato"]'>
                  {employee.email}
                </p>
              </div>

              <div>
                <label className='text-sm font-medium text-[#737373] font-["Lato"]'>
                  {t('dashboard.admin.employeeManagement.modal.phone')}
                </label>
                <p className='mt-1 text-base text-[#1A1A1A] font-["Lato"]'>
                  {employee.phone}
                </p>
              </div>

              <div className='md:col-span-2'>
                <label className='text-sm font-medium text-[#737373] font-["Lato"]'>
                  {t('dashboard.admin.employeeManagement.modal.address')}
                </label>
                <p className='mt-1 text-base text-[#1A1A1A] font-["Lato"]'>
                  {employee.address}
                </p>
              </div>

              <div>
                <label className='text-sm font-medium text-[#737373] font-["Lato"]'>
                  {t('dashboard.admin.employeeManagement.modal.role')}
                </label>
                <p className='mt-1 text-base text-[#1A1A1A] font-["Lato"] font-semibold'>
                  {employee.role}
                </p>
              </div>

              <div>
                <label className='text-sm font-medium text-[#737373] font-["Lato"]'>
                  {t('dashboard.admin.employeeManagement.modal.roleCode')}
                </label>
                <p className='mt-1 text-base text-[#1A1A1A] font-["Lato"] font-semibold'>
                  {employee.roleCode}
                </p>
              </div>

              <div>
                <label className='text-sm font-medium text-[#737373] font-["Lato"]'>
                  {t('dashboard.admin.employeeManagement.modal.department')}
                </label>
                <p className='mt-1 text-base text-[#1A1A1A] font-["Lato"]'>
                  {employee.department || 'N/A'}
                </p>
              </div>

              <div>
                <label className='text-sm font-medium text-[#737373] font-["Lato"]'>
                  {t('dashboard.admin.employeeManagement.modal.employeeId')}
                </label>
                <p className='mt-1 text-base text-[#1A1A1A] font-mono'>
                  {employee.employeeId || employee.id}
                </p>
              </div>

              <div>
                <label className='text-sm font-medium text-[#737373] font-["Lato"]'>
                  {t('dashboard.admin.employeeManagement.modal.startDate')}
                </label>
                <p className='mt-1 text-base text-[#1A1A1A] font-["Lato"]'>
                  {new Date(employee.startDate).toLocaleDateString()}
                </p>
              </div>

              <div>
                <label className='text-sm font-medium text-[#737373] font-["Lato"]'>
                  {t('dashboard.admin.employeeManagement.modal.endDate')}
                </label>
                <p className='mt-1 text-base text-[#1A1A1A] font-["Lato"]'>
                  {new Date(employee.endDate).toLocaleDateString()}
                </p>
              </div>

              <div>
                <label className='text-sm font-medium text-[#737373] font-["Lato"]'>
                  {t('dashboard.admin.employeeManagement.modal.annualSalary')}
                </label>
                <p className='mt-1 text-base font-["Lato"] font-bold text-green-600'>
                  {formatSalary(employee.annualSalary)}
                </p>
              </div>

              <div>
                <label className='text-sm font-medium text-[#737373] font-["Lato"]'>
                  {t('dashboard.admin.employeeManagement.modal.lastActive')}
                </label>
                <p className='mt-1 text-base text-[#1A1A1A] font-["Lato"]'>
                  {new Date(employee.lastActive).toLocaleString()}
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
            {t('dashboard.admin.employeeManagement.modal.close')}
          </button>
          <button
            onClick={handleAction}
            className={`w-full sm:w-auto px-4 sm:px-6 py-2 sm:py-2.5 rounded-lg font-medium font-["Poppins"] transition-colors text-sm sm:text-base ${
              employee.status === 'active'
                ? 'bg-red-600 text-white hover:bg-red-700'
                : 'bg-green-600 text-white hover:bg-green-700'
            }`}
          >
            {employee.status === 'active'
              ? t('dashboard.admin.employeeManagement.modal.deactivate')
              : t('dashboard.admin.employeeManagement.modal.activate')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EmployeeDetailsModal;
