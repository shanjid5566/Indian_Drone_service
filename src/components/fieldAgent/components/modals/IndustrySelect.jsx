// src/components/ReusableDropdown.jsx

import React, { useState, useEffect, useRef } from "react";
import { IoChevronDown } from "react-icons/io5";
import { useTranslation } from "react-i18next";

const ReusableDropdown = ({
  label,
  options,
  selectedValue,
  onSelect,
  placeholder,
  isRequired = false,
  onDropdownToggle,
}) => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSelect = (option) => {
    onSelect(option);
    setIsOpen(false);
  };

  const toggleDropdown = () => {
    const newState = !isOpen;
    setIsOpen(newState);
    if (onDropdownToggle) {
      onDropdownToggle(newState);
    }
  };

  return (
    <div>
      <label className="block text-sm font-medium mb-1">
        {label}
        {isRequired && <span className="text-red-500">*</span>}
      </label>

      <div className="relative" ref={dropdownRef}>
        <button
          type="button"
          onClick={toggleDropdown}
          className="focus:outline-none focus:ring-2 w-full px-4 py-2 border bg-[#F7FFE5] border-black/30 rounded-lg focus:ring-black appearance-none text-sm text-left flex justify-between items-center"
        >
          <span
            className={`block truncate ${
              selectedValue ? "text-black" : "text-gray-500"
            }`}
          >
            {selectedValue
              ? t(`categories.${selectedValue}.label`) || selectedValue
              : placeholder}
          </span>
          <IoChevronDown
            className={`text-gray-400 transition-transform duration-200 size-5 ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        </button>

        {isOpen && (
          <ul className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
            {options.map((option) => (
              <li
                key={option}
                onClick={() => handleSelect(option)}
                className="text-gray-900 relative cursor-pointer select-none py-2 pl-3 pr-9 hover:bg-gray-100"
                role="option"
              >
                <span className="font-normal block truncate">
                  {t(`categories.${option}.label`) || option}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default ReusableDropdown;
