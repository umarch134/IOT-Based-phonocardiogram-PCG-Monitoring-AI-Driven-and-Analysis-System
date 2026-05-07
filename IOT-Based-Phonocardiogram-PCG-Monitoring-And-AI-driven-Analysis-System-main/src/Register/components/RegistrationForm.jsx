// src/components/RegistrationForm.jsx
import React from 'react';
import PasswordInput from './PasswordInput'; // New reusable component

const RegistrationForm = ({
  userType,
  gender,
  setGender,
  showPassword,
  setShowPassword,
  showConfirmPassword,
  setShowConfirmPassword,
  onSubmit,
  // Input states and setters
  fullName,
  setFullName,
  specificField,
  setSpecificField,
  phoneNumber,
  setPhoneNumber,
  email,
  setEmail,
  password,
  setPassword,
  confirmPassword,
  setConfirmPassword,
}) => {
  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <input
        type="text"
        placeholder="Full Name"
        required
        value={fullName}
        onChange={(e) => setFullName(e.target.value)}
        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
      />

      {userType === "doctor" ? (
        <input
          type="text"
          placeholder="Specialization"
          required
          value={specificField}
          onChange={(e) => setSpecificField(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      ) : (
        <input
          type="number"
          placeholder="Age"
          required
          value={specificField}
          onChange={(e) => setSpecificField(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      )}

      <div className="w-full px-4 py-2 border rounded-lg focus-within:ring-2 focus-within:ring-blue-400">
        <div className="flex items-center justify-between">
          <label className="text-gray-700 font-medium">Gender</label>
          <div className="flex space-x-4">
            <label className="flex items-center space-x-1 text-gray-700">
              <input
                type="radio"
                name="gender"
                value="male"
                checked={gender === "male"}
                onChange={(e) => setGender(e.target.value)}
                required
              />
              <span>Male</span>
            </label>
            <label className="flex items-center space-x-1 text-gray-700">
              <input
                type="radio"
                name="gender"
                value="female"
                checked={gender === "female"}
                onChange={(e) => setGender(e.target.value)}
              />
              <span>Female</span>
            </label>
            <label className="flex items-center space-x-1 text-gray-700">
              <input
                type="radio"
                name="gender"
                value="other"
                checked={gender === "other"}
                onChange={(e) => setGender(e.target.value)}
              />
              <span>Other</span>
            </label>
          </div>
        </div>
      </div>

      <input
        type="tel"
        placeholder="Phone Number"
        required
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
      <input
        type="email"
        placeholder="Email Address"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
      />

      <PasswordInput
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        showPassword={showPassword}
        setShowPassword={setShowPassword}
      />
      <PasswordInput
        placeholder="Confirm Password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        showPassword={showConfirmPassword}
        setShowPassword={setShowConfirmPassword}
      />

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
      >
        Register
      </button>
    </form>
  );
};

export default RegistrationForm;