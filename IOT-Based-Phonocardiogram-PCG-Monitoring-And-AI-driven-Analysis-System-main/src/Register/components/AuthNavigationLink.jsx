// src/components/AuthNavigationLink.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const AuthNavigationLink = ({ text, linkText, to }) => {
  return (
    <p className="text-center text-gray-600 mt-6">
      {text}{" "}
      <Link to={to} className="text-blue-600 hover:underline">
        {linkText}
      </Link>
    </p>
  );
};

export default AuthNavigationLink;