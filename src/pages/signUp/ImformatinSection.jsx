import React, { useState, useRef, useEffect } from 'react';
import { FaMapMarkerAlt, FaUpload, FaApple, FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import { FaFacebookF } from 'react-icons/fa6';
import { Link, useNavigate } from 'react-router-dom';

export default function ImformatinSection({ formData, setFormData }) {
    const navigate = useNavigate();
    const industries = ['Mapping & Surveying', 'Construction', 'Agriculture', 'Real Estate'];
    const subCategories = [
        { id: 1, name: 'Drone Mapping & Surveying (DMS)' },
        { id: 2, name: 'General Surveying & Mapping (GSM)' },
        { id: 3, name: 'Geodetic/Satellite (GNSS)' },
        { id: 4, name: 'Data Analysis (DA)' }
    ];

    const [isIndustryOpen, setIsIndustryOpen] = useState(false);
    const dropdownRef = useRef(null);

    // Click outside to close dropdown
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsIndustryOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleSubCategoryToggle = (id) => {
        setFormData((prev) => ({
            ...prev,
            subCategories: prev.subCategories.includes(id)
                ? prev.subCategories.filter((catId) => catId !== id)
                : [...prev.subCategories, id]
        }));
    };

    const handleSubmit = () => {
        navigate('/login');
    };

    return (
     <div className="min-h-screen flex items-center justify-center px-2  md:px-6 lg:px-0 bg-gray-100">
  <div className="bg-white/80 backdrop-blur-lg rounded-2xl w-full max-w-5xl p-4 sm:p-6 md:p-8 lg:p-12 shadow-lg">
    {/* Header */}
    <h2 className="text-3xl sm:text-3xl md:text-4xl font-bold text-center text-gray-800 mb-6 sm:mb-8 drop-shadow-sm">
      Field Agent Info
    </h2>

    {/* Grid Form */}
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-5 md:gap-6">
      {/* First Name */}
      <InputField
        label="First Name"
        value={formData.firstName}
        onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
        placeholder="Enter first name"
      />

      {/* Last Name */}
      <InputField
        label="Last Name"
        value={formData.lastName}
        onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
        placeholder="Enter last name"
      />

      {/* Phone */}
      <InputField
        label="Phone number"
        value={formData.phone}
        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
        placeholder="Phone number"
      />

      {/* Email */}
      <InputField
        label="Email"
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        placeholder="Email"
      />

      {/* Latitude/Longitude */}
      <div className="flex flex-col relative">
        <label className="text-sm sm:text-base font-medium mb-1 text-gray-700">
          Latitude/Longitude <span className="text-red-500">*</span>
        </label>
        <div className="relative">
          <input
            type="text"
            value={formData.latitude}
            onChange={(e) => setFormData({ ...formData, latitude: e.target.value })}
            placeholder="Latitude and longitude"
            className="w-full px-3 sm:px-4 pr-10 py-2 sm:py-3 rounded-xl border border-gray-300 bg-white/60 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-green-400"
          />
          <div className="absolute inset-y-0 right-3 flex items-center">
            <FaMapMarkerAlt className="text-gray-400" />
          </div>
        </div>
      </div>

      {/* Service Radius */}
      <InputField
        label="Service radius"
        value={formData.serviceRadius}
        onChange={(e) => setFormData({ ...formData, serviceRadius: e.target.value })}
        placeholder="e.g., 10KM"
      />

      {/* Industry Dropdown */}
      <div className="flex flex-col sm:col-span-2 relative" ref={dropdownRef}>
        <label className="text-sm sm:text-base font-medium mb-1 text-gray-700">Industry</label>
        <div
          onClick={() => setIsIndustryOpen(!isIndustryOpen)}
          className="flex items-center justify-between px-3 sm:px-4 py-2 sm:py-3 rounded-xl cursor-pointer border border-gray-300 bg-white/60 backdrop-blur-sm shadow-md hover:shadow-lg w-full"
        >
          <span>{formData.industry || 'Select Industry'}</span>
          <FaChevronDown
            className={`transition-transform duration-300 ${isIndustryOpen ? 'rotate-180' : 'rotate-0'}`}
          />
        </div>

        {isIndustryOpen && (
          <div className="absolute top-full left-0 z-10 mt-1 w-full bg-white border border-gray-300 rounded-xl shadow-lg max-h-60 overflow-y-auto">
            {industries.map((ind) => (
              <div
                key={ind}
                onClick={() => {
                  setFormData({ ...formData, industry: ind });
                  setIsIndustryOpen(false);
                }}
                className={`px-4 py-3 cursor-pointer transition hover:bg-green-50 ${
                  formData.industry === ind ? 'bg-green-50 text-green-600 font-semibold' : 'text-gray-800'
                }`}
              >
                {ind}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Upload Profile */}
      <div className="flex flex-col sm:col-span-2">
        <label className="text-sm sm:text-base font-medium mb-2 text-gray-700">
          Upload Profile <span className="text-red-500">*</span>
        </label>
        <label className="border-2 border-dashed border-gray-300 rounded-2xl p-4 sm:p-6 md:p-8 text-center cursor-pointer hover:bg-green-50 transition flex flex-col items-center justify-center bg-white/50 backdrop-blur-sm shadow-inner">
          {formData.profileImage ? (
            <img
              src={URL.createObjectURL(formData.profileImage)}
              alt="Preview"
              className="mb-3 w-24 sm:w-28 h-24 sm:h-28 object-cover rounded-full ring-2 ring-green-500 shadow-md"
            />
          ) : (
            <FaUpload className="mb-2 text-green-600" size={28} />
          )}
          <p className="text-sm sm:text-base text-green-600 font-semibold mb-1">
            {formData.profileImage ? 'Change Photo' : 'Upload Profile'}
          </p>
          <p className="text-xs sm:text-sm text-gray-400">(PNG, JPG; max 5MB)</p>
          <input
            type="file"
            className="hidden"
            accept="image/*"
            onChange={(e) => setFormData({ ...formData, profileImage: e.target.files[0] })}
          />
        </label>
      </div>

      {/* Sub Categories */}
      <div className="flex flex-col sm:col-span-2">
        <label className="text-sm sm:text-base font-medium mb-2 text-gray-700">Sub category</label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
          {subCategories.map((cat) => (
            <div
              key={cat.id}
              onClick={() => handleSubCategoryToggle(cat.id)}
              className={`flex items-center justify-between px-3 sm:px-4 py-2 sm:py-3 rounded-xl cursor-pointer transition shadow-md hover:shadow-lg ${
                formData.subCategories.includes(cat.id)
                  ? 'border-green-500 bg-green-50'
                  : 'border-gray-300 bg-white/60 backdrop-blur-sm'
              }`}
            >
              <span className="text-sm sm:text-base text-gray-800">{cat.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>

    {/* Bottom Section */}
    <div className="mt-6 sm:mt-8 flex flex-col space-y-4">
      <button
        onClick={handleSubmit}
        className="w-full bg-green-600 text-white py-3 sm:py-3.5 rounded-2xl font-semibold hover:bg-green-700 transition shadow-lg"
      >
        Submit for verification
      </button>

      <div className="flex items-center gap-2">
        <div className="flex-1 h-px bg-gray-300"></div>
        <span className="text-sm sm:text-base text-gray-500">Or sign in with</span>
        <div className="flex-1 h-px bg-gray-300"></div>
      </div>

      <div className="flex justify-center gap-4">
        <button className="w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center border border-gray-300 rounded-full hover:bg-gray-50 transition shadow-lg">
          <FcGoogle className="w-6 h-6 sm:w-7 sm:h-7" />
        </button>
        <button className="w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center border border-gray-300 rounded-full hover:bg-gray-50 transition shadow-lg">
          <FaFacebookF className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>
        <button className="w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center border border-gray-300 rounded-full hover:bg-gray-50 transition shadow-lg">
          <FaApple className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>
      </div>

      <div className="text-center text-sm sm:text-base text-gray-600">
        I have an account?{' '}
        <Link to="/login" className="text-green-600 font-medium hover:underline">
          Sign in
        </Link>
      </div>
    </div>
  </div>
</div>


    );
}

// Reusable Input Field
function InputField({ label, value, onChange, placeholder }) {
    return (
        <div className="flex flex-col">
            <label className="text-sm font-medium mb-1 text-gray-700">
                {label} <span className="text-red-500">*</span>
            </label>
            <input
                type="text"
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                className="w-full px-4 py-2 rounded-xl border border-gray-300 bg-white/60 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-green-400 shadow-inner"
            />
        </div>
    );
}
