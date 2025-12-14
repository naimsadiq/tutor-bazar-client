import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const TeacherIncomeTable = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data, isLoading, error } = useQuery({
    queryKey: ["teacherIncome", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/teacher-income-details?email=${user.email}`
      );
      return res.data;
    },
  });

  const payments = data?.payments || [];
  const totalIncome = data?.totalIncome || 0;

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 dark:border-blue-400"></div>
      </div>
    );

  if (error)
    return (
      <div className="text-center py-8">
        <div className="text-red-500 dark:text-red-400 text-xl">
          Error loading payments.
        </div>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          Please try again later.
        </p>
      </div>
    );

  return (
    <div className="overflow-x-auto p-4">
      <div className="mb-6 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-900 rounded-lg">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
          Payment History
        </h2>
        <div className="flex items-center gap-4">
          <div className="bg-white dark:bg-gray-700 px-4 py-2 rounded-lg shadow">
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Total Payments
            </p>
            <p className="text-2xl font-bold text-gray-800 dark:text-white">
              {payments.length}
            </p>
          </div>
          <div className="bg-white dark:bg-gray-700 px-4 py-2 rounded-lg shadow">
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Total Income
            </p>
            <p className="text-2xl font-bold text-green-600 dark:text-green-400">
              ${totalIncome}
            </p>
          </div>
        </div>
      </div>

      <table className="min-w-full border border-gray-300 dark:border-gray-700 rounded-lg overflow-hidden">
        <thead>
          <tr className="bg-gray-200 dark:bg-gray-800">
            <th className="px-4 py-3 border border-gray-300 dark:border-gray-700 text-left text-gray-700 dark:text-gray-300 font-semibold">
              Date
            </th>
            <th className="px-4 py-3 border border-gray-300 dark:border-gray-700 text-left text-gray-700 dark:text-gray-300 font-semibold">
              Student
            </th>
            <th className="px-4 py-3 border border-gray-300 dark:border-gray-700 text-left text-gray-700 dark:text-gray-300 font-semibold">
              Subject
            </th>
            <th className="px-4 py-3 border border-gray-300 dark:border-gray-700 text-left text-gray-700 dark:text-gray-300 font-semibold">
              Class Level
            </th>
            <th className="px-4 py-3 border border-gray-300 dark:border-gray-700 text-left text-gray-700 dark:text-gray-300 font-semibold">
              Amount (USD)
            </th>
          </tr>
        </thead>
        <tbody>
          {payments.length === 0 ? (
            <tr>
              <td
                colSpan={5}
                className="px-4 py-8 text-center border border-gray-300 dark:border-gray-700"
              >
                <div className="text-gray-500 dark:text-gray-400">
                  <svg
                    className="w-16 h-16 mx-auto text-gray-400 dark:text-gray-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1"
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    ></path>
                  </svg>
                  <p className="mt-4 text-lg">No payments found</p>
                  <p className="text-sm">
                    Your payment history will appear here
                  </p>
                </div>
              </td>
            </tr>
          ) : (
            <>
              {payments.map((p) => (
                <tr
                  key={p._id}
                  className="bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-150"
                >
                  <td className="px-4 py-3 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300">
                    {new Date(p.date).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-3 border border-gray-300 dark:border-gray-700">
                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center mr-3">
                        <span className="text-blue-600 dark:text-blue-300 font-bold">
                          {p.studentEmail?.charAt(0).toUpperCase()}
                        </span>
                      </div>
                      <span className="text-gray-700 dark:text-gray-300 truncate max-w-[150px]">
                        {p.studentEmail}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-3 border border-gray-300 dark:border-gray-700">
                    <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-300 rounded-full text-sm">
                      {p.subject}
                    </span>
                  </td>
                  <td className="px-4 py-3 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300">
                    {p.classLevel}
                  </td>
                  <td className="px-4 py-3 border border-gray-300 dark:border-gray-700">
                    <span className="font-bold text-green-600 dark:text-green-400">
                      ${p.amount}
                    </span>
                  </td>
                </tr>
              ))}

              {/* Total Row */}
              <tr className="font-bold bg-gray-100 dark:bg-gray-900">
                <td
                  className="px-4 py-3 border border-gray-300 dark:border-gray-700 text-gray-800 dark:text-gray-200"
                  colSpan={4}
                >
                  Total Income
                </td>
                <td className="px-4 py-3 border border-gray-300 dark:border-gray-700 text-green-600 dark:text-green-400">
                  ${totalIncome}
                </td>
              </tr>
            </>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TeacherIncomeTable;
