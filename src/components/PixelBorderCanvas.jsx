import { useEffect, useRef } from "react";
import "./PixelBorderCanvas.css";

/**
 * PixelBorderCanvas
 * Renders an animated canvas along a border line with:
 * - Random streams of square digital pixels flowing outwards and dissipating.
 * - Clean baseline ready for custom glitch effect implementation.
 *
 * @param {'top' | 'bottom'} position - 'top' streams upward, 'bottom' streams downward.
 */
export default function PixelBorderCanvas({ position = "top" }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let animationFrameId;
    let isVisible = true;
    let width = 0;
    const height = 90; // Canvas height in CSS px
    const baselineY = 45; // Baseline border line is centered at Y=45

    // High DPI scaling
    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect();
      width = Math.max(rect.width, window.innerWidth || 1000);
      const dpr = window.devicePixelRatio || 1;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.scale(dpr, dpr);
    };

    resizeCanvas();

    // Resize observer on parent container for responsive adjustments
    const resizeObserver = new ResizeObserver(() => {
      resizeCanvas();
    });
    if (canvas.parentElement) {
      resizeObserver.observe(canvas.parentElement);
    }

    // Particle pool for pixel streams
    const particles = [];
    const MAX_PARTICLES = 160;

    // Stream emitter vents along X axis
    const activeVents = [];
    const MAX_VENTS = 12;

    const spawnVent = () => {
      if (activeVents.length >= MAX_VENTS) return;
      activeVents.push({
        x: Math.random() * width,
        width: Math.floor(Math.random() * 24) + 8, // Width of this pixel stream
        duration: Math.floor(Math.random() * 80) + 40,
        age: 0,
        rate: Math.floor(Math.random() * 3) + 1, // spawn interval
        colorBias: Math.random() < 0.25 ? "accent" : "mono",
      });
    };

    // Color palettes for authentic digital pixel aesthetic
    const MONO_COLORS = ["#18181b", "#27272a", "#3f3f46", "#71717a", "#a1a1aa"];
    const ACCENT_COLORS = ["#06b6d4", "#10b981", "#fbbf24", "#f43f5e", "#8b5cf6"];

    const getRandomColor = (type = "mono") => {
      if (type === "accent") {
        return ACCENT_COLORS[Math.floor(Math.random() * ACCENT_COLORS.length)];
      }
      return MONO_COLORS[Math.floor(Math.random() * MONO_COLORS.length)];
    };

    const spawnParticle = (x, colorType = "mono") => {
      if (particles.length >= MAX_PARTICLES) return;

      const size = Math.floor(Math.random() * 3) + 2; // 2px, 3px, or 4px square pixel
      const speedY = (Math.random() * 1.8 + 0.6) * (position === "top" ? -1 : 1);
      const speedX = (Math.random() - 0.5) * 0.7; // subtle horizontal drift

      particles.push({
        x: Math.round(x),
        y: baselineY + (position === "top" ? -1 : 1),
        size,
        vx: speedX,
        vy: speedY,
        alpha: 1.0,
        decay: Math.random() * 0.02 + 0.015, // life decay rate
        color: getRandomColor(colorType),
        flicker: Math.random() < 0.3,
      });
    };

    // Main animation render loop
    const render = () => {
      if (!isVisible) {
        animationFrameId = requestAnimationFrame(render);
        return;
      }

      ctx.clearRect(0, 0, width, height);

      // 1. Draw the Clean Baseline Border Line
      ctx.fillStyle = "rgba(0, 0, 0, 0.12)";
      ctx.fillRect(0, baselineY, width, 1);

      // 2. Update & Spawn Pixel Stream Emitters
      if (Math.random() < 0.08 && activeVents.length < MAX_VENTS) {
        spawnVent();
      }

      for (let i = activeVents.length - 1; i >= 0; i--) {
        const vent = activeVents[i];
        vent.age++;

        if (vent.age % vent.rate === 0) {
          const spawnX = vent.x + (Math.random() - 0.5) * vent.width;
          if (spawnX >= 0 && spawnX <= width) {
            spawnParticle(spawnX, vent.colorBias);
          }
        }

        if (vent.age >= vent.duration) {
          activeVents.splice(i, 1);
        }
      }

      // 3. Update & Draw Dissipating Pixel Particles
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];

        // Step physics
        p.x += p.vx;
        p.y += p.vy;
        p.alpha -= p.decay;

        // Dissipation: shrink pixel size when alpha drops below 0.35
        let currentSize = p.size;
        if (p.alpha < 0.35 && currentSize > 1) {
          currentSize -= 1;
        }

        // Draw particle if still alive
        if (p.alpha > 0) {
          let drawAlpha = Math.max(0, p.alpha);
          if (p.flicker && Math.random() < 0.25) {
            drawAlpha *= 0.5; // Digital flicker
          }

          ctx.fillStyle = p.color;
          ctx.globalAlpha = drawAlpha;
          ctx.fillRect(Math.round(p.x), Math.round(p.y), currentSize, currentSize);
        } else {
          // Remove dead particle
          particles.splice(i, 1);
        }
      }

      ctx.globalAlpha = 1.0;
      animationFrameId = requestAnimationFrame(render);
    };

    // Pause when offscreen using IntersectionObserver for battery & CPU conservation
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isVisible = entry.isIntersecting;
        });
      },
      { rootMargin: "120px" }
    );

    observer.observe(canvas);

    // Start loop
    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      observer.disconnect();
      resizeObserver.disconnect();
    };
  }, [position]);

  return (
    <canvas
      ref={canvasRef}
      className={`pixel-border-canvas pixel-border-canvas--${position}`}
      aria-hidden="true"
    />
  );
}
