// src/components/HowItWorks.jsx
import React from "react";
import { FaUserPlus, FaSearch, FaCheckCircle } from "react-icons/fa";

const HowItWorks = () => {
  return (
    <section className="py-16 max-w-7xl mx-auto">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center text-gray-800 dark:text-white mb-12">
          How the Platform Works
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Step 1 */}
          <div className="flex flex-col items-center text-center p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg dark:shadow-gray-900 transform transition duration-500 hover:scale-105">
            <div className="text-5xl text-blue-600 dark:text-blue-400 mb-4">
              <FaUserPlus />
            </div>
            <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-200 mb-3">
              1. Register & Post Tuition
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Students register and easily post their tuition requirements,
              specifying subjects, classes, budget, and location.
            </p>
          </div>

          {/* Step 2 */}
          <div className="flex flex-col items-center text-center p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg dark:shadow-gray-900 transform transition duration-500 hover:scale-105">
            <div className="text-5xl text-green-600 dark:text-green-400 mb-4">
              <FaSearch />
            </div>
            <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-200 mb-3">
              2. Tutors Apply
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Verified tutors browse available tuition posts and apply to those
              that match their expertise and schedule.
            </p>
          </div>

          {/* Step 3 */}
          <div className="flex flex-col items-center text-center p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg dark:shadow-gray-900 transform transition duration-500 hover:scale-105">
            <div className="text-5xl text-purple-600 dark:text-purple-400 mb-4">
              <FaCheckCircle />
            </div>
            <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-200 mb-3">
              3. Approve & Connect
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Students review tutor applications, approve the best fit, and the
              platform facilitates seamless connection and management.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
