import React from "react";
import { FcGoogle } from "react-icons/fc";
import { FaApple } from "react-icons/fa";
import Logo from "../../components/Shared/Logo/Logo";
import { Link } from "react-router";
import { useForm } from "react-hook-form";

const SignUpForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    console.log(data);
  };
  return (
    <div className="min-h-screen bg-[#0F172A] flex items-center justify-center py-30">
      <div className="w-full max-w-[500px] bg-[#1F2937] rounded-lg shadow md:mt-0 xl:p-0 border border-gray-700">
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
          {/* Logo */}
          <Logo></Logo>

          {/* Header */}
          <h1 className="text-xl text-center my-5 font-bold leading-tight tracking-tight text-white md:text-2xl">
            Create your Account
          </h1>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-4 md:space-y-6"
          >
            {/* Input Grid */}
            <div className="grid gap-6 mb-6">
              <div>
                <label
                  htmlFor="fullName"
                  className="block mb-2 text-sm font-medium text-white"
                >
                  Full Name
                </label>
                <input
                  type="text"
                  name="fullName"
                  id="fullName"
                  className="bg-gray-700 border md:col-span-2 border-gray-600 text-white sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 placeholder-gray-400"
                  placeholder="Enter your name"
                  required=""
                  {...register("name", {
                    required: "Name is required",
                    maxLength: {
                      value: 20,
                      message: "Name cannot be too long",
                    },
                  })}
                />
                {errors.name && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.name.message}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-white"
                >
                  Your email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="bg-gray-700 border border-gray-600 text-white sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 placeholder-gray-400"
                  placeholder="Enter your email"
                  required=""
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                      message: "Please enter a valid email address.",
                    },
                  })}
                />
                {errors.email && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.email.message}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="country"
                  className="block mb-2 text-sm font-medium text-white"
                >
                  Country
                </label>
                <select
                  id="country"
                  className="bg-gray-700 border border-gray-600 text-white sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 placeholder-gray-400"
                  {...register("userRole")}
                >
                  <option disabled>Choose a Role</option>
                  <option>Student</option>
                  <option>Teacher</option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-white"
                >
                  Profile Image
                </label>
                <input
                  name="image"
                  type="file"
                  id="image"
                  accept="image/*"
                  className="bg-gray-700 border border-gray-600 text-white sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 placeholder-gray-400"
                  placeholder="Your Photo"
                  required=""
                  {...register("image", { required: true })}
                />
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-white"
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  className="bg-gray-700 border border-gray-600 text-white sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 placeholder-gray-400"
                  required=""
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters",
                    },
                  })}
                />
                {errors.password && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.password.message}
                  </p>
                )}
              </div>
            </div>

            {/* Divider */}
            <div className="relative flex py-2 items-center">
              <div className="grow border-t border-gray-600"></div>
              <span className="shrink mx-4 text-gray-400">or</span>
              <div className="grow border-t border-gray-600"></div>
            </div>

            {/* Social Buttons */}
            <div className="flex flex-col gap-3">
              <button
                type="button"
                className="text-white w-full bg-[#1F2937] hover:bg-gray-700 border border-gray-600 focus:ring-4 focus:outline-none focus:ring-gray-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center justify-center mr-2 mb-2"
              >
                <FcGoogle className="w-5 h-5 mr-2" />
                Sign up with Google
              </button>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            >
              Create an account
            </button>
          </form>
          <p className="text-sm text-center font-light text-gray-400">
            Already have an account?{" "}
            <Link
              to="/signin"
              className="font-medium text-blue-500 hover:underline"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUpForm;
