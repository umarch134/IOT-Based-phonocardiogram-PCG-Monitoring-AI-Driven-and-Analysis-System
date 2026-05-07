// src/components/UserTypeToggle.jsx
import React from 'react';

const UserTypeToggle = ({ userType, setUserType }) => {
  return (
    <div className="flex justify-center space-x-4 mb-6">
      <button
        onClick={() => setUserType("patient")}
        className={`px-4 py-2 rounded-full font-semibold transition ${
          userType === "patient"
            ? "bg-blue-600 text-white"
            : "bg-gray-200 text-gray-700"
        }`}
        type="button"
      >
        Patient
      </button>
      <button
        onClick={() => setUserType("doctor")}
        className={`px-4 py-2 rounded-full font-semibold transition ${
          userType === "doctor"
            ? "bg-blue-600 text-white"
            : "bg-gray-200 text-gray-700"
        }`}
        type="button"
      >
        Doctor
      </button>
    </div>
  );
};

export default UserTypeToggle;