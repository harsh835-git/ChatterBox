import React, { useEffect, useState } from "react";
// 1. Import Link from react-router-dom
import { Link } from "react-router-dom";

const Navbar = () => {
  const [theme, setTheme] = useState("");

  const handleThemeChange = (event) => {
    const selectedTheme = event.target.value;
    setTheme(selectedTheme);
    localStorage.setItem("ChatterBoxTheme", selectedTheme);
    document.documentElement.setAttribute("data-theme", selectedTheme);
  };

  useEffect(() => {
    const currentTheme = localStorage.getItem("ChatterBoxTheme") || "light";
    document.documentElement.setAttribute("data-theme", currentTheme);
    setTheme(currentTheme);
  }, []);

  return (
    <>
      {/* Added items-center for vertical alignment and text-primary-content for contrast */}
      <div className="bg-primary text-primary-content flex justify-between items-center px-5 py-3 shadow-md">
        <Link to="/" className="text-xl font-bold tracking-tight">ChatterBox</Link>
        
        <div className="hidden md:flex gap-6 font-medium">
          <Link to="/" className="hover:opacity-80 transition">Home</Link>
          <Link to="/about" className="hover:opacity-80 transition">About</Link>
        </div>

        <div className="flex items-center gap-3">
          {/* 2. Login Button wrapped in Link */}
          <Link to="/login" className="btn btn-secondary btn-sm md:btn-md">
            Login
          </Link>

          {/* 3. Register Button added */}
          <Link to="/register" className="btn btn-accent btn-sm md:btn-md">
            Register
          </Link>

          <select
            name="theme"
            id="theme"
            className="select select-sm md:select-md bg-base-100 text-base-content"
            onChange={handleThemeChange}
            value={theme}
          >
            <option value="">Theme</option>
            <option value="light">Light</option>
            <option value="dark">Dark</option>
            <option value="claude">Claude</option>
            <option value="spotify">Spotify</option>
            <option value="vscode">VSCode</option>
            <option value="black">Black</option>
            <option value="corporate">Corporate</option>
            <option value="ghibli">Ghibli</option>
            <option value="gourmet">Gourmet</option>
            <option value="luxury">Luxury</option>
            <option value="mintlify">Mintlify</option>
            <option value="pastel">Pastel</option>
            <option value="perplexity">Perplexity</option>
            <option value="shadcn">Shadcn</option>
            <option value="slack">Slack</option>
            <option value="soft">Soft</option>
            <option value="valorant">Valorant</option>
          </select>
        </div>
      </div>
    </>
  );
};

export default Navbar;