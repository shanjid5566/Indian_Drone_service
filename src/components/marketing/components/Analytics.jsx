import React from "react";
import MapChart from "./MapChart";
import HighDemandRegions from "./HighDemandRegions";
import Campaigns from "./Campaigns";

const Analytics = () => {
  return (
    <div>
      <div className="md:px-12 mx-auto pt-5 lg:mt-6 px-4">
        <div className="grid xl:grid-cols-2 gap-y-5  gap-5 bg-white shadow border border-gray-100 rounded-xl p-8">
          <div className="">
            <h1 className="font-semibold text-3xl text-gray-900 mb-7">
              Heatmap
            </h1>

            <div className="flex gap-6 mb-6">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <span className="text-[16px] text-gray-700">High</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <span className="text-[16px] text-gray-700">Medium</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <span className="text-[16px] text-gray-700">Low</span>
              </div>
            </div>
            <MapChart />
          </div>
          <div className="">
            <HighDemandRegions />
          </div>
        </div>
      </div>
      <Campaigns />
    </div>
    
  );
};

export default Analytics;
