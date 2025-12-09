import React, { useState } from "react";
import Logo from "../Logo/Logo";
import { Link, NavLink } from "react-router";
import useAuth from "../../../hooks/useAuth";
import profileIcon from "../../../assets/profile-icon.png";
const Navbar = () => {
  const { user, logOut } = useAuth();
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleUserDropdown = () => {
    setIsUserDropdownOpen(!isUserDropdownOpen);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };
  const linksClass =
    "block py-2 px-3 rounded hover:bg-gray-100 md:hover:bg-transparent md:p-0";
  // block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0
  const links = (
    <>
      <li>
        <NavLink
          to="/"
          className={({ isActive }) =>
            `${linksClass} ${
              isActive
                ? "text-blue-700 md:text-blue-700" // Active হলে নীল
                : "text-gray-900 md:hover:text-blue-700" // Inactive হলে ধূসর
            }`
          }
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/tuition"
          className={({ isActive }) =>
            `${linksClass} ${
              isActive
                ? "text-blue-700 md:text-blue-700" // Active হলে নীল
                : "text-gray-900 md:hover:text-blue-700" // Inactive হলে ধূসর
            }`
          }
        >
          Tuition
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/teacher-profile"
          className={({ isActive }) =>
            `${linksClass} ${
              isActive
                ? "text-blue-700 md:text-blue-700" // Active হলে নীল
                : "text-gray-900 md:hover:text-blue-700" // Inactive হলে ধূসর
            }`
          }
        >
          Teacher Listing
        </NavLink>
      </li>
    </>
  );

  return (
    <nav className="bg-white border-b border-gray-200 fixed w-full z-20 top-0 start-0">
      <div className="max-w-9/12 mx-auto  flex flex-wrap items-center justify-between p-4">
        {/* Logo Section */}
        <div className="flex items-center space-x-1 rtl:space-x-reverse">
          <Logo></Logo>
        </div>

        {/* Right Side: User Menu & Mobile Toggle */}

        {}
        <div className="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse relative">
          {/* User Profile Button */}
          {user ? (
            <button
              type="button"
              className="flex text-sm bg-gray-800 rounded-full md:me-0 focus:ring-4 focus:ring-gray-300"
              id="user-menu-button"
              aria-expanded={isUserDropdownOpen}
              onClick={toggleUserDropdown}
            >
              <span className="sr-only">Open user menu</span>
              {/* <img
                className="w-8 h-8 rounded-full"
                src={user?.photoURL}
                alt="user photo"
              /> */}
              <img
                className="md:h-9 md:w-9h-10 w-9 object-cover rounded-full cursor-pointer"
                src={user?.photoURL || profileIcon}
                alt="profile pic"
              />
            </button>
          ) : (
            <div className="flex gap-3.5">
              <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-full">
                <Link to="/signin">Log in</Link>
              </button>
            </div>
          )}

          {/* User Dropdown Menu */}
          {isUserDropdownOpen && (
            <div
              className="z-50 absolute right-0 top-10 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow-lg w-44 border border-gray-100"
              id="user-dropdown"
            >
              <div className="px-4 py-3">
                <span className="block text-sm text-gray-900">
                  {user?.displayName}
                </span>
                <span className="block text-sm text-gray-500 truncate">
                  {user?.email}
                </span>
              </div>
              <ul className="py-2" aria-labelledby="user-menu-button">
                <li>
                  <Link
                    to="/dashboard"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Dashboard
                  </Link>
                </li>
                <li>
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Settings
                  </a>
                </li>
                <li>
                  <button
                    onClick={logOut}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Sign out
                  </button>
                </li>
              </ul>
            </div>
          )}

          {/* Mobile Menu Button (Hamburger) */}
          <button
            data-collapse-toggle="navbar-user"
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
            aria-controls="navbar-user"
            aria-expanded={isMobileMenuOpen}
            onClick={toggleMobileMenu}
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
        </div>

        {/* Main Navigation Menu */}
        <div
          className={`items-center justify-between w-full md:flex md:w-auto md:order-1 ${
            isMobileMenuOpen ? "block" : "hidden"
          }`}
          id="navbar-user"
        >
          <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white">
            {links}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
