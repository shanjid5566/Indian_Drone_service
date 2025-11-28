// import { useState, useRef, useEffect } from "react";
// import { BiChevronDown, BiChevronUp } from "react-icons/bi";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { useTranslation } from "react-i18next";
// import { IoMdClose } from "react-icons/io";

// const ResolveBillingModal = ({ isOpen, onClose }) => {
//   const initialState = {
//     customer: '',
//     issueType: 'Incorrect charge',
//     transactionId: '',
//     notes: '',
//     isDropdownOpen: false,
//   };

//   const [state, setState] = useState(initialState);
//   const modalRef = useRef(null);
//   const dropdownRef = useRef(null);
//   const { t } = useTranslation();

//   const issueTypes = [
//     t('dashboard.employee.modal.resolveIssueTypeOption1'),
//     t('dashboard.employee.modal.resolveIssueTypeOption2'),
//     t('dashboard.employee.modal.resolveIssueTypeOption3'),
//     t('dashboard.employee.modal.resolveIssueTypeOption4'),
//     t('dashboard.employee.modal.resolveIssueTypeOption5'),
//   ];

//   // Close dropdown when clicking outside
//   useEffect(() => {
//     const handleClickOutsideDropdown = (event) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//         setState(prev => ({ ...prev, isDropdownOpen: false }));
//       }
//     };
//     document.addEventListener("mousedown", handleClickOutsideDropdown);
//     return () => document.removeEventListener("mousedown", handleClickOutsideDropdown);
//   }, []);

//   // Close modal when clicking outside
//   useEffect(() => {
//     const handleClickOutsideModal = (event) => {
//       if (modalRef.current && !modalRef.current.contains(event.target)) {
//         handleClose();
//       }
//     };
//     if (isOpen) {
//       document.addEventListener("mousedown", handleClickOutsideModal);
//     }
//     return () => document.removeEventListener("mousedown", handleClickOutsideModal);
//   }, [isOpen]);

//   if (!isOpen) return null;

//   const handleClose = () => {
//     setState(initialState);
//     onClose();
//   };

//   const handleSubmit = () => {
//     const { customer, issueType, transactionId, notes } = state;

//     if (!customer.trim()) {
//       toast.error("Customer ID is required!");
//       return;
//     }
//     if (!transactionId.trim()) {
//       toast.error("Transaction ID is required!");
//       return;
//     }

//     toast.success("Issue resolved successfully!");
//     console.log({ customer, issueType, transactionId, notes });

//     setTimeout(() => {
//       handleClose();
//     }, 3800);
//   };

//   return (
//     <>
//       <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-2 sm:p-5 z-50">
//         <div ref={modalRef} className="bg-white rounded-lg w-full max-w-2xl shadow-2xl">
//           {/* Header */}
//           <div className="flex justify-between items-center p-4 sm:p-6 border-b border-gray-200">
//             <h2 className="text-xl font-semibold text-gray-800">{t('dashboard.employee.modal.resolveTitle')}</h2>
//             <button onClick={handleClose} className="text-gray-400 hover:text-gray-600 text-2xl leading-none"><IoMdClose />
//             </button>
//           </div>

//           {/* Body */}
//           <div className="p-4 sm:p-6">
//             {/* Customer */}
//             <div className="mb-4">
//               <label className="block text-base font-medium text-[#002244] mb-1">{t('dashboard.employee.modal.customerLabel')}</label>
//               <input
//                 type="text"
//                 placeholder={t('dashboard.employee.modal.resolveCustomerPlaceholder')}
//                 value={state.customer}
//                 onChange={(e) => setState(prev => ({ ...prev, customer: e.target.value }))}
//                 className="w-full px-3 py-2 border border-[#002244] rounded focus:outline-none focus:border-green-500 text-sm"
//               />
//             </div>

//             {/* Issue Type Dropdown */}
//             <div className="mb-4 relative" ref={dropdownRef}>
//               <label className="block text-base font-medium text-[#002244] mb-1">{t('dashboard.employee.modal.resolveIssueTypeLabel')}</label>
//               <button
//                 onClick={() => setState(prev => ({ ...prev, isDropdownOpen: !prev.isDropdownOpen }))}
//                 className="w-full px-3 py-2 border border-[#002244] rounded text-left text-base text-[#002244] bg-white hover:border-gray-400 flex justify-between items-center"
//               >
//                 {state.issueType}
//                 {state.isDropdownOpen ? <BiChevronUp className="text-xl text-[#002244]" /> : <BiChevronDown className="text-xl text-[#002244]" />}
//               </button>

//               {state.isDropdownOpen && (
//                 <div className="absolute top-full left-0 right-0 bg-white border border-[#002244] rounded mt-1 shadow-lg z-10 overflow-hidden">
//                   {issueTypes.map((type, index) => (
//                     <div
//                       key={index}
//                       onClick={() => setState(prev => ({ ...prev, issueType: type, isDropdownOpen: false }))}
//                       className={`px-3 py-2 cursor-pointer text-base flex justify-between items-center transition-colors ${state.issueType === type ? 'bg-green-500 text-white' : 'text-gray-700 hover:bg-gray-100'
//                         }`}
//                     >
//                       {type}
//                       {state.issueType === type && <span className="text-white">✓</span>}
//                     </div>
//                   ))}
//                 </div>
//               )}
//             </div>

//             {/* Transaction ID */}
//             <div className="mb-4">
//               <label className="block text-base font-medium text-[#002244] mb-1">{t('dashboard.employee.modal.resolveTransactionIdLabel')}</label>
//               <input
//                 type="text"
//                 placeholder={t('dashboard.employee.modal.resolveTransactionIdPlaceholder')}
//                 value={state.transactionId}
//                 onChange={(e) => setState(prev => ({ ...prev, transactionId: e.target.value }))}
//                 className="w-full px-3 py-2 border border-[#002244] rounded focus:outline-none focus:border-green-500 text-base"
//               />
//             </div>

//             {/* Notes */}
//             <div className="mb-4">
//               <label className="block text-base font-medium text-[#002244] mb-1">{t('dashboard.employee.modal.notesLabel')}</label>
//               <textarea
//                 placeholder={t('dashboard.employee.modal.resolveNotesPlaceholder')}
//                 value={state.notes}
//                 onChange={(e) => setState(prev => ({ ...prev, notes: e.target.value }))}
//                 className="w-full px-3 py-2 border border-[#002244] rounded focus:outline-none focus:border-green-500 text-base resize-none h-24"
//               />
//             </div>

//             {/* Submit */}
//             <button
//               onClick={handleSubmit}
//               className="w-full bg-green-500 hover:bg-green-600 text-white font-medium py-3 rounded text-base transition-colors"
//             >
//               {t('dashboard.employee.modal.resolveButton')}
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Toast container */}
//       <ToastContainer position="top-right" autoClose={3000} />
//     </>
//   );
// };

// export default ResolveBillingModal;





import { useState, useRef, useEffect } from "react";
import { BiChevronDown, BiChevronUp } from "react-icons/bi";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useTranslation } from "react-i18next";
import { IoMdClose } from "react-icons/io";

const ResolveBillingModal = ({ isOpen, onClose }) => {
  const { t } = useTranslation();
  const initialState = {
    customer: '',
    issueType: t('dashboard.employee.modal.incorrectCharge'),
    transactionId: '',
    notes: '',
    isDropdownOpen: false,
  };

  const [state, setState] = useState(initialState);
  const [errors, setErrors] = useState({});
  const modalRef = useRef(null);
  const dropdownRef = useRef(null);
  const customerRef = useRef(null);
  const issueTypeRef = useRef(null);
  const transactionIdRef = useRef(null);
  const notesRef = useRef(null);
  

  const issueTypes = [
    t('dashboard.employee.modal.resolveIssueTypeOption1'),
    t('dashboard.employee.modal.resolveIssueTypeOption2'),
    t('dashboard.employee.modal.resolveIssueTypeOption3'),
    t('dashboard.employee.modal.resolveIssueTypeOption4'),
    t('dashboard.employee.modal.resolveIssueTypeOption5'),
  ];

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutsideDropdown = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setState(prev => ({ ...prev, isDropdownOpen: false }));
      }
    };
    document.addEventListener("mousedown", handleClickOutsideDropdown);
    return () => document.removeEventListener("mousedown", handleClickOutsideDropdown);
  }, []);

  // Close modal when clicking outside
  useEffect(() => {
    const handleClickOutsideModal = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        handleClose();
      }
    };
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutsideModal);
    }
    return () => document.removeEventListener("mousedown", handleClickOutsideModal);
  }, [isOpen]);

  if (!isOpen) return null;

  const handleClose = () => {
    setState(initialState);
    setErrors({});
    onClose();
  };

  const handleSubmit = () => {
    const newErrors = {};
    if (!state.customer.trim()) newErrors.customer = "Customer ID is required!";
    if (!state.transactionId.trim()) newErrors.transactionId = "Transaction ID is required!";

    setErrors(newErrors);

    // Focus the first invalid field
    if (newErrors.customer) customerRef.current.focus();
    else if (newErrors.transactionId) transactionIdRef.current.focus();

    if (Object.keys(newErrors).length > 0) return;

    toast.success("Issue resolved successfully!");
    console.log({
      customer: state.customer,
      issueType: state.issueType,
      transactionId: state.transactionId,
      notes: state.notes
    });

    setTimeout(() => handleClose(), 3800);
  };

  return (
    <>
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-2 sm:p-5 z-50">
        <div ref={modalRef} className="bg-white rounded-lg w-full max-w-2xl shadow-2xl">
          {/* Header */}
          <div className="flex justify-between items-center p-4 sm:p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-800">{t('dashboard.employee.modal.resolveTitle')}</h2>
            <button onClick={handleClose} className="text-gray-400 hover:text-gray-600 text-2xl leading-none">
              <IoMdClose />
            </button>
          </div>

          {/* Body */}
          <div className="p-4 sm:p-6">
            {/* Customer */}
            <div className="mb-4">
              <label className="block text-base font-medium text-[#002244] mb-1">
                {t('dashboard.employee.modal.customerLabel')}
              </label>
              <input
                type="text"
                placeholder={t('dashboard.employee.modal.resolveCustomerPlaceholder')}
                value={state.customer}
                ref={customerRef}
                onChange={(e) => setState(prev => ({ ...prev, customer: e.target.value }))}
                className={`w-full px-3 py-2 border rounded focus:outline-none focus:border-black/70 text-sm ${
                  errors.customer ? 'border-red-500' : 'border-[#002244]'
                }`}
              />
              {errors.customer && <p className="text-red-500 text-sm mt-1">{errors.customer}</p>}
            </div>

            {/* Issue Type Dropdown */}
            <div className="mb-4 relative" ref={dropdownRef}>
              <label className="block text-base font-medium text-[#002244] mb-1">
                {t('dashboard.employee.modal.resolveIssueTypeLabel')}
              </label>
              <button
                ref={issueTypeRef}
                onClick={() => setState(prev => ({ ...prev, isDropdownOpen: !prev.isDropdownOpen }))}
                className={`w-full px-3 py-2 border rounded text-left text-base text-[#002244] bg-white hover:border-gray-400 flex justify-between items-center ${
                  errors.issueType ? 'border-red-500' : 'border-[#002244]'
                }`}
              >
                {state.issueType}
                {state.isDropdownOpen ? <BiChevronUp className="text-xl text-[#002244]" /> : <BiChevronDown className="text-xl text-[#002244]" />}
              </button>
              {state.isDropdownOpen && (
                <div className="absolute top-full left-0 right-0 bg-white border border-[#002244] rounded mt-1 shadow-lg z-10 overflow-hidden">
                  {issueTypes.map((type, index) => (
                    <div
                      key={index}
                      onClick={() => setState(prev => ({ ...prev, issueType: type, isDropdownOpen: false }))}
                      className={`px-3 py-2 cursor-pointer text-base flex justify-between items-center transition-colors ${
                        state.issueType === type ? 'bg-green-500 text-white' : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      {type} {state.issueType === type && <span className="text-white">✓</span>}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Transaction ID */}
            <div className="mb-4">
              <label className="block text-base font-medium text-[#002244] mb-1">
                {t('dashboard.employee.modal.resolveTransactionIdLabel')}
              </label>
              <input
                type="text"
                placeholder={t('dashboard.employee.modal.resolveTransactionIdPlaceholder')}
                value={state.transactionId}
                ref={transactionIdRef}
                onChange={(e) => setState(prev => ({ ...prev, transactionId: e.target.value }))}
                className={`w-full px-3 py-2 border rounded focus:outline-none focus:border-black/70text-base ${
                  errors.transactionId ? 'border-red-500' : 'border-[#002244]'
                }`}
              />
              {errors.transactionId && <p className="text-red-500 text-sm mt-1">{errors.transactionId}</p>}
            </div>

            {/* Notes */}
            <div className="mb-4">
              <label className="block text-base font-medium text-[#002244] mb-1">
                {t('dashboard.employee.modal.notesLabel')}
              </label>
              <textarea
                placeholder={t('dashboard.employee.modal.resolveNotesPlaceholder')}
                value={state.notes}
                ref={notesRef}
                onChange={(e) => setState(prev => ({ ...prev, notes: e.target.value }))}
                className="w-full px-3 py-2 border border-[#002244] rounded focus:outline-none focus:border-black/70 text-base resize-none h-24"
              />
            </div>

            {/* Submit */}
            <button
              onClick={handleSubmit}
              className="w-full bg-green-500 hover:bg-green-600 text-white font-medium py-3 rounded text-base transition-colors"
            >
              {t('dashboard.employee.modal.resolveButton')}
            </button>
          </div>
        </div>
      </div>

      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
};

export default ResolveBillingModal;
