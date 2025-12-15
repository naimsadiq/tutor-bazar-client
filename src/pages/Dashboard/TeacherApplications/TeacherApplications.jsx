import React from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";
import { toast } from "react-toastify";

const TeacherApplications = () => {
  // const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const {
    data: teacherApplication = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["teacherApplication"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/teacher-profile?role=admin`);
      return res.data;
    },
  });

  const handlePostAccept = async (id) => {
    try {
      const response = await axiosSecure.patch(`/teacher-profile/accept/${id}`);
      if (response.data.success) {
        refetch();
        toast("Post accepted successfully!");
      }
    } catch (error) {
      toast("Accept Error:", error);
      toast("Failed to accept post");
    }
  };

  const handlePostReject = async (id) => {
    try {
      const response = await axiosSecure.patch(`/teacher-profile/reject/${id}`);
      if (response.data.success) {
        refetch();
        toast("Post rejected successfully!");
      }
    } catch (error) {
      console.error("Reject Error:", error);
      toast("Failed to reject post");
    }
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Teacher Application</h1>

      <div className="overflow-x-auto">
        <table className="table-auto w-full border-collapse border border-gray-200">
          {/* head */}
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 border">#</th>
              <th className="px-4 py-2 border">Name</th>
              <th className="px-4 py-2 border">Qualification</th>
              <th className="px-4 py-2 border">Salary</th>
              <th className="px-4 py-2 border">Status</th>
              <th className="px-4 py-2 border">Action</th>
            </tr>
          </thead>
          <tbody>
            {teacherApplication.map((application, index) => (
              <tr key={application._id} className="hover:bg-gray-50">
                <td className="px-4 py-2 border">{index + 1}</td>
                <td className="px-4 py-2 border">{application.teacherName}</td>
                <td className="px-4 py-2 border">
                  {application.qualification}
                </td>
                <td className="px-4 py-2 border">{application.salaryRange}</td>
                <td className="px-4 py-2 border">{application.status}</td>
                <td className="px-4 py-2 border flex gap-2">
                  <button
                    onClick={() => handlePostAccept(application._id)}
                    className="btn btn-sm bg-green-500 hover:bg-green-600 text-white"
                  >
                    Accept
                  </button>
                  <button
                    onClick={() => handlePostReject(application._id)}
                    className="btn btn-sm bg-red-500 hover:bg-red-600 text-white"
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

export default TeacherApplications;
