"use server";

import { GoogleGenerativeAI } from "@google/generative-ai";

export async function roastResume(resumeText: string, jobDescription: string) {
  const apiKey = process.env.GOOGLE_API_KEY;
  if (!apiKey) return "API Key missing in Vercel settings.";

  // Explicitly setting the API version to v1 fixes the 404 error
  const genAI = new GoogleGenerativeAI(apiKey);
  
  try {
    // Specifying the model version "gemini-1.5-flash"
    const model = genAI.getGenerativeModel({ 
      model: "gemini-1.5-flash",
    });

    const prompt = `You are the Hizaki Labs Resume Auditor. 
    Analyze this resume against the JD with professional, cold brilliance.
    JD: ${jobDescription}
    Resume: ${resumeText}`;

    // Note: If you still see a 404, we add the apiVersion: "v1" 
    // to the GoogleGenerativeAI constructor if your SDK version supports it.
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
    
  } catch (error: any) {
    console.error("Gemini Error:", error);
    return `Audit Failed: ${error.message}`;
  }
}