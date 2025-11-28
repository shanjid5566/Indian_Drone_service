import React from 'react';
import { useTranslation } from 'react-i18next';
import { HiCheck, HiX } from 'react-icons/hi';

const UserManagementTable = ({
  users,
  activeSubTab,
  onShowDetails,
  onApprove,
  onReject,
}) => {
  const { t } = useTranslation();

  return (
    <>
      {/* Mobile Card View */}
      <div className='md:hidden space-y-4 p-4'>
        {users.length > 0 ? (
          users.map((user) => (
            <div
              key={user.id}
              className='bg-white border border-gray-200 rounded-lg p-4 shadow-sm'
            >
              <div className='mb-3'>
                <h3 className='text-base font-semibold text-gray-900'>
                  {user.name}
                </h3>
                <p className='text-xs text-gray-500 mt-1'>
                  {new Date(user.registrationDate).toLocaleString([], {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </p>
              </div>

              <div className='mb-3'>
                <div className='flex justify-between items-center mb-2'>
                  <span className='text-sm text-gray-600 font-medium'>
                    Location:
                  </span>
                  <span className='text-sm text-gray-900 font-medium text-right'>
                    {user.location}
                  </span>
                </div>
                <div className='flex justify-between items-center'>
                  <span className='text-sm text-gray-600 font-medium'>
                    Registration ID:
                  </span>
                  <span className='text-sm text-gray-900 font-semibold tracking-wide'>
                    {user.registrationId}
                  </span>
                </div>
              </div>

              {activeSubTab === 'pending' ? (
                <div className='flex gap-2.5'>
                  <button
                    onClick={() => onReject(user.id)}
                    className='flex-1 h-8 bg-red-600 text-white rounded-lg hover:bg-red-700 active:bg-red-800 transition-all font-semibold flex items-center justify-center shadow-md hover:shadow-lg'
                    title='Reject'
                  >
                    <HiX className='w-4 h-4' />
                  </button>
                  <button
                    onClick={() => onApprove(user.id)}
                    className='flex-1 h-8 bg-green-600 text-white rounded-lg hover:bg-green-700 active:bg-green-800 transition-all font-semibold flex items-center justify-center shadow-md hover:shadow-lg'
                    title='Approve'
                  >
                    <HiCheck className='w-4 h-4' />
                  </button>
                  <button
                    onClick={() => onShowDetails(user)}
                    className='flex-1 h-8 bg-green-600 text-white rounded-lg hover:bg-green-700 active:bg-green-800 transition-all text-xs font-semibold shadow-md hover:shadow-lg whitespace-nowrap'
                  >
                    See Details
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => onShowDetails(user)}
                  className='w-full h-12 bg-green-600 text-white rounded-lg hover:bg-green-700 active:bg-green-800 transition-all text-sm font-semibold shadow-md hover:shadow-lg'
                >
                  {t('dashboard.admin.userManagement.seeDetails')}
                </button>
              )}
            </div>
          ))
        ) : (
          <div className='text-center py-10 text-gray-500'>
            {t('dashboard.admin.userManagement.noUsersFound')}
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
                {t('dashboard.admin.userManagement.tableHeaders.dateTime')}
              </th>
              <th
                scope='col'
                className='w-[20%] px-6 py-3 text-left text-sm font-bold text-gray-700 uppercase tracking-wider'
              >
                {t('dashboard.admin.userManagement.tableHeaders.name')}
              </th>
              <th
                scope='col'
                className='w-[25%] px-6 py-3 text-left text-sm font-bold text-gray-700 uppercase tracking-wider'
              >
                {t('dashboard.admin.userManagement.tableHeaders.location')}
              </th>
              <th
                scope='col'
                className='w-[15%] px-6 py-3 text-left text-sm font-bold text-gray-700 uppercase tracking-wider'
              >
                {t(
                  'dashboard.admin.userManagement.tableHeaders.registrationId'
                )}
              </th>
              <th
                scope='col'
                className='w-[20%] px-6 py-3 text-center text-sm font-bold text-gray-700 uppercase tracking-wider'
              >
                {t('dashboard.admin.userManagement.tableHeaders.actions')}
              </th>
            </tr>
          </thead>
          <tbody className='divide-y divide-gray-200'>
            {users.length > 0 ? (
              users.map((user) => (
                <tr key={user.id} className='hover:bg-gray-50'>
                  <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900'>
                    {new Date(user.registrationDate).toLocaleString([], {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900'>
                    {user.name}
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
                    {user.location}
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
                    {user.registrationId}
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap text-sm font-medium'>
                    <div className='flex items-center justify-center space-x-4'>
                      {activeSubTab === 'pending' && (
                        <>
                          <button
                            onClick={() => onReject(user.id)}
                            className='text-red-600 hover:text-red-900'
                            title='Reject'
                          >
                            <HiX className='w-5 h-5' />
                          </button>
                          <button
                            onClick={() => onApprove(user.id)}
                            className='text-green-600 hover:text-green-900'
                            title='Approve'
                          >
                            <HiCheck className='w-5 h-5' />
                          </button>
                        </>
                      )}
                      <button
                        onClick={() => onShowDetails(user)}
                        className='px-4 py-2 bg-green-600 text-white text-xs font-semibold rounded-md hover:bg-green-700 transition'
                      >
                        {t('dashboard.admin.userManagement.seeDetails')}
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr className='min-h-[408px]'>
                <td colSpan={5} className='text-center py-10 text-gray-500'>
                  {t('dashboard.admin.userManagement.noUsersFound')}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default UserManagementTable;
