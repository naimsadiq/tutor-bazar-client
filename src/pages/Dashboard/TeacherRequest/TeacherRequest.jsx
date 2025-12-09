import React, { useState, useEffect, useMemo, useCallback } from "react";
import { useForm, useWatch } from "react-hook-form";
import Swal from "sweetalert2";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

// Dummy data for subjects based on class level
const classSubjectsMap = {
  "Class 1": ["Bangla", "English", "Mathematics", "General Science"],
  "Class 2": ["Bangla", "English", "Mathematics", "General Science"],
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
    "Accounting",
    "Finance",
    "Economics",
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
    "Accounting",
    "Finance",
    "Economics",
  ],
  "Class 11": [
    "Bangla",
    "English",
    "Physics",
    "Chemistry",
    "Biology",
    "Higher Math",
    "ICT",
    "Accounting",
    "Finance",
    "Economics",
  ],
  "Class 12": [
    "Bangla",
    "English",
    "Physics",
    "Chemistry",
    "Biology",
    "Higher Math",
    "ICT",
    "Accounting",
    "Finance",
    "Economics",
  ],
  "Admission Test": [
    "Bangla",
    "English",
    "Physics",
    "Chemistry",
    "Mathematics",
    "Biology",
    "General Knowledge",
  ],
  "University Level": [
    "Mathematics",
    "Physics",
    "Chemistry",
    "Biology",
    "English",
    "Computer Science",
    "Engineering Subjects",
    "Business Subjects",
  ],
};

const TeacherRequest = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    setValue, // Added setValue for dynamically setting form values
    // reset,
  } = useForm({
    defaultValues: {
      classLevels: [], // Initialize as empty arrays for multi-selects
      subjects: [],
      medium: [],
      languages: [],
    },
  });

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

  // Watch for changes in classLevel and region for dynamic options
  const selectedClassLevels = useWatch({ control, name: "classLevels" });
  const selectedRegion = useWatch({ control, name: "teachingAreaRegion" }); // New field for teacher's preferred teaching region

  // Dynamically get available subjects based on selected class levels
  const availableSubjects = useMemo(() => {
    if (!selectedClassLevels || selectedClassLevels.length === 0) return [];
    const subjects = new Set();
    selectedClassLevels.forEach((level) => {
      (classSubjectsMap[level] || []).forEach((sub) => subjects.add(sub));
    });
    return Array.from(subjects).sort();
  }, [selectedClassLevels]);

  const availableDistricts = districtsByRegion(selectedRegion);

  const mediums = ["Bangla Version", "English Version", "English Medium"];
  const modes = ["Online", "Offline", "Both"];
  const daysOptions = [1, 2, 3, 4, 5, 6, 7];
  const timeOptions = [
    "Morning (8 AM – 12 PM)",
    "Afternoon (1 PM – 5 PM)",
    "Evening (6 PM – 9 PM)",
    "Night (9 PM – 11 PM)",
  ];
  const qualificationOptions = [
    "HSC",
    "BSc Running",
    "BSc Completed",
    "MSc Running",
    "MSc Completed",
    "PhD",
    "Other",
  ];
  const genderOptions = ["Male", "Female", "Other"];
  const languageOptions = ["Bangla", "English", "Hindi", "Urdu", "Other"];

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
        // Construct the teachingArea string
        const teachingArea = data.teachingAreaDistrict
          ? `${data.teachingAreaRegion} - ${data.teachingAreaDistrict}`
          : data.teachingAreaRegion;

        const teacherData = {
          teacherName: data.teacherName,
          teacherEmail: user?.email, // Assuming email from auth
          gender: data.gender,
          experienceYears: parseInt(data.experienceYears),
          qualification: data.qualification,
          medium: data.medium,
          subjects: data.subjects,
          classLevels: data.classLevels,
          mode: data.mode,
          teachingArea: teachingArea,
          preferredTime: data.preferredTime,
          availableDaysPerWeek: parseInt(data.availableDaysPerWeek),
          salaryRange: data.salaryRange,
          salaryNegotiable: data.salaryNegotiable,
          shortDescription: data.shortDescription,
          longDescription: data.longDescription,
          languages: data.languages,
          profilePhoto: user?.photoURL,
          status: "pending", // Default status
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
      }
    });
  };

  useEffect(() => {
    if (user) {
      setValue("teacherName", user.displayName || "");
      // setValue("teacherEmail", user.email || ""); // Email is handled directly in onSubmit
    }
  }, [user, setValue]);

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

              {/* Class Levels (Multi-select) */}
              <div>
                <label
                  htmlFor="classLevels"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >
                  Class Levels You Can Teach
                </label>

                <select
                  id="classLevels"
                  multiple
                  {...register("classLevels", {
                    required: "At least one class level is required",
                  })}
                  className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 ${
                    errors.classLevels
                      ? "border-red-500 dark:border-red-500"
                      : "border-gray-300 dark:border-gray-600"
                  }`}
                  size="5" // Show multiple options at once
                >
                  {Object.keys(classSubjectsMap).map((level) => (
                    <option key={level} value={level}>
                      {level}
                    </option>
                  ))}
                </select>
                {errors.classLevels && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.classLevels.message}
                  </p>
                )}
              </div>

              {/* Subjects (Multi-select, dynamic based on class levels) */}
              <div>
                <label
                  htmlFor="subjects"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >
                  Subjects You Can Teach
                </label>

                <select
                  id="subjects"
                  multiple
                  {...register("subjects", {
                    required: "At least one subject is required",
                  })}
                  className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 ${
                    errors.subjects
                      ? "border-red-500 dark:border-red-500"
                      : "border-gray-300 dark:border-gray-600"
                  }`}
                  disabled={
                    !selectedClassLevels || availableSubjects.length === 0
                  }
                  size="5"
                >
                  <option value="" disabled>
                    {selectedClassLevels && selectedClassLevels.length > 0
                      ? "Select Subjects"
                      : "Select Class Levels First"}
                  </option>
                  {availableSubjects.map((sub) => (
                    <option key={sub} value={sub}>
                      {sub}
                    </option>
                  ))}
                </select>
                {errors.subjects && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.subjects.message}
                  </p>
                )}
              </div>

              {/* Medium (Multi-select) */}
              <div>
                <label
                  htmlFor="medium"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >
                  Teaching Mediums
                </label>
                <select
                  id="medium"
                  multiple
                  {...register("medium", {
                    required: "At least one medium is required",
                  })}
                  className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 ${
                    errors.medium
                      ? "border-red-500 dark:border-red-500"
                      : "border-gray-300 dark:border-gray-600"
                  }`}
                  size="3"
                >
                  {mediums.map((med) => (
                    <option key={med} value={med}>
                      {med}
                    </option>
                  ))}
                </select>
                {errors.medium && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.medium.message}
                  </p>
                )}
              </div>

              {/* Languages (Multi-select) */}
              <div>
                <label
                  htmlFor="languages"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >
                  Languages You Can Teach In
                </label>
                <select
                  id="languages"
                  multiple
                  {...register("languages", {
                    required: "At least one language is required",
                  })}
                  className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 ${
                    errors.languages
                      ? "border-red-500 dark:border-red-500"
                      : "border-gray-300 dark:border-gray-600"
                  }`}
                  size="3"
                >
                  {languageOptions.map((lang) => (
                    <option key={lang} value={lang}>
                      {lang}
                    </option>
                  ))}
                </select>
                {errors.languages && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.languages.message}
                  </p>
                )}
              </div>
            </div>
          </section>

          {/* Section 3: Availability & Preferences */}
          <section className="p-6 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm space-y-4">
            <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4 border-b pb-2 border-gray-300 dark:border-gray-600">
              3. Availability & Preferences
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Mode */}
              <div>
                <label
                  htmlFor="mode"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >
                  Preferred Teaching Mode
                </label>
                <select
                  id="mode"
                  {...register("mode", {
                    required: "Teaching Mode is required",
                  })}
                  className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 ${
                    errors.mode
                      ? "border-red-500 dark:border-red-500"
                      : "border-gray-300 dark:border-gray-600"
                  }`}
                >
                  <option value="">Select Mode</option>
                  {modes.map((m) => (
                    <option key={m} value={m}>
                      {m}
                    </option>
                  ))}
                </select>
                {errors.mode && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.mode.message}
                  </p>
                )}
              </div>

              {/* Days Per Week */}
              <div>
                <label
                  htmlFor="availableDaysPerWeek"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >
                  Available Days Per Week
                </label>
                <select
                  id="availableDaysPerWeek"
                  {...register("availableDaysPerWeek", {
                    required: "Days per week is required",
                    min: { value: 1, message: "Must be at least 1 day" },
                  })}
                  className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 ${
                    errors.availableDaysPerWeek
                      ? "border-red-500 dark:border-red-500"
                      : "border-gray-300 dark:border-gray-600"
                  }`}
                >
                  <option value="">Select Days</option>
                  {daysOptions.map((day) => (
                    <option key={day} value={day}>
                      {day}
                    </option>
                  ))}
                </select>
                {errors.availableDaysPerWeek && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.availableDaysPerWeek.message}
                  </p>
                )}
              </div>

              {/* Preferred Time */}
              <div>
                <label
                  htmlFor="preferredTime"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >
                  Preferred Teaching Time
                </label>
                <select
                  id="preferredTime"
                  {...register("preferredTime", {
                    required: "Preferred Time is required",
                  })}
                  className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 ${
                    errors.preferredTime
                      ? "border-red-500 dark:border-red-500"
                      : "border-gray-300 dark:border-gray-600"
                  }`}
                >
                  <option value="">Select Preferred Time</option>
                  {timeOptions.map((time) => (
                    <option key={time} value={time}>
                      {time}
                    </option>
                  ))}
                </select>
                {errors.preferredTime && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.preferredTime.message}
                  </p>
                )}
              </div>

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
              4. Salary & Description
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

            {/* Short Description */}
            <div className="col-span-full">
              <label
                htmlFor="shortDescription"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                Short Introduction / Motto (Max 150 chars)
              </label>
              <textarea
                id="shortDescription"
                {...register("shortDescription", {
                  required: "Short description is required",
                  maxLength: {
                    value: 150,
                    message: "Maximum 150 characters allowed",
                  },
                })}
                rows="2"
                className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 ${
                  errors.shortDescription
                    ? "border-red-500 dark:border-red-500"
                    : "border-gray-300 dark:border-gray-600"
                }`}
                placeholder="e.g., Friendly and concept-based tutor, helps students understand math & physics from basics."
              ></textarea>
              {errors.shortDescription && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.shortDescription.message}
                </p>
              )}
            </div>

            {/* Long Description (Full width) */}
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
