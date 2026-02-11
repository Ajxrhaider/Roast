"use server";

import { GoogleGenerativeAI } from "@google/generative-ai";

export async function roastResume(resumeText: string, jobDescription: string) {
  const apiKey = process.env.GOOGLE_API_KEY;
  if (!apiKey) return "API Key missing in Vercel settings.";

  const genAI = new GoogleGenerativeAI(apiKey);
  
  // Using 'gemini-1.5-flash' is correct, but the SDK sometimes 
  // needs the version to be explicit if it's defaulting to v1beta.
  const model = genAI.getGenerativeModel({ 
    model: "gemini-1.5-flash",
  });

  const prompt = `You are the Hizaki Labs Resume Auditor. 
  Analyze this resume against the JD with professional, cold brilliance.
  JD: ${jobDescription}
  Resume: ${resumeText}`;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error: any) {
    // This will output the specific error to your Vercel logs so we can see it
    console.error("Gemini Error:", error);
    return `Audit Failed: ${error.message}`;
  }
}