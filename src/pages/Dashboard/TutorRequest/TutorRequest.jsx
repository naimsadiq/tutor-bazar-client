import React, { useState, useEffect, useMemo, useCallback } from "react";
import { useForm, useWatch } from "react-hook-form";
import Swal from "sweetalert2";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

// Dummy data for subjects based on class level
const classSubjectsMap = {
  "Class 1": ["Bangla", "English", "Mathematics"],
  "Class 2": ["Bangla", "English", "Mathematics"],
  "Class 3": [
    "Bangla",
    "English",
    "Mathematics",
    "General Science",
    "Social Science",
  ],
  "Class 4": [
    "Bangla",
    "English",
    "Mathematics",
    "General Science",
    "Social Science",
  ],
  "Class 5": [
    "Bangla",
    "English",
    "Mathematics",
    "General Science",
    "Social Science",
  ],
  "Class 6": [
    "Bangla",
    "English",
    "Mathematics",
    "General Science",
    "History",
    "Geography",
    "ICT",
  ],
  "Class 7": [
    "Bangla",
    "English",
    "Mathematics",
    "General Science",
    "History",
    "Geography",
    "ICT",
  ],
  "Class 8": [
    "Bangla",
    "English",
    "Mathematics",
    "Physics",
    "Chemistry",
    "Biology",
    "History",
    "Geography",
    "ICT",
  ],
  "Class 9": [
    "Bangla",
    "English",
    "Mathematics",
    "Physics",
    "Chemistry",
    "Biology",
    "Higher Math",
    "ICT",
  ],
  "Class 10": [
    "Bangla",
    "English",
    "Mathematics",
    "Physics",
    "Chemistry",
    "Biology",
    "Higher Math",
    "ICT",
  ],
};

const TutorRequest = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    // reset,
  } = useForm();

  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const [studentLocation, setStudentLocation] = useState([]);

  useEffect(() => {
    fetch("/servicesCenter.json")
      .then((res) => res.json())
      .then((data) => {
        setStudentLocation(data);
      });
  }, []);

  // Use useMemo for regions to avoid re-calculating on every render
  const regions = useMemo(() => {
    const regionsDuplicate = studentLocation.map((c) => c.region);
    return [...new Set(regionsDuplicate)];
  }, [studentLocation]);

  // useCallback for districtsByRegion to memoize the function
  const districtsByRegion = useCallback(
    (region) => {
      if (!region) return [];
      const regionDistricts = studentLocation.filter(
        (c) => c.region === region
      );
      const districts = regionDistricts.map((d) => d.district);
      return [...new Set(districts)];
    },
    [studentLocation]
  );

  // Watch for changes in classLevel and region for dynamic options
  const selectedClassLevel = useWatch({ control, name: "classLevel" });
  const selectedRegion = useWatch({ control, name: "region" });

  const availableSubjects = selectedClassLevel
    ? classSubjectsMap[selectedClassLevel] || []
    : [];
  const availableDistricts = districtsByRegion(selectedRegion);
  // console.log(user);
  const onSubmit = (data) => {
    const studentData = {
      studentName: user?.displayName,
      studentEmail: user?.email,
      photoURL: user?.photoURL,
      classLevel: data.classLevel,
      subject: data.subject,
      region: data.region,
      district: data.district,
      budget: data.budget,
      budgetNegotiable: data.budgetNegotiable,
      description: data.description,
      startDate: data.startDate,
      status: "pending",
    };
    // console.log(studentData);
    Swal.fire({
      title: "Need a Teacher!",
      text: "Do you want to submit the form now?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Try me!",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.post("/student-post", studentData).then((res) => {
          if (res.data.insertedId) {
            Swal.fire({
              title: "Submitted!",
              text: "Your request has been successfully sent.",
              icon: "success",
            });
            // navigate("/");
          }
        });
      }
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 p-8 transition-colors duration-300">
      <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 p-6 rounded-lg shadow-xl relative">
        <h2 className="text-3xl font-bold text-center mb-8 text-blue-600 dark:text-blue-400">
          Tutor Request Form
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          {/* Increased space-y for section separation */}
          {/* Section 1: Academic Details */}
          <section className="p-6 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm space-y-4">
            <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4 border-b pb-2 border-gray-300 dark:border-gray-600">
              1. Academic Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Class Level */}
              <div>
                <label
                  htmlFor="classLevel"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >
                  Class Level
                </label>
                <select
                  id="classLevel"
                  {...register("classLevel", {
                    required: "Class Level is required",
                  })}
                  className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 ${
                    errors.classLevel
                      ? "border-red-500 dark:border-red-500"
                      : "border-gray-300 dark:border-gray-600"
                  }`}
                >
                  <option value="">Select Class Level</option>
                  {Object.keys(classSubjectsMap).map((level) => (
                    <option key={level} value={level}>
                      {level}
                    </option>
                  ))}
                </select>
                {errors.classLevel && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.classLevel.message}
                  </p>
                )}
              </div>

              {/* Subject (Dynamic based on Class Level) */}
              <div>
                <label
                  htmlFor="subject"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >
                  Subject
                </label>
                <select
                  id="subject"
                  {...register("subject", { required: "Subject is required" })}
                  className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 ${
                    errors.subject
                      ? "border-red-500 dark:border-red-500"
                      : "border-gray-300 dark:border-gray-600"
                  }`}
                  disabled={
                    !selectedClassLevel || availableSubjects.length === 0
                  } // Disable if no class selected or no subjects
                >
                  <option value="">
                    {selectedClassLevel
                      ? "Select a Subject"
                      : "Select Class Level First"}
                  </option>
                  {availableSubjects.map((sub) => (
                    <option key={sub} value={sub}>
                      {sub}
                    </option>
                  ))}
                </select>
                {errors.subject && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.subject.message}
                  </p>
                )}
              </div>
            </div>
          </section>
          {/* Section 2: Location & Schedule */}
          <section className="p-6 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm space-y-4">
            <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4 border-b pb-2 border-gray-300 dark:border-gray-600">
              2. Location & Schedule
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Region (Dropdown) */}
              <div>
                <label
                  htmlFor="region"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >
                  Region
                </label>
                <select
                  id="region"
                  {...register("region", { required: "Region is required" })}
                  className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 ${
                    errors.region
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
                {errors.region && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.region.message}
                  </p>
                )}
              </div>

              {/* District (Dynamic based on Region) */}
              <div>
                <label
                  htmlFor="district"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >
                  District
                </label>
                <select
                  id="district"
                  {...register("district", {
                    required: "District is required",
                  })}
                  className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 ${
                    errors.district
                      ? "border-red-500 dark:border-red-500"
                      : "border-gray-300 dark:border-gray-600"
                  }`}
                  disabled={!selectedRegion || availableDistricts.length === 0} // Disable if no region selected
                >
                  <option value="">
                    {selectedRegion
                      ? "Select a District"
                      : "Select Region First"}
                  </option>
                  {availableDistricts.map((dist) => (
                    <option key={dist} value={dist}>
                      {dist}
                    </option>
                  ))}
                </select>
                {errors.district && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.district.message}
                  </p>
                )}
              </div>

              {/* Start Date */}
              <div>
                <label
                  htmlFor="startDate"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >
                  Start Date
                </label>
                <input
                  type="date"
                  id="startDate"
                  {...register("startDate", {
                    required: "Start Date is required",
                  })}
                  className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 ${
                    errors.startDate
                      ? "border-red-500 dark:border-red-500"
                      : "border-gray-300 dark:border-gray-600"
                  }`}
                />
                {errors.startDate && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.startDate.message}
                  </p>
                )}
              </div>
            </div>
          </section>
          {/* Section 3: Budget & Additional Details */}
          <section className="p-6 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm space-y-4">
            <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4 border-b pb-2 border-gray-300 dark:border-gray-600">
              3. Budget & Other Details
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Budget */}
              <div>
                <label
                  htmlFor="budget"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >
                  Budget (BDT)
                </label>
                <input
                  type="text"
                  id="budget"
                  {...register("budget", {
                    required: "Budget is required",
                  })}
                  className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 ${
                    errors.budget
                      ? "border-red-500 dark:border-red-500"
                      : "border-gray-300 dark:border-gray-600"
                  }`}
                  placeholder="e.g., 2500 - 3000 BDT"
                />
                {errors.budget && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.budget.message}
                  </p>
                )}
              </div>

              {/* Budget Negotiable */}
              <div className="flex items-center self-end pb-2">
                {" "}
                {/* Aligned to bottom of grid cell */}
                <input
                  type="checkbox"
                  id="budgetNegotiable"
                  {...register("budgetNegotiable")}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded dark:bg-gray-700 dark:border-gray-600"
                />
                <label
                  htmlFor="budgetNegotiable"
                  className="ml-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Budget Negotiable
                </label>
              </div>
            </div>

            {/* Description (Full width) */}
            <div className="col-span-full">
              {" "}
              {/* Make description full width within its section */}
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                Description
              </label>
              <textarea
                id="description"
                {...register("description", {
                  required: "Description is required",
                })}
                rows="4"
                className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 ${
                  errors.description
                    ? "border-red-500 dark:border-red-500"
                    : "border-gray-300 dark:border-gray-600"
                }`}
                placeholder="e.g., Need a math tutor to help with algebra and geometry..."
              ></textarea>
              {errors.description && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.description.message}
                </p>
              )}
            </div>
          </section>
          {/* Submit Button (Full width, outside sections) */}
          <button
            type="submit"
            className="w-full flex justify-center py-3 px-6 border border-transparent rounded-md shadow-sm text-lg font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:bg-blue-500 dark:hover:bg-blue-600 transition duration-300 ease-in-out"
          >
            Post Tuition
          </button>
        </form>
      </div>
    </div>
  );
};

export default TutorRequest;
