import React, { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { FaTimes } from 'react-icons/fa';
import { IoChevronDown } from 'react-icons/io5';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ManageTicketModal = ({ isOpen, onClose, onSubmit }) => {
  const modalRef = useRef(null);
  const statusDropdownRef = useRef(null);
const { t } = useTranslation();
  const [formData, setFormData] = useState({
    ticketId: '',
    status: t('dashboard.employee.modal.inProgress'),
    internalNotes: '',
    customerResponse: ''
  });

  const [errors, setErrors] = useState({
    ticketId: '',
    status: ''
  });

  const [statusOpen, setStatusOpen] = useState(false);

  const statuses = [ t('dashboard.employee.modal.inProgress'), t('dashboard.employee.modal.waitingForCustomer'), t('dashboard.employee.modal.resolved'), t('dashboard.employee.modal.closed')];

  // Handle dropdown outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        statusDropdownRef.current &&
        !statusDropdownRef.current.contains(e.target)
      ) {
        setStatusOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const resetForm = () => {
    setFormData({
      ticketId: '',
      status: t('dashboard.employee.modal.inProgress'),
      internalNotes: '',
      customerResponse: ''
    });
    setErrors({
      ticketId: '',
      status: ''
    });
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const validate = () => {
    let tempErrors = { ticketId: '', status: '' };
    let isValid = true;

    if (!formData.ticketId.trim()) {
      tempErrors.ticketId = 'This field is required';
      isValid = false;
    }

    setErrors(tempErrors);
    return isValid;
  };

  const handleSubmit = () => {
    if (!validate()) return;

    toast.success('Ticket updated successfully!');
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
        className="bg-white rounded-lg shadow-2xl w-full max-w-md md:max-w-2xl relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg md:text-xl font-semibold text-gray-800">
            {t('dashboard.employee.modal.manageTicket')}
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
          {/* Ticket ID Field */}
          <div className="mb-4">
            <label className="block text-base font-medium text-gray-800 mb-2">
              {t('dashboard.employee.modal.ticketID')}
            </label>
            <input
              type="text"
              placeholder="Enter Ticket ID"
              value={formData.ticketId}
              onChange={(e) => setFormData({ ...formData, ticketId: e.target.value })}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-black/70 text-sm ${
                errors.ticketId ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.ticketId && (
              <p className="text-red-500 text-xs mt-1">{errors.ticketId}</p>
            )}
          </div>

          {/* Status Dropdown */}
          <div className="mb-4 relative" ref={statusDropdownRef}>
            <label className="block text-base font-medium text-gray-800 mb-2">
              {t('dashboard.employee.modal.updateStatus')}
            </label>
            <button
              type="button"
              onClick={() => setStatusOpen(!statusOpen)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md flex items-center justify-between focus:outline-none focus:ring-2 focus:ring-black/70 text-base bg-white"
            >
              <span>{formData.status}</span>
              <IoChevronDown
                className={`transition-transform duration-200 ${statusOpen ? 'rotate-180' : ''}`}
              />
            </button>

            {statusOpen && (
              <div className="absolute mt-1 w-full bg-white shadow-lg rounded-md border border-gray-200 z-50">
                {statuses.map((status) => (
                  <div
                    key={status}
                    onClick={() => {
                      setFormData({ ...formData, status });
                      setStatusOpen(false);
                    }}
                    className={`px-3 py-2 cursor-pointer transition-colors ${
                      formData.status === status
                        ? 'bg-[#28A844] text-white font-medium'
                        : 'hover:bg-gray-100'
                    }`}
                  >
                    {status}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Internal Notes */}
          <div className="mb-4">
            <div className="flex items-center gap-2 mb-2">
              <label className="block text-base font-medium text-gray-800">
                {t('dashboard.employee.modal.internalNotes')}
              </label>

            </div>
            <textarea
              placeholder="Enter internal notes..."
              value={formData.internalNotes}
              onChange={(e) =>
                setFormData({ ...formData, internalNotes: e.target.value })
              }
              rows="3"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 text-sm resize-none"
            />
          </div>

          {/* Customer Response */}
          <div className="mb-6">
            <label className="block text-base font-medium text-gray-800 mb-2">
              {t('dashboard.employee.modal.customerResponse')}
            </label>
            <div className="bg-gray-50 border border-gray-200 rounded-md p-3 text-sm">
              <p className="text-gray-600 text-xs mb-2">
                <span className="font-semibold">Customer</span> • 29 Sep 2025, 11:42 AM
              </p>
              <p className="text-gray-700">
                Thank you. Please update on your Fl resolved.
              </p>
            </div>
          </div>

          {/* Submit Button */}
          <button
            onClick={handleSubmit}
            className="w-full bg-[#28A844] hover:bg-green-600 text-white font-medium py-3 px-4 rounded-md transition-colors duration-200 text-sm md:text-base"
          >
            {t('dashboard.employee.modal.updateTicket')} 
          </button>
        </div>
      </div>

      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default ManageTicketModal;