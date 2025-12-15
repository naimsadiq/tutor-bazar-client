import React from "react";
import { motion } from "framer-motion";
const cardVariant = {
  hidden: { y: 40, opacity: 0 },
  visible: { y: 0, opacity: 1 },
};

const About = () => {
  return (
    <div className="bg-base-100 text-base-content mt-12">
      {/* ================= Hero Section ================= */}
      <div
        className="hero min-h-[400px]"
        style={{
          backgroundImage:
            "url(https://i.ibb.co.com/MyjyS3rK/pngtree-cartoon-education-training-cram-school-picture-image-917042.png)",
        }}
      >
        <div className="hero-overlay bg-opacity-70"></div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="hero-content text-center text-neutral-content"
        >
          <div className="max-w-md">
            <h1 className="mb-5 text-5xl font-bold text-white">
              About Tutor Bazar
            </h1>
            <p className="mb-5 text-gray-200">
              Connecting students with the best tutors. A platform designed to
              make education accessible, transparent, and hassle-free.
            </p>
          </div>
        </motion.div>
      </div>

      {/* ================= Our Mission Section ================= */}
      <div className="container mx-auto px-4 py-16">
        <div className="flex flex-col lg:flex-row items-center gap-10">
          {/* Image */}
          <motion.div
            initial={{ x: -80, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="lg:w-1/2"
          >
            <img
              src="https://i.ibb.co.com/Ldp439K9/i-Stock-1351416161-jpg.webp"
              alt="Our Mission"
              className="rounded-lg shadow-2xl w-full object-cover h-80"
            />
          </motion.div>

          {/* Text */}
          <motion.div
            initial={{ x: 80, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="lg:w-1/2 space-y-5"
          >
            <h2 className="text-3xl font-bold text-primary">Our Mission</h2>
            <p className="text-lg text-gray-600">
              Our main goal is to solve the real problem of finding qualified
              tutors and verified tuition. We aim to reduce the friction between
              students and tutors by providing automated workflows, ensuring a
              smooth educational journey.
            </p>
            <p className="text-gray-600">
              We believe in digital class tracking, transparent payments, and
              structured communication to assist both admins and users in
              monitoring platform activities effectively.
            </p>
          </motion.div>
        </div>
      </div>

      {/* ================= Why Choose Us ================= */}
      <div className="bg-base-200 py-16">
        <div className="container mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-3xl font-bold text-center mb-10"
          >
            Why Choose Us?
          </motion.h2>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              hidden: {},
              visible: {
                transition: {
                  staggerChildren: 0.2,
                },
              },
            }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {/* Card 1 */}
            <motion.div
              variants={cardVariant}
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 200 }}
              className="card bg-base-100 shadow-xl"
            >
              <div className="card-body items-center text-center">
                <h2 className="card-title text-primary">Verified Tutors</h2>
                <p>
                  We ensure all tutors are verified to provide the highest
                  quality education and safety for students.
                </p>
              </div>
            </motion.div>

            {/* Card 2 */}
            <motion.div
              variants={cardVariant}
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 200 }}
              className="card bg-base-100 shadow-xl"
            >
              <div className="card-body items-center text-center">
                <h2 className="card-title text-primary">Secure Payments</h2>
                <p>
                  Our platform ensures transparent financial tracking and secure
                  payment methods for peace of mind.
                </p>
              </div>
            </motion.div>

            {/* Card 3 */}
            <motion.div
              variants={cardVariant}
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 200 }}
              className="card bg-base-100 shadow-xl"
            >
              <div className="card-body items-center text-center">
                <h2 className="card-title text-primary">Smart Matching</h2>
                <p>
                  Post your requirements and get matched with the perfect tutor
                  based on subject, location, and budget.
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default About;
