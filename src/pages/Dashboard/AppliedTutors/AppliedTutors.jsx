import React, { useState } from "react";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { GoEye } from "react-icons/go";
import TuitorDetailsModal from "../../../components/Modal/TuitorDetailsModal";

const AppliedTutors = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const [openTutorEmail, setOpenTutorEmail] = useState(null);

  // Fetch applied tutors
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

  if (isLoading) return <p>Loading applied tutors...</p>;
  if (error) return <p>Failed to load applied tutors.</p>;
  if (appliedTutors.length === 0) return <p>No tutors have applied yet.</p>;

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-6">Applied Tutors</h1>

      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th>#</th>
              <th>Subject</th>
              <th>Tutor Email</th>
              <th>Tutor Details</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {appliedTutors.map((tutor, index) => (
              <tr key={tutor._id}>
                <th>{index + 1}</th>
                <td>{tutor.subject}</td>
                <td>{tutor.tutorEmail}</td>
                <td>
                  <button
                    onClick={() => setOpenTutorEmail(tutor.tutorEmail)}
                    className="btn flex items-center gap-2"
                  >
                    <GoEye /> View
                  </button>
                </td>
                <td>{tutor.status}</td>
                <td className="flex gap-3">
                  <button className="btn btn-success">Accept</button>
                  <button className="btn btn-error">Reject</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal at root level */}
      {openTutorEmail && (
        <TuitorDetailsModal
          isOpen={true}
          closeModal={() => setOpenTutorEmail(null)}
          email={openTutorEmail}
        />
      )}
    </div>
  );
};

export default AppliedTutors;
