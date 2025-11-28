import React from 'react';
import { BsPersonDashFill, BsPersonPlusFill } from 'react-icons/bs';
import { useTranslation } from 'react-i18next';

const CustomerManagementTable = ({ customers, onShowDetails }) => {
  const { t } = useTranslation();

  const getTimeAgo = (dateString) => {
    try {
      const date = new Date(dateString);
      const now = new Date();
      const diffInMs = now - date;
      const diffInMinutes = Math.floor(diffInMs / 60000);

      if (diffInMinutes < 1) return 'just now';
      if (diffInMinutes < 60) return `${diffInMinutes} minutes ago`;

      const diffInHours = Math.floor(diffInMinutes / 60);
      if (diffInHours < 24)
        return `${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`;

      const diffInDays = Math.floor(diffInHours / 24);
      return `${diffInDays} day${diffInDays > 1 ? 's' : ''} ago`;
    } catch {
      return dateString;
    }
  };

  return (
    <>
      {/* Mobile Card View */}
      <div className='md:hidden space-y-4 p-4'>
        {customers.length > 0 ? (
          customers.map((customer) => (
            <div
              key={customer.id}
              className='bg-white border border-gray-200 rounded-lg p-4 shadow-sm'
            >
              <div className='flex justify-between items-start mb-3'>
                <div className='flex-1'>
                  <h3 className='text-base font-semibold text-gray-900'>
                    {customer.name}
                  </h3>
                  <p className='text-sm text-gray-500 mt-1'>
                    {getTimeAgo(customer.lastActive)}
                  </p>
                </div>
                <span
                  className={`inline-flex px-3 py-1 text-xs font-medium rounded-full ${
                    customer.status === 'active'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-red-100 text-red-800'
                  }`}
                >
                  {customer.status === 'active'
                    ? t('dashboard.admin.customerManagement.status.active')
                    : t('dashboard.admin.customerManagement.status.suspended')}
                </span>
              </div>

              <div className='space-y-2 mb-4'>
                <div className='flex justify-between text-sm'>
                  <span className='text-gray-600 font-medium'>
                    {t(
                      'dashboard.admin.customerManagement.tableHeaders.totalOrder'
                    )}
                    :
                  </span>
                  <span className='text-gray-900 font-semibold'>
                    {String(customer.totalOrders).padStart(2, '0')}
                  </span>
                </div>
              </div>

              <button
                onClick={() => onShowDetails(customer)}
                className='w-full flex items-center justify-center gap-2 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors'
              >
                {customer.status === 'active' ? (
                  <BsPersonDashFill className='w-4 h-4' />
                ) : (
                  <BsPersonPlusFill className='w-4 h-4' />
                )}
                <span className='text-sm font-medium'>
                  {t('dashboard.admin.customerManagement.tableHeaders.actions')}
                </span>
              </button>
            </div>
          ))
        ) : (
          <div className='text-center py-10 text-gray-500'>
            {t('dashboard.admin.customerManagement.noCustomersFound')}
          </div>
        )}
      </div>

      {/* Desktop Table View */}
      <div className='hidden md:block overflow-x-auto'>
        <table className='w-full table-fixed'>
          <thead className='bg-gray-50'>
            <tr>
              <th
                scope='col'
                className='w-[20%] px-6 py-3 text-left text-sm font-bold text-gray-700 uppercase tracking-wider'
              >
                {t('dashboard.admin.customerManagement.tableHeaders.customer')}
              </th>
              <th
                scope='col'
                className='w-[15%] px-6 py-3 text-left text-sm font-bold text-gray-700 uppercase tracking-wider'
              >
                {t('dashboard.admin.customerManagement.tableHeaders.status')}
              </th>
              <th
                scope='col'
                className='w-[15%] px-6 py-3 text-left text-sm font-bold text-gray-700 uppercase tracking-wider'
              >
                {t(
                  'dashboard.admin.customerManagement.tableHeaders.totalOrder'
                )}
              </th>
              <th
                scope='col'
                className='w-[25%] px-6 py-3 text-left text-sm font-bold text-gray-700 uppercase tracking-wider'
              >
                {t(
                  'dashboard.admin.customerManagement.tableHeaders.lastActive'
                )}
              </th>
              <th
                scope='col'
                className='w-[25%] px-6 py-3 text-center text-sm font-bold text-gray-700 uppercase tracking-wider'
              >
                {t('dashboard.admin.customerManagement.tableHeaders.actions')}
              </th>
            </tr>
          </thead>
          <tbody className='divide-y divide-gray-200'>
            {customers.length > 0 ? (
              customers.map((customer) => (
                <tr key={customer.id} className='hover:bg-gray-50'>
                  <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900'>
                    {customer.name}
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap'>
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-medium rounded ${
                        customer.status === 'active'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {customer.status === 'active'
                        ? t('dashboard.admin.customerManagement.status.active')
                        : t(
                            'dashboard.admin.customerManagement.status.suspended'
                          )}
                    </span>
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900'>
                    {String(customer.totalOrders).padStart(2, '0')}
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
                    {getTimeAgo(customer.lastActive)}
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap text-sm font-medium'>
                    <div className='flex items-center justify-center space-x-4'>
                      <button
                        onClick={() => onShowDetails(customer)}
                        aria-label={
                          customer.status === 'active'
                            ? 'view-active'
                            : 'view-suspended'
                        }
                        className='p-2 rounded-md hover:bg-gray-100 transition flex items-center justify-center'
                      >
                        {customer.status === 'active' ? (
                          <BsPersonDashFill className='w-5 h-5 text-green-600' />
                        ) : (
                          <BsPersonPlusFill className='w-5 h-5 text-red-600' />
                        )}
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr className='min-h-[408px]'>
                <td colSpan={5} className='text-center py-10 text-gray-500'>
                  {t('dashboard.admin.customerManagement.noCustomersFound')}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default CustomerManagementTable;
