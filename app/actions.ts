"use strict";
"use server";

import { GoogleGenerativeAI } from "@google/generative-ai";

export async function roastResume(resumeText: string, jobDescription: string) {
  const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY!);
  const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

  const prompt = `
    You are a cynical, overworked, yet highly skilled Senior Technical Recruiter who has seen 10,000 bad resumes. 
    Your job is to "Roast" this resume based on the provided Job Description.

    RULES:
    1. Be brutally honest and sarcastic. 
    2. Point out generic buzzwords, formatting nightmares, and lack of impact.
    3. If the resume doesn't match the job description at all, call them out on it.
    4. End with a "Redemption" section: 3 clear, actionable bullet points to fix the mess.

    JOB DESCRIPTION: ${jobDescription}
    RESUME TEXT: ${resumeText}

    Format the response in clean Markdown.
  `;

  try {
    const result = await model.generateContent(prompt);
    return result.response.text();
  } catch (error) {
    console.error(error);
    return "The AI is too disgusted to speak. (Check your API key or rate limits).";
  }
}