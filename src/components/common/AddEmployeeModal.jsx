import React, { useState } from 'react';
import { HiX, HiArrowLeft } from 'react-icons/hi';

const AddEmployeeModal = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    employeeType: 'CSR',
    roleCode: 'FOR',
    department: 'Marketing',
    annualSalary: '600k',
    employmentStatus: 'Active',
  });

  const employeeTypes = [
    { value: 'CSR', label: 'CSR' },
    { value: 'Engineer', label: 'Engineer' },
    { value: 'Instructor', label: 'Instructor' },
    { value: 'Officer', label: 'Officer' },
    { value: 'Marketing', label: 'Marketing' },
    { value: 'Technician', label: 'Technician' },
    { value: 'Developer', label: 'Developer' },
    { value: 'Designer', label: 'Designer' },
    { value: 'Accountant', label: 'Accountant' },
  ];

  const roleCodes = [
    { value: 'FOR', label: 'FOR' },
    { value: 'CSR', label: 'CSR' },
    { value: 'DIN', label: 'DIN' },
    { value: 'ENG', label: 'ENG' },
    { value: 'OFR', label: 'OFR' },
    { value: 'MKT', label: 'MKT' },
    { value: 'TCH', label: 'TCH' },
    { value: 'DEV', label: 'DEV' },
    { value: 'DES', label: 'DES' },
    { value: 'ACC', label: 'ACC' },
  ];

  const departments = [
    { value: 'Marketing', label: 'Marketing' },
    { value: 'Engineering', label: 'Engineering' },
    { value: 'Training', label: 'Training' },
    { value: 'Administration', label: 'Administration' },
    { value: 'Customer Service', label: 'Customer Service' },
    { value: 'Technical', label: 'Technical' },
    { value: 'IT', label: 'IT' },
    { value: 'Design', label: 'Design' },
    { value: 'Finance', label: 'Finance' },
    { value: 'Human Resources', label: 'Human Resources' },
  ];

  const statuses = [
    { value: 'Active', label: 'Active' },
    { value: 'Inactive', label: 'Inactive' },
  ];

  const handleChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSubmit) {
      onSubmit(formData);
    }
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center'>
      {/* Backdrop */}
      <div
        className='absolute inset-0 bg-black/70 bg-opacity-50'
        onClick={onClose}
      />

      {/* Modal */}
      <div className='relative bg-white rounded-lg shadow-xl max-w-lg w-full mx-4 max-h-[90vh] overflow-y-auto'>
        {/* Header */}
        <div className='sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between'>
          <div className='flex items-center gap-3'>
            <button
              onClick={onClose}
              className='text-gray-600 hover:text-gray-800 transition-colors'
            >
              <HiArrowLeft className='w-5 h-5' />
            </button>
            <h2 className='text-xl font-semibold font-["Poppins"] text-[#1A1A1A]'>
              Add Employee
            </h2>
          </div>
          <button
            onClick={onClose}
            className='text-gray-400 hover:text-gray-600 transition-colors'
          >
            <HiX className='w-6 h-6' />
          </button>
        </div>

        {/* Body */}
        <form onSubmit={handleSubmit} className='px-6 py-6'>
          <div className='space-y-5'>
            {/* Employee Type */}
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-2'>
                Employee type<span className='text-red-500'>*</span>
              </label>
              <div className='relative'>
                <select
                  value={formData.employeeType}
                  onChange={(e) => handleChange('employeeType', e.target.value)}
                  className='w-full px-4 py-3 bg-[#F7FEE7] border border-gray-200 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500 appearance-none'
                  required
                >
                  {employeeTypes.map((type) => (
                    <option key={type.value} value={type.value}>
                      {type.label}
                    </option>
                  ))}
                </select>
                <div className='pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-700'>
                  <svg
                    className='h-4 w-4'
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M19 9l-7 7-7-7'
                    />
                  </svg>
                </div>
              </div>
            </div>

            {/* Role Code */}
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-2'>
                Role Code<span className='text-red-500'>*</span>
              </label>
              <div className='relative'>
                <select
                  value={formData.roleCode}
                  onChange={(e) => handleChange('roleCode', e.target.value)}
                  className='w-full px-4 py-3 bg-[#F7FEE7] border border-gray-200 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500 appearance-none'
                  required
                >
                  {roleCodes.map((code) => (
                    <option key={code.value} value={code.value}>
                      {code.label}
                    </option>
                  ))}
                </select>
                <div className='pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-700'>
                  <svg
                    className='h-4 w-4'
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M19 9l-7 7-7-7'
                    />
                  </svg>
                </div>
              </div>
            </div>

            {/* Department */}
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-2'>
                Department<span className='text-red-500'>*</span>
              </label>
              <div className='relative'>
                <select
                  value={formData.department}
                  onChange={(e) => handleChange('department', e.target.value)}
                  className='w-full px-4 py-3 bg-[#F7FEE7] border border-gray-200 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500 appearance-none'
                  required
                >
                  {departments.map((dept) => (
                    <option key={dept.value} value={dept.value}>
                      {dept.label}
                    </option>
                  ))}
                </select>
                <div className='pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-700'>
                  <svg
                    className='h-4 w-4'
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M19 9l-7 7-7-7'
                    />
                  </svg>
                </div>
              </div>
            </div>

            {/* Annual Salary */}
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-2'>
                Annual Salary<span className='text-red-500'>*</span>
              </label>
              <input
                type='text'
                value={formData.annualSalary}
                onChange={(e) => handleChange('annualSalary', e.target.value)}
                className='w-full px-4 py-3 bg-[#F7FEE7] border border-gray-200 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500'
                placeholder='600k'
                required
              />
            </div>

            {/* Employment Status */}
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-2'>
                Employment Status<span className='text-red-500'>*</span>
              </label>
              <div className='relative'>
                <select
                  value={formData.employmentStatus}
                  onChange={(e) =>
                    handleChange('employmentStatus', e.target.value)
                  }
                  className='w-full px-4 py-3 bg-[#F7FEE7] border border-gray-200 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500 appearance-none'
                  required
                >
                  {statuses.map((status) => (
                    <option key={status.value} value={status.value}>
                      {status.label}
                    </option>
                  ))}
                </select>
                <div className='pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-700'>
                  <svg
                    className='h-4 w-4'
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M19 9l-7 7-7-7'
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type='submit'
            className='w-full mt-6 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium font-["Poppins"]'
          >
            Create Account
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddEmployeeModal;
