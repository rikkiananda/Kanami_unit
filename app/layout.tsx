import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Kanami Unit - Editing Community",
  description: "Professional Video Editing Community Workspace",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} antialiased h-screen w-screen flex flex-col overflow-hidden bg-[var(--color-editor-bg)] text-[var(--color-editor-text)]`}
      >
        <Navbar />
        <main className="flex-1 overflow-hidden flex flex-col relative w-full h-full p-2 gap-2">
          {children}
        </main>
      </body>
    </html>
  );
}
