import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Header from "./components/Header";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Coomer Mobile Pages",
  description: "Documentation and distribution for coomer.st android application",
  icons: {
    icon: "https://cdn.builder.io/api/v1/image/assets%2F97bfa5d272764bffa08255a1846cb4b3%2Ff46f7459269a40d6b9e2e7f141571e90?format=webp&width=800&height=1200",
  },
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
        <Header />
        {children}
      </body>
    </html>
  );
}
