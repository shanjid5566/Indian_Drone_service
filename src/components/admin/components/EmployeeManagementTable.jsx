import React from 'react';
import { useTranslation } from 'react-i18next';
import { HiOutlineUserGroup, HiOutlineInformationCircle } from 'react-icons/hi';
import { BsPersonDashFill, BsPersonPlusFill } from 'react-icons/bs';

const EmployeeManagementTable = ({ employees, onShowDetails }) => {
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

  const formatDate = (dateString) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', {
        month: '2-digit',
        day: '2-digit',
        year: '2-digit',
      });
    } catch {
      return dateString;
    }
  };

  const formatSalary = (salary) => {
    if (!salary) return 'N/A';
    return `₹${(salary / 1000).toFixed(0)}k`;
  };

  return (
    <>
      {/* Mobile Card View */}
      <div className='md:hidden space-y-4 p-4'>
        {employees.length > 0 ? (
          employees.map((employee) => (
            <div
              key={employee.id}
              className='bg-white border border-gray-200 rounded-lg p-4 shadow-sm'
            >
              <div className='flex justify-between items-start mb-3'>
                <div className='flex-1'>
                  <h3 className='text-base font-semibold text-gray-900'>
                    {employee.name}
                  </h3>
                  <p className='text-sm text-gray-600 mt-1'>{employee.role}</p>
                  <p className='text-xs text-gray-500 mt-1'>
                    {employee.roleCode}
                  </p>
                </div>
                <span
                  className={`inline-flex px-3 py-1 text-xs font-medium rounded-full ${
                    employee.status === 'active'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-red-100 text-red-800'
                  }`}
                >
                  {employee.status === 'active' ? 'Active' : 'Inactive'}
                </span>
              </div>

              <div className='space-y-2 mb-4 text-sm'>
                <div className='flex justify-between'>
                  <span className='text-gray-600'>Start Date:</span>
                  <span className='text-gray-900 font-medium'>
                    {formatDate(employee.startDate)}
                  </span>
                </div>
                <div className='flex justify-between'>
                  <span className='text-gray-600'>End Date:</span>
                  <span className='text-gray-900 font-medium'>
                    {formatDate(employee.endDate)}
                  </span>
                </div>
                <div className='flex justify-between'>
                  <span className='text-gray-600'>Salary:</span>
                  <span className='text-gray-900 font-semibold'>
                    {formatSalary(employee.annualSalary)}
                  </span>
                </div>
                <div className='flex justify-between'>
                  <span className='text-gray-600'>Last Active:</span>
                  <span className='text-gray-500'>
                    {getTimeAgo(employee.lastActive)}
                  </span>
                </div>
              </div>

              <div className='flex gap-2'>
                <button
                  onClick={() => onShowDetails(employee)}
                  className='flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors'
                >
                  {employee.status === 'active' ? (
                    <BsPersonDashFill className='w-4 h-4' />
                  ) : (
                    <BsPersonPlusFill className='w-4 h-4' />
                  )}
                  <span className='text-sm font-medium'>View Details</span>
                </button>
                <button
                  onClick={() => onShowDetails(employee)}
                  className='px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors'
                >
                  <HiOutlineInformationCircle className='w-5 h-5' />
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className='text-center py-10 text-gray-500'>
            {t('dashboard.admin.employeeManagement.noEmployeesFound')}
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
                className='w-[15%] px-6 py-3 text-left text-sm font-bold text-gray-700 uppercase tracking-wider'
              >
                {t('dashboard.admin.employeeManagement.tableHeaders.employees')}
              </th>
              <th
                scope='col'
                className='w-[12%] px-3 py-3 text-left text-sm font-bold text-gray-700 uppercase tracking-wider'
              >
                {t('dashboard.admin.employeeManagement.tableHeaders.role')}
              </th>
              <th
                scope='col'
                className='w-[10%] px-3 py-3 text-left text-sm font-bold text-gray-700 uppercase tracking-wider'
              >
                {t('dashboard.admin.employeeManagement.tableHeaders.roleCode')}
              </th>
              <th
                scope='col'
                className='w-[10%] px-3 py-3 text-left text-sm font-bold text-gray-700 uppercase tracking-wider'
              >
                {t('dashboard.admin.employeeManagement.tableHeaders.startDate')}
              </th>
              <th
                scope='col'
                className='w-[10%] px-3 py-3 text-left text-sm font-bold text-gray-700 uppercase tracking-wider'
              >
                {t('dashboard.admin.employeeManagement.tableHeaders.endDate')}
              </th>
              <th
                scope='col'
                className='w-[13%] px-3 py-3 text-left text-sm font-bold text-gray-700 uppercase tracking-wider'
              >
                {t(
                  'dashboard.admin.employeeManagement.tableHeaders.annualSalary'
                )}
              </th>
              <th
                scope='col'
                className='w-[15%] px-3 py-3 text-left text-sm font-bold text-gray-700 uppercase tracking-wider'
              >
                {t(
                  'dashboard.admin.employeeManagement.tableHeaders.lastActive'
                )}
              </th>
              <th
                scope='col'
                className='w-[15%] px-3 py-3 text-center text-sm font-bold text-gray-700 uppercase tracking-wider'
              >
                {t('dashboard.admin.employeeManagement.tableHeaders.actions')}
              </th>
            </tr>
          </thead>
          <tbody className='divide-y divide-gray-200'>
            {employees.length > 0 ? (
              employees.map((employee) => (
                <tr key={employee.id} className='hover:bg-gray-50'>
                  <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900'>
                    {employee.name}
                  </td>
                  <td className='px-3 py-4 whitespace-nowrap text-sm text-gray-900'>
                    {employee.role}
                  </td>
                  <td className='px-3 py-4 whitespace-nowrap text-sm text-gray-900'>
                    {employee.roleCode}
                  </td>
                  <td className='px-3 py-4 whitespace-nowrap text-sm text-gray-900'>
                    {formatDate(employee.startDate)}
                  </td>
                  <td className='px-3 py-4 whitespace-nowrap text-sm text-gray-900'>
                    {formatDate(employee.endDate)}
                  </td>
                  <td className='px-3 py-4 whitespace-nowrap text-sm text-gray-900'>
                    {formatSalary(employee.annualSalary)}
                  </td>
                  <td className='px-3 py-4 whitespace-nowrap text-sm text-gray-500'>
                    {getTimeAgo(employee.lastActive)}
                  </td>
                  <td className='px-3 py-4 whitespace-nowrap text-sm font-medium'>
                    <div className='flex items-center justify-center '>
                      <button
                        onClick={() => onShowDetails(employee)}
                        className={`p-2 rounded-full transition hover:bg-gray-50`}
                        title='View Details'
                      >
                        {employee.status === 'active' ? (
                          <BsPersonDashFill className='w-5 h-5 text-green-600' />
                        ) : (
                          <BsPersonPlusFill className='w-5 h-5 text-red-600' />
                        )}
                      </button>
                      <button
                        onClick={() => onShowDetails(employee)}
                        className='p-2 text-gray-600 hover:bg-gray-100 rounded-full transition'
                        title='More Information'
                      >
                        <HiOutlineInformationCircle className='w-5 h-5' />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr className='min-h-[408px]'>
                <td colSpan={8} className='text-center py-10 text-gray-500'>
                  {t('dashboard.admin.employeeManagement.noEmployeesFound')}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default EmployeeManagementTable;
