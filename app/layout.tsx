import type { Metadata } from "next";
import { Syne, Outfit, Space_Grotesk } from "next/font/google";
import "./globals.css";
import ScrollManager from "@/components/ScrollManager";

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Cosmos Portfolio",
  description: "A cinematic space-themed portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${outfit.variable} ${syne.variable} ${spaceGrotesk.variable} antialiased`}>
        <ScrollManager />
        {children}
      </body>
    </html>
  );
}
