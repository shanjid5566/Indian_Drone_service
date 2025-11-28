import React, { useState, useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { HiOutlineInformationCircle } from 'react-icons/hi';
import { FiLayers } from 'react-icons/fi';
import axiosInstance from '../../../config/axiosConfig';
import { LoadingSpinner } from '../../common/LoadingSpinner';
import Pagination from '../../common/Pagination';
import AssignJobModal from '../../common/AssignJobModal';

const Jobs = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [jobsData, setJobsData] = useState(null);
  const [operators, setOperators] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);
  const [selectedOperator, setSelectedOperator] = useState(null);
  const itemsPerPage = 6;

  useEffect(() => {
    const fetchJobsData = async () => {
      try {
        setLoading(true);
        const response = await axiosInstance.get('/admin/data/jobs.json');
        const data = response.data;
        setJobsData(data);
        setOperators(data.operators || []);
      } catch (err) {
        console.error('Error fetching jobs:', err);
        setError(err.message || 'Failed to load jobs data');
      } finally {
        setLoading(false);
      }
    };

    fetchJobsData();
  }, []);

  const paginatedOperators = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return operators.slice(startIndex, startIndex + itemsPerPage);
  }, [operators, currentPage, itemsPerPage]);

  const getStatusBadgeClass = (status) => {
    const normalizedStatus = status.toLowerCase();
    if (normalizedStatus === 'in progress') {
      return 'bg-green-100 text-green-700';
    } else if (normalizedStatus === 'not started') {
      return 'bg-red-100 text-red-700';
    } else if (normalizedStatus === 'suspended') {
      return 'bg-yellow-100 text-yellow-700';
    }
    return 'bg-gray-100 text-gray-700';
  };

  const getProgressBarColor = (progress) => {
    if (progress >= 75) return 'bg-green-500';
    if (progress >= 50) return 'bg-blue-500';
    if (progress >= 25) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const handleAssignJob = (operator) => {
    setSelectedOperator(operator);
    setIsAssignModalOpen(true);
  };

  const handleViewOrderDetails = (operator) => {
    navigate(`/admin/order-details/${operator.id}`);
  };

  const handleCloseModal = () => {
    setIsAssignModalOpen(false);
    setSelectedOperator(null);
  };

  if (loading) {
    return (
      <div className='min-h-screen bg-[#fafffd] w-full flex items-center justify-center'>
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className='min-h-screen bg-[#fafffd] w-full flex items-center justify-center'>
        <div className='text-center'>
          <p className='text-red-600 mb-4'>Error: {error}</p>
          <button
            className='px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700'
            onClick={() => window.location.reload()}
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-[#fafffd] w-full px-6 xl:px-11 py-3 lg:py-6'>
      {/* Header Section */}
      <div className='mb-8'>
        <h1 className='text-2xl sm:text-3xl font-bold text-gray-900 mb-2'>
          {t('dashboard.admin.orderManagement.title')}
        </h1>
        <p className='text-gray-600'>
          {t('dashboard.admin.orderManagement.subtitle')}
        </p>
      </div>

      {/* Stats Cards */}
      <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mb-8'>
        {/* Scheduled Card */}
        <div className='bg-white rounded-lg shadow-sm p-6 border-t-4 border-gray-300'>
          <div className='flex justify-between items-start mb-4'>
            <h3 className='text-xl font-bold text-gray-900'>
              {t('dashboard.admin.orderManagement.scheduled')}
            </h3>
            <span className='text-sm text-gray-500'>
              {jobsData?.scheduled?.date}
            </span>
          </div>
          <p className='text-3xl font-bold text-gray-900'>
            {jobsData?.scheduled?.count || 0}{' '}
            <span className='text-base font-normal text-gray-600'>
              {t('dashboard.admin.orderManagement.jobs')}
            </span>
          </p>
        </div>

        {/* In Progress Card */}
        <div className='bg-white rounded-lg shadow-sm p-6 border-t-4 border-gray-300'>
          <div className='flex justify-between items-start mb-4'>
            <h3 className='text-xl font-bold text-gray-900'>
              {t('dashboard.admin.orderManagement.inProgress')}
            </h3>
            <span className='text-sm text-gray-500'>
              {jobsData?.inProgress?.date}
            </span>
          </div>
          <p className='text-3xl font-bold text-gray-900'>
            {jobsData?.inProgress?.count || 0}{' '}
            <span className='text-base font-normal text-gray-600'>
              {t('dashboard.admin.orderManagement.jobs')}
            </span>
          </p>
        </div>

        {/* Complete Card */}
        <div className='bg-white rounded-lg shadow-sm p-6 border-t-4 border-gray-300'>
          <div className='flex justify-between items-start mb-4'>
            <h3 className='text-xl font-bold text-gray-900'>
              {t('dashboard.admin.orderManagement.complete')}
            </h3>
            <span className='text-sm text-gray-500'>
              {jobsData?.complete?.date}
            </span>
          </div>
          <p className='text-3xl font-bold text-gray-900'>
            {jobsData?.complete?.count || 0}{' '}
            <span className='text-base font-normal text-gray-600'>
              {t('dashboard.admin.orderManagement.jobs')}
            </span>
          </p>
        </div>
      </div>

      {/* Operators Table */}
      <div className='bg-white rounded-lg shadow-sm'>
        <div className='overflow-x-auto'>
          <table className='w-full'>
            <thead className='bg-gray-50 border-b border-gray-200'>
              <tr>
                <th className='px-6 py-4 text-left text-sm font-bold text-gray-700 uppercase tracking-wider'>
                  {t(
                    'dashboard.admin.orderManagement.tableHeaders.droneOperator'
                  )}
                </th>
                <th className='px-6 py-4 text-left text-sm font-bold text-gray-700 uppercase tracking-wider'>
                  {t('dashboard.admin.orderManagement.tableHeaders.status')}
                </th>
                <th className='px-6 py-4 text-left text-sm font-bold text-gray-700 uppercase tracking-wider'>
                  {t('dashboard.admin.orderManagement.tableHeaders.job')}
                </th>
                <th className='px-6 py-4 text-left text-sm font-bold text-gray-700 uppercase tracking-wider'>
                  {t('dashboard.admin.orderManagement.tableHeaders.progress')}
                </th>
                <th className='px-6 py-4 text-left text-sm font-bold text-gray-700 uppercase tracking-wider'>
                  {t('dashboard.admin.orderManagement.tableHeaders.actions')}
                </th>
              </tr>
            </thead>
            <tbody className='divide-y divide-gray-200 bg-white'>
              {paginatedOperators.map((operator) => (
                <tr
                  key={operator.id}
                  className='hover:bg-gray-50 transition-colors'
                >
                  <td className='px-6 py-4 whitespace-nowrap'>
                    <div className='text-sm font-medium text-gray-900'>
                      {operator.name}
                    </div>
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap'>
                    <span
                      className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${getStatusBadgeClass(
                        operator.status
                      )}`}
                    >
                      {operator.status}
                    </span>
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap'>
                    <div className='text-sm text-gray-900'>
                      {operator.jobNumber}
                    </div>
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap'>
                    <div className='flex items-center gap-3'>
                      <div className='flex-1 bg-gray-200 rounded-full h-2 max-w-[120px]'>
                        <div
                          className={`h-2 rounded-full ${getProgressBarColor(
                            operator.progress
                          )}`}
                          style={{ width: `${operator.progress}%` }}
                        ></div>
                      </div>
                      <span className='text-sm font-medium text-gray-700 min-w-[40px]'>
                        {operator.progress}%
                      </span>
                    </div>
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap'>
                    <div className='flex items-center gap-3'>
                      <button
                        onClick={() => handleAssignJob(operator)}
                        className='text-green-600 hover:text-green-800 transition-colors'
                      >
                        <FiLayers className='w-5 h-5' />
                      </button>
                      <button
                        onClick={() => handleViewOrderDetails(operator)}
                        className='text-gray-600 hover:text-gray-800 transition-colors'
                      >
                        <HiOutlineInformationCircle className='w-5 h-5' />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <Pagination
          currentPage={currentPage}
          totalItems={operators.length}
          itemsPerPage={itemsPerPage}
          onPageChange={(page) => setCurrentPage(page)}
          showingText={t('dashboard.admin.orderManagement.showing', {
            count: paginatedOperators.length,
            total: operators.length,
          })}
        />
      </div>

      {/* Assign Job Modal */}
      <AssignJobModal
        isOpen={isAssignModalOpen}
        onClose={handleCloseModal}
        operator={selectedOperator}
      />
    </div>
  );
};

export default Jobs;
