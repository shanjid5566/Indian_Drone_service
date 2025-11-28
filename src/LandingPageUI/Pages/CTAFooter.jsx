// import { MapPin, Phone, Mail } from 'lucide-react';
// import logo from '../../../public/assets/images/logo1.png';

// export default function CTAFooter() {
//   return (
//     <div>
//       {/* CTA Section */}
//       <div className="bg-gray-50 py-16 px-4 sm:px-6 md:px-8 lg:px-10">
//         <div className="lg:w-10/12 mx-auto max-w-7xl">
//           <div className="bg-green-900 relative -mb-42 z-40 rounded-2xl p-8 md:p-12 text-center shadow-lg">
//             <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-6">
//               Let's book a drone!
//             </h2>
//             <p className="text-white text-sm md:text-lg max-w-4xl mx-auto mb-8 leading-relaxed">
//               Get cutting-edge drone services tailored for your needs — from agriculture and construction to energy, safety, and
//               more. Our certified pilots and advanced technology ensure accuracy, efficiency, and safety every time. Book today and
//               experience the future of aerial solutions.
//             </p>
//             <button className="btn btn-sm md:btn-md lg:btn-lg bg-btn-primary  text-white border-transparent text-xs lg:text-[16px] font-semibold px-8 py-3 rounded-md transition-colors shadow-md">
//               Book a Service
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Footer */}
//       <footer className="bg-[#002201] -z-0 text-white px-4 sm:px-6 md:px-8 lg:px-10 pt-40 py-12">
//         <div className="lg:w-10/12 mx-auto max-w-7xl">
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
//             {/* Brand Column */}
//             <div>
//               <div className="flex items-center mb-4">
                
//                     <img src={logo} alt="" />
                
//                 <span className="font-bold text-lg">Demo Logo</span>
//               </div>
//               <p className="text-gray-300 text-sm mb-6 leading-relaxed">
//                 Professional drone services for agriculture, construction, energy, and more. Trusted by enterprises across India.
//               </p>
//               <div className="flex gap-4">
//                 <a href="#" className="text-white hover:text-green-400 transition-colors">
//                   <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
//                     <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
//                   </svg>
//                 </a>
//                 <a href="#" className="text-white hover:text-green-400 transition-colors">
//                   <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
//                     <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
//                   </svg>
//                 </a>
//                 <a href="#" className="text-white hover:text-green-400 transition-colors">
//                   <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
//                     <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
//                   </svg>
//                 </a>
//                 <a href="#" className="text-white hover:text-green-400 transition-colors">
//                   <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
//                     <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
//                   </svg>
//                 </a>
//               </div>
//             </div>

//             {/* Service Column */}
//             <div>
//               <h3 className="font-semibold text-lg mb-4">Service</h3>
//               <ul className="space-y-3 text-gray-300 text-sm">
//                 <li><a href="#" className="hover:text-white transition-colors">Agriculture & Farming</a></li>
//                 <li><a href="#" className="hover:text-white transition-colors">Construction</a></li>
//                 <li><a href="#" className="hover:text-white transition-colors">Energy & Utilities</a></li>
//                 <li><a href="#" className="hover:text-white transition-colors">Public Safety</a></li>
//               </ul>
//             </div>

//             {/* Company Column */}
//             <div>
//               <h3 className="font-semibold text-lg mb-4">Company</h3>
//               <ul className="space-y-3 text-gray-300 text-sm">
//                 <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
//                 <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
//               </ul>
//             </div>

//             {/* Contact Column */}
//             <div>
//               <h3 className="font-semibold text-lg mb-4">Contact</h3>
//               <ul className="space-y-4 text-gray-300 text-sm">
//                 <li className="flex items-start gap-3">
//                   <MapPin className="w-5 h-5 flex-shrink-0 mt-0.5" />
//                   <span>Hyderabad, Telangana, India</span>
//                 </li>
//                 <li className="flex items-center gap-3">
//                   <Phone className="w-5 h-5 flex-shrink-0" />
//                   <span>+91 1800 123 4567</span>
//                 </li>
//                 <li className="flex items-center gap-3">
//                   <Mail className="w-5 h-5 flex-shrink-0" />
//                   <span>info@hindustandardrone.com</span>
//                 </li>
//               </ul>
//             </div>
//           </div>

//           {/* Copyright */}
          
//         </div>
        
//       </footer>
//       <footer className=" py-3 bg-black text-center text-gray-400 text-sm">
//             © 2025 Hindustan Drone Services. All rights reserved.
//           </footer>
//     </div>
//   );
// }