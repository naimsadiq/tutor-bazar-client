// src/pages/TuitionDetails.jsx
import React from "react";
import { useNavigate, useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";

const TuitionDetails = () => {
  const { id } = useParams(); // URL থেকে পোস্টের ID নিন
  const navigate = useNavigate(); // প্রোগ্রাম্যাটিক্যালি নেভিগেট করার জন্য

  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: post = {}, isLoading } = useQuery({
    queryKey: ["post"],
    queryFn: async () => {
      const result = await axiosSecure(
        `${import.meta.env.VITE_API_URL}/student-post/${id}`
      );
      return result.data;
    },
  });

  const handleApply = async (post) => {
    // 🔍 Step 1: teacher profile check
    const res = await axiosSecure.get(
      `/teacher-profile-exists?email=${user.email}`
    );

    // ❌ profile নাই
    if (!res.data.exists) {
      // toast.error("আগে আপনার শিক্ষক প্রোফাইল তৈরি করুন");
      return navigate("/dashboard/teacher-request");
    }

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

        axiosSecure
          .post("/apply-tutor", appliedTutorsData)
          .then((res) => {
            // Success case
            if (res.data.insertedId) {
              Swal.fire({
                title: "Application Submitted!",
                text: "Your application has been sent successfully.",
                icon: "success",
              });
            } else if (res.data.message === "Already applied!") {
              // Duplicate check (if backend sends 200 for duplicate)
              Swal.fire({
                title: "Already Applied!",
                text: "You have already applied for this tuition.",
                icon: "warning",
              });
            }
          })
          .catch((error) => {
            // Axios considers status 400 as error
            if (error.response?.data?.message === "Already applied!") {
              Swal.fire({
                title: "Already Applied!",
                text: "You have already applied for this tuition.",
                icon: "warning",
              });
            } else {
              Swal.fire({
                title: "Error!",
                text: "Something went wrong. Please try again.",
                icon: "error",
              });
            }
          });

        console.log(appliedTutorsData);
      }
    });
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
        <p className="text-xl">Loading tuition details...</p>
      </div>
    );
  }

  // if (isError) {
  //   return (
  //     <div className="flex justify-center items-center h-screen bg-gray-100 dark:bg-gray-900 text-red-500">
  //       <p className="text-xl">Error: {error.message}</p>
  //       <button
  //         onClick={() => navigate(-1)} // আগের পেজে ফিরে যেতে
  //         className="ml-4 bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition-colors duration-300"
  //       >
  //         ফিরে যান
  //       </button>
  //     </div>
  //   );
  // }

  // if (!post) {
  //   return (
  //     <div className="flex justify-center items-center h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
  //       <p className="text-xl">এই পোস্টটি খুঁজে পাওয়া যায়নি।</p>
  //       <button
  //         onClick={() => navigate("/")} // হোম পেজে ফিরে যেতে
  //         className="ml-4 bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition-colors duration-300"
  //       >
  //         হোম পেজে যান
  //       </button>
  //     </div>
  //   );
  // }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 p-4 sm:p-6 lg:p-8">
      <div className="container mx-auto max-w-4xl bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 sm:p-8">
        <button
          onClick={() => navigate(-1)}
          className="mb-6 flex items-center text-indigo-600 dark:text-indigo-400 hover:underline"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-2"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
          ফিরে যান
        </button>

        <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 dark:text-white mb-6 border-b pb-4 border-gray-200 dark:border-gray-700">
          {post.title}
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="space-y-4">
            <p className="text-lg text-gray-700 dark:text-gray-200">
              <span className="font-semibold text-gray-900 dark:text-white">
                বিষয়:
              </span>{" "}
              {post.subject}
            </p>
            <p className="text-lg text-gray-700 dark:text-gray-200">
              <span className="font-semibold text-gray-900 dark:text-white">
                ক্লাস/শ্রেণী:
              </span>{" "}
              {post.classLevel}
            </p>
            <p className="text-lg text-gray-700 dark:text-gray-200">
              <span className="font-semibold text-gray-900 dark:text-white">
                এলাকা:
              </span>{" "}
              {post.location}
            </p>
            <p className="text-lg text-gray-700 dark:text-gray-200">
              <span className="font-semibold text-gray-900 dark:text-white">
                বেতন:
              </span>{" "}
              {post.salaryRange}
            </p>
            <p className="text-lg text-gray-700 dark:text-gray-200">
              <span className="font-semibold text-gray-900 dark:text-white">
                শিক্ষক প্রয়োজন:
              </span>{" "}
              {post.numberOfTeachersNeeded || "১ জন"}
            </p>
          </div>
          <div className="space-y-4">
            <p className="text-lg text-gray-700 dark:text-gray-200">
              <span className="font-semibold text-gray-900 dark:text-white">
                পোস্ট করেছেন:
              </span>{" "}
              {post.postedBy}
            </p>
            <p className="text-lg text-gray-700 dark:text-gray-200">
              <span className="font-semibold text-gray-900 dark:text-white">
                পোস্টিং তারিখ:
              </span>{" "}
              {new Date(post.datePosted).toLocaleDateString()}
            </p>
            <p className="text-lg text-gray-700 dark:text-gray-200">
              <span className="font-semibold text-gray-900 dark:text-white">
                শিক্ষকের লিঙ্গ:
              </span>{" "}
              {post.genderPreference || "যেকোনো"}
            </p>
            <p className="text-lg text-gray-700 dark:text-gray-200">
              <span className="font-semibold text-gray-900 dark:text-white">
                যোগাযোগ:
              </span>{" "}
              {post.contactInfo || "দেখা হয়নি"} {/* উদাহরণ: ফোন, ইমেল */}
            </p>
          </div>
        </div>

        <div className="mb-8">
          <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-3 border-b pb-2 border-gray-200 dark:border-gray-700">
            বিস্তারিত বিবরণ:
          </h3>
          <p className="text-gray-700 dark:text-gray-200 leading-relaxed">
            {post.description}
          </p>
        </div>

        <div className="mb-8">
          <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-3 border-b pb-2 border-gray-200 dark:border-gray-700">
            বিশেষ প্রয়োজন/সুবিধা:
          </h3>
          <ul className="list-disc list-inside text-gray-700 dark:text-gray-200 space-y-1">
            {post.requirements && post.requirements.length > 0 ? (
              post.requirements.map((req, index) => <li key={index}>{req}</li>)
            ) : (
              <li>কোনো বিশেষ প্রয়োজন উল্লেখ করা হয়নি।</li>
            )}
          </ul>
        </div>

        <div className="text-center mt-10">
          <button
            onClick={() => handleApply(post)}
            className="bg-green-600 text-white text-xl font-bold py-3 px-8 rounded-full hover:bg-green-700 transition-colors duration-300 shadow-lg hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-green-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
          >
            এই পোস্টের জন্য আবেদন করুন
          </button>
        </div>
      </div>
    </div>
  );
};

export default TuitionDetails;
