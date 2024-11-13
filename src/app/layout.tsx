import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import IndexHeader from "@/components/IndexHeader";
import { cookies } from "next/headers";
import { supabaseServerClient } from "@/api/config";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Minimal Shopping",
  description: "Online Shop",
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <IndexHeader/>
        {children}
      </body>
    </html>
  );
}
