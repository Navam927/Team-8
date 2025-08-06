import React, { useState,useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


const Signup = () => {
  const navigate=useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({});
    setSuccess("");
    navigate("/login");
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.fullName) newErrors.fullName = "Full name is required";
    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.password) newErrors.password = "Password is required";
    if (formData.password !== formData.confirmPassword)
      newErrors.confirmPassword = "Passwords do not match";
    return newErrors;
  };

 
const handleSubmit = async (e) => {
  e.preventDefault();
  const validationErrors = validate();
  if (Object.keys(validationErrors).length) {
    setErrors(validationErrors);
    return;
  }

  try {
    const response = await axios.post("http://localhost:4000/auth/register", {
      name: formData.fullName,
      email: formData.email,
      password: formData.password,
    });
    setSuccess("Signup successful!");
    setFormData({ fullName: "", email: "", password: "", confirmPassword: "" });
    setErrors({});
    navigate
  } catch (error) {
    setErrors({ api: error.response?.data?.message || "Signup failed" });
    setSuccess("");
  }
};


  return (
    <div className="min-h-screen flex items-center justify-center bg-black px-4">
      <div className="relative w-full max-w-md p-8 bg-white text-black rounded-2xl shadow-2xl">
        {/* Gradient glow background */}
        <div className="absolute -inset-1 rounded-2xl bg-gradient-to-br from-white/10 to-white/5 blur-xl opacity-25 animate-pulse"></div>

        <div className="relative z-10">
          <h2 className="text-4xl font-bold text-center mb-6">
            Create Your Account
          </h2>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium mb-1">Full Name</label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-md border border-black focus:outline-none focus:ring-2 focus:ring-black bg-white text-black"
                placeholder="John Doe"
              />
              {errors.fullName && (
                <p className="text-sm text-red-500">{errors.fullName}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-md border border-black focus:outline-none focus:ring-2 focus:ring-black bg-white text-black"
                placeholder="you@example.com"
              />
              {errors.email && (
                <p className="text-sm text-red-500">{errors.email}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-md border border-black focus:outline-none focus:ring-2 focus:ring-black bg-white text-black"
                placeholder="••••••••"
              />
              {errors.password && (
                <p className="text-sm text-red-500">{errors.password}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Confirm Password
              </label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-md border border-black focus:outline-none focus:ring-2 focus:ring-black bg-white text-black"
                placeholder="••••••••"
              />
              {errors.confirmPassword && (
                <p className="text-sm text-red-500">{errors.confirmPassword}</p>
              )}
            </div>

            <button
              type="submit"
              className="w-full py-2 bg-black text-white rounded-md hover:bg-white hover:text-black border border-black transition duration-300 font-semibold"
            >
              Sign Up
            </button>

            {success && (
              <p className="text-sm text-green-600 text-center mt-2">{success}</p>
            )}
          </form>

          <p className="text-sm text-center text-gray-600 mt-6">
            Already have an account?{" "}
            <a
              href="/login"
              className="underline hover:text-black transition-colors"
            >
              Log in
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
