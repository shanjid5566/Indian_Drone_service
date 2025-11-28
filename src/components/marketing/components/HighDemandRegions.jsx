export default function HighDemandRegions() {
  const regions = [
    { name: 'Gujrat', users: 256, operators: 40, color: 'bg-red-500', percentage: 90 },
    { name: 'Chennai', users: 156, operators: 10, color: 'bg-yellow-500', percentage: 55 },
    { name: 'Mumbai', users: 56, operators: 10, color: 'bg-green-500', percentage: 25 },
    { name: 'Delhi', users: 356, operators: 10, color: 'bg-red-500', percentage: 95 },
    { name: 'Gujrat', users: 256, operators: 40, color: 'bg-red-500', percentage: 90 },
    { name: 'Chennai', users: 156, operators: 10, color: 'bg-yellow-500', percentage: 55 },
  ];

  return (
    <div className="mx-auto">
      <h1 className="font-semibold text-3xl text-gray-900 mb-7">High-Demand Regions</h1>
      
      <div className="space-y-6">
        {regions.map((region, index) => (
          <div key={index} className="">
            <div className="flex justify-between items-center mb-3">
              <h2 className="text-lg font-semibold text-gray-900">{region.name}</h2>
              <span className="text-sm text-gray-600">
                {region.users} user, {region.operators} operator
              </span>
            </div>
            
            <div className="relative h-3 w-full bg-gray-200 rounded-full overflow-hidden">
              <div 
                className={`h-full ${region.color} rounded-full transition-all duration-300`}
                style={{ width: `${region.percentage}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}