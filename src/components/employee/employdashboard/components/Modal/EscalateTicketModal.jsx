// import { useEffect, useRef, useState } from "react";
// import { ChevronDown } from "lucide-react";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// const escalationLevels = ["High", "Medium", "Low"];
// const escalationReasons = [
//   "Customer Unhappy",
//   "Delayed Response",
//   "Technical Escalation",
//   "Other",
// ];


// const Dropdown = ({ label, options, selected, setSelected }) => {
//     const [open, setOpen] = useState(false);
//   const dropdownRef = useRef(null);

//   // Close dropdown on outside click
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//         setOpen(false);
//       }
//     };

//     document.addEventListener("mousedown", handleClickOutside);
//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, []);

//   return (
//      <div ref={dropdownRef} className="relative w-full">
//       <label className="text-sm font-medium text-gray-700 block mb-1">
//         {label}
//       </label>
//       <button
//         type="button"
//         onClick={() => setOpen(!open)}
//         className={`w-full flex justify-between items-center border border-gray-300 rounded-md px-3 py-2 text-sm bg-white 
//         transition-all duration-200 focus:ring-2 focus:ring-green-500 focus:outline-none hover:border-green-400`}
//       >
//         <span className={`${selected ? "text-gray-800" : "text-gray-400"}`}>
//           {selected || `Select ${label}`}
//         </span>
//         <ChevronDown
//           size={18}
//           className={`text-gray-500 transform transition-transform duration-200 ${
//             open ? "rotate-180" : "rotate-0"
//           }`}
//         />
//       </button>

//       {/* Dropdown Menu */}
//       <div
//         className={`absolute left-0 right-0 mt-2 bg-white shadow-lg rounded-md overflow-hidden z-50 border border-gray-200 transform transition-all duration-200 origin-top ${
//           open ? "scale-100 opacity-100" : "scale-95 opacity-0 pointer-events-none"
//         }`}
//       >
//         {options.map((option) => (
//           <div
//             key={option}
//             onClick={() => {
//               setSelected(option);
//               setOpen(false);
//             }}
//             className={`px-3 py-2 cursor-pointer text-sm hover:bg-green-100 transition ${
//               selected === option ? "bg-green-50 font-medium" : ""
//             }`}
//           >
//             {option}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// const EscalateTicketModal = ({ isOpen, onClose }) => {
//   const [selectedLevel, setSelectedLevel] = useState("");
//   const [selectedReason, setSelectedReason] = useState("");
//   const [assignedTo, setAssignedTo] = useState("");
//   const [comments, setComments] = useState("");
//   const [ticketId, setTicketId] = useState("");

//   if (!isOpen) return null;
  

//   const handleSubmit = (e) => {
//     e.preventDefault(); // Prevent page reload

//     // Validation
//     if (!ticketId || !selectedLevel || !selectedReason || !assignedTo) {
//       toast.error("Please fill all required fields!");
//       return;
//     }

//     // Show success toast
//     toast.success("Ticket escalated successfully!");

//     // Close modal after short delay
//     setTimeout(() => {
//       onClose();
//       // Clear form
//       setTicketId("");
//       setSelectedLevel("");
//       setSelectedReason("");
//       setAssignedTo("");
//       setComments("");
//     }, 1000);
//   };

//   return (
//     <>
//       <ToastContainer position="top-center" />
//       <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 px-2">
//         <div className="bg-white rounded-lg shadow-lg w-full max-w-xl p-4 mx-2">
//           {/* Header */}
//           <div className="flex justify-between items-center px-4 py-3 border-b border-gray-200">
//             <h2 className="text-xl font-semibold">Escalate Ticket</h2>
//             <button
//               onClick={onClose}
//               className="text-gray-500 text-xl hover:text-gray-800"
//             >
//               ✕
//             </button>
//           </div>

//           {/* Form */}
//           <form onSubmit={handleSubmit} className="px-4 pt-4 pb-4 space-y-3">
//             {/* Ticket ID */}
//             <div className="flex flex-col space-y-1">
//               <label className="text-base font-medium text-gray-700">
//                 Ticket ID <span className="text-red-500">*</span>
//               </label>
//               <input
//                 type="text"
//                 placeholder="Enter Ticket ID"
//                 value={ticketId}
//                 onChange={(e) => setTicketId(e.target.value)}
//                 className="w-full border border-gray-300 rounded-md px-3 py-2 text-base outline-none focus:ring-2 focus:ring-green-500 focus:border-green-400"
//               />
//             </div>

//             {/* Escalation Level */}
//             <Dropdown
//               label="Escalation Level"
//               options={escalationLevels}
//               selected={selectedLevel}
//               setSelected={setSelectedLevel}
//             />

//             {/* Escalation Reason */}
//             <Dropdown
//               label="Escalation Reason"
//               options={escalationReasons}
//               selected={selectedReason}
//               setSelected={setSelectedReason}
//             />

//             {/* Assign To */}
//             <div className="flex flex-col space-y-1">
//               <label className="text-base font-medium text-gray-700">
//                 Assign To <span className="text-red-500">*</span>
//               </label>
//               <input
//                 type="text"
//                 placeholder="Enter the name or team to assign"
//                 value={assignedTo}
//                 onChange={(e) => setAssignedTo(e.target.value)}
//                 className="w-full border border-gray-300 rounded-md px-3 py-2 text-base outline-none focus:ring-2 focus:ring-green-500 focus:border-green-400"
//               />
//             </div>

//             {/* Comments */}
//             <div className="flex flex-col space-y-1">
//               <label className="text-base font-medium text-gray-700">
//                 Additional Comments
//               </label>
//               <textarea
//                 placeholder="Add any additional details..."
//                 rows="4"
//                 value={comments}
//                 onChange={(e) => setComments(e.target.value)}
//                 className="w-full border border-gray-300 rounded-md px-3 py-2 text-base outline-none resize-none focus:ring-2 focus:ring-green-500 focus:border-green-400"
//               ></textarea>
//             </div>

//             {/* Submit Button */}
//             <button
//               type="submit"
//               className="w-full bg-green-600 hover:bg-green-700 text-white font-medium rounded-md py-2 transition"
//             >
//               Escalate Ticket
//             </button>
//           </form>
//         </div>
//       </div>
//     </>
//   );
// };

// export default EscalateTicketModal;






import { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useTranslation } from "react-i18next";



// Dropdown Component
const Dropdown = ({ label, options, selected, setSelected }) => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div ref={dropdownRef} className="relative w-full">
      <label className="text-sm font-medium text-gray-700 block mb-1">
        {label}
      </label>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className={`w-full flex justify-between items-center border border-gray-300 rounded-md px-3 py-2 text-sm bg-white 
        transition-all duration-200 focus:ring-2 focus:ring-green-500 focus:outline-none hover:border-green-400`}
      >
        <span className={`${selected ? "text-gray-800" : "text-gray-400"}`}>
          {selected || `${label}`}
        </span>
        <ChevronDown
          size={18}
          className={`text-gray-500 transform transition-transform duration-200 ${
            open ? "rotate-180" : "rotate-0"
          }`}
        />
      </button>

      {/* Dropdown Menu */}
      <div
        className={`absolute left-0 right-0 mt-2 bg-white shadow-lg rounded-md overflow-hidden z-50 border border-gray-200 transform transition-all duration-200 origin-top ${
          open ? "scale-100 opacity-100" : "scale-95 opacity-0 pointer-events-none"
        }`}
      >
        {options.map((option) => (
          <div
            key={option}
            onClick={() => {
              setSelected(option);
              setOpen(false);
            }}
            className={`px-3 py-2 cursor-pointer text-sm hover:bg-green-100 transition ${
              selected === option ? "bg-green-50 font-medium" : ""
            }`}
          >
            {option}
          </div>
        ))}
      </div>
    </div>
  );
};

// Modal Component
const EscalateTicketModal = ({ isOpen, onClose }) => {
  const [selectedLevel, setSelectedLevel] = useState("");
  const [selectedReason, setSelectedReason] = useState("");
  const [assignedTo, setAssignedTo] = useState("");
  const [comments, setComments] = useState("");
  const [ticketId, setTicketId] = useState("");
   const { t } = useTranslation();

  const modalRef = useRef(null);

// Options for dropdowns
const escalationLevels = [t('dashboard.employee.modal.high'), t('dashboard.employee.modal.medium'), t('dashboard.employee.modal.low'),
  t('dashboard.employee.modal.critical')
];
const escalationReasons = [
  t('dashboard.employee.modal.technicalComplexity'),
  t('dashboard.employee.modal.systemAppIssue'),
  t('dashboard.employee.modal.securityConcern'),
  

];


  // Close modal when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!ticketId || !selectedLevel || !selectedReason || !assignedTo) {
      toast.error("Please fill all required fields!");
      return;
    }

    toast.success("Ticket escalated successfully!");

    setTimeout(() => {
      onClose();
      // Clear form
      setTicketId("");
      setSelectedLevel("");
      setSelectedReason("");
      setAssignedTo("");
      setComments("");
    }, 1000);
  };

  return (
    <>
      <ToastContainer position="top-center" />
      <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 px-2">
        <div
          ref={modalRef}
          className="bg-white rounded-lg shadow-lg w-full max-w-xl p-4 mx-2"
        >
          {/* Header */}
          <div className="flex justify-between items-center px-4 py-3 border-b border-gray-200">
            <h2 className="text-xl font-semibold">{t("dashboard.employee.modal.escalateTicket")}</h2>
            <button
              onClick={onClose}
              className="text-gray-500 text-xl hover:text-gray-800"
            >
              ✕
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="px-4 pt-4 pb-4 space-y-3">
            {/* Ticket ID */}
            <div className="flex flex-col space-y-1">
              <label className="text-base font-medium text-gray-700">
                {t("dashboard.employee.modal.ticketId")} <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder={t("dashboard.employee.modal.enterTicketId")}
                value={ticketId}
                onChange={(e) => setTicketId(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-base outline-none focus:ring-2 focus:ring-green-500 focus:border-green-400"
              />
            </div>

            {/* Escalation Level */}
            <Dropdown
              label={t("dashboard.employee.modal.escalationLevel")}
              options={escalationLevels}
              selected={selectedLevel}
              setSelected={setSelectedLevel}
            />

            {/* Escalation Reason */}
            <Dropdown
              label={t("dashboard.employee.modal.escalationReason")}
              options={escalationReasons}
              selected={selectedReason}
              setSelected={setSelectedReason}
            />

            {/* Assign To */}
            <div className="flex flex-col space-y-1">
              <label className="text-base font-medium text-gray-700">
                {t("dashboard.employee.modal.assignTo")} <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder={t("dashboard.employee.modal.enterNameOrTeam")}
                value={assignedTo}
                onChange={(e) => setAssignedTo(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-base outline-none focus:ring-2 focus:ring-green-500 focus:border-green-400"
              />
            </div>
            <div className="flex flex-col space-y-1">
              <label className="text-base font-medium text-gray-700">
                {t("dashboard.employee.modal.stepsAlreadyTaken")}
              </label>
              <textarea
                placeholder="Provide detailed information about the technical issue for the development team..."
                rows="4"
                value={comments}
                onChange={(e) => setComments(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-base outline-none resize-none focus:ring-2 focus:ring-green-500 focus:border-green-400"
              ></textarea>
            </div>
            {/* Comments */}
            <div className="flex flex-col space-y-1">
              <label className="text-base font-medium text-gray-700">
                {t("dashboard.employee.modal.detailedDescription")}
              </label>
              <textarea
                placeholder="List troubleshooting steps already attempted..."
                rows="4"
                value={comments}
                onChange={(e) => setComments(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-base outline-none resize-none focus:ring-2 focus:ring-green-500 focus:border-green-400"
              ></textarea>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-green-600 hover:bg-green-700 text-white font-medium rounded-md py-2 transition"
            >
              {t("dashboard.employee.modal.escalateTicket")}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default EscalateTicketModal;
