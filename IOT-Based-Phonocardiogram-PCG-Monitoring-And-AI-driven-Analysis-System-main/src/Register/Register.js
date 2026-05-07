import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import RegistrationHeader from "./components/RegistrationHeader";
import UserTypeToggle from "./components/UserTypeToggle";
import PersonalInfoForm from "./components/PersonalInfoForm";
import PatientInfoForm from "./components/PatientInfoForm";
import DoctorInfoForm from "./components/DoctorInfoForm";
import AccountInfoForm from "./components/AccountInfoForm";
import AuthLinks from "./components/AuthLinks";

const Register = () => {
  const navigate = useNavigate();
  const [userType, setUserType] = useState("patient");
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
    gender: "male",
    age: "",
    specialization: "",
  });

  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState(""); // 'success' | 'error'

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setMessageType("");

    if (formData.password !== formData.confirmPassword) {
      setMessage("Passwords do not match.");
      setMessageType("error");
      return;
    }

    if (userType === "patient" && !formData.age) {
      setMessage("Please enter age for patient.");
      setMessageType("error");
      return;
    }

    if (userType === "doctor" && !formData.specialization) {
      setMessage("Please enter specialization for doctor.");
      setMessageType("error");
      return;
    }

    try {
      const payload = {
        fullName: formData.fullName,
        email: formData.email,
        phoneNumber: formData.phoneNumber,
        password: formData.password,
        confirmPassword: formData.confirmPassword,
        gender: formData.gender,
        userType: userType, // 👈 ensure userType is included
        age: userType === "patient" ? formData.age : undefined,
        specialization: userType === "doctor" ? formData.specialization : undefined,
      };

      console.log("📦 Sending registration payload:", payload);

      const response = await axios.post(
        "http://localhost:5000/api/auth/register",
        payload,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("✅ Registration response:", response.data);

      setMessage(response.data.message || "Registration successful!");
      setMessageType("success");

      setFormData({
        fullName: "",
        email: "",
        phoneNumber: "",
        password: "",
        confirmPassword: "",
        gender: "male",
        age: "",
        specialization: "",
      });

      setTimeout(() => navigate("/login"), 2000);
    } catch (error) {
      console.error("❌ Registration error:", error);
      setMessage(
        error.response?.data?.message ||
          "Something went wrong. Please try again."
      );
      setMessageType("error");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-100 to-purple-300 p-6">
      <div className="bg-white rounded-2xl shadow-lg p-10 w-full max-w-lg relative">
        <RegistrationHeader />
        <UserTypeToggle userType={userType} setUserType={setUserType} />

        {message && (
          <p
            className={`text-center mb-4 font-medium ${
              messageType === "error" ? "text-red-500" : "text-green-600"
            }`}
          >
            {message}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <PersonalInfoForm formData={formData} handleChange={handleChange} />
          {userType === "patient" ? (
            <PatientInfoForm formData={formData} handleChange={handleChange} />
          ) : (
            <DoctorInfoForm formData={formData} handleChange={handleChange} />
          )}
          <AccountInfoForm
            formData={formData}
            handleChange={handleChange}
            showPassword={showPassword}
            setShowPassword={setShowPassword}
          />
          <button
            type="submit"
            className="w-full bg-purple-600 text-white py-3 px-4 rounded-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition duration-200"
          >
            Register
          </button>
        </form>

        <AuthLinks isRegister={true} />
      </div>
    </div>
  );
};

export default Register;
