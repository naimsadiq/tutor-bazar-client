import React from "react";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const AppliedTutors = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  console.log(user);
  const {
    data: appliedTutors = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["appliedTutors", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/applied-tutors?email=${user?.email}`);
      return res.data;
    },
  });

  console.log(appliedTutors);

  if (isLoading) return <p>Loading applied tutors...</p>;
  if (error) return <p>Failed to load applied tutors.</p>;
  if (appliedTutors.length === 0) return <p>No tutors have applied yet.</p>;

  return (
    <div>
      <h1> Applied Tuitor</h1>

      <div>
        <div className="overflow-x-auto">
          <table className="table table-zebra">
            {/* head */}
            <thead>
              <tr>
                <th>#</th>
                <th>Subject</th>
                <th>Tuitor Email</th>
                <th>Tuitor Details</th>
                <th>Stutas</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {appliedTutors.map((tuitor, index) => (
                <tr key={tuitor._id}>
                  <th>{index + 1}</th>
                  <td>{tuitor.subject}</td>
                  <td>{tuitor.tutorEmail}</td>
                  <td><button>view</button></td>
                  <td>{tuitor.status}</td>
                  <td className="flex gap-3">
                    <button className="btn">Edit</button>
                    <button className="btn">Delete</button>
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

export default AppliedTutors;
