import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";

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

  if (isLoading) return <p>Loading payment history...</p>;
  if (error) return <p>Failed to load history.</p>;
  if (payments.length === 0) return <p>No payment history found.</p>;

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Payment History</h2>

      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead>
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
              <tr key={p._id}>
                <td>{index + 1}</td>
                <td>{p.subject || "N/A"}</td>
                <td>${p.amount}</td>
                <td>{p.paymentStatus}</td>
                <td>{p.transactionId}</td>
                <td>{new Date(p.date).toLocaleString()}</td>
                <td>{p.tutorEmail}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PaymentHistory;
