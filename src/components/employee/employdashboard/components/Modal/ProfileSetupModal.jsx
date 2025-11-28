import { useState } from 'react';
import { X, Plus, ArrowLeft } from 'lucide-react';
import { IoChevronDown } from "react-icons/io5";
import { useTranslation } from 'react-i18next';

export default function ProfileSetupModal({ isOpen, onClose }) {
  const { t } = useTranslation('common'); // Corrected to use the 'common' namespace
  const [currentStep, setCurrentStep] = useState(null);
  const [selectedStep, setSelectedStep] = useState('step2');

  const [formData, setFormData] = useState({
    customerEmail: '',
    setupType: '',
    notes: '',
    firstName: '',
    middleName: '',
    lastName: '',
    nickname: '',
    phone: '',
    email: '',
    geoLocation: '',
    district: '',
    mandal: '',
    kycDocuments: null,
    street: '',
    city: '',
    state: '',
    postalCode: '',
    country: '',
    industry: '',
    latitude1: '',
    longitude1: '',
    latitude2: '',
    longitude2: '',
    latitude3: '',
    longitude3: '',
    acres: '',
    village: '',
    locations: [{ lat: '', long: '' }],
  });

  const handleStep1Submit = () => {
    if (!formData.customerEmail.trim()) {
      alert('Please enter customer email or phone');
      return;
    }
    setCurrentStep(selectedStep);
  };

  const handleStepSubmit = () => {
    console.log('Form Data:', formData);
    setCurrentStep(null);
    onClose();
  };

  const handleBackClick = () => {
    setCurrentStep(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    setFormData(prev => ({
      ...prev,
      kycDocuments: e.target.files[0]
    }));
  };

  const addLocation = () => {
    setFormData(prev => ({
      ...prev,
      locations: [...prev.locations, { lat: '', long: '' }]
    }));
  };

  const updateLocation = (index, field, value) => {
    setFormData(prev => ({
      ...prev,
      locations: prev.locations.map((loc, i) =>
        i === index ? { ...loc, [field]: value } : loc
      )
    }));
  };

  const resetForm = () => {
    setFormData({
      customerEmail: '',
      setupType: '',
      notes: '',
      firstName: '',
      middleName: '',
      lastName: '',
      nickname: '',
      phone: '',
      email: '',
      geoLocation: '',
      district: '',
      mandal: '',
      kycDocuments: null,
      street: '',
      city: '',
      state: '',
      postalCode: '',
      country: '',
      industry: '',
      latitude1: '',
      longitude1: '',
      latitude2: '',
      longitude2: '',
      latitude3: '',
      longitude3: '',
      acres: '',
      village: '',
      locations: [{ lat: '', long: '' }],
    });
    setCurrentStep(null);
    setSelectedStep('step2');
  };

  const closeAll = () => {
    resetForm();
    onClose();
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      closeAll();
    }
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Step 1 Modal - Assist in Profile Setup */}
      {!currentStep && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50 p-4" onClick={handleBackdropClick}>
          <div className="bg-white rounded-lg shadow-lg w-full max-w-xl">
            <div className="flex justify-between items-center p-6 border-b border-gray-200">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">{t('dashboard.employee.modal.assistInProfileSetup')}</h2>
              </div>
              <button
                onClick={closeAll}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={24} />
              </button>
            </div>

            <div className="p-6 space-y-5">
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  {t('dashboard.employee.modal.customerEmailOrPhone')}
                </label>
                <input
                  type="text"
                  name="customerEmail"
                  value={formData.customerEmail}
                  onChange={handleInputChange}
                  placeholder={t('dashboard.employee.modal.customerEmailOrPhone')}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  {t('dashboard.employee.modal.setupType')}
                  <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <select
                    value={selectedStep}
                    onChange={(e) => setSelectedStep(e.target.value)}
                    className=" focus:outline-none focus:ring-2 w-full px-4 py-2  border  border-black/30 rounded-lg focus:ring-black appearance-none  text-sm"

                  >

                    <option value="step2"> {t('dashboard.employee.modal.customerInformation')}</option>
                    <option value="step3"> {t('dashboard.employee.modal.verificationDetails')}</option>
                    <option value="step4">{t('dashboard.employee.modal.serviceLocation')}</option>
                  </select>
                  <IoChevronDown
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none"
                    size={20}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  {t('dashboard.employee.modal.notes')}
                </label>
                <textarea
                  name="notes"
                  value={formData.notes}
                  onChange={handleInputChange}
                  placeholder={t('dashboard.employee.modal.addNotes')}
                  rows="3"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>

              <button
                onClick={handleStep1Submit}
                className="w-full bg-green-600 text-white py-3 rounded-md hover:bg-green-700 font-semibold"
              >
                {t('dashboard.employee.modal.startSetupAssistance')}
              </button>
            </div>
          </div>
        </div>
      )}
      {/* Step 2 Modal - Customer Information */}
      {currentStep === 'step2' && (
        <div className="fixed inset-0 flex items-center  justify-center bg-black/50 z-50 p-4" onClick={handleBackdropClick}>
          <div className="bg-white rounded-lg shadow-lg w-full max-w-xl flex flex-col max-h-[90vh]">

            {/* Header (Fixed) */}
            <div className="flex justify-between items-center p-6 border-b rounded-t-lg border-gray-200 sticky top-0 bg-white z-10 flex-shrink-0">
              <div className="flex items-center gap-3">
                <button
                  onClick={handleBackClick}
                  className="text-gray-600 hover:text-gray-900"
                >
                  <ArrowLeft size={24} />
                </button>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    {t('dashboard.employee.modal.customerInformation')}
                  </h2>
                  <p className="text-sm text-gray-600">
                    {t('dashboard.employee.modal.email')}: {formData.customerEmail}
                  </p>
                </div>

              </div>
              <button
                onClick={closeAll}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={24} />
              </button>
            </div>

            {/* Scrollable Form Section */}
            <div className="p-6 space-y-4 overflow-y-auto flex-1">
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-1">
                  {t('dashboard.employee.modal.firstName')}
                  <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}

                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-1">
                  {t('dashboard.employee.modal.middleName')}
                </label>
                <input
                  type="text"
                  name="middleName"
                  value={formData.middleName}
                  onChange={handleInputChange}
                  placeholder={t('dashboard.employee.modal.middleName')}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-1">
                  {t('dashboard.employee.modal.lastName')}
                  <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  placeholder={t('dashboard.employee.modal.lastName')}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-1">
                  {t('dashboard.employee.modal.alsoKnownAs')}
                </label>
                <input
                  type="text"
                  name="nickname"
                  value={formData.nickname}
                  onChange={handleInputChange}
                  placeholder={t('dashboard.employee.modal.alsoKnownAs')}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-1">
                  {t('dashboard.employee.modal.phone')}
                  <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="+92 9876543210"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-1">
                  {t('dashboard.employee.modal.email')}
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="m@gmail.com"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-1">
                  {t('dashboard.employee.modal.geoLocation')}
                  <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="geoLocation"
                  value={formData.geoLocation}
                  onChange={handleInputChange}

                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-1">
                  {t('dashboard.employee.modal.district')}
                </label>
                <input
                  type="text"
                  name="district"
                  value={formData.district}
                  onChange={handleInputChange}

                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-1">
                  {t('dashboard.employee.modal.mandal')}
                </label>
                <input
                  type="text"
                  name="mandal"
                  value={formData.mandal}
                  onChange={handleInputChange}
                  placeholder={t('dashboard.employee.modal.mandal')}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-1">
                  {t('dashboard.employee.modal.village')}
                </label>
                <input
                  type="text"
                  name="village"
                  value={formData.village}
                  onChange={handleInputChange}

                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
            </div>

            {/* Fixed Footer */}
            <div className="p-6 border-t border-gray-200 sticky rounded-b-lg bottom-0 bg-white flex-shrink-0 z-10">
              <button
                onClick={handleStepSubmit}
                className="w-full bg-green-600 text-white py-3 rounded-md hover:bg-green-700 font-semibold"
              >
                {t('dashboard.employee.modal.saveButton')}
              </button>
            </div>
          </div>
        </div>
      )}
      {/* Step 3 Modal - Verification Details */}

      {currentStep === 'step3' && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50 p-4" onClick={handleBackdropClick}>
          <div className="bg-white rounded-lg shadow-lg w-full max-w-xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center p-6 border-b border-gray-200 sticky top-0 bg-white">
              <div className="flex items-center gap-3">
                <button
                  onClick={handleBackClick}
                  className="text-gray-600 hover:text-gray-900"
                >
                  <ArrowLeft size={24} />
                </button>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">{t('dashboard.employee.modal.verificationDetails')}</h2>
                  <p className="text-sm text-gray-600">{t('dashboard.employee.modal.email')}: {formData.customerEmail}</p>
                </div>
              </div>
              <button
                onClick={closeAll}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={24} />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-1">
                  {t('dashboard.employee.modal.kycDocuments')}
                </label>
                <input
                  type="file"
                  onChange={handleFileChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-1">
                  {t('dashboard.employee.modal.street')}
                  <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="street"
                  value={formData.street}
                  onChange={handleInputChange}

                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-1">
                    {t('dashboard.employee.modal.city')}
                    <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-1">
                    {t('dashboard.employee.modal.state')}
                    <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="state"
                    value={formData.state}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-1">
                    {t('dashboard.employee.modal.postalCode')}
                    <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="postalCode"
                    value={formData.postalCode}
                    onChange={handleInputChange}
                    placeholder="400020"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-1">
                    {t('dashboard.employee.modal.country')}
                    <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="country"
                    value={formData.country}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-1">
                  {t('dashboard.employee.modal.industry')}
                  <span className="text-red-500">*</span>
                </label>
                <div className='relative'>
                  <select
                    name="industry"
                    value={formData.industry}
                    onChange={handleInputChange}
                    className=" focus:outline-none focus:ring-2 w-full px-4 py-2  border  border-black/30 rounded-lg focus:ring-black appearance-none  text-sm"
                  >
                    <option value="">{t('dashboard.employee.modal.selectIndustry')}</option>
                    <option value="agriculture">{t('dashboard.employee.modal.agriculture')}</option>
                    <option value="technology">{t('dashboard.employee.modal.technology')}</option>
                    <option value="retail">{t('dashboard.employee.modal.retail')}</option>
                    <option value="healthcare">{t('dashboard.employee.modal.healthcare')}</option>
                  </select>
                  <IoChevronDown
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none"
                    size={20}
                  />
                </div>
              </div>

              <button
                onClick={handleStepSubmit}
                className="w-full bg-green-600 text-white py-3 rounded-md hover:bg-green-700 font-semibold mt-4"
              >
                {t('dashboard.employee.modal.saveveriButton')}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Step 4 Modal - Service Location */}
      {currentStep === 'step4' && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50 p-4" onClick={handleBackdropClick}>
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center p-6 border-b border-gray-200 sticky top-0 bg-white">
              <div className="flex items-center gap-3">
                <button
                  onClick={handleBackClick}
                  className="text-gray-600 hover:text-gray-900"
                >
                  <ArrowLeft size={24} />
                </button>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">{t('dashboard.employee.modal.serviceLocation')}</h2>
                  <p className="text-sm text-gray-600">{t('dashboard.employee.modal.email')}: {formData.customerEmail}</p>
                </div>
              </div>
              <button
                onClick={closeAll}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={24} />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-1">
                  {t('dashboard.employee.modal.latitude1')}
                </label>
                <input
                  type="text"
                  name="latitude1"
                  value={formData.latitude1}
                  onChange={handleInputChange}
                  placeholder="Lat. Long"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-1">
                  {t('dashboard.employee.modal.latitude2')}
                </label>
                <input
                  type="text"
                  name="latitude2"
                  value={formData.latitude2}
                  onChange={handleInputChange}
                  placeholder="Lat. Long"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>

              <div className="flex items-end justify-between gap-2">
                <div className="flex-1">
                  <label className="block text-sm font-semibold text-gray-900 mb-1">
                    {t('dashboard.employee.modal.latitude3')}
                  </label>
                  <input
                    type="text"
                    name="latitude3"
                    value={formData.latitude3}
                    onChange={handleInputChange}
                    placeholder="Lat. Long"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
                <button
                  onClick={addLocation}
                  className="bg-green-600 text-white p-2 rounded-md hover:bg-green-700 h-10"
                >
                  <Plus size={20} />
                </button>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-1">
                  {t('dashboard.employee.modal.acres')}
                </label>
                <input
                  type="text"
                  name="acres"
                  value={formData.acres}
                  onChange={handleInputChange}
                  placeholder={t('dashboard.employee.modal.acresPlaceholder')}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>

              {formData.locations.map((loc, index) => (
                <div key={index} className="border-t pt-4 mt-4">
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    {t('profileSetup.additionalLocation')} {index + 1}
                  </label>
                  <input
                    type="text"
                    placeholder="Lat. Long"
                    value={`${loc.lat} ${loc.long}`}
                    onChange={(e) => {
                      const [lat, long] = e.target.value.split(' ');
                      updateLocation(index, 'lat', lat || '');
                      updateLocation(index, 'long', long || '');
                    }}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
              ))}

              <button
                onClick={handleStepSubmit}
                className="w-full bg-green-600 text-white py-3 rounded-md hover:bg-green-700 font-semibold mt-4"
              >
                {t('dashboard.employee.modal.savelocaButton')}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
