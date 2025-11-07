import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import API from "../services/api";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      userType: "student",
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      userType: Yup.string().required("Select user type"),
      email: Yup.string().email("Invalid email").required("Required"),
      password: Yup.string()
        .min(8, "Minimum 8 characters")
        .required("Required"),
    }),
    onSubmit: async (values) => {
      try {
        const res = await API.post("/users/login", values);
        if (res.data && res.data === "Login successful.") {
          navigate("/dashboard");
        } else {
          alert(res.data);
        }
      } catch (error) {
        if (error.response && error.response.data) {
          alert("Error: " + error.response.data);
        } else {
          alert("An error occurred. Please check your inputs.");
        }
      }
    },
  });

  return (
    <div className="container mt-5" style={{ maxWidth: "400px" }}>
      <h2 className="mb-4 text-primary">Login</h2>
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
        <button type="submit" className="btn btn-primary w-100">
          Login
        </button>
        <div className="text-center">
          <span>
            Don't have an account? <Link to="/signup">Sign up</Link>
          </span>
        </div>
        {Object.values(formik.errors).map((msg, i) => (
          <div className="text-danger" key={i}>
            {msg}
          </div>
        ))}
      </form>
    </div>
  );
};

export default Login;
