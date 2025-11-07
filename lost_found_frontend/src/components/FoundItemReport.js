import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

const FoundItemReport = () => {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      itemName: "",
      location: "",
      foundDate: "",
      description: "",
    },
    validationSchema: Yup.object({
      itemName: Yup.string().required("Required"),
      location: Yup.string().required("Required"),
      foundDate: Yup.string().required("Required"),
      description: Yup.string(),
    }),
    onSubmit: async (values) => {
      try {
        const foundReport = {
          itemName: values.itemName,
          location: values.location,
          foundDate: values.foundDate,
          description: values.description,
        };
        await API.post("/report/found", foundReport);
        alert("Found item report submitted!");
        navigate("/dashboard");
      } catch (error) {
        if (error.response && error.response.data) {
          const data = error.response.data;
          alert(
            "Error: " + (typeof data === "string" ? data : JSON.stringify(data))
          );
        } else {
          alert("An error occurred. Please check your inputs.");
        }
      }
    },
  });

  return (
    <div className="container mt-5" style={{ maxWidth: "500px" }}>
      <h2 className="mb-4 text-success">Report Found Item</h2>
      <form onSubmit={formik.handleSubmit} className="card p-4 shadow">
        <div className="mb-3">
          <label>Item Name</label>
          <input
            name="itemName"
            className="form-control"
            placeholder="Item Name"
            onChange={formik.handleChange}
            value={formik.values.itemName}
          />
        </div>
        <div className="mb-3">
          <label>Location</label>
          <input
            name="location"
            className="form-control"
            placeholder="Location"
            onChange={formik.handleChange}
            value={formik.values.location}
          />
        </div>
        <div className="mb-3">
          <label>Date Found</label>
          <input
            name="foundDate"
            type="date"
            className="form-control"
            onChange={formik.handleChange}
            value={formik.values.foundDate}
          />
        </div>
        <div className="mb-3">
          <label>Description/Message</label>
          <textarea
            name="description"
            className="form-control"
            placeholder="Any message"
            onChange={formik.handleChange}
            value={formik.values.description}
          />
        </div>
        <button type="submit" className="btn btn-success w-100">
          Report Found Item
        </button>
        {Object.values(formik.errors).map((msg, i) => (
          <div className="text-danger" key={i}>
            {msg}
          </div>
        ))}
      </form>
    </div>
  );
};

export default FoundItemReport;
