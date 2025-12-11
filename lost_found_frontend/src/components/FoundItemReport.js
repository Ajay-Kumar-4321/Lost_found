import React, { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

const FoundItemReport = () => {
  const [itemName, setItemName] = useState("");
  const [location, setLocation] = useState("");
  const [foundDate, setFoundDate] = useState("");
  const [description, setDescription] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const foundReport = {
        itemName,
        location,
        foundDate,
        description,
      };
      await API.post("/report/found", foundReport);
      alert("Found item report submitted!");
      navigate("/dashboard");
    } catch (error) {
      alert(
        error.response?.data || "An error occurred. Please check your inputs."
      );
    }
  };

  return (
    <div
      className="bg-report-found d-flex justify-content-center align-items-center"
      style={{ minHeight: "100vh", width: "100vw" }}
    >
      <div className="container mt-5" style={{ maxWidth: "500px" }}>
        <h2 className="mb-4 text-info">Report Found Item</h2>
        <form onSubmit={handleSubmit} className="card p-4 shadow">
          <div className="mb-3">
            <label>Item Name</label>
            <input
              value={itemName}
              className="form-control"
              placeholder="Item Name"
              onChange={(e) => setItemName(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label>Date Found</label>
            <input
              type="date"
              value={foundDate}
              className="form-control"
              onChange={(e) => setFoundDate(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label>Location</label>
            <input
              value={location}
              className="form-control"
              placeholder="Location"
              onChange={(e) => setLocation(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label>Description</label>
            <textarea
              value={description}
              className="form-control"
              placeholder="Description"
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-info w-100">
            Report Found Item
          </button>
        </form>
      </div>
    </div>
  );
};

export default FoundItemReport;
