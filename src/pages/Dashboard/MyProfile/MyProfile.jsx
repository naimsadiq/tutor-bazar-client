import React, { useEffect } from "react";
import {
  FaUser,
  FaEnvelope,
  FaGraduationCap,
  FaBriefcase,
  FaDollarSign,
  FaInfoCircle,
  FaEdit,
} from "react-icons/fa";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import { useNavigate } from "react-router";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";

const MyProfile = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const { data: teacherData = [], isLoading } = useQuery({
    queryKey: ["teacherData", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/teacher-profile?role=teacher&email=${user.email}`
      );
      return res.data;
    },
  });

  useEffect(() => {
    if (!isLoading && teacherData.length === 0) {
      navigate("/dashboard/teacher-request");
    }
  }, [teacherData, isLoading, navigate]);

  if (isLoading) return <LoadingSpinner />;

  const teacher = teacherData[0];

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 pt-24 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-8">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
            My Profile
          </h1>

          {teacher?.status !== "approved" && (
            <button
              onClick={() =>
                navigate("/dashboard/update-profile", {
                  state: { teacher },
                })
              }
              className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg shadow transition"
            >
              <FaEdit /> Edit Profile
            </button>
          )}
        </div>

        {/* Profile Card */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 md:p-8 mb-8">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <img
              src={teacher?.profilePhoto}
              alt="Profile"
              className="w-36 h-36 md:w-44 md:h-44 rounded-full object-cover border-4 border-blue-500"
            />

            <div className="flex-1 space-y-3 text-center md:text-left">
              <h2 className="text-2xl font-semibold text-gray-800 dark:text-white flex items-center justify-center md:justify-start gap-2">
                <FaUser className="text-blue-500" />
                {teacher?.teacherName}
              </h2>

              <p className="flex items-center justify-center md:justify-start gap-2 text-gray-600 dark:text-gray-300">
                <FaEnvelope className="text-blue-500" />
                {teacher?.teacherEmail}
              </p>

              <p className="flex items-center justify-center md:justify-start gap-2 text-gray-600 dark:text-gray-300">
                <FaGraduationCap className="text-blue-500" />
                {teacher?.qualification}
              </p>

              <p className="flex items-center justify-center md:justify-start gap-2 text-gray-600 dark:text-gray-300">
                <FaBriefcase className="text-blue-500" />
                {teacher?.experienceYears} years experience
              </p>
            </div>
          </div>
        </div>

        {/* Salary & Status */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 flex gap-4 items-center">
            <FaDollarSign className="text-green-500 text-3xl" />
            <div>
              <h3 className="font-semibold text-gray-800 dark:text-white">
                Salary
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                {teacher?.salaryRange}{" "}
                {teacher?.salaryNegotiable && "(Negotiable)"}
              </p>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 flex gap-4 items-center">
            <FaInfoCircle className="text-yellow-500 text-3xl" />
            <div>
              <h3 className="font-semibold text-gray-800 dark:text-white">
                Status
              </h3>
              <span
                className={`inline-block mt-1 px-3 py-1 rounded-full text-sm font-medium
                  ${
                    teacher?.status === "approved"
                      ? "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300"
                      : "bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300"
                  }`}
              >
                {teacher?.status}
              </span>
            </div>
          </div>
        </div>

        {/* About */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 mb-12">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
            About Me
          </h3>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed wrap-break-word">
            {teacher?.longDescription}
          </p>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
