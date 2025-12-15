import React, { useState } from "react";
import {
  FaUserGraduate,
  FaMoneyBillWave,
  FaStar,
  FaEnvelope,
  FaCalendarPlus,
} from "react-icons/fa";
import { useParams } from "react-router";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";
import ApplyModal from "../../components/Modal/ApplyModal";
import LoadingSpinner from "../../components/Shared/LoadingSpinner";

const classSubjectsMap = {
  "Class 1": ["Bangla", "English", "Mathematics"],
  "Class 2": ["Bangla", "English", "Mathematics"],
  "Class 3": [
    "Bangla",
    "English",
    "Mathematics",
    "General Science",
    "Social Science",
  ],
  "Class 4": [
    "Bangla",
    "English",
    "Mathematics",
    "General Science",
    "Social Science",
  ],
  "Class 5": [
    "Bangla",
    "English",
    "Mathematics",
    "General Science",
    "Social Science",
  ],
  "Class 6": [
    "Bangla",
    "English",
    "Mathematics",
    "General Science",
    "History",
    "Geography",
    "ICT",
  ],
  "Class 7": [
    "Bangla",
    "English",
    "Mathematics",
    "General Science",
    "History",
    "Geography",
    "ICT",
  ],
  "Class 8": [
    "Bangla",
    "English",
    "Mathematics",
    "Physics",
    "Chemistry",
    "Biology",
    "History",
    "Geography",
    "ICT",
  ],
  "Class 9": [
    "Bangla",
    "English",
    "Mathematics",
    "Physics",
    "Chemistry",
    "Biology",
    "Higher Math",
    "ICT",
  ],
  "Class 10": [
    "Bangla",
    "English",
    "Mathematics",
    "Physics",
    "Chemistry",
    "Biology",
    "Higher Math",
    "ICT",
  ],
};

const TeacherProfileDetails = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedClassLevel, setSelectedClassLevel] = useState("");
  const availableSubjects = classSubjectsMap[selectedClassLevel] || [];

  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const { data: teacherData = {}, isLoading } = useQuery({
    queryKey: ["teacherData", id],
    queryFn: async () => {
      const result = await axiosSecure(`/teacher-profile/${id}`);
      return result.data;
    },
  });


  const handleStudentApply = async (formValues) => {
    const appliedData = {
      studentName: user?.displayName,
      studentEmail: user?.email,
      tutorId: teacherData._id,
      tutorEmail: teacherData.teacherEmail,
      tutorName: teacherData.teacherName,

      // modal data
      classLevel: formValues.classLevel,
      subject: formValues.subject,
      budget: formValues.budget,

      expectedSalary: teacherData.salaryRange,
      qualification: teacherData.qualification,
      experienceYears: teacherData.experienceYears,
    };

    try {
      const res = await axiosSecure.post("/apply-student", appliedData);

      if (res.data.insertedId) {
        Swal.fire(
          "Success!",
          "Your application has been submitted.",
          "success"
        );
      } else if (res.data.message === "Already applied!") {
        Swal.fire("Already Applied", "You have applied before.", "warning");
      }
    } catch (error) {
      if (error.response?.data?.message === "Already applied!") {
        Swal.fire("Already Applied", "You have already applied.", "warning");
      } else {
        Swal.fire("Error", "Something went wrong.", "error");
      }
    }
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-4 sm:p-6 md:p-10">
      <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-md dark:shadow-gray-900 border border-gray-200 dark:border-gray-700">
        {/* Header Section */}
        <div className="p-6 sm:p-10 text-center border-b bg-white dark:bg-gray-800 dark:border-gray-700">
          <img
            src={teacherData.profilePhoto}
            alt={teacherData.teacherName}
            className="w-24 h-24 sm:w-36 sm:h-36 rounded-full mx-auto border-4 border-gray-100 dark:border-gray-700 shadow-sm object-cover"
          />

          <h1 className="text-2xl sm:text-3xl md:text-3xl font-bold mt-4 text-gray-800 dark:text-white">
            {teacherData.teacherName || "N/A"}
          </h1>

          <p className="text-gray-500 dark:text-gray-400 mt-2 max-w-xl mx-auto text-sm sm:text-base">
            {teacherData.longDescription?.substring(0, 60) + "..."}
          </p>

          <div className="flex flex-col md:flex-row gap-3 justify-center items-center mt-6">
            <div
              className={`inline-block px-4 py-2 rounded-full text-sm sm:text-base ${
                teacherData.status === "pending"
                  ? "bg-yellow-100 dark:bg-yellow-900 text-yellow-700 dark:text-yellow-300"
                  : "bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300"
              }`}
            >
              {teacherData.status === "pending" ? "Pending Approval" : "Active"}
            </div>

            <button
              onClick={() => setIsOpen(true)}
              className="w-full md:w-auto px-6 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 
                     dark:from-blue-500 dark:to-indigo-500 text-white rounded-lg shadow-md 
                     dark:shadow-gray-800 hover:shadow-lg dark:hover:shadow-gray-700
                     hover:brightness-110 transition duration-200 text-sm sm:text-base"
            >
              Send Request
            </button>
          </div>
        </div>

        {/* Body Section */}
        <div className="p-4 sm:p-8 grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
          {/* Left Column */}
          <div className="space-y-4 sm:space-y-6">
            <div className="bg-gray-50 dark:bg-gray-700 p-4 sm:p-6 rounded-lg border dark:border-gray-600 space-y-2 sm:space-y-3">
              <h2 className="text-lg sm:text-xl font-semibold text-gray-700 dark:text-gray-200 mb-2 border-b dark:border-gray-600 pb-1 sm:pb-2">
                Teacher Info
              </h2>

              <p className="flex items-center text-gray-700 dark:text-gray-300 text-sm sm:text-base">
                <FaEnvelope className="mr-2 sm:mr-3 text-gray-500 dark:text-gray-400" />
                {teacherData.teacherEmail || "N/A"}
              </p>

              <p className="flex items-center text-gray-700 dark:text-gray-300 text-sm sm:text-base">
                <FaStar className="mr-2 sm:mr-3 text-yellow-500" />
                Experience: {teacherData.experienceYears || 0} years
              </p>

              <p className="flex items-center text-gray-700 dark:text-gray-300 text-sm sm:text-base">
                <FaUserGraduate className="mr-2 sm:mr-3 text-blue-500" />
                Qualification: {teacherData.qualification || "N/A"}
              </p>

              <p className="flex items-center text-gray-700 dark:text-gray-300 text-sm sm:text-base">
                <FaMoneyBillWave className="mr-2 sm:mr-3 text-green-600 dark:text-green-500" />
                Salary: BDT {teacherData.salaryRange || "N/A"}{" "}
                <span
                  className={`ml-2 font-medium text-xs sm:text-sm ${
                    teacherData.salaryNegotiable
                      ? "text-green-600 dark:text-green-400"
                      : "text-red-600 dark:text-red-400"
                  }`}
                >
                  ({teacherData.salaryNegotiable ? "Negotiable" : "Fixed"})
                </span>
              </p>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-4 sm:space-y-6">
            <div className="bg-gray-50 dark:bg-gray-700 p-4 sm:p-6 rounded-lg border dark:border-gray-600 space-y-2 sm:space-y-3">
              <h2 className="text-lg sm:text-xl font-semibold text-gray-700 dark:text-gray-200 mb-2 border-b dark:border-gray-600 pb-1 sm:pb-2">
                About Me
              </h2>
              <p className="text-gray-700 dark:text-gray-300 text-sm sm:text-base leading-relaxed break-words">
                {teacherData.longDescription || "No description provided."}
              </p>
            </div>

            <div className="bg-gray-50 dark:bg-gray-700 p-4 sm:p-6 rounded-lg border dark:border-gray-600 text-gray-600 dark:text-gray-400 text-xs sm:text-sm">
              <p className="flex items-center">
                <FaCalendarPlus className="mr-2" />
                Profile Created On:{" "}
                {teacherData.createdAt
                  ? new Date(teacherData.createdAt).toLocaleDateString(
                      "en-US",
                      {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      }
                    )
                  : "N/A"}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Apply Modal */}
      <ApplyModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        classSubjectsMap={classSubjectsMap}
        selectedClassLevel={selectedClassLevel}
        setSelectedClassLevel={setSelectedClassLevel}
        availableSubjects={availableSubjects}
        onSubmitData={handleStudentApply}
      />
    </div>
  );
};

export default TeacherProfileDetails;
