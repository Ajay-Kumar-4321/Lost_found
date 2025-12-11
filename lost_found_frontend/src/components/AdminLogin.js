import React, { useState } from "react";
import API from "../services/api";
import AdminPanel from "./AdminPanel";

function AdminLogin() {
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    // Simple static admin check; replace with your real login!
    if (user === "admin" && pass === "admin123") {
      setIsLoggedIn(true);
      setError("");
    } else {
      setError("Invalid admin credentials.");
    }
  };

  return isLoggedIn ? (
    <AdminPanel />
  ) : (
    <div className="container mt-5" style={{ maxWidth: 400 }}>
      <h3 className="mb-3">Admin Login</h3>
      <form className="card p-3 shadow" onSubmit={handleLogin}>
        <div className="mb-3">
          <label>Username</label>
          <input
            className="form-control"
            value={user}
            onChange={(e) => setUser(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label>Password</label>
          <input
            className="form-control"
            type="password"
            value={pass}
            onChange={(e) => setPass(e.target.value)}
            required
          />
        </div>
        {error && <div className="mb-2 text-danger">{error}</div>}
        <button className="btn btn-primary w-100" type="submit">
          Login
        </button>
      </form>
    </div>
  );
}

export default AdminLogin;
