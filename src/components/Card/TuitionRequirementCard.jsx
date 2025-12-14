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
  const navigate = useNavigate(); // Corrected typo: navigete -> navigate

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
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 p-6 border-t-4 border-indigo-600 dark:border-indigo-400 transform hover:-translate-y-1">
      {/* --- Title --- */}
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 leading-snug">
        {title}
      </h2>

      {/* --- Details Grid --- */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 text-gray-700 dark:text-gray-300 mb-4">
        {/* Subject */}
        <p className="flex items-center">
          <FaBookOpen className="mr-3 text-lg text-blue-500" />
          <span className="font-semibold text-gray-800 dark:text-gray-200">
            Subject:
          </span>{" "}
          {subject}
        </p>

        {/* Class Level */}
        <p className="flex items-center">
          <FaLayerGroup className="mr-3 text-lg text-purple-500" />
          <span className="font-semibold text-gray-800 dark:text-gray-200">
            Class:
          </span>{" "}
          {classLevel}
        </p>

        {/* Area / District */}
        <p className="flex items-center">
          <FaMapMarkerAlt className="mr-3 text-lg text-red-500" />
          <span className="font-semibold text-gray-800 dark:text-gray-200">
            Area:
          </span>{" "}
          {district}
        </p>

        {/* Budget / Salary */}
        <p className="flex items-center">
          <FaDollarSign className="mr-3 text-lg text-green-500" />
          <span className="font-semibold text-gray-800 dark:text-gray-200">
            Budget:
          </span>{" "}
          {budget}
        </p>
      </div>

      {/* --- Description --- */}
      <div className="border-t border-b border-gray-200 dark:border-gray-700 py-3 mb-4">
        <p className="text-gray-700 dark:text-gray-200 text-sm italic line-clamp-2">
          {description}
        </p>
      </div>

      {/* --- Footer Meta --- */}
      <div className="flex justify-between items-center text-xs font-medium text-gray-500 dark:text-gray-400 mb-5">
        <span className="flex items-center">
          <FaUserCircle className="mr-2 text-base text-gray-400" />
          Posted by: {studentName}
        </span>
        <span className="flex items-center">
          <FaCalendarAlt className="mr-2 text-base text-gray-400" />
          Date: {new Date(createdAt).toLocaleDateString()}
        </span>
      </div>

      {/* --- Action Button --- */}
      <button
        onClick={() => handleTuitionDetails(_id)}
        className="mt-2 w-full bg-indigo-600 text-white font-semibold py-3 px-4 rounded-lg shadow-md hover:bg-indigo-700 transition-colors duration-300 focus:outline-none focus:ring-4 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transform hover:scale-[1.01]"
      >
        View Details
      </button>
    </div>
  );
};

export default TuitionRequirementCard;
