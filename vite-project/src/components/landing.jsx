import React from "react";
import { useNavigate } from "react-router-dom";
import "./landing.css";

function Landing() {
    const navigate = useNavigate();

  const handleClick = () => {
    navigate("/qrcode");
  };
  return (
    <div className="landing">
      <h1 id="main_heading">Welcome to the QR Code Generator!</h1>
      <p id="para">Create your custom QR codes easily and quickly.</p>
      <button id="get_started" onClick={handleClick}>Get Started</button>
    </div>
  );
}
export default Landing;