import React, { useState, useEffect, useMemo, useCallback } from "react";
import { useForm, useWatch } from "react-hook-form";
import Swal from "sweetalert2";
import { useLocation } from "react-router";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const UpdateProfile = () => {
  const location = useLocation();
  const teacher = location.state?.teacher;
  console.log(teacher);

  const axiosSecure = useAxiosSecure();

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm();


  const [teachingLocations, setTeachingLocations] = useState([]);

  useEffect(() => {
    fetch("/servicesCenter.json")
      .then((res) => res.json())
      .then((data) => setTeachingLocations(data));
  }, []);

  const regions = useMemo(() => {
    const regionsDuplicate = teachingLocations.map((c) => c.region);
    return [...new Set(regionsDuplicate)];
  }, [teachingLocations]);

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

  const selectedRegion = useWatch({
    control,
    name: "teachingAreaRegion",
  });

  const availableDistricts = districtsByRegion(selectedRegion);


  useEffect(() => {
    if (teacher) {
      reset({
        qualification: teacher.qualification,
        experienceYears: teacher.experienceYears,
        salaryRange: teacher.salaryRange,
        salaryNegotiable: teacher.salaryNegotiable,
        longDescription: teacher.longDescription,
        teachingAreaRegion: teacher.teachingAreaRegion || "",
        teachingAreaDistrict: teacher.teachingAreaDistrict || "",
      });
    }
  }, [teacher, reset]);


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
      title: "Update Profile?",
      text: "Are you sure you want to update your profile?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, update",
      cancelButtonText: "Cancel",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const updatedProfile = {
          qualification: data.qualification,
          experienceYears: parseInt(data.experienceYears),
          salaryRange: data.salaryRange,
          salaryNegotiable: data.salaryNegotiable || false,
          longDescription: data.longDescription,
          teachingAreaRegion: data?.teachingAreaRegion,
          teachingAreaDistrict: data?.teachingAreaDistrict,
          updatedAt: new Date().toISOString(),
        };

        try {
          const res = await axiosSecure.put(
            `/teacher-profile/${teacher._id}`,
            updatedProfile
          );

          if (res.data.modifiedCount > 0) {
            Swal.fire("Updated!", "Profile updated successfully.", "success");
          } else {
            Swal.fire("No Change", "Nothing was updated.", "info");
          }
        } catch (error) {
          console.error(error);
          Swal.fire("Error!", "Failed to update profile.", "error");
        }
      }
    });
  };


  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow">
        <h2 className="text-2xl font-bold text-center mb-6 text-green-600">
          Update Teacher Profile
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Qualification & Experience */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block mb-1 font-medium">
                Highest Qualification
              </label>
              <select
                {...register("qualification", { required: true })}
                className="w-full border p-2 rounded"
              >
                <option value="">Select Qualification</option>
                {qualificationOptions.map((q) => (
                  <option key={q} value={q}>
                    {q}
                  </option>
                ))}
              </select>
              {errors.qualification && (
                <p className="text-red-500 text-sm">Required</p>
              )}
            </div>

            <div>
              <label className="block mb-1 font-medium">
                Experience (Years)
              </label>
              <input
                type="number"
                {...register("experienceYears", { required: true })}
                className="w-full border p-2 rounded"
              />
              {errors.experienceYears && (
                <p className="text-red-500 text-sm">Required</p>
              )}
            </div>
          </div>

          {/* Teaching Area */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block mb-1 font-medium">Region</label>
              <select
                {...register("teachingAreaRegion", { required: true })}
                className="w-full border p-2 rounded"
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
              <label className="block mb-1 font-medium">District</label>
              <select
                {...register("teachingAreaDistrict")}
                disabled={!selectedRegion}
                className="w-full border p-2 rounded"
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

          {/* Salary */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
            <div>
              <label className="block mb-1 font-medium">Salary Range</label>
              <input
                type="text"
                {...register("salaryRange", { required: true })}
                className="w-full border p-2 rounded"
              />
            </div>

            <div className="flex items-center mt-6">
              <input
                type="checkbox"
                {...register("salaryNegotiable")}
                className="mr-2"
              />
              <label>Salary Negotiable</label>
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block mb-1 font-medium">Description</label>
            <textarea
              rows="5"
              {...register("longDescription", { required: true })}
              className="w-full border p-2 rounded"
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full bg-green-600 text-white py-3 rounded hover:bg-green-700"
          >
            Update Profile
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateProfile;
