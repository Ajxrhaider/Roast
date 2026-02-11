"use server";

import { GoogleGenerativeAI } from "@google/generative-ai";

export async function roastResume(resumeText: string, jobDescription: string) {
  const apiKey = process.env.GOOGLE_API_KEY;
  if (!apiKey) return "Intelligence Core Offline: API Key missing.";

  const genAI = new GoogleGenerativeAI(apiKey);
  
  try {
    // The exact model ID for your tier is gemini-3-flash-preview
    const model = genAI.getGenerativeModel({ 
      model: "gemini-3-flash-preview" 
    });

    const prompt = `
      AUDIT PROTOCOL: Hizaki Labs v3.0
      TASK: Audit the following resume against the Job Description.
      TONE: Analytical, precise, and brutally professional.
      
      JOB DESCRIPTION: 
      ${jobDescription}
      
      CANDIDATE DATA: 
      ${resumeText}
      
      REQUIREMENT: Provide a breakdown of "Technical Gaps" and a "System Score" (0-100).
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
    
  } catch (error: any) {
    console.error("Audit Error:", error);
    // If it still 404s, it's a model routing issue.
    return `Audit Failed: ${error.message}. Please verify the model ID 'gemini-3-flash-preview' in your region.`;
  }
}