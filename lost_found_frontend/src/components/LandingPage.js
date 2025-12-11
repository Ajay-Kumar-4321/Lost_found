import React from "react";
import { useNavigate } from "react-router-dom";

function LandingPage() {
  const navigate = useNavigate();

  return (
    <div
      style={{
        position: "relative",
        height: "100vh",
        width: "100vw",
        overflow: "hidden",
      }}
    >
      {/* Fullscreen background video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          minWidth: "100%",
          minHeight: "100%",
          width: "auto",
          height: "auto",
          transform: "translate(-50%, -50%)",
          objectFit: "cover",
          zIndex: 1,
        }}
      >
        <source src="/intro.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Overlay content */}
      <div
        style={{
          position: "relative",
          zIndex: 2,
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          color: "#fff",
          textAlign: "center",
          background: "rgba(0, 0, 0, 0.35)", // slight dark overlay for readability
        }}
      >
        <h1 className="mb-4">Lost & Found Portal</h1>
        <button
          className="btn btn-login-primary px-4 py-2"
          onClick={() => navigate("/login")}
        >
          Get Started
        </button>
      </div>
    </div>
  );
}

export default LandingPage;
