"use client";
import { useState } from "react";
import { roastResume } from "./actions";
import ReactMarkdown from "react-markdown";

export default function AuditorPage() {
  const [resume, setResume] = useState("");
  const [jd, setJd] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const roast = await roastResume(resume, jd);
    setResult(roast);
    setLoading(false);
  };

  // Inline styles to match index.html and main.css
  const heroStyle = {
    background: "linear-gradient(to right, #4f46e5, #7e22ce)", // Matches your indigo-purple theme
    color: "white",
    padding: "80px 20px",
    textAlign: "center" as const,
    borderRadius: "0 0 40px 40px",
    marginBottom: "50px"
  };

  const cardStyle = {
    background: "#ffffff",
    padding: "30px",
    borderRadius: "20px",
    boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)",
    border: "1px solid #f3f4f6"
  };

  const buttonStyle = {
    width: "100%",
    padding: "20px",
    backgroundColor: "#6366F1", // Indigo-500 from your main.css
    color: "white",
    border: "none",
    borderRadius: "15px",
    fontSize: "1.25rem",
    fontWeight: "bold",
    cursor: "pointer",
    transition: "0.3s"
  };

  return (
    <main style={{ minHeight: "100-screen", backgroundColor: "#f9fafb", fontFamily: "Inter, sans-serif" }}>
      {/* Hero Section */}
      <section style={heroStyle}>
        <div style={{ maxWidth: "800px", margin: "0 auto" }}>
          <h1 style={{ fontSize: "3.5rem", fontWeight: "bold", fontFamily: "Space Grotesk, sans-serif", margin: "0 0 15px 0" }}>
            Resume Auditor
          </h1>
          <p style={{ fontSize: "1.25rem", opacity: "0.9" }}>
            Hizaki Labs Intelligence Engine: Professional Analysis & Brutal Feedback.
          </p>
        </div>
      </section>

      <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "0 20px 100px 20px" }}>
        <form onSubmit={handleSubmit}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "30px", marginBottom: "30px" }}>
            
            <div style={cardStyle}>
              <label style={{ display: "block", color: "#4f46e5", fontWeight: "bold", fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "15px" }}>
                Target Job Description
              </label>
              <textarea
                required
                style={{ width: "100%", height: "250px", padding: "15px", backgroundColor: "#f9fafb", border: "2px solid #e5e7eb", borderRadius: "12px", outline: "none", fontSize: "1rem" }}
                placeholder="Paste what they want..."
                value={jd}
                onChange={(e) => setJd(e.target.value)}
              />
            </div>

            <div style={cardStyle}>
              <label style={{ display: "block", color: "#7e22ce", fontWeight: "bold", fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "15px" }}>
                Your Professional Experience
              </label>
              <textarea
                required
                style={{ width: "100%", height: "250px", padding: "15px", backgroundColor: "#f9fafb", border: "2px solid #e5e7eb", borderRadius: "12px", outline: "none", fontSize: "1rem" }}
                placeholder="Paste what you have..."
                value={resume}
                onChange={(e) => setResume(e.target.value)}
              />
            </div>
          </div>

          <button type="submit" disabled={loading} style={buttonStyle}>
            {loading ? "Analyzing Path..." : "Run Official Audit"}
          </button>
        </form>

        {result && (
          <div style={{ marginTop: "60px", padding: "40px", backgroundColor: "white", borderRadius: "30px", boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)", borderTop: "8px solid #6366F1" }}>
            <h2 style={{ fontSize: "2rem", fontWeight: "bold", fontFamily: "Space Grotesk, sans-serif", marginBottom: "25px", borderBottom: "1px solid #f3f4f6", paddingBottom: "20px" }}>
              The Auditor's Report
            </h2>
            <div style={{ lineHeight: "1.8", fontSize: "1.1rem", color: "#374151" }}>
              <ReactMarkdown>{result}</ReactMarkdown>
            </div>
          </div>
        )}
      </div>

      <footer style={{ textAlign: "center", padding: "40px 0", borderTop: "1px solid #e5e7eb", color: "#9ca3af" }}>
        © {new Date().getFullYear()} Hizaki Labs. All rights reserved.
      </footer>
    </main>
  );
}