import React, { useState, useEffect } from "react";
import "./index.css";

const Login = ({ onLogin }) => {
  const [phone, setPhone] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "dark");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const handleToggleLogin = () => {
    if (!isLoggedIn) {
      if (phone.trim() === "") {
        alert("Please enter a phone number");
        return;
      }
      alert("Login successful!");
      onLogin(phone);
    } else {
      alert("Logged out!");
      setPhone("");
      onLogin("");
    }
    setIsLoggedIn(!isLoggedIn);
  };

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "pastel" : "dark");
  };

  return (
    <div className="login-container">
      <h2>{isLoggedIn ? "Welcome!" : "Login with Phone"}</h2>

      {!isLoggedIn && (
        <input
          type="tel"
          className="login-input"
          placeholder="Enter phone number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
      )}

      <button className="login-button" onClick={handleToggleLogin}>
        {isLoggedIn ? "Logout" : "Login"}
      </button>

      {/* Theme Toggle Button */}
      <button className="theme-toggle" onClick={toggleTheme}>
        {theme === "dark" ? "🌞 Switch to Light Mode" : "🌙 Switch to Dark Mode"}
      </button>
    </div>
  );
};

export default Login;
