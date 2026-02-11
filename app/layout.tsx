import "./globals.css";
import { Inter, Space_Grotesk } from "next/font/google"; // Import both fonts

const inter = Inter({ 
  subsets: ["latin"],
  variable: '--font-inter',
});

const spaceGrotesk = Space_Grotesk({ 
  subsets: ["latin"],
  variable: '--font-space-grotesk',
});

export const metadata = {
  title: "Hizaki Auditor | Roast My Resume",
  description: "Brutally honest feedback powered by Hizaki Labs AI.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${spaceGrotesk.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}