import React, { useState, useEffect, useMemo, useCallback } from "react";
import { useForm, useWatch } from "react-hook-form";
import Swal from "sweetalert2";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useNavigate } from "react-router";

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
  const navigate = useNavigate();

  const [teachingLocations, setTeachingLocations] = useState([]);

  useEffect(() => {
    fetch("/servicesCenter.json")
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
          salaryRange: parseInt(data.salaryRange),
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

            navigate("dashboard/my-profile");
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
    <div
      className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 
                px-4 sm:px-6 md:px-8 py-10 transition-colors duration-300"
    >
      <div
        className="max-w-4xl mx-auto bg-white dark:bg-gray-800 
                  p-6 sm:p-8 rounded-2xl shadow-xl relative"
      >
        {/* Title */}
        <h2
          className="text-2xl sm:text-3xl font-bold text-center mb-8 
                   text-green-600 dark:text-green-400"
        >
          Teacher Profile Creation
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          {/* ===== Academic & Teaching Expertise ===== */}
          <section
            className="p-5 sm:p-6 border border-gray-200 dark:border-gray-700 
                          rounded-xl space-y-4 bg-gray-50 dark:bg-gray-800/40"
          >
            <h3
              className="text-lg sm:text-xl font-semibold text-gray-800 dark:text-gray-200 
                       mb-4 border-b pb-2"
            >
              Academic & Teaching Expertise
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Qualification */}
              <div>
                <label className="block text-sm font-medium mb-1">
                  Highest Qualification
                </label>
                <select
                  {...register("qualification", {
                    required: "Qualification is required",
                  })}
                  className={`w-full px-3 py-2 rounded-md border text-sm
                          bg-white dark:bg-gray-700
                          focus:ring-2 focus:ring-green-500
                          ${
                            errors.qualification
                              ? "border-red-500"
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

              {/* Experience */}
              <div>
                <label className="block text-sm font-medium mb-1">
                  Years of Experience
                </label>
                <input
                  type="number"
                  {...register("experienceYears", {
                    required: "Experience is required",
                  })}
                  className={`w-full px-3 py-2 rounded-md border text-sm
                          bg-white dark:bg-gray-700
                          focus:ring-2 focus:ring-green-500
                          ${
                            errors.experienceYears
                              ? "border-red-500"
                              : "border-gray-300 dark:border-gray-600"
                          }`}
                  placeholder="e.g. 3"
                />
                {errors.experienceYears && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.experienceYears.message}
                  </p>
                )}
              </div>
            </div>
          </section>

          {/* ===== Availability & Preferences ===== */}
          <section
            className="p-5 sm:p-6 border border-gray-200 dark:border-gray-700 
                          rounded-xl space-y-4 bg-gray-50 dark:bg-gray-800/40"
          >
            <h3 className="text-lg sm:text-xl font-semibold mb-4 border-b pb-2">
              Availability & Preferences
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">
                  Preferred Teaching Region
                </label>
                <select
                  {...register("teachingAreaRegion", {
                    required: "Teaching Region is required",
                  })}
                  className={`w-full px-3 py-2 rounded-md border text-sm
                          bg-white dark:bg-gray-700
                          focus:ring-2 focus:ring-green-500
                          ${
                            errors.teachingAreaRegion
                              ? "border-red-500"
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
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Preferred Teaching District (Optional)
                </label>
                <select
                  {...register("teachingAreaDistrict")}
                  disabled={!selectedRegion || availableDistricts.length === 0}
                  className="w-full px-3 py-2 rounded-md border text-sm
                         bg-white dark:bg-gray-700
                         border-gray-300 dark:border-gray-600
                         disabled:opacity-50"
                >
                  <option value="">
                    {selectedRegion ? "Select District" : "Select Region First"}
                  </option>
                  {availableDistricts.map((dist) => (
                    <option key={dist} value={dist}>
                      {dist}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </section>

          {/* ===== Salary & Description ===== */}
          <section
            className="p-5 sm:p-6 border border-gray-200 dark:border-gray-700 
                          rounded-xl space-y-4 bg-gray-50 dark:bg-gray-800/40"
          >
            <h3 className="text-lg sm:text-xl font-semibold mb-4 border-b pb-2">
              Salary & Description
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">
                  Expected Salary (BDT/month)
                </label>
                <input
                  type="text"
                  {...register("salaryRange", {
                    required: "Salary Range is required",
                  })}
                  className="w-full px-3 py-2 rounded-md border text-sm
                         bg-white dark:bg-gray-700
                         border-gray-300 dark:border-gray-600
                         focus:ring-2 focus:ring-green-500"
                  placeholder="3000 - 5000"
                />
              </div>

              <div className="flex items-center gap-2 mt-6 md:mt-0">
                <input type="checkbox" {...register("salaryNegotiable")} />
                <span className="text-sm">Salary Negotiable</span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Detailed Teaching Description
              </label>
              <textarea
                rows="5"
                {...register("longDescription", {
                  required: "Description is required",
                })}
                className="w-full px-3 py-2 rounded-md border text-sm
                       bg-white dark:bg-gray-700
                       border-gray-300 dark:border-gray-600
                       focus:ring-2 focus:ring-green-500"
              />
            </div>
          </section>

          {/* Submit */}
          <button
            type="submit"
            className="w-full py-3 rounded-lg text-lg font-semibold text-white
                   bg-green-600 hover:bg-green-700
                   transition-all duration-300
                   focus:ring-4 focus:ring-green-300"
          >
            Create Teacher Profile
          </button>
        </form>
      </div>
    </div>
  );
};

export default TeacherRequest;
