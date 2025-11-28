import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import axiosInstance from '../../../config/axiosConfig';
import LoadingSpinner from '../../common/LoadingSpinner';
import RevenueChart from '../charts/RevenueChart';
import BarChart from '../charts/BarChart';

const Reports = () => {
  const { t } = useTranslation();
  const [reportsData, setReportsData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReportsData = async () => {
      try {
        const response = await axiosInstance.get('/admin/data/reports.json');
        setReportsData(response.data);
      } catch (error) {
        console.error('Error fetching reports data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchReportsData();
  }, []);

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className='min-h-screen bg-[#fafffd] w-full'>
      <div className='w-full px-4 md:px-6 xl:px-11 py-3 lg:py-6'>
        {/* Page Header */}
        <div className='w-full max-w-[482px] flex flex-col justify-start items-start gap-1 mb-6 md:mb-8'>
          <div className="self-stretch justify-start text-White-950 text-xl md:text-2xl font-semibold font-['Poppins'] leading-7 md:leading-9">
            {t('reports.title')}
          </div>
          <div className="self-stretch justify-start text-White-800 text-sm md:text-base font-normal font-['Lato'] leading-normal">
            {t('reports.subtitle')}
          </div>
        </div>

        {/* Last 7 Days Revenue Chart */}
        {reportsData?.last7DaysRevenue && (
          <div className='mb-8'>
            <RevenueChart
              data={reportsData.last7DaysRevenue}
              title={t('reports.last7DaysRevenue')}
            />
          </div>
        )}

        {/* Monthly Revenue Chart */}
        {reportsData?.monthlyRevenue && (
          <div>
            <BarChart
              data={reportsData.monthlyRevenue}
              title={t('reports.monthlyRevenue')}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Reports;
