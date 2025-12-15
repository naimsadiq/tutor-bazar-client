import React, { useState } from "react";
import {
  FaEdit,
  FaUser,
  FaEnvelope,
  FaUserShield,
  FaCalendarAlt,
  FaCamera,
} from "react-icons/fa";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import { imageUpload } from "../../../../utils";

const DashboardHome = () => {
  const [isEditing, setIsEditing] = useState(false);
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  // User data from props or context (for demo, using static data)

  const { data: userData = {}, refetch } = useQuery({
    queryKey: ["user", user?.email],
    queryFn: async () => {
      if (!user?.email) return null;

      // Option 1: Using query parameter
      const res = await axiosSecure.get(`/user-profile?email=${user.email}`);
      return res.data;

      // Option 2: Using params (if you use /users/:email endpoint)
      // const res = await axiosSecure.get(`/users/${user.email}`);
      // return res.data;
    },
    enabled: !!user?.email, // Only run query if user exists
    retry: 2, // Retry failed requests 2 times
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: userData.name,
      email: userData.email,
    },
  });

  const onSubmit = async (data) => {
    const imageFile = data.image?.[0];
    let imageURL = userData.imageURL;

    if (imageFile) {
      imageURL = await imageUpload(imageFile);
      if (!imageURL) return; // Upload failed
    }

    try {
      const updatedData = {
        name: data.name,
        email: data.email,
        imageURL,
      };

      const res = await axiosSecure.patch(
        `/user-profile/?email=${user.email}`,
        updatedData
      );

      if (res.data.modifiedCount > 0) {
        refetch();
        Swal.fire({
          title: "Success!",
          text: "Profile updated successfully",
          icon: "success",
          confirmButtonColor: "#3085d6",
        });
        setIsEditing(false);
      } else {
        Swal.fire({
          title: "No changes",
          text: res.data.message,
          icon: "info",
          confirmButtonColor: "#3085d6",
        });
      }
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: error.response?.data?.message || error.message,
        icon: "error",
        confirmButtonColor: "#d33",
      });
    }
  };

  const handleEditClick = () => {
    setIsEditing(!isEditing);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-10 text-center">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
            My Profile
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Manage your account information
          </p>
        </div>

        <div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="grid grid-cols-1 lg:grid-cols-3 gap-8"
          >
            {/* Left Column - Profile Image */}
            <div className="lg:col-span-1">
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 sticky top-8">
                <div className="relative">
                  <div className="w-48 h-48 mx-auto rounded-full overflow-hidden border-4 border-white dark:border-gray-700 shadow-lg">
                    <img
                      src={userData.imageURL}
                      alt={userData.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {isEditing && (
                    <label className="absolute bottom-4 right-1/3 transform translate-x-1/2 bg-blue-600 dark:bg-blue-500 text-white p-3 rounded-full hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors shadow-lg cursor-pointer">
                      <FaCamera className="text-lg" />
                      <input
                        name="image"
                        type="file"
                        id="image"
                        accept="image/*"
                        className="hidden"
                        {...register("image")}
                      />
                    </label>
                  )}
                </div>

                <div className="mt-6 text-center">
                  <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
                    {userData.name}
                  </h2>
                  <div className="mt-2 inline-flex items-center gap-2 px-4 py-1 bg-linear-to-r from-purple-600 to-pink-600 dark:from-purple-500 dark:to-pink-500 text-white rounded-full">
                    <FaUserShield className="text-sm" />
                    <span className="font-medium">
                      {/* {console.log(userData.role.charAt(0)).toUpperCase()} */}
                      {userData?.role?.charAt(0)?.toUpperCase() +
                        userData?.role?.slice(1) || ""}
                    </span>
                  </div>
                </div>

                <div className="mt-8 space-y-4">
                  <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <span className="text-gray-600 dark:text-gray-400">
                      Account Status
                    </span>
                    <span className="px-3 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-300 rounded-full text-sm font-medium">
                      Active
                    </span>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <span className="text-gray-600 dark:text-gray-400">
                      Member Since
                    </span>
                    <span className="text-gray-800 dark:text-gray-300 font-medium">
                      {formatDate(userData.createdAt).split(",")[0]}
                    </span>
                  </div>
                </div>

                <button
                  onClick={handleEditClick} 
                  type="button"
                  className="mt-8 w-full py-3 bg-linear-to-r from-blue-600 to-indigo-600 dark:from-blue-500 dark:to-indigo-500 text-white font-semibold rounded-lg hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
                >
                  <FaEdit />
                  {isEditing ? "Cancel Editing" : "Edit Profile"}
                </button>
              </div>
            </div>

            {/* Right Column - Profile Details */}
            <div className="lg:col-span-2">
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                  <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
                    Personal Information
                  </h3>
                </div>

                <div className="p-6 space-y-6">
                  {/* Name Field */}
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 text-gray-700 dark:text-gray-300 font-medium">
                      <FaUser />
                      Full Name
                    </label>
                    {isEditing ? (
                      <div>
                        <input
                          type="text"
                          defaultValue={userData.name}
                          {...register("name")}
                          className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
                        />
                      </div>
                    ) : (
                      <p className="px-4 py-3 bg-gray-50 dark:bg-gray-700 rounded-lg text-gray-800 dark:text-gray-300">
                        {userData.name}
                      </p>
                    )}
                  </div>

                  {/* Email Field */}
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 text-gray-700 dark:text-gray-300 font-medium">
                      <FaEnvelope />
                      Email Address
                    </label>
                    {isEditing ? (
                      <div>
                        <input
                          type="email"
                          defaultValue={userData.email}
                          {...register("email")}
                          className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
                        />
                      </div>
                    ) : (
                      <p className="px-4 py-3 bg-gray-50 dark:bg-gray-700 rounded-lg text-gray-800 dark:text-gray-300">
                        {userData.email}
                      </p>
                    )}
                  </div>

                  {/* Role Field (Read Only) */}
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 text-gray-700 dark:text-gray-300 font-medium">
                      <FaUserShield />
                      Role
                    </label>
                    <div className="flex items-center gap-3 px-4 py-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <div
                        className={`px-3 py-1 rounded-full text-sm font-medium ${
                          userData.role === "admin"
                            ? "bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-300"
                            : "bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-300"
                        }`}
                      >
                        {userData?.role
                          ? userData.role.charAt(0).toUpperCase() +
                            userData.role.slice(1)
                          : ""}
                      </div>
                      <span className="text-gray-600 dark:text-gray-400 text-sm">
                        (Role cannot be changed)
                      </span>
                    </div>
                  </div>

                  {/* Account Creation Date */}
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 text-gray-700 dark:text-gray-300 font-medium">
                      <FaCalendarAlt />
                      Account Created
                    </label>
                    <p className="px-4 py-3 bg-gray-50 dark:bg-gray-700 rounded-lg text-gray-800 dark:text-gray-300">
                      {formatDate(userData.createdAt)}
                    </p>
                  </div>

                  {/* Save Button (Only show when editing) */}
                  {isEditing && (
                    <div className="pt-6 border-t border-gray-200 dark:border-gray-700">
                      <button
                        type="submit"
                        className="px-6 py-3 bg-green-600 hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600 text-white font-semibold rounded-lg transition-colors flex items-center gap-2"
                      >
                        Save Changes
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Additional Info Section */}
              <div className="mt-8 bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
                <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
                  Account Statistics
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 bg-linear-to-br from-blue-50 to-blue-100 dark:from-gray-700 dark:to-gray-800 rounded-lg">
                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                      Total Logins
                    </p>
                    <p className="text-2xl font-bold text-gray-800 dark:text-white mt-2">
                      1,247
                    </p>
                  </div>
                  <div className="p-4 bg-linear-to-br from-green-50 to-green-100 dark:from-gray-700 dark:to-gray-800 rounded-lg">
                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                      Active Sessions
                    </p>
                    <p className="text-2xl font-bold text-gray-800 dark:text-white mt-2">
                      3
                    </p>
                  </div>
                  <div className="p-4 bg-linear-to-br from-purple-50 to-purple-100 dark:from-gray-700 dark:to-gray-800 rounded-lg">
                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                      Days Active
                    </p>
                    <p className="text-2xl font-bold text-gray-800 dark:text-white mt-2">
                      45
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;
