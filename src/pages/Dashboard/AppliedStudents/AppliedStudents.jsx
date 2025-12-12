import React from "react";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const AppliedStudents = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  // Fetch applied tutors
  const {
    data: appliedStudentData = [],
    isLoading,
    error,
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
        alert(" Accepted successfully!");
        // চাইলে এখানে state refresh বা query invalidate করতে পারেন
      }
    } catch (error) {
      console.error("Accept Error:", error);
      alert("Failed to accept post");
    }
  };

  const handleReject = async (id) => {
    try {
      const response = await axiosSecure.patch(`/apply-student/reject/${id}`);
      if (response.data.success) {
        refetch();
        alert("Post rejected successfully!");
        // state refresh বা query invalidate করতে পারেন
      }
    } catch (error) {
      console.error("Reject Error:", error);
      alert("Failed to reject post");
    }
  };
  // console.log(appliedStudentData);
  return (
    <div>
      <h1 className="text-2xl font-semibold mb-6">Applied Tutors</h1>

      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th>#</th>
              <th>Subject</th>
              <th>Student Email</th>
              <th>budget</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {appliedStudentData.map((data, index) => (
              <tr key={data._id}>
                <th>{index + 1}</th>
                <td>{data.subject}</td>
                <td>{data.studentEmail}</td>
                <td>{data.budget}</td>
                <td>{data.status}</td>
                <td className="flex gap-3">
                  <button
                    onClick={() => handleAccept(data._id)}
                    className="btn btn-success"
                  >
                    Accept
                  </button>
                  <button
                    onClick={() => handleReject(data._id)}
                    className="btn btn-error"
                  >
                    Reject
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AppliedStudents;
