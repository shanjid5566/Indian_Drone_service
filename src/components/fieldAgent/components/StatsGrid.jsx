import React from "react";

const StatsGrid = ({ statsData, staticCardHeaders, ICONS }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
      {statsData.map((stat, index) => {
        const IconComponent = ICONS[stat.icon];
        return (
          <div
            key={stat.id}
            className="bg-white rounded-lg shadow-sm p-5 relative"
          >
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <p className="text-black text-sm md:text-base mb-2 font-bold">
                  {staticCardHeaders[index]?.title}
                </p>
                <h3 className="text-2xl md:text-4xl font-semi text-black mb-2">
                  {stat.value}
                </h3>
                <p className="text-button-primary text-sm font-medium">
                  {stat.change}
                </p>
              </div>
              <div className={`${stat.bgColor} rounded-lg p-3 ml-4`}>
                {IconComponent && (
                  <IconComponent className="text-white" size={24} />
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default StatsGrid;
