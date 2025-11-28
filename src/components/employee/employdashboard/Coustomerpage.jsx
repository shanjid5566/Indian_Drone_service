import { useEffect, useState, useRef } from 'react';
import { BiChevronDown } from 'react-icons/bi';
import { LuEye } from 'react-icons/lu';
import { Link } from 'react-router-dom';
import axiosInstance from '../../../config/axiosConfig';
import { useTranslation } from 'react-i18next';
import RegistrationModal from './components/Modal/RegistrationModal';

import Pagination from '../../common/Pagination';
import ProfileSetupModal from './components/Modal/ProfileSetupModal';
const Coustomerpage = () => {
  const [open, setOpen] = useState(false);
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  
  const [activeDropdown, setActiveDropdown] = useState(null);
  const[profileModal,setProfileModal]=useState(false);
  const [dropdownPositions, setDropdownPositions] = useState({});
  const buttonRefs = useRef({});

  const { t } = useTranslation();
  const itemsPerPage = 6;


  

  useEffect(() => {
    const fetchCustomerData = async () => {
      try {
        setLoading(true);
        const response = await axiosInstance.get(
          '/employee/data/customerManagementData.json'
        );
        const data = response.data;
        setActivities(
          data.customers.map((customer) => ({
            id: customer.id,
            name: customer.serviceName,
            company: customer.company,
            contact: customer.contact,
            phone: customer.phone,
            location: 'Gujrat, India',
            server: 'Unassigned',
            progress: 'In Progress',
            priority: 'Medium',
            avatar: customer.serviceName
              .split(' ')
              .map((w) => w[0])
              .join('')
              .toUpperCase(),
          }))
        );
      } catch (err) {
        setError(err.message || 'Failed to load customer data');
      } finally {
        setLoading(false);
      }
    };
    fetchCustomerData();
  }, []);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedActivities = activities.slice(
    startIndex,
    startIndex + itemsPerPage
  );

const toggleDropdown = (index) => {
  if (activeDropdown === index) {
    setActiveDropdown(null);
  } else {
    let shouldOpenUp = false;

    if (paginatedActivities.length < 3) {
      // For 1 or 2 rows
      shouldOpenUp = index === 1; // 2nd row opens upward
    } else {
      // Normal logic for 3+ rows
      shouldOpenUp = index >= paginatedActivities.length - 2;
    }

    setDropdownPositions((prev) => ({ ...prev, [index]: shouldOpenUp }));
    setActiveDropdown(index);
  }
};

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        activeDropdown !== null &&
        buttonRefs.current[activeDropdown] &&
        !buttonRefs.current[activeDropdown].contains(event.target)
      ) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [activeDropdown]);

  const handleProgressChange = (actualIndex, status) => {
    setActivities((prev) => {
      const updated = [...prev];
      updated[actualIndex].progress = status;
      return updated;
    });
    setActiveDropdown(null);
  };

  const getProgressColor = (progress) => {
    switch (progress) {
      case 'In Progress':
        return 'bg-[#394C6B] text-white';
      case 'Completed':
        return 'bg-[#28A844] text-white';
      case 'Reschedule':
        return 'bg-[#FFC107] text-white';
      default:
        return 'bg-[#394C6B] text-white';
    }
  };

  if (loading)
    return (
      <div className="p-8 text-center text-gray-600 font-medium">
        Loading customers...
      </div>
    );
  if (error)
    return (
      <div className="p-8 text-center text-red-500 font-medium">{error}</div>
    );

  return (
    <div className="flex-1 p-4 md:px-12">
      {/* Header */}
      <div className="mb-6 md:mb-8">
        <h1 className="text-xl md:text-3xl font-bold text-[#002244] mb-2">
          {t('dashboard.employee.title.customPageTitle')}
        </h1>
        <p className="text-sm md:text-base text-[#464646]">
          {t('dashboard.employee.subTitle.custompageSub')}
        </p>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        {/* Top Buttons */}
        <div className="p-4 md:p-6 border-b border-gray-200">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <h2 className="text-lg md:text-xl font-bold text-gray-900">
              {t('dashboard.employee.table.tableTitle')}
            </h2>
            <div className="flex flex-col sm:flex-row gap-2 md:gap-3">
              <button
                onClick={() => setOpen(true)}
                className="px-4 md:px-6 py-2 bg-[#28A844] text-white rounded-lg hover:bg-green-600 font-medium text-sm md:text-base"
              >
                {t('dashboard.employee.button.registerNewCustomer')}
              </button>
                <button onClick={() => setProfileModal(true)} className="px-4 md:px-6 py-2 bg-[#FFC107] text-white rounded-lg hover:bg-yellow-500 font-medium text-sm md:text-base">
              {t('dashboard.employee.button.assistProfile')}
            </button>
              <Link to="/employee/customers/report-analysis">
                <button className="px-4 w-full md:px-6 py-2 bg-[#DC3545] text-white rounded-lg hover:bg-[#DC3545] font-medium text-sm md:text-base">
                  {t('dashboard.employee.button.reportAnalysis')}
                </button>
              </Link>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full min-w-max">
            <thead className="bg-[#F5F7FA] border-b h-18 border-gray-200 ">
              <tr>
                <th className="px-3 md:px-6 py-3 text-left text-sm font-medium text-gray-700 uppercase whitespace-nowrap">
                  {t('dashboard.employee.table.serviceName')}
                </th>
                <th className="px-3 md:px-6 py-3 text-left text-sm font-medium text-gray-700 uppercase whitespace-nowrap">
                  {t('dashboard.employee.table.contact')}
                </th>
                <th className="px-3 md:px-6 py-3 text-left text-sm font-medium text-gray-700 uppercase whitespace-nowrap">
                  {t('dashboard.employee.table.location')}
                </th>
                <th className="px-3 md:px-6 py-3 text-left text-sm font-medium text-gray-700 uppercase whitespace-nowrap">
                  {t('dashboard.employee.table.served')}
                </th>
                <th className="px-3 md:px-6 py-3 text-left text-sm font-medium text-gray-700 uppercase whitespace-nowrap">
                  {t('dashboard.employee.table.progress')}
                </th>
                <th className="px-3 md:px-6 py-3 text-left text-sm font-medium text-gray-700 uppercase whitespace-nowrap">
                  {t('dashboard.employee.table.priority')}
                </th>
                <th className="px-3 md:px-6 py-3 text-left text-sm font-medium text-gray-700 uppercase whitespace-nowrap">
                  {t('dashboard.employee.table.action')}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {paginatedActivities.map((activity, index) => {
                const actualIndex = activities.findIndex((a) => a.id === activity.id);
                return (
                  <tr key={activity.id} className="hover:bg-gray-50">
                    {/* Service Name */}
                    <td className="px-3 md:px-6 py-4">
                      <div className="flex items-center gap-2 md:gap-3">
                        <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-gray-300 flex items-center justify-center text-gray-700 font-medium text-xs md:text-sm">
                          {activity.avatar}
                        </div>
                        <div className="min-w-0">
                          <div className="font-medium text-gray-900 text-sm md:text-base whitespace-nowrap">
                            {activity.name}
                          </div>
                          <div className="text-xs md:text-sm text-gray-500 whitespace-nowrap">
                            {activity.company}
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Contact */}
                    <td className="px-3 md:px-6 py-4">
                      <div className="text-xs md:text-sm text-gray-900 whitespace-nowrap">
                        {activity.contact}
                      </div>
                      <div className="text-xs md:text-sm text-gray-500 whitespace-nowrap">
                        {activity.phone}
                      </div>
                    </td>

                    {/* Location */}
                    <td className="px-3 md:px-6 py-4 text-xs md:text-sm text-gray-900 whitespace-nowrap">
                      {activity.location}
                    </td>

                    {/* Served */}
                    <td className="px-3 md:px-6 py-4">
                      <span
                        className={`inline-flex px-2 md:px-3 py-1 rounded-full text-xs md:text-sm whitespace-nowrap ${
                          activity.server === 'Unassigned'
                            ? 'bg-red-100 text-red-700'
                            : 'bg-green-100 text-green-700'
                        }`}
                      >
                        {activity.server}
                      </span>
                    </td>

                    {/* Progress Dropdown */}
                    <td className="px-3 md:px-6 py-4 relative">
                      <div
                        className="relative inline-block w-40"
                        ref={(el) => (buttonRefs.current[index] = el)}
                      >
                        <button
                          onClick={() => toggleDropdown(index)}
                          className={`flex justify-between items-center w-full px-3 py-1.5 rounded-lg text-xs md:text-sm font-medium whitespace-nowrap transition-colors border ${getProgressColor(
                            activity.progress
                          )}`}
                        >
                          <span>{activity.progress}</span>
                          <BiChevronDown
                            className={`ml-1 w-6 h-6 transition-transform duration-200 ${
                              activeDropdown === index ? 'rotate-180' : ''
                            }`}
                          />
                        </button>

                        {activeDropdown === index && (
                          <div
                            className={`absolute left-0 w-full bg-white border border-gray-200 rounded-lg shadow-lg z-50 overflow-hidden ${
                              dropdownPositions[index]
                                ? 'bottom-full mb-1'
                                : 'top-full mt-1'
                            }`}
                          >
                            {['In Progress', 'Completed', 'Reschedule'].map(
                              (status) => (
                                <button
                                  key={status}
                                  onClick={() =>
                                    handleProgressChange(actualIndex, status)
                                  }
                                  className={`w-full text-left px-4 py-2 text-sm transition-colors duration-150 ${
                                    status === activity.progress
                                      ? 'bg-[#28A844] text-white font-semibold'
                                      : 'text-gray-700 hover:bg-gray-100'
                                  }`}
                                >
                                  {status}
                                </button>
                              )
                            )}
                          </div>
                        )}
                      </div>
                    </td>

                    {/* Priority */}
                    <td className="px-3 md:px-6 py-4">
                      <span className={`inline-flex px-2 md:px-3 py-1 rounded-full text-xs md:text-sm whitespace-nowrap ${activity.priority === "High" ? "text-[#DC3545] bg-[#FCEBEC]" : activity.priority === "Medium" ? "text-[#FFC107] bg-[#FFF9E6]" : "text-[#24963E] bg-[#EAF6EC]"}`}>{activity.priority}</span>
                    </td>

                    {/* Action */}
                    <td className="px-3 md:px-6 py-4">
                      <Link to={`/employee/customers/${activity.id}`}>
                        <button className="text-gray-600 hover:text-gray-900">
                          <LuEye className="w-4 h-4 md:w-5 md:h-5" />
                        </button>
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <Pagination
          currentPage={currentPage}
          totalItems={activities.length}
          itemsPerPage={itemsPerPage}
          onPageChange={(page) => setCurrentPage(page)}
          itemLabel="Customer"
          itemLabelPlural="Customers"
        />
      </div>

      {/* Modals */}
      <RegistrationModal isOpen={open} onClose={() => setOpen(false)} />
       <ProfileSetupModal isOpen={profileModal} onClose={() => setProfileModal(false)} />
      
    </div>
  );
};

export default Coustomerpage;
