import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // This is the function where you place the backend connection logic
  const handleLogin = async (e) => {
    e.preventDefault(); // Prevents the page from refreshing on submit

    try {
      // --- START OF YOUR BACKEND FETCH CODE ---
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // Store the JWT token in the browser's storage
        localStorage.setItem("token", data.token);
        // Move the user to the home page
        navigate("/");
      } else {
        // Show an error message if login fails
        alert(data.msg || "Login failed");
      }
      // --- END OF YOUR BACKEND FETCH CODE ---
    } catch (error) {
      console.error("Network error:", error);
      alert("Could not connect to the server.");
    }
  };

  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center p-4">
      <div className="card bg-base-100 w-full max-w-sm shadow-xl border border-base-300">
        <div className="card-body">
          <h2 className="card-title text-2xl font-bold text-base-content justify-center mb-4">
            Welcome Back
          </h2>

          <form onSubmit={handleLogin} className="space-y-5">
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium text-base-content">
                  Email Address
                </span>
              </label>
              <input
                type="email"
                placeholder="email@example.com"
                className="input input-bordered w-full bg-base-100 focus:border-primary"
                value={email}
                onChange={(e) => setEmail(e.target.value)} // Update state on type
                required
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium text-base-content">
                  Password
                </span>
              </label>
              <input
                type="password"
                placeholder="••••••••"
                className="input input-bordered bg-base-100 focus:border-primary"
                value={password}
                onChange={(e) => setPassword(e.target.value)} // Update state on type
                required
              />
            </div>

            <div className="form-control mt-4">
              <button
                type="submit"
                className="btn btn-primary text-primary-content w-full"
              >
                Sign In
              </button>
            </div>
          </form>

          <div className="text-center mt-6">
            <span className="text-sm text-base-content/60">New here?</span>
            <Link
              to="/register"
              className="text-sm link link-primary font-semibold ml-1"
            >
              Create account
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
