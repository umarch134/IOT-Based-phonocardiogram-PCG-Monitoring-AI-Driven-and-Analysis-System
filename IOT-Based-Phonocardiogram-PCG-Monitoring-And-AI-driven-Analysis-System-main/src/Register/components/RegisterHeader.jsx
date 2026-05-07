// src/components/RegisterHeader.jsx
import React from 'react';

const RegisterHeader = ({ userType }) => {
  return (
    <h2 className="text-3xl font-bold text-center text-blue-800 mb-6">
      Register as {userType === "doctor" ? "Doctor" : "Patient"}
    </h2>
  );
};

export default RegisterHeader;