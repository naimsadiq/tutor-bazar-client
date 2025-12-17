// src/pages/TuitionDetails.jsx
import React from "react";
import { useNavigate, useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";
import {
  FaArrowLeft,
  FaBookOpen,
  FaLayerGroup,
  FaMapMarkerAlt,
  FaDollarSign,
  FaUsers,
  FaUser,
  FaCalendarAlt,
  FaVenusMars,
  FaPhoneAlt,
  FaInfoCircle,
} from "react-icons/fa";
import LoadingSpinner from "../../components/Shared/LoadingSpinner";

const TuitionDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  // --- Data Fetching ---
  const { data: post = {}, isLoading } = useQuery({
    queryKey: ["post", id],
    queryFn: async () => {
      // Use proper URL concatenation
      const result = await axiosSecure(`/student-post/${id}`);
      return result.data;
    },
  });


  // --- Apply Logic ---
  const handleApply = async (post) => {
    // Check if the user is logged in
    if (!user) {
      Swal.fire({
        title: "Authentication Required",
        text: "Please log in to apply for tuition.",
        icon: "info",
        confirmButtonText: "Log In",
      }).then(() => navigate("/login"));
      return;
    }

    try {
      const res = await axiosSecure.get(
        `/teacher-profile-exists?email=${user.email}`
      );

      if (!res.data.exists) {
        Swal.fire({
          title: "Teacher Profile Required",
          text: "You must create your Teacher Profile before applying for a tuition post.",
          icon: "info",
          showCancelButton: true,
          confirmButtonText: "Create Profile",
          cancelButtonText: "Cancel",
        }).then((result) => {
          if (result.isConfirmed) {
            navigate("/dashboard/teacher-request");
          }
        });
        return;
      }
    } catch (error) {
      console.error("Error checking profile:", error);
      Swal.fire({
        title: "Error!",
        text: "Could not verify teacher profile. Please try again.",
        icon: "error",
      });
      return;
    }

    // Profile exists, proceed to confirmation
    Swal.fire({
      title: "Apply for Tuition?",
      text: "Do you want to submit your application now?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Apply Now",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        const appliedTutorsData = {
          studentName: post.studentName,
          studentEmail: post.studentEmail,
          subject: post.subject,
          tuitionId: post._id,
          tutorEmail: user.email,
          expectedSalary: post.budget,
          classLevel: post.classLevel,
        };

        // --- API Call to Apply ---
        axiosSecure
          .post("/apply-tutor", appliedTutorsData)
          .then((res) => {
            if (res.data.insertedId) {
              Swal.fire({
                title: "Application Submitted!",
                text: "Your application has been sent successfully.",
                icon: "success",
              });
            } else if (res.data.message === "Already applied!") {
              Swal.fire({
                title: "Already Applied!",
                text: "You have already applied for this tuition.",
                icon: "warning",
              });
            }
          })
          .catch((error) => {
            // Error case (e.g., 400 status from backend for duplicate)
            if (error.response?.data?.message === "Already applied!") {
              Swal.fire({
                title: "Already Applied!",
                text: "You have already applied for this tuition.",
                icon: "warning",
              });
            } else {
              console.error("Application error:", error);
              Swal.fire({
                title: "Error!",
                text: "Something went wrong during application. Please try again.",
                icon: "error",
              });
            }
          });
      }
    });
  };

  // --- Loading State ---
  if (isLoading) {
    return <LoadingSpinner />;
  }

  // Handle case where post is not found or empty
  if (!post || Object.keys(post).length === 0) {
    return (
      <div className="flex flex-col justify-center items-center h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 p-4">
        <p className="text-2xl mb-6 font-semibold">
          This tuition post was not found.
        </p>
        <button
          onClick={() => navigate("/tuitions")}
          className="bg-indigo-600 text-white py-3 px-6 rounded-lg hover:bg-indigo-700 transition-colors duration-300 shadow-md flex items-center"
        >
          <FaArrowLeft className="mr-2" /> Go Back to Listings
        </button>
      </div>
    );
  }

  // --- Rendered Component ---
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 p-4 sm:p-6 lg:p-10">
      <div className="container mx-auto max-w-5xl bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-6 sm:p-10">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="mb-8 flex items-center text-indigo-600 dark:text-indigo-400 font-semibold hover:text-indigo-800 dark:hover:text-indigo-200 transition-colors"
        >
          <FaArrowLeft className="h-5 w-5 mr-3" />
          Go Back
        </button>

        {/* Title */}
        <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-800 dark:text-white mb-8 border-b-4 border-indigo-500/50 pb-4">
          {post.title}
        </h1>

        {/* --- Key Details Grid --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 mb-10 p-6 bg-indigo-50 dark:bg-gray-700 rounded-xl">
          {/* Column 1: Tuition Specs */}
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-indigo-700 dark:text-indigo-300 border-b pb-2 mb-3">
              Tuition Requirements
            </h2>

            <DetailItem
              icon={FaBookOpen}
              label="Subject"
              value={post.subject}
              color="text-blue-600"
            />
            <DetailItem
              icon={FaLayerGroup}
              label="Class/Grade"
              value={post.classLevel}
              color="text-purple-600"
            />
            <DetailItem
              icon={FaMapMarkerAlt}
              label="Area"
              value={post.district}
              color="text-red-600"
            />
            <DetailItem
              icon={FaDollarSign}
              label="Salary Range"
              value={`${post.budget}`}
              color="text-green-600"
            />
            <DetailItem
              icon={FaUsers}
              label="Teachers Needed"
              value={post.numberOfTeachersNeeded || "1 Person"}
              color="text-teal-600"
            />
          </div>

          {/* Column 2: Post & Contact Info */}
          <div className="space-y-4 border-t md:border-t-0 md:border-l pt-4 md:pl-8 border-gray-300 dark:border-gray-600">
            <h2 className="text-xl font-bold text-indigo-700 dark:text-indigo-300 border-b pb-2 mb-3">
              Posting Information
            </h2>

            <DetailItem
              icon={FaUser}
              label="Posted By"
              value={post.postedBy || post.studentName}
              color="text-orange-600"
            />
            <DetailItem
              icon={FaCalendarAlt}
              label="Posting Date"
              value={new Date(
                post.datePosted || post.createdAt
              ).toLocaleDateString()}
              color="text-yellow-600"
            />
            <DetailItem
              icon={FaVenusMars}
              label="Tutor Gender"
              value={post.genderPreference || "Any"}
              color="text-pink-600"
            />
            <DetailItem
              icon={FaPhoneAlt}
              label="Contact Info"
              value={post.studentEmail || "Not specified"}
              color="text-cyan-600"
            />
          </div>
        </div>

        {/* --- Detailed Description --- */}
        <section className="mb-10 p-6 border rounded-xl border-gray-200 dark:border-gray-700">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 border-b pb-2 border-indigo-200 dark:border-indigo-800 flex items-center">
            <FaInfoCircle className="mr-3 text-indigo-500" /> Detailed
            Description
          </h3>
          <p className="text-gray-700 dark:text-gray-200 leading-relaxed text-lg">
            {post.description}
          </p>
        </section>

        {/* --- Special Requirements/Benefits --- */}
        <section className="mb-10 p-6 border rounded-xl border-gray-200 dark:border-gray-700">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 border-b pb-2 border-indigo-200 dark:border-indigo-800 flex items-center">
            <FaUsers className="mr-3 text-indigo-500" /> Special Requirements
          </h3>
          <ul className="list-disc list-inside text-gray-700 dark:text-gray-200 space-y-2 ml-4">
            {post.requirements && post.requirements.length > 0 ? (
              post.requirements.map((req, index) => <li key={index}>{req}</li>)
            ) : (
              <li>No special requirements mentioned.</li>
            )}
          </ul>
        </section>

        {/* --- Apply Button --- */}
        <div className="text-center pt-8 border-t border-gray-200 dark:border-gray-700">
          <button
            onClick={() => handleApply(post)}
            className="bg-green-600 text-white text-xl font-bold py-4 px-10 rounded-full hover:bg-green-700 transition-all duration-300 shadow-xl hover:shadow-2xl focus:outline-none focus:ring-4 focus:ring-green-500 focus:ring-offset-4 dark:focus:ring-offset-gray-900 transform hover:scale-[1.02]"
          >
            Apply for This Post
          </button>
        </div>
      </div>
    </div>
  );
};

// Helper component for cleaner detail rendering
const DetailItem = ({ icon: Icon, label, value, color }) => (
  <p className="flex items-start text-lg text-gray-700 dark:text-gray-200">
    <Icon className={`mt-1 mr-3 text-xl ${color} shrink-0`} />
    <span className="font-bold text-gray-900 dark:text-white mr-2 shrink-0">
      {label}:
    </span>{" "}
    <span className="wrap-break-word">{value}</span>
  </p>
);

export default TuitionDetails;
