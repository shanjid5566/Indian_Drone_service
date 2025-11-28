import { useEffect, useState } from 'react';
import { FaArrowTrendUp, FaArrowTrendDown, FaWrench } from "react-icons/fa6";
import { MdOutlinePayment, MdPercent } from "react-icons/md";
import { CiSearch } from "react-icons/ci";
import CollectPaymentModal from './components/Modal/CollectPaymentModa';
import ApplyDiscountModal from './components/Modal/ApplyDiscountModal';
import ResolveBillingModal from './components/Modal/ResolveBillingModal';
import { useTranslation } from 'react-i18next';
import axiosInstance from '../../../config/axiosConfig';
import Pagination from '../../common/Pagination';

const PaymentManagement = () => {
  const { t, i18n } = useTranslation();
  const [recentTransactions, setRecentTransactions] = useState([]);
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [stats, setStats] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [isDiscountModalOpen, setIsDiscountModalOpen] = useState(false);
  const [isBillingModalOpen, setIsBillingModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // Fetch JSON Data
  const fetchTransactions = async () => {
    try {
      const response = await axiosInstance.get('/employee/data/payment.json');
      const data = response.data;
      setRecentTransactions(data.transactions);
      setFilteredTransactions(data.transactions);
      return data;
    } catch (error) {
      console.error('Error fetching transactions:', error.message);
      return null;
    }
  };

  const updateStats = (data) => {
    if (!data) return;
    setStats([
      {
        label: t("dashboard.employee.pages.payment.card.todaysCollections"),
        value: data.summary.todaysCollections,
        change: '+25% vs last month',
        trend: 'up'
      },
      {
        label: t("dashboard.employee.pages.payment.card.pendingPayments"),
        value: data.summary.pendingPayments.amount,
        change: '+15% vs last month',
        trend: 'up'
      },
      {
        label: t("dashboard.employee.pages.payment.card.refundProcessed"),
        value: data.summary.refundProcessed.amount,
        change: '-5% vs last month',
        trend: 'down'
      },
    ]);
  };

  useEffect(() => {
    let transactionData = null;
    const init = async () => {
      transactionData = await fetchTransactions();
      updateStats(transactionData);
    };
    init();

    const handleLanguageChange = () => updateStats(transactionData);
    i18n.on('languageChanged', handleLanguageChange);
    return () => i18n.off('languageChanged', handleLanguageChange);
  }, [i18n]);

  // Search
 
const handleSearch = (e) => {
  const value = e.target.value;
  setSearchQuery(value);

  const query = value.toLowerCase();
  const filtered = recentTransactions.filter(txn =>
    txn.serviceId.toLowerCase().includes(query) ||
    txn.customerName.toLowerCase().includes(query) ||
    txn.payment.toString().toLowerCase().includes(query) ||
    txn.progress.toLowerCase().includes(query)
  );

  setFilteredTransactions(filtered);
  setCurrentPage(1);
};


  // Paginated Transactions
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedTransactions = filteredTransactions.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="flex-1 p-4 md:px-12">
      {/* Header */}
      <div className="mb-4 md:mb-6">
        <h1 className="text-lg md:text-3xl font-bold text-gray-900 mb-2">
          {t('dashboard.employee.title.paymentPageTitle')}
        </h1>
        <p className="text-xs md:text-base text-gray-600">
          {t('dashboard.employee.subTitle.paymentpageSub')}
        </p>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap sm:flex-nowrap gap-2 md:gap-3 mb-2 md:mb-4">
        <button
          onClick={() => setIsPaymentModalOpen(true)}
          className="flex items-center justify-center w-full sm:w-auto px-3 md:px-6 py-2 bg-[#28A844] text-white rounded-lg hover:bg-green-600 font-medium text-xs md:text-sm lg:text-base"
        >
          <MdOutlinePayment className="w-4 h-4 md:w-6 md:h-6 mr-1" />
          {t('dashboard.employee.button.collectPayment')}
        </button>

        <button
          onClick={() => setIsDiscountModalOpen(true)}
          className="flex items-center justify-center w-full sm:w-auto px-3 md:px-6 py-2 bg-[#FFC107] text-white rounded-lg hover:bg-yellow-500 font-medium text-xs md:text-sm lg:text-base"
        >
          <MdPercent className="w-4 h-4 md:w-6 md:h-6 mr-1" />
          {t('dashboard.employee.button.discount')}
        </button>

        <button
          onClick={() => setIsBillingModalOpen(true)}
          className="flex items-center justify-center w-full sm:w-auto px-3 md:px-6 py-2 bg-[#DC3545] text-white rounded-lg hover:bg-red-700 font-medium text-xs md:text-sm lg:text-base"
        >
          <FaWrench className="w-4 h-4  md:h-6 mr-1" />
          {t('dashboard.employee.button.billing')}
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 mb-4 md:mb-6">
        {stats.map((stat, index) => (
          <div
            key={index}
            className={`bg-white p-3 md:p-4 rounded-lg border border-gray-200 ${index === 2 ? "col-span-2 lg:col-span-1" : ""}`}
          >
            <div className="flex items-start justify-between mb-1.5 md:mb-2.5">
              <span className="text-gray-600 text-xs md:text-sm">{stat.label}</span>
            </div>
            <div className="text-xl md:text-2xl font-bold text-gray-900 mb-1.5 md:mb-2">
              {stat.value}
            </div>
            <div className={`text-xs md:text-sm flex items-center gap-1 ${stat.trend === "up" ? "text-green-600" : "text-red-600"}`}>
              {stat.trend === "up" ? <FaArrowTrendUp className="w-3 h-3 md:w-3.5 md:h-3.5" /> : <FaArrowTrendDown className="w-3 h-3 md:w-3.5 md:h-3.5" />}
              {stat.change}
            </div>
          </div>
        ))}
      </div>

      {/* Transaction Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-4 md:p-6 border-b border-gray-200 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <h2 className="text-lg md:text-xl font-bold text-gray-900">
            {t('dashboard.employee.table.recentTransaction')}
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
              className="w-full pl-10 pr-4 py-2 sm:py-3 border border-[#C2C2C2] rounded-lg sm:rounded-xl focus:outline-none focus:ring-2 focus:ring-[#002244] text-sm sm:text-base"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-max">
            <thead className="bg-[#F5F7FA] border-b h-18 border-gray-200">
              <tr>
                <th className="px-3 md:px-6 py-3 text-left text-sm font-medium text-gray-700 uppercase whitespace-nowrap">{t('dashboard.employee.table.serviceName')}</th>
                <th className="px-3 md:px-6 py-3 text-left text-sm font-medium text-gray-700 uppercase whitespace-nowrap">{t('dashboard.employee.table.serviceDate')}</th>
                <th className="px-3 md:px-6 py-3 text-left text-sm font-medium text-gray-700 uppercase whitespace-nowrap">{t('dashboard.employee.table.payment')}</th>
                <th className="px-3 md:px-6 py-3 text-left text-sm font-medium text-gray-700 uppercase whitespace-nowrap">{t('dashboard.employee.table.discount')}</th>
                <th className="px-3 md:px-6 py-3 text-left text-sm font-medium text-gray-700 uppercase whitespace-nowrap">{t('dashboard.employee.table.outstanding')}</th>
                <th className="px-3 md:px-6 py-3 text-left text-sm font-medium text-gray-700 uppercase whitespace-nowrap">{t('dashboard.employee.table.progress')}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {paginatedTransactions.map((txn, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-3 md:px-6 py-4">
                    <div className="flex items-center gap-2 md:gap-3">
                      <div className="min-w-0">
                        <div className="font-medium text-gray-900 text-sm md:text-base whitespace-nowrap">{txn.serviceId}</div>
                        <div className="text-xs md:text-sm text-gray-500 whitespace-nowrap">{txn.customerName}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-3 md:px-6 py-4 text-xs md:text-sm text-gray-900 whitespace-nowrap">{txn.serviceDate}</td>
                  <td className="px-3 md:px-6 py-4 text-xs md:text-sm text-gray-900 whitespace-nowrap">{txn.payment}</td>
                  <td className="px-3 md:px-6 py-4 text-xs md:text-sm text-gray-900 whitespace-nowrap">{txn.discount}</td>
                  <td className="px-3 md:px-6 py-4 text-xs md:text-sm text-gray-900 whitespace-nowrap">{txn.outstanding}</td>
                  <td className="px-3 md:px-6 py-4">
                    <span
                      className={`inline-flex px-2 md:px-3 py-1 rounded-full text-xs md:text-sm whitespace-nowrap ${txn.progress === 'Completed'
                        ? 'bg-green-100 text-green-700'
                        : txn.progress === 'Processed'
                          ? 'bg-blue-100 text-blue-700'
                          : txn.progress === 'Pending'
                            ? 'bg-yellow-100 text-yellow-700'
                            : 'bg-gray-100 text-gray-700'
                        }`}
                    >
                      {txn.progress}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Common Pagination */}
        <Pagination
          currentPage={currentPage}
          totalItems={filteredTransactions.length}
          itemsPerPage={itemsPerPage}
          onPageChange={setCurrentPage}
        />
      </div>

      {/* Modals */}
      <CollectPaymentModal isOpen={isPaymentModalOpen} onClose={() => setIsPaymentModalOpen(false)} />
      <ApplyDiscountModal isOpen={isDiscountModalOpen} onClose={() => setIsDiscountModalOpen(false)} />
      <ResolveBillingModal isOpen={isBillingModalOpen} onClose={() => setIsBillingModalOpen(false)} />
    </div>
  );
};

export default PaymentManagement;
