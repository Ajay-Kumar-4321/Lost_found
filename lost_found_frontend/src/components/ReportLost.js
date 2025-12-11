import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

const ReportLost = () => {
  const [contactNumber, setContactNumber] = useState("");
  const [imageMessage, setImageMessage] = useState("");
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      itemCategory: "",
      itemName: "",
      lostDate: "",
      location: "",
      description: "",
      image: null,
    },
    validationSchema: Yup.object({
      itemCategory: Yup.string().required("Required"),
      itemName: Yup.string().required("Required"),
      lostDate: Yup.string().required("Required"),
      location: Yup.string().required("Required"),
      description: Yup.string().required("Required"),
    }),
    onSubmit: async (values) => {
      if (!contactNumber.trim()) {
        alert("Please enter your contact number.");
        return;
      }
      try {
        const lostReport = {
          itemCategory: values.itemCategory,
          itemName: values.itemName,
          lostDate: values.lostDate,
          location: values.location,
          description: values.description,
          contactNumber: contactNumber,
        };
        const formData = new FormData();
        formData.append("lostReport", JSON.stringify(lostReport));
        if (values.image) {
          formData.append("image", values.image);
        }

        // Note: the POST URL below MUST match the backend controller!
        await API.post("/report/lost", formData);
        alert("Report submitted!");
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
    <div
      className="bg-report-lost d-flex justify-content-center align-items-center"
      style={{ minHeight: "100vh", width: "100vw" }}
    >
      <div className="container" style={{ maxWidth: "500px" }}>
        <h2 className="mb-4 text-info">Report Lost Item</h2>
        <form onSubmit={formik.handleSubmit} className="card p-4 shadow">
          <div className="mb-3">
            <label>Category</label>
            <select
              name="itemCategory"
              className="form-control"
              onChange={formik.handleChange}
              value={formik.values.itemCategory}
            >
              <option value="">Select Category</option>
              <option value="Electricals">Electricals</option>
              <option value="Watches">Watches</option>
              <option value="Books">Books</option>
              <option value="Mobiles">Mobiles</option>
              <option value="Wallets">Wallets</option>
              <option value="Stationery">Stationery</option>
              <option value="Bags">Bags</option>
              <option value="Keys">Keys</option>
              <option value="ID Cards">ID Cards</option>
              <option value="Jewellery">Jewellery</option>
              <option value="Others">Others</option>
            </select>
          </div>
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
            <label>Date</label>
            <input
              name="lostDate"
              type="date"
              className="form-control"
              onChange={formik.handleChange}
              value={formik.values.lostDate}
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
            <label>Description</label>
            <textarea
              name="description"
              className="form-control"
              placeholder="Description"
              onChange={formik.handleChange}
              value={formik.values.description}
            />
          </div>
          <div className="mb-3">
            <label>Image (optional)</label>
            <input
              type="file"
              name="image"
              className="form-control"
              accept="image/*"
              onChange={(e) => {
                const file = e.currentTarget.files[0];
                formik.setFieldValue("image", file);
                setImageMessage(
                  file ? `Selected: ${file.name}` : "No image selected"
                );
              }}
            />
            {formik.values.image && (
              <div className="text-success">
                {imageMessage || "You have selected an image"}
              </div>
            )}
          </div>
          <div className="mb-3">
            <label>
              Contact Number <span className="text-danger">*</span>
            </label>
            <input
              value={contactNumber}
              className="form-control"
              placeholder="Contact Number"
              required
              onChange={(e) => setContactNumber(e.target.value)}
            />
          </div>
          <button type="submit" className="btn btn-info w-100">
            Report Lost Item
          </button>
          {Object.values(formik.errors).map((msg, i) => (
            <div className="text-danger" key={i}>
              {msg}
            </div>
          ))}
        </form>
      </div>
    </div>
  );
};

export default ReportLost;
