import React from "react";
import {
  FaBookOpen,
  FaUserGraduate,
  FaMapMarkerAlt,
  FaDollarSign,
  FaClock,
  FaLayerGroup, 
} from "react-icons/fa";
import { useNavigate } from "react-router";

const TeacherCard = ({ teacher }) => {
  const navigate = useNavigate(); 
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
    <div
      className="bg-white dark:bg-gray-800 shadow-lg hover:shadow-2xl rounded-2xl 
                p-5 sm:p-6 mb-6 flex flex-col lg:flex-row items-center 
                transition-all duration-300 border border-transparent 
                hover:border-blue-500"
    >
      {/* Profile Photo */}
      <div className="w-full lg:w-1/4 flex justify-center mb-5 lg:mb-0">
        <img
          src={profilePhoto || "https://via.placeholder.com/150"}
          alt={teacherName}
          className="w-28 h-28 sm:w-32 sm:h-32 md:w-36 md:h-36 
                 rounded-full object-cover border-4 border-blue-500 
                 shadow-md"
        />
      </div>

      {/* Details */}
      <div className="w-full lg:w-3/4 text-center lg:text-left">
        <h2
          className="text-xl sm:text-2xl md:text-3xl font-extrabold 
                   text-gray-900 dark:text-white mb-1"
        >
          {teacherName}
        </h2>

        {/* Qualification & Experience */}
        <p
          className="text-blue-600 dark:text-blue-400 mb-3 
                  flex flex-wrap items-center justify-center lg:justify-start 
                  text-sm sm:text-base font-semibold"
        >
          <FaUserGraduate className="mr-2 text-lg" />
          {qualification}
          <span className="ml-1 font-bold">({experienceYears} yrs exp)</span>
        </p>

        {/* Info Grid */}
        <div
          className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 
                    text-gray-700 dark:text-gray-300 text-sm sm:text-base mb-4"
        >
          <p className="flex items-center justify-center sm:justify-start break-words">
            <FaBookOpen className="mr-2 text-teal-500" />
            <span className="font-medium mr-1">Subjects:</span>
            {subjects?.join(", ") || "N/A"}
          </p>

          <p className="flex items-center justify-center sm:justify-start break-words">
            <FaLayerGroup className="mr-2 text-purple-500" />
            <span className="font-medium mr-1">Class:</span>
            {classLevels?.join(", ") || "N/A"}
          </p>

          <p className="flex items-center justify-center sm:justify-start">
            <FaMapMarkerAlt className="mr-2 text-red-500" />
            <span className="font-medium mr-1">Area:</span>
            {teachingArea}
          </p>

          <p className="flex items-center justify-center sm:justify-start">
            <FaDollarSign className="mr-2 text-green-500" />
            <span className="font-medium mr-1">Salary:</span>
            {salaryRange} Taka
          </p>

          <p className="flex items-center justify-center sm:justify-start sm:col-span-2">
            <FaClock className="mr-2 text-yellow-500" />
            <span className="font-medium mr-1">Time:</span>
            {preferredTime}
          </p>
        </div>

        {/* Button */}
        <div className="flex justify-center lg:justify-start pt-3">
          <button
            onClick={() => handleTeacherProfileDetails(_id)}
            className="w-full sm:w-auto bg-gradient-to-r from-blue-500 to-indigo-600 
                   hover:from-blue-600 hover:to-indigo-700 text-white 
                   font-semibold py-2.5 px-8 rounded-full shadow-md 
                   hover:scale-105 transition-all duration-300 
                   focus:outline-none focus:ring-4 focus:ring-blue-300"
          >
            View Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default TeacherCard;
