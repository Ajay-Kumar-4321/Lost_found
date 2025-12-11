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

        // If backend still returns a plain string like "Login successful."
        const isStringResponse =
          typeof res.data === "string" || res.data instanceof String;

        if (
          (isStringResponse && res.data.includes("Login successful")) ||
          (!isStringResponse && res.data.message === "Login successful")
        ) {
          // Save user type, email, and full name for use in Dashboard
          localStorage.setItem("userType", values.userType);
          localStorage.setItem("userEmail", values.email);

          // Try to read fullName from the response; otherwise leave empty.
          // Adjust the path below if your backend uses a different structure.
          const fullNameFromResponse =
            !isStringResponse && res.data.fullName ? res.data.fullName : "";

          localStorage.setItem("fullName", fullNameFromResponse);

          navigate("/dashboard");
        } else {
          alert(
            isStringResponse ? res.data : res.data.message || "Login failed."
          );
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
    <div className="bg-login">
      <div className="container" style={{ maxWidth: 400 }}>
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
          <button type="submit" className="btn btn-login-primary w-100">
            Login
          </button>
          <div className="text-center mt-3">
            <span>
              Don&apos;t have an account? <Link to="/signup">Sign up</Link>
            </span>
          </div>
        </form>
        {Object.values(formik.errors).map((msg, i) => (
          <div className="text-danger" key={i}>
            {msg}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Login;
