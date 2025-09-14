// src/app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Bloodbankgroup.com - Blood Bank Management System",
  description:
    "A modern system for managing blood banks, donors, and inventory.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      {/*
        The <head> tag is automatically managed by Next.js.
        The <body> tag must immediately follow the <html> tag with no spaces or comments in between.
      */}
      <body
        className={`bg-background dark:bg-gray-950 text-content dark:text-gray-300 antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
