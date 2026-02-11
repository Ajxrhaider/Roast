"use client";

import { useState } from "react";
import ReactMarkdown from "react-markdown";

export default function RoastPage() {
  const [resume, setResume] = useState("");
  const [jobDesc, setJobDesc] = useState("");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);

  const roastMe = async () => {
    setLoading(true);
    setOutput("");
    try {
      const res = await fetch("/api/roast", {
        method: "POST",
        body: JSON.stringify({ resume, jobDesc }),
      });
      const data = await res.json();
      setOutput(data.text);
    } catch (e) {
      setOutput("Even the AI is speechless at how bad this is. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen p-6 md:p-24 max-w-5xl mx-auto">
      <header className="mb-12 text-center">
        <h1 className="text-5xl font-black tracking-tighter text-roast mb-2">
          ROAST MY RESUME
        </h1>
        <p className="text-zinc-500 uppercase tracking-widest text-sm">
          Because your "Passionate Team Player" line isn't working.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="flex flex-col gap-2">
          <label className="text-xs font-bold uppercase text-zinc-400">Your Resume (Text)</label>
          <textarea
            className="w-full h-64 bg-zinc-900 border border-zinc-800 p-4 rounded-lg focus:ring-2 focus:ring-roast outline-none transition-all resize-none"
            placeholder="Paste your resume content here..."
            onChange={(e) => setResume(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-xs font-bold uppercase text-zinc-400">Job Description</label>
          <textarea
            className="w-full h-64 bg-zinc-900 border border-zinc-800 p-4 rounded-lg focus:ring-2 focus:ring-roast outline-none transition-all resize-none"
            placeholder="What are you even applying for?"
            onChange={(e) => setJobDesc(e.target.value)}
          />
        </div>
      </div>

      <button
        onClick={roastMe}
        disabled={loading || !resume || !jobDesc}
        className="w-full py-4 bg-roast hover:bg-roast-dark disabled:bg-zinc-800 text-white font-bold rounded-full transition-all transform active:scale-95"
      >
        {loading ? "SHARPENING THE CLAWS..." : "ROAST ME"}
      </button>

      {output && (
        <section className="mt-12 p-8 border-l-4 border-roast bg-zinc-900/50 rounded-r-lg animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="prose prose-invert max-w-none">
            <ReactMarkdown>{output}</ReactMarkdown>
          </div>
        </section>
      )}
    </main>
  );
}
