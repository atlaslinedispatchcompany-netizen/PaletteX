export default function Home() {
  return (
    <main>
      <header>PaletteX – Where Artists and Collectors Connect</header>

      <section className="gallery">
        <img src="/art1.jpg" alt="Artwork 1" />
        <img src="/art2.jpg" alt="Artwork 2" />
        <img src="/art3.jpg" alt="Artwork 3" />
      </section>

      <footer>© 2025 PaletteX. All rights reserved.</footer>
    </main>
  );
}
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
    if (files) setFormData({ ...formData, images: files });
    else setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const body = new FormData();
    for (const key in formData) {
      if (key === "images") {
        for (let i = 0; i < formData.images.length; i++) {
          body.append("images", formData.images[i]);
        }
      } else {
        body.append(key, formData[key]);
      }
    }

    const res = await fetch("/api/upload", { method: "POST", body });
    if (res.ok) alert("Artwork submitted successfully!");
    else alert("Error uploading artwork. Please try again.");
  };

  return (
    <main style={{ fontFamily: "Poppins, sans-serif", padding: "2rem" }}>
      <section style={{ textAlign: "center", marginBottom: "3rem" }}>
        <h1 style={{ fontSize: "3rem", color: "#6C63FF" }}>🎨 PaletteX</h1>
        <p style={{ fontSize: "1.2rem", color: "#555" }}>
          Where Artists and Collectors Connect
        </p>
      </section>

      <section>
        <h2>Submit Your Artwork</h2>
        <form
          onSubmit={handleSubmit}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
            maxWidth: "500px",
          }}
        >
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            onChange={handleChange}
            required
          />
          <textarea
            name="message"
            placeholder="Description or Message"
            onChange={handleChange}
            required
          />
          <input
            type="number"
            name="price"
            placeholder="Price Offer ($)"
            onChange={handleChange}
          />
          <input
            type="file"
            name="images"
            multiple
            accept="image/*"
            onChange={handleChange}
          />
          <button
            type="submit"
            style={{
              backgroundColor: "#6C63FF",
              color: "#fff",
              padding: "0.75rem",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Upload Artwork
          </button>
        </form>
      </section>

      <section style={{ marginTop: "4rem" }}>
        <h2>Featured Artworks</h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
            gap: "1rem",
            marginTop: "1rem",
          }}
        >
          {[
            "/art1.jpg",
            "/art2.jpg",
            "/art3.jpg",
            "/art4.jpg",
            "/art5.jpg",
          ].map((src, i) => (
            <div
              key={i}
              style={{
                border: "1px solid #ddd",
                borderRadius: "10px",
                overflow: "hidden",
                background: "#fafafa",
              }}
            >
              <img src={src} alt={`Artwork ${i}`} style={{ width: "100%" }} />
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}