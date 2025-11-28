import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { IoChevronDown, IoArrowBack } from "react-icons/io5";

export default function FieldAgentCreateServiceModal({
  isOpen,
  onClose,
  onSubmit,
}) {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    serviceTitle: t("dashboard.fieldAgent.createServiceModal.AquaDomoService"),
    servicePrice: t("dashboard.fieldAgent.createServiceModal.PriceValue"),
    industry: "Mapping & Surveying",
    subCategory: "Domo Mapping & Surveying (MMD1)",
    serviceDetails: "",
    serviceLocation: t(
      "dashboard.fieldAgent.createServiceModal.ServiceLocationValue"
    ),
  });

  const handleSubmit = () => {
    if (onSubmit) {
      onSubmit(formData);
    }
    console.log("Form submitted:", formData);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 bg-opacity-50 flex items-center justify-center p-6 z-100  0">
      <div className="bg-[#F5F5F5] rounded-lg w-full max-w-xl max-h-[90vh] overflow-y-auto shadow-xl px-1">
        {/* Header */}
        <div className="sticky top-0 bg-[#F5F5F5] px-3 md:px-4 py-2 md:py-3 border-gray-200 flex items-center">
          <button
            onClick={onClose}
            className="text-[#002244] hover:opacity-70 transition-opacity md:ml-2"
            aria-label="Go back"
          >
            <IoArrowBack size={20} />
          </button>
          <h2 className="text-xl md:text-2xl  font-semibold text-[#002244] text-center w-full mr-8">
            {t("dashboard.fieldAgent.createServiceModal.CreateService")}
          </h2>
        </div>

        {/* Form Content */}
        <div className="p-4 sm:p-6 space-y-1 md:space-y-3 lg:space-x-3.5">
          {/* Service Title */}
          <div>
            <label className="block text-sm md:text-base font-medium text-[#002244] mb-2">
              {t("dashboard.fieldAgent.createServiceModal.ServiceTitle")}
            </label>
            <input
              type="text"
              value={formData.serviceTitle}
              onChange={(e) =>
                setFormData({ ...formData, serviceTitle: e.target.value })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2  bg-white text-sm"
            />
          </div>

          {/* Service Price */}
          <div>
            <label className="block text-sm md:text-base font-medium text-[#002244] mb-2">
              {t("dashboard.fieldAgent.createServiceModal.ServicePrice")}
            </label>
            <div className="relative">
              <input
                type="text"
                value={formData.servicePrice}
                onChange={(e) =>
                  setFormData({ ...formData, servicePrice: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2  bg-white text-sm"
              />
            </div>
          </div>

          {/* Industry */}
          <div>
            <label className="block text-sm md:text-base font-medium text-[#002244] mb-2">
              {t("dashboard.fieldAgent.createServiceModal.Industry")}
            </label>
            <div className="relative">
              <select
                value={formData.industry}
                onChange={(e) =>
                  setFormData({ ...formData, industry: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2  appearance-none bg-white text-sm"
              >
                <option>
                  {t("dashboard.fieldAgent.createServiceModal.IndustryValue")}
                </option>
                <option>
                  {t("dashboard.fieldAgent.createServiceModal.Agriculture")}
                </option>
              </select>
              <IoChevronDown
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none"
                size={20}
              />
            </div>
          </div>

          {/* Sub category */}
          <div>
            <label className="block text-sm md:text-base font-medium text-[#002244] mb-2">
              {t("dashboard.fieldAgent.createServiceModal.SubCategory")}
            </label>
            <div className="relative">
              <select
                value={formData.subCategory}
                onChange={(e) =>
                  setFormData({ ...formData, subCategory: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2  appearance-none bg-white text-sm"
              >
                <option>
                  {t(
                    "dashboard.fieldAgent.createServiceModal.SubCategoryValue"
                  )}
                </option>
              </select>
              <IoChevronDown
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none"
                size={20}
              />
            </div>
          </div>

          {/* Service Details */}
          <div>
            <label className="block text-sm md:text-base font-medium text-[#002244] mb-2">
              {t("dashboard.fieldAgent.createServiceModal.ServiceDetails")}
            </label>
            <textarea
              value={formData.serviceDetails}
              onChange={(e) =>
                setFormData({ ...formData, serviceDetails: e.target.value })
              }
              placeholder={t(
                "dashboard.fieldAgent.createServiceModal.DescribeYourService"
              )}
              rows="4"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2  resize-none bg-white text-sm"
            />
          </div>

          {/* Service location */}
          <div>
            <label className="block text-sm md:text-base font-medium text-[#002244] mb-2">
              {t("dashboard.fieldAgent.createServiceModal.ServiceDetails")}
            </label>
            <input
              type="text"
              value={formData.serviceLocation}
              onChange={(e) =>
                setFormData({ ...formData, serviceLocation: e.target.value })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2  bg-white text-sm"
            />
          </div>

          {/* Submit Button */}
          <button
            onClick={handleSubmit}
            className="w-full bg-[#28A844] text-[#FFFFFF] py-3 rounded-md font-medium hover:bg-[#228b3a] transition-colors mt-6 text-sm sm:text-base"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}
