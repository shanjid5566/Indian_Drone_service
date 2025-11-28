import { MapPin, Users, ChevronDown } from "lucide-react";
import { useTranslation } from "react-i18next";

const TargetedAudience = () => {
  const { t } = useTranslation();
    const locations = [
    "Gujrat",
    "Chennai",
    "Lucknow",
    "Hydrabad",
    "Mumbai",
    "Rajhasthan",
    "Delhi",
  ];
    return (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h1 className="font-semibold text-3xl text-gray-900 mb-7">
            {t('audience.title')}
          </h1>

          {/* Location Section */}
          <div className="mt-6 mb-6 lg:mb-7">
            <div className="flex items-center gap-3 lg:gap-5 mb-3 lg:mb-5">
              <MapPin className="w-6 h-6 text-black" />
              <span className="font-medium text-[16px] text-black">{t('audience.location')}</span>
            </div>
            <div className="flex flex-wrap gap-2 lg:gap-5">
              {locations.map((location, index) => (
                <span
                  key={index}
                  className="px-3 xl:px-6 border-none shadow-none py-1 btn btn-sm lg:btn-md xl:btn-lg font-semibold p-2.5 bg-red-100 rounded text-[16px] text-gray-700"
                >
                  {location}
                </span>
              ))}
            </div>
          </div>

          {/* Demographics Section */}
          <div className="mb-6 lg:mb-7 *:text-[16px]">
            <div className="flex items-center gap-3 lg:gap-5 mb-3 lg:mb-5">
              <Users className="w-6 h-6 text-black" />
              <span className="font-medium text-[16px] text-black">{t('audience.demographics')}</span>
            </div>
            <div className="space-y-2">
              <p className="text-black text-xl font-medium">
                <span className="">{t('audience.age')}:</span> 22 - 55
              </p>
              <p className="text-black text-xl font-medium">
                <span className="">{t('audience.income')}:</span> $75k+
              </p>
            </div>
          </div>

          {/* Audience Type Section */}
          <div>
            <h3 className=" text-black mb-2 lg:mb-3 text-[16px] font-medium">{t('audience.audienceType')}</h3>
            <p className="text-black font-medium text-xl">
              Real estate developers & investor
            </p>
          </div>
        </div>
    );
};

export default TargetedAudience;