import React from "react";
import { FcGoogle } from "react-icons/fc";
import { FaApple } from "react-icons/fa";

const SignUpForm = () => {
  return (
    <div className="min-h-screen bg-[#0F172A] flex items-center justify-center p-4">
      <div className="w-full max-w-[640px] bg-[#1F2937] rounded-lg shadow md:mt-0 xl:p-0 border border-gray-700">
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
          {/* Logo */}
          <a
            href="#"
            className="flex items-center mb-6 text-2xl font-semibold text-white"
          >
            <svg
              className="w-8 h-8 mr-2"
              viewBox="0 0 33 33"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M16.5 33C25.6127 33 33 25.6127 33 16.5C33 7.3873 25.6127 0 16.5 0C7.3873 0 0 7.3873 0 16.5C0 25.6127 7.3873 33 16.5 33Z"
                fill="#1C64F2"
              />
              <path
                d="M25.3125 14.5312C25.3125 18.0625 22.4688 20.9375 18.9062 20.9375H12.875C11.9688 20.9375 11.25 20.2188 11.25 19.3125V10.125C11.25 9.21875 11.9688 8.5 12.875 8.5H19.5625C22.75 8.5 25.3125 11.1875 25.3125 14.5312Z"
                fill="white"
              />
            </svg>
            Flowbite
          </a>

          {/* Header */}
          <h1 className="text-xl font-bold leading-tight tracking-tight text-white md:text-2xl">
            Create your Account
          </h1>
          <p className="text-sm font-light text-gray-400">
            Start your website in seconds. Already have an account?{" "}
            <a href="#" className="font-medium text-blue-500 hover:underline">
              Login here
            </a>
            .
          </p>

          <form className="space-y-4 md:space-y-6" action="#">
            {/* Input Grid */}
            <div className="grid gap-6 mb-6 md:grid-cols-2">
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-white"
                >
                  Your email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="bg-gray-700 border border-gray-600 text-white sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 placeholder-gray-400"
                  placeholder="name@company.com"
                  required=""
                />
              </div>
              <div>
                <label
                  htmlFor="fullName"
                  className="block mb-2 text-sm font-medium text-white"
                >
                  Full Name
                </label>
                <input
                  type="text"
                  name="fullName"
                  id="fullName"
                  className="bg-gray-700 border border-gray-600 text-white sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 placeholder-gray-400"
                  placeholder="e.g. Bonnie Green"
                  required=""
                />
              </div>
              <div>
                <label
                  htmlFor="country"
                  className="block mb-2 text-sm font-medium text-white"
                >
                  Country
                </label>
                <select
                  id="country"
                  className="bg-gray-700 border border-gray-600 text-white sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 placeholder-gray-400"
                >
                  <option>Choose a country</option>
                  <option>United States</option>
                  <option>Germany</option>
                  <option>France</option>
                  <option>United Kingdom</option>
                </select>
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-white"
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  className="bg-gray-700 border border-gray-600 text-white sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 placeholder-gray-400"
                  required=""
                />
              </div>
            </div>

            {/* Divider */}
            <div className="relative flex py-2 items-center">
              <div className="flex-grow border-t border-gray-600"></div>
              <span className="flex-shrink mx-4 text-gray-400">or</span>
              <div className="flex-grow border-t border-gray-600"></div>
            </div>

            {/* Social Buttons */}
            <div className="flex flex-col gap-3">
              <button
                type="button"
                className="text-white w-full bg-[#1F2937] hover:bg-gray-700 border border-gray-600 focus:ring-4 focus:outline-none focus:ring-gray-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center justify-center mr-2 mb-2"
              >
                <FcGoogle className="w-5 h-5 mr-2" />
                Sign up with Google
              </button>
            </div>

            {/* Checkboxes */}
            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="terms"
                  aria-describedby="terms"
                  type="checkbox"
                  className="w-4 h-4 border border-gray-600 rounded bg-gray-700 focus:ring-3 focus:ring-blue-600 ring-offset-gray-800"
                  required=""
                />
              </div>
              <div className="ml-3 text-sm">
                <label htmlFor="terms" className="font-light text-gray-300">
                  By signing up, you are creating a Flowbite account, and you
                  agree to Flowbite's{" "}
                  <a
                    className="font-medium text-blue-500 hover:underline"
                    href="#"
                  >
                    Terms of Use
                  </a>{" "}
                  and{" "}
                  <a
                    className="font-medium text-blue-500 hover:underline"
                    href="#"
                  >
                    Privacy Policy
                  </a>
                  .
                </label>
              </div>
            </div>

            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="newsletter"
                  aria-describedby="newsletter"
                  type="checkbox"
                  className="w-4 h-4 border border-gray-600 rounded bg-gray-700 focus:ring-3 focus:ring-blue-600 ring-offset-gray-800"
                />
              </div>
              <div className="ml-3 text-sm">
                <label
                  htmlFor="newsletter"
                  className="font-light text-gray-300"
                >
                  Email me about product updates and resources.
                </label>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            >
              Create an account
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUpForm;
