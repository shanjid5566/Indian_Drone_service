import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaChevronDown, FaPlus } from "react-icons/fa";
import { HiCursorClick } from "react-icons/hi";
import { FaArrowTrendUp, FaDollarSign } from "react-icons/fa6";
import axiosInstance from "../../../config/axiosConfig";
import CampaignModal from "./modals/CampaignModal";
import SalesSequenceModal from "./modals/SalesSequenceModal";

// NEW: extracted components
import LeadStatusDropdown from "./LeadStatusDropdown";
import LeadsTable from "./LeadsTable";

import { useTranslation } from "react-i18next";
import Pagination from "./Pagination";
import CommonPagination from "../../common/Pagination";
import AutomationModal from "./modals/AutomationModal ";

const iconMap = {
  HiCursorClick: HiCursorClick,
  FaArrowTrendUp: FaArrowTrendUp,
  FaDollarSign: FaDollarSign,
};

const MarketingDashBoard = () => {
  const { t } = useTranslation();

  const [open, setOpen] = useState(false);
  const [isAutomationModalOpen, setIsAutomationModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const [seasonalPage, setSeasonalPage] = useState(1);
  const [loyaltyPage, setLoyaltyPage] = useState(1);
  const [cardsPerPage, setCardsPerPage] = useState(3);
  const rowsPerPage = 4;

  const [automationSettings, setAutomationSettings] = useState([]);
  const [stats, setStats] = useState([]);
  const [activities, setActivities] = useState([]);
  const [statusStyles, setStatusStyles] = useState({});
  const [leads, setLeads] = useState([]);
  const [allSeasonalCampaigns, setAllSeasonalCampaigns] = useState([]);
  const [allLoyaltyPrograms, setAllLoyaltyPrograms] = useState([]);
  const [selectedPeriod, setSelectedPeriod] = useState("30");
  const [filteredActivities, setFilteredActivities] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [campaignModal, setCampaignModal] = useState(false);
  const [clockModalOpen, setClockModalOpen] = useState(false);

  const totalPages = Math.ceil(filteredActivities.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const paginatedData = filteredActivities.slice(
    startIndex,
    startIndex + rowsPerPage
  );
  const statstTitle = [
    t("dashboard.marketing.clickRate"),
    t("dashboard.marketing.ConversionRate"),
    t("dashboard.marketing.CustomerAcquisitionCost"),
    t("dashboard.marketing.RIO"),
  ];
  useEffect(() => {
    const updateCardsPerPage = () => {
      if (window.innerWidth < 768) setCardsPerPage(1);
      else if (window.innerWidth < 1024) setCardsPerPage(2);
      else setCardsPerPage(3);
    };
    updateCardsPerPage();
    window.addEventListener("resize", updateCardsPerPage);
    return () => window.removeEventListener("resize", updateCardsPerPage);
  }, []);

  useEffect(() => {
    const fetchAgentData = async () => {
      try {
        const { data } = await axiosInstance.get(
          "/MarketingDashboard/data/marketingLandingPage.json"
        );
        setActivities(data.activities);
        setAutomationSettings(
          Array.isArray(data.automationSettings) ? data.automationSettings : []
        );
        setStats(data.stats);
        setStatusStyles(data.statusStyles);
        setLeads(data.leads);
        setAllSeasonalCampaigns(data.allSeasonalCampaigns);
        setAllLoyaltyPrograms(data.allLoyaltyPrograms);
        setSeasonalPage(1);
        setLoyaltyPage(1);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAgentData();
  }, []);

  useEffect(() => {
    if (!activities) return;
    const today = new Date();
    const days = parseInt(selectedPeriod, 10);

    const filtered = activities.filter((item) => {
      const activityDate = new Date(item.date);
      const diffTime = today - activityDate;
      const diffDays = diffTime / (1000 * 60 * 60 * 24);
      const matchDays = diffDays <= days;
      const matchStatus =
        selectedStatus === "All" || item.status === selectedStatus;
      return matchDays && matchStatus;
    });

    setFilteredActivities(filtered);
    setCurrentPage(1);
  }, [selectedPeriod, selectedStatus, activities]);

  const getPaginatedData = (data, page) => {
    const start = (page - 1) * cardsPerPage;
    const end = start + cardsPerPage;
    return data.slice(start, end);
  };

  const getTotalPages = (data) => Math.ceil(data.length / cardsPerPage);

  // Automation function
  const handleToggleAutomation = (id) => {
    setAutomationSettings((prev) =>
      prev.map((s) => (s.id === id ? { ...s, enabled: !s.enabled } : s))
    );
  };

  const handleDeleteAutomation = (id) => {
    setAutomationSettings((prev) => prev.filter((s) => s.id !== id));
  };

  const handleAddAutomationRule = () => {
    const nextId =
      automationSettings.length > 0
        ? Math.max(...automationSettings.map((s) => s.id)) + 1
        : 1;
    setAutomationSettings((prev) => [
      ...prev,
      {
        id: nextId,
        title: "Automation Settings",
        subtext: "3 of 4 rules active",
        enabled: false,
      },
    ]);
  };

  const seasonalCampaigns = getPaginatedData(
    allSeasonalCampaigns,
    seasonalPage
  );
  const seasonalTotalPages = getTotalPages(allSeasonalCampaigns);

  const loyaltyPrograms = getPaginatedData(allLoyaltyPrograms, loyaltyPage);
  const loyaltyTotalPages = getTotalPages(allLoyaltyPrograms);

  return (
    <div className="bg-[#fafffd] p-4 lg:pt-5 md:px-12">
      <div className="flex-1 mt-2">
        <div className="mb-1 md:mb-6 flex flex-col md:flex-row justify-between">
          <div>
            <h1 className="!text-xl md:!text-4xl font-bold text-[#002244]">
              {t("dashboard.marketing.title")}
            </h1>
            <p className="text-xs md:text-base text-[#464646]"></p>
          </div>
        </div>

        <div className="pb-3 md:pb-5">
          <h2 className="text-sm md:!text-xl font-normal text-gray-700">
            {selectedPeriod === "7"
              ? t("dashboard.marketing.Last7daysOverview")
              : selectedPeriod === "30"
              ? t("dashboard.marketing.Last30daysOverview")
              : selectedPeriod === "90"
              ? t("dashboard.marketing.Last90daysOverview")
              : null}
          </h2>
        </div>
        <div className="relative mb-4 md:mb-6 w-34">
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="w-full px-2 md:px-4 py-1.5 md:py-2 bg-white border border-gray-300 rounded-lg text-xs md:text-base text-[#1A1A1A] appearance-none"
          >
            <option value="7">{t("dashboard.marketing.last_7_days")}</option>
            <option value="30">{t("dashboard.marketing.last_30_days")}</option>
            <option value="90">{t("dashboard.marketing.last_90_days")}</option>
          </select>
          <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
            <FaChevronDown />
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-6 md:mb-8">
          {stats.map((stat, index) => {
            const Icon = iconMap[stat.icon];
            return (
              <div
                key={index}
                className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-between gap-3"
              >
                <div className="text-gray-500 text-sm font-medium">
                  {statstTitle[index]}
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-2xl md:text-3xl font-semibold text-gray-900">
                    {stat.value}
                  </span>
                  <div className={`${stat.iconBg} p-2 rounded-xl`}>
                    {Icon ? (
                      <Icon className="w-6 h-6" />
                    ) : (
                      <span className="text-gray-400">?</span>
                    )}
                  </div>
                </div>
                <div
                  className={`text-xs md:text-sm ${
                    stat.trend === "up"
                      ? "text-green-500"
                      : stat.trend === "down"
                      ? "text-red-500"
                      : "text-gray-500"
                  }`}
                >
                  {stat.change}
                </div>
              </div>
            );
          })}
        </div>

        {/* Lead Management */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-4 md:p-6 border-b border-gray-200">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              <div className="md:text-center lg:text-left">
                <h2 className="text-lg md:text-2xl font-bold text-[#464646]">
                  {t("dashboard.marketing.LeadManagement")},
                </h2>
                <h3 className="text-[#464646]">
                  {t("dashboard.marketing.TrackAndNurtureYourMarketingLeads")},
                </h3>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 md:gap-4 md:mx-auto lg:mx-0">
                <LeadStatusDropdown
                  selectedStatus={selectedStatus}
                  setSelectedStatus={setSelectedStatus}
                />
                <button
                  onClick={() => setOpen(true)}
                  className="px-4 md:px-6 py-2 bg-[#28A844] text-white rounded-lg hover:bg-green-600 font-medium text-sm md:text-base"
                >
                  {t("dashboard.marketing.ExportLeads")}
                </button>
                <button
                  onClick={() => setIsAutomationModalOpen(true)}
                  className="px-3 md:px-6 py-2 bg-[#FFC107] text-white rounded-lg hover:bg-[#ff9307] cursor-pointer font-medium text-sm md:text-base flex items-center justify-center gap-1"
                >
                  {t("dashboard.marketing.Automation")}
                </button>
              </div>
            </div>
          </div>

          {/* Table extracted */}
          <LeadsTable
            data={paginatedData}
            statusStyles={statusStyles}
            onOpenClock={() => setClockModalOpen(true)}
          />

          {/* Footer */}
          <CommonPagination
            currentPage={currentPage}
            totalItems={filteredActivities.length}
            itemsPerPage={rowsPerPage}
            onPageChange={setCurrentPage}
          />
        </div>

        {/* Seasonal Campaigns */}
        <div className="my-4 md:my-12 bg-white p-3 md:p-6 rounded-2xl">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg md:text-2xl font-bold text-gray-800 w-1/2">
              {t("dashboard.marketing.seasonalCampaings")}
            </h2>
            <button
              onClick={() => setCampaignModal(true)}
              className="bg-green-500 hover:opacity-90 text-white font-medium py-2 px-1 md:px-2 rounded flex items-center justify-center gap-1 md:gap-2 transition-opacity w-1/2 md:w-44"
            >
              <FaPlus size={16} />
              {t("dashboard.marketing.CreateCampaign")}
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {seasonalCampaigns.map((campaign, idx) => (
              <div
                key={idx}
                className="bg-[#F9FAFB] rounded-lg shadow-md overflow-hidden transition-transform hover:scale-103 flex flex-col h-full"
              >
                <img
                  src={campaign.image}
                  alt={campaign.title}
                  className="w-full h-72 object-cover"
                />
                <div className="p-4 flex flex-col h-full">
                  <h3 className="font-semibold text-lg mb-2 text-gray-800">
                    {campaign.title}
                  </h3>
                  <p className="text-sm text-gray-600 mb-4 line-clamp-3">
                    {campaign.description}
                  </p>
                  <div className="mt-auto">
                    <Link to={`campaigns/seasonal/${campaign.id}`}>
                      <button className="w-full bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 rounded transition-colors">
                        {t("dashboard.marketing.SeeDetails")}
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <Pagination
            variant="full"
            currentPage={seasonalPage}
            totalPages={seasonalTotalPages}
            onPageChange={setSeasonalPage}
          />
        </div>

        {/* Loyalty Programs */}
        <div className="my-4 md:my-6 bg-white p-3 md:p-6 rounded-2xl">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg   md:text-2xl font-bold text-gray-800 w-1/2">
              {t("dashboard.marketing.Loyaltyprograms")}
            </h2>
            <button
              onClick={() => setCampaignModal(true)}
              className="bg-green-500 hover:opacity-90 text-white font-medium py-2 px-1 md:px-2 rounded flex items-center justify-center gap-2 transition-opacity w-1/2 md:w-44"
            >
              <FaPlus size={16} />
              {t("dashboard.marketing.CreateCampaign")}
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {seasonalCampaigns.map((campaign, idx) => (
              <div
                key={idx}
                className="bg-[#F9FAFB] rounded-lg shadow-md overflow-hidden transition-transform hover:scale-103 flex flex-col h-full"
              >
                <img
                  src={campaign.image}
                  alt={campaign.title}
                  className="w-full h-72 object-cover"
                />
                <div className="p-4 flex flex-col h-full">
                  <h3 className="font-semibold text-lg mb-2 text-gray-800">
                    {campaign.title}
                  </h3>
                  <p className="text-sm text-gray-600 mb-4 line-clamp-3">
                    {campaign.description}
                  </p>
                  <div className="mt-auto">
                    <Link to={`campaigns/seasonal/${campaign.id}`}>
                      <button className="w-full bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 rounded transition-colors">
                        {t("dashboard.marketing.SeeDetails")}
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <Pagination
            variant="full"
            currentPage={loyaltyPage}
            totalPages={loyaltyTotalPages}
            onPageChange={setLoyaltyPage}
          />
        </div>
      </div>
      <AutomationModal
        isOpen={isAutomationModalOpen}
        onClose={() => setIsAutomationModalOpen(false)}
        automationSettings={automationSettings}
        onToggle={handleToggleAutomation}
        onDelete={handleDeleteAutomation}
        onAddRule={handleAddAutomationRule}
        headerTitle="if lead is hot"
        headerSubtext="3 of 4 rules active"
      />
      {campaignModal && (
        <CampaignModal onClose={() => setCampaignModal(false)} />
      )}
      <SalesSequenceModal
        isOpen={clockModalOpen}
        onClose={() => setClockModalOpen(false)}
      />
    </div>
  );
};

export default MarketingDashBoard;
