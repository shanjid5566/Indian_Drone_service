// import React from 'react';
// import PropTypes from 'prop-types';
// import { Header } from './Header';
// // import { useAuth } from '../../hooks/useAuth';
// import UserNav from './UserNav';
// import Footer from './Footer';
// import { useLocation } from 'react-router';
// import { Outlet } from 'react-router-dom';

// export const Layout = () => {
//   // const {user} = useAuth()
//   const location = useLocation();

//   return (
//     <div className='flex flex-col min-h-screen bg-gray-50 w-full'>
//       {location.pathname == '/admin' && location.pathname == '/marketing' && location.pathname == '/employee' && location.pathname == '/field-agent'? <Header/>:<UserNav/>}
//       <main className='flex-grow w-full flex flex-col'>
//         <Outlet/>
//       </main>
//       {/* {user? "":<Footer/>} */}
//       { location.pathname !== '/login' ?<Footer/> : null}
//     </div>
//   );
// };

import React from 'react';
import { Header } from './Header';
import UserNav from './UserNav';
import Footer from './Footer';
import { useLocation } from 'react-router';
import { Outlet } from 'react-router-dom';
import ScrollToTop from '../utility/ScrollToTop';

export const Layout = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  // Paths where footer will not show
  const noFooterPaths = ['/login', '/forget-password', '/signup'];

  // Paths where header will show instead of UserNav
  const adminPaths = ['/admin', '/marketing', '/employee', '/field-agent'];

  const isAdminPath = adminPaths.some((path) => currentPath.startsWith(path));
  const hideFooter = noFooterPaths.some((path) => currentPath.startsWith(path));

  return (
    <div className='flex flex-col min-h-screen bg-gray-50 w-full'>
      <ScrollToTop/>
      {isAdminPath ? <Header /> : <UserNav />}
      
      <main className='flex-grow w-full flex flex-col'>
        <Outlet />
      </main>

      {!hideFooter && <Footer />}
    </div>
  );
};
