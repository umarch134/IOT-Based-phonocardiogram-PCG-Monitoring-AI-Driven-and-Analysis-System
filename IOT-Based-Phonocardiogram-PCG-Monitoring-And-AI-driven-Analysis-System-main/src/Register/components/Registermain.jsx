import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import RegisterHeader from "./RegisterHeader";
import UserTypeToggle from "./UserTypeToggle";
import RegistrationForm from "./RegistrationForm";
import AuthNavigationLink from "./AuthNavigationLink";

const Register = () => {
  const navigate = useNavigate();

  const [userType, setUserType] = useState("patient");
  const [gender, setGender] = useState("male");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [fullName, setFullName] = useState("");
  const [specificField, setSpecificField] = useState(""); // age/specialization
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState(""); // success or error

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setMessageType("");

    // Validate required fields
    if (!fullName || !email || !phoneNumber || !password || !confirmPassword || !gender || !userType) {
      setMessage("\u26A0\uFE0F Please fill all required fields.");
      setMessageType("error");
      return;
    }

    if (!validateEmail(email)) {
      setMessage("\u26A0\uFE0F Please enter a valid email address.");
      setMessageType("error");
      return;
    }

    if (password.length < 6) {
      setMessage("\u26A0\uFE0F Password must be at least 6 characters long.");
      setMessageType("error");
      return;
    }

    if (password !== confirmPassword) {
      setMessage("\u26A0\uFE0F Passwords do not match.");
      setMessageType("error");
      return;
    }

    if (userType === "patient" && (!specificField || isNaN(specificField))) {
      setMessage("\u26A0\uFE0F Valid age is required for patient.");
      setMessageType("error");
      return;
    }

    if (userType === "doctor" && !specificField) {
      setMessage("\u26A0\uFE0F Specialization is required for doctor.");
      setMessageType("error");
      return;
    }

    const payload = {
      fullName,
      email,
      phoneNumber,
      password,
      confirmPassword,
      gender,
      userType,
      ...(userType === "patient" && { age: Number(specificField) }),
      ...(userType === "doctor" && { specialization: specificField }),
    };

    try {
      const res = await axios.post("http://localhost:5000/api/auth/register", payload, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      setMessage("\u2705 " + (res.data.message || "Registration successful! Please check your email."));
      setMessageType("success");

      setFullName("");
      setEmail("");
      setPhoneNumber("");
      setPassword("");
      setConfirmPassword("");
      setSpecificField("");
      setGender("male");

      setTimeout(() => navigate("/login"), 2500);
    } catch (error) {
      console.error("\u274C Registration error:", error);
      if (error.response?.status === 400 && error.response?.data?.message) {
        setMessage("\u26A0\uFE0F " + error.response.data.message);
      } else {
        setMessage("\u274C Something went wrong. Please try again.");
      }
      setMessageType("error");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-blue-300 p-6">
      <div className="bg-white rounded-2xl shadow-lg p-10 w-full max-w-md">
        <RegisterHeader userType={userType} />
        <UserTypeToggle userType={userType} setUserType={setUserType} />

        {message && (
          <p
            className={`text-center font-medium mb-4 ${
              messageType === "error" ? "text-red-500" : "text-green-600"
            }`}
          >
            {message}
          </p>
        )}

        <RegistrationForm
          userType={userType}
          gender={gender}
          setGender={setGender}
          showPassword={showPassword}
          setShowPassword={setShowPassword}
          showConfirmPassword={showConfirmPassword}
          setShowConfirmPassword={setShowConfirmPassword}
          onSubmit={handleSubmit}
          fullName={fullName}
          setFullName={setFullName}
          specificField={specificField}
          setSpecificField={setSpecificField}
          phoneNumber={phoneNumber}
          setPhoneNumber={setPhoneNumber}
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
          confirmPassword={confirmPassword}
          setConfirmPassword={setConfirmPassword}
        />

        <AuthNavigationLink
          text="Already have an account?"
          linkText="Login here"
          to="/login"
        />
      </div>
    </div>
  );
};

export default Register;
