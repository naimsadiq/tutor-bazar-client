import React from "react";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";

const MyTuitions = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: myTuitions = [], isLoading } = useQuery({
    queryKey: ["MyTuitions", user],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/student-post?role=student&email=${user.email}`
      );
      return res.data;
    },
  });

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="p-4 sm:p-6 md:p-8">
      <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-gray-100 mb-6">
        My Tuition
      </h1>

      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300 dark:border-gray-700 rounded-lg overflow-hidden">
          <thead className="bg-gray-200 dark:bg-gray-800">
            <tr>
              <th className="px-4 py-3 border border-gray-300 dark:border-gray-700 text-left text-gray-700 dark:text-gray-300 font-semibold">
                #
              </th>
              <th className="px-4 py-3 border border-gray-300 dark:border-gray-700 text-left text-gray-700 dark:text-gray-300 font-semibold">
                Name
              </th>
              <th className="px-4 py-3 border border-gray-300 dark:border-gray-700 text-left text-gray-700 dark:text-gray-300 font-semibold">
                Email
              </th>
              <th className="px-4 py-3 border border-gray-300 dark:border-gray-700 text-left text-gray-700 dark:text-gray-300 font-semibold">
                Status
              </th>
              <th className="px-4 py-3 border border-gray-300 dark:border-gray-700 text-left text-gray-700 dark:text-gray-300 font-semibold">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {myTuitions.length === 0 ? (
              <tr>
                <td
                  colSpan={5}
                  className="px-4 py-6 text-center text-gray-500 dark:text-gray-400"
                >
                  No tuitions found.
                </td>
              </tr>
            ) : (
              myTuitions.map((tuition, index) => (
                <tr
                  key={tuition._id}
                  className="bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-150"
                >
                  <td className="px-4 py-3 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300">
                    {index + 1}
                  </td>
                  <td className="px-4 py-3 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300">
                    {tuition.studentName}
                  </td>
                  <td className="px-4 py-3 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 truncate max-w-[200px]">
                    {tuition.studentEmail}
                  </td>
                  <td className="px-4 py-3 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 capitalize">
                    {tuition.status}
                  </td>
                  <td className="px-4 py-3 border border-gray-300 dark:border-gray-700 flex gap-2">
                    <button className="btn btn-sm bg-blue-600 hover:bg-blue-700 text-white">
                      Edit
                    </button>
                    <button className="btn btn-sm bg-red-600 hover:bg-red-700 text-white">
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyTuitions;
