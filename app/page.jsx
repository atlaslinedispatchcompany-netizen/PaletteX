"use client";

import { useState } from "react";

export default function Home() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    price: "",
    images: [],
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setFormData((prev) => ({ ...prev, images: Array.from(files) }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Artwork submitted successfully! (demo only)");
  };

  return (
    <main
      style={{
        fontFamily: "Inter, Arial, sans-serif",
        padding: "2rem",
        maxWidth: "1000px",
        margin: "0 auto",
      }}
    >
      <h1 style={{ textAlign: "center" }}>🎨 Welcome to PaletteX</h1>
      <p style={{ textAlign: "center", color: "#555" }}>
        Where Artists and Collectors Connect
      </p>

      {/* Gallery Section */}
      <section style={{ marginTop: "3rem" }}>
        <h2>Featured Artworks</h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "1rem",
            marginTop: "1rem",
          }}
        >
          {["art1.jpg", "art2.jpg", "art3.jpg", "art4.jpg"].map((img, i) => (
            <div
              key={i}
              style={{
                backgroundColor: "#f9f9f9",
                borderRadius: "8px",
                overflow: "hidden",
                boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
              }}
            >
              <img
                src={`https://placehold.co/400x300?text=Artwork+${i + 1}`}
                alt={`Artwork ${i + 1}`}
                style={{ width: "100%", height: "auto" }}
              />
            </div>
          ))}
        </div>
      </section>

      {/* Upload Form */}
      <section style={{ marginTop: "4rem" }}>
        <h2>Upload Your Artwork</h2>
        <form
          onSubmit={handleSubmit}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
            marginTop: "1rem",
          }}
        >
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            required
            style={inputStyle}
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
            required
            style={inputStyle}
          />
          <input
            type="text"
            name="price"
            placeholder="Price Offer (e.g. $250)"
            value={formData.price}
            onChange={handleChange}
            style={inputStyle}
          />
          <textarea
            name="message"
            placeholder="Message about your artwork"
            value={formData.message}
            onChange={handleChange}
            style={{ ...inputStyle, height: "100px" }}
          />
          <input
            type="file"
            name="images"
            multiple
            accept="image/*"
            onChange={handleChange}
            style={inputStyle}
          />
          <button
            type="submit"
            style={{
              padding: "0.8rem",
              background: "#111",
              color: "#fff",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
              fontWeight: "bold",
            }}
          >
            Submit Artwork
          </button>
        </form>
      </section>
    </main>
  );
}

const inputStyle = {
  padding: "0.8rem",
  border: "1px solid #ccc",
  borderRadius: "6px",
  fontSize: "1rem",
};