import React from "react";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const MyTuitions = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: myTuitions = [] } = useQuery({
    queryKey: ["MyTuitions", user],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/student-post?role=student&email=${user.email}`
      );
      return res.data;
    },
  });

  console.log(myTuitions);
  return (
    <div>
      <h1>My Tuition</h1>

      <div>
        <div className="overflow-x-auto">
          <table className="table table-zebra">
            {/* head */}
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Email</th>
                <th>Stutas</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {myTuitions.map((tuition, index) => (
                <tr key={tuition._id}>
                  <th>{index + 1}</th>
                  <td>{tuition.studentName}</td>
                  <td>{tuition.studentEmail}</td>
                  <td>{tuition.status}</td>
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

export default MyTuitions;
