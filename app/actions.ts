"use server";

import { GoogleGenerativeAI } from "@google/generative-ai";

export async function roastResume(resumeText: string, jobDescription: string) {
  const apiKey = process.env.GOOGLE_API_KEY;
  if (!apiKey) return "API Key missing in Vercel settings.";

  const genAI = new GoogleGenerativeAI(apiKey);
  
  try {
    // Switching to the specific model you have access to
    const model = genAI.getGenerativeModel({ 
      model: "gemini-3.0-flash", 
    });

    const prompt = `
      CONTEXT: You are the Lead AI Auditor at Hizaki Labs.
      TASK: Conduct a high-level professional audit of the following resume against the provided Job Description.
      TONE: Analytical, brilliant, and cold. Do not sugarcoat failures.
      
      JOB DESCRIPTION: 
      ${jobDescription}
      
      RESUME CONTENT: 
      ${resumeText}
      
      FORMAT: Use professional headings. Include a "Likeliness to Hire" percentage and a list of "Critical Deficiencies."
    `;

    const result = await model.generateContent(prompt);
    return result.response.text();
    
  } catch (error: any) {
    console.error("Gemini Error:", error);
    // If 3.0-flash also 404s, it might need the exact string "models/gemini-3.0-flash"
    return `Audit Failed: ${error.message}`;
  }
}