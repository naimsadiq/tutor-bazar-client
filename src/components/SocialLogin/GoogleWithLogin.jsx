import React from "react";
import { FcGoogle } from "react-icons/fc";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useLocation, useNavigate } from "react-router";

const GoogleWithLogin = () => {
  const { signInWithGoogle } = useAuth();
  const axiosSecure = useAxiosSecure();
  const location = useLocation();
  const navigate = useNavigate();

  const handleGoogleSignIn = () => {
    signInWithGoogle()
      .then((result) => {
        console.log(result.user);

        // create user in the database
        const userInfo = {
          email: result.user.email,
          displayName: result.user.displayName,
          photoURL: result.user.photoURL,
          role: "student",
        };

        axiosSecure.post("/users", userInfo).then((res) => {
          console.log("user data has been stored", res.data);
          navigate(location.state || "/");
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="flex flex-col gap-3">
      <button
        onClick={handleGoogleSignIn}
        type="button"
        className="w-full text-gray-900 bg-white hover:bg-gray-100 border border-gray-300 
        focus:ring-4 focus:outline-none focus:ring-gray-200 font-medium rounded-lg text-sm 
        px-5 py-2.5 text-center inline-flex items-center justify-center 
        dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 
        dark:focus:ring-gray-700"
      >
        <FcGoogle className="w-5 h-5 mr-2" />
        Sign in with Google
      </button>
    </div>
  );
};

export default GoogleWithLogin;
