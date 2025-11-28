import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import LanguageSwitcher from "./LanguageSwitcher";
import { useTranslation } from "react-i18next";
import { MdMenu, MdOutlineDashboard } from "react-icons/md";
import ProfileDropDown from "./ProfileDropDown";
import { useAuth } from "../../hooks/useAuth";
import { RiLogoutBoxRLine } from "react-icons/ri";
import { BiX } from "react-icons/bi";

export default function Nav() {
  const [isOpen, setIsOpen] = useState(false);
  // const [isLangOpen, setIsLangOpen] = useState(false);
  const { t } = useTranslation();
  const { user, loading, logout } = useAuth();
  const navigate = useNavigate();
  const logOutHandler = async () => {
    await logout();

    navigate("/");
  };

  // const [testUser,setTestUser] = useState(false);
  // if(user.role == 'admin' || user.role == 'employee'){
  //   setTestUser(true)
  // }

  const navLinks = [
    { name: t("nav.home"), path: "/" },
    { name: t("nav.about"), path: "/about" },
    { name: t("nav.services"), path: "/services" },
    { name: t("nav.blog"), path: "/blog" },
    { name: t("nav.contact"), path: "/contact" },
  ];
  // hello
  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="lg:max-w-7xl mx-auto w-11/12  xl:h-20 flex items-center justify-center">
        <div className="flex justify-between items-center  w-full h-16">
          {/* Logo */}
          <Link to={"/"} className="flex items-center">
            <div className="flex items-center justify-items-start">
              <img src={"/assets/images/logo.png"} alt="navlogo" />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center xl:space-x-8 space-x-5">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                className="!text-gray-700 hover:text-green-500 transition-colors duration-200 text-sm xl:text-[16px] font-medium"
              >
                {link.name}
              </NavLink>
            ))}
          </div>

          {/* Right Side Actions */}
          <div className="hidden lg:flex items-center space-x-4">
            {/* Language Selector */}
            <LanguageSwitcher />

            {/* Download Button */}
            <button className="!bg-green-500 cursor-pointer hover:bg-green-600 text-white px-6 py-2 rounded-md text-sm font-medium transition-colors duration-200">
              {t("nav.download")}
            </button>

            {loading ? (
              <span className="loading loading-spinner"></span>
            ) : user ? (
              <ProfileDropDown />
            ) : (
              <Link
                to={"/login"}
                className="border border-green-500 hover:bg-green-600 hover:text-white text-green-500 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
              >
                {t("nav.login")}
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center space-x-2">
            <LanguageSwitcher />

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 hover:text-green-500 transition-colors duration-200"
            >
              {isOpen ? (
                <BiX className="w-6 h-6" />
              ) : (
                <MdMenu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden absolute z-50 w-full bg-white border-t border-gray-200 overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-4 w-11/12 mx-auto pt-2 pb-4 space-y-3">
          {navLinks.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              end
              onClick={() => setIsOpen(false)}
              className="block !text-gray-700 hover:text-green-500 transition-colors duration-200 text-base font-medium py-2"
            >
              {link.name}
            </NavLink>
          ))}

          <div className="pt-4 z-50 border-t border-gray-200 space-y-3">
            {/* Download App Button Mobile */}
            <button className="w-full bg-green-500 hover:bg-green-600 text-white px-6 py-3 text-sm rounded-md  font-medium transition-colors duration-200">
              {t("nav.download")}
            </button>
            {user ? (
              <div className="space-y-3">
                <Link
                  className="flex items-center gap-2 justify-center bg-gray-300 px-6 py-3 rounded-md text-sm font-medium transition-colors duration-200"
                  to={"/dashboard"}
                  onClick={() => setIsOpen(false)}
                >
                  <MdOutlineDashboard /> Dashboard
                </Link>
                <button
                  onClick={() => {
                    setIsOpen(false);
                    logOutHandler();
                  }}
                  className="bg-red-400 w-full flex items-center gap-2 justify-center px-6 py-3 text-sm rounded-md  font-medium transition-colors duration-200"
                >
                  <RiLogoutBoxRLine /> {t("navigation.logout")}
                </button>
              </div>
            ) : (
              <Link
                to={"/login"}
                onClick={() => setIsOpen(false)}
                className="border-green-500 block w-full btn border bg-transparent shadow-none text-center hover:bg-green-600 text-green-500 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
              >
                {t("nav.login")}
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Backdrop overlay when menu is open */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 z-40  lg:hidden"
        />
      )}
    </nav>
  );
}
