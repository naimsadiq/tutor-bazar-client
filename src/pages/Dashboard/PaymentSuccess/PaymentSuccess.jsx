import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import { IoBagCheckOutline } from "react-icons/io5";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";
const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const axiosSecure = useAxiosSecure();

  const sessionId = searchParams.get("session_id");

  const [loading, setLoading] = useState(true);
  const [paymentData, setPaymentData] = useState(null);

  useEffect(() => {
    const savePayment = async () => {
      try {
        const res = await axiosSecure.post("/payment-success", { sessionId });
        setPaymentData(res.data);
      } catch (error) {
        console.log("Payment save error:", error);
      } finally {
        setLoading(false);
      }
    };

    if (sessionId) {
      savePayment();
    }
  }, [sessionId, axiosSecure]);

  if (loading) {
    return <LoadingSpinner></LoadingSpinner>;
  }

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="bg-white p-10 rounded-lg shadow-lg text-center">
        <IoBagCheckOutline className="w-16 h-16 text-green-500 mx-auto mb-4" />
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Payment Successful!
        </h1>
        <p className="text-gray-600 mb-6">
          Thank you! Your payment was successful. Your tuition booking is now
          confirmed.
        </p>

        <div className="bg-gray-100 p-4 rounded-lg shadow">
          <p className="text-gray-800 font-semibold">Transaction ID:</p>
          <p className="font-mono text-sm text-blue-600">
            {paymentData?.transactionId}
          </p>
        </div>
        <button
          onClick={() => (window.location.href = "/dashboard")}
          className="btn btn-primary mt-8"
        >
          Go to Dashboard
        </button>
      </div>
    </div>
  );
};

export default PaymentSuccess;
