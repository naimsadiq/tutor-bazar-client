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

  const { data: teacherData = {} } = useQuery({
    queryKey: ["teacherData", id],
    queryFn: async () => {
      const result = await axiosSecure(`/teacher-profile/${id}`);
      return result.data;
    },
  });

  /** -------------------------
   * ✅ Handle Apply Submit
   * ------------------------- */
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

  return (
    <div className="min-h-screen bg-gray-100 p-6 md:p-10">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md border border-gray-200">
        {/* Header Section */}
        <div className="p-10 text-center border-b bg-white">
          <img
            src={teacherData.profilePhoto}
            alt={teacherData.teacherName}
            className="w-36 h-36 rounded-full mx-auto border-4 border-gray-100 shadow-sm object-cover"
          />

          <h1 className="text-3xl font-bold mt-4 text-gray-800">
            {teacherData.teacherName || "N/A"}
          </h1>

          <p className="text-gray-500 mt-2 max-w-xl mx-auto">
            {teacherData.longDescription?.substring(0, 60) + "..."}
          </p>

          <div className="flex gap-3 justify-center items-center">
            <div
              className={`mt-6 inline-block px-4 py-2 rounded-full ${
                teacherData.status === "pending"
                  ? "bg-yellow-100 text-yellow-700"
                  : "bg-green-100 text-green-700"
              }`}
            >
              {teacherData.status === "pending" ? "Pending Approval" : "Active"}
            </div>

            <button
              onClick={() => setIsOpen(true)}
              className="mt-6 w-full md:w-auto px-6 py-2 bg-linear-to-r from-blue-600 to-indigo-600 
                       text-white rounded-lg shadow-md hover:shadow-lg 
                       hover:brightness-110 transition duration-200"
            >
              Send Request
            </button>
          </div>
        </div>

        {/* Body Section */}
        <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left Column */}
          <div className="space-y-6">
            <div className="bg-gray-50 p-6 rounded-lg border space-y-3">
              <h2 className="text-xl font-semibold text-gray-700 mb-2 border-b pb-2">
                Teacher Info
              </h2>

              <p className="flex items-center text-gray-700">
                <FaEnvelope className="mr-3 text-gray-500" />
                {teacherData.teacherEmail || "N/A"}
              </p>

              <p className="flex items-center text-gray-700">
                <FaStar className="mr-3 text-yellow-500" />
                Experience: {teacherData.experienceYears || 0} years
              </p>

              <p className="flex items-center text-gray-700">
                <FaUserGraduate className="mr-3 text-blue-500" />
                Qualification: {teacherData.qualification || "N/A"}
              </p>

              <p className="flex items-center text-gray-700">
                <FaMoneyBillWave className="mr-3 text-green-600" />
                Salary: BDT {teacherData.salaryRange || "N/A"}{" "}
                <span
                  className={`ml-2 font-medium ${
                    teacherData.salaryNegotiable
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  ({teacherData.salaryNegotiable ? "Negotiable" : "Fixed"})
                </span>
              </p>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            <div className="bg-gray-50 p-6 rounded-lg border space-y-3">
              <h2 className="text-xl font-semibold text-gray-700 mb-2 border-b pb-2">
                About Me
              </h2>
              <p className="text-gray-700 leading-relaxed wrap-break-word">
                {teacherData.longDescription || "No description provided."}
              </p>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg border text-gray-600 text-sm">
              <p className="flex items-center">
                <FaCalendarPlus className="mr-2" />
                Profile Created On:{" "}
                {teacherData.createdAt
                  ? new Date(teacherData.createdAt).toLocaleDateString(
                      "en-US",
                      { year: "numeric", month: "long", day: "numeric" }
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
