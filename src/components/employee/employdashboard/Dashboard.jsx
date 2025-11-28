import { useState, useEffect, useMemo, useRef } from "react";
import { Link } from "react-router-dom";
import { LuEye, LuHeadset } from "react-icons/lu";
import { PiUsersThreeBold } from "react-icons/pi";
import { FiShoppingCart } from "react-icons/fi";
import { FaRegCreditCard, FaChevronDown, FaChevronUp } from "react-icons/fa";
import { IoMdTrendingUp, IoMdTrendingDown, IoIosCalendar } from "react-icons/io";

import { useTranslation } from "react-i18next";
import axiosInstance from "../../../config/axiosConfig";
import RegistrationModal from "./components/Modal/RegistrationModal";
import { BiChevronDown } from "react-icons/bi";
import Pagination from "../../common/Pagination";
import ProfileSetupModal from "./components/Modal/ProfileSetupModal";

function DashBoard() {
  const [selectedPeriod, setSelectedPeriod] = useState("last30days");
  const [open, setOpen] = useState(false);
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [profileModal, setProfileModal] = useState(false);
  const [summary, setSummary] = useState({
    totalCustomers: 0,
    totalRevenue: 0,
    pendingPayments: 0,
    avgDuration: 0,
    completedOrders: 0,
    canceledOrders: 0,
  });
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const { t } = useTranslation();

  const [activeDropdown, setActiveDropdown] = useState(null);
  const [dropdownPositions, setDropdownPositions] = useState({});
  const buttonRefs = useRef({});
  const periodDropdownRef = useRef(null);



  const periodOptions = [
    { key: "last7days", label: t("dashboard.employee.pages.dashboard.dropDown.last7days") },
    { key: "last30days", label: t("dashboard.employee.pages.dashboard.dropDown.last30days") },
    { key: "last60days", label: t("dashboard.employee.pages.dashboard.dropDown.last60days") },
    { key: "last90days", label: t("dashboard.employee.pages.dashboard.dropDown.last90days") },
    { key: "last6months", label: t("dashboard.employee.pages.dashboard.dropDown.last6months") },
    { key: "last12months", label: t("dashboard.employee.pages.dashboard.dropDown.last12months") },
  ];

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        const response = await axiosInstance.get(
          '/employee/data/dashboardOverviewData.json'
        );
        const data = response.data;

        setActivities(data.recentActivities || []);
        setSummary(data.summary || {});
        setLoading(false);
      } catch (err) {
        console.error("Dashboard fetch error:", err);
        setError(err.message || "Something went wrong while fetching data");
        setLoading(false);
      }
    };
    fetchDashboardData();
  }, []);

  const summaryStats = useMemo(() => {
    return [
      { label: t("dashboard.employee.pages.dashboard.card.1st"), value: summary.totalCustomers, trend: "up", icon: PiUsersThreeBold, bgColor: "bg-[#F7FFE5]" },
      { label: t("dashboard.employee.pages.dashboard.card.2nd"), value: summary.totalRevenue, trend: "up", icon: FiShoppingCart, bgColor: "bg-[#F7FFE5]" },
      { label: t("dashboard.employee.pages.dashboard.card.3rd"), value: summary.pendingPayments, trend: "down", icon: FaRegCreditCard, bgColor: "bg-[#F7FFE5]" },
      { label: t("dashboard.employee.pages.dashboard.card.4th"), value: summary.avgDuration, trend: "up", icon: LuHeadset, bgColor: "bg-[#ECFDF6]" },
      { label: t("dashboard.employee.pages.dashboard.card.5th"), value: summary.completedOrders, trend: "up", icon: FiShoppingCart, bgColor: "bg-[#ECFDF6]" },
      { label: t("dashboard.employee.pages.dashboard.card.6th"), value: summary.canceledOrders, trend: "down", icon: FiShoppingCart, bgColor: "bg-[#ECFDF6]" },
    ];
  }, [t, summary]);

  const filteredActivities = useMemo(() => {
    if (!activities) return [];
    const now = new Date();
    let days = 30;
    switch (selectedPeriod) {
      case "last7days": days = 7; break;
      case "last30days": days = 30; break;
      case "last60days": days = 60; break;
      case "last90days": days = 90; break;
      case "last6months": days = 180; break;
      case "last12months": days = 365; break;
      default: days = 30;
    }
    return activities.filter(a => {
      const activityDate = new Date(a.date);
      const diff = (now - activityDate) / (1000 * 60 * 60 * 24);
      return diff <= days;
    });
  }, [activities, selectedPeriod]);

  // eslint-disable-next-line no-unused-vars
  const totalPages = Math.ceil(filteredActivities.length / itemsPerPage);
  const paginatedActivities = filteredActivities.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  // Pagination handler
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Dropdown logic
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
      case 'In Progress': return 'bg-[#394C6B] text-white';
      case 'Completed': return 'bg-[#28A844] text-white';
      case 'Reschedule': return 'bg-[#FFC107] text-white';
      default: return 'bg-[#394C6B] text-white';
    }
  };

  // Close dropdown when clicking outside
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

  // Close period dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        periodDropdownRef.current &&
        !periodDropdownRef.current.contains(event.target)
      ) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  if (loading) return <div className="text-gray-700">Loading...</div>;
  if (error) return <div className="text-red-600">{error}</div>;


  return (
    <div className="p-4 lg:pt-6 md:px-12">
      {/* Header */}
      <div className="mb-3 md:mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-[#002244] mb-2 text-left">{t('dashboard.employee.title.dashPageTitle')}</h1>
        <p className="text-sm md:text-base text-gray-600 text-left">{t('dashboard.employee.subTitle.dashpageSub')}</p>
      </div>

      {/* Period Select */}
      <div className="mb-4 md:mb-6 flex flex-col items-start gap-2 relative">
        <h2 className="text-lg  font-normal text-gray-700">{periodOptions.find(p => p.key === selectedPeriod)?.label || t("dashboard.employee.pages.dashboard.dropDown.last30days")} {t("dashboard.employee.pages.dashboard.dropDown.overview")}</h2>
        <div className="relative" ref={periodDropdownRef}>
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="w-full flex items-center gap-4 px-3 py-2 md:px-4 md:py-2 bg-gray-50 border border-[#E6E6E6] rounded-lg text-xs md:text-sm text-[#1A1A1A] transition-all duration-200"
          >
            <IoIosCalendar className="w-6 h-6 font-bold" />
            {periodOptions.find(p => p.key === selectedPeriod)?.label || t("dashboard.employee.pages.dashboard.dropDown.last30days")}
            {dropdownOpen ? <FaChevronUp className="w-4 h-4 text-[#666666]" /> : <FaChevronDown className="w-4 h-4 text-[#666666]" />}
          </button>
          {dropdownOpen && (
            <div className="absolute mt-2 w-full bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden z-20">
              {periodOptions.map((period) => (
                <button
                  key={period.key}
                  onClick={() => { setSelectedPeriod(period.key); setDropdownOpen(false); setCurrentPage(1); }}
                  className={`block w-full text-left px-4 py-2 text-xs md:text-sm hover:bg-gray-100 ${selectedPeriod === period.key ? "bg-gray-50 font-medium text-gray-900" : "text-gray-700"}`}
                >
                  {period.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-4 md:gap-6 mb-6 md:mb-8">
        {summaryStats.map((stat, index) => {
          const Icon = stat.icon || PiUsersThreeBold;
          return (
            <div key={index} className="bg-white p-3 md:p-4 rounded-lg shadow-sm border border-gray-200 flex justify-between items-center">
              <div>
                <span className="text-gray-600 text-xs md:text-sm">{stat.label}</span>
                <div className="text-xl md:text-2xl font-bold text-gray-900 mb-1">{stat.value}</div>
                <div className={`flex items-center gap-1 ${stat.trend === "up" ? "text-green-600" : "text-red-600"}`}>
                  {stat.trend === "up" ? <IoMdTrendingUp className="w-3 h-3 md:w-4 md:h-4" /> : <IoMdTrendingDown className="w-3 h-3 md:w-4 md:h-4" />}
                  {stat.trend === "up" ? "+30 %" : "-7 %"}
                </div>
              </div>
              <div className={`w-10 h-10 md:w-12 md:h-12 ${stat.bgColor} rounded-lg flex items-center justify-center`}>
                <Icon className="w-5 h-5 md:w-6 md:h-6 text-gray-700" />
              </div>
            </div>
          );
        })}
      </div>

      {/* Activities Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200">
        <div className="p-4 md:p-6 border-b border-gray-200 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <h2 className="text-lg md:text-xl font-bold text-gray-900">{t('dashboard.employee.table.tableTitle')}</h2>
          <div className="flex flex-col sm:flex-row gap-2 md:gap-3">
            <button onClick={() => setOpen(true)} className="px-4 md:px-6 py-2 bg-[#28A844] text-white rounded-lg hover:bg-green-600 font-medium text-sm md:text-base">
              {t('dashboard.employee.button.registerNewCustomer')}
            </button>
            <button onClick={() => setProfileModal(true)} className="px-4 md:px-6 py-2 bg-[#FFC107] text-white rounded-lg hover:bg-yellow-500 font-medium text-sm md:text-base">
              {t('dashboard.employee.button.assistProfile')}
            </button>

          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-max">
            <thead className="bg-[#F5F7FA] border-b h-18 border-[#C0C0C0]">
              <tr>
                <th className="px-3 md:px-6 py-3 text-left text-sm font-medium text-gray-700 uppercase whitespace-nowrap">{t('dashboard.employee.table.serviceName')}</th>
                <th className="px-3 md:px-6 py-3 text-left text-sm font-medium text-gray-700 uppercase whitespace-nowrap">{t('dashboard.employee.table.contact')}</th>
                <th className="px-3 md:px-6 py-3 text-left text-sm font-medium text-gray-700 uppercase whitespace-nowrap">{t('dashboard.employee.table.location')}</th>
                <th className="px-3 md:px-6 py-3 text-left text-sm font-medium text-gray-700 uppercase whitespace-nowrap">{t('dashboard.employee.table.served')}</th>
                <th className="px-3 md:px-6 py-3 text-left text-sm font-medium text-gray-700 uppercase whitespace-nowrap">{t('dashboard.employee.table.progress')}</th>
                <th className="px-3 md:px-6 py-3 text-left text-sm font-medium text-gray-700 uppercase whitespace-nowrap">{t('dashboard.employee.table.priority')}</th>
                <th className="px-3 md:px-6 py-3 text-left text-sm font-medium text-gray-700 uppercase whitespace-nowrap">{t('dashboard.employee.table.action')}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {paginatedActivities.map((activity, index) => {
                const actualIndex = activities.findIndex(a => a.id === activity.id);
                return (
                  <tr key={activity.id} className=" hover:bg-gray-50 ">
                    <td className="px-3 md:px-6 py-4">{activity.serviceName}</td>
                    <td className="px-3 md:px-6 py-4">
                      <div className="text-xs md:text-sm text-gray-900 whitespace-nowrap">{activity.contact}</div>
                      <div className="text-xs md:text-sm text-gray-500 whitespace-nowrap">{activity.phone}</div>
                    </td>
                    <td className="px-3 md:px-6 py-4 text-xs md:text-sm text-gray-900 whitespace-nowrap">{activity.location}</td>
                    <td className="px-3 md:px-6 py-4">
                      <span className={`inline-flex px-2 md:px-3 py-1 rounded-full text-xs md:text-sm whitespace-nowrap ${activity.servedBy === "Unassigned" ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"}`}>{activity.servedBy}</span>
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
                            className={`ml-1 w-6 h-6 transition-transform duration-200 ${activeDropdown === index ? 'rotate-180' : ''
                              }`}
                          />
                        </button>

                        {activeDropdown === index && (
                          <div
                            className={`absolute left-0 w-full bg-white border border-gray-200 rounded-lg shadow-lg z-50 overflow-hidden ${dropdownPositions[index]
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
                                  className={`w-full text-left px-4 py-2 text-sm transition-colors duration-150 ${status === activity.progress
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

                    <td className="px-3 md:px-6 py-4">
                      <span className={`inline-flex px-2 md:px-3 py-1 rounded-full text-xs md:text-sm whitespace-nowrap ${activity.priority === "High" ? "text-[#DC3545] bg-[#FCEBEC]" : activity.priority === "Medium" ? "text-[#FFC107] bg-[#FFF9E6]" : "text-[#24963E] bg-[#EAF6EC]"}`}>{activity.priority}</span>
                    </td>
                    <td className="px-3 md:px-6 py-4">
                      <Link to={`/employee/customers/${activity.id}`}>
                        <button className="text-gray-600 hover:text-gray-900"><LuEye className="w-4 h-4 md:w-5 md:h-5" /></button>
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>


        <Pagination
          currentPage={currentPage}
          totalItems={filteredActivities.length}
          itemsPerPage={itemsPerPage}
          onPageChange={handlePageChange}
        />
      </div>

      {/* Modals */}
      <RegistrationModal isOpen={open} onClose={() => setOpen(false)} />

      <ProfileSetupModal isOpen={profileModal} onClose={() => setProfileModal(false)} />
    </div>
  );
}

export default DashBoard;
