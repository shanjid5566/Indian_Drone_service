import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams, useNavigate } from 'react-router-dom';
import { HiOutlineArrowLeft } from 'react-icons/hi';
import { FiLayers } from 'react-icons/fi';
import { AiFillStar } from 'react-icons/ai';
import axiosInstance from '../../../config/axiosConfig';
import { LoadingSpinner } from '../../common/LoadingSpinner';
import Pagination from '../../common/Pagination';
import { Header } from '../../common/Header';

const OrderDetails = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { operatorId } = useParams();
  const [orderData, setOrderData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  useEffect(() => {
    const fetchOrderData = async () => {
      try {
        setLoading(true);
        const response = await axiosInstance.get(
          '/admin/data/orderDetails.json'
        );
        setOrderData(response.data);
      } catch (err) {
        console.error('Error fetching order details:', err);
        setError(err.message || 'Failed to load order details');
      } finally {
        setLoading(false);
      }
    };

    fetchOrderData();
  }, [operatorId]);

  const paginatedOrders =
    orderData?.orders.slice(
      (currentPage - 1) * itemsPerPage,
      currentPage * itemsPerPage
    ) || [];

  const getStatusBadgeClass = (status) => {
    if (status === 'In progress') {
      return 'bg-green-50 text-green-700';
    } else if (status === 'Not started') {
      return 'bg-rose-600/5 text-rose-600';
    } else if (status === 'Completed') {
      return 'bg-green-50 text-green-700';
    }
    return 'bg-gray-100 text-gray-700';
  };

  const getProgressBarColor = (progress) => {
    if (progress === 100) return 'bg-green-500';
    if (progress > 0) return 'bg-green-500';
    return 'bg-green-50';
  };

  if (loading) {
    return (
      <div className='min-h-screen bg-white w-full flex items-center justify-center'>
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className='min-h-screen bg-white w-full flex items-center justify-center'>
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
    <>
      <Header />
      <div className='w-full min-h-screen bg-[#FAFFFD] p-6 md:p-10 lg:p-12'>
        <div className='max-w-7xl mx-auto'>
          {/* Back Button */}
          <div className='w-full mb-8'>
            <button
              onClick={() => navigate(-1)}
              className='flex justify-start items-center gap-3 text-neutral-800 hover:text-green-600 transition-colors'
            >
              <HiOutlineArrowLeft className='w-6 h-6' />
            </button>
          </div>

          {/* Stats Cards */}
          <div className='grid grid-cols-4 gap-6 mb-10'>
            {orderData?.stats.map((stat, index) => (
              <div
                key={index}
                className='p-6 bg-white rounded-lg border border-zinc-100 inline-flex flex-col justify-center items-center gap-3'
              >
                <div className='w-full inline-flex flex-col justify-center items-center gap-2'>
                  <div className='self-stretch text-center text-gray-700 text-sm font-medium font-["Lato"] leading-tight'>
                    {t(
                      `dashboard.admin.orderDetails.${stat.label.replace(
                        / /g,
                        ''
                      )}`
                    )}
                  </div>
                  <div className='self-stretch text-center text-gray-900 text-3xl font-semibold font-["Poppins"] leading-tight'>
                    {stat.value}
                  </div>
                  <div className='text-center text-green-500 text-sm font-normal font-["Lato"] leading-tight'>
                    {stat.change}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Orders Table */}
          <div className='w-full flex flex-col gap-6'>
            <div className='flex flex-col gap-1'>
              <div className='text-neutral-950 text-2xl font-semibold font-["Poppins"] leading-9'>
                {t('dashboard.admin.orderDetails.title')}
              </div>
              <div>
                <span className='text-gray-800 text-base font-normal font-["Lato"] leading-normal'>
                  {t('dashboard.admin.orderDetails.subtitle')}{' '}
                </span>
                <span className='text-green-500 text-base font-normal font-["Lato"] leading-normal'>
                  {orderData?.operatorName}.
                </span>
              </div>
            </div>

            <div className='bg-white rounded-lg shadow-sm'>
              <div className='overflow-x-auto'>
                <table className='w-full table-fixed'>
                  <thead className='bg-gray-50'>
                    <tr>
                      <th
                        scope='col'
                        className='w-[15%] px-6 py-3 text-left text-sm font-bold text-gray-700 uppercase tracking-wider'
                      >
                        {t('dashboard.admin.orderDetails.tableHeaders.service')}
                      </th>
                      <th
                        scope='col'
                        className='w-[12%] px-6 py-3 text-left text-sm font-bold text-gray-700 uppercase tracking-wider'
                      >
                        {t('dashboard.admin.orderDetails.tableHeaders.status')}
                      </th>
                      <th
                        scope='col'
                        className='w-[13%] px-6 py-3 text-left text-sm font-bold text-gray-700 uppercase tracking-wider'
                      >
                        {t('dashboard.admin.orderDetails.tableHeaders.rating')}
                      </th>
                      <th
                        scope='col'
                        className='w-[17%] px-6 py-3 text-left text-sm font-bold text-gray-700 uppercase tracking-wider'
                      >
                        {t(
                          'dashboard.admin.orderDetails.tableHeaders.progress'
                        )}
                      </th>
                      <th
                        scope='col'
                        className='w-[13%] px-6 py-3 text-left text-sm font-bold text-gray-700 uppercase tracking-wider'
                      >
                        {t('dashboard.admin.orderDetails.tableHeaders.orderId')}
                      </th>
                      <th
                        scope='col'
                        className='w-[20%] px-6 py-3 text-left text-sm font-bold text-gray-700 uppercase tracking-wider'
                      >
                        {t(
                          'dashboard.admin.orderDetails.tableHeaders.location'
                        )}
                      </th>
                      <th
                        scope='col'
                        className='w-[10%] px-6 py-3 text-center text-sm font-bold text-gray-700 uppercase tracking-wider'
                      >
                        {t('dashboard.admin.orderDetails.tableHeaders.actions')}
                      </th>
                    </tr>
                  </thead>
                  <tbody className='divide-y divide-gray-200'>
                    {paginatedOrders.map((order) => (
                      <tr key={order.id} className='hover:bg-gray-50'>
                        <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900'>
                          {order.service}
                        </td>
                        <td className='px-6 py-4 whitespace-nowrap'>
                          <span
                            className={`inline-flex px-3 py-1 text-xs font-medium rounded-lg ${getStatusBadgeClass(
                              order.status
                            )}`}
                          >
                            {order.status}
                          </span>
                        </td>
                        <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900'>
                          {order.rating ? (
                            <div className='flex items-center gap-1'>
                              <AiFillStar className='w-5 h-5 text-yellow-400' />
                              <span>{order.rating} out of 5</span>
                            </div>
                          ) : (
                            <span className='text-rose-600'>No rating now</span>
                          )}
                        </td>
                        <td className='px-6 py-4 whitespace-nowrap'>
                          <div className='flex items-center gap-2'>
                            <div className='flex-1 h-2 bg-gray-200 rounded-full overflow-hidden'>
                              <div
                                className={`h-full rounded-full ${getProgressBarColor(
                                  order.progress
                                )}`}
                                style={{ width: `${order.progress}%` }}
                              />
                            </div>
                            <span className='text-sm font-medium text-gray-700 min-w-[40px]'>
                              {order.progress}%
                            </span>
                          </div>
                        </td>
                        <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900'>
                          {order.orderId}
                        </td>
                        <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
                          {order.location}
                        </td>
                        <td className='px-6 py-4 whitespace-nowrap text-center'>
                          <button className='text-green-500 hover:text-green-700 transition-colors'>
                            <FiLayers className='w-5 h-5 mx-auto' />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <Pagination
                currentPage={currentPage}
                totalItems={orderData?.orders.length || 0}
                itemsPerPage={itemsPerPage}
                onPageChange={(page) => setCurrentPage(page)}
                itemLabel='job'
                itemLabelPlural='jobs'
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderDetails;
