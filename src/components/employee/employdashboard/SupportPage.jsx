import React, { useState, useEffect, useMemo, useRef } from 'react';
import { TrendingUp, TrendingDown, Plus } from 'lucide-react';
import { GrUserSettings } from 'react-icons/gr';
import { CiSearch } from 'react-icons/ci';
import { BiChevronDown } from 'react-icons/bi';
import { BsCalendar3 } from 'react-icons/bs';
import CreateTicketModal from './components/Modal/CreateTicketModal';
import EscalateTicketModal from './components/Modal/EscalateTicketModal';
import ManageTicketModal from './components/Modal/ManageTicketModal';
import { useTranslation } from 'react-i18next';
import axiosInstance from '../../../config/axiosConfig';
import Pagination from '../../common/Pagination';
import { Link } from 'react-router-dom';
import { RiResetLeftFill } from "react-icons/ri";

const SupportPage = () => {
  const [showCreate, setShowCreate] = useState(false);
  const [showEscalate, setShowEscalate] = useState(false);
  const [showManageModal, setShowManageModal] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [supportData, setSupportData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [dropdownPositions, setDropdownPositions] = useState({});
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const fromDateRef = useRef(null);
  const toDateRef = useRef(null);
  const { t } = useTranslation();
  const ITEMS_PER_PAGE = 6;

  // Stats managed in component
  const stats = [
    {
      label: t('dashboard.employee.pages.dashboard.card.openTickets'),
      value: "23",
      change: "+2% vs last month",
      subtext: null,
      trend: "up"
    },
    {
      label: t('dashboard.employee.pages.dashboard.card.inProgress'),
      value: "15",
      change: null,
      subtext: "Average response 2h",
      trend: null
    },
    {
      label: t('dashboard.employee.pages.dashboard.card.resolvedToday'),
      value: "34",
      change: "+18% from last month",
      subtext: null,
      trend: "up"
    },
    {
      label: t('dashboard.employee.pages.dashboard.card.escalated'),
      value: "5",
      change: null,
      subtext: "Awaiting tech team",
      trend: null
    }
  ];

  // Fetch data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get('/employee/data/support.json');
        const data = response.data;

        const supportWithDate = data.supportData.map((item) => ({
          ...item,
          date: item.date || new Date().toLocaleDateString('en-GB'),
        }));

        setSupportData(supportWithDate);
      } catch (error) {
        console.error('Error fetching support data:', error);
      }
    };

    fetchData();
  }, []);

  // Improved Search and Date Filter Logic
  const filteredData = useMemo(() => {
    let filtered = supportData;

    // Apply search filter
    if (searchQuery.trim()) {
      const query = searchQuery.trim().toLowerCase();
      filtered = filtered.filter((item) => {
        return ['serviceName', 'issues', 'progress', 'priority'].some((key) => {
          return item[key]?.toString().toLowerCase().includes(query);
        });
      });
    }

    // Apply date range filter
    if (fromDate || toDate) {
      filtered = filtered.filter((item) => {
        if (!item.date) return false;

        // Parse the date from DD/MM/YYYY format
        const [day, month, year] = item.date.split('/').map(Number);
        const itemDate = new Date(year, month - 1, day);

        // Create comparison dates
        const from = fromDate ? new Date(fromDate) : null;
        const to = toDate ? new Date(toDate) : null;

        // Check if item date is within range
        if (from && to) {
          return itemDate >= from && itemDate <= to;
        } else if (from) {
          return itemDate >= from;
        } else if (to) {
          return itemDate <= to;
        }
        return true;
      });
    }

    return filtered;
  }, [supportData, searchQuery, fromDate, toDate]);

  // Pagination Slice
  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredData.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredData, currentPage]);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };


  const toggleDropdown = (index) => {
    if (activeDropdown === index) {
      setActiveDropdown(null);
    } else {
      let shouldOpenUp = false;

      if (paginatedData.length < 3) {

        shouldOpenUp = index === 1;
      } else {

        shouldOpenUp = index >= paginatedData.length - 2;
      }

      setDropdownPositions((prev) => ({ ...prev, [index]: shouldOpenUp }));
      setActiveDropdown(index);
    }
  };

  const handleManageTicket = () => {
    setShowManageModal(true);
    setActiveDropdown(null);
  };

  const getProgressColor = (progress) => {
    switch (progress) {
      case 'Completed': return 'bg-[#EAF6EC] text-[#24963E]';
      case 'Processed': return 'bg-blue-100 text-blue-700';
      case 'Pending': return 'bg-yellow-100 text-yellow-700';
      case 'Escalated': return 'bg-orange-100 text-orange-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'High': return 'text-[#DC3545] bg-[#FCEBEC]';
      case 'Medium': return 'text-[#FFC107] bg-[#FFF9E6]';
      case 'Low': return 'text-[#28A844] bg-[#EAF6EC]';
      default: return 'text-gray-600';
    }
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleGlobalClick = (event) => {
      if (activeDropdown !== null) {
        const isDropdownButton = event.target.closest('.dropdown-toggle-button');
        const isDropdownMenu = event.target.closest('.dropdown-menu-content');
        if (!isDropdownButton && !isDropdownMenu) setActiveDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleGlobalClick);
    return () => document.removeEventListener('mousedown', handleGlobalClick);
  }, [activeDropdown]);

  return (
    <div className='flex-1 p-4 md:px-12 bg-[#fafffd] min-h-screen'>
      {/* Header */}
      <div className='mb-4 md:mb-6'>
        <h1 className='text-xl md:text-3xl font-bold text-[#002244] mb-2'>
          {t('dashboard.employee.title.supportPageTitle')}
        </h1>
        <p className='text-xs md:text-base text-[#464646]'>
          {t('dashboard.employee.subTitle.supportpageSub')}
        </p>
      </div>

      {/* Buttons */}
      <div className='flex flex-col sm:flex-row gap-2 md:gap-3 mb-4'>
        <button
          onClick={() => setShowCreate(true)}
          className='px-4 md:px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 font-medium text-sm md:text-base flex items-center justify-center'
        >
          <Plus className='w-5 h-5 mr-2' /> {t('dashboard.employee.button.supportCreateTicket')}
        </button>
        <button
          onClick={() => setShowEscalate(true)}
          className='px-4 md:px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-700 font-medium text-sm md:text-base flex items-center justify-center'
        >
          <GrUserSettings className='w-5 h-5 mr-2' /> {t('dashboard.employee.button.supportEscalate')}
        </button>
      </div>
      {/* Filter by date range */}
      <style>
        {`
          input[type="date"]::-webkit-calendar-picker-indicator {
            opacity: 0;
            position: absolute;
            right: 0;
            width: 100%;
            height: 100%;
            cursor: pointer;
          }
        `}
      </style>
      <div className='flex flex-col sm:flex-row mb-4 gap-3'>
        <div className='flex flex-col w-full sm:w-auto'>
          <label className='text-sm font-medium text-gray-700 mb-1'>{t('dashboard.employee.button.from')}</label>
          <div className='relative'>
            <input
              ref={fromDateRef}
              type="date"
              value={fromDate}
              onChange={(e) => {
                setFromDate(e.target.value);
                setCurrentPage(1);
              }}
              className='w-full p-3 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500'
            />
            <BsCalendar3
              className='absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-lg pointer-events-none'
            />
          </div>
        </div>
        <div className='flex flex-col w-full sm:w-auto'>
          <label className='text-sm font-medium text-gray-700 mb-1'>{t('dashboard.employee.button.to')}</label>
          <div className='relative'>
            <input
              ref={toDateRef}
              type="date"
              value={toDate}
              onChange={(e) => {
                setToDate(e.target.value);
                setCurrentPage(1);
              }}
              className='w-full p-3 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500'
            />
            <BsCalendar3
              className='absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-lg pointer-events-none'
            />
          </div>
        </div>
        {(fromDate || toDate) && (
          <div className='flex items-end'>
            <button
              onClick={() => {
                setFromDate('');
                setToDate('');
                setCurrentPage(1);
              }}
              className='px-4 py-4 border-gray-200 border text-gray-700 rounded-lg hover:bg-gray-300 font-medium text-sm whitespace-nowrap'
            >
              <RiResetLeftFill className='inline-block mr-1 text-xl' />
              {t('dashboard.employee.button.clearDates')}
            </button>
          </div>
        )}
      </div>

      {/* Stats */}
      <div className='grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 mb-4 md:mb-6'>
        {stats.map((stat, index) => {
          const bottomContent = stat.change || stat.subtext;
          return (
            <div key={index} className='bg-white p-3 md:p-4 rounded-lg shadow-sm border border-gray-200'>
              <div className='flex items-start justify-between mb-2 md:mb-3'>
                <span className='text-gray-600 text-xs md:text-sm'>{stat.label}</span>
              </div>
              <div className='text-xl md:text-2xl font-bold text-gray-900 mb-1 md:mb-2'>{stat.value}</div>
              {bottomContent && (
                <div className={`text-xs md:text-sm flex items-center gap-1 ${stat.change ? (stat.trend === 'up' ? 'text-green-600' : 'text-red-600') : 'text-gray-500'}`}>
                  {stat.change && stat.trend === 'up' && <TrendingUp className='w-4 h-4' />}
                  {stat.change && stat.trend !== 'up' && <TrendingDown className='w-4 h-4' />}
                  {bottomContent}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Table */}
      <div className='bg-white rounded-lg shadow-sm border border-gray-200' id="support-table-container">
        <div className='p-4 md:p-6 border-b border-gray-200 flex flex-col md:flex-row md:items-center justify-between gap-4'>
          <h2 className='text-lg md:text-xl font-bold text-gray-900'>{t('dashboard.employee.table.customerSupportActivity')}</h2>
          <div className='relative w-full md:w-1/2 lg:w-1/3'>
            <span className='absolute inset-y-0 left-3 flex items-center text-gray-400 text-xl'><CiSearch /></span>
            <input
              type="text"
              placeholder={t('dashboard.employee.table.searchField')}
              value={searchQuery}
              onChange={handleSearch}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-black/70 text-base"
              style={{ textTransform: 'none' }}
            />

          </div>
        </div>

        <div className='overflow-x-auto'>
          <table className='min-w-full table-fixed'>
            <thead className='bg-[#F5F7FA] border-b h-18 border-gray-200'>
              <tr>
                <th className='px-3 md:px-6 py-3 text-left text-sm font-medium text-gray-700 uppercase whitespace-nowrap'>{t('dashboard.employee.table.serviceName')}</th>
                <th className='px-3 md:px-6 py-3 text-left text-sm font-medium text-gray-700 uppercase whitespace-nowrap'>{t('dashboard.employee.table.issues')}</th>
                <th className='px-3 md:px-6 py-3 text-left text-sm font-medium text-gray-700 uppercase whitespace-nowrap'>{t('dashboard.employee.table.date')}</th>
                <th className='px-3 md:px-6 py-3 text-left text-sm font-medium text-gray-700 uppercase whitespace-nowrap'>{t('dashboard.employee.table.progress')}</th>
                <th className='px-3 md:px-6 py-3 text-left text-sm font-medium text-gray-700 uppercase whitespace-nowrap'>{t('dashboard.employee.table.priority')}</th>
                <th className='px-3 md:px-6 py-3 text-left text-sm font-medium text-gray-700 uppercase whitespace-nowrap'>{t('dashboard.employee.table.action')}</th>
              </tr>
            </thead>
            <tbody className='divide-y divide-gray-200'>
              {paginatedData.length > 0 ? (
                paginatedData.map((item, index) => {
                  const dropdownIndex = index;
                  // eslint-disable-next-line no-unused-vars
                  const isNearBottom = dropdownIndex >= ITEMS_PER_PAGE - 2;

                  return (
                    <tr key={dropdownIndex} className='hover:bg-gray-50'>
                      <td className='px-3 md:px-6 py-4'>
                        <div className='font-medium text-gray-900 text-sm md:text-base'>{item.serviceName}</div>
                        <div className='text-xs md:text-sm text-gray-500'>{item.name}</div>
                      </td>
                      <td className='px-3 md:px-6 py-4 text-xs md:text-base text-gray-900'>{item.issues}</td>
                      <td className='px-3 md:px-6 py-4 text-xs md:text-base text-gray-900 whitespace-nowrap'>{item.date}</td>
                      <td className='px-3 md:px-6 py-4'>
                        <span className={`inline-flex px-2 md:px-3 py-1 rounded-full text-xs md:text-sm ${getProgressColor(item.progress)}`}>{item.progress}</span>
                      </td>
                      <td className='px-3 md:px-6 py-4 text-xs md:text-sm whitespace-nowrap'>
                        <span className={`font-medium inline-flex px-2 md:px-3 py-1 rounded-full text-xs md:text-sm whitespace-nowrap ${getPriorityColor(item.priority)}`}>{item.priority}</span>
                      </td>
                      <td className='px-3 md:px-6 py-4 text-xs md:text-sm relative'>
                        <div className='relative inline-block'>
                          <button
                            onClick={() => toggleDropdown(dropdownIndex)}
                            className='text-2xl dropdown-toggle-button'
                          >
                            <BiChevronDown className={`transition-transform duration-200 ${activeDropdown === dropdownIndex ? 'rotate-180' : ''}`} />
                          </button>

                          {activeDropdown === dropdownIndex && (
                            <div
                              className={`absolute right-0 w-48 bg-white border border-gray-200 rounded shadow-lg z-50 dropdown-menu-content`}
                              style={{
                                top: dropdownPositions[dropdownIndex] ? 'auto' : '100%',
                                bottom: dropdownPositions[dropdownIndex] ? '100%' : 'auto',
                                marginTop: dropdownPositions[dropdownIndex] ? '0' : '0.25rem',
                                marginBottom: dropdownPositions[dropdownIndex] ? '0.25rem' : '0',
                              }}
                            >
                              <Link to={`/employee/customers/${item.id}`}>
                                <button className="block w-full text-left px-4 py-2 text-gray-700 text-sm hover:bg-[#28A844] hover:text-[#FFFFFF] transition-colors border-t border-gray-100">
                                  {t('dashboard.employee.button.seeDetails')}
                                </button>
                              </Link>
                              <button
                                onClick={handleManageTicket}
                                className="block w-full text-left px-4 py-2 text-gray-700 text-sm hover:bg-green-600 hover:text-white transition-colors"
                              >
                                {t('dashboard.employee.button.manageTicket')}
                              </button>
                              <button
                                onClick={() => {
                                  setShowEscalate(true);
                                  setActiveDropdown(null);
                                }}
                                className="block w-full text-left px-4 py-2 text-gray-700 text-sm hover:bg-green-600 hover:text-white transition-colors border-t border-gray-100"
                              >
                                {t('dashboard.employee.button.escalate')}
                              </button>
                            </div>
                          )}

                        </div>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan='6' className='text-center py-6 text-gray-500'>
                    No matching records found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <Pagination
          currentPage={currentPage}
          totalItems={filteredData.length}
          itemsPerPage={ITEMS_PER_PAGE}
          onPageChange={setCurrentPage}
        />
      </div>

      <CreateTicketModal isOpen={showCreate} onClose={() => setShowCreate(false)} />
      <EscalateTicketModal isOpen={showEscalate} onClose={() => setShowEscalate(false)} />
      <ManageTicketModal
        isOpen={showManageModal}
        onClose={() => setShowManageModal(false)}
        onSubmit={async (formData) => {
          const response = await fetch('/api/tickets/update', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData),
          });
          if (!response.ok) throw new Error('Update failed');
          return response.json();
        }}
      />
    </div>
  );
};

export default SupportPage;
