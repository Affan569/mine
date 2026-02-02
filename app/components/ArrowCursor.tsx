"use client";
import { useEffect, useRef } from "react";

export default function ArrowCursor() {
  const ref = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const el = ref.current!;
    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;
    let tx = x;
    let ty = y;
    function onMove(e: MouseEvent) {
      tx = e.clientX;
      ty = e.clientY;
    }
    window.addEventListener("mousemove", onMove);
    let raf = 0;
    function loop() {
      x += (tx - x) * 0.15;
      y += (ty - y) * 0.15;
      el.style.transform = `translate(${x}px, ${y}px) rotate(45deg)`;
      raf = requestAnimationFrame(loop);
    }
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
    };
  }, []);
  return (
    <div ref={ref} className="fixed left-0 top-0 z-50 pointer-events-none" aria-hidden="true">
      <div className="w-4 h-4 border-t-2 border-l-2 border-indigo-400"></div>
    </div>
  );
}
