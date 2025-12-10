import React from "react";
import { Link, NavLink, Outlet } from "react-router";
import { CiDeliveryTruck } from "react-icons/ci";
import {
  FaRegCreditCard,
  FaTasks,
  FaUsers,
  FaMotorcycle,
} from "react-icons/fa";
import logoImg from "../assets/tutolBazar-logo.png";
import { SiGoogletasks } from "react-icons/si";
import { RiEBikeFill } from "react-icons/ri";

const DashboardLayout = () => {
  return (
    <div className="drawer max-w-7xl mx-auto lg:drawer-open w-full min-h-screen bg-base-200">
      {/* Drawer Toggle */}
      <input id="dashboard-drawer" type="checkbox" className="drawer-toggle" />

      {/* Main Content */}
      <div className="drawer-content flex flex-col">
        {/* Navbar */}
        <nav className="w-full bg-base-300 flex items-center px-4 h-14">
          <label
            htmlFor="dashboard-drawer"
            className="btn btn-square btn-ghost lg:hidden"
          >
            {/* Hamburger icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
              className="w-6 h-6"
            >
              <path d="M3 6h18M3 12h18M3 18h18" />
            </svg>
          </label>

          <span className="font-semibold text-lg">Dashboard</span>
        </nav>

        {/* Page Content */}
        <div className="p-4">
          <Outlet />
        </div>
      </div>

      {/* Sidebar */}
      <div className="drawer-side">
        <label htmlFor="dashboard-drawer" className="drawer-overlay"></label>
        <aside className="min-h-full w-64 bg-base-100 shadow-lg flex flex-col">
          <div className="px-4 py-4 border-b border-base-300">
            <Link to="/">
              <img src={logoImg} alt="Logo" className="w-20 mx-auto" />
            </Link>
          </div>

          <ul className="menu p-4 w-full flex-1">
            {/* Home */}
            <li>
              <NavLink to="/dashboard/tutor-request" end>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  className="w-5 h-5"
                >
                  <path d="M3 10l9-7 9 7v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                </svg>
                Tutor Request
              </NavLink>
            </li>

            {/* my tuition */}
            <li>
              <NavLink to="/dashboard/my-tuitions" end>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  className="w-5 h-5"
                >
                  <path d="M3 10l9-7 9 7v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                </svg>
                My Tuitions
              </NavLink>
            </li>

            {/* //teacher-request */}
            <li>
              <NavLink to="/dashboard/teacher-request" end>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  className="w-5 h-5"
                >
                  <path d="M3 10l9-7 9 7v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                </svg>
                Teacher Request
              </NavLink>
            </li>

            {/* Settings */}
            <li>
              <NavLink to="/dashboard/settings">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <circle cx="12" cy="12" r="3" />
                  <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l0 0a2 2 0 1 1-2.83 2.83l0 0A1.65 1.65 0 0 0 15 19.4a1.65 1.65 0 0 0-1 0 1.65 1.65 0 0 0-1 0 1.65 1.65 0 0 0-.33 1.82l0 0a2 2 0 1 1-2.83-2.83l0 0A1.65 1.65 0 0 0 4.6 15a1.65 1.65 0 0 0 0-1 1.65 1.65 0 0 0 0-1 1.65 1.65 0 0 0-.33-1.82l0 0A2 2 0 1 1 7.1 8.38l0 0A1.65 1.65 0 0 0 9 4.6a1.65 1.65 0 0 0 1 0 1.65 1.65 0 0 0 1 0 1.65 1.65 0 0 0 .33-1.82l0 0A2 2 0 1 1 14.17 5l0 0A1.65 1.65 0 0 0 19.4 9c0 .33 0 .67 0 1 0 .33 0 .67 0 1z" />
                </svg>
                Settings
              </NavLink>
            </li>
          </ul>
        </aside>
      </div>
    </div>
  );
};

export default DashboardLayout;
