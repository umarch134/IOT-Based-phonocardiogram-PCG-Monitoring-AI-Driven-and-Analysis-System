// src/components/AuthLinks.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const AuthLinks = ({ onForgotPasswordClick }) => {
  return (
    <>
      <p className="text-center text-sm text-blue-600 hover:underline cursor-pointer mt-3" onClick={onForgotPasswordClick}>
        Forgot Password?
      </p>

      <p className="text-center text-gray-600 mt-6">
        Don't have an account?{" "}
        <Link to="/register" className="text-blue-600 hover:underline">
          Register here
        </Link>
      </p>
    </>
  );
};

export default AuthLinks;