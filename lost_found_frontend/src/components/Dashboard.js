import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AdminPanel from "./AdminPanel";
import API from "../services/api";
import DashboardChat from "./DashboardChat";

function Dashboard() {
  const navigate = useNavigate();
  const [showManage, setShowManage] = useState(false);

  // Read from localStorage
  const storedUserType = localStorage.getItem("userType");
  const userType = storedUserType ? storedUserType : "student";
  const currentEmail = localStorage.getItem("userEmail") || "";
  const currentFullName = localStorage.getItem("fullName") || ""; // NEW

  // Reporting counts
  const [lostCount, setLostCount] = useState(0);
  const [foundCount, setFoundCount] = useState(0);
  const [matchedCount, setMatchedCount] = useState(0);

  useEffect(() => {
    API.get("/report/lost/all").then((res) => {
      setLostCount((res.data || []).length);
    });
    API.get("/report/found/all").then((res) => {
      setFoundCount((res.data || []).length);
    });
    API.get("/matched-items/all").then((res) => {
      const matches = res.data || [];
      setMatchedCount(matches.length);
    });
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("userType");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("fullName"); // optional
    navigate("/"); // or "/login"
  };

  if (showManage && userType === "admin") {
    return <AdminPanel />;
  }

  return (
    <div className="bg-dashboard">
      <div className="container">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="mb-0">Dashboard</h2>
          <div className="d-flex align-items-center">
            {currentEmail && (
              <span className="me-3 text-muted" style={{ fontSize: 14 }}>
                {currentFullName
                  ? `${currentFullName} (${currentEmail})`
                  : currentEmail}
              </span>
            )}
            <button className="btn btn-dashboard-logout" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </div>

        {/* Reporting cards */}
        <div className="row mb-4">
          <div className="col-12 col-md-4 mb-3">
            <div className="card shadow-sm text-center p-3">
              <h5 className="text-danger">Lost Reported</h5>
              <h2>{lostCount}</h2>
            </div>
          </div>
          <div className="col-12 col-md-4 mb-3">
            <div className="card shadow-sm text-center p-3">
              <h5 className="text-success">Found Reported</h5>
              <h2>{foundCount}</h2>
            </div>
          </div>
          <div className="col-12 col-md-4 mb-3">
            <div className="card shadow-sm text-center p-3">
              <h5 className="text-warning">Matched Items</h5>
              <h2>{matchedCount}</h2>
            </div>
          </div>
        </div>

        {/* Existing buttons */}
        <button
          className="btn btn-dashboard-lost"
          style={{ margin: "10px 0" }}
          onClick={() => navigate("/report-lost")}
        >
          Report Lost Item
        </button>
        <button
          className="btn btn-dashboard-found"
          style={{ margin: "10px 10px" }}
          onClick={() => navigate("/report-found")}
        >
          Report Found Item
        </button>
        <button
          className="btn btn-dashboard-matched me-2"
          onClick={() => navigate("/matched-items")}
        >
          Matched Items
        </button>

        {/* New dashboard chat section */}
        <DashboardChat />

        {/* Admin manage button */}
        {userType === "admin" && (
          <div className="mt-3">
            <button
              className="btn btn-dashboard-manage"
              onClick={() => setShowManage(true)}
            >
              Manage (Admin)
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
