import React from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const TeacherApplications = () => {
  // const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: teacherApplication = [], refetch } = useQuery({
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
        alert("Post accepted successfully!");
        // চাইলে এখানে state refresh বা query invalidate করতে পারেন
      }
    } catch (error) {
      console.error("Accept Error:", error);
      alert("Failed to accept post");
    }
  };

  const handlePostReject = async (id) => {
    try {
      const response = await axiosSecure.patch(`/teacher-profile/reject/${id}`);
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
  return (
    <div>
      <h1>Teacher Application</h1>

      <div>
        <div className="overflow-x-auto">
          <table className="table table-zebra">
            {/* head */}
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Qualification</th>
                <th>Salary</th>
                <th>Stutas</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {teacherApplication.map((application, index) => (
                <tr key={application._id}>
                  <th>{index + 1}</th>
                  <td>{application.teacherName}</td>
                  <td>{application.qualification}</td>
                  <td>{application.salaryRange}</td>
                  <td>{application.status}</td>
                  <td className="flex gap-3">
                    <button
                      onClick={() => handlePostAccept(application._id)}
                      className="btn"
                    >
                      Accept
                    </button>
                    <button
                      onClick={() => handlePostReject(application._id)}
                      className="btn"
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
    </div>
  );
};

export default TeacherApplications;
