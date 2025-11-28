import React, { useState, useRef, useEffect } from 'react';
import { IoChevronDown } from 'react-icons/io5';
import { useTranslation } from 'react-i18next';
import { FaChevronRight } from 'react-icons/fa';

const ServiceTypeDropdown = ({ formData, setFormData, serviceTypesData }) => {
  const { t } = useTranslation();
  const dropdownRef = useRef(null);

  const [serviceTypeOpen, setServiceTypeOpen] = useState(false);
  const [activeSubMenu, setActiveSubMenu] = useState(null);

  const serviceTypes = Object.keys(serviceTypesData);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setServiceTypeOpen(false);
        setActiveSubMenu(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleServiceTypeClick = () => {
    if (serviceTypeOpen) setActiveSubMenu(null);
    setServiceTypeOpen(!serviceTypeOpen);
  };

  const handleSubCategorySelect = (category, subCategory) => {
    setFormData({
      ...formData,
      serviceType: category,
      serviceSubType: subCategory
    });
    setServiceTypeOpen(false);
    setActiveSubMenu(null);
  };

  const getSubmenuPosition = (type) => {
    const mainMenuItem = document.querySelector(`[data-menu-item="${type}"]`);
    if (!mainMenuItem) return { top: '0px', left: '0px' };

    const rect = mainMenuItem.getBoundingClientRect();
    return {
      top: `${rect.top}px`,
      left: `${rect.right + 10}px`,
    };
  };

  return (
    <div className="mb-4" ref={dropdownRef}>
      <label className="block text-base font-medium text-gray-800 mb-2">
        {t('dashboard.employee.pages.order.modal.serviceType')}
      </label>

      <button
        type="button"
        onClick={handleServiceTypeClick}
        className="w-[286px] px-3 py-2 bg-[#F7FFE5] rounded-md flex items-center justify-between text-base"
      >
        <span className="truncate">
          {t(`dashboard.employee.dropdown.${formData.serviceType}`)}
        </span>
        <IoChevronDown
          className={`transition-transform duration-200 flex-shrink-0 ${serviceTypeOpen ? 'rotate-180' : ''
            }`}
        />
      </button>

      {serviceTypeOpen && (
        <div className="absolute w-1/2 mt-1 bg-white shadow-lg rounded-md border border-gray-200 z-50 max-h-96 overflow-visible">
          {serviceTypes.map((type) => (
            <div key={type} className="relative" data-menu-item={type}>
              {/* Main Category */}
              <div
                onClick={() => {
                  setFormData({ ...formData, serviceType: type, serviceSubType: '' });
                  setActiveSubMenu(activeSubMenu === type ? null : type);
                }}
                className={`px-3 py-2 cursor-pointer flex justify-between items-center hover:bg-gray-100 transition ${formData.serviceType === type
                    ? 'bg-[#F7FFE5] border-l-2 border-green-400 font-medium'
                    : ''
                  }`}
              >
                <span>
                  {t(`dashboard.employee.dropdown.${type}`)}
                </span>
                <FaChevronRight />
              </div>

              {/* Submenu */}
              {activeSubMenu === type && (
                <div
                  className="fixed bg-white shadow-lg rounded-md border border-gray-200 z-[60] w-48"
                  style={getSubmenuPosition(type)}
                >
                  {serviceTypesData[type].subcategories.map((subCat) => (
                    <div
                      key={subCat}
                      onClick={() => handleSubCategorySelect(type, subCat)}
                      className={`px-3 py-2 cursor-pointer text-sm border-b border-gray-200 hover:bg-green-50 transition ${formData.serviceSubType === subCat
                          ? 'bg-[#28A844] text-white font-medium'
                          : ''
                        }`}
                    >
                      {subCat}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ServiceTypeDropdown;
