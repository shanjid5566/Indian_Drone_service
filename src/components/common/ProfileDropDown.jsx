import { FiBell, FiSettings } from "react-icons/fi";
import { MdOutlineDashboard } from "react-icons/md";
import { RiLogoutBoxRLine } from "react-icons/ri";
import { useAuth } from "../../hooks/useAuth";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";

const ProfileDropDown = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  const logOutHandler = async () => {
    await logout();
    navigate("/");
  };

  // click outside close dropdown
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div
      className="relative flex items-end justify-center gap-2 mr-1.5"
      ref={dropdownRef}
    >
      {/* avatar button */}
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="flex items-center justify-center w-10 h-10 rounded-full overflow-hidden border border-gray-300 hover:ring-2 hover:ring-blue-500 transition-all"
      >
        <img
          src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
          alt="profile avatar"
          className="object-cover w-full h-full"
        />
      </button>

      {/* dropdown menu with smooth animation */}
      <div
        className={`absolute top-12 right-0 w-52 bg-gray-100 rounded-md shadow-lg p-4 flex flex-col gap-2 z-50 origin-top-right transition-all duration-200 ease-out
        ${open ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"}`}
      >
        {/* Notification */}
        {/* {user &&
          ["admin", "marketing", "employee"].includes(user.role) && (
            <Link
              to="#"
              className="text-gray-800 text-sm flex items-center gap-2 hover:bg-gray-200 rounded-md px-2 py-2 transition-colors lg:hidden"
            >
              <FiBell /> Notification
            </Link>
          )} */}

        {/* Settings */}
        {user?.role === "admin" && (
          <Link
            to="#"
            className="text-gray-800 text-sm flex items-center gap-2 hover:bg-gray-200 rounded-md px-2 py-2 transition-colors lg:hidden"
          >
            <FiSettings /> Settings
          </Link>
        )}

        {/* Dashboard */}
        <Link
          to="/dashboard"
          className="text-gray-800 text-sm flex items-center gap-2 hover:bg-gray-200 rounded-md px-2 py-2 transition-colors"
        >
          <MdOutlineDashboard /> Dashboard
        </Link>

        {/* Logout */}
        <button
          onClick={logOutHandler}
          className="text-white bg-red-400 text-sm flex items-center gap-2 rounded-md px-2 py-2 hover:bg-red-500 transition-colors"
        >
          <RiLogoutBoxRLine /> {t("navigation.logout")}
        </button>
      </div>

      {/* user info */}
      <div className="hidden lg:flex flex-col">
        <p className="text-black text-[10px] lg:text-[16px] font-semibold">
          {user?.role}
        </p>
        <p className="text-gray-400 lg:text-xs text-[8px] ">{user?.role}</p>
      </div>
    </div>
  );
};

export default ProfileDropDown;
