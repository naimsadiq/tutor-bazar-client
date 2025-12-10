import React from "react";
// import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const TuitionManagement = () => {
  // const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: pendingPost = [], refetch } = useQuery({
    queryKey: ["pendingPost"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/student-post?role=admin`);
      return res.data;
    },
  });

  const handlePostAccept = async (id) => {
    try {
      const response = await axiosSecure.patch(`/student-post/accept/${id}`);
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
      const response = await axiosSecure.patch(`/student-post/reject/${id}`);
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
      <h1>Psot Management</h1>

      <div>
        <div className="overflow-x-auto">
          <table className="table table-zebra">
            {/* head */}
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Subject</th>
                <th>Stutas</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {pendingPost.map((post, index) => (
                <tr key={post._id}>
                  <th>{index + 1}</th>
                  <td>{post.studentName}</td>
                  <td>{post.subject}</td>
                  <td>{post.status}</td>
                  <td className="flex gap-3">
                    <button
                      onClick={() => handlePostAccept(post._id)}
                      className="btn"
                    >
                      Accept
                    </button>
                    <button
                      onClick={() => handlePostReject(post._id)}
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

export default TuitionManagement;
