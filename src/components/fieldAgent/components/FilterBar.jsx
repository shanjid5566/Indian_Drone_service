import React, { useEffect, useRef, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { FiFilter, FiChevronDown } from "react-icons/fi";

const FilterBar = ({
  t,
  searchTerm,
  setSearchTerm,
  menuItems,
  selectedFilterValue,
  setSelectedFilterValue,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const toggleDropdown = () => setIsOpen((prev) => !prev);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (item) => {
    setSelectedFilterValue(item.value);
    setIsOpen(false);
  };
console.log(selectedFilterValue)
  return (
    <div className="flex gap-4 mr-2">
      <div className="relative w-full md:w-1/2 lg:w-2/3">
        <span className="absolute inset-y-0 left-3 flex items-center text-gray-400 text-2xl">
          <CiSearch />
        </span>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value.trimStart())}
          placeholder={t("dashboard.fieldAgent.tableHeader.Search")}
          className="w-full pl-10 pr-4 py-3 border-2 border-gray-100 rounded-full text-base"
        />
      </div>

      <div ref={dropdownRef} className="relative inline-block text-left">
        <button
          onClick={toggleDropdown}
          className="flex items-center space-x-2 px-4 py-3 border border-gray-300 rounded-full  bg-transparent hover:bg-gray-100 transition duration-150 ease-in-out"
          aria-expanded={isOpen}
          aria-haspopup="true"
        >
          <FiFilter className="w-5 h-5 text-gray-700" />
          <span className="text-gray-700 font-medium">{t("dashboard.fieldAgent.tableHeader.Filter")}</span>
          <FiChevronDown
            className={`w-4 h-4 text-gray-700 transition-transform duration-200 ${
              isOpen ? "transform rotate-180" : ""
            }`}
          />
        </button>

        {isOpen && (
          <div
            className="absolute left-0 mt-2 w-64 origin-top-right rounded-lg bg-white shadow-lg text-black"
            role="menu"
            aria-orientation="vertical"
          >
            <div className="py-1" role="none">
              {menuItems.map((item, index) => {
                const isSelected = item.value === selectedFilterValue;
                return (
                  <a
                    key={index}
                    onClick={() => handleSelect(item)}
                    className={`flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition duration-150 ease-in-out cursor-pointer ${
                      isSelected ? "text-green-600 bg-gray-50" : ""
                    }`}
                    role="menuitem"
                  >
                    <div
                      className={`w-1 h-5 mr-3 rounded-sm ${
                        isSelected ? "bg-green-500" : "bg-transparent"
                      }`}
                    ></div>
                    <span className={isSelected ? "font-semibold" : ""}>
                      {item.label}
                    </span>
                  </a>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FilterBar;
