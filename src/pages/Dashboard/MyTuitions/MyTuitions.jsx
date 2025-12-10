import React from "react";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const MyTuitions = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: MyTuitions = [] } = useQuery({
    queryKey: ["MyTuitions", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/tutor-request?email=${user?.email}`);
      return res.data;
    },
  });

  console.log(MyTuitions);
  return (
    <div>
      <h1>hi</h1>
    </div>
  );
};

export default MyTuitions;
