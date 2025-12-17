import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import TeacherCard from "../../components/Card/TeacherCard";
import LoadingSpinner from "../../components/Shared/LoadingSpinner";

const LatestTeacherProfile = () => {
  const axiosSecure = useAxiosSecure();

  const { data: LatestTeacher = [], isLoading } = useQuery({
    queryKey: ["LatestTeacher"],
    queryFn: async () => {
      const result = await axiosSecure(`/teacher-profile-latest`);
      return result.data;
    },
  });

  if (isLoading) {
    return <LoadingSpinner />;
  }
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-0 pt-20">
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 dark:text-white pb-6 sm:pb-8">
        Latest Tuition Post
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 sm:gap-8">
        {LatestTeacher.map((teacher) => (
          <TeacherCard key={teacher._id} teacher={teacher} />
        ))}
      </div>
    </div>
  );
};

export default LatestTeacherProfile;
