import { AiOutlineClose } from 'react-icons/ai';

import { useState, useCallback, useEffect, useRef } from 'react';
import { FaChevronLeft } from 'react-icons/fa';
import { HiLocationMarker } from 'react-icons/hi';
import { FiUpload } from 'react-icons/fi';
import { AiFillCloseCircle } from 'react-icons/ai';
import { useTranslation } from 'react-i18next';
import { IoChevronDown } from "react-icons/io5";

const INITIAL_FORM = {
  firstName: '',
  middleName: '',
  lastName: '',
  alsoKnownAs: '',
  phone: '',
  email: '',
  geoLocation: '',
  district: '',
  mandal: '',
  village: '',
  registeredBy: '',
  kycDocument: null,
  street: '',
  city: '',
  state: '',
  postalCode: '',
  country: '',
  industry: '',
  lat1: '',
  lat2: '',
  lat3: '',
  acres: '',
};

export default function RegistrationModal({ isOpen, onClose }) {
  const [modalStep, setModalStep] = useState(1);
  const [validationError, setValidationError] = useState('');
  const [formData, setFormData] = useState(INITIAL_FORM);
  const { t } = useTranslation();
  const panelRef = useRef(null);

  const handleInputChange = useCallback(
    (e) => {
      const { name, value, files, type } = e.target;
      if (validationError) setValidationError('');
      setFormData((prev) => ({
        ...prev,
        [name]: type === 'file' ? files[0] : value,
      }));
    },
    [validationError]
  );

  const handleClose = useCallback(() => {
    setModalStep(1);
    setValidationError('');
    setFormData(INITIAL_FORM);
    onClose();
  }, [onClose]);

  const validateStep = useCallback(() => {
    const requiredFieldsByStep = {
      1: ['firstName', 'lastName', 'phone', 'geoLocation', 'registeredBy'],
      2: [
        'street',
        'city',
        'state',
        'postalCode',
        'country',
        'industry',
        'kycDocument',
      ],
    };

    const missingFields =
      requiredFieldsByStep[modalStep]?.filter((key) => !formData[key]) || [];

    if (missingFields.length > 0) {
      return t(
        modalStep === 1
          ? 'Please fill all required fields in Customer Info (* marked).'
          : 'Please fill all required fields in Address Details (* marked).'
      );
    }

    return '';
  }, [formData, modalStep, t]);

  const nextStep = useCallback(() => {
    const error = validateStep();
    if (error) return setValidationError(error);
    setModalStep((prev) => Math.min(prev + 1, 3));
  }, [validateStep]);

  const prevStep = useCallback(() => {
    setModalStep((prev) => Math.max(prev - 1, 1));
    setValidationError('');
  }, []);

  const handleConfirm = useCallback(() => {
    console.log(' Final Form Submitted:', formData);
    handleClose();
  }, [formData, handleClose]);
  useEffect(() => {
    if (!isOpen) return;

    const handleOutsideClick = (e) => {
      if (panelRef.current && !panelRef.current.contains(e.target)) {
        handleClose();
      }
    };

    window.addEventListener('mousedown', handleOutsideClick);
    return () => {
      window.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [isOpen, handleClose]);

  if (!isOpen) return null;

  const stepTitles = [
    t('dashboard.fieldAgent.FirstModal.customerInfo'),
    t('dashboard.fieldAgent.SecondModal.addressDetails'),
    t('dashboard.fieldAgent.ThirdModal.serviceLocations'),
  ];

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center
      bg-black/60 transition-opacity duration-300
      ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
    >
      <div
        ref={panelRef}
        className={`bg-white w-full max-w-xl mx-4 md:mx-6 rounded-lg shadow-lg max-h-[80vh] flex flex-col
        transform transition-transform duration-300 px-2 
        ${isOpen ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'}`}
      >
        {/* Header */}
        <div className='sticky top-0 bg-white border-b rounded-t-2xl border-gray-200 px-2 py-2 md:py-4 flex items-center gap-4 z-10'>
          {/* STEP 1: No Back Button */}
          {modalStep > 1 && (
            <button
              onClick={prevStep}
              className='text-2xl text-gray-600 transition w-10 h-10 flex justify-center items-center'
            >
              <FaChevronLeft className='w-6 h-5' />
            </button>
          )}
          <h2 className='text-xl  font-semibold  flex-1'>
            {stepTitles[modalStep - 1]}
          </h2>
          {/* STEP 2 & 3: No Cross Button */}
          {modalStep === 1 && (
            <button
              onClick={handleClose}
              aria-label='Close'
              className=' text-gray-600 transition w-10 h-10 flex justify-center items-center'
            >
              <AiOutlineClose className='w-5 h-5' />
            </button>
          )}
        </div>

        {/* Scrollable Body */}
        <div className='flex-1 overflow-y-auto p-4 space-y-2.5 md:space-y-4'>
          {/* Step 1 - Customer Info */}
          {modalStep === 1 && (
            <div className='space-y-2.5 md:space-y-3'>
              {[
                {
                  name: 'firstName',
                  label: t('dashboard.fieldAgent.FirstModal.firstName'),
                  required: true,
                },
                {
                  name: 'middleName',
                  label: t('dashboard.fieldAgent.FirstModal.middleName'),
                },
                {
                  name: 'lastName',
                  label: t('dashboard.fieldAgent.FirstModal.lastName'),
                  required: true,
                },
                {
                  name: 'alsoKnownAs',
                  label: t('dashboard.fieldAgent.FirstModal.alsoKnownAs'),
                },
                {
                  name: 'phone',
                  label: t('dashboard.fieldAgent.FirstModal.phone'),
                  required: true,
                  type: 'tel',
                  placeholder: '+92 9876543210',
                },
                {
                  name: 'email',
                  label: t('dashboard.fieldAgent.FirstModal.email'),
                  type: 'email',
                  placeholder: 'example@gmail.com',
                },
              ].map((field) => (
                <div key={field.name}>
                  <label className='block text-sm md:text-base font-medium'>
                    {field.label}
                    {field.required && <span className='text-red-500'>*</span>}
                  </label>
                  <input
                    type={field.type || 'text'}
                    name={field.name}
                    value={formData[field.name]}
                    onChange={handleInputChange}
                    placeholder={field.placeholder || field.label}
                    className='w-full px-4 py-2 border  border-black/30  rounded-lg focus:ring-black'
                  />
                </div>
              ))}

              {/* Geo Location */}
              <div>
                <label className='block text-sm md:text-base font-medium'>
                  {t('dashboard.fieldAgent.FirstModal.geoLocation')}
                  <span className='text-red-500'>*</span>
                </label>
                <div className='relative'>
                  <input
                    type='text'
                    name='geoLocation'
                    value={formData.geoLocation}
                    onChange={handleInputChange}
                    placeholder={t(
                      'dashboard.fieldAgent.FirstModal.selectOnMap'
                    )}
                    className='w-full px-4 py-2 border border-black/30 rounded-lg focus:ring-black'
                  />
                  <HiLocationMarker className='absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5' />
                </div>
              </div>

              {/* District / Mandal / Village */}
              {['district', 'mandal', 'village'].map((key) => (
                <div key={key}>
                  <label className='block text-sm md:text-base font-medium'>
                    {t(`dashboard.fieldAgent.FirstModal.${key}`)}
                  </label>
                  <input
                    type='text'
                    name={key}
                    value={formData[key]}
                    onChange={handleInputChange}
                    placeholder={t(
                      `dashboard.fieldAgent.FirstModal.enter${key.charAt(0).toUpperCase() + key.slice(1)
                      }`
                    )}
                    className='w-full px-4 py-2 border border-black/30 rounded-lg focus:ring-green-500'
                  />
                </div>
              ))}

              {/* Registered By */}
              <div>
                 <label className='block text-sm md:text-base pb-2 font-medium'>
                  {t('dashboard.fieldAgent.FirstModal.registeredBy')}
                  <span className='text-red-500'>*</span>
                </label>
                <div className="relative">

                <select
                  name='registeredBy'
                  value={formData.registeredBy}
                  onChange={handleInputChange}
                  className=" focus:outline-none focus:ring-2 w-full px-4 py-2  border  border-black/30 rounded-lg focus:ring-black appearance-none  text-sm"
                >
                  <option>
                    {t('dashboard.fieldAgent.FirstModal.selectAgent')}
                  </option>
                  <option>
                    {t('dashboard.fieldAgent.FirstModal.FieldAgent')}
                  </option>
                </select>
                <IoChevronDown
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none"
                  size={20}
                />
              </div>
              </div>

            </div>
          )}

          {/* Step 2 - Address */}
          {modalStep === 2 && (
            <div className='space-y-4'>
              <div>
                <label className='block text-sm font-medium mb-1'>
                  {t('dashboard.fieldAgent.SecondModal.kycDocumentsUpload')}
                </label>
                <div className='relative'>
                  <input
                    type='file'
                    name='kycDocument'
                    accept='.doc,.docx,.jpg,.pdf,.png'
                    onChange={handleInputChange}
                    className='w-full px-4 py-2 border border-black/30 rounded-lg focus:ring-black'
                  />
                  <FiUpload className='absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5' />
                </div>
              </div>

              {/* Street */}
              <div>
                <label className='block text-sm font-medium mb-1'>
                  {t('dashboard.fieldAgent.SecondModal.street')}
                  <span className='text-red-500'>*</span>
                </label>
                <input
                  type='text'
                  name='street'
                  value={formData.street}
                  onChange={handleInputChange}
                  placeholder={t(
                    'dashboard.fieldAgent.SecondModal.streetAddress'
                  )}
                  className='w-full px-4 py-2 border border-black/30 rounded-lg focus:ring-black'
                />
              </div>

              {/* City / State */}
              <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                {['city', 'state'].map((field) => (
                  <div key={field}>
                    <label className='block text-sm font-medium mb-1'>
                      {t(`dashboard.fieldAgent.SecondModal.${field}`)}
                      <span className='text-red-500'>*</span>
                    </label>
                    <input
                      type='text'
                      name={field}
                      value={formData[field]}
                      onChange={handleInputChange}
                      placeholder={t(
                        `dashboard.fieldAgent.SecondModal.${field}`
                      )}
                      className='w-full px-4 py-2 border border-black/30 rounded-lg focus:ring-black'
                    />
                  </div>
                ))}
              </div>

              {/* Postal / Country */}
              <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                {['postalCode', 'country'].map((field) => (
                  <div key={field}>
                    <label className='block text-sm font-medium mb-1'>
                      {t(`dashboard.fieldAgent.SecondModal.${field}`)}
                      <span className='text-red-500'>*</span>
                    </label>
                    <input
                      type='text'
                      name={field}
                      value={formData[field]}
                      onChange={handleInputChange}
                      placeholder={
                        field === 'postalCode'
                          ? '400020'
                          : t('dashboard.fieldAgent.SecondModal.enterCountry')
                      }
                      className='w-full px-4 py-2 border border-black/30 rounded-lg focus:ring-black'
                    />
                  </div>
                ))}
              </div>

              {/* Industry */}
              <div>
                <label className='block text-sm font-medium mb-1'>
                  {t('dashboard.fieldAgent.SecondModal.industry')}
                  <span className='text-red-500'>*</span>
                </label>
                <div className='relative'>
                  <select
                  name='industry'
                  value={formData.industry}
                  onChange={handleInputChange}
                  className=" focus:outline-none focus:ring-2 w-full px-4 py-2  border border-black/30 rounded-lg focus:ring-black appearance-none  text-sm"
                >
                  <option value=''>
                    {t('dashboard.fieldAgent.SecondModal.selectIndustry')}
                  </option>
                  <option value='agriculture'>
                    {t('dashboard.fieldAgent.SecondModal.agriculture')}
                  </option>
                  <option value='survey'>
                    {t('dashboard.fieldAgent.SecondModal.surveyMapping')}
                  </option>
                </select>
                <IoChevronDown
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none"
                  size={20}
                />
                </div>
              </div>
            </div>
          )}

          {/* Step 3 - Service Locations */}
          {modalStep === 3 && (
            <div className='space-y-4'>
              {['lat1', 'lat2', 'lat3', 'acres'].map((key, idx) => (
                <div key={key}>
                  <label className=' text-sm font-medium mb-1 flex justify-between'>
                    {t(
                      `dashboard.fieldAgent.ThirdModal.${[
                        'firstLatLong',
                        'secondLatLong',
                        'thirdLatLong',
                        'numberOfAcres',
                      ][idx]
                      }`
                    )}
                    {key === 'lat3' && (
                      <p className='!text-button-primary text-xl font-bold px-2'>
                        +
                      </p>
                    )}
                  </label>
                  <input
                    type='text'
                    name={key}
                    value={formData[key]}
                    onChange={handleInputChange}
                    placeholder={t(
                      `dashboard.fieldAgent.ThirdModal.${[
                        'firstLatLongValue',
                        'secondLatLong',
                        'thirdLatLong',
                        'landAreaInAcres',
                      ][idx]
                      }`
                    )}
                    className='w-full px-4 py-2 border border-black/30 rounded-lg focus:ring-black'
                  />
                </div>
              ))}
            </div>
          )}
          {validationError && (
            <div className='flex items-center p-3 mb-4 text-sm font-medium text-red-800 bg-red-100 rounded-lg'>
              <AiFillCloseCircle className='w-5 h-5 mr-2' />
              {validationError}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className='sticky bottom-0 bg-white border-t border-gray-200 rounded-b-2xl px-6 py-4 z-10'>
          {modalStep < 3 ? (
            <button
              onClick={nextStep}
              className='w-full bg-[#28A844] hover:bg-green-600 text-white py-2.5 rounded-lg font-medium transition shadow-md disabled:bg-gray-400'
            >
              {t('Next')}
            </button>
          ) : (
            <button
              onClick={handleConfirm}
              className='w-full bg-[#28A844] hover:bg-green-600 text-white py-2.5 rounded-lg font-medium transition shadow-md'
            >
              {t('Confirm Registration')}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
