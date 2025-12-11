import React from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import {
  FaUser,
  FaEnvelope,
  FaGraduationCap,
  FaBriefcase,
  FaDollarSign,
  FaInfoCircle,
} from "react-icons/fa";

const TuitorDetailsModal = ({ isOpen, closeModal, email }) => {
  const axiosSecure = useAxiosSecure();

  // Fetch teacher profile
  const { data: teacherData = [], isLoading } = useQuery({
    queryKey: ["teacherProfile", email],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/teacher-profile?email=${email}&role=teacher`
      );
      return res.data;
    },
    enabled: !!email,
  });

  const teacher = Array.isArray(teacherData) ? teacherData[0] : teacherData;

  if (!isOpen) return null; // Modal closed
  if (isLoading) return <p className="p-4">Loading tutor details...</p>;
  if (!teacher) return <p className="p-4">No tutor details found.</p>;

  return (
    // Overlay
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      {/* Modal box */}
      <div className="bg-white w-full max-w-4xl p-6 rounded-xl max-h-[90vh] overflow-y-auto relative">
        <h3 className="font-bold text-2xl mb-6 text-center">Tutor Details</h3>

        {/* Profile Top Card */}
        <div className="flex flex-col md:flex-row items-center bg-white shadow-lg rounded-xl p-6 mb-8">
          <img
            src={teacher.profilePhoto}
            alt="Profile"
            className="w-40 h-40 rounded-full object-cover border-4 border-blue-500 mb-4 md:mb-0 md:mr-8"
          />
          <div className="flex-1 space-y-3">
            <h2 className="text-2xl font-semibold text-gray-800 flex items-center">
              <FaUser className="mr-2 text-blue-500" /> {teacher.teacherName}
            </h2>
            <p className="flex items-center text-gray-600">
              <FaEnvelope className="mr-2 text-blue-500" />{" "}
              {teacher.teacherEmail}
            </p>
            <p className="flex items-center text-gray-600">
              <FaGraduationCap className="mr-2 text-blue-500" />{" "}
              {teacher.qualification}
            </p>
            <p className="flex items-center text-gray-600">
              <FaBriefcase className="mr-2 text-blue-500" />{" "}
              {teacher.experienceYears} years experience
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
                {teacher.salaryRange}{" "}
                {teacher.salaryNegotiable ? "(Negotiable)" : ""}
              </p>
            </div>
          </div>
          <div className="bg-white shadow-md rounded-xl p-6 flex items-center">
            <FaInfoCircle className="text-yellow-500 text-2xl mr-4" />
            <div>
              <h3 className="text-lg font-semibold text-gray-800">Status</h3>
              <p className="text-gray-600 capitalize">{teacher.status}</p>
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="bg-white shadow-md rounded-xl p-6 mb-8">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">About Me</h3>
          <p className="text-gray-600">{teacher.longDescription}</p>
        </div>

        {/* Close Button */}
        <button
          onClick={closeModal}
          className="btn btn-primary absolute top-4 right-4"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default TuitorDetailsModal;
