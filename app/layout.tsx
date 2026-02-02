import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import GridCircuitBackground from "./components/CircuitBackground";
import MobileNav from "./components/MobileNav";
import ArrowCursor from "./components/ArrowCursor";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Muhammad Affan — Portfolio",
  description: "Turning ideas into digital experiences",
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
        <ArrowCursor />
        <GridCircuitBackground />
        <header className="sticky top-0 z-50 bg-white/70 dark:bg-black/60 backdrop-blur border-b border-zinc-200 dark:border-zinc-800">
          <div className="mx-auto max-w-6xl px-6 h-14 flex items-center justify-between">
            <Link href="/" className="font-semibold">Muhammad Affan</Link>
            <nav className="hidden sm:flex items-center gap-6 text-sm">
              <Link href="/">Home</Link>
              <Link href="/services">Services</Link>
              <Link href="/projects">Projects</Link>
              <Link href="/contact">Contact</Link>
            </nav>
            <MobileNav />
          </div>
        </header>
        {children}
        <footer className="border-t border-zinc-200 dark:border-zinc-800">
          <div className="mx-auto max-w-6xl px-6 h-16 flex items-center justify-between text-sm text-zinc-600 dark:text-zinc-400">
            <p>© {new Date().getFullYear()} Muhammad Affan</p>
            <div className="flex items-center gap-4">
              <a href="/contact">Work With Me</a>
              <a href="/projects">See My Work</a>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
