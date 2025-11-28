// import React, { useState, useRef, useEffect } from "react";
// import { CiClock1 } from "react-icons/ci";
// // import map from "../../LandingPageUI/images/Map.svg";
// import { FaCircle } from "react-icons/fa";
// import { IoLocationOutline } from "react-icons/io5";
// import { MapPin, Users, ChevronDown } from "lucide-react";
// import MapChart from "./MapChart";


// // LeadsDropdown Component
// const LeadsDropdown = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [selected, setSelected] = useState("all");
//   const dropdownRef = useRef(null);

//   const options = [
//     { value: "all", label: "All lead" },
//     { value: "hot", label: "Hot" },
//     { value: "warm", label: "Warm" },
//     { value: "cool", label: "Cool" },
//   ];

//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//         setIsOpen(false);
//       }
//     };

//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   const handleSelect = (value) => {
//     setSelected(value);
//     setIsOpen(false);
//   };

//   const getSelectedLabel = () => {
//     return options.find((opt) => opt.value === selected)?.label || "All lead";
//   };

//   return (
//     <div className="relative inline-block" ref={dropdownRef}>
//       <button
//         onClick={() => setIsOpen(!isOpen)}
//         className="lg:px-4 lg:py-2 px-3 py-1.5 border pr-8 border-gray-300 rounded-lg text-sm lg:text-lg text-black bg-white leading-tight flex items-center justify-between hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-500 transition-colors min-w-[120px]"
//       >
//         <span>{getSelectedLabel()}</span>
//         <ChevronDown
//           className={`w-4 h-4 ml-2 transition-transform duration-200 ${
//             isOpen ? "rotate-180" : ""
//           }`}
//         />
//       </button>

//       {isOpen && (
//         <div className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden">
//           {options.map((option) => (
//             <button
//               key={option.value}
//               onClick={() => handleSelect(option.value)}
//               className={`w-full px-4 py-2.5 text-left text-sm lg:text-lg transition-colors ${
//                 selected === option.value
//                   ? "bg-lime-300 text-gray-900"
//                   : "text-gray-700 hover:bg-lime-100"
//               }`}
//             >
//               {option.label}
//             </button>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// // Main Leads Component
// const Leads = () => {
//   const [currentPage, setCurrentPage] = useState(1);
//   const itemsPerPage = 4;

//   const allLeads = [
//     {
//       id: 1,
//       company: "Agritech Solutions",
//       email: "John@agritech.com",
//       phone: "(225) 555-0118",
//       source: "Email campaign",
//       location: "Gujrat, India",
//       score: 95,
//       status: "Hot",
//     },
//     {
//       id: 2,
//       company: "Agritech Solutions",
//       email: "John@agritech.com",
//       phone: "(225) 555-0118",
//       source: "Email campaign",
//       location: "Gujrat, India",
//       score: 75,
//       status: "Warm",
//     },
//     {
//       id: 3,
//       company: "Agritech Solutions",
//       email: "John@agritech.com",
//       phone: "(225) 555-0118",
//       source: "Email campaign",
//       location: "Gujrat, India",
//       score: 65,
//       status: "Cool",
//     },
//     {
//       id: 4,
//       company: "Agritech Solutions",
//       email: "John@agritech.com",
//       phone: "(225) 555-0118",
//       source: "Email campaign",
//       location: "Gujrat, India",
//       score: 85,
//       status: "Hot",
//     },
//     {
//       id: 5,
//       company: "Tech Innovations",
//       email: "Sarah@techinno.com",
//       phone: "(225) 555-0119",
//       source: "Social Media",
//       location: "Mumbai, India",
//       score: 88,
//       status: "Hot",
//     },
//     {
//       id: 6,
//       company: "Green Energy Co",
//       email: "Mike@greenenergy.com",
//       phone: "(225) 555-0120",
//       source: "Referral",
//       location: "Delhi, India",
//       score: 72,
//       status: "Warm",
//     },
//   ];

//   const totalPages = Math.ceil(allLeads.length / itemsPerPage);
//   const startIndex = (currentPage - 1) * itemsPerPage;
//   const endIndex = startIndex + itemsPerPage;
//   const leads = allLeads.slice(startIndex, endIndex);

//   const getStatusColor = (status) => {
//     switch (status) {
//       case "Hot":
//         return "text-red-500 bg-red-50";
//       case "Warm":
//         return "text-yellow-500 bg-yellow-50";
//       case "Cool":
//         return "text-green-500 bg-green-50";
//       default:
//         return "text-gray-500 bg-gray-50";
//     }
//   };

//   const getScoreColor = (score) => {
//     if (score >= 90) return "text-red-600";
//     if (score >= 70) return "text-yellow-600";
//     return "text-green-600";
//   };

  

//   return (
//     <div className="">
//       <div className="bg-white  rounded-xl shadow border border-gray-100">
//         <div className="p-4 border-b border-gray-100">
//           <div className="flex flex-col lg:flex-row items-center justify-between mb-2">
//             <div>
//               <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">
//                 Lead Management
//               </h2>
//               <p className="text-sm lg:text-[16px] text-gray-600">
//                 Track and nurture your marketing leads
//               </p>
//             </div>
//             <div className="flex flex-wrap py-3 items-center lg:flex-row gap-3">
//               {/* leadsDropdown */}
//               <LeadsDropdown />
//               {/* leadsDropDown ends here */}
//               <button className="lg:btn-md xl:btn-lg btn-xs btn bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg font-medium shadow-none border-none ">
//                 Export Leads
//               </button>
//               <button className="btn lg:btn-md xl:btn-lg btn-xs bg-yellow-400  text-gray-900 px-6 py-2 rounded-lg font-medium border-transparent shadow-none">
//                 Automation
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* Table */}
//         <div className="overflow-x-auto">
//           <table className="w-full lg:table-fixed">
//             <thead className="sticky top-0 bg-gray-100 z-10">
//               <tr className="text-left">
//                 <th className="px-6 py-4 w-1/5 text-sm font-medium text-gray-700">
//                   Lead
//                 </th>
//                 <th className="px-6 py-4 w-1/5 text-sm font-medium text-gray-700">
//                   Contact
//                 </th>
//                 <th className="px-6 py-4 w-1/6 text-sm font-medium text-gray-700">
//                   Source
//                 </th>
//                 <th className="px-6 py-4 w-1/6 text-sm font-medium text-gray-700">
//                   Location
//                 </th>
//                 <th className="px-6 py-4 w-1/12 text-sm font-medium text-gray-700">
//                   Score
//                 </th>
//                 <th className="px-6 py-4 w-1/12 text-sm font-medium text-gray-700">
//                   Status
//                 </th>
//                 <th className="px-6 py-4 w-1/12 text-sm font-medium text-gray-700">
//                   Action
//                 </th>
//               </tr>
//             </thead>
//             <tbody>
//               {leads?.map((lead) => (
//                 <tr
//                   key={lead.id}
//                   className="border-b border-gray-200 hover:bg-gray-50 transition-colors"
//                 >
//                   <td className="px-6 py-4">
//                     <span className="px-4 py-6 text-[16px] text-gray-900 font-semibold">
//                       {lead.company}
//                     </span>
//                   </td>
//                   <td className="px-6 py-4">
//                     <div className="text-sm">
//                       <div className="text-gray-900 text-[16px]">
//                         {lead.email}
//                       </div>
//                       <div className="text-gray-500 text-[16px]">
//                         {lead.phone}
//                       </div>
//                     </div>
//                   </td>
//                   <td className="px-6 py-4">
//                     <span className="text-sm text-gray-900 text-[16px]">
//                       {lead.source}
//                     </span>
//                   </td>
//                   <td className="px-6 py-4">
//                     <span className="text-sm text-gray-900 text-[16px]">
//                       {lead.location}
//                     </span>
//                   </td>
//                   <td className="px-6 py-4">
//                     <span
//                       className={`text-sm font-semibold ${getScoreColor(
//                         lead.score
//                       )}`}
//                     >
//                       {lead.score}
//                     </span>
//                   </td>
//                   <td className="px-6 py-4">
//                     <span
//                       className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
//                         lead.status
//                       )}`}
//                     >
//                       {lead.status}
//                     </span>
//                   </td>
//                   <td className="px-6 py-4 ">
//                     <button className="w-8 lg:w-10 lg:h-10 h-8 rounded-full flex items-center justify-center  text-[#7bcd08] transition-colors">
//                       <CiClock1 />
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>

//         {/* Pagination */}
//         <div className="px-6 py-4 flex items-center justify-between border-t border-gray-100">
//           <p className="text-sm text-gray-600">
//             Showing {startIndex + 1} to {Math.min(endIndex, allLeads.length)} of{" "}
//             {allLeads.length} results
//           </p>
//           <div className="flex gap-2">
//             <button
//               onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
//               disabled={currentPage === 1}
//               className={`px-4 py-2 border border-gray-300 rounded-xl text-sm font-medium transition-colors ${
//                 currentPage === 1
//                   ? "text-gray-400 cursor-not-allowed"
//                   : "text-gray-700 hover:bg-gray-50"
//               }`}
//             >
//               Previous
//             </button>
//             <button
//               onClick={() =>
//                 setCurrentPage(Math.min(totalPages, currentPage + 1))
//               }
//               disabled={currentPage === totalPages}
//               className={`px-4 py-2 border border-gray-300 rounded-xl text-sm font-medium transition-colors ${
//                 currentPage === totalPages
//                   ? "text-gray-400 cursor-not-allowed"
//                   : "text-gray-700 hover:bg-gray-50"
//               }`}
//             >
//               Next
//             </button>
//           </div>
//         </div>
//       </div>

      
//     </div>
//   );
// };

// export default Leads;
