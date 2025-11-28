import React, { useState, useRef, useEffect } from 'react';
import { FaTimes, FaCalendarAlt, FaClock } from 'react-icons/fa';
import { IoChevronDown } from 'react-icons/io5';
import { useTranslation } from 'react-i18next';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ServiceTypeDropdown from '../common/ServiceTypeDropdown';

const ServiceRequestModal = ({ isOpen, onClose, onSubmit }) => {
  const { t } = useTranslation();
  const modalRef = useRef(null);
  const serviceTypeDropdownRef = useRef(null);
  const priorityDropdownRef = useRef(null);
  const dateInputRef = useRef(null);
  const timeInputRef = useRef(null);

  // Service Types with subcategories
const serviceTypesData = {
  mappingAndSurveying: {
    label: t('dashboard.employee.dropdown.mappingAndSurveying'),
    subcategories: [
      t('dashboard.employee.dropdown.droneMapping'),
      t('dashboard.employee.dropdown.generalSurveying'),
      t('dashboard.employee.dropdown.groundCollection'),
      t('dashboard.employee.dropdown.dataAnalysis')
    ]
  },
  aerialMediaServices: {
    label: t('dashboard.employee.dropdown.aerialMediaServices'),
    subcategories: [
      t('dashboard.employee.dropdown.aerialPhotography'),
      t('dashboard.employee.dropdown.cinematography'),
      t('dashboard.employee.dropdown.weddingCoverage'),
      t('dashboard.employee.dropdown.editing')
    ]
  },
  agriculture: {
    label: t('dashboard.employee.dropdown.agriculture'),
    subcategories: [
      t('dashboard.employee.dropdown.agriculturalServices'),
      t('dashboard.employee.dropdown.agriculturalSpray'),
      t('dashboard.employee.dropdown.agriculturalSpread')
    ]
  },
  inspectionAndInfrastructure: {
    label: t('dashboard.employee.dropdown.inspectionAndInfrastructure'),
    subcategories: [
      t('dashboard.employee.dropdown.infrastructureInspectionServices'),
      t('dashboard.employee.dropdown.aerialInspections'),
      t('dashboard.employee.dropdown.constructionSiteMonitoring'),
      t('dashboard.employee.dropdown.generalInfrastructure')
    ]
  },
  specializedOperations: {
    label: t('dashboard.employee.dropdown.specializedOperations'),
    subcategories: [
      t('dashboard.employee.dropdown.droneDeliveryServices'),
      t('dashboard.employee.dropdown.boatingWaterSports'),
      t('dashboard.employee.dropdown.sports')
    ]
  },
  supportAndTraining: {
    label: t('dashboard.employee.dropdown.supportAndTraining'),
    subcategories: [
      t('dashboard.employee.dropdown.droneMaintenance'),
      t('dashboard.employee.dropdown.droneTraining')
    ]
  },
  realEstate: {
    label: t('dashboard.employee.dropdown.realEstate'),
    subcategories: [
      t('dashboard.employee.dropdown.realEstateMarketing'),
      t('dashboard.employee.dropdown.residentialPhotography'),
      t('dashboard.employee.dropdown.landSurveying'),
      t('dashboard.employee.dropdown.roofInspection')
    ]
  },
  other: {
    label: t('dashboard.employee.dropdown.other'),
    subcategories: [
      t('dashboard.employee.dropdown.miscellaneous')
    ]
  }
};



  const priorities = ['low', 'medium', 'high', 'critical'];

  const [formData, setFormData] = useState({
    customer: '',
    serviceType: 'mappingAndSurveying',
    serviceSubType: '',
    priority: 'low',
    preferredDate: '',
    preferredTime: '',
    specialInstruction: ''
  });

  const [errors, setErrors] = useState({
    customer: '',
    preferredDate: '',
    preferredTime: ''
  });

  // eslint-disable-next-line no-unused-vars
  const [serviceTypeOpen, setServiceTypeOpen] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [activeSubMenu, setActiveSubMenu] = useState(null);
  const [priorityOpen, setPriorityOpen] = useState(false);


  useEffect(() => {
    const handleClickOutside = (e) => {
      if (serviceTypeDropdownRef.current && !serviceTypeDropdownRef.current.contains(e.target)) {
        setServiceTypeOpen(false);
        setActiveSubMenu(null);
      }
      if (priorityDropdownRef.current && !priorityDropdownRef.current.contains(e.target)) {
        setPriorityOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const resetForm = () => {
    setFormData({
      customer: '',
      serviceType: 'mappingAndSurveying',
      serviceSubType: '',
      priority: 'low',
      preferredDate: '',
      preferredTime: '',
      specialInstruction: ''
    });
    setErrors({
      customer: '',
      preferredDate: '',
      preferredTime: ''
    });
    setActiveSubMenu(null);
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const validate = () => {
    let tempErrors = { customer: '', preferredDate: '', preferredTime: '' };
    let isValid = true;

    if (!formData.customer.trim()) {
      tempErrors.customer = 'This field is required';
      isValid = false;
    }
    if (!formData.preferredDate.trim()) {
      tempErrors.preferredDate = 'This field is required';
      isValid = false;
    }
    if (!formData.preferredTime.trim()) {
      tempErrors.preferredTime = 'This field is required';
      isValid = false;
    }

    setErrors(tempErrors);
    return isValid;
  };

  const handleSubmit = () => {
    if (!validate()) return;
    console.log('Service Request Form Data:', formData);
    toast.success('Service request created successfully!');
    if (onSubmit) onSubmit(formData);
    setTimeout(() => {
      resetForm();
      onClose();
    }, 3000);
  };


  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
      onClick={handleClose}
    >
      <div
        ref={modalRef}
        className="bg-white rounded-lg shadow-2xl w-full max-w-md md:max-w-xl lg:max-w-xl relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg md:text-xl font-semibold text-gray-800">
            {t('dashboard.employee.pages.order.modal.createServiceRequest')}
          </h2>
          <button
            onClick={handleClose}
            className="text-gray-500 hover:text-gray-700 transition-colors"
          >
            <FaTimes className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <div className="px-6 py-5">
          {/* Customer Field */}
          <div className="mb-4">
            <label className="block text-base font-medium text-gray-800 mb-2">
              {t('dashboard.employee.pages.order.modal.customer')}
            </label>
            <input
              type="text"
              placeholder={t('dashboard.employee.pages.order.modal.enterCustomerNameOrPhone')}
              value={formData.customer}
              onChange={(e) => setFormData({ ...formData, customer: e.target.value })}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-black/70 text-sm ${errors.customer ? 'border-red-500' : 'border-gray-300'
                }`}
            />
            {errors.customer && (
              <p className="text-red-500 text-xs mt-1">{errors.customer}</p>
            )}
          </div>

          {/* Service Type Dropdown with Nested Menu */}
          <ServiceTypeDropdown
            formData={formData}
            setFormData={setFormData}
            serviceTypesData={serviceTypesData}
          />

          {/* Priority Dropdown */}
          <div className="mb-4 relative" ref={priorityDropdownRef}>
            <label className="block text-base font-medium text-gray-800 mb-2">
              Priority
            </label>
            <button
              type="button"
              onClick={() => setPriorityOpen(!priorityOpen)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md flex items-center justify-between focus:outline-none focus:ring-2 focus:ring-black/70 text-base bg-white"
            >
              <span>{t(`dashboard.employee.dropdown.${formData.priority}`)}</span>
              <IoChevronDown
                className={`transition-transform duration-200 ${priorityOpen ? 'rotate-180' : ''}`}
              />
            </button>

            {priorityOpen && (
              <div className="absolute mt-1 w-full bg-white shadow-lg rounded-md border border-gray-200 z-50">
                {priorities.map((level) => (
                  <div
                    key={level}
                    onClick={() => {
                      setFormData({ ...formData, priority: level });
                      setPriorityOpen(false);
                    }}
                    className={`px-3 py-2 cursor-pointer ${formData.priority === level ? 'bg-[#28A844] text-white font-medium' : ''
                      }`}
                  >
                    {t(`dashboard.employee.dropdown.${level}`)}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Date & Time */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            {/* Preferred Date */}
            <div>
              <label className="block text-base font-medium text-gray-800 mb-2">
                {t('dashboard.employee.pages.order.modal.preferredDate')}
              </label>
              <div className="relative">
                <input
                  ref={dateInputRef}
                  type="date"
                  value={formData.preferredDate}
                  onChange={(e) =>
                    setFormData({ ...formData, preferredDate: e.target.value })
                  }
                  className={`w-full px-3 py-2 pr-10 border rounded-md focus:outline-none focus:ring-2 focus:ring-black/70 text-sm appearance-none ${errors.preferredDate ? 'border-red-500' : 'border-gray-300'
                    } [&::-webkit-calendar-picker-indicator]:opacity-0 [&::-webkit-calendar-picker-indicator]:absolute`}
                />
                <FaCalendarAlt
                  onClick={() => dateInputRef.current && dateInputRef.current.showPicker()}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 cursor-pointer"
                />
              </div>
              {errors.preferredDate && (
                <p className="text-red-500 text-xs mt-1">{errors.preferredDate}</p>
              )}
            </div>

            {/* Preferred Time */}
            <div>
              <label className="block text-base font-medium text-gray-800 mb-2">
                {t('dashboard.employee.pages.order.modal.preferredTime')}
              </label>
              <div className="relative">
                <input
                  ref={timeInputRef}
                  type="time"
                  value={formData.preferredTime}
                  onChange={(e) =>
                    setFormData({ ...formData, preferredTime: e.target.value })
                  }
                  className={`w-full px-3 py-2 pr-10 border rounded-md focus:outline-none focus:ring-2 focus:ring-black/70 text-sm appearance-none ${errors.preferredTime ? 'border-red-500' : 'border-gray-300'
                    } [&::-webkit-calendar-picker-indicator]:opacity-0 [&::-webkit-calendar-picker-indicator]:absolute`}
                />
                <FaClock
                  onClick={() => timeInputRef.current && timeInputRef.current.showPicker()}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 cursor-pointer"
                />
              </div>
              {errors.preferredTime && (
                <p className="text-red-500 text-xs mt-1">{errors.preferredTime}</p>
              )}
            </div>
          </div>

          {/* Special Instruction */}
          <div className="mb-6">
            <label className="block text-base font-medium text-gray-800 mb-2">
              {t('dashboard.employee.pages.order.modal.specialInstruction')}
            </label>
            <textarea
              placeholder="Any special instructions or requirements..."
              value={formData.specialInstruction}
              onChange={(e) =>
                setFormData({ ...formData, specialInstruction: e.target.value })
              }
              rows="4"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 text-sm resize-none"
            />
          </div>

          {/* Submit Button */}
          <button
            onClick={handleSubmit}
            className="w-full bg-[#28A844] hover:bg-green-600 text-white font-medium py-3 px-4 rounded-md transition-colors duration-200 text-sm md:text-base"
          >
            {t('dashboard.employee.pages.order.modal.createRequest')}
          </button>
        </div>
      </div>

      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default ServiceRequestModal;