import React from "react";
import { Link } from "react-router";
import { FaHome, FaSatelliteDish } from "react-icons/fa";

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 px-4">
      <div className="max-w-md w-full bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl p-8 sm:p-10 text-center">
        {/* Icon */}
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-indigo-600/20 flex items-center justify-center animate-pulse">
            <FaSatelliteDish className="text-4xl sm:text-5xl text-indigo-400" />
          </div>
        </div>

        {/* 404 Text */}
        <h1 className="text-6xl sm:text-8xl font-extrabold bg-gradient-to-r from-indigo-400 to-purple-500 bg-clip-text text-transparent mb-4">
          404
        </h1>

        <h2 className="text-xl sm:text-2xl font-semibold text-white mb-3">
          Page Not Found
        </h2>

        <p className="text-sm sm:text-base text-slate-300 mb-8 leading-relaxed">
          Oops! The page you’re looking for doesn’t exist or might have been
          moved.
        </p>

        {/* Button */}
        <Link
          to="/"
          className="inline-flex items-center gap-3 px-6 sm:px-8 py-2.5 sm:py-3 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-medium transition-all duration-300 shadow-lg hover:shadow-indigo-500/30 text-sm sm:text-base"
        >
          <FaHome />
          Go Back Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
