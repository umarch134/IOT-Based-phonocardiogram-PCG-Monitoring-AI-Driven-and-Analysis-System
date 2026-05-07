// src/components/PasswordInput.jsx
import React from 'react';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline'; // Install @heroicons/react if not already

const PasswordInput = ({ placeholder, value, onChange, showPassword, setShowPassword }) => {
  return (
    <div className="relative">
      <input
        type={showPassword ? "text" : "password"}
        placeholder={placeholder}
        required
        value={value}
        onChange={onChange}
        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
      <button
        type="button"
        onClick={() => setShowPassword(!showPassword)}
        className="absolute right-3 top-2/4 -translate-y-2/4 text-gray-600 hover:text-blue-600"
        aria-label={showPassword ? "Hide password" : "Show password"}
      >
        {showPassword ? (
          <EyeSlashIcon className="h-5 w-5" />
        ) : (
          <EyeIcon className="h-5 w-5" />
        )}
      </button>
    </div>
  );
};

export default PasswordInput;