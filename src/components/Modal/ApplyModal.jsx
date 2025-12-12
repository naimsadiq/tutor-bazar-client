import React from "react";
import { useForm } from "react-hook-form";

const ApplyModal = ({
  isOpen,
  onClose,
  onSubmitData,
  classSubjectsMap,
  selectedClassLevel,
  setSelectedClassLevel,
  availableSubjects,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  if (!isOpen) return null;

  const submitForm = (data) => {
    onSubmitData(data);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg w-full max-w-xl shadow-lg space-y-6">
        {/* MODAL HEADER */}
        <div className="flex justify-between items-center border-b pb-3">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
            Apply to this Teacher
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-red-500 text-2xl"
          >
            &times;
          </button>
        </div>

        {/* FORM */}
        <form onSubmit={handleSubmit(submitForm)} className="space-y-6">
          {/* Academic Info */}
          <section className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm space-y-4">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4 border-b pb-2">
              1. Academic Information
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Class Level */}
              <div>
                <label className="block text-sm font-medium mb-1">
                  Class Level
                </label>

                <select
                  {...register("classLevel", {
                    required: "Class Level is required",
                    onChange: (e) => setSelectedClassLevel(e.target.value),
                  })}
                  className={`w-full px-3 py-2 border rounded-md bg-white dark:bg-gray-700 ${
                    errors.classLevel ? "border-red-500" : "border-gray-300"
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

              {/* Subject */}
              <div>
                <label className="block text-sm font-medium mb-1">
                  Subject
                </label>

                <select
                  {...register("subject", {
                    required: "Subject is required",
                  })}
                  disabled={!selectedClassLevel}
                  className={`w-full px-3 py-2 border rounded-md bg-white dark:bg-gray-700 ${
                    errors.subject ? "border-red-500" : "border-gray-300"
                  }`}
                >
                  <option value="">
                    {selectedClassLevel
                      ? "Select Subject"
                      : "Select Class Level First"}
                  </option>

                  {availableSubjects?.map((s) => (
                    <option key={s} value={s}>
                      {s}
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

          {/* Budget */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Budget (BDT)
            </label>

            <input
              type="text"
              {...register("budget", { required: "Budget is required" })}
              placeholder="e.g., 2500 - 3000"
              className={`w-full px-3 py-2 border rounded-md bg-white dark:bg-gray-700 ${
                errors.budget ? "border-red-500" : "border-gray-300"
              }`}
            />

            {errors.budget && (
              <p className="text-red-500 text-xs mt-1">
                {errors.budget.message}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <div className="flex justify-end pt-4 border-t">
            <button
              type="submit"
              className="px-5 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 shadow"
            >
              Submit Application
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ApplyModal;
