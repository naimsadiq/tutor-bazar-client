import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import TeacherCard from "../../components/Card/TeacherCard";

const LatestTeacherProfile = () => {
  const axiosSecure = useAxiosSecure();

  const { data: LatestTeacher = [] } = useQuery({
    queryKey: ["LatestTeacher"],
    queryFn: async () => {
      const result = await axiosSecure(
        `${import.meta.env.VITE_API_URL}/teacher-profile-latest`
      );
      return result.data;
    },
  });

  // console.log(LatestTeacher);
  return (
    <div className="max-w-7xl mx-auto">
      <h1 className="text-4xl font-bold text-gray-800 dark:text-white pt-15 pb-9">
        Latest Tuition Post
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {LatestTeacher.map((teacher) => (
          <TeacherCard key={teacher._id} teacher={teacher}></TeacherCard>
        ))}
      </div>
    </div>
  );
};

export default LatestTeacherProfile;
