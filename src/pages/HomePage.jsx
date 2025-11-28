import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import SmoothScroll from '../components/utility/SmoothScroll';

const HomePage = () => {
  const { t } = useTranslation();

  return (
    <SmoothScroll>
      <div className='min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 w-full'>
        {/* Hero Section */}
        <div className='flex flex-col items-center justify-center min-h-[70vh] text-center w-full px-8 lg:px-16'>
          <div className='w-full'>
            <h1 className='text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6'>
              {t('home.title')}
            </h1>
            <p className='text-lg sm:text-xl lg:text-2xl text-gray-600 mb-8'>
              {t('home.subtitle')}
            </p>
            <div className='flex flex-col sm:flex-row gap-4 justify-center items-center'>
              <Link
                to='/login'
                className='w-full sm:w-auto bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
                style={{ color: 'white' }}
              >
                {t('navigation.getStarted')}
              </Link>
              <Link
                to='/dashboard'
                className='w-full sm:w-auto bg-white text-gray-800 px-8 py-4 rounded-lg font-semibold hover:bg-gray-50 transition-colors shadow-lg hover:shadow-xl border border-gray-200'
              >
                {t('navigation.goToDashboard')}
              </Link>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className='bg-white py-16 px-8 lg:px-16 w-full'>
          <div className='w-full'>
            <div className='text-center mb-12'>
              <h2 className='text-3xl font-bold text-gray-900 mb-4'>
                {t('home.roleBasedAccess')}
              </h2>
              <p className='text-lg text-gray-600'>
                {t('home.roleBasedDescription')}
              </p>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
              <div className='text-center p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl'>
                <div className='bg-blue-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4'>
                  <svg
                    className='w-8 h-8 text-white'
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253'
                    />
                  </svg>
                </div>
                <h3 className='text-xl font-bold text-gray-900 mb-2'>
                  {t('roles.admin')}
                </h3>
                <p className='text-gray-600'>{t('roles.adminDescription')}</p>
              </div>

              <div className='text-center p-6 bg-gradient-to-br from-teal-50 to-teal-100 rounded-xl'>
                <div className='bg-teal-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4'>
                  <svg
                    className='w-8 h-8 text-white'
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z'
                    />
                  </svg>
                </div>
                <h3 className='text-xl font-bold text-gray-900 mb-2'>
                  {t('roles.marketing')}
                </h3>
                <p className='text-gray-600'>
                  {t('roles.marketingDescription')}
                </p>
              </div>

              <div className='text-center p-6 bg-gradient-to-br from-sky-50 to-sky-100 rounded-xl'>
                <div className='bg-sky-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4'>
                  <svg
                    className='w-8 h-8 text-white'
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z'
                    />
                  </svg>
                </div>
                <h3 className='text-xl font-bold text-gray-900 mb-2'>
                  {t('roles.employee')}
                </h3>
                <p className='text-gray-600'>
                  {t('roles.employeeDescription')}
                </p>
              </div>

              <div className='text-center p-6 bg-gradient-to-br from-amber-50 to-amber-100 rounded-xl'>
                <div className='bg-amber-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4'>
                  <svg
                    className='w-8 h-8 text-white'
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z'
                    />
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M15 11a3 3 0 11-6 0 3 3 0 016 0z'
                    />
                  </svg>
                </div>
                <h3 className='text-xl font-bold text-gray-900 mb-2'>
                  {t('roles.fieldAgent')}
                </h3>
                <p className='text-gray-600'>
                  {t('roles.fieldAgentDescription')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SmoothScroll>
  );
};

export default HomePage;
