import React from "react";

const Contact = () => {
  return (
    <div className="bg-base-100 text-base-content min-h-screen mt-14">
      {/* Header */}
      <div className="bg-primary py-10 text-center text-white">
        <h1 className="text-4xl font-bold">Contact Us</h1>
        <p className="mt-2">
          We'd love to hear from you! Reach out to us for any queries.
        </p>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information Section */}
          <div className="space-y-6">
            <h2 className="text-3xl font-bold mb-4">Get in Touch</h2>
            <p className="text-gray-600 mb-6">
              Have questions about finding a tutor or becoming one? Our support
              team is here to help you 24/7.
            </p>

            <div className="flex items-center gap-4 p-4 bg-base-200 rounded-lg shadow-sm">
              <div className="text-3xl">📍</div>
              <div>
                <h3 className="font-bold text-lg">Our Location</h3>
                <p>123 Education Street, Dhaka, Bangladesh</p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 bg-base-200 rounded-lg shadow-sm">
              <div className="text-3xl">📞</div>
              <div>
                <h3 className="font-bold text-lg">Phone Number</h3>
                <p>+880 1234 567 890</p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 bg-base-200 rounded-lg shadow-sm">
              <div className="text-3xl">✉️</div>
              <div>
                <h3 className="font-bold text-lg">Email Address</h3>
                <p>support@etuitionbd.com</p>
              </div>
            </div>
          </div>

          {/* Contact Form Section */}
          <div className="card bg-base-100 shadow-2xl border border-base-200">
            <div className="card-body">
              <h2 className="card-title text-2xl mb-4">Send us a Message</h2>
              <form className="space-y-4">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Name</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Your Name"
                    className="input input-bordered w-full"
                    required
                  />
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Email</span>
                  </label>
                  <input
                    type="email"
                    placeholder="Your Email"
                    className="input input-bordered w-full"
                    required
                  />
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Message</span>
                  </label>
                  {/* <textarea
                    className="textarea textarea-bordered h-32"
                    placeholder="Write your message here..."
                    required
                  ></textarea> */}
                </div>
                <textarea
                  className="textarea textarea-bordered h-32"
                  placeholder="Write your message here..."
                  required
                ></textarea>

                <div className="form-control mt-6">
                  <button className="btn btn-primary w-full text-white">
                    Send Message
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
