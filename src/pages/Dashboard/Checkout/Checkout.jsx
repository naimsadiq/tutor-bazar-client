import React from "react";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const Checkout = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  // Fetch applied tutors
  const {
    data: StudentData = [],
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["StudentData", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/apply-student?studentEmail=${user?.email}`
      );
      return res.data;
    },
  });

  const handlePayment = async (data) => {
    const paymentInfo = {
      paymentType: "applyStudentPayment", //⭐ খুব গুরুত্বপূর্ণ
      applyId: data._id, //⭐ applied-students এর _id
      studentEmail: user?.email,
      tutorEmail: data.tutorEmail,
      subject: data.subject,
      price: data.budget,
      expectedSalary: data.expectedSalary,
      qualification: data.qualification,
      studentName: user?.displayName,
      image: user?.photoURL,
      classLevel: data.classLevel,
    };

    const { data: res } = await axiosSecure.post(
      "/create-checkout-session",
      paymentInfo
    );

    window.location.assign(res.url);
  };

  console.log(StudentData);
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
            {StudentData.map((data, index) => (
              <tr key={data._id}>
                <th>{index + 1}</th>
                <td>{data.subject}</td>
                <td>{data.studentEmail}</td>
                <td>{data.budget}</td>
                <td>{data.status}</td>
                <td className="flex gap-3">
                  {data.status === "pending" ? (
                    <button className="btn btn-warning cursor-not-allowed">
                      Waiting
                    </button>
                  ) : data.status === "rejected" ? (
                    <button className="btn btn-error cursor-not-allowed">
                      Rejected
                    </button>
                  ) : data.status === "approved" ? (
                    <button
                      onClick={() => handlePayment(data)}
                      className="btn btn-success mr-2"
                    >
                      Pay
                    </button>
                  ) : (
                    <button className="btn btn-gray cursor-not-allowed">
                      N/A
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Checkout;
