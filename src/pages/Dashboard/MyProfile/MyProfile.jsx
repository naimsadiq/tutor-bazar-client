import React, { useEffect } from "react";
import {
  FaUser,
  FaEnvelope,
  FaGraduationCap,
  FaBriefcase,
  FaDollarSign,
  FaInfoCircle,
} from "react-icons/fa";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import { useNavigate } from "react-router";

const MyProfile = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const { data: teacherData = [], isLoading } = useQuery({
    queryKey: ["teacherData", user],
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

  // console.log(teacher);
  // Provided teacher data
  // const teacher = {
  //   teacherName: "teacher1",
  //   teacherEmail: "teacher1@g.com",
  //   experienceYears: 2,
  //   qualification: "MSc Running",
  //   salaryRange: "2000",
  //   salaryNegotiable: true,
  //   longDescription: "dsaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  //   profilePhoto: "https://i.ibb.co/sJw9pGNn/1600w-IYcg-Pn-Jtx3-Q.webp",
  //   status: "pending",
  //   createdAt: "2025-12-10T12:12:37.088Z",
  // };

  const teacher = Array.isArray(teacherData) ? teacherData[0] : teacherData;
  console.log(teacher);

  if (isLoading) return <p className="text-center mt-10">Loading profile...</p>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">My Profile</h1>
        <button className="flex items-center bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow-md transition">
          <FaUser className="mr-2" /> Edit Profile
        </button>
      </div>

      {/* Profile Top Card */}
      <div className="flex flex-col md:flex-row items-center bg-white shadow-lg rounded-xl p-6 mb-8">
        <img
          src={teacher?.profilePhoto}
          alt="Profile"
          className="w-40 h-40 rounded-full object-cover border-4 border-blue-500 mb-4 md:mb-0 md:mr-8"
        />
        <div className="flex-1 space-y-3">
          <h2 className="text-2xl font-semibold text-gray-800 flex items-center">
            <FaUser className="mr-2 text-blue-500" /> {teacher?.teacherName}
          </h2>
          <p className="flex items-center text-gray-600">
            <FaEnvelope className="mr-2 text-blue-500" />{" "}
            {teacher?.teacherEmail}
          </p>
          <p className="flex items-center text-gray-600">
            <FaGraduationCap className="mr-2 text-blue-500" />{" "}
            {teacher?.qualification}
          </p>
          <p className="flex items-center text-gray-600">
            <FaBriefcase className="mr-2 text-blue-500" />{" "}
            {teacher?.experienceYears} years experience
          </p>
        </div>
      </div>

      {/* Salary & Status */}
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white shadow-md rounded-xl p-6 flex items-center">
          <FaDollarSign className="text-green-500 text-2xl mr-4" />
          <div>
            <h3 className="text-lg font-semibold text-gray-800">Salary</h3>
            <p className="text-gray-600">
              {teacher?.salaryRange}{" "}
              {teacher?.salaryNegotiable ? "(Negotiable)" : ""}
            </p>
          </div>
        </div>
        <div className="bg-white shadow-md rounded-xl p-6 flex items-center">
          <FaInfoCircle className="text-yellow-500 text-2xl mr-4" />
          <div>
            <h3 className="text-lg font-semibold text-gray-800">Status</h3>
            <p className="text-gray-600 capitalize">{teacher?.status}</p>
          </div>
        </div>
      </div>

      {/* Description */}
      <div className="bg-white shadow-md rounded-xl p-6 mb-8">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">About Me</h3>
        <p className="text-gray-600">{teacher?.longDescription}</p>
      </div>
    </div>
  );
};

export default MyProfile;
