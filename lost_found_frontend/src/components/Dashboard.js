import React from "react";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Dashboard</h2>

      {/* Report Lost Item Button */}
      <button
        className="btn btn-info"
        style={{ margin: "10px 0" }}
        onClick={() => navigate("/report-lost")}
      >
        Report Lost Item
      </button>

      {/* Report Found Item Button */}
      <button
        className="btn btn-success"
        style={{ margin: "10px 10px" }}
        onClick={() => navigate("/report-found")}
      >
        Report Found Item
      </button>

      {/* Add other dashboard UI as needed */}
      <button
        className="btn btn-warning me-2"
        onClick={() => navigate("/matched-items")}
      >
        Matched Items
      </button>
    </div>
  );
}

export default Dashboard;
