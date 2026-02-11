import "./globals.css";
import { Inter, Space_Grotesk } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"] });

export const metadata = {
  title: "Resume Auditor | Hizaki Labs",
  description: "Advanced AI-driven resume analysis and technical auditing powered by Hizaki Labs Gemini 3 Intelligence.",
  icons: {
    icon: "/icon.png", // This points to public/icon.png or app/icon.png
    apple: "/icon.png", // Optional: for iPhone home screens
  },
  openGraph: {
    title: "Resume Auditor | Hizaki Labs",
    description: "Get a cold, analytical audit of your career documents.",
    type: "website",
    images: [
      {
        url: "/icon.png", // The image people see when you share the link on Discord/Twitter
        width: 1200,
        height: 630,
      },
    ],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css" />
      </head>
      <body className={inter.className} style={{ margin: 0 }}>
        {children}
      </body>
    </html>
  );
}