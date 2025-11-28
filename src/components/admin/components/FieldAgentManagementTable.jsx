import React from 'react';
import { useTranslation } from 'react-i18next';
import { HiOutlineUserGroup, HiOutlineInformationCircle } from 'react-icons/hi';
import { BsPersonDashFill, BsPersonPlusFill } from 'react-icons/bs';

const FieldAgentManagementTable = ({ fieldAgents, onShowDetails }) => {
  const { t } = useTranslation();

  return (
    <>
      {/* Mobile Card View */}
      <div className='md:hidden space-y-4 p-4'>
        {fieldAgents.length > 0 ? (
          fieldAgents.map((agent) => (
            <div
              key={agent.id}
              className='bg-white border border-gray-200 rounded-lg p-4 shadow-sm'
            >
              <div className='flex justify-between items-start mb-3'>
                <div className='flex-1'>
                  <h3 className='text-base font-semibold text-gray-900'>
                    {agent.name}
                  </h3>
                </div>
                <span
                  className={`inline-flex px-3 py-1 text-xs font-medium rounded-full ${
                    agent.status === 'Active'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-red-100 text-red-800'
                  }`}
                >
                  {agent.status === 'Active'
                    ? t('dashboard.admin.fieldAgentManagement.status.active')
                    : t(
                        'dashboard.admin.fieldAgentManagement.status.suspended'
                      )}
                </span>
              </div>

              <div className='space-y-2 mb-4 text-sm'>
                <div className='flex justify-between'>
                  <span className='text-gray-600'>Customers Added:</span>
                  <span className='text-gray-900 font-semibold'>
                    {agent.totalAddCustomer}
                  </span>
                </div>
                <div className='flex justify-between'>
                  <span className='text-gray-600'>Operators Added:</span>
                  <span className='text-gray-900 font-semibold'>
                    {agent.totalAddOperator}
                  </span>
                </div>
                <div className='flex justify-between'>
                  <span className='text-gray-600'>Orders Booked:</span>
                  <span className='text-gray-900 font-semibold'>
                    {agent.totalBookOrders}
                  </span>
                </div>
              </div>

              <div className='flex gap-2'>
                <button
                  onClick={() => onShowDetails(agent)}
                  className='flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors'
                >
                  {agent.status === 'Active' ? (
                    <BsPersonDashFill className='w-4 h-4' />
                  ) : (
                    <BsPersonPlusFill className='w-4 h-4' />
                  )}
                  <span className='text-sm font-medium'>View Details</span>
                </button>
                <button
                  onClick={() => onShowDetails(agent)}
                  className='px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors'
                >
                  <HiOutlineInformationCircle className='w-5 h-5' />
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className='text-center py-10 text-gray-500'>
            {t('dashboard.admin.fieldAgentManagement.noFieldAgentsFound')}
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
                className='w-[18%] px-6 py-3 text-left text-sm font-bold text-gray-700 uppercase tracking-wider'
              >
                {t(
                  'dashboard.admin.fieldAgentManagement.tableHeaders.fieldAgent'
                )}
              </th>
              <th
                scope='col'
                className='w-[16%] px-3 py-3 text-left text-sm font-bold text-gray-700 uppercase tracking-wider'
              >
                {t(
                  'dashboard.admin.fieldAgentManagement.tableHeaders.totalAddCustomer'
                )}
              </th>
              <th
                scope='col'
                className='w-[16%] px-3 py-3 text-left text-sm font-bold text-gray-700 uppercase tracking-wider'
              >
                {t(
                  'dashboard.admin.fieldAgentManagement.tableHeaders.totalAddOperator'
                )}
              </th>
              <th
                scope='col'
                className='w-[16%] px-3 py-3 text-left text-sm font-bold text-gray-700 uppercase tracking-wider'
              >
                {t(
                  'dashboard.admin.fieldAgentManagement.tableHeaders.totalBookOrders'
                )}
              </th>
              <th
                scope='col'
                className='w-[16%] px-3 py-3 text-left text-sm font-bold text-gray-700 uppercase tracking-wider'
              >
                {t('dashboard.admin.fieldAgentManagement.tableHeaders.status')}
              </th>
              <th
                scope='col'
                className='w-[18%] px-3 py-3 text-center text-sm font-bold text-gray-700 uppercase tracking-wider'
              >
                {t('dashboard.admin.fieldAgentManagement.tableHeaders.actions')}
              </th>
            </tr>
          </thead>
          <tbody className='divide-y divide-gray-200'>
            {fieldAgents.length > 0 ? (
              fieldAgents.map((agent) => (
                <tr key={agent.id} className='hover:bg-gray-50'>
                  <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900'>
                    {agent.name}
                  </td>
                  <td className='px-3 py-4 whitespace-nowrap text-sm text-gray-900'>
                    {agent.totalAddCustomer}
                  </td>
                  <td className='px-3 py-4 whitespace-nowrap text-sm text-gray-900'>
                    {agent.totalAddOperator}
                  </td>
                  <td className='px-3 py-4 whitespace-nowrap text-sm text-gray-900'>
                    {agent.totalBookOrders}
                  </td>
                  <td className='px-3 py-4 whitespace-nowrap'>
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-medium rounded ${
                        agent.status === 'Active'
                          ? 'bg-green-50 text-green-700'
                          : 'bg-red-50 text-red-700'
                      }`}
                    >
                      {agent.status === 'Active'
                        ? t(
                            'dashboard.admin.fieldAgentManagement.status.active'
                          )
                        : t(
                            'dashboard.admin.fieldAgentManagement.status.suspended'
                          )}
                    </span>
                  </td>
                  <td className='px-3 py-4 whitespace-nowrap text-sm font-medium'>
                    <div className='flex items-center justify-center'>
                      <button
                        onClick={() => onShowDetails(agent)}
                        className='p-2 rounded-full transition hover:bg-gray-50'
                        title='View Details'
                      >
                        {agent.status === 'Active' ? (
                          <BsPersonDashFill className='w-5 h-5 text-green-600' />
                        ) : (
                          <BsPersonPlusFill className='w-5 h-5 text-red-600' />
                        )}
                      </button>
                      <button
                        onClick={() => onShowDetails(agent)}
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
                <td colSpan={6} className='text-center py-10 text-gray-500'>
                  {t('dashboard.admin.fieldAgentManagement.noFieldAgentsFound')}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default FieldAgentManagementTable;
