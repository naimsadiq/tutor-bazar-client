import { useState } from "react";
import UpdateUserRoleModal from "../Modal/UpdateUserRoleModal";

const UserDataRow = ({ user, refetch }) => {
  let [isOpen, setIsOpen] = useState(false);
  const closeModal = () => setIsOpen(false);

  return (
    <tr className="bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200">
      <td className="px-5 py-5 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm">
        <div className="flex items-center">
          {user?.photoURL && (
            <img
              src={user.photoURL}
              alt={user?.name || user?.email}
              className="w-8 h-8 rounded-full mr-3"
            />
          )}
          <div>
            <p className="text-gray-900 dark:text-gray-200 font-medium">
              {user?.name || "No Name"}
            </p>
            <p className="text-gray-600 dark:text-gray-400 text-xs">
              {user?.email}
            </p>
          </div>
        </div>
      </td>

      <td className="px-5 py-5 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm">
        <span
          className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
            user?.role === "admin"
              ? "bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-300"
              : user?.role === "teacher"
              ? "bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-300"
              : "bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-300"
          }`}
        >
          {user?.role?.charAt(0).toUpperCase() + user?.role?.slice(1)}
        </span>
      </td>

      <td className="px-5 py-5 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm">
        <button
          onClick={() => setIsOpen(true)}
          className="relative cursor-pointer inline-flex items-center px-4 py-2 font-semibold text-green-900 dark:text-green-300 leading-tight hover:scale-105 transition-transform duration-200"
        >
          <span
            aria-hidden="true"
            className="absolute inset-0 bg-green-200 dark:bg-green-800 opacity-50 rounded-lg"
          ></span>
          <span className="relative flex items-center gap-2">
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
              />
            </svg>
            Update Role
          </span>
        </button>
        {/* Modal */}
        <UpdateUserRoleModal
          user={user}
          refetch={refetch}
          isOpen={isOpen}
          closeModal={closeModal}
        />
      </td>
    </tr>
  );
};

export default UserDataRow;
