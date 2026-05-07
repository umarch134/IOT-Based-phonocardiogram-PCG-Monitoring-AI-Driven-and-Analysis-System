import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import LoginHeader from "./components/LoginHeader";
import UserTypeToggle from "./components/UserTypeToggle";
import LoginForm from "./components/LoginForm";
import ForgotPasswordModal from "./components/ForgotPasswordModal";
import AuthLinks from "./components/AuthLinks";

const Login = () => {
  const navigate = useNavigate();
  const [userType, setUserType] = useState("patient");
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showForgetModal, setShowForgetModal] = useState(false);
  const [forgetEmail, setForgetEmail] = useState("");

  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const validateEmail = (email) => /.+@.+\..+/.test(email);

  const handleSubmit = async (e) => {
  e.preventDefault();
  setMessage("");
  setMessageType("");
  setIsLoading(true);

  if (!email || !password) {
    setMessage("Please enter both email and password.");
    setMessageType("error");
    setIsLoading(false);
    return;
  }

  if (!validateEmail(email)) {
    setMessage("Please enter a valid email address.");
    setMessageType("error");
    setIsLoading(false);
    return;
  }

 

try {
  const response = await axios.post("http://localhost:5000/api/auth/login", {
    email,
    password,
    userType,
  });

  const { user, token, message: successMsg } = response.data;

  if (!user || !token) throw new Error("Invalid response from server");

  // Save auth info
  localStorage.setItem("token", token);
  localStorage.setItem("doctorId", user._id || user.id);
  localStorage.setItem("userId", user._id || user.id);
  localStorage.setItem("fullName", user.fullName);
  localStorage.setItem("email", user.email);
  localStorage.setItem("userType", user.userType);

  const headers = { Authorization: `Bearer ${token}` };

  if (user.userType === "patient") {
    const profileRes = await axios.get(
      `http://localhost:5000/api/auth/patient/${user.id}`,
      { headers }
    );

    localStorage.setItem(
      "patientData",
      JSON.stringify(profileRes.data.profile || {})
    );
    navigate("/patient");

  } else if (user.userType === "doctor") {
      try {
        const profileRes = await axios.get(
          "http://localhost:5000/api/doctors/me",
          { headers }
        );

        const doctorProfile = profileRes.data.doctor;

        if (!doctorProfile) {
          throw new Error("Doctor profile missing.");
        }

        localStorage.setItem("doctorData", JSON.stringify(doctorProfile));
        navigate("/doctor");
      } catch (err) {
        console.error("Doctor profile fetch error:", err);
        setMessageType("error");
        setMessage("Unable to load doctor profile.");
        return;
      }
    }
  } catch (error) {
    console.error("Login error:", error);
    setMessageType("error");
    setMessage(
      error.response?.data?.message || "Something went wrong. Please try again."
    );
  } finally {
    setIsLoading(false);
  }
};



  const handleForgetSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setMessageType("");

    if (!forgetEmail || !validateEmail(forgetEmail)) {
      setMessage("Please enter a valid email to reset password.");
      setMessageType("error");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/forgot-password",
        { email: forgetEmail }
      );

      setMessageType("success");
      setMessage(response.data.message);
      setForgetEmail("");
      setShowForgetModal(false);
    } catch (error) {
      console.error("Forgot password error:", error);
      setMessageType("error");
      setMessage(
        error.response?.data?.message || "Failed to send password reset link."
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-blue-300 p-6">
      <div className="bg-white rounded-2xl shadow-lg p-10 w-full max-w-md relative">
        <LoginHeader userType={userType} />
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

        <LoginForm
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
          showPassword={showPassword}
          setShowPassword={setShowPassword}
          handleSubmit={handleSubmit}
          isLoading={isLoading}
        />

        <AuthLinks onForgotPasswordClick={() => setShowForgetModal(true)} />

        {showForgetModal && (
          <ForgotPasswordModal
            forgetEmail={forgetEmail}
            setForgetEmail={setForgetEmail}
            handleForgetSubmit={handleForgetSubmit}
            onClose={() => {
              setShowForgetModal(false);
              setMessage("");
              setMessageType("");
            }}
          />
        )}
      </div>
    </div>
  );
};

export default Login;
