"use client";
import { useState } from "react";
import { roastResume } from "./actions";
import ReactMarkdown from "react-markdown";

export default function RoastPage() {
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
    <main className="min-h-screen bg-gray-50 font-inter text-gray-800">
      {/* Hero Header - Matches index.html Hero section */}
      <section className="bg-gradient-to-r from-indigo-600 to-purple-700 text-white py-16 px-4 text-center rounded-b-3xl shadow-lg mb-12">
        <div className="max-w-4xl mx-auto space-y-4">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tighter font-space-grotesk animate-fade-in-up">
            Hizaki Auditor
          </h1>
          <p className="text-lg md:text-xl opacity-90 max-w-2xl mx-auto">
            Where AI innovation meets brutal honesty. Let's see if your resume is actually worth a recruiter's time.
          </p>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 pb-20">
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* Card-style inputs matching your service cards */}
          <div className="bg-white p-6 rounded-2xl shadow-xl border border-gray-100 transform transition-all hover:-translate-y-1">
            <label className="flex items-center gap-2 text-indigo-700 font-bold uppercase tracking-wider text-sm mb-4">
              <i className="fas fa-briefcase"></i> Job Description
            </label>
            <textarea
              required
              className="w-full h-64 p-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all resize-none"
              placeholder="Paste the job requirements here..."
              value={jd}
              onChange={(e) => setJd(e.target.value)}
            />
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-xl border border-gray-100 transform transition-all hover:-translate-y-1">
            <label className="flex items-center gap-2 text-purple-700 font-bold uppercase tracking-wider text-sm mb-4">
              <i className="fas fa-file-alt"></i> Your Resume Text
            </label>
            <textarea
              required
              className="w-full h-64 p-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all resize-none"
              placeholder="Paste your professional experience here..."
              value={resume}
              onChange={(e) => setResume(e.target.value)}
            />
          </div>

          <div className="md:col-span-2">
            <button
              disabled={loading}
              className="w-full py-5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xl rounded-2xl shadow-lg transition-all transform active:scale-95 flex items-center justify-center gap-3 disabled:bg-gray-400"
            >
              {loading ? (
                <>
                  <i className="fas fa-spinner animate-spin"></i> Analyzing...
                </>
              ) : (
                <>
                  <i className="fas fa-fire"></i> Initiate Roast
                </>
              )}
            </button>
          </div>
        </form>

        {/* Verdict Section - Styled like your 'About' section containers */}
        {result && (
          <div className="bg-white p-8 md:p-12 rounded-3xl shadow-2xl border-t-8 border-indigo-600 animate-fade-in-up">
            <h2 className="text-3xl font-bold font-space-grotesk text-gray-900 mb-6 flex items-center gap-3">
              <span className="bg-indigo-100 p-2 rounded-lg"><i className="fas fa-gavel text-indigo-600"></i></span>
              The Verdict
            </h2>
            <div className="prose prose-indigo max-w-none prose-lg">
              <ReactMarkdown>{result}</ReactMarkdown>
            </div>
          </div>
        )}
      </div>

      <footer className="text-center py-10 text-gray-400 text-sm border-t border-gray-200">
        <p>© {new Date().getFullYear()} Hizaki Labs. All rights reserved.</p>
      </footer>
    </main>
  );
}