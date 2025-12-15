import { Navigate } from "react-router";
import useAuth from "../hooks/useAuth";
import useRole from "../hooks/useRole";
import LoadingSpinner from "../components/Shared/LoadingSpinner";
import Forbidden from "../components/Forbidden/Forbidden";

const StudnetRoute = ({ children }) => {
  const { loading, user } = useAuth();
  const { role, roleLoading } = useRole();

  if (loading || !user || roleLoading) {
    return <LoadingSpinner></LoadingSpinner>;
  }

  if (role !== "student") {
    return <Forbidden></Forbidden>;
  }

  return children;
};

export default StudnetRoute;
