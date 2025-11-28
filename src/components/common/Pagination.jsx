import React from 'react';
import { useTranslation } from 'react-i18next';

const Pagination = ({
  currentPage = 1,
  totalItems = 0,
  itemsPerPage = 10,
  onPageChange,
}) => {
  const { t } = useTranslation();
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handlePreviousClick = () => {
    if (currentPage > 1) onPageChange(currentPage - 1);
  };

  const handleNextClick = () => {
    if (currentPage < totalPages) onPageChange(currentPage + 1);
  };

  // Show only 2 numbered buttons at once
  let startPage = currentPage;
  let endPage = Math.min(startPage + 1, totalPages);
  if (currentPage === totalPages && totalPages > 1) {
    startPage = totalPages - 1;
    endPage = totalPages;
  }

  const pages = [];
  for (let i = startPage; i <= endPage; i++) pages.push(i);

  return (
    <div className='px-4 md:px-6 py-3 md:py-4 bg-white border-t border-gray-200'>
      <div className='flex flex-col sm:flex-row items-center justify-between gap-3'>
        <div className='text-xs sm:text-sm text-gray-700 text-center sm:text-left order-2 sm:order-1'>
          {`${t('dashboard.fieldAgent.pagination.showing')} ${Math.min(
            currentPage * itemsPerPage,
            totalItems
          )} ${t('dashboard.fieldAgent.pagination.of')} ${totalItems} ${t(
            'dashboard.fieldAgent.pagination.users'
          )}`}
        </div>
        <div className='flex items-center space-x-1 order-1 sm:order-2'>
          <button
            onClick={handlePreviousClick}
            className='px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm text-gray-500 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap'
            disabled={currentPage === 1}
          >
            {t('dashboard.fieldAgent.pagination.previous')}
          </button>

          {pages.map((page) => (
            <button
              key={page}
              className={`px-2.5 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm font-medium rounded ${
                currentPage === page
                  ? 'bg-green-500 text-white'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
              onClick={() => onPageChange(page)}
            >
              {page}
            </button>
          ))}

          <button
            onClick={handleNextClick}
            className='px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm text-gray-500 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap'
            disabled={currentPage === totalPages}
          >
            {t('dashboard.fieldAgent.pagination.next')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Pagination;
