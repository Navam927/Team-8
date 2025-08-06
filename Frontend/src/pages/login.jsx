import React, { useState, useContext } from "react";
import { StoreProvider } from "../Context/StoreContext";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({});
    setSuccess("");
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.password) newErrors.password = "Password is required";
    return newErrors;
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
try {
  const response = await axios.post("http://localhost:4000/auth/login", {
    email: formData.email,
    password: formData.password,
  });

  setFormData({ email: "", password: "" });
  setErrors({});
  setSuccess("Logged in successfully!");
  navigate("/dashboard");
} catch (error) {
  setErrors({ api: error.response?.data?.message || "Login failed" });
  setSuccess("");
}
   
    
    console.log("Login successful", formData);
    setSuccess("Logged in successfully!");
    setFormData({ email: "", password: "" });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black px-4">
      <div className="relative w-full max-w-md p-8 bg-white text-black rounded-2xl shadow-2xl">
      
        <div className="absolute -inset-1 rounded-2xl bg-gradient-to-br from-white/10 to-white/5 blur-xl opacity-25 animate-pulse"></div>

        <div className="relative z-10">
          <h2 className="text-4xl font-bold text-center mb-6">Login</h2>

          <form onSubmit={handleSubmit} className="space-y-5">
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

            <button
              type="submit"
              className="w-full py-2 bg-black text-white rounded-md hover:bg-white hover:text-black border border-black transition duration-300 font-semibold"
            >
              Log In
            </button>

            {success && (
              <p className="text-sm text-green-600 text-center mt-2">{success}</p>
            )}
          </form>

          <p className="text-sm text-center text-gray-600 mt-6">
            Don’t have an account?{" "}
            <a
              href="/signup"
              className="underline hover:text-black transition-colors"
            >
              Sign up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
