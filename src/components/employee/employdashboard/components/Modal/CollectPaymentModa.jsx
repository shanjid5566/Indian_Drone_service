import { useState, useRef, useEffect } from "react";
import { BiChevronDown, BiChevronUp } from "react-icons/bi";
import { useTranslation } from "react-i18next";
import { IoMdClose } from "react-icons/io";

const CollectPaymentModal = ({ isOpen, onClose }) => {
  const { t } = useTranslation();
  const [customer, setCustomer] = useState('');
  const [amount, setAmount] = useState('');
  const [paymentMethod, setPaymentMethod] = useState(t('dashboard.employee.modal.creditCard'));
  const [notes, setNotes] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const [errors, setErrors] = useState({
    customer: '',
    amount: '',
  });

  const modalRef = useRef(null);
  const dropdownRef = useRef(null);
  

  const paymentMethods = [t('dashboard.employee.modal.creditCard'), t('dashboard.employee.modal.debitCard'), t('dashboard.employee.modal.bank'), t('dashboard.employee.modal.rupay')];

  // Dropdown outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Modal outside click
  useEffect(() => {
    const handleOutsideModal = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
        resetFields();
      }
    };
    if (isOpen) {
      document.addEventListener("mousedown", handleOutsideModal);
    }
    return () => document.removeEventListener("mousedown", handleOutsideModal);
  }, [isOpen, onClose]);

  const resetFields = () => {
    setCustomer('');
    setAmount('');
    setPaymentMethod(t('dashboard.employee.modal.creditCard'));
    setNotes('');
    setErrors({ customer: '', amount: '' });
    setIsDropdownOpen(false);
  };

  const handleSubmit = () => {
    const newErrors = { customer: '', amount: '' };
    let isValid = true;

    if (!customer.trim()) {
      newErrors.customer = 'Customer ID is required!';
      isValid = false;
    }
    if (!amount.trim() || amount === "$00.00") {
      newErrors.amount = 'Amount is required!';
      isValid = false;
    }

    setErrors(newErrors);

    if (!isValid) return;

    // Payment processed successfully
    alert('Payment processed successfully!'); 
    resetFields();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-2 sm:p-5 z-50">
      <div
        ref={modalRef}
        className="bg-white rounded-lg w-full max-w-2xl shadow-2xl p-3 sm:p-4 mx-2"
      >
        {/* Header */}
        <div className="flex justify-between items-center p-3 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-[#002244]">
            {t('dashboard.employee.modal.collectTitle')}
          </h2>
          <button
            onClick={() => { onClose(); resetFields(); }}
            className="text-gray-400 hover:text-gray-600 text-2xl leading-none"
          >
            <IoMdClose />
          </button>
        </div>

        <div className="p-3 sm:p-4">
          {/* Customer */}
          <div className="mb-3">
            <label className="block text-base font-medium text-[#002244] mb-2">
              {t('dashboard.employee.modal.customerLabel')}
            </label>
            <input
              type="text"
              placeholder={t('dashboard.employee.modal.customerPlaceholder')}
              value={customer}
              onChange={(e) => setCustomer(e.target.value)}
              className={`w-full px-2 sm:px-3 py-2 sm:py-2.5 border rounded focus:outline-none focus:border-black/70 text-base ${errors.customer ? 'border-red-500' : 'border-gray-300'}`}
            />
            {errors.customer && <p className="text-red-500 text-sm mt-1">{errors.customer}</p>}
          </div>

          {/* Amount */}
          <div className="mb-3">
            <label className="block text-base font-medium text-[#002244] mb-2">
              {t('dashboard.employee.modal.amountLabel')}
            </label>
            <input
              type="text"
              placeholder="$ 00.00"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className={`w-full px-2 sm:px-3 py-2 sm:py-2.5 border rounded focus:outline-none focus:border-black/70 text-base ${errors.amount ? 'border-red-500' : 'border-gray-300'}`}
            />
            {errors.amount && <p className="text-red-500 text-sm mt-1">{errors.amount}</p>}
          </div>

          {/* Payment Method Dropdown */}
          <div className="mb-3 relative" ref={dropdownRef}>
            <label className="block text-base font-medium text-[#002244] mb-2">
              {t('dashboard.employee.modal.paymentMethodLabel')}
            </label>
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="w-full px-2 sm:px-3 py-2 sm:py-2.5 border border-gray-300 rounded text-left text-base text-[#002244] bg-white hover:border-gray-400 flex justify-between items-center"
            >
              {paymentMethod}
              {isDropdownOpen ? (
                <BiChevronUp className="text-xl text-gray-500" />
              ) : (
                <BiChevronDown className="text-xl text-gray-500" />
              )}
            </button>

            {isDropdownOpen && (
              <div className="absolute top-full left-0 right-0 bg-white border border-gray-300 rounded mt-1 shadow-lg z-10 overflow-hidden">
                {paymentMethods.map((method, index) => (
                  <div
                    key={index}
                    onClick={() => {
                      setPaymentMethod(method);
                      setIsDropdownOpen(false);
                    }}
                    className={`px-2 sm:px-3 py-2 sm:py-2.5 cursor-pointer text-base transition-colors ${paymentMethod === method ? 'bg-green-500 text-white' : 'text-[#002244] hover:bg-gray-100'}`}
                  >
                    {method}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Notes */}
          <div className="mb-5">
            <label className="block text-base font-medium text-[#002244] mb-2">
              {t('dashboard.employee.modal.notesLabel')}
            </label>
            <textarea
              placeholder={t('dashboard.employee.modal.notesPlaceholder')}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full px-2 sm:px-3 py-2 sm:py-2.5 border border-gray-300 rounded focus:outline-none focus:border-black/70 text-base resize-none h-24"
            />
          </div>

          {/* Button */}
          <button
            onClick={handleSubmit}
            className="w-full bg-[#28A844] hover:bg-green-600 text-white font-medium py-2.5 sm:py-3 rounded text-base transition-colors"
          >
            {t('dashboard.employee.modal.processButton')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CollectPaymentModal;
