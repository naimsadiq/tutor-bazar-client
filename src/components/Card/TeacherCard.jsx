import React from "react";
import {
  FaBookOpen,
  FaUserGraduate,
  FaMapMarkerAlt,
  FaDollarSign,
  FaClock,
  FaLayerGroup, // Added an icon for Class Levels
} from "react-icons/fa";
import { useNavigate } from "react-router";

const TeacherCard = ({ teacher }) => {
  const navigate = useNavigate(); // Corrected typo: navigete -> navigate
  const {
    teacherName,
    qualification,
    experienceYears,
    subjects,
    classLevels,
    teachingArea,
    salaryRange,
    preferredTime,
    profilePhoto,
    _id,
  } = teacher;

  const handleTeacherProfileDetails = (id) => {
    navigate(`/teacher-profile/${id}`);
  };

  return (
    <div className="bg-white dark:bg-gray-800 shadow-xl rounded-2xl p-6 mb-6 flex flex-col lg:flex-row items-center transition-all duration-500 hover:shadow-2xl hover:border-blue-500 border-2 border-transparent">
      {/* --- Profile Photo Section --- */}
      <div className="lg:w-1/4 w-full flex justify-center mb-6 lg:mb-0 lg:pr-6">
        <img
          src={profilePhoto || "https://via.placeholder.com/150"}
          alt={teacherName}
          className="w-36 h-36 md:w-40 md:h-40 rounded-full object-cover border-6 border-blue-500 p-1 shadow-lg"
        />
      </div>

      {/* --- Details Section --- */}
      <div className="lg:w-3/4 w-full text-center lg:text-left">
        <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-2 leading-tight">
          {teacherName}
        </h2>

        {/* Qualification & Experience */}
        <p className="text-blue-600 dark:text-blue-400 mb-3 flex items-center justify-center lg:justify-start font-semibold">
          <FaUserGraduate className="mr-2 text-xl" />
          {qualification} (
          <span className="font-bold ml-1">
            {experienceYears} Years Experience
          </span>
          )
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 text-gray-700 dark:text-gray-300 mb-4">
          {/* Subjects */}
          <p className="flex items-center justify-center sm:justify-start">
            <FaBookOpen className="mr-3 text-lg text-teal-500" />
            <span className="font-medium">Subjects:</span>{" "}
            {subjects?.join(", ") || "N/A"}
          </p>

          {/* Class Levels */}
          <p className="flex items-center justify-center sm:justify-start">
            <FaLayerGroup className="mr-3 text-lg text-purple-500" />
            <span className="font-medium">Class Levels:</span>{" "}
            {classLevels?.join(", ") || "N/A"}
          </p>

          {/* Teaching Area */}
          <p className="flex items-center justify-center sm:justify-start">
            <FaMapMarkerAlt className="mr-3 text-lg text-red-500" />
            <span className="font-medium">Area:</span> {teachingArea}
          </p>

          {/* Salary Range */}
          <p className="flex items-center justify-center sm:justify-start">
            <FaDollarSign className="mr-3 text-lg text-green-500" />
            <span className="font-medium">Salary:</span> {salaryRange} Taka
          </p>

          {/* Preferred Time */}
          <p className="flex items-center justify-center sm:justify-start col-span-1 sm:col-span-2">
            <FaClock className="mr-3 text-lg text-yellow-500" />
            <span className="font-medium">Preferred Time:</span> {preferredTime}
          </p>
        </div>

        {/* --- Button --- */}
        <div className="pt-4 flex justify-center lg:justify-start">
          <button
            onClick={() => handleTeacherProfileDetails(_id)}
            className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-semibold py-3 px-8 rounded-full shadow-lg transform hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-blue-300"
          >
            View Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default TeacherCard;
