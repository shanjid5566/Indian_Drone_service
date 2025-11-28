import LoyalityCampaingnOverview from "./components/LoyalityCampaingnOverview";
import RegionalDemandOverview from "./components/RegionalDemandOverview";
import SeasonalCampaignOverview from "./components/SeasonalCampaignOverview";

const Analytics = () => {
  return (
    <div className="md:px-12 mx-auto py-2 md:py-4 lg:py-8 px-4">
      <div className="flex flex-col gap-10">
        <RegionalDemandOverview />
        <SeasonalCampaignOverview />
        <LoyalityCampaingnOverview />
      </div>
    </div>
  );
};

export default Analytics;
