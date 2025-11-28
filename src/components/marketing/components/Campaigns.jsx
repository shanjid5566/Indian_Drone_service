import LoyalityCampaingnOverview from "./LoyalityCampaingnOverview";
import SeasonalCampaignOverview from "./SeasonalCampaignOverview";

const Campaigns = () => {
  return (
    <div className="bg-[#fafffd] px-4  md:px-12">
      <SeasonalCampaignOverview />
      <LoyalityCampaingnOverview />
    </div>
  );
};

export default Campaigns;
