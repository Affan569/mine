"use client";
import { useEffect, useRef } from "react";

export default function HexBackground() {
  const ref = useRef<HTMLCanvasElement | null>(null);
  useEffect(() => {
    const canvas = ref.current!;
    const ctx = canvas.getContext("2d")!;
    let animationFrame = 0;

    function resize() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener("resize", resize);

    const radius = 10; // hex radius
    const w = radius * 2;
    const h = Math.sqrt(3) * radius;
    const xStep = (3 / 2) * radius;
    const yStep = h;
    const amplitude = 8;
    const scale = 120;

    function drawHex(cx: number, cy: number, stroke: string) {
      ctx.beginPath();
      for (let i = 0; i < 6; i++) {
        const angle = ((Math.PI / 3) * i) + Math.PI / 6;
        const x = cx + radius * Math.cos(angle);
        const y = cy + radius * Math.sin(angle);
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.closePath();
      ctx.strokeStyle = stroke;
      ctx.lineWidth = 1;
      ctx.stroke();
    }

    function loop(t: number) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const time = t / 1000;
      for (let col = -1; col * xStep < canvas.width + w; col++) {
        for (let row = -1; row * yStep < canvas.height + h; row++) {
          const cx = col * xStep + (canvas.width % xStep);
          const baseY = row * yStep + ((col % 2) ? h / 2 : 0) + (canvas.height % yStep);
          const offset = Math.sin((cx / scale) + time) * amplitude;
          const cy = baseY + offset;

          const light = Math.max(0.15, 0.6 + offset / (amplitude * 2));
          const stroke = `rgba(130, 160, 255, ${light})`;
          drawHex(cx, cy, stroke);
        }
      }
      animationFrame = requestAnimationFrame(loop);
    }
    animationFrame = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(animationFrame);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      className="fixed inset-0 -z-10 opacity-85 pointer-events-none"
      aria-hidden="true"
    />
  );
}
