import React from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import TuitionRequirementCard from "../../components/Card/TuitionRequirementCard";
import LoadingSpinner from "../../components/Shared/LoadingSpinner";

const LatestTuitionPosts = () => {
  const axiosSecure = useAxiosSecure();

  const { data: latestPosts = [], isLoading } = useQuery({
    queryKey: ["latestPosts"],
    queryFn: async () => {
      const result = await axiosSecure(`/student-post-latest`);
      return result.data;
    },
  });

  // console.log(latestPosts);

  if (isLoading) {
    return <LoadingSpinner />;
  }
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-0 lg:pt-[100px] pt-9">
      <h1 className="text-2xl sm:text-4xl font-bold text-gray-800 dark:text-white pb-6 sm:pb-9">
        Latest Tuition Post
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
        {latestPosts.map((post) => (
          <TuitionRequirementCard key={post._id} post={post} />
        ))}
      </div>
    </div>
  );
};

export default LatestTuitionPosts;
