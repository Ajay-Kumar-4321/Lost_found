import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      userType: "student",
      fullName: "",
      contactNumber: "",
      email: "",
      password: "",
      confirmPassword: "",
      department: "",
      terms: false,
    },
    validationSchema: Yup.object({
      userType: Yup.string().required(),
      fullName: Yup.string().required("Required"),
      contactNumber: Yup.string().required("Required"),
      email: Yup.string().email("Invalid email").required("Required"),
      password: Yup.string().min(8, "Min 8 characters").required("Required"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password")], "Passwords must match")
        .required("Required"),
      department: Yup.string().required("Select Department"),
      terms: Yup.boolean().oneOf([true], "You must accept terms"),
    }),
    onSubmit: async (values) => {
      const { confirmPassword, terms, ...toSend } = values;
      const res = await API.post("/users/signup", toSend);
      if (res.data && res.data === "Signup successful.") {
        alert("Signup successful! Please login.");
        navigate("/");
      } else {
        alert(res.data);
      }
    },
  });

  return (
    <div
      className="bg-login d-flex justify-content-center align-items-center"
      style={{ minHeight: "100vh", width: "100vw" }}
    >
      <div className="container" style={{ maxWidth: 450 }}>
        <h2 className="mb-4 text-success">Signup</h2>
        <form onSubmit={formik.handleSubmit} className="card p-4 shadow">
          <div className="mb-3">
            <label>User Type</label>
            <select
              name="userType"
              className="form-control"
              onChange={formik.handleChange}
              value={formik.values.userType}
            >
              <option value="student">Student</option>
              <option value="staff">Staff</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          <div className="mb-3">
            <label>Full Name</label>
            <input
              name="fullName"
              className="form-control"
              placeholder="Full Name"
              onChange={formik.handleChange}
              value={formik.values.fullName}
            />
          </div>
          <div className="mb-3">
            <label>Contact Number</label>
            <input
              name="contactNumber"
              className="form-control"
              placeholder="Contact Number"
              onChange={formik.handleChange}
              value={formik.values.contactNumber}
            />
          </div>
          <div className="mb-3">
            <label>Email</label>
            <input
              name="email"
              className="form-control"
              placeholder="Email"
              onChange={formik.handleChange}
              value={formik.values.email}
            />
          </div>
          <div className="mb-3">
            <label>Password</label>
            <input
              type="password"
              name="password"
              className="form-control"
              placeholder="Password"
              onChange={formik.handleChange}
              value={formik.values.password}
            />
          </div>
          <div className="mb-3">
            <label>Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              className="form-control"
              placeholder="Confirm Password"
              onChange={formik.handleChange}
              value={formik.values.confirmPassword}
            />
          </div>
          <div className="mb-3">
            <label>Department</label>
            <select
              name="department"
              className="form-control"
              onChange={formik.handleChange}
              value={formik.values.department}
            >
              <option value="">Select Department</option>
              <option value="Computer Science and Engineering (CSE)">
                Computer Science and Engineering (CSE)
              </option>
              <option value="Electronics and Communication Engineering (ECE)">
                Electronics and Communication Engineering (ECE)
              </option>
              <option value="Mechanical Engineering (ME)">
                Mechanical Engineering (ME)
              </option>
              <option value="Electrical Engineering (EE)">
                Electrical Engineering (EE)
              </option>
              <option value="Civil Engineering (CE)">
                Civil Engineering (CE)
              </option>
              <option value="Information Technology (IT)">
                Information Technology (IT)
              </option>
              <option value="Chemical Engineering (ChE)">
                Chemical Engineering (ChE)
              </option>
              <option value="Biotechnology (BT)">Biotechnology (BT)</option>
              <option value="Metallurgical Engineering (MTE)">
                Metallurgical Engineering (MTE)
              </option>
              <option value="Automobile Engineering">
                Automobile Engineering
              </option>
              <option value="Environmental Engineering">
                Environmental Engineering
              </option>
            </select>
          </div>
          <div className="form-check mb-3">
            <input
              type="checkbox"
              name="terms"
              className="form-check-input"
              onChange={formik.handleChange}
              checked={formik.values.terms}
            />
            <label className="form-check-label">Accept Terms</label>
          </div>
          <button type="submit" className="btn btn-success w-100">
            Sign Up
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

export default Signup;
