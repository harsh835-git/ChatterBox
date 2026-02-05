import React, { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import api from '../config/Api'

const Register = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmpassword: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [validationError, setValidationError] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    let Error = {};
    if (formData.fullName.length < 3) Error.fullName = "Enter full name (min 3 chars)";
    if (!/^[\w.]+@gmail\.com$/.test(formData.email)) Error.email = "Only @gmail.com supported for now";
    if (!/^[6-9]\d{9}$/.test(formData.phone)) Error.phone = "Invalid 10-digit mobile number";
    if (formData.password.length < 6) Error.password = "Minimum 6 characters";
    if (formData.password !== formData.confirmpassword) Error.confirmpassword = "passwords do not match";

    setValidationError(Error);
    return Object.keys(Error).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return toast.error("Please fix the errors");

    setIsLoading(true);
    try {
      // Sending data to http://localhost:4500/api/auth/register
      const res = await api.post("/register", {
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        password: formData.password
      });

      toast.success(res.data.message || "Account Created! Welcome to ChatterBox 💬");
      navigate("/login");
    } catch (error) {
      toast.error(error.response?.data?.error || "Registration failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 px-4">
      <div className="w-full max-w-md bg-base-100 rounded-3xl shadow-2xl overflow-hidden m-6 border border-base-300">
        {/* Header */}
        <div className="bg-primary text-primary-content text-center py-6">
          <h1 className="text-3xl font-extrabold">💬 ChatterBox</h1>
          <p className="text-sm mt-1">Connect with the world</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          
          <InputField
            emoji="👤"
            placeholder="Full Name"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            error={validationError.fullName}
          />

          <InputField
            emoji="📧"
            placeholder="Email Address"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            error={validationError.email}
          />

          <InputField
            emoji="📱"
            placeholder="Phone Number"
            name="phone"
            maxLength="10"
            value={formData.phone}
            onChange={handleChange}
            error={validationError.phone}
          />

          <InputField
            emoji="🔒"
            placeholder="Create password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            error={validationError.password}
          />

          <InputField
            emoji="✅"
            placeholder="Confirm password"
            name="confirmpassword"
            type="password"
            value={formData.confirmpassword}
            onChange={handleChange}
            error={validationError.confirmpassword}
          />

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-3 rounded-xl btn btn-primary text-white font-bold text-lg transition ${isLoading ? 'loading' : ''}`}
          >
            {isLoading ? "Signing up..." : "Join the Conversation 🚀"}
          </button>

          <div className="text-center mt-4">
            <span className="text-sm text-base-content/60">Already have an account?</span>
            <Link to="/login" className="text-sm link link-primary font-semibold ml-1">Login</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

/* Reusable Styled Input Component */
const InputField = ({ emoji, error, ...props }) => (
  <div>
    <div
      className={`flex items-center gap-3 px-4 py-3 rounded-xl border
      ${error ? "border-error" : "border-base-300 focus-within:border-primary"}
      bg-base-200/50`}
    >
      <span className="text-xl">{emoji}</span>
      <input {...props} className="w-full bg-transparent outline-none text-base-content" />
    </div>
    {error && <p className="text-xs text-error mt-1 ml-2">{error}</p>}
  </div>
);

export default Register;