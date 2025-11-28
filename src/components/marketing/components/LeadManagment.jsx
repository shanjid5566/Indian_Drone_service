import { useState, useEffect } from "react";
import MapAudience from "./MapAudience";
import LeadsTable from "./LeadsTable";
import { useTranslation } from "react-i18next";
import LeadStatusDropdown from "./LeadStatusDropdown";
import Pagination from "../../fieldAgent/components/Pagination";
import axiosInstance from "../../../config/axiosConfig";
import AutomationModal from "./modals/AutomationModal ";
import SalesSequenceModal from "./modals/SalesSequenceModal";
import CommonPagination from "../../common/Pagination";

const LeadManagment = () => {
  const { t } = useTranslation();

  const [open, setOpen] = useState(false);

  const [activities, setActivities] = useState([]);

  const [selectedStatus, setSelectedStatus] = useState("All");
  const [isAutomationModalOpen, setIsAutomationModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 4;
  const [filteredActivities, setFilteredActivities] = useState([]);
  const [statusStyles, setStatusStyles] = useState({});
  const [clockModalOpen, setClockModalOpen] = useState(false);
  const totalPages = Math.ceil(filteredActivities.length / rowsPerPage);
  const [automationSettings, setAutomationSettings] = useState([]);

  const startIndex = (currentPage - 1) * rowsPerPage;
  const paginatedData = filteredActivities.slice(
    startIndex,
    startIndex + rowsPerPage
  );

  useEffect(() => {
    // fetch marketing data (local JSON in public/MarketingDashboard/data)
    const fetchData = async () => {
      try {
        const { data } = await axiosInstance.get(
          "/MarketingDashboard/data/marketingLandingPage.json"
        );
        setActivities(Array.isArray(data.activities) ? data.activities : []);
        setStatusStyles(data.statusStyles || {});
        setAutomationSettings(
          Array.isArray(data.automationSettings) ? data.automationSettings : []
        );
      } catch (err) {
        console.error("Failed to load marketing data:", err);
      }
    };
    fetchData();
  }, []);

  // filter activities when activities or selectedStatus change
  useEffect(() => {
    if (!activities) return;
    const filtered = activities.filter((item) => {
      return selectedStatus === "All" || item.status === selectedStatus;
    });
    setFilteredActivities(filtered);
    setCurrentPage(1);
  }, [activities, selectedStatus]);

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

  return (
    <div className="md:px-12 mx-auto py-2 md:py-4 lg:py-8 px-4">
      {/* <Leads/> */}
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
                className="px-3 md:px-6 py-2 bg-[#FFC107] text-white rounded-lg hover:bg-[#ff9307]  font-medium text-sm md:text-base flex items-center justify-center gap-1"
              >
                {t("dashboard.marketing.Automation")}
              </button>
            </div>
          </div>
        </div>

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

      <MapAudience />
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
      <SalesSequenceModal
        isOpen={clockModalOpen}
        onClose={() => setClockModalOpen(false)}
      />
    </div>
  );
};

export default LeadManagment;
