import { Navigate } from "react-router";
import LoadingSpinner from "../components/Shared/LoadingSpinner";
import useAuth from "../hooks/useAuth";
import useRole from "../hooks/useRole";
import Forbidden from "../components/Forbidden/Forbidden";

const TeacherRoute = ({ children }) => {
  const { loading, user } = useAuth();
  const { role, roleLoading } = useRole();

  if (loading || !user || roleLoading) {
    return <LoadingSpinner></LoadingSpinner>;
  }

  if (role !== "teacher") {
    return <Forbidden></Forbidden>;
  }

  return children;
};

export default TeacherRoute;
