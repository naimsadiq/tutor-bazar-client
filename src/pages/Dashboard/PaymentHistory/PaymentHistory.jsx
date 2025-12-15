import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";

const PaymentHistory = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const {
    data: payments = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["paymentHistory", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/payment-history?email=${user?.email}`
      );
      return res.data;
    },
  });

  if (isLoading) {
    return <LoadingSpinner />;
  }
  if (error) return <p>Failed to load history.</p>;
  if (payments.length === 0) return <p>No payment history found.</p>;

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-100">
        Payment History
      </h2>

      {/* ---------- Desktop Table ---------- */}
      <div className="hidden md:block overflow-x-auto rounded-xl shadow">
        <table className="table table-zebra w-full">
          <thead className="bg-gray-100 dark:bg-gray-800">
            <tr>
              <th>#</th>
              <th>Subject</th>
              <th>Amount</th>
              <th>Payment Status</th>
              <th>Transaction ID</th>
              <th>Date</th>
              <th>Tutor Email</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((p, index) => (
              <tr
                key={p._id}
                className="bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700"
              >
                <td>{index + 1}</td>
                <td>{p.subject || "N/A"}</td>
                <td>${p.amount}</td>
                <td>
                  <span
                    className={`badge ${
                      p.paymentStatus === "success"
                        ? "badge-success"
                        : p.paymentStatus === "pending"
                        ? "badge-warning"
                        : "badge-error"
                    }`}
                  >
                    {p.paymentStatus}
                  </span>
                </td>
                <td>{p.transactionId}</td>
                <td>{new Date(p.date).toLocaleString()}</td>
                <td>{p.tutorEmail}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ---------- Mobile Cards ---------- */}
      <div className="md:hidden space-y-4">
        {payments.map((p, index) => (
          <div
            key={p._id}
            className="bg-white dark:bg-gray-800 rounded-xl shadow p-4 space-y-2"
          >
            <div className="flex justify-between">
              <span className="font-semibold text-gray-800 dark:text-gray-100">
                {p.subject || "N/A"}
              </span>
              <span className="text-sm text-gray-500">#{index + 1}</span>
            </div>

            <p className="text-sm text-gray-600 dark:text-gray-300">
              <strong>Amount:</strong> ${p.amount}
            </p>

            <p className="text-sm">
              <strong>Status:</strong>{" "}
              <span
                className={`badge ${
                  p.paymentStatus === "success"
                    ? "badge-success"
                    : p.paymentStatus === "pending"
                    ? "badge-warning"
                    : "badge-error"
                }`}
              >
                {p.paymentStatus}
              </span>
            </p>

            <p className="text-sm text-gray-600 dark:text-gray-300">
              <strong>Transaction ID:</strong> {p.transactionId}
            </p>

            <p className="text-sm text-gray-600 dark:text-gray-300">
              <strong>Date:</strong> {new Date(p.date).toLocaleString()}
            </p>

            <p className="text-sm text-gray-600 dark:text-gray-300">
              <strong>Tutor Email:</strong> {p.tutorEmail}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PaymentHistory;
