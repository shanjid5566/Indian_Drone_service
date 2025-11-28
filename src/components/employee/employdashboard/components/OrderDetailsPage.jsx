
import React, { useState, useRef } from "react";
import { Star } from "lucide-react";
import { FaArrowLeft, FaPlay } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";
import { useTranslation } from "react-i18next";

// ---------------- VideoCard Component ---------------
function VideoCard({ src }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef(null);

  const handlePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="relative aspect-video rounded-lg overflow-hidden group">
      <video
        ref={videoRef}
        src={src}
        type="video/mp4"
        className="w-full h-full object-cover"
        onClick={handlePlay}
      />
      {!isPlaying && (
        <button
          onClick={handlePlay}
          className="absolute inset-0 flex items-center justify-center bg-black/40 group-hover:bg-black/50 transition"
        >
          <div className="flex items-center justify-center w-14 h-14 bg-white rounded-full shadow-lg">
            <FaPlay className="text-black text-3xl" />
          </div>
        </button>
      )}
    </div>
  );
}

// ---------------- Main Component ----------------
export default function OrderDetailsPage() {
   const { t } = useTranslation();
  const [orderData] = useState({
    serviceOrderId: "#0123456789",
    customerOrderId: "#0123456789",
    basicSpecifics: [
      { label: t('dashboard.employee.pages.orderDetails.customerID'), value: "#0123456789" },
      { label: t('dashboard.employee.pages.orderDetails.subServiceID'), value: "#0123456789" },
      { label: t('dashboard.employee.pages.orderDetails.droneOperatorID'), value: "#0123456789" },
      { label: t('dashboard.employee.pages.orderDetails.droneID'), value: "#0123456789" },
      { label: t('dashboard.employee.pages.orderDetails.customerOrderID'), value: "#0123456789" },
    ],
    scheduling: {
      serviceLocation:
        "Marine Drive, Netaji Subhash Chandra Bose Road, Churchgate, South Mumbai",
      serviceStart: "23-sep-25",
      serviceEnd: "23-sep-25",
    },
    rescheduling: {
      rescheduledBy: "Customer (self)",
      rescheduledDate: "23-sep-25",
      rescheduleCount: "7 times",
      rescheduleReason:
        "Marine Drive, Netaji Subhash Chandra Bose Road, Churchgate, South Mumbai",
    },
    serviceMetrics: [
      { label: t('dashboard.employee.pages.orderDetails.serviceArea'), value: "1" },
      { label: t('dashboard.employee.pages.orderDetails.flightHours'), value: "1.5h" },
      { label: t('dashboard.employee.pages.orderDetails.unitCost'), value: "₹150" },
      { label: t('dashboard.employee.pages.orderDetails.additionalCosts'), value: "No additional cost" },
      { label: t('dashboard.employee.pages.orderDetails.discountAmount'), value: "₹00" },
      { label: t('dashboard.employee.pages.orderDetails.serviceOrderCost'), value: "₹150" },
    ],
    paymentStatus: "Paid",
    notes: {
      specialInstructions: "No comments",
      acknowledgmentStatus: "Accepted",
    },
  });
 

  const [images] = useState([
    "https://images.unsplash.com/photo-1599328580087-15c9dab481f3?w=500&auto=format&fit=crop&q=60",
    "https://images.unsplash.com/photo-1609692029268-f9ba9b2a728b?w=500&auto=format&fit=crop&q=60",
    "https://images.unsplash.com/photo-1604129319050-36cc1107bead?w=500&auto=format&fit=crop&q=60",
    "https://plus.unsplash.com/premium_photo-1661917179706-33e305a4ee45?w=500&auto=format&fit=crop&q=60",
  ]);

  const [videos] = useState([
    "https://media.istockphoto.com/id/1151123617/video/aerial-view-rice-field-terraces-panoramic-hillside-with-rice-farming-on-mountains.mp4?s=mp4-640x640-is&k=20&c=hmY8doayeuO0G9wSRRdZnOzPMAa6NS6t-wK84NHZymw=",
    "https://media.istockphoto.com/id/1276446161/video/inaho-bathed-in-the-light-of-dusk.mp4?s=mp4-640x640-is&k=20&c=nHuYPo_sigSbHYgFyXEWpntw7XCPPatO-_oxz3CRtnE=",
  ]);

  const [rating, setRating] = useState(4);
  const [hover, setHover] = useState(0);
  const [tip, setTip] = useState("$30");
  const [review, setReview] = useState("");
  const navigate = useNavigate();

  return (


    <main className="p-4 md:px-12 ">
      <div className="max-w-8xl mx-auto rounded ">
        {/* ✅ Back Button */}
        <button
          onClick={() => navigate(-1)}
          aria-label="Back"
          className="mb-2 text-xl p-1 sm:p-2  cursor-pointer"
        >
          <IoArrowBack className="w-6 h-6" />
        </button>

        <div className="p-2 md:p-5 ">

          {/* Order IDs */}
          <div className="mb-6 space-y-2">
            <div className="flex justify-between items-center text-sm py-1.5">
              <span className="font-medium text-base md:text-lg">
                {t('dashboard.employee.pages.orderDetails.serviceOrderID')}
              </span>
              <span className="font-normal text-sm md:text-base">
                {orderData.serviceOrderId}
              </span>
            </div>
            <div className="flex justify-between items-center text-sm py-1.5">
              <span className="font-medium text-base md:text-lg">
                {t('dashboard.employee.pages.orderDetails.customerOrderID')}
              </span>
              <span className="font-normal text-sm md:text-base">
                {orderData.customerOrderId}
              </span>
            </div>
          </div>

          {/* Basic Specifics */}
          <div className="mb-6">
            <h3 className="text-xl md:text-2xl font-semibold mb-3 pt-2 border-t border-gray-300">
              {t('dashboard.employee.pages.orderDetails.basicSpecificsInfo')}
            </h3>
            <div className="space-y-2">
              {orderData.basicSpecifics.map((item, idx) => (
                <div
                  key={idx}
                  className="flex justify-between items-center text-sm py-1.5"
                >
                  <span className="font-medium text-base md:text-lg">
                    {item.label}:
                  </span>
                  <span className="font-normal text-sm md:text-base">
                    {item.value}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Scheduling */}
          <div className="mb-6">
            <h3 className="text-xl md:text-2xl font-semibold mb-3 pt-2 border-t border-gray-300">
              {t('dashboard.employee.pages.orderDetails.scheduling')}
            </h3>
            <div className="space-y-2">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center text-sm py-1.5">
                <span className="font-medium text-base md:text-lg">
                  {t('dashboard.employee.pages.orderDetails.serviceLocation')}  
                </span>
                <span className="font-normal text-sm md:text-base mt-1 md:mt-0">
                  {orderData.scheduling.serviceLocation}
                </span>
              </div>
              <div className="flex justify-between items-center text-sm py-1.5">
                <span className="font-medium text-base md:text-lg">
                  {t('dashboard.employee.pages.orderDetails.serviceStart')}
                </span>
                <span className="font-normal text-sm md:text-base">
                  {orderData.scheduling.serviceStart}
                </span>
              </div>
              <div className="flex justify-between items-center text-sm py-1.5">
                <span className="font-medium text-base md:text-lg">
                  {t('dashboard.employee.pages.orderDetails.serviceEnd')}
                </span>
                <span className="font-normal text-sm md:text-base">
                  {orderData.scheduling.serviceEnd}
                </span>
              </div>
            </div>
          </div>

          {/* Rescheduling */}
          <div className="mb-6">
            <h3 className="text-xl md:text-2xl font-semibold mb-3 pt-2 border-t border-gray-300">
              {t('dashboard.employee.pages.orderDetails.reschedulingInfo')}
            </h3>
            <div className="space-y-2">
              <div className="flex justify-between items-center text-sm py-1.5">
                <span className="font-medium text-base md:text-lg">
                  {t('dashboard.employee.pages.orderDetails.rescheduledBy')}
                </span>
                <span className="font-normal text-sm md:text-base">
                  {orderData.rescheduling.rescheduledBy}
                </span>
              </div>
              <div className="flex justify-between items-center text-sm py-1.5">
                <span className="font-medium text-base md:text-lg">
                  {t('dashboard.employee.pages.orderDetails.rescheduledDate')}
                </span>
                <span className="font-normal text-sm md:text-base">
                  {orderData.rescheduling.rescheduledDate}
                </span>
              </div>
              <div className="flex justify-between items-center text-sm py-1.5">
                <span className="font-medium text-base md:text-lg">
                  {t('dashboard.employee.pages.orderDetails.rescheduleCount')}
                </span>
                <span className="font-normal text-sm md:text-base">
                  {orderData.rescheduling.rescheduleCount}
                </span>
              </div>
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center text-sm py-1.5">
                <span className="font-medium text-base md:text-lg">
                  {t('dashboard.employee.pages.orderDetails.serviceLocation')}
                </span>
                <span className="font-normal text-sm md:text-base mt-1 md:mt-0">
                  {orderData.rescheduling.rescheduleReason}
                </span>
              </div>
            </div>
          </div>

          {/* Service Metrics */}
          <div className="mb-6">
            <h3 className="text-xl md:text-2xl font-semibold mb-3 pt-2 border-t border-gray-300">
              {t('dashboard.employee.pages.orderDetails.serviceMetrics')}
            </h3>
            <div className="space-y-2">
              {orderData.serviceMetrics.map((item, idx) => (
                <div
                  key={idx}
                  className="flex justify-between items-center text-sm py-1.5"
                >
                  <span className="font-medium text-base md:text-lg">
                    {item.label}:
                  </span>
                  <span className="font-normal text-sm md:text-base">
                    {item.value}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Payment & Status */}
          <div className="mb-6">
            <h3 className="text-xl md:text-2xl font-semibold mb-3 pt-2 border-t border-gray-300">
              {t('dashboard.employee.pages.orderDetails.paymentStatus')}
            </h3>
            <div className="flex justify-between items-center text-sm py-1.5">
              <span className="font-medium text-base md:text-lg">
                {t('dashboard.employee.pages.orderDetails.paymentStatus')}
              </span>
              <span className="font-normal text-sm md:text-base">
                {orderData.paymentStatus}
              </span>
            </div>
          </div>

          {/* Notes */}
          <div className="mb-6">
            <h3 className="text-xl md:text-2xl font-semibold mb-3 pt-2 border-t border-gray-300">
              {t('dashboard.employee.pages.orderDetails.notesConfirmation')}
            </h3>
            <div className="space-y-2">
              {Object.entries(orderData.notes).map(([key, value], idx) => (
                <div
                  key={idx}
                  className="flex justify-between items-center text-sm py-1.5"
                >
                  <span className="font-medium text-base md:text-lg">
                    {key.replace(/([A-Z])/g, " $1")}:
                  </span>
                  <span className="font-normal text-sm md:text-base">
                    {value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-10">
          {/* Images */}
          <div className="mb-6">
            <h3 className="text-xl md:text-2xl font-semibold mb-3 pb-2">
              {t('dashboard.employee.pages.orderDetails.images')}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {images.map((img, idx) => (
                <div
                  key={idx}
                  className="aspect-video rounded-lg overflow-hidden"
                >
                  <img
                    src={img}
                    alt={`Image ${idx + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Videos */}
          <div className="mb-6">
            <h3 className="text-xl md:text-2xl font-semibold mb-3 pb-2">
              {t('dashboard.employee.pages.orderDetails.videos')}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {videos.map((video, idx) => (
                <VideoCard key={idx} src={video} />
              ))}
            </div>
          </div>

          {/* Feedback */}
          <div className="mb-6 bg-[#F0FFF1] rounded-lg p-6 mt-10 shadow-sm">
            <h2 className="text-xl md:text-2xl font-semibold text-gray-900 mb-1">
              {t('dashboard.employee.pages.orderDetails.customerFeedback')}
            </h2>
            <p className="text-gray-600 text-lg mb-6">
              {t('dashboard.employee.pages.orderDetails.customerFeedback')}
            </p>

            {/* Rating */}
            <div className="mb-6">
              <p className="text-xl font-medium text-gray-900 mb-2">
                {t('dashboard.employee.pages.orderDetails.rateYourDroneOperator')}
              </p>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    size={34}
                    className={`cursor-pointer transition-colors duration-200 ${star <= (hover || rating)
                      ? "fill-yellow-400 text-yellow-400"
                      : "text-gray-300"
                      }`}
                    onMouseEnter={() => setHover(star)}
                    onMouseLeave={() => setHover(0)}
                    onClick={() => setRating(star)}
                  />
                ))}
              </div>
            </div>

            {/* Tips */}
            <div className="mb-6">
              <label
                htmlFor="tips"
                className="block text-base font-medium text-gray-900 mb-2"
              >
                {t('dashboard.employee.pages.orderDetails.tips')}
              </label>
              <input
                id="tips"
                type="text"
                value={tip}
                onChange={(e) => setTip(e.target.value)}
                className="w-full rounded-md border border-gray-300 px-4 py-2 text-gray-900 focus:outline-none focus:ring-2 bg-white"
              />
            </div>

            {/* Review */}
            <div>
              <label
                htmlFor="review"
                className="block text-base font-medium text-gray-900 mb-2"
              >
                {t('dashboard.employee.pages.orderDetails.review')}
              </label>
              <textarea
                id="review"
                placeholder={t('dashboard.employee.pages.orderDetails.review')}
                value={review}
                onChange={(e) => setReview(e.target.value)}
                rows="4"
                className="w-full rounded-md border border-gray-300 px-4 py-2 text-gray-900 focus:outline-none focus:ring-2 bg-white resize-none"
              />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
