


import React, { useEffect, useState } from "react";
import { useNavigate, useLocation, useParams, Link } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";
import { useTranslation } from "react-i18next";

function CustomerDetailsPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { customerId } = useParams();
const { t } = useTranslation();
  // eslint-disable-next-line no-unused-vars
  const [customer, setCustomer] = useState(location.state?.customer || null);
  // eslint-disable-next-line no-unused-vars
  const [fromPath, setFromPath] = useState(location.state?.fromPath || null);

  const customerData = {
    name: customer?.name || "Albert Flores",
    email: customer?.email || "albert.flores@gmail.com",
    address: customer?.address || "2118 Thornridge Dr, Syracuse, Connecticut 35624",
    location: customer?.location || { latitude: "23.8103° N", longitude: "90.4125° E" },
  };

  useEffect(() => {
    if (!customer && customerId) {
      // TODO: Replace with real API call
      // axios.get(`/api/customers/${customerId}`).then(res => setCustomer(res.data));
    }
  }, [customer, customerId]);

  const orders = [
    { id: 1, service: "Agro Drone Service", description: "Precision crop monitoring and field insights powered by aerial data.", image: 4, videos: 2, inf: 1, time: "10 minutes ago", date: "8 Sep, 2023" },
    { id: 2, service: "Agro Drone Service", description: "Precision crop monitoring and field insights powered by aerial data.", image: 4, videos: 2, inf: 1, time: "10 minutes ago", date: "8 Sep, 2023" },
    { id: 3, service: "Agro Drone Service", description: "Precision crop monitoring and field insights powered by aerial data.", image: 4, videos: 2, inf: 1, time: "10 minutes ago", date: "8 Sep, 2023" },
    { id: 4, service: "Agro Drone Service", description: "Precision crop monitoring and field insights powered by aerial data.", image: 4, videos: 2, inf: 1, time: "10 minutes ago", date: "8 Sep, 2023" },
    { id: 5, service: "Agro Drone Service", description: "Precision crop monitoring and field insights powered by aerial data.", image: 4, videos: 2, inf: 1, time: "10 minutes ago", date: "8 Sep, 2023" },
    { id: 6, service: "Agro Drone Service", description: "Precision crop monitoring and field insights powered by aerial data.", image: 4, videos: 2, inf: 1, time: "10 minutes ago", date: "8 Sep, 2023" },
  ];



  return (
    <div className="min-h-screen ">
      <div className="flex-1 p-6 md:px-12">
        {/* Back Button */}
        <button
            onClick={() => navigate(-1)}
          aria-label="Back"
          className="mb-2 text-xl p-1 sm:p-2  cursor-pointer"
        >
          <IoArrowBack className="w-6 h-6" />
        </button>

        {/* Customer Profile Section */}
        <div className="bg-white border border-gray-100 rounded-xl shadow-sm lg:bg-transparent lg:border-0 lg:shadow-none p-4 sm:p-5 md:p-6 mb-6 flex flex-col lg:flex-row gap-4 lg:gap-6 items-center lg:items-start">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-3 sm:gap-4 flex-1 text-center sm:text-left">
            <img
              src="https://i.pravatar.cc/80?img=12"
              alt={`${customerData.name} Profile`}
              className="w-14 h-14 sm:w-16 sm:h-16 rounded-full object-cover"
            />
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-1">{customerData.name}</h2>
              <p className="text-sm sm:text-base text-gray-600 mb-0.5">{customerData.email}</p>
              <p className="text-xs sm:text-sm text-gray-500">{customerData.address}</p>
            </div>
          </div>

          <div className="bg-green-50 border border-green-100 px-4 py-2 sm:px-5 sm:py-3 rounded-lg w-full sm:w-auto text-center sm:text-left mt-4 lg:mt-0">
            <div className="text-[11px] sm:text-xs text-gray-600 mb-1 font-medium">New Field (India Gate-wal)</div>
            <div className="text-xs sm:text-sm text-gray-800">
              Latitude: <span className="font-semibold">{customerData.location.latitude}</span>
            </div>
            <div className="text-xs sm:text-sm text-gray-800">
              Longitude: <span className="font-semibold">{customerData.location.longitude}</span>
            </div>
          </div>
        </div>

        {/* Orders Section */}
        <div className="bg-white rounded-xl shadow-sm p-5 sm:p-6 md:p-8 border border-gray-100 mb-6">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">
            {t('dashboard.employee.pages.orderDetails.totalOrder')}<span className="text-gray-600">({orders.length})</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {orders.map((order) => (
              <div key={order.id} className="bg-[#F7FFE5] border border-[#DCDCDC] rounded-xl p-5 flex flex-col justify-between">
                <div className="flex gap-4 mb-4">
                  <div className="w-14 h-14 bg-white rounded-lg flex items-center justify-center flex-shrink-0 shadow-sm">
                    <img src="https://cdn-icons-png.flaticon.com/512/3629/3629941.png" alt="Drone Service Icon" className="w-10 h-10 opacity-80" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-gray-900 mb-1.5 text-base">{order.service}</h4>
                    <p className="text-sm text-gray-600 leading-snug">{order.description}</p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-4 mb-4 text-sm text-gray-700">
                  <span className=" border bg-[#FFFFFF] border-[#DCDCDC] px-2  rounded-md flex justify-center items-center">{order.image} Image</span>
                  <span className=" border bg-[#FFFFFF] border-[#DCDCDC] px-2  rounded-md flex justify-center items-center">{order.videos} Videos</span>
                  <span className=" border bg-[#FFFFFF] border-[#DCDCDC] px-2  rounded-md flex justify-center items-center">{order.inf}  pdf</span>
                  <span className="ml-auto text-xs text-gray-500">{order.time}</span>
                </div>
                <Link to={`/employee/orders/${order.id}`}>
                 <button
                  
                  className="w-full bg-[#28A844] hover:bg-green-600 text-white font-semibold py-3 rounded-lg transition-colors text-sm shadow-sm"
                >
                  {t('dashboard.employee.pages.orderDetails.orderDetails')}
                </button>
                </Link>
               
              </div>
            ))}
          </div>
        </div>

        {/* KYC Section */}
        <div className="mt-6">
          <div className="flex items-center gap-3 mb-4">
            <h2 className="text-2xl font-bold text-gray-900">{t('dashboard.employee.pages.orderDetails.kycDocument')}</h2>

          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Aadhaar Card */}
            <div className="bg-gray-200 rounded-lg p-4 flex items-center justify-center min-h-[280px]">
              {/* Replace with actual Aadhaar card image */}
              <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRUtGqylBi7P-tFmrAnqZz7ekxGetT_433E0S8_vWYgy7EmP2kR_zC6ViifF0C-TpNYiy8&usqp=CAU" alt="" srcset="" />
            </div>

            {/* Passport */}
            <div className="bg-gray-300 rounded-lg p-8 flex items-center justify-center min-h-[180px]">
              {/* Replace with actual Passport image */}  
              <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTPENKscX6Sh2XjXF80KwSkWMV5CRf0XzViNQ&s" alt="" srcset="" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CustomerDetailsPage;





