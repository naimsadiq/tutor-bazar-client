import React from "react";
import {
  FaUserGraduate,
  FaCalendarAlt,
  FaClock,
  FaMoneyBillWave,
  FaMapMarkerAlt,
  FaBookOpen,
  FaGlobe,
  FaLanguage,
  FaChalkboardTeacher,
  FaCheckCircle,
  FaStar,
  FaEnvelope,
  FaHandshake,
  FaGraduationCap,
  FaDesktop,
  FaPencilAlt,
  FaCalendarPlus,
} from "react-icons/fa";
import { useParams } from "react-router";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const TeacherProfileDetails = () => {
  const { id } = useParams(); // URL থেকে পোস্টের ID নিন
  // const navigate = useNavigate(); // প্রোগ্রাম্যাটিক্যালি নেভিগেট করার জন্য

  const axiosSecure = useAxiosSecure();

  const { data: teacherData = {} } = useQuery({
    queryKey: ["teacherData"],
    queryFn: async () => {
      const result = await axiosSecure(
        `${import.meta.env.VITE_API_URL}/teacher-profile/${id}`
      );
      return result.data;
    },
  });

  // const teacherData = {
  //   teacherName: "Abdul Karim",
  //   teacherEmail: "abdul.karim01@gmail.com",
  //   experienceYears: 5,
  //   qualification: "MSc in Mathematics",
  //   medium: ["Bangla"],
  //   subjects: ["Mathematics"],
  //   classLevels: ["Junior School", "Secondary School", "O-Level", "HSC"],
  //   mode: "Both",
  //   teachingArea: "Khulna",
  //   preferredTime: "Evening (6 PM – 9 PM)",
  //   availableDaysPerWeek: 4,
  //   salaryRange: "8000",
  //   salaryNegotiable: true,
  //   shortDescription: "Experienced math tutor for junior and secondary students.",
  //   longDescription: "I have been teaching mathematics for 5 years with excellent student feedback and a proven track record of helping students achieve their academic goals. My teaching style is interactive and focused on building a strong conceptual understanding. I am passionate about making mathematics enjoyable and accessible to all students.",
  //   languages: ["Bengali", "English"],
  //   profilePhoto: "https://i.ibb.co/HTXKL1T8/sample-profile.jpg",
  //   status: "pending",
  //   createdAt: "2025-12-09T10:12:05.671Z"
  // };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6 md:p-10">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden border border-blue-200">
        {/* Header Section */}
        <div className="relative bg-gradient-to-r from-blue-600 to-purple-600 p-8 text-white flex flex-col items-center justify-center">
          <img
            src={teacherData.profilePhoto}
            alt={teacherData.teacherName}
            className="w-32 h-32 rounded-full border-4 border-white shadow-md mb-4 object-cover"
          />
          <h1 className="text-4xl font-extrabold mb-2 tracking-wide">
            {teacherData.teacherName}
          </h1>
          <p className="text-xl font-light opacity-90">
            {teacherData.shortDescription}
          </p>
          <div className="absolute top-4 right-4 flex items-center bg-white text-blue-600 px-3 py-1 rounded-full text-sm font-semibold shadow">
            <FaCheckCircle className="mr-1 text-green-500" />
            {teacherData.status === "pending" ? "Pending Approval" : "Active"}
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="p-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column: Contact & Basic Info */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-blue-50 p-6 rounded-lg shadow-sm border border-blue-100">
              <h2 className="text-2xl font-semibold text-blue-700 mb-4 flex items-center">
                <FaUserGraduate className="mr-3 text-blue-500" />
                Teacher Info
              </h2>
              <p className="flex items-center text-gray-700 mb-2">
                <FaEnvelope className="mr-3 text-blue-400" />{" "}
                <a
                  href={`mailto:${teacherData.teacherEmail}`}
                  className="text-blue-600 hover:underline"
                >
                  {teacherData.teacherEmail}
                </a>
              </p>
              <p className="flex items-center text-gray-700 mb-2">
                <FaStar className="mr-3 text-yellow-500" /> Experience:{" "}
                <span className="font-medium ml-1">
                  {teacherData.experienceYears} Years
                </span>
              </p>
              <p className="flex items-center text-gray-700 mb-2">
                <FaUserGraduate className="mr-3 text-green-500" />{" "}
                Qualification:{" "}
                <span className="font-medium ml-1">
                  {teacherData.qualification}
                </span>
              </p>
              <p className="flex items-center text-gray-700 mb-2">
                <FaLanguage className="mr-3 text-purple-500" /> Languages:{" "}
                <span className="font-medium ml-1">
                  {teacherData.languages?.join(", ")}
                </span>
              </p>
              <p className="flex items-center text-gray-700">
                <FaGlobe className="mr-3 text-teal-500" /> Medium:{" "}
                <span className="font-medium ml-1">
                  {teacherData.medium?.join(", ")}
                </span>
              </p>
            </div>

            <div className="bg-purple-50 p-6 rounded-lg shadow-sm border border-purple-100">
              <h2 className="text-2xl font-semibold text-purple-700 mb-4 flex items-center">
                <FaMoneyBillWave className="mr-3 text-purple-500" />
                Salary & Availability
              </h2>
              <p className="flex items-center text-gray-700 mb-2">
                <FaMoneyBillWave className="mr-3 text-green-500" /> Salary
                Range:{" "}
                <span className="font-medium ml-1">
                  BDT {teacherData.salaryRange}
                </span>
              </p>
              <p className="flex items-center text-gray-700 mb-2">
                <FaHandshake className="mr-3 text-indigo-500" /> Salary
                Negotiable:
                <span
                  className={`font-medium ml-1 ${
                    teacherData.salaryNegotiable
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {teacherData.salaryNegotiable ? "Yes" : "No"}
                </span>
              </p>
              <p className="flex items-center text-gray-700 mb-2">
                <FaCalendarAlt className="mr-3 text-yellow-500" /> Available
                Days/Week:{" "}
                <span className="font-medium ml-1">
                  {teacherData.availableDaysPerWeek}
                </span>
              </p>
              <p className="flex items-center text-gray-700">
                <FaClock className="mr-3 text-orange-500" /> Preferred Time:{" "}
                <span className="font-medium ml-1">
                  {teacherData.preferredTime}
                </span>
              </p>
            </div>
          </div>

          {/* Right Column: Details & Description */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-green-50 p-6 rounded-lg shadow-sm border border-green-100">
              <h2 className="text-2xl font-semibold text-green-700 mb-4 flex items-center">
                <FaBookOpen className="mr-3 text-green-500" />
                Teaching Details
              </h2>
              <p className="flex items-center text-gray-700 mb-2">
                <FaChalkboardTeacher className="mr-3 text-blue-500" /> Subjects:{" "}
                <span className="font-medium ml-1">
                  {teacherData.subjects?.join(", ")}
                </span>
              </p>
              <p className="flex items-center text-gray-700 mb-2">
                <FaGraduationCap className="mr-3 text-purple-500" /> Class
                Levels:{" "}
                <span className="font-medium ml-1">
                  {teacherData.classLevels?.join(", ")}
                </span>
              </p>
              <p className="flex items-center text-gray-700 mb-2">
                <FaDesktop className="mr-3 text-red-500" /> Mode:{" "}
                <span className="font-medium ml-1">{teacherData.mode}</span>
              </p>
              <p className="flex items-center text-gray-700">
                <FaMapMarkerAlt className="mr-3 text-teal-500" /> Teaching Area:{" "}
                <span className="font-medium ml-1">
                  {teacherData.teachingArea}
                </span>
              </p>
            </div>

            <div className="bg-yellow-50 p-6 rounded-lg shadow-sm border border-yellow-100">
              <h2 className="text-2xl font-semibold text-yellow-700 mb-4 flex items-center">
                <FaPencilAlt className="mr-3 text-yellow-500" />
                About Me
              </h2>
              <p className="text-gray-800 leading-relaxed">
                {teacherData.longDescription}
              </p>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg shadow-sm border border-gray-100 text-sm text-gray-600">
              <p className="flex items-center">
                <FaCalendarPlus className="mr-2 text-gray-500" /> Profile
                Created On:{" "}
                {new Date(teacherData.createdAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherProfileDetails;
