"use server";

import { GoogleGenerativeAI } from "@google/generative-ai";

export async function roastResume(resumeText: string, jobDescription: string) {
  // 1. Validate that the API key exists
  const apiKey = process.env.GOOGLE_API_KEY;
  if (!apiKey) {
    return "Error: API Key is missing in Vercel environment variables.";
  }

  const genAI = new GoogleGenerativeAI(apiKey);
  
  // 2. Try 1.5-flash if 2.0-flash is giving you trouble
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-latest" });

  const prompt = `You are the Hizaki Labs Resume Auditor. 
  Critique this resume against the JD with professional brutality.
  JD: ${jobDescription}
  Resume: ${resumeText}`;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error: any) {
    console.error("Gemini API Error:", error);
    // This will show the actual error in your Vercel logs
    return `Audit Failed: ${error.message || "Unknown AI Error"}`;
  }
}