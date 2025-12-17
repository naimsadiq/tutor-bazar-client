import React from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import TeacherCard from "../../components/Card/TeacherCard";
import LoadingSpinner from "../../components/Shared/LoadingSpinner";

const TeacherListingPage = () => {
  const axiosSecure = useAxiosSecure();

  const { data: teacherProfiles = [], isLoading } = useQuery({
    queryKey: ["teacherProfiles"],
    queryFn: async () => {
      const result = await axiosSecure(`/teacher-profile?role=public`);
      return result.data;
    },
  });

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 pt-[70px] transition-colors duration-300">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-center mb-8 sm:mb-10 text-gray-800 dark:text-white">
          Our Available Teachers
        </h2>

        {teacherProfiles.length === 0 ? (
          <p className="text-center text-lg sm:text-xl text-gray-600 dark:text-gray-400">
            No Teachers Available
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 sm:gap-8">
            {teacherProfiles.map((teacher) => (
              <TeacherCard key={teacher._id} teacher={teacher} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TeacherListingPage;
