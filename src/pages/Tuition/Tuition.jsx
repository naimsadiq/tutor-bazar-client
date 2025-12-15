import React, { useState } from "react";
import TuitionRequirementCard from "../../components/Card/TuitionRequirementCard";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const Tuition = () => {
  const axiosSecure = useAxiosSecure();
  const [searchText, setSearchText] = useState("");
  const [sortOrder, setSortOrder] = useState(""); // "low" or "high"

  const { data: tuitionPosts = [], isLoading } = useQuery({
    queryKey: ["tuitionPosts", searchText, sortOrder],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/student-post?search=${searchText}&role=public&sort=${sortOrder}`
      );
      return res.data;
    },
  });

  console.log(tuitionPosts);

  // if (isLoading) {
  //   return (
  //     <div className="max-w-9/12 mx-auto flex justify-center items-center h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
  //       <p className="text-xl">Loading tuition requirements...</p>
  //     </div>
  //   );
  // }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 p-4 sm:p-6 lg:p-8">
      <div className="container mx-auto pt-20">
        <h1 className="text-3xl sm:text-4xl mt-6 font-bold text-center mb-8 sm:mb-12 dark:text-white">
          Teacher Requirement Posts
        </h1>

        {/* Search + Sort */}
        <div className="flex flex-col sm:flex-row justify-between mb-9 gap-4">
          <input
            type="text"
            placeholder="Search by subject or class"
            className="px-4 py-2 border rounded w-full sm:w-1/2 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />

          <select
            className="px-4 py-2 border rounded w-full sm:w-1/4 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
          >
            <option value="">Sort by Budget</option>
            <option value="low">Budget Low → High</option>
            <option value="high">Budget High → Low</option>
          </select>
        </div>

        {tuitionPosts.length === 0 ? (
          <div className="text-center text-xl sm:text-2xl text-gray-600 dark:text-gray-400 mt-10">
            <p>বর্তমানে কোনো শিক্ষক প্রয়োজন পোস্ট নেই।</p>
            <p className="mt-2">নতুন পোস্টের জন্য অপেক্ষা করুন!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {isLoading && (
              <div className="max-w-9/12 mx-auto flex justify-center items-center h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
                <p className="text-xl">Loading tuition requirements...</p>
              </div>
            )}
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
