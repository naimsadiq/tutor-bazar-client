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

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading payments.</div>;

  return (
    <div className="overflow-x-auto p-4">
      <table className="min-w-full border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="px-4 py-2 border">Date</th>
            <th className="px-4 py-2 border">Student</th>
            <th className="px-4 py-2 border">Subject</th>
            <th className="px-4 py-2 border">Class Level</th>
            <th className="px-4 py-2 border">Amount (USD)</th>
          </tr>
        </thead>
        <tbody>
          {payments.map((p) => (
            <tr key={p._id}>
              <td className="px-4 py-2 border">
                {new Date(p.date).toLocaleDateString()}
              </td>
              <td className="px-4 py-2 border">{p.studentEmail}</td>
              <td className="px-4 py-2 border">{p.subject}</td>
              <td className="px-4 py-2 border">{p.classLevel}</td>
              <td className="px-4 py-2 border">{p.amount}</td>
            </tr>
          ))}

          {/* Total Row */}
          <tr className="font-bold bg-gray-100">
            <td className="px-4 py-2 border" colSpan={4}>
              Total Income
            </td>
            <td className="px-4 py-2 border">{totalIncome}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default TeacherIncomeTable;
