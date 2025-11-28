import axios from "axios";
import React, { useEffect, useState } from "react";

const JoinCampaign = () => {
    const [campaigns, setCampaigns] = useState([]);
  useEffect(() => {
    axios
      .get("/MarketingDashboard/data/marketingLandingPage.json")
      .then((res) => {
        setCampaigns(res.data.allLoyaltyPrograms);
      })
      .catch((err) => {
        console.error("Error fetching training cards data:", err);
      });
  }, []);
  return (
    <div className="bg-[#E6EBF1] section-padding">
      <div className="section-container">
        <h1 className="lg:text-[40px] text-2xl sm:text-3xl font-medium text-center text-black mb-4 lg:mb-10">
          Join Our Campaign
        </h1>
        <div>
          <div className=" mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 xl:gap-6 lg:gap-5 gap-2.5">
              {campaigns.slice(0, 3).map((campaign) => (
                <div
                  key={campaign.id}
                  className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 p-4"
                >
                  <div className="h-52  mb-2 w-full overflow-hidden ">
                    <img
                      src={campaign.image}
                      alt={campaign.title}
                      className="w-full h-full object-cover rounded-md hover:scale-105 transition-transform duration-300"
                    />
                  </div>

                  <div className="">
                    <h3 className="text-xl font-semibold text-black mb-3">
                      {campaign.title}
                    </h3>

                    <p className="text-gray-600 mb-6 line-clamp-2 text-sm leading-relaxed">
                      {campaign.description}
                    </p>

                    <button
                      className="w-full text-white bg-[#28A844] font-semibold text-[16px] py-3 px-6 rounded-lg transition-all duration-300 hover:brightness-110"
                      
                    >
                      See Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JoinCampaign;
