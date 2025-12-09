// src/components/WhyChooseUs.jsx
import React from "react";
import {
  FaGraduationCap,
  FaShieldAlt,
  FaComments,
  FaDollarSign,
} from "react-icons/fa";

const WhyChooseUs = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center text-gray-800 mb-12">
          Why Choose Us
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Feature 1 */}
          <div className="flex flex-col items-center text-center p-6 bg-blue-50 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
            <div className="text-5xl text-blue-700 mb-4">
              <FaGraduationCap />
            </div>
            <h3 className="text-xl font-semibold text-gray-700 mb-3">
              Qualified Tutors
            </h3>
            <p className="text-gray-600">
              Access a vast network of verified and highly qualified tutors for
              all subjects and levels.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="flex flex-col items-center text-center p-6 bg-green-50 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
            <div className="text-5xl text-green-700 mb-4">
              <FaShieldAlt />
            </div>
            <h3 className="text-xl font-semibold text-gray-700 mb-3">
              Secure & Transparent
            </h3>
            <p className="text-gray-600">
              Enjoy a secure platform with transparent payment systems and
              reliable class tracking.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="flex flex-col items-center text-center p-6 bg-purple-50 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
            <div className="text-5xl text-purple-700 mb-4">
              <FaComments />
            </div>
            <h3 className="text-xl font-semibold text-gray-700 mb-3">
              Seamless Communication
            </h3>
            <p className="text-gray-600">
              Frictionless communication tools to connect students and tutors
              efficiently.
            </p>
          </div>

          {/* Feature 4 */}
          <div className="flex flex-col items-center text-center p-6 bg-yellow-50 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
            <div className="text-5xl text-yellow-700 mb-4">
              <FaDollarSign />
            </div>
            <h3 className="text-xl font-semibold text-gray-700 mb-3">
              Fair Pricing
            </h3>
            <p className="text-gray-600">
              Competitive and flexible pricing options to suit every budget
              without compromising on quality.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
