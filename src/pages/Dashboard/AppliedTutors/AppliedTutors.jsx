import React, { useState } from "react";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { GoEye } from "react-icons/go";
import TuitorDetailsModal from "../../../components/Modal/TuitorDetailsModal";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";

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

  const handlePayment = async (tutor) => {
    const paymentInfo = {
      paymentType: "tuitionPayment", 
      tuitionId: tutor.tuitionId,
      studentEmail: user?.email,
      tutorEmail: tutor.tutorEmail,
      subject: tutor.subject,
      price: tutor.expectedSalary,
      studentName: user?.displayName,
      image: user?.photoURL,
      classLevel: tutor.classLevel,
    };

    const { data } = await axiosSecure.post(
      "/create-checkout-session",
      paymentInfo
    );

    window.location.assign(data.url);
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }
  if (error) return <p>Failed to load applied tutors.</p>;
  if (appliedTutors.length === 0) return <p>No tutors have applied yet.</p>;

  return (
    <div className="w-full">
      <h1 className="text-2xl font-semibold mb-6 text-gray-800 dark:text-white">
        Applied Tutors
      </h1>

      {/* ---------- Desktop Table ---------- */}
      <div className="hidden md:block overflow-x-auto rounded-xl shadow">
        <table className="table table-zebra w-full">
          <thead className="bg-gray-100 dark:bg-gray-800">
            <tr>
              <th>#</th>
              <th>Subject</th>
              <th>Email</th>
              <th>Details</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {appliedTutors.map((tutor, index) => (
              <tr key={tutor._id}>
                <th>{index + 1}</th>
                <td className="font-medium">{tutor.subject}</td>
                <td className="text-sm break-all">{tutor.tutorEmail}</td>
                <td>
                  <button
                    onClick={() => setOpenTutorEmail(tutor.tutorEmail)}
                    className="btn btn-sm btn-outline flex items-center gap-2"
                  >
                    <GoEye /> View
                  </button>
                </td>
                <td>
                  <span
                    className={`badge ${
                      tutor.status === "paid"
                        ? "badge-success"
                        : "badge-warning"
                    }`}
                  >
                    {tutor.status}
                  </span>
                </td>
                <td className="flex gap-2">
                  <button
                    onClick={() => handlePayment(tutor)}
                    className="btn btn-sm btn-success"
                  >
                    Accept
                  </button>
                  <button className="btn btn-sm btn-error">Reject</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ---------- Mobile Cards ---------- */}
      <div className="md:hidden space-y-4">
        {appliedTutors.map((tutor, index) => (
          <div
            key={tutor._id}
            className="bg-white dark:bg-gray-800 rounded-xl shadow p-4 space-y-3"
          >
            <div className="flex justify-between items-center">
              <h3 className="font-semibold text-lg text-gray-800 dark:text-white">
                {tutor.subject}
              </h3>
              <span className="text-sm text-gray-500">#{index + 1}</span>
            </div>

            <p className="text-sm break-all text-gray-600 dark:text-gray-300">
              <strong>Email:</strong> {tutor.tutorEmail}
            </p>

            <p className="text-sm">
              <strong>Status:</strong>{" "}
              <span
                className={`badge ${
                  tutor.status === "paid" ? "badge-success" : "badge-warning"
                }`}
              >
                {tutor.status}
              </span>
            </p>

            <div className="flex flex-wrap gap-2 pt-2">
              <button
                onClick={() => setOpenTutorEmail(tutor.tutorEmail)}
                className="btn btn-sm btn-outline flex-1"
              >
                <GoEye /> View
              </button>

              <button
                onClick={() => handlePayment(tutor)}
                className="btn btn-sm btn-success flex-1"
              >
                Accept
              </button>

              <button className="btn btn-sm btn-error flex-1">Reject</button>
            </div>
          </div>
        ))}
      </div>

      {/* ---------- Modal ---------- */}
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
