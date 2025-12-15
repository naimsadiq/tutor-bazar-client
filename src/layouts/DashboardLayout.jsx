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

  // NavLink 
  const getNavLinkClass = ({ isActive }) => {
    // DaisyUI/Tailwind 
    const baseClasses =
      "flex items-center p-3 rounded-lg transition-colors dark:text-white duration-200";

    const hoverClass = "hover:bg-base-200";

    if (isActive) {
      return `${baseClasses} bg-blue-100 text-blue-700 font-semibold shadow-inner`;
    } else {
      return `${baseClasses} text-gray-700 ${hoverClass}`;
    }
  };

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

          <ul className="menu p-4 w-full flex-1 space-y-2">
            {role === "student" && (
              <>
                {/* tuition requst */}
                <li>
                  <NavLink
                    to="/dashboard/tutor-request"
                    className={getNavLinkClass}
                  >
                    <MdPostAdd size={25} />
                    Post Tuition
                  </NavLink>
                </li>

                {/* my tuition */}
                <li>
                  <NavLink
                    to="/dashboard/my-tuitions"
                    end
                    className={getNavLinkClass}
                  >
                    <MdListAlt size={25} />
                    My Tuitions
                  </NavLink>
                </li>

                {/* Applied Tutors */}
                <li>
                  <NavLink
                    to="/dashboard/applied-tutors"
                    end
                    className={getNavLinkClass}
                  >
                    <MdHowToReg size={25} />
                    Applied Tutors
                  </NavLink>
                </li>
                {/* Checkout */}
                <li>
                  <NavLink
                    to="/dashboard/checkout"
                    end
                    className={getNavLinkClass}
                  >
                    <MdPayment size={25} />
                    Checkout
                  </NavLink>
                </li>

                {/* Payment History */}
                <li>
                  <NavLink
                    to="/dashboard/payment-history"
                    end
                    className={getNavLinkClass}
                  >
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
                  <NavLink
                    to="/dashboard/teacher-request"
                    end
                    className={getNavLinkClass}
                  >
                    <MdPersonAdd size={25} />
                    Create Profile
                  </NavLink>
                </li>

                {/* // My Profile */}
                <li>
                  <NavLink
                    to="/dashboard/my-profile"
                    end
                    className={getNavLinkClass}
                  >
                    <MdManageAccounts size={25} />
                    My Profile
                  </NavLink>
                </li>

                {/* Applied Students */}
                <li>
                  <NavLink
                    to="/dashboard/applied-students"
                    end
                    className={getNavLinkClass}
                  >
                    <MdGroup size={25} />
                    Applied Students
                  </NavLink>
                </li>

                {/* teacher Earnings */}
                <li>
                  <NavLink
                    to="/dashboard/earnings"
                    end
                    className={getNavLinkClass}
                  >
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
                  <NavLink
                    to="/dashboard/user-management"
                    end
                    className={getNavLinkClass}
                  >
                    <MdPeople size={25} />
                    User Management
                  </NavLink>
                </li>

                {/* Tuition Posts Management */}
                <li>
                  <NavLink
                    to="/dashboard/tuition-management"
                    end
                    className={getNavLinkClass}
                  >
                    <MdAssignment size={25} />
                    Tuition Management
                  </NavLink>
                </li>

                {/* Teacher Applications */}
                <li>
                  <NavLink
                    to="/dashboard/teacher-applications"
                    end
                    className={getNavLinkClass}
                  >
                    <MdPersonSearch size={25} />
                    Teacher Applications
                  </NavLink>
                </li>
              </>
            )}
            {/* Settings */}
            <li>
              <NavLink to="/dashboard/" end className={getNavLinkClass}>
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
