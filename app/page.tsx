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

  return (
    <main className="min-h-screen bg-gray-50 text-gray-800">
      {/* Brand Header: Matches Hizaki Labs Hero Section */}
      <section className="bg-gradient-to-r from-indigo-600 to-purple-700 text-white py-20 px-4 text-center rounded-b-[3rem] shadow-2xl mb-12">
        <div className="max-w-4xl mx-auto space-y-4">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tighter font-space-grotesk animate-fade-in-up">
            Resume Auditor
          </h1>
          <p className="text-xl opacity-90 max-w-2xl mx-auto font-medium">
            Hizaki Labs Intelligence Engine: Professional Analysis & Brutal Feedback.
          </p>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 pb-24">
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Card Style Inputs */}
          <div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100 hover:shadow-2xl transition-all">
            <label className="flex items-center gap-2 text-indigo-600 font-bold uppercase tracking-widest text-xs mb-4">
              <i className="fas fa-briefcase"></i> Target Job Description
            </label>
            <textarea
              required
              className="w-full h-80 p-5 bg-gray-50 border-2 border-gray-100 rounded-2xl focus:border-indigo-500 focus:ring-0 outline-none transition-all resize-none text-gray-700"
              placeholder="Paste what they want..."
              value={jd}
              onChange={(e) => setJd(e.target.value)}
            />
          </div>

          <div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100 hover:shadow-2xl transition-all">
            <label className="flex items-center gap-2 text-purple-600 font-bold uppercase tracking-widest text-xs mb-4">
              <i className="fas fa-file-alt"></i> Your Professional Experience
            </label>
            <textarea
              required
              className="w-full h-80 p-5 bg-gray-50 border-2 border-gray-100 rounded-2xl focus:border-purple-500 focus:ring-0 outline-none transition-all resize-none text-gray-700"
              placeholder="Paste what you have..."
              value={resume}
              onChange={(e) => setResume(e.target.value)}
            />
          </div>

          <div className="md:col-span-2 pt-4">
            <button
              disabled={loading}
              className="w-full py-6 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xl rounded-2xl shadow-lg shadow-indigo-200 transition-all transform active:scale-95 flex items-center justify-center gap-4"
            >
              {loading ? (
                <><i className="fas fa-spinner animate-spin"></i> Auditing Career Path...</>
              ) : (
                <><i className="fas fa-gavel"></i> Run Official Audit</>
              )}
            </button>
          </div>
        </form>

        {/* The Results Section */}
        {result && (
          <div className="mt-16 bg-white p-10 md:p-16 rounded-[2.5rem] shadow-2xl border-t-8 border-indigo-600 animate-fade-in-up">
            <div className="flex items-center gap-4 mb-8 border-b border-gray-100 pb-6">
              <div className="bg-indigo-100 p-4 rounded-2xl">
                <i className="fas fa-clipboard-check text-indigo-600 text-3xl"></i>
              </div>
              <h2 className="text-4xl font-bold font-space-grotesk text-gray-900">The Auditor's Report</h2>
            </div>
            
            <div className="prose prose-indigo max-w-none prose-lg text-gray-700 leading-relaxed prose-headings:font-space-grotesk">
              <ReactMarkdown>{result}</ReactMarkdown>
            </div>
          </div>
        )}
      </div>

      <footer className="py-12 text-center border-t border-gray-200 bg-white">
        <p className="text-gray-400 font-medium">© {new Date().getFullYear()} Hizaki Labs. All rights reserved.</p>
      </footer>
    </main>
  );
}