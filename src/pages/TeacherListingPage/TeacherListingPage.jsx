import React from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import TeacherCard from "../../components/Card/TeacherCard";

const TeacherListingPage = () => {
  const axiosSecure = useAxiosSecure();

  const { data: teacherProfiles = [] } = useQuery({
    queryKey: ["teacherProfiles"],
    queryFn: async () => {
      const result = await axiosSecure(
        `${import.meta.env.VITE_API_URL}/teacher-profile?role=public`
      );
      return result.data;
    },
  });

  return (
    <div className="max-w-9/12 mx-auto min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
      {/* Navbar (Placeholder - You mentioned you have one) */}

      <div className="container mx-auto p-4 py-8">
        <h2 className="text-4xl font-extrabold text-center mb-10 text-gray-800 dark:text-white">
          আমাদের উপলব্ধ শিক্ষকবৃন্দ
        </h2>
        {teacherProfiles.length === 0 ? (
          <p className="text-center text-xl text-gray-600 dark:text-gray-400">
            কোনো শিক্ষক উপলব্ধ নেই।
          </p>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
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
