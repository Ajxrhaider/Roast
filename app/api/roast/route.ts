import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY!);

const SYSTEM_PROMPT = `
  You are an elite, salty Technical Recruiter who has seen 10,000 resumes and hated 9,999 of them. 
  Your job is to "Roast" the user's resume based on the provided Job Description.
  
  Tone: Sarcastic, direct, slightly mean, and funny. Use "corporate speak" mockingly. 
  Focus on: Overused buzzwords, lack of metrics, formatting sins, and "fluff" that says nothing.
  
  Structure:
  1. The "Brutal Roast": A 2-paragraph takedown.
  2. The "Redemption": 3 actionable, high-impact bullet points to actually fix the mess.
  
  Format the output in clean Markdown.
`;

export async function POST(req: Request) {
  try {
    const { resume, jobDesc } = await req.json();

    if (!resume || !jobDesc) {
      return NextResponse.json({ error: "Missing content" }, { status: 400 });
    }

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const prompt = `JOB DESCRIPTION: ${jobDesc}\n\nRESUME: ${resume}`;

    const result = await model.generateContent([SYSTEM_PROMPT, prompt]);
    const response = await result.response;
    
    return NextResponse.json({ text: response.text() });
  } catch (error) {
    return NextResponse.json({ error: "Gemini is too tired to roast you." }, { status: 500 });
  }
}