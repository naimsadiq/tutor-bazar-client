import React from "react";

const About = () => {
  return (
    <div className="bg-base-100 text-base-content mt-12">
      {/* Hero Section */}
      <div
        className="hero min-h-[400px]"
        style={{
          backgroundImage:
            "url(https://i.ibb.co.com/MyjyS3rK/pngtree-cartoon-education-training-cram-school-picture-image-917042.png)",
        }}
      >
        <div className="hero-overlay bg-opacity-70"></div>
        <div className="hero-content text-center text-neutral-content">
          <div className="max-w-md">
            <h1 className="mb-5 text-5xl font-bold text-white">
              About Tutol Bazar
            </h1>
            <p className="mb-5 text-gray-200">
              Connecting students with the best tutors. A platform designed to
              make education accessible, transparent, and hassle-free.
            </p>
          </div>
        </div>
      </div>

      {/* Our Mission Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="flex flex-col lg:flex-row items-center gap-10">
          <div className="lg:w-1/2">
            <img
              src="https://i.ibb.co.com/Ldp439K9/i-Stock-1351416161-jpg.webp"
              alt="Our Mission"
              className="rounded-lg shadow-2xl w-full object-cover h-80"
            />
          </div>
          <div className="lg:w-1/2 space-y-5">
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
          </div>
        </div>
      </div>

      {/* Why Choose Us / Features */}
      <div className="bg-base-200 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-10">
            Why Choose Us?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Card 1 */}
            <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300">
              <div className="card-body items-center text-center">
                <h2 className="card-title text-primary">Verified Tutors</h2>
                <p>
                  We ensure all tutors are verified to provide the highest
                  quality education and safety for students.
                </p>
              </div>
            </div>
            {/* Card 2 */}
            <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300">
              <div className="card-body items-center text-center">
                <h2 className="card-title text-primary">Secure Payments</h2>
                <p>
                  Our platform ensures transparent financial tracking and secure
                  payment methods for peace of mind.
                </p>
              </div>
            </div>
            {/* Card 3 */}
            <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300">
              <div className="card-body items-center text-center">
                <h2 className="card-title text-primary">Smart Matching</h2>
                <p>
                  Post your requirements and get matched with the perfect tutor
                  based on subject, location, and budget.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
