// src/components/LoginHeader.jsx
import React from 'react';

const LoginHeader = ({ userType }) => {
  return (
    <h2 className="text-3xl font-bold text-center text-blue-800 mb-6">
      Login as {userType === "doctor" ? "Doctor" : "Patient"}
    </h2>
  );
};

export default LoginHeader;