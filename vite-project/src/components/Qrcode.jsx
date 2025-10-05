import React, { useState } from "react";
import "./Qrcode.css";

function Qrcode() {
  const [link, setLink] = useState("");
  const [qrImage, setQrImage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (!link) return alert("Enter a link!");

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("link", link);
      formData.append("text", link);

      const response = await fetch("https://python-basics-6.onrender.com/generate", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error("Failed to generate QR");

      const data = await response.json();
      setQrImage(data.image);
    } catch (err) {
      console.error("Error generating QR:", err);
      alert("Could not generate QR code. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // NEW FUNCTION: Handles the download logic
  const handleDownload = () => {
    if (!qrImage) return;

    // 1. Create a temporary anchor element
    const a = document.createElement('a');
    
    // 2. Set the href to the image data (which should be base64 data URL)
    a.href = qrImage; 
    
    // 3. Set the download attribute with a file name
    a.download = 'qrcode-by-generator.png'; 
    
    // 4. Append the anchor to the body (required for Firefox)
    document.body.appendChild(a);
    
    // 5. Programmatically click the anchor to trigger the download
    a.click();
    
    // 6. Clean up by removing the element
    document.body.removeChild(a);
  };

  return (
    <div className="qrcode-container">
      <h1 className="qrcode-heading">QR Code Generator</h1>
      
      <div className="input-group">
        <input
          type="text"
          value={link}
          onChange={(e) => setLink(e.target.value)}
          placeholder="Enter your link"
          className="input-field"
        />
        <button
          onClick={handleGenerate}
          className="generate-button"
          disabled={loading}
        >
          {loading ? "Generating..." : "Generate QR Code"}
        </button>
      </div>

      {qrImage && (
        <div className="qr-image-container">
          <img src={qrImage} alt="QR Code" className="qr-code-image" />
          
          {/* NEW DOWNLOAD BUTTON */}
          <button
            onClick={handleDownload}
            className="download-button"
          >
            Download QR
          </button>
        </div>
      )}
    </div>
  );
}

export default Qrcode;