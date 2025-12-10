import React, { useState, useEffect, useMemo, useCallback } from "react";
import { useForm, useWatch } from "react-hook-form";
import Swal from "sweetalert2";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const TeacherRequest = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    // reset,
  } = useForm();

  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const [teachingLocations, setTeachingLocations] = useState([]);

  useEffect(() => {
    fetch("/servicesCenter.json") // Assuming this file contains region and district data
      .then((res) => res.json())
      .then((data) => {
        setTeachingLocations(data);
      });
  }, []);

  // Use useMemo for regions to avoid re-calculating on every render
  const regions = useMemo(() => {
    const regionsDuplicate = teachingLocations.map((c) => c.region);
    return [...new Set(regionsDuplicate)];
  }, [teachingLocations]);

  // useCallback for districtsByRegion to memoize the function
  const districtsByRegion = useCallback(
    (region) => {
      if (!region) return [];
      const regionDistricts = teachingLocations.filter(
        (c) => c.region === region
      );
      const districts = regionDistricts.map((d) => d.district);
      return [...new Set(districts)];
    },
    [teachingLocations]
  );

  const selectedRegion = useWatch({ control, name: "teachingAreaRegion" });
  const availableDistricts = districtsByRegion(selectedRegion);

  const qualificationOptions = [
    "HSC",
    "BSc Running",
    "BSc Completed",
    "MSc Running",
    "MSc Completed",
    "PhD",
    "Other",
  ];

  const onSubmit = (data) => {
    Swal.fire({
      title: "Become a Teacher!",
      text: "Do you want to submit your teacher profile now?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, submit!",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        const teacherData = {
          teacherName: user?.displayName,
          teacherEmail: user?.email,
          experienceYears: parseInt(data.experienceYears),
          qualification: data.qualification,
          salaryRange: data.salaryRange,
          salaryNegotiable: data.salaryNegotiable,
          longDescription: data.longDescription,
          profilePhoto: user?.photoURL,
          status: "pending",
          createdAt: new Date().toISOString(),
        };

        axiosSecure.post("/teacher-profile", teacherData).then((res) => {
          if (res.data.insertedId) {
            Swal.fire({
              title: "Submitted!",
              text: "Your teacher profile has been successfully created.",
              icon: "success",
            });
            // You might want to navigate to the teacher's dashboard or profile page
            // navigate("/teacher-dashboard");
          } else {
            Swal.fire({
              title: "Error!",
              text: "There was an issue submitting your profile.",
              icon: "error",
            });
          }
        });

        console.log(teacherData);
      }
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 p-8 transition-colors duration-300">
      <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 p-6 rounded-lg shadow-xl relative">
        <h2 className="text-3xl font-bold text-center mb-8 text-green-600 dark:text-green-400">
          Teacher Profile Creation
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          {/* Section  Academic & Teaching Expertise */}
          <section className="p-6 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm space-y-4">
            <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4 border-b pb-2 border-gray-300 dark:border-gray-600">
              Academic & Teaching Expertise
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Qualification */}
              <div>
                <label
                  htmlFor="qualification"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >
                  Highest Qualification
                </label>
                <select
                  id="qualification"
                  {...register("qualification", {
                    required: "Qualification is required",
                  })}
                  className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 ${
                    errors.qualification
                      ? "border-red-500 dark:border-red-500"
                      : "border-gray-300 dark:border-gray-600"
                  }`}
                >
                  <option value="">Select Qualification</option>
                  {qualificationOptions.map((q) => (
                    <option key={q} value={q}>
                      {q}
                    </option>
                  ))}
                </select>
                {errors.qualification && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.qualification.message}
                  </p>
                )}
              </div>

              {/* Experience Years */}
              <div>
                <label
                  htmlFor="experienceYears"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >
                  Years of Experience
                </label>
                <input
                  type="number"
                  id="experienceYears"
                  {...register("experienceYears", {
                    required: "Experience is required",
                  })}
                  className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 ${
                    errors.experienceYears
                      ? "border-red-500 dark:border-red-500"
                      : "border-gray-300 dark:border-gray-600"
                  }`}
                  placeholder="e.g., 3"
                />
                {errors.experienceYears && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.experienceYears.message}
                  </p>
                )}
              </div>
            </div>
          </section>

          {/* Section 3: Availability & Preferences */}
          <section className="p-6 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm space-y-4">
            <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4 border-b pb-2 border-gray-300 dark:border-gray-600">
              Availability & Preferences
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Teaching Area Region (Dropdown) */}
              <div>
                <label
                  htmlFor="teachingAreaRegion"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >
                  Preferred Teaching Region
                </label>
                <select
                  id="teachingAreaRegion"
                  {...register("teachingAreaRegion", {
                    required: "Teaching Region is required",
                  })}
                  className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 ${
                    errors.teachingAreaRegion
                      ? "border-red-500 dark:border-red-500"
                      : "border-gray-300 dark:border-gray-600"
                  }`}
                >
                  <option value="">Select Region</option>
                  {regions.map((reg) => (
                    <option key={reg} value={reg}>
                      {reg}
                    </option>
                  ))}
                </select>
                {errors.teachingAreaRegion && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.teachingAreaRegion.message}
                  </p>
                )}
              </div>

              {/* Teaching Area District (Dynamic based on Region) */}
              <div>
                <label
                  htmlFor="teachingAreaDistrict"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >
                  Preferred Teaching District (Optional)
                </label>
                <select
                  id="teachingAreaDistrict"
                  {...register("teachingAreaDistrict")}
                  className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 ${
                    errors.teachingAreaDistrict
                      ? "border-red-500 dark:border-red-500"
                      : "border-gray-300 dark:border-gray-600"
                  }`}
                  disabled={!selectedRegion || availableDistricts.length === 0}
                >
                  <option value="">
                    {selectedRegion
                      ? "Select a District (Optional)"
                      : "Select Region First"}
                  </option>
                  {availableDistricts.map((dist) => (
                    <option key={dist} value={dist}>
                      {dist}
                    </option>
                  ))}
                </select>
                {errors.teachingAreaDistrict && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.teachingAreaDistrict.message}
                  </p>
                )}
              </div>
            </div>
          </section>

          {/* Section 4: Salary & Description */}
          <section className="p-6 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm space-y-4">
            <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4 border-b pb-2 border-gray-300 dark:border-gray-600">
              Salary & Description
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Salary Range */}
              <div>
                <label
                  htmlFor="salaryRange"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >
                  Expected Salary Range (BDT/month)
                </label>
                <input
                  type="text"
                  id="salaryRange"
                  {...register("salaryRange", {
                    required: "Salary Range is required",
                  })}
                  className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 ${
                    errors.salaryRange
                      ? "border-red-500 dark:border-red-500"
                      : "border-gray-300 dark:border-gray-600"
                  }`}
                  placeholder="e.g., 3000 - 5000 BDT"
                />
                {errors.salaryRange && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.salaryRange.message}
                  </p>
                )}
              </div>

              {/* Salary Negotiable */}
              <div className="flex items-center self-end pb-2">
                <input
                  type="checkbox"
                  id="salaryNegotiable"
                  {...register("salaryNegotiable")}
                  className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded dark:bg-gray-700 dark:border-gray-600"
                />
                <label
                  htmlFor="salaryNegotiable"
                  className="ml-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Salary Negotiable
                </label>
              </div>
            </div>

            {/* Description (Full width) */}
            <div className="col-span-full">
              <label
                htmlFor="longDescription"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                Detailed Teaching Philosophy / Experience
              </label>
              <textarea
                id="longDescription"
                {...register("longDescription", {
                  required: "Detailed description is required",
                })}
                rows="5"
                className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 ${
                  errors.longDescription
                    ? "border-red-500 dark:border-red-500"
                    : "border-gray-300 dark:border-gray-600"
                }`}
                placeholder="Describe your teaching style, experience, specializations, and what students can expect."
              ></textarea>
              {errors.longDescription && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.longDescription.message}
                </p>
              )}
            </div>
          </section>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full flex justify-center py-3 px-6 border border-transparent rounded-md shadow-sm text-lg font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 dark:bg-green-500 dark:hover:bg-green-600 transition duration-300 ease-in-out"
          >
            Create Teacher Profile
          </button>
        </form>
      </div>
    </div>
  );
};

export default TeacherRequest;
