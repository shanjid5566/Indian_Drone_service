// // import logo from "../../images/logo.png";
// // import logo1 from "../../images/logo1.png";
// // import { Link, NavLink } from "react-router-dom";
// // import { FaBars } from "react-icons/fa";
// // import Dashboards from './../../Pages/Dashboards';
// // const Nav = () => {
// //   const links = (
// //     <>
// //       <li>
// //         {" "}
// //         <NavLink to={"/"}>Home</NavLink>{" "}
// //       </li>
// //       <li>
// //         {" "}
// //         <NavLink to={"/about"}>About us</NavLink>{" "}
// //       </li>
// //       <li>
// //         {" "}
// //         <NavLink to={"/services"}>Services</NavLink>{" "}
// //       </li>
// //       <li>
// //         {" "}
// //         <NavLink to={"/blog"}>Blog & Research</NavLink>{" "}
// //       </li>
// //     </>
// //   );
// //   return (
// //     <div className="relative z-50 bg-gradient-to-r from-[#06422c]/10 via-[#013522cd]/35 to-[#035a3ab8]/35">
// //       <div className="navbar z-10 w-11/12 mx-auto 2xl:max-w-9/12">
// //         <div className="navbar-start">
// //           <div className="dropdown mr-0 lg:hidden">
// //             <div className="drawer">
// //               <input id="my-drawer" type="checkbox" className="drawer-toggle" />
// //               <div className="drawer-content ">
// //                 {/* Page content here */}
// //                 <label htmlFor="my-drawer" className="">
// //                   <FaBars />
// //                 </label>
// //               </div>
// //               <div className="drawer-side ">
// //                 <label
// //                   htmlFor="my-drawer"
// //                   aria-label="close sidebar"
// //                   className="drawer-overlay "
// //                 ></label>
// //                 <ul className="menu bg-gradient-to-r from-[#06422c] via-[#013522] to-[#035a3aee]  text-white min-h-full  w-80 p-4">
// //                     <div className="flex items-center gap-2 mb-6 border-b border-white pb-4">
// //                         <img src={logo1} className="w-10 h-auto" alt="" />
// //                         <h1 className="text-xl font-semibold">PajeetLand</h1>
// //                     </div>
// //                   {/* Sidebar content here */}
// //                   {links}
// //                 </ul>
// //               </div>
// //             </div>
// //           </div>
// //           <a className="btn btn-ghost mx-0 text-xl">
// //             <img src={logo} alt="logo" />
// //           </a>
// //         </div>
// //         <div className="navbar-center hidden lg:flex">
// //           <ul className="menu menu-horizontal [&_a]:rounded-none px-1">{links}</ul>
// //         </div>
// //         <div className="navbar-end">
          
// //           <a className="btn btn-xs shadow-none md:btn-sm bg-btn-primary border-transparent px-6 text-white">
// //             Download App
// //           </a>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default Nav;
// import logo from "../../images/logo.png";
// import { useState } from 'react';
// import { Menu, X, ChevronDown } from 'lucide-react';
// import { NavLink } from "react-router-dom";

// export default function Nav() {
//   const [isOpen, setIsOpen] = useState(false);
//   const [isLangOpen, setIsLangOpen] = useState(false);

//   const navLinks = [
//     { name: 'Home', href: '/' },
//     { name: 'About Us', href: '/about' },
//     { name: 'Services', href: '/services' },
//     { name: 'Blog & Research', href: '/blog' },
//     { name: 'Contact', href: '/contact' }
//   ];

//   return (
//     <nav className="bg-white shadow-sm">
//       <div className="w-11/12 mx-auto 2xl:max-w-9/12 px-4 sm:px-6 lg:px-8">
//         <div className="flex justify-between items-center h-16">
//           {/* Logo */}
//           <div className="flex items-center">
//             <div className="flex items-center space-x-2">
//               <img src={logo} alt="" />
//             </div>
//           </div>

//           {/* Desktop Navigation */}
//           <div className="hidden lg:flex items-center space-x-8">
//             {navLinks.map((link) => (
//               <NavLink
//                 key={link.name}
//                 to={link.href}
//                 className="text-gray-700 hover:text-green-500 transition-colors duration-200 text-sm font-medium"
//               >
//                 {link.name}
//               </NavLink>
//             ))}
//           </div>

//           {/* Right Side Actions */}
//           <div className="hidden lg:flex items-center space-x-4">
//             {/* Language Selector */}
//             <div className="relative">
//               <button
//                 onClick={() => setIsLangOpen(!isLangOpen)}
//                 className="flex items-center space-x-1 text-gray-700 border-none hover:text-green-500 transition-colors duration-200"
//               >
//                 <span className="text-sm font-medium">EN</span>
//                 <ChevronDown className="w-4 h-4" />
//               </button>
              
//               {isLangOpen && (
//                 <div className="absolute right-0 mt-2 w-32 bg-white rounded-md shadow-lg py-1 z-10 border border-gray-200">
//                   <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-green-50 hover:text-green-500">English</a>
//                   <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-green-50 hover:text-green-500">Hindi</a>
//                 </div>
//               )}
//             </div>

//             {/* Download Button */}
//             <button className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-md text-sm font-medium transition-colors duration-200">
//               Download App
//             </button>
//           </div>

//           {/* Mobile Menu Button */}
//           <div className="lg:hidden">
//             <button
//               onClick={() => setIsOpen(!isOpen)}
//               className="text-gray-700 hover:text-green-500 transition-colors duration-200"
//             >
//               {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Mobile Menu */}
//       {isOpen && (
//         <div className="lg:hidden absolute z-50 w-full bg-white border-t border-gray-200">
//           <div className="px-4 w-11/12 mx-auto pt-2 pb-4 space-y-3">
//             {navLinks.map((link) => (
//               <a
//                 key={link.name}
//                 href={link.href}
//                 className="block text-gray-700 hover:text-green-500 transition-colors duration-200 text-base font-medium py-2"
//               >
//                 {link.name}
//               </a>
//             ))}
            
//             <div className="pt-4 border-t border-gray-200 space-y-3">
//               {/* Language Selector Mobile */}
//               <button
//                 onClick={() => setIsLangOpen(!isLangOpen)}
//                 className="flex items-center justify-between w-full text-gray-700 hover:text-green-500 transition-colors duration-200 py-2"
//               >
//                 <span className="text-base font-medium">Language: EN</span>
//                 <ChevronDown className="w-4 h-4" />
//               </button>
              
//               {isLangOpen && (
//                 <div className="pl-4 space-y-2">
//                   <a href="#" className="block text-sm text-gray-600 hover:text-green-500 py-1">English</a>
//                   <a href="#" className="block text-sm text-gray-600 hover:text-green-500 py-1">Hindi</a>
//                 </div>
//               )}

//               {/* Download App Button Mobile */}
//               <button className="w-full bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-md text-base font-medium transition-colors duration-200">
//                 Download App
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </nav>
//   );
// }
