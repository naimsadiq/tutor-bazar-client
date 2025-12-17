import React from "react";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";
import { toast } from "react-toastify";

const AppliedStudents = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const {
    data: appliedStudentData = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["appliedStudentData", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/apply-student?tutorEmail=${user?.email}`
      );
      return res.data;
    },
  });

  const handleAccept = async (id) => {
    try {
      const response = await axiosSecure.patch(`/apply-student/accept/${id}`);
      if (response.data.success) {
        refetch();
        toast("Accepted successfully!");
      }
    } catch (error) {
      console.error("Accept Error:", error);
      toast("Failed to accept post");
    }
  };

  const handleReject = async (id) => {
    try {
      const response = await axiosSecure.patch(`/apply-student/reject/${id}`);
      if (response.data.success) {
        refetch();
        toast("Post rejected successfully!");
      }
    } catch (error) {
      console.error("Reject Error:", error);
      toast("Failed to reject post");
    }
  };

  if (isLoading) return <LoadingSpinner />;

  if (!appliedStudentData.length)
    return (
      <p className="text-center text-gray-500 dark:text-gray-400 mt-8">
        No applied students yet.
      </p>
    );

  return (
    <div className="w-full">
      <h1 className="text-2xl font-semibold mb-6 text-gray-800 dark:text-white">
        Applied Students
      </h1>

      {/* ---------- Desktop Table ---------- */}
      <div className="hidden md:block overflow-x-auto rounded-xl shadow">
        <table className="min-w-full table-auto border border-gray-300 dark:border-gray-700 rounded-lg overflow-hidden">
          <thead className="bg-gray-100 dark:bg-gray-800">
            <tr>
              <th className="px-4 py-3 text-left text-gray-700 dark:text-gray-300 font-semibold">
                #
              </th>
              <th className="px-4 py-3 text-left text-gray-700 dark:text-gray-300 font-semibold">
                Subject
              </th>
              <th className="px-4 py-3 text-left text-gray-700 dark:text-gray-300 font-semibold">
                Student Email
              </th>
              <th className="px-4 py-3 text-left text-gray-700 dark:text-gray-300 font-semibold">
                Budget
              </th>
              <th className="px-4 py-3 text-left text-gray-700 dark:text-gray-300 font-semibold">
                Status
              </th>
              <th className="px-4 py-3 text-left text-gray-700 dark:text-gray-300 font-semibold">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {appliedStudentData.map((data, index) => (
              <tr
                key={data._id}
                className="bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                <td className="px-4 py-3">{index + 1}</td>
                <td className="px-4 py-3 font-medium">{data.subject}</td>
                <td className="px-4 py-3 text-sm break-all">
                  {data.studentEmail}
                </td>
                <td className="px-4 py-3">{data.budget}</td>
                <td className="px-4 py-3">{data.status}</td>
                <td className="px-4 py-3 flex gap-2">
                  <button
                    onClick={() => handleAccept(data._id)}
                    className="btn btn-sm btn-success"
                  >
                    Accept
                  </button>
                  <button
                    onClick={() => handleReject(data._id)}
                    className="btn btn-sm btn-error"
                  >
                    Reject
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ---------- Mobile Cards ---------- */}
      <div className="md:hidden space-y-4">
        {appliedStudentData.map((data, index) => (
          <div
            key={data._id}
            className="bg-white dark:bg-gray-800 rounded-xl shadow p-4 space-y-3"
          >
            <div className="flex justify-between items-center">
              <h3 className="font-semibold text-lg text-gray-800 dark:text-white">
                {data.subject}
              </h3>
              <span className="text-sm text-gray-500">#{index + 1}</span>
            </div>

            <p className="text-sm break-all text-gray-600 dark:text-gray-300">
              <strong>Student Email:</strong> {data.studentEmail}
            </p>

            <p className="text-sm">
              <strong>Budget:</strong> {data.budget}
            </p>

            <p className="text-sm">
              <strong>Status:</strong>{" "}
              <span
                className={`badge ${
                  data.status === "accepted" ? "badge-success" : "badge-warning"
                }`}
              >
                {data.status}
              </span>
            </p>

            <div className="flex flex-col sm:flex-row gap-2 pt-2">
              <button
                onClick={() => handleAccept(data._id)}
                className="btn btn-sm btn-success flex-1"
              >
                Accept
              </button>
              <button
                onClick={() => handleReject(data._id)}
                className="btn btn-sm btn-error flex-1"
              >
                Reject
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AppliedStudents;
