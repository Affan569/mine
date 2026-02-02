"use client";
import { useEffect, useRef } from "react";

export default function NeuralCircuitBackground() {
  const ref = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = ref.current!;
    const ctx = canvas.getContext("2d")!;
    let raf = 0;
    const gridSpacing = 50;
    let pulses: Pulse[] = [];

    class Pulse {
      x: number; y: number;
      lastX: number; lastY: number;
      dx: number; dy: number;
      life: number;
      hue: number;
      speed: number;

      constructor(x?: number, y?: number, dx?: number, dy?: number, hue?: number) {
        this.x = x ?? Math.floor(Math.random() * (canvas.width / gridSpacing)) * gridSpacing;
        this.y = y ?? Math.floor(Math.random() * (canvas.height / gridSpacing)) * gridSpacing;
        this.lastX = this.x;
        this.lastY = this.y;
        
        // Initial direction: only horizontal or vertical
        const horizontal = Math.random() > 0.5;
        this.dx = dx ?? (horizontal ? (Math.random() > 0.5 ? 1 : -1) : 0);
        this.dy = dy ?? (!horizontal ? (Math.random() > 0.5 ? 1 : -1) : 0);
        
        this.life = 0;
        this.hue = hue ?? (Math.random() > 0.5 ? 190 : 255);
        this.speed = 4; // Must be a divisor of gridSpacing for clean turns
      }

      update() {
        this.lastX = this.x;
        this.lastY = this.y;
        this.x += this.dx * this.speed;
        this.y += this.dy * this.speed;
        this.life++;

        // At every grid intersection, potentially turn or branch
        if (this.x % gridSpacing === 0 && this.y % gridSpacing === 0) {
          if (Math.random() < 0.3) { // 30% chance to change direction
            const horizontal = this.dy !== 0; 
            this.dx = horizontal ? (Math.random() > 0.5 ? 1 : -1) : 0;
            this.dy = !horizontal ? (Math.random() > 0.5 ? 1 : -1) : 0;
          }
          
          if (Math.random() < 0.05 && pulses.length < 30) { // 5% chance to branch/split
            pulses.push(new Pulse(this.x, this.y, -this.dx, -this.dy, this.hue));
          }
        }
      }

      draw() {
        const opacity = Math.max(0, 1 - this.life / 150);
        ctx.shadowBlur = 10;
        ctx.shadowColor = `hsla(${this.hue}, 100%, 50%, ${opacity})`;
        ctx.strokeStyle = `hsla(${this.hue}, 100%, 70%, ${opacity})`;
        ctx.lineWidth = 2;
        ctx.lineCap = "round";
        
        ctx.beginPath();
        ctx.moveTo(this.lastX, this.lastY);
        ctx.lineTo(this.x, this.y);
        ctx.stroke();
      }
    }

    function resize() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      ctx.fillStyle = "#020205";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }

    window.addEventListener("resize", resize);
    resize();

    function render() {
      // THE SECRET: A very high opacity "black-out" creates short trails, 
      // but a "globalAlpha" trick keeps the old paths faint.
      ctx.fillStyle = "rgba(2, 2, 5, 0.05)"; 
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Randomly spawn new pulses
      if (Math.random() < 0.08 && pulses.length < 20) {
        pulses.push(new Pulse());
      }

      ctx.globalCompositeOperation = "lighter";
      pulses.forEach((p, i) => {
        p.update();
        p.draw();
        
        // Remove dead or off-screen pulses
        if (p.life > 150 || p.x < 0 || p.x > canvas.width || p.y < 0 || p.y > canvas.height) {
          pulses.splice(i, 1);
        }
      });
      ctx.globalCompositeOperation = "source-over";

      // Subtle Glitch Effect: occasionally shift a slice of the canvas
      if (Math.random() > 0.98) {
        const y = Math.random() * canvas.height;
        const h = Math.random() * 50;
        ctx.drawImage(canvas, 0, y, canvas.width, h, Math.random() * 4 - 2, y, canvas.width, h);
      }

      raf = requestAnimationFrame(render);
    }

    render();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <div className="fixed inset-0 -z-10 bg-[#020205] overflow-hidden">
      {/* Heavy radial glow to focus the center */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#020205_80%)] z-10 pointer-events-none" />
      <canvas ref={ref} className="block w-full h-full opacity-80" />
      
      {/* Noise Texture Overlay */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none z-20 bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
    </div>
  );
}