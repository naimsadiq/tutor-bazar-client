// components/Card/TuitionRequirementCard.jsx
import React from "react";
import { useNavigate } from "react-router";
import {
  FaBookOpen,
  FaLayerGroup,
  FaMapMarkerAlt,
  FaDollarSign,
  FaUserCircle,
  FaCalendarAlt,
} from "react-icons/fa";

const TuitionRequirementCard = ({ post }) => {
  const navigate = useNavigate(); 

  const handleTuitionDetails = (id) => {
    navigate(`/tutor-request/${id}`);
  };

  const {
    _id,
    title,
    subject,
    classLevel,
    district,
    budget,
    description,
    studentName,
    createdAt,
  } = post;

  return (
    <div
      className="bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-2xl
             transition-all duration-300 p-4 sm:p-6
             border-t-4 border-indigo-600 dark:border-indigo-400
             transform hover:-translate-y-1"
    >
      {/* --- Title --- */}
      <h2
        className="text-lg sm:text-xl md:text-2xl font-bold
                 text-gray-900 dark:text-white mb-3 leading-snug"
      >
        {title}
      </h2>

      {/* --- Details Grid --- */}
      <div
        className="grid grid-cols-1 sm:grid-cols-2
               gap-x-4 sm:gap-x-6 gap-y-2 sm:gap-y-3
               text-gray-700 dark:text-gray-300
               text-sm sm:text-base mb-4"
      >
        <p className="flex items-center break-words">
          <FaBookOpen className="mr-2 text-blue-500" />
          <span className="font-semibold mr-1">Subject:</span>
          {subject}
        </p>

        <p className="flex items-center break-words">
          <FaLayerGroup className="mr-2 text-purple-500" />
          <span className="font-semibold mr-1">Class:</span>
          {classLevel}
        </p>

        <p className="flex items-center break-words">
          <FaMapMarkerAlt className="mr-2 text-red-500" />
          <span className="font-semibold mr-1">Area:</span>
          {district}
        </p>

        <p className="flex items-center">
          <FaDollarSign className="mr-2 text-green-500" />
          <span className="font-semibold mr-1">Budget:</span>
          {budget}
        </p>
      </div>

      {/* --- Description --- */}
      <div className="border-t border-b border-gray-200 dark:border-gray-700 py-3 mb-4">
        <p className="text-gray-700 dark:text-gray-200 text-xs sm:text-sm italic line-clamp-2">
          {description}
        </p>
      </div>

      {/* --- Footer Meta --- */}
      <div
        className="flex flex-col sm:flex-row sm:justify-between sm:items-center
               gap-2 text-xs font-medium
               text-gray-500 dark:text-gray-400 mb-4"
      >
        <span className="flex items-center">
          <FaUserCircle className="mr-2 text-sm" />
          Posted by: {studentName}
        </span>

        <span className="flex items-center">
          <FaCalendarAlt className="mr-2 text-sm" />
          {new Date(createdAt).toLocaleDateString()}
        </span>
      </div>

      {/* --- Action Button --- */}
      <button
        onClick={() => handleTuitionDetails(_id)}
        className="w-full bg-indigo-600 hover:bg-indigo-700
               text-white font-semibold
               py-2.5 sm:py-3 px-4 rounded-lg
               shadow-md transition-all duration-300
               focus:outline-none focus:ring-4
               focus:ring-indigo-500 focus:ring-offset-2
               dark:focus:ring-offset-gray-800
               transform hover:scale-[1.01]"
      >
        View Details
      </button>
    </div>
  );
};

export default TuitionRequirementCard;
