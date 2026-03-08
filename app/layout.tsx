import { Analytics } from '@vercel/analytics/react';
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "./components/header";
import { Footer } from "./components/footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "khlilo — Builder & Observer",
  description:
    "探寻事物运转的底层规律，专注于构建具备长期价值的系统。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" className="dark" style={{ backgroundColor: "#000" }}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased`}
        style={{ backgroundColor: "#0a0a0a", color: "#ededed" }}
      >
        {children}
        <Analytics />
        <Header />
        <main className="min-h-screen pt-16">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
