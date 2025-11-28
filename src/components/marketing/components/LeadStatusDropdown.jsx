import { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { HiOutlineChevronUp } from "react-icons/hi";

const LeadStatusDropdown = ({ selectedStatus, setSelectedStatus }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useTranslation();
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const options = [
    { label: t("dashboard.marketing.AllLeads"), value: "All" },
    { label: t("dashboard.marketing.Hot"), value: "Hot" },
    { label: t("dashboard.marketing.Warm"), value: "Warm" },
    { label: t("dashboard.marketing.Cool"), value: "Cool" },
  ];

  const handleSelect = (value) => {
    setSelectedStatus(value);
    setIsOpen(false);
  };

  const activeBg = "bg-lime-400";

  return (
    <div
      ref={dropdownRef}
      className="relative inline-block text-left min-w-[200px]"
      onClick={() => setIsOpen(!isOpen)}
    >
      <button
        type="button"
        className="w-full justify-between items-center inline-flex px-2 md:px-4 py-1.5 md:py-2 border border-gray-300 rounded-lg text-xs md:text-base text-gray-700 bg-white shadow-sm hover:bg-gray-50 transition-colors"
        aria-haspopup="true"
        aria-expanded={isOpen}
      >
        {options.find((opt) => opt.value === selectedStatus)?.label}
        <HiOutlineChevronUp
          className={`-mr-1 ml-2 h-5 w-5 transition-transform duration-200 ${
            isOpen ? "rotate-0" : "rotate-180"
          }`}
          aria-hidden="true"
        />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-1 w-full min-w-[150px] rounded-lg shadow-xl bg-white ">
          <div className="">
            {options.map((option) => (
              <div
                key={option.value}
                onClick={() => handleSelect(option.value)}
                className={`block px-4 py-2 text-xs md:text-sm cursor-pointer transition-colors ${
                  option.value === selectedStatus
                    ? `${activeBg} text-gray-900 font-semibold`
                    : `text-gray-700 hover:${activeBg}/70 hover:bg-[#9AE600]`
                }`}
                role="menuitem"
              >
                {option.label}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default LeadStatusDropdown;
