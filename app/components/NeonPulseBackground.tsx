"use client";
import { useEffect, useRef } from "react";

export default function NeonPulseBackground() {
  const ref = useRef<HTMLCanvasElement | null>(null);
  useEffect(() => {
    const canvas = ref.current!;
    const ctx = canvas.getContext("2d")!;
    let raf = 0;
    let dpr = Math.max(1, Math.min(2, window.devicePixelRatio || 1));

    function resize() {
      const w = window.innerWidth;
      const h = window.innerHeight;
      dpr = Math.max(1, Math.min(2, window.devicePixelRatio || 1));
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
    }
    resize();
    window.addEventListener("resize", resize);

    const nodes = Array.from({ length: 24 }).map(() => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      r: 1.5 + Math.random() * 1.5,
      hue: 210 + Math.random() * 80,
    }));

    function stepNodes() {
      for (const n of nodes) {
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < 0 || n.x > window.innerWidth) n.vx *= -1;
        if (n.y < 0 || n.y > window.innerHeight) n.vy *= -1;
      }
    }

    function draw(t: number) {
      const time = t / 1000;
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
      ctx.fillStyle = "#05060b";
      ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);

      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;
      const base = Math.min(window.innerWidth, window.innerHeight) * 0.5;
      for (let i = 0; i < 3; i++) {
        const r = base * (0.35 + i * 0.15 + Math.sin(time + i) * 0.02);
        const grad = ctx.createRadialGradient(cx, cy, r * 0.2, cx, cy, r);
        grad.addColorStop(0, `rgba(99,102,241,${0.20 - i * 0.05})`);
        grad.addColorStop(0.5, `rgba(236,72,153,${0.14 - i * 0.03})`);
        grad.addColorStop(1, `rgba(45,212,191,${0.10 - i * 0.02})`);
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(cx, cy, r, 0, Math.PI * 2);
        ctx.fill();
      }

      stepNodes();
      for (const n of nodes) {
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r + Math.sin(time + n.x * 0.005) * 0.4, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${n.hue}, 80%, 70%, 0.8)`;
        ctx.shadowBlur = 12;
        ctx.shadowColor = `hsla(${n.hue}, 80%, 60%, 0.9)`;
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      raf = requestAnimationFrame(draw);
    }
    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={ref} className="fixed inset-0 -z-10 pointer-events-none" aria-hidden="true" />;
}
