import React from "react";
import { motion } from "framer-motion";
import {
  FaGraduationCap,
  FaShieldAlt,
  FaComments,
  FaDollarSign,
} from "react-icons/fa";

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.25,
    },
  },
};

const cardVariants = {
  hidden: {
    opacity: 0,
    rotateY: 90,
    scale: 0.9,
  },
  visible: {
    opacity: 1,
    rotateY: 0,
    scale: 1,
    transition: {
      duration: 0.7,
      ease: "easeOut",
    },
  },
};

const floatingIcon = {
  animate: {
    y: [0, -8, 0],
  },
  transition: {
    duration: 2,
    repeat: Infinity,
    ease: "easeInOut",
  },
};

const WhyChooseUs = () => {
  return (
    <section className="py-16 container mx-auto">
      <div className="container mx-auto px-4">
        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-4xl font-bold text-center text-gray-800 dark:text-white mb-12"
        >
          Why Choose Us
        </motion.h2>

        {/* Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          style={{ perspective: 1000 }}
        >
          {/* Feature 1 */}
          <motion.div
            variants={cardVariants}
            whileHover={{ y: -12, rotateZ: 1 }}
            className="flex flex-col items-center text-center p-6 bg-blue-50 dark:bg-blue-900/20 rounded-lg shadow-md"
          >
            <motion.div
              variants={floatingIcon}
              animate="animate"
              transition={floatingIcon.transition}
              className="text-5xl text-blue-700 dark:text-blue-400 mb-4"
            >
              <FaGraduationCap />
            </motion.div>
            <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-200 mb-3">
              Qualified Tutors
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Access a vast network of verified and highly qualified tutors for
              all subjects and levels.
            </p>
          </motion.div>

          {/* Feature 2 */}
          <motion.div
            variants={cardVariants}
            whileHover={{ y: -12, rotateZ: -1 }}
            className="flex flex-col items-center text-center p-6 bg-green-50 dark:bg-green-900/20 rounded-lg shadow-md"
          >
            <motion.div
              variants={floatingIcon}
              animate="animate"
              transition={{ ...floatingIcon.transition, delay: 0.2 }}
              className="text-5xl text-green-700 dark:text-green-400 mb-4"
            >
              <FaShieldAlt />
            </motion.div>
            <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-200 mb-3">
              Secure & Transparent
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Enjoy a secure platform with transparent payment systems and
              reliable class tracking.
            </p>
          </motion.div>

          {/* Feature 3 */}
          <motion.div
            variants={cardVariants}
            whileHover={{ y: -12, rotateZ: 1 }}
            className="flex flex-col items-center text-center p-6 bg-purple-50 dark:bg-purple-900/20 rounded-lg shadow-md"
          >
            <motion.div
              variants={floatingIcon}
              animate="animate"
              transition={{ ...floatingIcon.transition, delay: 0.4 }}
              className="text-5xl text-purple-700 dark:text-purple-400 mb-4"
            >
              <FaComments />
            </motion.div>
            <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-200 mb-3">
              Seamless Communication
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Frictionless communication tools to connect students and tutors
              efficiently.
            </p>
          </motion.div>

          {/* Feature 4 */}
          <motion.div
            variants={cardVariants}
            whileHover={{ y: -12, rotateZ: -1 }}
            className="flex flex-col items-center text-center p-6 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg shadow-md"
          >
            <motion.div
              variants={floatingIcon}
              animate="animate"
              transition={{ ...floatingIcon.transition, delay: 0.6 }}
              className="text-5xl text-yellow-700 dark:text-yellow-400 mb-4"
            >
              <FaDollarSign />
            </motion.div>
            <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-200 mb-3">
              Fair Pricing
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Competitive and flexible pricing options to suit every budget
              without compromising on quality.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
