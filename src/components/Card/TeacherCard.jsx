import React from "react";
import {
  FaBookOpen,
  FaUserGraduate,
  FaMapMarkerAlt,
  FaDollarSign,
  FaClock,
} from "react-icons/fa";
import { useNavigate } from "react-router";

const TeacherCard = ({ teacher }) => {
  const navigete = useNavigate();
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
    navigete(`/teacher-profile/${id}`);
  };

  return (
    <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6 mb-6 flex flex-col md:flex-row items-center transition-transform transform hover:scale-105 duration-300">
      <div className="md:w-1/4 w-full flex justify-center mb-4 md:mb-0">
        <img
          src={profilePhoto || "https://via.placeholder.com/150"} // Default image if no profilePhoto
          alt={teacherName}
          className="w-32 h-32 rounded-full object-cover border-4 border-blue-500 dark:border-blue-400"
        />
      </div>
      <div className="md:w-3/4 w-full text-center md:text-left">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          {teacherName}
        </h2>
        <p className="text-blue-600 dark:text-blue-300 mb-2 flex items-center justify-center md:justify-start">
          <FaUserGraduate className="mr-2" /> {qualification} ({experienceYears}{" "}
          বছর অভিজ্ঞতা)
        </p>
        <p className="text-gray-700 dark:text-gray-300 mb-1 flex items-center justify-center md:justify-start">
          <FaBookOpen className="mr-2" /> বিষয়: {subjects?.join(", ")}
        </p>
        <p className="text-gray-700 dark:text-gray-300 mb-1 flex items-center justify-center md:justify-start">
          ক্লাস: {classLevels?.join(", ") || "N/A"}
        </p>
        <p className="text-gray-700 dark:text-gray-300 mb-1 flex items-center justify-center md:justify-start">
          <FaMapMarkerAlt className="mr-2" /> এলাকা: {teachingArea}
        </p>
        <p className="text-gray-700 dark:text-gray-300 mb-1 flex items-center justify-center md:justify-start">
          <FaDollarSign className="mr-2" /> বেতন: {salaryRange} টাকা
        </p>
        <p className="text-gray-700 dark:text-gray-300 mb-4 flex items-center justify-center md:justify-start">
          <FaClock className="mr-2" /> পছন্দের সময়: {preferredTime}
        </p>
        <div className="flex justify-center md:justify-start">
          <button
            onClick={() => handleTeacherProfileDetails(_id)}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-6 rounded-full transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
          >
            বিস্তারিত দেখুন
          </button>
        </div>
      </div>
    </div>
  );
};

export default TeacherCard;
