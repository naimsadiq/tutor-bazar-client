import React from "react";
import { motion } from "framer-motion";
import { FaUserPlus, FaSearch, FaCheckCircle } from "react-icons/fa";

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};

const HowItWorks = () => {
  return (
    <section className="py-16 container mx-auto">
      <div className="container mx-auto px-4">
        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-4xl font-bold text-center text-gray-800 dark:text-white mb-12"
        >
          How the Platform Works
        </motion.h2>

        {/* Steps */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {/* Step 1 */}
          <motion.div
            variants={cardVariants}
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 200 }}
            className="flex flex-col items-center text-center p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg dark:shadow-gray-900"
          >
            <motion.div
              whileHover={{ scale: 1.15 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="text-5xl text-blue-600 dark:text-blue-400 mb-4"
            >
              <FaUserPlus />
            </motion.div>

            <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-200 mb-3">
              1. Register & Post Tuition
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Students register and easily post their tuition requirements,
              specifying subjects, classes, budget, and location.
            </p>
          </motion.div>

          {/* Step 2 */}
          <motion.div
            variants={cardVariants}
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 200 }}
            className="flex flex-col items-center text-center p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg dark:shadow-gray-900"
          >
            <motion.div
              whileHover={{ scale: 1.15 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="text-5xl text-green-600 dark:text-green-400 mb-4"
            >
              <FaSearch />
            </motion.div>

            <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-200 mb-3">
              2. Tutors Apply
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Verified tutors browse available tuition posts and apply to those
              that match their expertise and schedule.
            </p>
          </motion.div>

          {/* Step 3 */}
          <motion.div
            variants={cardVariants}
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 200 }}
            className="flex flex-col items-center text-center p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg dark:shadow-gray-900"
          >
            <motion.div
              whileHover={{ scale: 1.15 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="text-5xl text-purple-600 dark:text-purple-400 mb-4"
            >
              <FaCheckCircle />
            </motion.div>

            <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-200 mb-3">
              3. Approve & Connect
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Students review tutor applications, approve the best fit, and the
              platform facilitates seamless connection and management.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorks;
