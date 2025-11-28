import React, { useState, useEffect } from "react";
import axiosInstance from "../../../config/axiosConfig";
import { Link, useLocation } from "react-router-dom";
import CampaignModal from "./modals/CampaignModal";
import Pagination from "../../common/Pagination";
import { t } from "i18next";

export default function LoyalityCampaingnOverview() {
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [campaignModal, setCampaignModal] = useState(false);
  const location = useLocation();
  const url =
    location.pathname === "/marketing/campaigns"
      ? "/marketing/campaigns/seasonal"
      : "/marketing/campaigns/seasonal";

  const resultsPerPage = 6;

  useEffect(() => {
    fetchCampaigns();
  }, []);

  const fetchCampaigns = async () => {
    try {
      setLoading(true);
      // API endpoint ba JSON file URL ekhane diben
      const response = await axiosInstance.get(
        "/MarketingDashboard/data/marketingLandingPage.json"
      );

      setCampaigns(response.data.allLoyaltyPrograms);
      setError(null);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          err.message ||
          "Data fetch korte problem hoyeche"
      );
      console.error("Error fetching campaigns:", err);
    } finally {
      setLoading(false);
    }
  };
  console.log(campaigns);
  
  const startIndex = (currentPage - 1) * resultsPerPage;
  const endIndex = startIndex + resultsPerPage;
  const paginatedCampaigns = campaigns.slice(startIndex, endIndex);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600">Error: {error}</p>
          <button
            onClick={fetchCampaigns}
            className="mt-4 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className=" bg-white my-4 md:my-6 lg:mt-8 rounded-lg shadow-md ">
      <div className="">
        {/* Header */}
        <div className="flex justify-between items-center py-2 md:py-4 lg:py-4 mx-4 md:mx-2 lg:mx-3 p-2 md:p-4">
          <h1 className="font-bold  text-[#000000] text-lg md:text-2xl lg:text-3xl w-1/2">
            {t("dashboard.marketing.CampaignOverview.LoyaltyCampaignOverview")}
          </h1>
          <button
            onClick={() => setCampaignModal(true)}
            className="bg-[#28A844] hover:bg-green-600 text-white px-2 md:px-4 py-2 rounded flex  items-center gap-1 md:gap-2"
          >
            <span className="text-xl ">+</span>
            <span className="text-base md:text-lg">Create Campaign</span>
          </button>
        </div>

        {/* Table */}
        <div className="bg-white rounded-b-lg overflow-hidden">
          {campaigns.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500">No campaigns found</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr className="bg-[#F5F7FA]">
                    <th className="text-left px-6 py-3 text-sm md:text-base font-semibold text-black whitespace-nowrap">
                      {t("dashboard.marketing.CampaignOverview.CampaignName")}
                    </th>
                    <th className="text-left px-6 py-3 text-sm md:text-base font-semibold text-black whitespace-nowrap">
                      {t("dashboard.marketing.CampaignOverview.CampaignTypes")}
                    </th>
                    <th className="text-left px-6 py-3 text-sm md:text-base font-semibold text-black whitespace-nowrap">
                      {t("dashboard.marketing.CampaignOverview.LeadsGenerated")}
                    </th>
                    <th className="text-left px-6 py-3 text-sm md:text-base font-semibold text-black whitespace-nowrap">
                      {t("dashboard.marketing.CampaignOverview.ROI")}
                    </th>
                    <th className="px-6 py-3 text-sm md:text-base  font-semibold text-black text-center whitespace-nowrap">
                      {t("dashboard.marketing.CampaignOverview.Actions")}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedCampaigns.map((campaign, index) => (
                    <tr
                      key={campaign.id || index}
                      className="border-b border-gray-200 hover:bg-gray-50"
                    >
                      <td className="px-6 py-4 text-sm md:text-base text-black">
                        {campaign.title || campaign.campaignName}
                      </td>
                      <td className="px-6 py-4 text-sm md:text-base text-black">
                        {campaign.type || campaign.campaignType}
                      </td>
                      <td className="px-6 py-4 text-sm md:text-base text-black">
                        {campaign.leads || campaign.leadsGenerated}
                      </td>
                      <td className="px-6 py-4 text-sm md:text-base text-black">
                        {campaign.roi}
                      </td>
                      <td className="px-6 py-4 text-center">
                        <Link
                          to={`${url}/${campaign.id}`}
                          className="inline-block whitespace-nowrap bg-[#28A844] hover:bg-green-600 text-white font-semibold px-4 py-2 rounded text-sm min-w-[96px] text-center"
                        >
                          {t("dashboard.marketing.SeeDetails")}
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* Pagination */}
              <Pagination
                currentPage={currentPage}
                totalItems={campaigns.length}
                itemsPerPage={resultsPerPage}
                onPageChange={setCurrentPage}
              />
            </div>
          )}
        </div>
      </div>
      {campaignModal && (
        <CampaignModal onClose={() => setCampaignModal(false)} />
      )}
    </div>
  );
}
