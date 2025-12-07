import React from "react";
import { FcGoogle } from "react-icons/fc";
import { FaApple } from "react-icons/fa";
import Logo from "../../components/Shared/Logo/Logo";
import { Link, useLocation, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { imageUpload } from "../../../utils";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const SignUpForm = () => {
  const { createUser, updateUserProfile, signInWithGoogle, loading } =
    useAuth();
  // const navigate = useNavigate();
  // const location = useLocation();
  // const from = location.state || "/";
  const axiosSecure = useAxiosSecure();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    const { name, image, email, userRole, password } = data;
    const imageFile = image[0];

    try {
      // 1. Firebase signup
      await createUser(email, password);

      // 2. Upload image
      const imageURL = await imageUpload(imageFile);

      // 3. Update Firebase user profile
      await updateUserProfile(name, imageURL);

      // 4. Save user to database (without password)
      const userInfo = {
        name,
        imageURL,
        email,
        role: userRole,
        createdAt: new Date(),
      };

      const res = await axiosSecure.post("/users", userInfo);

      if (res.data.insertedId) {
        toast.success("Signup Successful");
      }

      // navigate(from, { replace: true });
    } catch (err) {
      console.log(err);
      toast.error(err?.message || "Something went wrong");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-10 sm:py-20 bg-gray-100 dark:bg-[#0F172A]">
      <div className="w-full max-w-[500px] bg-white dark:bg-[#1F2937] rounded-lg shadow-xl border border-gray-200 dark:border-gray-700">
        <div className="p-6 space-y-6 sm:p-8">
          {/* Logo */}
          <Logo />

          {/* Header */}
          <h1 className="text-2xl text-center font-extrabold leading-tight text-gray-900 dark:text-white md:text-3xl">
            Create Your Account
          </h1>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* Input Grid */}
            <div className="grid gap-5">
              {/* Full Name */}
              <div>
                <label
                  htmlFor="fullName"
                  className="block mb-2 text-sm font-semibold text-gray-700 dark:text-gray-300"
                >
                  Full Name
                </label>
                <input
                  type="text"
                  name="fullName"
                  id="fullName"
                  className="bg-gray-50 border border-gray-300 text-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:text-white sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:placeholder-gray-400"
                  placeholder="Enter your name"
                  {...register("name", {
                    required: "Name is required",
                    maxLength: {
                      value: 20,
                      message: "Name cannot be too long",
                    },
                  })}
                />
                {errors.name && (
                  <p className="text-red-600 text-xs mt-1">
                    {errors.name.message}
                  </p>
                )}
              </div>

              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-semibold text-gray-700 dark:text-gray-300"
                >
                  Your email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:text-white sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:placeholder-gray-400"
                  placeholder="Enter your email"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                      message: "Please enter a valid email address.",
                    },
                  })}
                />
                {errors.email && (
                  <p className="text-red-600 text-xs mt-1">
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* Country/Role Select */}
              <div>
                <label
                  htmlFor="userRole"
                  className="block mb-2 text-sm font-semibold text-gray-700 dark:text-gray-300"
                >
                  Role
                </label>
                <select
                  id="userRole"
                  className="bg-gray-50 border border-gray-300 text-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:text-white sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:placeholder-gray-400"
                  {...register("userRole", { required: "rule id required" })}
                >
                  <option value="">Choose a Role</option>
                  <option value="student">Student</option>
                  <option value="teacher">Teacher</option>
                </select>
              </div>

              {/* Profile Image */}
              <div>
                <label
                  htmlFor="image"
                  className="block mb-2 text-sm font-semibold text-gray-700 dark:text-gray-300"
                >
                  Profile Image
                </label>
                <input
                  name="image"
                  type="file"
                  id="image"
                  accept="image/*"
                  className="bg-gray-50 border border-gray-300 text-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:text-white sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                  {...register("image", {
                    required: "Profile image is required",
                  })}
                />
                {errors.image && (
                  <p className="text-red-600 text-xs mt-1">
                    {errors.image.message}
                  </p>
                )}
              </div>

              {/* Password */}
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-semibold text-gray-700 dark:text-gray-300"
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:text-white sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:placeholder-gray-400"
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters",
                    },
                  })}
                />
                {errors.password && (
                  <p className="text-red-600 text-xs mt-1">
                    {errors.password.message}
                  </p>
                )}
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-500 dark:hover:bg-blue-600 dark:focus:ring-blue-800"
            >
              Create an account
            </button>
          </form>

          {/* Divider */}
          <div className="relative flex py-3 items-center">
            <div className="flex-grow border-t border-gray-300 dark:border-gray-600"></div>
            <span className="flex-shrink mx-4 text-gray-500 dark:text-gray-400">
              or
            </span>
            <div className="flex-grow border-t border-gray-300 dark:border-gray-600"></div>
          </div>

          {/* Social Buttons */}
          <div className="flex flex-col gap-3">
            <button
              type="button"
              className="w-full text-gray-900 bg-white hover:bg-gray-100 border border-gray-300 focus:ring-4 focus:outline-none focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center justify-center dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-700"
            >
              <FcGoogle className="w-5 h-5 mr-2" />
              Sign up with Google
            </button>
          </div>

          <p className="text-sm text-center font-light text-gray-500 dark:text-gray-400">
            Already have an account?{" "}
            <Link
              to="/signin"
              className="font-medium text-blue-600 hover:underline dark:text-blue-500"
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
