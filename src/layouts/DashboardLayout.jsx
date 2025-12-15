import React from "react";
import { Link, NavLink, Outlet } from "react-router";
import logoImg from "../assets/tutolBazar-logo.png";
import {
  MdPersonAdd,
  MdManageAccounts,
  MdListAlt,
  MdPostAdd,
  MdPeople,
  MdAssignment,
  MdPersonSearch,
  MdHowToReg,
  MdHistory,
  MdGroup,
  MdPayment,
  MdMonetizationOn,
  MdSettings,
} from "react-icons/md";
import useRole from "../hooks/useRole";
const DashboardLayout = () => {
  const { role } = useRole();
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
            {role === "student" && (
              <>
                {/* tuition requst */}
                <li>
                  <NavLink to="/dashboard/tutor-request">
                    <MdPostAdd size={25} />
                    Post Tuition
                  </NavLink>
                </li>

                {/* my tuition */}
                <li>
                  <NavLink to="/dashboard/my-tuitions" end>
                    <MdListAlt size={25} />
                    My Tuitions
                  </NavLink>
                </li>

                {/* Applied Tutors */}
                <li>
                  <NavLink to="/dashboard/applied-tutors" end>
                    <MdHowToReg size={25} />
                    Applied Tutors
                  </NavLink>
                </li>
                {/* Checkout */}
                <li>
                  <NavLink to="/dashboard/checkout" end>
                    <MdPayment size={25} />
                    Checkout
                  </NavLink>
                </li>

                {/* Payment History */}
                <li>
                  <NavLink to="/dashboard/payment-history" end>
                    <MdHistory size={25} />
                    Payment History
                  </NavLink>
                </li>
              </>
            )}

            {role === "teacher" && (
              <>
                {/* //teacher-request */}
                <li>
                  <NavLink to="/dashboard/teacher-request" end>
                    <MdPersonAdd size={25} />
                    Create Profile
                  </NavLink>
                </li>

                {/* // My Profile */}
                <li>
                  <NavLink to="/dashboard/my-profile" end>
                    <MdManageAccounts size={25} />
                    My Profile
                  </NavLink>
                </li>

                {/* Applied Students */}
                <li>
                  <NavLink to="/dashboard/applied-students" end>
                    <MdGroup size={25} />
                    Applied Students
                  </NavLink>
                </li>

                {/* teacher Earnings */}
                <li>
                  <NavLink to="/dashboard/earnings" end>
                    <MdMonetizationOn size={25} />
                    Earnings
                  </NavLink>
                </li>
              </>
            )}

            {role === "admin" && (
              <>
                {/* User Management */}
                <li>
                  <NavLink to="/dashboard/user-management" end>
                    <MdPeople size={25} />
                    User Management
                  </NavLink>
                </li>

                {/* Tuition Posts Management */}
                <li>
                  <NavLink to="/dashboard/tuition-management" end>
                    <MdAssignment size={25} />
                    Tuition Management
                  </NavLink>
                </li>

                {/* Teacher Applications */}
                <li>
                  <NavLink to="/dashboard/teacher-applications" end>
                    <MdPersonSearch size={25} />
                    Teacher Applications
                  </NavLink>
                </li>
              </>
            )}

            {/* Settings */}
            <li>
              <NavLink to="/dashboard/">
                <MdSettings size={25} />
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
