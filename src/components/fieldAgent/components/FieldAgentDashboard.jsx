import { useEffect, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { FaRupeeSign, FaAngleUp, FaAngleDown, FaTrophy } from "react-icons/fa";
import { PiUsersThreeBold } from "react-icons/pi";
import { FiUserPlus } from "react-icons/fi";
import axiosInstance from "../../../config/axiosConfig";
import FieldAgentCreateServiceModal from "./modals/FieldAgentCreateServiceModal";

// New parts
import StatsGrid from "./StatsGrid";
import RankCard from "./RankCard";
import CreateServiceCard from "./CreateServiceCard";
import FilterBar from "./FilterBar";
import UsersTable from "./UsersTable";
import Pagination from "../../common/Pagination";
import AddCustomerModal from "./modals/AddCustomerModal"

const FieldAgentDashboard = () => {
  // const { user } = useAuth();
  const { t } = useTranslation();

  const [statsData, setStatsData] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [creatServiceshowModal, setCreatServiceshowModal] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const [selectedFilterValue, setSelectedFilterValue] =
    useState("customerList");

  // Sorting state
  const [sortKey, setSortKey] = useState("customerList");
  const [sortDir, setSortDir] = useState("asc");
  
  // Customer Type Filter state (for cycling through types)
  const [customerTypeFilter, setCustomerTypeFilter] = useState(null); // null, "Active", "Inactive", "Suspended"

  // user rank
  const [rank, setRank] = useState("Silver");

  const usersPerPage = 6;
  const [searchTerm, setSearchTerm] = useState("");

  const ICONS = {
    PiUsersThreeBold: PiUsersThreeBold,
    FaRupeeSign: FaRupeeSign,
  };

  const menuItems = [
    { label: t("dashboard.fieldAgent.tableHeader.CustomerList"), value: "customerList" },
    { label: t("dashboard.fieldAgent.tableHeader.Role"), value: "role" },
    { label: t("dashboard.fieldAgent.tableHeader.RegistrationCommission"), value: "registrationCommission" },
    { label: t("dashboard.fieldAgent.tableHeader.FirstOrderCommission"), value: "firstOrderCommission" },
    { label: t("dashboard.fieldAgent.tableHeader.EffectiveDate"), value: "effectiveDate" },
  ];

  const staticCardHeaders = [
    { title: t("dashboard.fieldAgent.fieldAgentSummery.userAdded") },
    { title: t("dashboard.fieldAgent.fieldAgentSummery.ActiveCustomers") },
    { title: t("dashboard.fieldAgent.fieldAgentSummery.totalcommition") },
    { title: t("dashboard.fieldAgent.fieldAgentSummery.totalPayments") },
  ];

  useEffect(() => {
    const fetchAgentData = async () => {
      try {
        setLoading(true);
        const data = await axiosInstance.get(
          "/fieldAgent/data/fieldAgentData.json"
        );
        setStatsData(data.data.statsData);
        setTableData(data.data.tableData);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    fetchAgentData();
  }, []);

  const handleSortChange = (key) => {
    // Special handling for customerType - cycle through filters
    if (key === "customerType") {
      // Cycle: null -> Active -> Inactive -> Suspended -> null
      if (customerTypeFilter === null) {
        setCustomerTypeFilter("Active");
      } else if (customerTypeFilter === "Active") {
        setCustomerTypeFilter("Inactive");
      } else if (customerTypeFilter === "Inactive") {
        setCustomerTypeFilter("Suspended");
      } else {
        setCustomerTypeFilter(null);
      }
      setCurrentPage(1);
      return;
    }
    
    // Normal sorting for other columns
    const next = sortKey === key && sortDir === "asc" ? "desc" : "asc";
    setSortKey(key);
    setSortDir(next);
    setCustomerTypeFilter(null); // Reset customer type filter when sorting other columns
    setCurrentPage(1);
  };

  const handleSubmit = (formData) => {
    // API call or state update korte paren
    setCreatServiceshowModal(false);
    console.log(formData)
  };

  // Sorting
  const sortedData = useMemo(() => {
    const copy = [...tableData];
    copy.sort((a, b) => {
      const av = a?.[sortKey] ?? "";
      const bv = b?.[sortKey] ?? "";

      if (av == null && bv == null) return 0;
      if (av == null) return 1;
      if (bv == null) return -1;

      // Custom sorting for customerType
      if (sortKey === "customerType") {
        const customerTypeOrder = { "Active": 1, "Suspended": 2, "Inactive": 3 };
        const aOrder = customerTypeOrder[av] ?? 999;
        const bOrder = customerTypeOrder[bv] ?? 999;
        return sortDir === "asc" ? aOrder - bOrder : bOrder - aOrder;
      }

      const an = Number(av);
      const bn = Number(bv);
      if (!Number.isNaN(an) && !Number.isNaN(bn)) {
        return sortDir === "asc" ? an - bn : bn - an;
      }

      const ad = Date.parse(av);
      const bd = Date.parse(bv);
      if (!Number.isNaN(ad) && !Number.isNaN(bd)) {
        return sortDir === "asc" ? ad - bd : bd - ad;
      }

      const res = String(av).localeCompare(String(bv));
      return sortDir === "asc" ? res : -res;
    });
    return copy;
  }, [tableData, sortKey, sortDir]);

  // Apply customer type filter
  const customerTypeFilteredData = useMemo(() => {
    if (customerTypeFilter === null) return sortedData;
    return sortedData.filter(row => row.customerType === customerTypeFilter);
  }, [sortedData, customerTypeFilter]);

  // Filter by search term
  const filteredData = useMemo(() => {
    if (!searchTerm.trim()) return customerTypeFilteredData;
    const rx = new RegExp(
      searchTerm.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"),
      "i"
    );

    return customerTypeFilteredData.filter((row) => {
      // If a specific filter is selected, search only in that field
      if (selectedFilterValue && selectedFilterValue !== "customerList") {
        const fieldValue = row[selectedFilterValue];
        return rx.test((fieldValue ?? "").toString());
      }
      
      // Otherwise search in all fields (default behavior)
      const haystacks = [
        row.customerList,
        row.role,
        row.registrationCommission,
        row.firstOrderCommission,
        row.effectiveDate,
        row.registrationDate,
        row.customerType,
        row.nextFollowUpDate,
        row.serviceInterest,
        row.quickActions,
      ];
      return haystacks.some((h) => rx.test((h ?? "").toString()));
    });
  }, [customerTypeFilteredData, searchTerm, selectedFilterValue]);

  // Pagination
  const totalUsers = filteredData.length;
  const totalPages = Math.ceil(totalUsers / usersPerPage);
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredData.slice(indexOfFirstUser, indexOfLastUser);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, sortKey, sortDir]);

  useEffect(() => {
    if (currentPage > totalPages) setCurrentPage(totalPages || 1);
  }, [currentPage, totalPages]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {String(error)}</p>;

  return (
    <div className="bg-[#FAFFFD] p-4 md:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Statistics Cards */}
        <StatsGrid
          statsData={statsData}
          staticCardHeaders={staticCardHeaders}
          ICONS={ICONS}
        />

        {/* Rank + Create Service */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-10">
          <RankCard rank={rank} />
          <CreateServiceCard
            onCreateService={() => setCreatServiceshowModal(true)}
          />
        </div>

        {/* Table Section */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          {/* Header + Search/Filter + Add */}
          <div className="flex justify-between items-center p-2 sm:p-4 md:p-6 flex-col lg:flex-row gap-3">
            <h2 className="sm:text-lg md:text-2xl font-semibold text-black">
              {t("dashboard.fieldAgent.userAdd.CustomerOnBoarded")}
            </h2>

            <div className="flex items-center flex-col gap-2 md:flex-row">
              <FilterBar
                t={t}
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                menuItems={menuItems}
                selectedFilterValue={selectedFilterValue}
                setSelectedFilterValue={setSelectedFilterValue}
              />

              <button
                onClick={() => setShowModal(true)}
                className="bg-[#28A844] hover:bg-green-700 hover:cursor-pointer text-white px-4 sm:px-2 py-2 md:px-6 sm:py-1 md:py-2.5 rounded-sm font-medium flex items-center gap-2 text-sm md:text-base transition-colors"
              >
                <FiUserPlus size={18} />
                {t("dashboard.fieldAgent.userAdd.AddCustomer")}
              </button>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto custom-scrollbar">
            <UsersTable
              t={t}
              data={currentUsers}
              sortKey={sortKey}
              sortDir={sortDir}
              onSortChange={handleSortChange}
            />
          </div>

          {/* Pagination */}
          <Pagination
            currentPage={currentPage}
            totalItems={totalUsers}
            itemsPerPage={usersPerPage}
            onPageChange={(page) => setCurrentPage(page)}
          />
        </div>
      </div>

      {/* Modals */}
      <AddCustomerModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
      />
      <FieldAgentCreateServiceModal
        isOpen={creatServiceshowModal}
        onClose={() => setCreatServiceshowModal(false)}
        onSubmit={handleSubmit}
      />
    </div>
  );
};

export default FieldAgentDashboard;
