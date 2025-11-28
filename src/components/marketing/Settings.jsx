import React, { useState } from 'react';

import { LiaEdit } from "react-icons/lia";

const Settings = () => {
  const [formData, setFormData] = useState({
    firstName: 'Jenny',
    lastName: 'Wilson',
    email: 'alma.lawson@example.com',
    phone: '0412 345 678',
    oldPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSave = () => {
    console.log('Settings saved:', formData);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-start mb-8">
          <div>
            <h1 className="text-3xl lg:text-[40px] font-bold text-gray-900 mb-2">
              Settings
            </h1>
            <p className="text-sm lg:text-base text-gray-600">
              Manage your account settings and preferences
            </p>
          </div>
          <button 
            onClick={handleSave}
            className="bg-green-500 hover:bg-green-600 text-white text-sm lg:text-base font-medium px-6 lg:px-6 py-2 lg:py-3 rounded-sm transition-colors"
          >
            Save
          </button>
        </div>

        {/* Cards Container */}
        <div className="grid lg:grid-cols-2 gap-2 lg:gap-6">
          {/* Personal Details Card */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl lg:text-2xl font-semibold text-gray-900">
                Personal Details
              </h2>
              <button className="text-gray-500 hover:text-gray-700">
                <LiaEdit  className="w-7 h-7" />
              </button>
            </div>

            <div className="space-y-4">
              {/* First Name & Last Name */}
              <div className="grid xl:grid-cols-2 xl:gap-4 gap-2">
                <div>
                  <label className="block text-sm lg:text-base text-gray-700 mb-1 xl:mb-2">
                    First Name
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    className="w-full px-4 py-1.5 xl:py-3 border border-gray-300 rounded-lg text-sm lg:text-base text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm lg:text-base text-gray-700 mb-1 xl:mb-2">
                    Last Name
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    className="w-full px-4 py-1.5 xl:py-3 border border-gray-300 rounded-lg text-sm lg:text-base text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm lg:text-base text-gray-700 mb-1 xl:mb-2">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-1.5 xl:py-3 border border-gray-300 rounded-lg text-sm lg:text-base text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>

              {/* Phone Number */}
              <div>
                <label className="block text-sm lg:text-base text-gray-700 mb-1 xl:mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-1.5 xl:py-3 border border-gray-300 rounded-lg text-sm lg:text-base text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>

          {/* Account Password Card */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl lg:text-2xl font-semibold text-gray-900">
                Account Password
              </h2>
              <button className="text-gray-500 hover:text-gray-700">
                <LiaEdit  className="w-7 h-7" />
              </button>
            </div>

            <div className="xl:space-y-4 space-y-2">
              {/* Old Password */}
              <div>
                <label className="block text-sm lg:text-base text-gray-700 mb-1 xl:mb-2">
                  Old Password
                </label>
                <input
                  type="password"
                  name="oldPassword"
                  value={formData.oldPassword}
                  onChange={handleChange}
                  placeholder="••••••"
                  className="w-full px-4 py-1.5 xl:py-3 border border-gray-300 rounded-lg text-sm lg:text-base text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>

              {/* New Password */}
              <div>
                <label className="block text-sm lg:text-base text-gray-700 mb-1 xl:mb-2">
                  New Password
                </label>
                <input
                  type="password"
                  name="newPassword"
                  value={formData.newPassword}
                  onChange={handleChange}
                  placeholder="••••••"
                  className="w-full px-4 py-1.5 xl:py-3 border border-gray-300 rounded-lg text-sm lg:text-base text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>

              {/* Confirm New Password */}
              <div>
                <label className="block text-sm lg:text-base text-gray-700 mb-1 xl:mb-2">
                  Confirm New Password
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="••••••"
                  className="w-full px-4 py-1.5 xl:py-3 border border-gray-300 rounded-lg text-sm lg:text-base text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;