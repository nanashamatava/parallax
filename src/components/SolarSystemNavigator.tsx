/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useRef, useState } from "react";
import { Compass, Globe, Moon, Sun, Sparkles } from "lucide-react";

interface SolarSystemNavigatorProps {
  onSelectCategory: (categorySlug: string) => void;
  selectedCategorySlug: string;
}

interface CelestialBody {
  id: string; // collection slug
  name: string;
  distance: number; // orbital radius
  radius: number; // visual size
  color: string;
  speed: number;
  icon?: string;
  desc: string;
  glowColor: string;
}

export default function SolarSystemNavigator({
  onSelectCategory,
  selectedCategorySlug,
}: SolarSystemNavigatorProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [hoveredBody, setHoveredBody] = useState<CelestialBody | null>(null);
  const [hoverPos, setHoverPos] = useState({ x: 0, y: 0 });

  const bodies: CelestialBody[] = [
    { id: "sun", name: "Sun", distance: 0, radius: 24, color: "#f59e0b", speed: 0, desc: "Thermonuclear core of the System", glowColor: "rgba(245, 158, 11, 0.6)" },
    { id: "earth", name: "Earth", distance: 65, radius: 8, color: "#3b82f6", speed: 0.015, desc: "Liquid water haven, cradle of consciousness", glowColor: "rgba(59, 130, 246, 0.4)" },
    { id: "moon", name: "Moon", distance: 85, radius: 4, color: "#94a3b8", speed: 0.03, desc: "Barren silver guardian, lunar lock", glowColor: "rgba(148, 163, 184, 0.4)" },
    { id: "mars", name: "Mars", distance: 110, radius: 7, color: "#ef4444", speed: 0.011, desc: "Rust desolation awaiting settlement", glowColor: "rgba(239, 68, 68, 0.4)" },
    { id: "jupiter", name: "Jupiter", distance: 145, radius: 14, color: "#f97316", speed: 0.007, desc: "Colossal stormy gas vanguard", glowColor: "rgba(249, 115, 22, 0.4)" },
    { id: "saturn", name: "Saturn", distance: 185, radius: 12, color: "#eab308", speed: 0.005, desc: "Jewel of orbit, ringed majesty", glowColor: "rgba(234, 179, 8, 0.4)" },
    { id: "uranus", name: "Uranus", distance: 220, radius: 10, color: "#22d3ee", speed: 0.003, desc: "Oblique gas core, icy cyan rings", glowColor: "rgba(34, 211, 238, 0.4)" },
    { id: "neptune", name: "Neptune", distance: 250, radius: 9, color: "#6366f1", speed: 0.002, desc: "Supersonic indigo tempest giant", glowColor: "rgba(99, 102, 241, 0.4)" },
  ];

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let size = Math.min(container.clientWidth, 600);
    canvas.width = size;
    canvas.height = size;

    const handleResize = () => {
      if (!container || !canvas) return;
      size = Math.min(container.clientWidth, 600);
      canvas.width = size;
      canvas.height = size;
    };
    window.addEventListener("resize", handleResize);

    // Dynamic orbital angles
    const angles: number[] = bodies.map(() => Math.random() * Math.PI * 2);

    const checkClickOrHover = (e: MouseEvent, isClick: boolean) => {
      const rect = canvas.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const clickY = e.clientY - rect.top;

      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;

      // Check click proximity to bodies
      let found: CelestialBody | null = null;

      bodies.forEach((body, idx) => {
        let bx = centerX;
        let by = centerY;

        if (body.distance > 0) {
          // Adjust orbital scale slightly to fit container size
          const scale = size / 600;
          const dist = body.distance * scale;
          bx = centerX + Math.cos(angles[idx]) * dist;
          by = centerY + Math.sin(angles[idx]) * dist;
        }

        const dx = clickX - bx;
        const dy = clickY - by;
        const distance = Math.sqrt(dx * dx + dy * dy);

        // Click buffer (min 15px)
        const hitRadius = Math.max(16, body.radius * 1.5);
        if (distance < hitRadius) {
          found = body;
        }
      });

      if (isClick && found) {
        onSelectCategory((found as CelestialBody).id);
      } else {
        setHoveredBody(found);
        if (found) {
          setHoverPos({ x: clickX, y: clickY });
        }
      }
    };

    const handleMouseUp = (e: MouseEvent) => checkClickOrHover(e, true);
    const handleMouseMove = (e: MouseEvent) => checkClickOrHover(e, false);

    canvas.addEventListener("mouseup", handleMouseUp);
    canvas.addEventListener("mousemove", handleMouseMove);

    // Animation Loop
    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const scale = size / 600;

      // 1. Draw subtle grid backdrop
      ctx.strokeStyle = "rgba(124, 58, 237, 0.04)";
      ctx.lineWidth = 0.5;
      for (let i = 40; i < size / 2; i += 40) {
        ctx.beginPath();
        ctx.arc(centerX, centerY, i, 0, Math.PI * 2);
        ctx.stroke();
      }

      // 2. Render Orbits
      bodies.forEach((body) => {
        if (body.distance > 0) {
          ctx.beginPath();
          ctx.strokeStyle =
            selectedCategorySlug === body.id
              ? "rgba(14, 165, 233, 0.35)" // active blue orbit
              : "rgba(255, 255, 255, 0.05)";
          ctx.lineWidth = selectedCategorySlug === body.id ? 1.5 : 0.8;
          ctx.arc(centerX, centerY, body.distance * scale, 0, Math.PI * 2);
          ctx.stroke();
        }
      });

      // 3. Render Bodies
      bodies.forEach((body, idx) => {
        let bx = centerX;
        let by = centerY;

        if (body.distance > 0) {
          angles[idx] += body.speed; // Orbit tick
          const dist = body.distance * scale;
          bx = centerX + Math.cos(angles[idx]) * dist;
          by = centerY + Math.sin(angles[idx]) * dist;
        }

        // Draw body glow
        const glowRad = body.radius * (body.id === "sun" ? 2.5 : 1.8);
        const glowGrad = ctx.createRadialGradient(bx, by, 0, bx, by, glowRad);
        glowGrad.addColorStop(0, body.glowColor);
        glowGrad.addColorStop(1, "rgba(0,0,0,0)");
        
        ctx.fillStyle = glowGrad;
        ctx.beginPath();
        ctx.arc(bx, by, glowRad, 0, Math.PI * 2);
        ctx.fill();

        // Draw body solid sphere
        ctx.fillStyle = body.color;
        ctx.beginPath();
        ctx.arc(bx, by, body.radius, 0, Math.PI * 2);
        ctx.fill();

        // Draw rings on Saturn visually
        if (body.id === "saturn") {
          ctx.strokeStyle = "rgba(234, 179, 8, 0.6)";
          ctx.lineWidth = 2.5;

          ctx.beginPath();
          ctx.ellipse(bx, by, body.radius * 1.8, body.radius * 0.4, -0.2, 0, Math.PI * 2);
          ctx.stroke();
        }

        // Draw selection ring
        if (selectedCategorySlug === body.id) {
          ctx.strokeStyle = "#38bdf8"; // bright sky-400
          ctx.lineWidth = 1.2;
          ctx.setLineDash([2, 2]);
          ctx.beginPath();
          ctx.arc(bx, by, body.radius + 6, 0, Math.PI * 2);
          ctx.stroke();
          ctx.setLineDash([]);
        }

        // Add small text tag next to it
        ctx.fillStyle = selectedCategorySlug === body.id ? "#38bdf8" : "rgba(255,255,255,0.4)";
        ctx.font = "10px Inter";
        ctx.textAlign = "center";
        
        ctx.fillText(body.name, bx, by - body.radius - 8);
      });

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", handleResize);
      if (canvas) {
        canvas.removeEventListener("mouseup", handleMouseUp);
        canvas.removeEventListener("mousemove", handleMouseMove);
      }
    };
  }, [onSelectCategory, selectedCategorySlug]);

  return (
    <div ref={containerRef} className="relative w-full max-w-[600px] aspect-square flex items-center justify-center bg-black/40 backdrop-blur-md rounded-3xl border border-white/5 shadow-2xl p-6 overflow-hidden">
      <div className="absolute top-4 left-6 z-10 select-none">
        <h4 className="text-xs font-semibold uppercase tracking-widest text-[#38bdf8] flex items-center gap-2">
          <Compass className="w-4 h-4 animate-spin-slow" />
          Interactive 3D System Navigation
        </h4>
        <p className="text-[10px] text-zinc-400 mt-1">Click a planet center to view its wallpaper catalog</p>
      </div>

      <canvas ref={canvasRef} className="w-full cursor-pointer h-full border border-white/5 rounded-2xl bg-black/60 shadow-inner" />

      {/* Hover Information Box */}
      {hoveredBody && (
        <div
          className="absolute z-20 pointer-events-none p-3 rounded-xl bg-black/90 border border-[#38bdf8]/30 text-white shadow-xl max-w-[170px]"
          style={{
            left: `${hoverPos.x + 15}px`,
            top: `${hoverPos.y + 15}px`,
          }}
        >
          <div className="text-xs font-bold text-sky-400 flex items-center gap-1.5">
            {hoveredBody.id === "sun" ? (
              <Sun className="w-3.5 h-3.5 text-amber-500" />
            ) : hoveredBody.id === "earth" ? (
              <Globe className="w-3.5 h-3.5 text-blue-500" />
            ) : hoveredBody.id === "moon" ? (
              <Moon className="w-3.5 h-3.5 text-slate-400" />
            ) : (
              <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
            )}
            {hoveredBody.name}
          </div>
          <p className="text-[10px] text-zinc-300 mt-1 leading-normal">{hoveredBody.desc}</p>
          <p className="text-[9px] text-[#38bdf8] mt-1.5 font-mono">Click orbit center</p>
        </div>
      )}
    </div>
  );
}
