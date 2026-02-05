import React, { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
 // Centralized Axios instance

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
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
    if (!formData.email) {
      Error.email = "Email is required";
    } else if (!/^[\w.]+@gmail\.com$/.test(formData.email)) {
      Error.email = "Please enter a valid @gmail.com address";
    }
    
    if (!formData.password) {
      Error.password = "Password is required";
    }

    setValidationError(Error);
    return Object.keys(Error).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return toast.error("Please fill all fields correctly");

    setIsLoading(true);
    try {
      // Sending request to http://localhost:4500/api/auth/login
      const res = await api.post("/login", {
        email: formData.email,
        password: formData.password
      });

      // Store JWT token and user info
      localStorage.setItem("token", res.data.token);
      
      toast.success(`Welcome back, ${res.data.user.fullName}! 💬`);
      
      // Redirect to home page
      navigate("/");
    } catch (error) {
      // Display error message from backend
      toast.error(error.response?.data?.msg || "Login failed. Check your credentials.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 px-4">
      <div className="w-full max-w-sm bg-base-100 rounded-3xl shadow-2xl overflow-hidden border border-base-300">
        
        {/* Header Section */}
        <div className="bg-primary text-primary-content text-center py-8">
          <h1 className="text-3xl font-extrabold tracking-tight">💬 ChatterBox</h1>
          <p className="text-sm mt-2 opacity-90">Sign in to continue chatting</p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          
          <InputField
            emoji="📧"
            placeholder="Email Address"
            name="email"
            type="email"
            autoComplete="email"
            value={formData.email}
            onChange={handleChange}
            error={validationError.email}
          />

          <InputField
            emoji="🔒"
            placeholder="Password"
            name="password"
            type="password"
            autoComplete="current-password"
            value={formData.password}
            onChange={handleChange}
            error={validationError.password}
          />

          <div className="text-right">
            <a href="#" className="text-xs link link-secondary hover:text-primary transition">
              Forgot Password?
            </a>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-3 rounded-xl btn btn-primary text-white font-bold text-lg transition duration-300 ${isLoading ? 'loading' : 'hover:scale-105 shadow-lg'}`}
          >
            {isLoading ? "Authenticating..." : "Login to Account 🚀"}
          </button>

          <div className="text-center pt-4 border-t border-base-300">
            <span className="text-sm text-base-content/60">New to ChatterBox?</span>
            <Link to="/register" className="text-sm link link-primary font-bold ml-2">
              Create an Account
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

/* Reusable Styled Input Component */
const InputField = ({ emoji, error, ...props }) => (
  <div className="flex flex-col gap-1">
    <div
      className={`flex items-center gap-3 px-4 py-3 rounded-xl border transition-all duration-200
      ${error ? "border-error bg-error/5" : "border-base-300 bg-base-200/50 focus-within:border-primary focus-within:bg-base-100"}`}
    >
      <span className="text-xl filter drop-shadow-sm">{emoji}</span>
      <input 
        {...props} 
        className="w-full bg-transparent outline-none text-base-content placeholder:text-base-content/40" 
      />
    </div>
    {error && <p className="text-[10px] text-error font-medium ml-2 animate-pulse">{error}</p>}
  </div>
);

export default Login;