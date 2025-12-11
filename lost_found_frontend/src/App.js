import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Dashboard from "./components/Dashboard";
import ReportLost from "./components/ReportLost";
import FoundItemReport from "./components/FoundItemReport";
import AdminLogin from "./components/AdminLogin";

import MatchedItems from "./components/MatchedItems";
export default function App() {
  return (
    <Router>
      <nav className="navbar navbar-expand navbar-dark bg-dark mb-4">
        <div className="container">
          <Link className="navbar-brand" to="/">
            Lost & Found Portal
          </Link>
        </div>
      </nav>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/report-lost" element={<ReportLost />} />
        <Route path="/report-found" element={<FoundItemReport />} />
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/matched-items" element={<MatchedItems />} />
      </Routes>
    </Router>
  );
}
