import React from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import TuitionRequirementCard from "../../components/Card/TuitionRequirementCard";

const LatestTuitionPosts = () => {
  const axiosSecure = useAxiosSecure();

  const { data: latestPosts = [] } = useQuery({
    queryKey: ["latestPosts"],
    queryFn: async () => {
      const result = await axiosSecure(
        `${import.meta.env.VITE_API_URL}/student-post?role=public`
      );
      return result.data;
    },
  });
  return (
    <div>
      <h1 className="text-3xl">latest tuition post</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {latestPosts.map((post) => (
          <TuitionRequirementCard
            key={post._id}
            post={post}
          ></TuitionRequirementCard>
        ))}
      </div>
    </div>
  );
};

export default LatestTuitionPosts;
