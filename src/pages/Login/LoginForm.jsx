import React from "react";
import { useForm } from "react-hook-form";
import Logo from "../../components/Shared/Logo/Logo";
import { Link, useLocation, useNavigate } from "react-router";
import useAuth from "../../hooks/useAuth";
import { toast } from "react-hot-toast";
import GoogleWithLogin from "../../components/SocialLogin/googleWithLogin";

const LoginForm = () => {
  const { signIn } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state || "/";
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // onSubmit function
  const onSubmit = async (data) => {
    const { email, password } = data;
    try {
      await signIn(email, password);
      navigate(from, { replace: true });
      toast.success("Login Successful");
    } catch (err) {
      console.log(err);
      toast.error(err?.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-10 sm:py-20 bg-gray-100 dark:bg-[#0F172A]">
      <div className="w-full max-w-[500px] bg-white dark:bg-[#1F2937] rounded-lg shadow-xl border border-gray-200 dark:border-gray-700">
        <div className="p-6 space-y-6 sm:p-8">
          <Logo />
          <h1 className="text-2xl text-center font-extrabold leading-tight text-gray-900 dark:text-white md:text-3xl">
            Sign in to your account
          </h1>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div>
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-semibold text-gray-700 dark:text-gray-300"
              >
                Your email
              </label>
              <input
                type="email"
                id="email"
                placeholder="Enter your email"
                className="bg-gray-50 border border-gray-300 text-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:text-white sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:placeholder-gray-400"
                {...register("email", { required: true })}
              />
              {errors.email && (
                <p className="text-red-500">Email is required</p>
              )}
            </div>

            <div>
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-semibold text-gray-700 dark:text-gray-300"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                placeholder="••••••••"
                className="bg-gray-50 border border-gray-300 text-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:text-white sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:placeholder-gray-400"
                {...register("password", { required: true, minLength: 6 })}
              />
              {errors.password?.type === "minLength" && (
                <p className="text-red-500">
                  Password must be 6 characters or longer
                </p>
              )}
            </div>

            <div className="flex items-center justify-end">
              <Link
                to="/forgot-password"
                className="text-sm font-medium text-blue-600 hover:underline dark:text-blue-500"
              >
                Forgot password?
              </Link>
            </div>

            <button
              type="submit"
              className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-500 dark:hover:bg-blue-600 dark:focus:ring-blue-800"
            >
              Sign in
            </button>

            <div className="relative flex py-3 items-center">
              <div className="flex-grow border-t border-gray-300 dark:border-gray-600"></div>
              <span className="flex-shrink mx-4 text-gray-500 dark:text-gray-400">
                or
              </span>
              <div className="flex-grow border-t border-gray-300 dark:border-gray-600"></div>
            </div>

            <GoogleWithLogin></GoogleWithLogin>
          </form>

          <p className="text-sm text-center font-light text-gray-500 dark:text-gray-400">
            Don't have an account yet?{" "}
            <Link
              to="/signup"
              className="font-medium text-blue-600 hover:underline dark:text-blue-500"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
