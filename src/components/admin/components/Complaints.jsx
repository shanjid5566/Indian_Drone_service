import React, { useState, useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { AiFillStar } from 'react-icons/ai';
import axiosInstance from '../../../config/axiosConfig';
import { LoadingSpinner } from '../../common/LoadingSpinner';
import Pagination from '../../common/Pagination';

const Complaints = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [complaintsData, setComplaintsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  useEffect(() => {
    const fetchComplaintsData = async () => {
      try {
        setLoading(true);
        const response = await axiosInstance.get('/admin/data/complaints.json');
        setComplaintsData(response.data.complaints || []);
      } catch (err) {
        setError('Failed to fetch complaints data.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchComplaintsData();
  }, []);

  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return complaintsData.slice(startIndex, endIndex);
  }, [complaintsData, currentPage, itemsPerPage]);

  const handleShowDetails = (complaintId) => {
    navigate(`/admin/complaint-details/${complaintId}`, {
      state: { from: 'complaints' },
    });
  };

  if (error) {
    return <div className='text-center py-10 text-red-500'>{error}</div>;
  }

  return (
    <>
      <div className='w-full bg-[#fafffd] px-4 md:px-6 xl:px-11 py-3 lg:py-6'>
        <div className='mb-4 md:mb-6'>
          <h1 className='text-xl md:text-2xl font-semibold text-gray-900 font-Poppins'>
            {t('complaints.title')}
          </h1>
          <p className='text-sm md:text-base text-gray-600 font-Lato mt-1'>
            {t('complaints.subtitle')}
          </p>
        </div>

        <div className='bg-white rounded-lg shadow-sm overflow-hidden'>
          {loading ? (
            <div className='flex justify-center items-center h-96'>
              <LoadingSpinner />
            </div>
          ) : (
            <>
              {/* Mobile Card View */}
              <div className='block md:hidden'>
                <div className='divide-y divide-gray-200'>
                  {paginatedData.length > 0 ? (
                    paginatedData.map((complaint) => (
                      <div
                        key={complaint.id}
                        className='p-4 hover:bg-gray-50 transition-colors'
                      >
                        <div className='space-y-3'>
                          <div className='flex items-start justify-between gap-2'>
                            <div className='flex-1 min-w-0'>
                              <p className='text-xs text-gray-500 uppercase font-medium mb-1'>
                                {t('complaints.table.customer')}
                              </p>
                              <p className='text-sm font-semibold text-gray-900 truncate'>
                                {complaint.customer}
                              </p>
                            </div>
                            <div className='flex items-center gap-1 bg-gray-50 px-2 py-1 rounded'>
                              <AiFillStar className='w-4 h-4 text-yellow-400' />
                              <span className='text-sm font-medium text-gray-900'>
                                {complaint.rating}
                              </span>
                            </div>
                          </div>

                          <div>
                            <p className='text-xs text-gray-500 uppercase font-medium mb-1'>
                              {t('complaints.table.complainTitle')}
                            </p>
                            <p className='text-sm text-gray-900 line-clamp-2'>
                              {complaint.complainTitle}
                            </p>
                          </div>

                          <div>
                            <p className='text-xs text-gray-500 uppercase font-medium mb-1'>
                              {t('complaints.table.ticketId')}
                            </p>
                            <p className='text-sm text-gray-900 font-mono'>
                              {complaint.ticketId}
                            </p>
                          </div>

                          <button
                            onClick={() => handleShowDetails(complaint.id)}
                            className='w-full px-4 py-2 bg-green-600 text-white text-sm rounded-lg hover:bg-green-700 transition-colors font-medium'
                          >
                            {t('complaints.table.seeDetails')}
                          </button>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className='px-4 py-8 text-center text-gray-500'>
                      {t('dashboard.admin.userManagement.noUsersFound')}
                    </div>
                  )}
                </div>
              </div>

              {/* Desktop Table View */}
              <div className='hidden md:block min-h-[448px] overflow-x-auto'>
                <table className='w-full'>
                  <thead>
                    <tr className='bg-gray-50 border-t border-b border-gray-200'>
                      <th className='px-4 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                        {t('complaints.table.customer')}
                      </th>
                      <th className='px-4 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                        {t('complaints.table.complainTitle')}
                      </th>
                      <th className='px-4 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                        {t('complaints.table.ticketId')}
                      </th>
                      <th className='px-4 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                        {t('complaints.table.rating')}
                      </th>
                      <th className='px-4 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                        {t('complaints.table.actions')}
                      </th>
                    </tr>
                  </thead>
                  <tbody className='bg-white divide-y divide-gray-200'>
                    {paginatedData.length > 0 ? (
                      paginatedData.map((complaint) => (
                        <tr key={complaint.id} className='hover:bg-gray-50'>
                          <td className='px-4 lg:px-6 py-4 whitespace-nowrap text-sm text-gray-900'>
                            {complaint.customer}
                          </td>
                          <td className='px-4 lg:px-6 py-4 text-sm text-gray-900'>
                            <div className='max-w-xs lg:max-w-md truncate'>
                              {complaint.complainTitle}
                            </div>
                          </td>
                          <td className='px-4 lg:px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-mono'>
                            {complaint.ticketId}
                          </td>
                          <td className='px-4 lg:px-6 py-4 whitespace-nowrap text-sm text-gray-900'>
                            <div className='flex items-center gap-2'>
                              <AiFillStar className='w-5 h-5 text-yellow-400' />
                              <span>{complaint.rating}</span>
                            </div>
                          </td>
                          <td className='px-4 lg:px-6 py-4 whitespace-nowrap text-sm'>
                            <button
                              onClick={() => handleShowDetails(complaint.id)}
                              className='px-3 lg:px-4 py-2 bg-green-600 text-white text-sm rounded-lg hover:bg-green-700 transition-colors font-medium'
                            >
                              {t('complaints.table.seeDetails')}
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td
                          colSpan='5'
                          className='px-4 lg:px-6 py-8 text-center text-gray-500'
                        >
                          {t('dashboard.admin.userManagement.noUsersFound')}
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              <Pagination
                currentPage={currentPage}
                totalItems={complaintsData.length}
                itemsPerPage={itemsPerPage}
                onPageChange={(page) => setCurrentPage(page)}
                showingText={t('complaints.pagination.showing', {
                  count: paginatedData.length,
                  total: complaintsData.length,
                })}
              />
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Complaints;
