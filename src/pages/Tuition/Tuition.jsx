import React from "react";
import TuitionRequirementCard from "../../components/Card/TuitionRequirementCard";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const Tuition = () => {
  const axiosSecure = useAxiosSecure();

  const { data: tuitionPosts = [], isLoading } = useQuery({
    queryKey: ["tuitionPosts"],
    queryFn: async () => {
      const result = await axiosSecure(
        `${import.meta.env.VITE_API_URL}/student-post`
      );
      return result.data;
    },
  });

  if (isLoading) {
    return (
      <div className="max-w-9/12 mx-auto flex justify-center items-center h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
        <p className="text-xl">Loading tuition requirements...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 p-4 sm:p-6 lg:p-8">
      <div className="container mx-auto">
        <h1 className="text-3xl sm:text-4xl font-bold text-center mb-8 sm:mb-12 dark:text-white">
          শিক্ষক প্রয়োজন পোস্টসমূহ
        </h1>

        {tuitionPosts.length === 0 ? (
          <div className="text-center text-xl sm:text-2xl text-gray-600 dark:text-gray-400 mt-10">
            <p>বর্তমানে কোনো শিক্ষক প্রয়োজন পোস্ট নেই।</p>
            <p className="mt-2">নতুন পোস্টের জন্য অপেক্ষা করুন!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {tuitionPosts.map((post) => (
              <TuitionRequirementCard key={post._id} post={post} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Tuition;
