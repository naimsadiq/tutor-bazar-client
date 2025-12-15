import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";

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

  if (isLoading) return <LoadingSpinner />;

  if (error) {
    return (
      <div className="text-center py-10">
        <p className="text-red-500 text-lg">Failed to load income data</p>
      </div>
    );
  }

  return (
    <div className="p-4 space-y-6">
      {/* -------- Summary -------- */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow">
          <p className="text-sm text-gray-500">Total Payments</p>
          <p className="text-3xl font-bold">{payments.length}</p>
        </div>

        <div className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow">
          <p className="text-sm text-gray-500">Total Income</p>
          <p className="text-3xl font-bold text-green-600">${totalIncome}</p>
        </div>
      </div>

      {/* -------- Desktop Table -------- */}
      <div className="hidden md:block overflow-x-auto rounded-xl shadow">
        <table className="min-w-full border">
          <thead className="bg-gray-100 dark:bg-gray-800">
            <tr>
              <th className="px-4 py-3 text-left">Date</th>
              <th className="px-4 py-3 text-left">Student</th>
              <th className="px-4 py-3 text-left">Subject</th>
              <th className="px-4 py-3 text-left">Class</th>
              <th className="px-4 py-3 text-left">Amount</th>
            </tr>
          </thead>

          <tbody>
            {payments.length === 0 ? (
              <tr>
                <td colSpan="5" className="py-10 text-center text-gray-500">
                  No payments found
                </td>
              </tr>
            ) : (
              <>
                {payments.map((p) => (
                  <tr
                    key={p._id}
                    className="bg-white dark:bg-gray-800 hover:bg-gray-50"
                  >
                    <td className="px-4 py-3">
                      {new Date(p.date).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-3 truncate max-w-[180px]">
                      {p.studentEmail}
                    </td>
                    <td className="px-4 py-3">
                      <span className="badge badge-info">{p.subject}</span>
                    </td>
                    <td className="px-4 py-3">{p.classLevel}</td>
                    <td className="px-4 py-3 font-bold text-green-600">
                      ${p.amount}
                    </td>
                  </tr>
                ))}

                <tr className="font-bold bg-gray-100 dark:bg-gray-900">
                  <td colSpan="4" className="px-4 py-3">
                    Total
                  </td>
                  <td className="px-4 py-3 text-green-600">${totalIncome}</td>
                </tr>
              </>
            )}
          </tbody>
        </table>
      </div>

      {/* -------- Mobile Cards -------- */}
      <div className="md:hidden space-y-4">
        {payments.length === 0 ? (
          <p className="text-center text-gray-500">No payments found</p>
        ) : (
          payments.map((p) => (
            <div
              key={p._id}
              className="bg-white dark:bg-gray-800 rounded-xl shadow p-4 space-y-2"
            >
              <p className="text-sm text-gray-500">
                {new Date(p.date).toLocaleDateString()}
              </p>

              <p className="break-all text-sm">
                <strong>Student:</strong> {p.studentEmail}
              </p>

              <div className="flex justify-between items-center">
                <span className="badge badge-info">{p.subject}</span>
                <span className="text-sm">{p.classLevel}</span>
              </div>

              <p className="font-bold text-green-600 text-lg">${p.amount}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default TeacherIncomeTable;
