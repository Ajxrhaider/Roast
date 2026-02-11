"use client";
import { useState } from "react";
import { roastResume } from "./actions";
import ReactMarkdown from "react-markdown";

export default function ResumeAuditor() {
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

  return (
    <main style={{ minHeight: '100vh', backgroundColor: '#0f172a', color: '#f1f5f9', fontFamily: 'Inter, sans-serif' }}>
      {/* Brand Header */}
      <div style={{ background: 'linear-gradient(135deg, #6366f1 0%, #a855f7 100%)', padding: '60px 20px', textAlign: 'center' }}>
        <h1 style={{ fontSize: '3rem', fontWeight: '800', margin: 0, fontFamily: 'Space Grotesk, sans-serif' }}>RESUME AUDITOR</h1>
        <p style={{ opacity: 0.9, fontSize: '1.2rem', marginTop: '10px' }}>Powered by Hizaki Labs Gemini 3.0 Intelligence</p>
      </div>

      <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '40px 20px' }}>
        <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '25px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            <textarea 
              placeholder="Paste Job Description..."
              value={jd}
              onChange={(e) => setJd(e.target.value)}
              style={{ height: '300px', padding: '20px', borderRadius: '15px', border: '1px solid #334155', background: '#1e293b', color: 'white', fontSize: '1rem' }}
            />
            <textarea 
              placeholder="Paste Resume Content..."
              value={resume}
              onChange={(e) => setResume(e.target.value)}
              style={{ height: '300px', padding: '20px', borderRadius: '15px', border: '1px solid #334155', background: '#1e293b', color: 'white', fontSize: '1rem' }}
            />
          </div>
          
          <button 
            type="submit" 
            disabled={loading}
            style={{ padding: '20px', borderRadius: '15px', border: 'none', background: '#6366f1', color: 'white', fontWeight: 'bold', fontSize: '1.2rem', cursor: 'pointer' }}
          >
            {loading ? "INITIALIZING AUDIT..." : "RUN SYSTEM AUDIT"}
          </button>
        </form>

        {result && (
          <div style={{ marginTop: '40px', padding: '30px', background: '#1e293b', borderRadius: '20px', borderLeft: '8px solid #6366f1' }}>
            <h2 style={{ color: '#818cf8', marginBottom: '20px' }}>Audit Result</h2>
            <div className="prose prose-invert max-w-none">
              <ReactMarkdown>{result}</ReactMarkdown>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}