import { useState, useEffect, useMemo } from 'react';
import { FiPlus, FiCalendar, FiX } from 'react-icons/fi';
import ServiceRequestModal from './components/Modal/ServiceRequestModal';
import ResheduleServiceModal from './components/Modal/ResheduleServiceModal';
import CancleModal from './components/Modal/CancleModal';
import { useTranslation } from 'react-i18next';
import { CiSearch } from "react-icons/ci";
import { BiChevronDown } from 'react-icons/bi';
import axiosInstance from '../../../config/axiosConfig';
import { Link } from 'react-router-dom';
import Pagination from '../../common/Pagination';

const OrderManagementPage = () => {
  const [activities, setActivities] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isResheduleModalOpen, setIsResheduleModalOpen] = useState(false);
  const [cancleModal, setCancleModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [dropdownPositions, setDropdownPositions] = useState({});
  const [activeActionDropdown, setActiveActionDropdown] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 6;
  const { t } = useTranslation();

  // handle modals
  const handleCreateServiceModal = (formdata) => {
    console.log('Form data received in parent (Create):', formdata);
  };
  const handleResheduleModal = (formdata) => {
    console.log('Form data received in parent (Reschedule):', formdata);
  };
  const handleCancleModal = (formdata) => {
    console.log('Form data received in parent (Cancel):', formdata);
  };

  // handle active colors
  const getProgressColor = (progress) => {
    if (!progress) return 'bg-gray-100 text-gray-700';
    switch (progress.toLowerCase()) {
      case 'completed':
        return 'bg-[#28A844] text-white';
      case 'in progress':
        return 'bg-[#394C6B] text-white';
      case 'reschedule':
        return 'bg-[#FFC107] text-white';
      default:
        return 'bg-[#394C6B] text-white';
    }
  };

  // Toggle logic for progress dropdown
  const toggleDropdown = (index) => {
    if (activeDropdown === index) {
      setActiveDropdown(null);
    } else {
     
      let shouldOpenUp = false;

      if (paginatedActivities.length < 3) {
       
        shouldOpenUp = index === 1; 
      } else {
     
        shouldOpenUp = index >= paginatedActivities.length - 2;
      }

      setDropdownPositions((prev) => ({ ...prev, [index]: shouldOpenUp }));
      setActiveDropdown(index);
      setActiveActionDropdown(null);
    }
  };

  // Action Dropdown toggle
  const toggleActionDropdown = (index) => {
    if (activeActionDropdown === index) {
      setActiveActionDropdown(null);
    } else {
      
      let shouldOpenUp = false;

      if (paginatedActivities.length < 3) {
        shouldOpenUp = index === 1; 
      } else {
        shouldOpenUp = index >= paginatedActivities.length - 2; 
      }

      setDropdownPositions((prev) => ({ ...prev, [`action-${index}`]: shouldOpenUp }));
      setActiveActionDropdown(index);
      setActiveDropdown(null);
    }
  };


  const handleProgressChange = (index, newStatus) => {
    const activityIndex = (currentPage - 1) * ITEMS_PER_PAGE + index;
    const updatedActivities = [...activities];
    updatedActivities[activityIndex].progress = newStatus;
    setActivities(updatedActivities);
    setActiveDropdown(null);
  };

  // Fetch data
  useEffect(() => {
    const fetchActivities = async () => {
      try {
        setLoading(true);
        const response = await axiosInstance.get('/employee/data/order.json');
        const data = response.data.map(item => ({
          ...item,
          progress: item.progress || 'In Progress',
        }));
        setActivities(data || []);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching activities:', err);
        setError(err.message || 'Something went wrong');
        setLoading(false);
      }
    };
    fetchActivities();
  }, []);

  // Search and Filter Logic
  const filteredActivities = useMemo(() => {
    if (!searchQuery.trim()) return activities;
    const query = searchQuery.toLowerCase();
    return activities.filter(activity =>
      String(activity.orderId).toLowerCase().includes(query) ||
      activity.customerName.toLowerCase().includes(query) ||
      activity.serviceName.toLowerCase().includes(query) ||
      activity.location.toLowerCase().includes(query) ||
      activity.progress.toLowerCase().includes(query) ||
      activity.assignTo.toLowerCase().includes(query) ||
      activity.priority.toLowerCase().includes(query)
    );
  }, [searchQuery, activities]);

  // Paginated activities
  const paginatedActivities = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    const end = start + ITEMS_PER_PAGE;
    return filteredActivities.slice(start, end);
  }, [filteredActivities, currentPage]);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
    setActiveDropdown(null);
    setActiveActionDropdown(null);
  };

  // handle outside click
  useEffect(() => {
    const handleGlobalClick = (event) => {
      if (activeDropdown !== null) {
        const isDropdownButton = event.target.closest('.progress-dropdown-toggle');
        const isDropdownMenu = event.target.closest('.progress-dropdown-menu');
        if (!isDropdownButton && !isDropdownMenu) setActiveDropdown(null);
      }
      if (activeActionDropdown !== null) {
        const isActionButton = event.target.closest('.action-dropdown-toggle');
        const isActionMenu = event.target.closest('.action-dropdown-menu');
        if (!isActionButton && !isActionMenu) setActiveActionDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleGlobalClick);
    return () => document.removeEventListener('mousedown', handleGlobalClick);
  }, [activeDropdown, activeActionDropdown]);

  return (
    <div className="flex-1 p-4 md:px-12 bg-[#fafffd] min-h-screen">
      <div className="mb-2 md:mb-4">
        <h1 className="text-xl md:text-3xl font-bold text-gray-900 mb-2">
          {t('dashboard.employee.title.orderPageTitle')}
        </h1>
        <p className="text-sm md:text-base text-gray-600 pt-2">
          {t('dashboard.employee.subTitle.orderpageSub')}
        </p>
      </div>

      {/* Buttons */}
      <div className="flex flex-wrap sm:flex-nowrap gap-2 md:gap-3 mb-2 md:mb-8">
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center justify-center w-full sm:w-auto px-4 md:px-6 py-2 bg-[#28A844] text-white rounded-lg hover:bg-green-600 font-medium text-sm md:text-base"
        >
          <FiPlus className="inline-block w-5 h-5 md:w-6 md:h-6 mr-1" />
          {t('dashboard.employee.button.createServiceRequest')}
        </button>
       
      </div>

      {/* Table Card */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200" id="order-table-container">
        <div className="p-4 md:p-6 border-b border-gray-200 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <h2 className="text-lg md:text-xl font-bold text-gray-900">
            {t('dashboard.employee.table.recentCustomer')}
          </h2>
          {/* Search Field */}
          <div className="relative w-full sm:w-2/3 md:w-1/2 lg:w-1/3">
            <span className="absolute inset-y-0 left-3 flex items-center text-gray-400 text-xl md:text-2xl">
              <CiSearch />
            </span>
            <input
              type="text"
              placeholder={t('dashboard.employee.table.searchField')}
              value={searchQuery}
              onChange={handleSearch}
              className="w-full pl-10 pr-4 py-2 sm:py-3 border border-[#C2C2C2] rounded-lg sm:rounded-xl focus:outline-none focus:ring-2 focus:ring-black/70 text-sm sm:text-base"
            />
          </div>
        </div>

        {loading && <div className="p-4 text-gray-700">Loading...</div>}
        {error && <div className="p-4 text-red-600">{error}</div>}

        {!loading && !error && (
          <>
            <div className="overflow-x-auto">
              <table className="w-full min-w-max">
                <thead className="bg-[#F5F7FA] border-b h-18 border-gray-200">
                  <tr>
                    <th className="px-3 md:px-6 py-3 text-left text-sm font-medium text-gray-700 uppercase whitespace-nowrap">{t('dashboard.employee.table.orderIdName')}</th>
                    <th className="px-3 md:px-6 py-3 text-left text-sm font-medium text-gray-700 uppercase whitespace-nowrap">{t('dashboard.employee.table.serviceName')}</th>
                    <th className="px-3 md:px-6 py-3 text-left text-sm font-medium text-gray-700 uppercase whitespace-nowrap">{t('dashboard.employee.table.location')}</th>
                    <th className="px-3 md:px-6 py-3 text-left text-sm font-medium text-gray-700 uppercase whitespace-nowrap">{t('dashboard.employee.table.assignTo')}</th>
                    <th className="px-3 md:px-6 py-3 text-left text-sm font-medium text-gray-700 uppercase whitespace-nowrap">{t('dashboard.employee.table.progress')}</th>
                    <th className="px-3 md:px-6 py-3 text-left text-sm font-medium text-gray-700 uppercase whitespace-nowrap">{t('dashboard.employee.table.priority')}</th>
                    <th className="px-3 md:px-6 py-3 text-left text-sm font-medium text-gray-700 uppercase whitespace-nowrap">{t('dashboard.employee.table.action')}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {paginatedActivities.length > 0 ? (
                    paginatedActivities.map((activity, index) => {
                      const dropdownIndex = index;
                      const isDropdownUp = dropdownPositions?.[dropdownIndex] || false;
                      return (
                        <tr key={dropdownIndex} className="hover:bg-gray-50">
                          {/* Order & Customer */}
                          <td className="px-3 md:px-6 py-4">
                            <div className="flex items-center gap-2 md:gap-3">
                              <div className="min-w-0">
                                <div className="font-medium text-gray-900 text-sm md:text-base whitespace-nowrap">{activity.orderId}</div>
                                <div className="text-xs md:text-sm text-gray-500 whitespace-nowrap">{activity.customerName}</div>
                              </div>
                            </div>
                          </td>
                          {/* Service */}
                          <td className="px-3 md:px-6 py-4">
                            <div className="text-xs md:text-sm text-gray-900 whitespace-nowrap">{activity.serviceName}</div>
                            <div className="text-xs md:text-sm text-gray-500 whitespace-nowrap">{activity.date}</div>
                          </td>
                          {/* Location */}
                          <td className="px-3 md:px-6 py-4 text-xs md:text-sm text-gray-900 whitespace-nowrap">{activity.location}</td>
                          {/* Assign */}
                          <td className="px-3 md:px-6 py-4">
                            <span className={`inline-flex px-2 md:px-3 py-1 rounded-full text-xs md:text-sm whitespace-nowrap ${activity.assignTo === 'Unassigned'
                              ? 'bg-red-100 text-red-700'
                              : 'bg-green-100 text-green-700'
                              }`}>
                              {activity.assignTo}
                            </span>
                          </td>
                          {/* Progress Dropdown */}
                          <td className="px-3 md:px-6 py-4 relative">
                            <div className='relative inline-block w-40'>
                              <button
                                onClick={() => toggleDropdown(dropdownIndex)}
                                className={`flex justify-between items-center w-full px-3 py-1.5 rounded-lg text-xs md:text-sm font-medium whitespace-nowrap transition-colors border progress-dropdown-toggle ${getProgressColor(activity.progress)}`}
                              >
                                <span>{activity.progress}</span>
                                <BiChevronDown
                                  className={`ml-1 w-6 h-6 transition-transform duration-200 ${activeDropdown === dropdownIndex ? 'rotate-180' : ''}`}
                                />
                              </button>

                              {activeDropdown === dropdownIndex && (
                                <div
                                  className={`absolute left-0 w-full bg-white border border-gray-200 rounded-lg shadow-lg z-50 progress-dropdown-menu overflow-hidden ${isDropdownUp ? 'bottom-full mb-1' : 'top-full mt-1'}`}
                                >
                                  {['In Progress', 'Completed', 'Reschedule'].map((status) => (
                                    <button
                                      key={status}
                                      onClick={() => handleProgressChange(index, status)}
                                      className={`w-full text-left px-4 py-2 text-sm transition-colors duration-150 ${status === activity.progress ? 'bg-[#28A844] text-white font-semibold' : 'text-gray-700 hover:bg-gray-100'}`}
                                    >
                                      {status}
                                    </button>
                                  ))}
                                </div>
                              )}
                            </div>
                          </td>
                          {/* Priority */}
                          <td className="px-3 md:px-6 py-4">
                            <span className={`inline-flex px-2 md:px-3 py-1 rounded-full text-xs md:text-sm font-medium whitespace-nowrap ${activity.priority === 'High' ? 'text-[#DC3545] bg-[#FCEBEC]' :
                              activity.priority === 'Medium' ? 'text-[#FFC107] bg-[#FFF9E6]' :
                                'text-[#28A844] bg-[#EAF6EC]'
                              }`}>
                              {activity.priority}
                            </span>
                          </td>
                          {/* Action Dropdown */}
                          <td className="px-3 md:px-6 py-4 text-xs md:text-sm relative">
                            <div className="relative inline-block">
                              <button
                                onClick={() => toggleActionDropdown(dropdownIndex)}
                                className="text-gray-600 hover:text-gray-900 text-2xl action-dropdown-toggle"
                              >
                                <BiChevronDown
                                  className={`w-5 h-5  md:w-8 md:h-7 transition-transform duration-200 ${activeActionDropdown === dropdownIndex ? 'rotate-180' : ''}`}
                                />
                              </button>

                              {activeActionDropdown === dropdownIndex && (
                                <div
                                  className={`absolute right-0 w-40 bg-white border border-gray-200 rounded-lg shadow-lg z-50 action-dropdown-menu overflow-hidden ${dropdownPositions[`action-${dropdownIndex}`] ? 'bottom-full mb-1' : 'top-full mt-1'}`}
                                >
                                  <Link to={`/employee/customers/${activity.id}`}>
                                    <button className="block w-full text-left px-4 py-2 text-gray-700 text-sm hover:bg-[#28A844] hover:text-[#FFFFFF] transition-colors border-t border-gray-100">
                                      See details
                                    </button>
                                  </Link>
                                  <button
                                    onClick={() => { setIsResheduleModalOpen(true); setActiveActionDropdown(null); }}
                                    className="block w-full text-left px-4 py-2 text-gray-700 text-sm hover:bg-[#28A844] hover:text-[#FFFFFF]  transition-colors border-t border-gray-100"
                                  >
                                    Reschedule
                                  </button>
                                  <button
                                    onClick={() => { setCancleModal(true); setActiveActionDropdown(null); }}
                                    className="block w-full text-left px-4 py-2 text-gray-700 text-sm hover:bg-[#28A844] hover:text-[#FFFFFF] transition-colors border-t border-gray-100"
                                  >
                                    Cancel
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
                      <td colSpan="7" className="text-center p-4 text-gray-500">
                        No results found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <Pagination
              currentPage={currentPage}
              totalItems={filteredActivities.length}
              itemsPerPage={ITEMS_PER_PAGE}
              onPageChange={(page) => setCurrentPage(page)}
              itemLabel="Order"
              itemLabelPlural="Orders"
            />
          </>
        )}
      </div>

      {/* Modals */}
      <ServiceRequestModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onSubmit={handleCreateServiceModal} />
      <ResheduleServiceModal isOpen={isResheduleModalOpen} onClose={() => setIsResheduleModalOpen(false)} onSubmit={handleResheduleModal} />
      <CancleModal isOpen={cancleModal} onClose={() => setCancleModal(false)} onSubmit={handleCancleModal} />
    </div>
  );
};

export default OrderManagementPage;
