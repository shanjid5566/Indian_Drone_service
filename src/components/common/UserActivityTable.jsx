import React, { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { HiUser } from 'react-icons/hi';
import { BsPersonPlus } from 'react-icons/bs';
import Pagination from './Pagination';

const getStatusColor = (statusType) => {
  const colors = {
    success: 'bg-green-100 text-green-800',
    warning: 'bg-yellow-100 text-yellow-800',
    error: 'bg-red-100 text-red-800',
    info: 'bg-blue-100 text-blue-800',
  };
  return colors[statusType] || 'bg-gray-100 text-gray-800';
};

const UserActivityTable = ({ data, title = 'Recent User Activity' }) => {
  const { t } = useTranslation();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Use useMemo to calculate the data for the current page.
  // This avoids re-calculating on every render unless dependencies change.
  const currentData = useMemo(() => {
    if (!data?.data) return [];
    const startIdx = (currentPage - 1) * itemsPerPage;
    const endIdx = startIdx + itemsPerPage;
    return data.data.slice(startIdx, endIdx);
  }, [currentPage, data]);

  if (!data || !data.data?.length) {
    return (
      <div className='bg-white rounded-xl shadow-sm p-6'>
        <h3 className='text-lg font-semibold text-gray-900 mb-4'>{title}</h3>
        <div className='text-center py-8'>
          <p className='text-gray-500'>No activity data available</p>
        </div>
      </div>
    );
  }

  const handlePageChange = (page) => setCurrentPage(page);

  const translatedHeaders = [
    t('dashboard.admin.userActivity.headers.user'),
    t('dashboard.admin.userActivity.headers.role'),
    t('dashboard.admin.userActivity.headers.jobTitle'),
    t('dashboard.admin.userActivity.headers.status'),
    t('dashboard.admin.userActivity.headers.lastActive'),
    t('dashboard.admin.userActivity.headers.actions'),
  ];

  return (
    <div className='bg-white rounded-xl shadow-sm'>
      <div className='p-6 border-b border-gray-200'>
        <h3 className='text-lg font-semibold text-gray-900'>{title}</h3>
      </div>

      <div className='overflow-x-auto'>
        <table className='w-full'>
          <thead className='bg-gray-50'>
            <tr>
              {translatedHeaders.map((header, index) => (
                <th
                  key={index}
                  className={`px-6 py-3 text-sm font-semibold text-gray-700 uppercase tracking-wider ${
                    index === translatedHeaders.length - 1
                      ? 'text-center'
                      : 'text-left'
                  }`}
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className='bg-white divide-y divide-gray-200'>
            {currentData.map((row, index) => (
              <tr key={row.id || index} className='hover:bg-gray-50'>
                <td className='px-6 py-4 whitespace-nowrap'>
                  <div className='flex items-center'>
                    <div className='flex-shrink-0 h-8 w-8'>
                      <div className='h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center'>
                        <HiUser className='h-4 w-4 text-gray-500' />
                      </div>
                    </div>
                    <div className='ml-3'>
                      <div className='text-sm font-medium text-gray-900'>
                        {row.user}
                      </div>
                    </div>
                  </div>
                </td>
                <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900'>
                  {row.role}
                </td>
                <td className='px-6 py-4 text-sm text-gray-900 max-w-xs truncate'>
                  {row.jobTitle}
                </td>
                <td className='px-6 py-4 whitespace-nowrap'>
                  <span
                    className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(
                      row.statusType
                    )}`}
                  >
                    {row.status}
                  </span>
                </td>
                <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
                  {row.lastActive}
                </td>
                <td className='px-6 py-4 whitespace-nowrap text-center'>
                  <button
                    aria-label='Actions'
                    className='text-black hover:text-gray-600 p-1'
                  >
                    <BsPersonPlus className='h-5 w-5 mx-auto' />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Pagination
        currentPage={currentPage}
        totalItems={data.data.length}
        itemsPerPage={itemsPerPage}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default UserActivityTable;
