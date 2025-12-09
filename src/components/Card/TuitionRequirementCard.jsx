// components/Card/TuitionRequirementCard.jsx
import React from "react";
import { useNavigate } from "react-router";

const TuitionRequirementCard = ({ post }) => {
  const navigete = useNavigate();

  const handleTuitionDetails = (id) => {
    navigete(`/tutor-request/${id}`);
  };
  // console.log(post);
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 p-5 border border-gray-200 dark:border-gray-700">
      <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
        {post.title}
      </h2>
      <p className="text-gray-600 dark:text-gray-300 mb-1">
        <span className="font-medium">বিষয়:</span> {post.subject}
      </p>
      <p className="text-gray-600 dark:text-gray-300 mb-1">
        <span className="font-medium">ক্লাস:</span> {post.classLevel}
      </p>
      <p className="text-gray-600 dark:text-gray-300 mb-1">
        <span className="font-medium">এলাকা:</span> {post.district}
      </p>
      <p className="text-gray-600 dark:text-gray-300 mb-1">
        <span className="font-medium">বেতন:</span> {post.budget}
      </p>
      <p className="text-gray-700 dark:text-gray-200 mt-3 text-sm">
        {post.description}
      </p>
      <div className="mt-4 flex justify-between items-center text-sm text-gray-500 dark:text-gray-400">
        <span>পোস্ট করেছেন: {post.studentName}</span>
        <span>তারিখ: {new Date(post.createdAt).toLocaleDateString()}</span>
      </div>
      <button
        onClick={() => handleTuitionDetails(post._id)}
        className="mt-4 w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
      >
        বিস্তারিত দেখুন
      </button>
    </div>
  );
};

export default TuitionRequirementCard;
