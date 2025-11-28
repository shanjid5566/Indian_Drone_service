import React, { useState, useCallback, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";

import { FaChevronLeft } from "react-icons/fa";
import { HiLocationMarker } from "react-icons/hi";
import { FiUpload } from "react-icons/fi";
import { AiFillCloseCircle } from "react-icons/ai";
import { IoChevronDown, IoCloseCircleOutline } from "react-icons/io5";
import { AiOutlineClose } from "react-icons/ai";
import { IoIosArrowDown } from "react-icons/io";
import IndustrySelect from "./IndustrySelect";

// categories are represented by stable IDs; translations are stored in locales
const categoryData = {
  mappingAndSurveying: [
    "droneMapping",
    "generalSurveying",
    "groundCollection",
    "dataAnalysis",
  ],
  aerialMediaServices: [
    "aerialPhotography",
    "cinematography",
    "weddingCoverage",
    "editing",
  ],
  realEstateMarketing: [
    "realEstateMarketingServices",
    "residentialPhotography",
    "landSurveying",
    "roofInspection",
  ],
  agriculture: [
    "agriculturalServices",
    "agriculturalSpray",
    "agriculturalSpread",
  ],
  inspectionInfrastructure: [
    "infrastructureInspectionServices",
    "aerialInspections",
    "constructionSiteMonitoring",
    "generalInfrastructure",
  ],
  specializedOperations: [
    "droneDeliveryServices",
    "boatingWaterSports",
    "sports",
  ],
  supportTraining: ["droneMaintenance", "droneTraining"],
  other: ["miscellaneous"],
};

const INITIAL_FORM = {
  firstName: "",
  middleName: "",
  lastName: "",
  alsoKnownAs: "",
  phone: "",
  email: "",
  geoLocation: "",
  district: "",
  mandal: "",
  village: "",
  registeredBy: "",
  kycDocument: null,
  street: "",
  city: "",
  state: "",
  postalCode: "",
  country: "",
  industry: "",
  subcategories: [],
  // For Step 3 we'll store an array of service locations
  locations: [
    {
      locationName: "",
      latitude: "",
      longitude: "",
      landSize: "",
      unit: "Acres",
      accessInstructions: "",
    },
  ],
};

export default function RegistrationModal({ isOpen, onClose }) {
  const [modalStep, setModalStep] = useState(1);
  const [validationError, setValidationError] = useState("");
  const [formData, setFormData] = useState(INITIAL_FORM);
  const { t } = useTranslation();
  const panelRef = useRef(null);

  const subcategoryRef = useRef(null);
  const scrollContainerRef = useRef(null);
  const industryDropdownRef = useRef(null);

  const handleInputChange = useCallback(
    (e) => {
      const { name, value, files, type } = e.target;
      if (validationError) setValidationError("");
      setFormData((prev) => ({
        ...prev,
        [name]: type === "file" ? files[0] : value,
      }));
    },
    [validationError]
  );

  const handleClose = useCallback(() => {
    setModalStep(1);
    setValidationError("");
    setFormData(INITIAL_FORM);
    onClose();
  }, [onClose]);

  const validateStep = useCallback(() => {
    const requiredFieldsByStep = {
      1: ["firstName", "lastName", "phone", "geoLocation", "registeredBy"],
      2: [
        "street",
        "city",
        "state",
        "postalCode",
        "country",
        "industry",
        "kycDocument",
      ],
    };

    const missingFields =
      requiredFieldsByStep[modalStep]?.filter((key) => !formData[key]) || [];

    if (missingFields.length > 0) {
      if (
        modalStep === 2 &&
        formData.industry &&
        formData.subcategories.length === 0
      ) {
        return t("SubCategoryValidation");
      }
      // ---------------------------------

      return t(
        modalStep === 1
          ? "Please fill all required fields in Customer Info (* marked)."
          : "Please fill all required fields in Address Details (* marked)."
      );
    }

    return "";
  }, [formData, modalStep, t]);

  const nextStep = useCallback(() => {
    const error = validateStep();
    if (error) return setValidationError(error);
    setModalStep((prev) => Math.min(prev + 1, 3));
  }, [validateStep]);

  const prevStep = useCallback(() => {
    setModalStep((prev) => Math.max(prev - 1, 1));
    setValidationError("");
  }, []);

  const handleConfirm = useCallback(() => {
    console.log(" Final Form Submitted:", formData);
    handleClose();
  }, [formData, handleClose]);

  const handleIndustrySelect = useCallback(
    (industry) => {
      if (validationError) setValidationError("");
      setFormData((prev) => ({
        ...prev,
        industry: industry,
        subcategories: [],
      }));
    },
    [validationError]
  );

  const handleSubcategorySelect = useCallback(
    (subcategory) => {
      if (!formData.subcategories.includes(subcategory)) {
        if (validationError) setValidationError("");
        // ---------------------------------
        const newList = [...formData.subcategories, subcategory];
        setFormData((prev) => ({ ...prev, subcategories: newList }));

        console.clear();
        console.log("====================================");
        console.log("Industry:", formData.industry);
        console.log("Sub category:", subcategory);
        console.log("------------------------------------");
        console.log("finally", newList);
        console.log("====================================");
        // ----------------------------------------
      }
    },
    [formData.industry, formData.subcategories, validationError] // validationError যোগ করা হয়েছে
  );

  const removeSubcategory = useCallback(
    (subcategoryToRemove) => {
      const newList = formData.subcategories.filter(
        (item) => item !== subcategoryToRemove
      );
      setFormData((prev) => ({ ...prev, subcategories: newList }));
    },
    [formData.subcategories]
  );

  useEffect(() => {
    if (!isOpen) return;

    const handleOutsideClick = (e) => {
      if (panelRef.current && !panelRef.current.contains(e.target)) {
        handleClose();
      }
    };

    window.addEventListener("mousedown", handleOutsideClick);
    return () => {
      window.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isOpen, handleClose]);

  // Auto-scroll to subcategory section when industry is selected
  useEffect(() => {
    if (
      formData.industry &&
      subcategoryRef.current &&
      scrollContainerRef.current
    ) {
      setTimeout(() => {
        const container = scrollContainerRef.current;
        const element = subcategoryRef.current;

        if (container && element) {
          const elementTop = element.offsetTop;

          // Scroll to show the element with some padding
          container.scrollTo({
            top: elementTop - 20,
            behavior: "smooth",
          });
        }
      }, 150);
    }
  }, [formData.industry]);

  // Handle industry dropdown toggle and scroll
  const handleIndustryDropdownToggle = useCallback(
    (isDropdownOpen) => {
      if (isDropdownOpen && scrollContainerRef.current) {
        setTimeout(() => {
          const container = scrollContainerRef.current;

          // If industry is selected and subcategory section exists, scroll to it
          if (formData.industry && subcategoryRef.current) {
            const element = subcategoryRef.current;
            const elementTop = element.offsetTop;

            container.scrollTo({
              top: elementTop - 20,
              behavior: "smooth",
            });
          }
          // Otherwise, scroll to industry dropdown
          else if (industryDropdownRef.current) {
            const element = industryDropdownRef.current;
            const elementTop = element.offsetTop;

            container.scrollTo({
              top: elementTop - 100,
              behavior: "smooth",
            });
          }
        }, 100);
      }
    },
    [formData.industry]
  );

  if (!isOpen) return null;

  const stepTitles = [
    t("dashboard.fieldAgent.FirstModal.customerInfo"),
    t("dashboard.fieldAgent.SecondModal.addressDetails"),
    t("dashboard.fieldAgent.ThirdModal.serviceLocations"),
  ];

  const industryList = Object.keys(categoryData);
  const subcategoryList = formData.industry
    ? categoryData[formData.industry]
    : [];

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center
       bg-black/60 transition-opacity duration-300
       ${isOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}
    >
      <div
        ref={panelRef}
        className={`bg-white w-full max-w-xl mx-4 md:mx-6 rounded-lg shadow-lg max-h-[80vh] flex flex-col
         transform transition-transform duration-300 px-2 
         ${isOpen ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"}`}
      >
        {/* Header */}
        <div className="sticky top-0 bg-white border-b rounded-t-2xl border-gray-200 px-2 py-2 md:py-4 flex items-center gap-4 z-10">
          {/* STEP 1: No Back Button */}
          {modalStep > 1 && (
            <button
              onClick={prevStep}
              className="text-2xl text-gray-600 transition w-10 h-10 flex justify-center items-center"
            >
              <FaChevronLeft className="w-6 h-5" />
            </button>
          )}
          <h2 className="text-xl  font-semibold  flex-1">
            {stepTitles[modalStep - 1]}
          </h2>
          {/* STEP 2 & 3: No Cross Button */}
          {modalStep === 1 && (
            <button
              onClick={handleClose}
              aria-label="Close"
              className=" text-gray-600 transition w-10 h-10 flex justify-center items-center"
            >
              <AiOutlineClose className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Scrollable Body */}
        <div
          ref={scrollContainerRef}
          className="flex-1 overflow-y-auto p-4 space-y-2.5 md:space-y-4"
        >
          {/* Step 1 - Customer Info */}
          {modalStep === 1 && (
            <div className="space-y-2.5 md:space-y-3">
              {[
                {
                  name: "firstName",
                  label: t("dashboard.fieldAgent.FirstModal.firstName"),
                  required: true,
                },
                {
                  name: "middleName",
                  label: t("dashboard.fieldAgent.FirstModal.middleName"),
                },
                {
                  name: "lastName",
                  label: t("dashboard.fieldAgent.FirstModal.lastName"),
                  required: true,
                },
                {
                  name: "alsoKnownAs",
                  label: t("dashboard.fieldAgent.FirstModal.alsoKnownAs"),
                },
                {
                  name: "phone",
                  label: t("dashboard.fieldAgent.FirstModal.phone"),
                  required: true,
                  type: "tel",
                  placeholder: "+92 9876543210",
                },
                {
                  name: "email",
                  label: t("dashboard.fieldAgent.FirstModal.email"),
                  type: "email",
                  placeholder: "example@gmail.com",
                },
              ].map((field) => (
                <div key={field.name}>
                  <label className="block text-sm md:text-base font-medium">
                    {field.label}
                    {field.required && <span className="text-red-500">*</span>}
                  </label>
                  <input
                    type={field.type || "text"}
                    name={field.name}
                    value={formData[field.name]}
                    onChange={handleInputChange}
                    placeholder={field.placeholder || field.label}
                    className="w-full px-4 py-2 border  border-black/30  rounded-lg focus:ring-black"
                  />
                </div>
              ))}

              {/* Geo Location */}
              <div>
                <label className="block text-sm md:text-base font-medium">
                  {t("dashboard.fieldAgent.FirstModal.geoLocation")}
                  <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    name="geoLocation"
                    value={formData.geoLocation}
                    onChange={handleInputChange}
                    placeholder={t(
                      "dashboard.fieldAgent.FirstModal.selectOnMap"
                    )}
                    className="w-full px-4 py-2 border border-black/30 rounded-lg focus:ring-black"
                  />
                  <HiLocationMarker className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                </div>
              </div>

              {/* District / Mandal / Village */}
              {["district", "mandal", "village"].map((key) => (
                <div key={key}>
                  <label className="block text-sm md:text-base font-medium">
                    {t(`dashboard.fieldAgent.FirstModal.${key}`)}
                  </label>
                  <input
                    type="text"
                    name={key}
                    value={formData[key]}
                    onChange={handleInputChange}
                    placeholder={t(
                      `dashboard.fieldAgent.FirstModal.enter${
                        key.charAt(0).toUpperCase() + key.slice(1)
                      }`
                    )}
                    className="w-full px-4 py-2 border border-black/30 rounded-lg focus:ring-green-500"
                  />
                </div>
              ))}

              {/* Registered By */}
              <div>
                <label className="block text-sm md:text-base pb-2 font-medium">
                  {t("dashboard.fieldAgent.FirstModal.registeredBy")}
                  <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <select
                    name="registeredBy"
                    value={formData.registeredBy}
                    onChange={handleInputChange}
                    className="appearance-none w-full bg-white border border-black/30 text-sm py-2 px-4 pr-10 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                  >
                    <option>
                      {t("dashboard.fieldAgent.FirstModal.selectAgent")}
                    </option>
                    <option>
                      {t("dashboard.fieldAgent.FirstModal.FieldAgent")}
                    </option>
                  </select>

                  {/* Custom arrow */}
                  <IoIosArrowDown className="pointer-events-none absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                </div>
              </div>
            </div>
          )}

          {/* Step 2 - Address */}
          {modalStep === 2 && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">
                  {t("dashboard.fieldAgent.SecondModal.kycDocumentsUpload")}
                </label>
                <div className="relative">
                  <input
                    type="file"
                    name="kycDocument"
                    accept=".doc,.docx,.jpg,.pdf,.png"
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-black/30 rounded-lg focus:ring-black"
                  />
                  <FiUpload className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                </div>
              </div>

              {/* Street */}
              <div>
                <label className="block text-sm font-medium mb-1">
                  {t("dashboard.fieldAgent.SecondModal.street")}
                  <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="street"
                  value={formData.street}
                  onChange={handleInputChange}
                  placeholder={t(
                    "dashboard.fieldAgent.SecondModal.streetAddress"
                  )}
                  className="w-full px-4 py-2 border border-black/30 rounded-lg focus:ring-black"
                />
              </div>

              {/* City / State */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {["city", "state"].map((field) => (
                  <div key={field}>
                    <label className="block text-sm font-medium mb-1">
                      {t(`dashboard.fieldAgent.SecondModal.${field}`)}
                      <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name={field}
                      value={formData[field]}
                      onChange={handleInputChange}
                      placeholder={t(
                        `dashboard.fieldAgent.SecondModal.${field}`
                      )}
                      className="w-full px-4 py-2 border border-black/30 rounded-lg focus:ring-black"
                    />
                  </div>
                ))}
              </div>

              {/* Postal / Country */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {["postalCode", "country"].map((field) => (
                  <div key={field}>
                    <label className="block text-sm font-medium mb-1">
                      {t(`dashboard.fieldAgent.SecondModal.${field}`)}
                      <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name={field}
                      value={formData[field]}
                      onChange={handleInputChange}
                      placeholder={
                        field === "postalCode"
                          ? "400020"
                          : t("dashboard.fieldAgent.SecondModal.enterCountry")
                      }
                      className="w-full px-4 py-2 border border-black/30 rounded-lg focus:ring-black"
                    />
                  </div>
                ))}
              </div>

              <div ref={industryDropdownRef}>
                <IndustrySelect
                  label={t("dashboard.fieldAgent.SecondModal.industry")}
                  options={industryList}
                  selectedValue={formData.industry}
                  onSelect={handleIndustrySelect}
                  placeholder={t(
                    "dashboard.fieldAgent.SecondModal.selectIndustry"
                  )}
                  isRequired={true}
                  onDropdownToggle={handleIndustryDropdownToggle}
                />

                {formData.industry && (
                  <div className="mt-4" ref={subcategoryRef}>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Sub category
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {subcategoryList.map((subcategory) => {
                        const isSelected =
                          formData.subcategories.includes(subcategory);
                        return (
                          <button
                            key={subcategory}
                            type="button"
                            onClick={() => handleSubcategorySelect(subcategory)}
                            disabled={isSelected}
                            className={`px-3 py-1.5 text-sm font-medium rounded-full border transition-all
                            ${
                              isSelected
                                ? "bg-gray-200 text-gray-500 border-gray-300 opacity-50 cursor-not-allowed"
                                : "  border-gray-50 hover:bg-lime-50 focus:outline-none focus:ring-2 focus:ring-lime-400"
                            }`}
                          >
                            {t(
                              `categories.${formData.industry}.sub.${subcategory}`
                            ) || subcategory}
                          </button>
                        );
                      })}
                    </div>

                    <div className="mt-4">
                      <h3 className="text-xs font-medium text-gray-500 mb-2">
                        Selected:
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {formData.subcategories.length === 0 ? (
                          <span className="text-sm text-gray-400">
                            Nothing has been selected yet.
                          </span>
                        ) : (
                          formData.subcategories.map((tag) => (
                            <span
                              key={tag}
                              className="inline-flex items-center gap-x-1.5 rounded-md bg-blue-100 px-2.5 py-1 text-sm font-medium text-blue-800"
                            >
                              {t(
                                `categories.${formData.industry}.sub.${tag}`
                              ) || tag}
                              <button
                                type="button"
                                onClick={() => removeSubcategory(tag)}
                                className="group relative -mr-1 h-3.5 w-3.5 rounded-sm hover:bg-blue-600/20"
                              >
                                <IoCloseCircleOutline className="size-4" />
                              </button>
                            </span>
                          ))
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Step 3 - Service Locations (UI matching the attached screenshot) */}
          {modalStep === 3 && (
            <div className="space-y-4">
              {formData.locations.map((loc, idx) => (
                <div key={idx} className="space-y-3 p-1 rounded-md">
                  <h3 className="text-lg font-semibold">
                    {t("dashboard.fieldAgent.ThirdModal.locationLabel", {
                      index: idx + 1,
                    })}
                  </h3>

                  <div>
                    <label className="block text-sm font-medium mb-1">
                      {t("dashboard.fieldAgent.ThirdModal.locationName")}
                    </label>
                    <input
                      type="text"
                      name={`locationName-${idx}`}
                      value={loc.locationName}
                      onChange={(e) => {
                        const value = e.target.value;
                        setFormData((prev) => {
                          const copy = { ...prev };
                          copy.locations = copy.locations.map((l, i) =>
                            i === idx ? { ...l, locationName: value } : l
                          );
                          return copy;
                        });
                      }}
                      placeholder={t(
                        "dashboard.fieldAgent.ThirdModal.locationNamePlaceholder"
                      )}
                      className="w-full px-4 py-2 border border-black/30 rounded-lg focus:ring-black"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        {t("dashboard.fieldAgent.ThirdModal.latitude")}
                      </label>
                      <input
                        type="text"
                        value={loc.latitude}
                        onChange={(e) => {
                          const value = e.target.value;
                          setFormData((prev) => {
                            const copy = { ...prev };
                            copy.locations = copy.locations.map((l, i) =>
                              i === idx ? { ...l, latitude: value } : l
                            );
                            return copy;
                          });
                        }}
                        placeholder={t(
                          "dashboard.fieldAgent.ThirdModal.latitudePlaceholder"
                        )}
                        className="w-full px-4 py-2 border border-black/30 rounded-lg focus:ring-black"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-1">
                        {t("dashboard.fieldAgent.ThirdModal.longitude")}
                      </label>
                      <input
                        type="text"
                        value={loc.longitude}
                        onChange={(e) => {
                          const value = e.target.value;
                          setFormData((prev) => {
                            const copy = { ...prev };
                            copy.locations = copy.locations.map((l, i) =>
                              i === idx ? { ...l, longitude: value } : l
                            );
                            return copy;
                          });
                        }}
                        placeholder={t(
                          "dashboard.fieldAgent.ThirdModal.longitudePlaceholder"
                        )}
                        className="w-full px-4 py-2 border border-black/30 rounded-lg focus:ring-black"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-end">
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        {t("dashboard.fieldAgent.ThirdModal.landSize")}
                      </label>
                      <input
                        type="text"
                        value={loc.landSize}
                        onChange={(e) => {
                          const value = e.target.value;
                          setFormData((prev) => {
                            const copy = { ...prev };
                            copy.locations = copy.locations.map((l, i) =>
                              i === idx ? { ...l, landSize: value } : l
                            );
                            return copy;
                          });
                        }}
                        placeholder={t(
                          "dashboard.fieldAgent.ThirdModal.landSizePlaceholder"
                        )}
                        className="w-full px-4 py-2 border border-black/30 rounded-lg focus:ring-black"
                      />
                    </div>

                    <div className="md:col-span-1">
                      <label className="block text-sm font-medium mb-1">
                        {t("dashboard.fieldAgent.ThirdModal.unit")}
                      </label>
                      <select
                        value={loc.unit}
                        onChange={(e) => {
                          const value = e.target.value;
                          setFormData((prev) => {
                            const copy = { ...prev };
                            copy.locations = copy.locations.map((l, i) =>
                              i === idx ? { ...l, unit: value } : l
                            );
                            return copy;
                          });
                        }}
                        className="w-full px-4 py-2 border border-black/30 rounded-lg focus:ring-black"
                      >
                        <option>Acres</option>
                        <option>Hectares</option>
                        <option>Square meters</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">
                      {t("dashboard.fieldAgent.ThirdModal.accessInstructions")}
                    </label>
                    <textarea
                      value={loc.accessInstructions}
                      onChange={(e) => {
                        const value = e.target.value;
                        setFormData((prev) => {
                          const copy = { ...prev };
                          copy.locations = copy.locations.map((l, i) =>
                            i === idx ? { ...l, accessInstructions: value } : l
                          );
                          return copy;
                        });
                      }}
                      placeholder={t(
                        "dashboard.fieldAgent.ThirdModal.accessInstructionsPlaceholder"
                      )}
                      className="w-full px-4 py-2 border border-black/30 rounded-lg focus:ring-black min-h-[80px]"
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
          {validationError && (
            <div className="flex items-center p-3 mb-4 text-sm font-medium text-red-800 bg-red-100 rounded-lg">
              <AiFillCloseCircle className="w-5 h-5 mr-2" />
              {validationError}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-white border-t border-gray-200 rounded-b-2xl px-6 py-4 z-10">
          {modalStep < 3 ? (
            <button
              onClick={nextStep}
              className="w-full bg-[#28A844] hover:bg-green-600 text-white py-2.5 rounded-lg font-medium transition shadow-md disabled:bg-gray-400"
            >
              {t("dashboard.fieldAgent.FirstModal.next")}
            </button>
          ) : (
            <div className="flex justify-between gap-4">
              <div className="w-1/2 flex gap-2">
                {formData.locations.length > 1 && (
                  <button
                    onClick={() => {
                      setFormData((prev) => ({
                        ...prev,
                        locations: prev.locations.slice(0, -1),
                      }));
                    }}
                    className="w-1/2 px-2 md:px-1  rounded-lg border border-red-400 text-red-600 bg-white text-sm"
                  >
                    {t("dashboard.fieldAgent.ThirdModal.removeLocation")}
                  </button>
                )}

                <button
                  onClick={() => {
                    // add new empty location
                    setFormData((prev) => ({
                      ...prev,
                      locations: [
                        ...prev.locations,
                        {
                          locationName: "",
                          latitude: "",
                          longitude: "",
                          landSize: "",
                          unit: "Acres",
                          accessInstructions: "",
                        },
                      ],
                    }));
                  }}
                  className={`${
                    formData.locations.length > 1 ? "w-1/2 text-sm" : "w-full"
                  } md:px-4 py-2 rounded-lg border border-[#28A844] text-[#28A844] bg-white`}
                >
                  {t("dashboard.fieldAgent.ThirdModal.addLocation")}
                </button>
              </div>
              <button
                onClick={handleConfirm}
                className="w-1/2 bg-[#28A844] hover:bg-green-600 text-white py-2.5 rounded-lg font-medium transition shadow-md"
              >
                {t("dashboard.fieldAgent.FirstModal.confirmRegistration")}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
