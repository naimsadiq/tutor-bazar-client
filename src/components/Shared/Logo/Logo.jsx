import React from "react";

import logo from "../../../assets/tutolBazar-logo.png";
import { Link } from "react-router";

const Logo = () => {
  return (
    <Link to="/">
      <div className="flex items-end">
        <img className="w-10 h-10" src={logo} alt="" />
        <h3 className="self-center text-2xl font-semibold whitespace-nowrap text-gray-900">
          Tutol Bazar
        </h3>
      </div>
    </Link>
  );
};

export default Logo;
