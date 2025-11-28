import { Link } from 'react-router-dom';

import LanguageSwitcher from './LanguageSwitcher';
import { HiFire } from 'react-icons/hi';
import { APP_NAME, ROUTES } from '../../constants/app';
// import logo from '/assets/images/logo.png';
import { FiBell } from 'react-icons/fi';
import { FiSettings } from 'react-icons/fi';
import { useAuth } from '../../hooks/useAuth';
import { useTranslation } from 'react-i18next';
import ProfileDropDown from './ProfileDropDown';

export const Header = () => {
  const { t } = useTranslation();
  const { user } = useAuth();

  return (
    <header className='bg-white shadow-sm sticky top-0 z-30'>
      <nav
        className={`${
          user?.role === 'field_agent' ? 'max-w-7xl w-11/12' : 'w-[95%]'
        } mx-auto h-20 flex justify-between items-center`}
      >
        <Link to={'/'} className='flex items-center space-x-2'>
          <span
            className={`text-xs ${
              user?.role === 'field_agent' ? '' : 'ml-16 sm:ml-14 lg:ml-0'
            }  w-28 sm:w-30 lg:w-32 font-bold text-gray-800`}
          >
            <img src={'/assets/images/logo.png'} alt='logo' />
          </span>
        </Link>
        <div className='flex items-center space-x-2 sm:space-x-5'>
          {/* Language switcher */}
          <LanguageSwitcher />

          {/* {user &&
            (['admin', 'marketing', 'employee'].includes(user?.role) ? (
              <Link className='text-gray-800 text-xl lg:flex hidden'>
                <FiBell />
              </Link>
            ) : null)} */}

          {user?.role === 'admin' ? (
            <Link
              to='/admin/settings'
              className='text-gray-800 text-xl lg:flex hidden'
            >
              <FiSettings />
            </Link>
          ) : null}

          {user ? (
            <ProfileDropDown />
          ) : (
            <button className=' btn btn-md border-none bg-green-500 text-white'>
              {t('navigation.login')}
            </button>
          )}
        </div>
      </nav>
    </header>
  );
};
