import React, { useState, useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { HiOutlineSearch } from 'react-icons/hi';
import axiosInstance from '../../../config/axiosConfig';
import { LoadingSpinner } from '../../common/LoadingSpinner';
import Pagination from '../../marketing/components/Pagination';
import DroneOperatorTable from './DroneOperatorTable';

const TABS = [
  { id: 'operator', labelKey: 'tabOperator' },
  { id: 'customer', labelKey: 'tabCustomer' },
  { id: 'employee', labelKey: 'tabEmployee' },
  { id: 'fieldAgent', labelKey: 'tabFieldAgent' },
];

const SUB_TABS = [
  { id: 'all', labelKey: 'subTabAll' },
  { id: 'pending', labelKey: 'subTabPending' },
];

const DroneOperator = () => {
  const { t } = useTranslation();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [activeTab, setActiveTab] = useState('operator');
  const [activeSubTab, setActiveSubTab] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axiosInstance.get(
          '/admin/data/droneOperators.json'
        );
        setData(response.data || []);
      } catch (err) {
        setError('Failed to fetch drone operators data.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const filteredData = useMemo(() => {
    return data
      .filter((operator) => {
        if (activeSubTab === 'pending') {
          return operator.status === 'pending';
        }
        return true;
      })
      .filter((operator) =>
        operator.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
  }, [data, activeSubTab, searchTerm]);

  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredData.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredData, currentPage, itemsPerPage]);

  const subTabCounts = useMemo(() => {
    const allCount = data.filter(
      (op) => op.status === 'approved' || op.status === 'pending'
    ).length;
    const pendingCount = data.filter((op) => op.status === 'pending').length;
    return { all: allCount, pending: pendingCount };
  }, [data]);

  if (error) {
    return <div className='text-center py-10 text-red-500'>{error}</div>;
  }

  return (
    <div className='w-full bg-[#fafffd] px-6 xl:px-11 py-3 lg:py-6'>
      {/* Top Level Tabs */}
      <div className='border-b border-gray-200'>
        <nav className='-mb-px flex space-x-8' aria-label='Tabs'>
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`${
                activeTab === tab.id
                  ? 'border-green-500 text-gray-900'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            >
              {t(`dashboard.admin.droneOperator.${tab.labelKey}`)}
            </button>
          ))}
        </nav>
      </div>

      <div className='mt-8 bg-white rounded-lg shadow-sm'>
        {/* Sub Tabs */}
        <div className='px-6 pt-4 border-b border-gray-200'>
          <nav className='-mb-px flex space-x-8' aria-label='Sub Tabs'>
            {SUB_TABS.map((subTab) => (
              <button
                key={subTab.id}
                onClick={() => {
                  setActiveSubTab(subTab.id);
                  setCurrentPage(1); // Reset page on tab change
                }}
                className={`${
                  activeSubTab === subTab.id
                    ? 'border-green-500 text-green-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } whitespace-nowrap py-3 px-1 border-b-2 font-medium text-sm flex items-center gap-2`}
              >
                <span>
                  {t(`dashboard.admin.droneOperator.${subTab.labelKey}`)}
                </span>
                <span className='bg-yellow-400 text-gray-800 text-xs font-semibold px-2 py-0.5 rounded-full'>
                  {subTabCounts[subTab.id]}
                </span>
              </button>
            ))}
          </nav>
        </div>

        {/* Search Bar */}
        <div className='p-4 border-b border-gray-200 flex justify-end'>
          <div className='relative'>
            <input
              type='text'
              placeholder={t('dashboard.admin.droneOperator.searchPlaceholder')}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className='pl-10 pr-4 py-2 border border-gray-300 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-green-500'
            />
            <HiOutlineSearch className='absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400' />
          </div>
        </div>

        {/* Table and Pagination */}
        {loading ? (
          <div className='flex justify-center items-center h-96'>
            <LoadingSpinner />
          </div>
        ) : (
          <>
            <DroneOperatorTable
              operators={paginatedData}
              activeSubTab={activeSubTab}
            />
            <Pagination
              currentPage={currentPage}
              totalItems={filteredData.length}
              itemsPerPage={itemsPerPage}
              onPageChange={(page) => setCurrentPage(page)}
              showingText={t('dashboard.admin.droneOperator.showing', {
                count: paginatedData.length,
                total: filteredData.length,
              })}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default DroneOperator;
