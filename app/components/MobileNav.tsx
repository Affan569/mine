"use client";
import { useState } from "react";
import Link from "next/link";

export default function MobileNav() {
  const [open, setOpen] = useState(false);
  return (
    <div className="sm:hidden">
      <button
        aria-label="Open menu"
        className="h-9 w-9 rounded-md border border-zinc-300 dark:border-zinc-700 grid place-items-center"
        onClick={() => setOpen(true)}
      >
        <span className="block w-4 h-[2px] bg-zinc-900 dark:bg-zinc-200"></span>
        <span className="block w-4 h-[2px] bg-zinc-900 dark:bg-zinc-200 mt-[4px]"></span>
        <span className="block w-4 h-[2px] bg-zinc-900 dark:bg-zinc-200 mt-[4px]"></span>
      </button>
      {open && (
        <div className="fixed inset-0 z-50">
          <div className="absolute inset-0 bg-black/40" onClick={() => setOpen(false)}></div>
          <div className="absolute right-0 top-0 h-full w-64 bg-white dark:bg-zinc-900 border-l border-zinc-200 dark:border-zinc-800 p-6">
            <div className="flex items-center justify-between">
              <p className="font-semibold">Menu</p>
              <button
                aria-label="Close menu"
                className="h-8 w-8 rounded-md border border-zinc-300 dark:border-zinc-700 grid place-items-center"
                onClick={() => setOpen(false)}
              >
                <span className="block w-3 h-[2px] bg-zinc-900 dark:bg-zinc-200 rotate-45 translate-y-[1px]"></span>
                <span className="block w-3 h-[2px] bg-zinc-900 dark:bg-zinc-200 -rotate-45 -translate-y-[1px]"></span>
              </button>
            </div>
            <nav className="mt-6 space-y-4 text-sm">
              <Link href="/" onClick={() => setOpen(false)} className="block">Home</Link>
              <Link href="/services" onClick={() => setOpen(false)} className="block">Services</Link>
              <Link href="/projects" onClick={() => setOpen(false)} className="block">Projects</Link>
              <Link href="/contact" onClick={() => setOpen(false)} className="block">Contact</Link>
            </nav>
          </div>
        </div>
      )}
    </div>
  );
}
