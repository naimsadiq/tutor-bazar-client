import React from "react";
import logo from "../../../assets/tutolBazar-logo.png";
import { Link } from "react-router";

const Logo = () => {
  return (
    <Link to="/">
      <div className="flex items-center gap-2 md:gap-3">
        {/* Logo Image */}
        <img
          className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10"
          src={logo}
          alt="Tutol Bazar Logo"
        />

        {/* Logo Text */}
        <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-900 dark:text-white whitespace-nowrap">
          Tutol Bazar
        </h3>
      </div>
    </Link>
  );
};

export default Logo;
