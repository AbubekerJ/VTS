import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import AllProvider from "../config/all-provider";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Visit Tracking System",
  description: "Visit Tracking System",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en ">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased  `}
      >
        <Toaster />
        <AllProvider>
          <main className=" w-full h-full  ">{children}</main>
        </AllProvider>
      </body>
    </html>
  );
}
