import  { useEffect, useState } from "react";
import MapChart from "./MapChart";
import axiosInstance from "../../../config/axiosConfig";
import { t } from "i18next";

const RegionalDemandOverview = () => {
  const [data, setData] = useState({});

  useEffect(() => {
    axiosInstance
      .get("/MarketingDashboard/data/dynamicUserDataForMap.json")
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <div className="justify-center  bg-white px-6 flex flex-col md:flex-row gap-6 rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="w-full md:w-1/2">
        <h1 className="font-semibold text-3xl text-gray-900 mb-7">{t("dashboard.marketing.Heatmap")}</h1>

        <div className="flex gap-6 mb-6">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[#DC3545]"></div>
            <span className="text-[16px] text-gray-700">{t("dashboard.marketing.High")}</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[#FFC107]"></div>
            <span className="text-[16px] text-gray-700">{t("dashboard.marketing.Medium")}</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[#28A745]"></div>
            <span className="text-[16px] text-gray-700">{t("dashboard.marketing.Low")}</span>
          </div>
        </div>
        <MapChart />
      </div>

      <div className="w-full md:w-1/2 rounded-lg py-4">
        <h3 className="text-lg md:text-2xl lg:text-3xl font-semibold mb-3">{t("dashboard.marketing.DemandByRegion")}</h3>

        {Object.keys(data).length === 0 ? (
          <div className="text-sm text-gray-500">No region data</div>
        ) : (
          (() => {
            const entries = Object.entries(data).filter(
              ([, v]) => typeof v === "number"
            );
            const max = Math.max(...entries.map(([, v]) => v), 1);

            const groups = { high: [], medium: [], low: [] };
            entries.forEach(([region, users]) => {
              const ratio = users / max;
              if (ratio > 0.66) groups.high.push([region, users]);
              else if (ratio > 0.33) groups.medium.push([region, users]);
              else groups.low.push([region, users]);
            });

            const renderList = (items, color) => (
              <div className="flex flex-col gap-3">
                {items
                  .sort((a, b) => b[1] - a[1])
                  .map(([region, users]) => {
                    const operators = Math.max(1, Math.round(users / 6));
                    const pct = Math.round((users / max) * 100);
                    return (
                      <div key={region} className="flex flex-col gap-2">
                        <div className="flex items-center justify-between">
                          <div className="font-medium text-sm">{region}</div>
                          <div className="text-sm text-gray-600">
                            {users} user, {operators} operator
                          </div>
                        </div>

                        <div className="w-full bg-gray-100 rounded-full h-3 overflow-hidden">
                          <div
                            className="h-3 rounded-full"
                            style={{ width: `${pct}%`, background: color }}
                          />
                        </div>
                      </div>
                    );
                  })}
              </div>
            );

            return (
              <div className="grid grid-cols-1 gap-4 h-[500px] overflow-y-auto">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-3 h-3 rounded-full bg-[#DC3545]" />
                    <div className="font-semibold text-lg md:text-xl lg:text-2xl">{t("dashboard.marketing.High")}</div>
                  </div>
                  {renderList(groups.high, "#ef4444")}
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-3 h-3 rounded-full bg-[#FFC107]" />
                    <div className="font-semibold text-lg md:text-xl lg:text-2xl">{t("dashboard.marketing.Medium")}</div>
                  </div>
                  {renderList(groups.medium, "#f59e0b")}
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-3 h-3 rounded-full bg-[#28A745]" />
                    <div className="font-semibold text-lg md:text-xl lg:text-2xl">{t("dashboard.marketing.Low")}</div>
                  </div>
                  {renderList(groups.low, "#10b981")}
                </div>
              </div>
            );
          })()
        )}
      </div>
    </div>
  );
};

export default RegionalDemandOverview;
