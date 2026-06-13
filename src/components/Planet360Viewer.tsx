/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useRef, useState } from "react";
import { useLanguage } from "../context/LanguageContext";
import { MoveHorizontal, Settings, Sun, Sparkles } from "lucide-react";

interface PlanetType {
  slug: string;
  nameEn: string;
  nameKa: string;
  color: string;
  secondaryColor: string;
  rings: boolean;
  atmosphereColor: string;
}

export default function Planet360Viewer() {
  const { language } = useLanguage();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedPlanet, setSelectedPlanet] = useState<string>("jupiter");
  const [isDragging, setIsDragging] = useState(false);
  const [dragAngle, setDragAngle] = useState(0);
  const [lightAngle, setLightAngle] = useState(0.4); // radian angle of the directional sun highlight

  const planetsList: PlanetType[] = [
    { slug: "earth", nameEn: "Earth", nameKa: "დედამიწა", color: "#1e3a8a", secondaryColor: "#10b981", rings: false, atmosphereColor: "rgba(56, 189, 248, 0.5)" },
    { slug: "mars", nameEn: "Mars", nameKa: "მარსი", color: "#7f1d1d", secondaryColor: "#ea580c", rings: false, atmosphereColor: "rgba(244, 63, 94, 0.3)" },
    { slug: "jupiter", nameEn: "Jupiter", nameKa: "იუპიტერი", color: "#ea580c", secondaryColor: "#fef08a", rings: false, atmosphereColor: "rgba(251, 146, 60, 0.3)" },
    { slug: "saturn", nameEn: "Saturn", nameKa: "სატურნი", color: "#ca8a04", secondaryColor: "#fef08a", rings: true, atmosphereColor: "rgba(234, 179, 8, 0.3)" },
    { slug: "neptune", nameEn: "Neptune", nameKa: "ნეპტუნი", color: "#1e1b4b", secondaryColor: "#3b82f6", rings: false, atmosphereColor: "rgba(99, 102, 241, 0.4)" },
  ];

  const currentPlanet = planetsList.find((p) => p.slug === selectedPlanet) || planetsList[2];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let size = 260;
    canvas.width = size;
    canvas.height = size;

    let localAngle = dragAngle;
    let autoRotateSpeed = 0.003;

    // Track mouse dragging
    let startX = 0;
    const handleMouseDown = (e: MouseEvent) => {
      setIsDragging(true);
      startX = e.clientX;
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      const deltaX = e.clientX - startX;
      startX = e.clientX;
      localAngle += deltaX * 0.01;
      setDragAngle(localAngle);
    };

    const handleMouseUpOrLeave = () => {
      setIsDragging(false);
    };

    const canvasElem = canvas;
    canvasElem.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUpOrLeave);

    // Render loop
    const render = () => {
      ctx.clearRect(0, 0, size, size);

      const cx = size / 2;
      const cy = size / 2;
      const radius = 90;

      // Auto-rotate when not dragging
      if (!isDragging) {
        localAngle += autoRotateSpeed;
      }

      // 1. Render Atmosphere outer glow
      const atmGrad = ctx.createRadialGradient(cx, cy, radius - 5, cx, cy, radius + 25);
      atmGrad.addColorStop(0, currentPlanet.atmosphereColor);
      atmGrad.addColorStop(0.3, currentPlanet.atmosphereColor.replace("0.", "0.05"));
      atmGrad.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = atmGrad;
      ctx.beginPath();
      ctx.arc(cx, cy, radius + 30, 0, Math.PI * 2);
      ctx.fill();

      // 2. Draw Sphere base
      ctx.save();
      ctx.beginPath();
      ctx.arc(cx, cy, radius, 0, Math.PI * 2);
      ctx.clip(); // Mask texture inside the sphere!

      // Fill base deep color
      ctx.fillStyle = currentPlanet.color;
      ctx.beginPath();
      ctx.arc(cx, cy, radius, 0, Math.PI * 2);
      ctx.fill();

      // Draw procedural rotated surface details (craters, storms, clouds)
      // We draw repeated horizontal lines & spots offset by localAngle to simulate 3D rotation
      ctx.fillStyle = currentPlanet.secondaryColor;
      ctx.globalAlpha = 0.35;

      const numBands = 8;
      for (let i = 0; i < numBands; i++) {
        // Band height and positions
        const bandY = cy - radius + (i * (radius * 2 / numBands));
        const bandH = 15;
        
        ctx.beginPath();
        // Shift speed per band to imply liquid density / atmospheric variations (like Jupiter)
        const shiftX = (localAngle * (1 + (i % 3) * 0.4) * 50) % (radius * 4);
        
        // Draw recurring oval storms or patches mapped horizontally
        ctx.ellipse(
          cx + (shiftX % (radius * 3)) - (radius * 1.5),
          bandY + 5,
          25,
          7,
          0,
          0,
          Math.PI * 2
        );
        ctx.ellipse(
          cx + ((shiftX + 220) % (radius * 3)) - (radius * 1.5),
          bandY + 12,
          15,
          4,
          0,
          0,
          Math.PI * 2
        );
        ctx.fill();
        
        // Horizontal stripes/belts
        if (i % 2 === 0) {
          ctx.fillRect(cx - radius, bandY, radius * 2, 4);
        }
      }

      // Draw specialized elements (e.g. Earth Green continents mock, or Red Spot for Jupiter)
      if (currentPlanet.slug === "earth") {
        ctx.fillStyle = "#10b981"; // green lands drifting
        ctx.globalAlpha = 0.6;
        for (let j = 0; j < 3; j++) {
          const cShift = (localAngle * 35 + j * 90) % (radius * 3.5) - (radius * 1.5);
          ctx.beginPath();
          ctx.arc(cx + cShift, cy - 10 + j * 12, 25, 0, Math.PI * 2);
          ctx.arc(cx + cShift - 15, cy - 25, 15, 0, Math.PI * 2);
          ctx.fill();
        }
      } else if (currentPlanet.slug === "jupiter") {
        // Red spot stationary or slow scrolling
        const spotX = cx + ((localAngle * 50 + 130) % (radius * 2.8)) - (radius * 1.4);
        if (spotX > cx - radius && spotX < cx + radius) {
          ctx.fillStyle = "#ef4444";
          ctx.globalAlpha = 0.85;
          ctx.beginPath();
          ctx.ellipse(spotX, cy + 25, 14, 8, 0, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // 3. Render 3D lighting shadow (essential for high quality volumetric sphere look)
      ctx.restore(); // Remove clipping mask
      ctx.save();

      // Draw dynamic highlight gradients on top of the clipped mask
      ctx.beginPath();
      ctx.arc(cx, cy, radius, 0, Math.PI * 2);
      ctx.clip();

      // Light gradient mimicking a sun ray shining from upper-left
      const sunLX = cx - radius * Math.cos(lightAngle);
      const sunLY = cy - radius * Math.sin(lightAngle);
      
      const lightGrad = ctx.createRadialGradient(
        sunLX,
        sunLY,
        radius * 0.1,
        cx,
        cy,
        radius * 1.4
      );
      lightGrad.addColorStop(0, "rgba(255, 255, 255, 0.4)");
      lightGrad.addColorStop(0.3, "rgba(255, 255, 255, 0.0)");
      lightGrad.addColorStop(0.7, "rgba(0, 0, 0, 0.65)");
      lightGrad.addColorStop(1, "rgba(0, 0, 0, 0.95)");

      ctx.fillStyle = lightGrad;
      ctx.beginPath();
      ctx.arc(cx, cy, radius, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();

      // 4. Render Saturn Rings if toggled
      if (currentPlanet.rings) {
        ctx.strokeStyle = "rgba(254, 240, 138, 0.65)"; // yellowish golden
        ctx.lineWidth = 14;

        ctx.save();
        // Render back part of rings by cutting orbit arcs
        // (A fully accurate rings overlay handles back part under planet and front part over planet)
        // Set clipping to only cover front of saturn rings so planet cuts back of ring
        ctx.beginPath();
        // Ellipse tilt
        ctx.ellipse(cx, cy, radius * 1.9, radius * 0.35, -0.15, 0, Math.PI * 2);
        ctx.setLineDash([0, 0]);
        ctx.stroke();

        ctx.restore();
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      canvasElem.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUpOrLeave);
    };
  }, [selectedPlanet, isDragging, dragAngle, lightAngle]);

  return (
    <div ref={containerRef} className="w-full relative flex flex-col items-center justify-center p-6 bg-stone-900/30 backdrop-blur-md rounded-3xl border border-white/5 shadow-2xl overflow-hidden select-none font-sans">
      <div className="absolute top-4 left-6 z-10 flex flex-col pointer-events-none text-left">
        <h4 className="text-xs font-semibold uppercase tracking-widest text-pink-500 flex items-center gap-1.5">
          <Sparkles className="w-4 h-4 animate-pulse" />
          {language === "ka" ? "პლანეტის 360° ინტერაქტიული მაყურებელი" : "Interactive 360° Planet Viewer"}
        </h4>
        <p className="text-[10px] text-zinc-400 mt-0.5">
          {language === "ka" ? "დააჭირეთ და გაასრიალეთ პლანეტის დასატრიალებლად" : "Hold & Drag sphere surface to rotate planet map"}
        </p>
      </div>

      <div className="relative mt-8 mb-4 h-[260px] flex items-center justify-center">
        <canvas ref={canvasRef} className="cursor-grab active:cursor-grabbing transform hover:scale-[1.02] transition-transform duration-300" />
        
        {/* Holographic orbital details surrounding the canvas for luxury tech look */}
        <div className="absolute inset-x-[-12px] h-[300px] border-y border-white/5 pointer-events-none rounded-full flex flex-col justify-between items-center py-2 text-[8px] font-mono text-zinc-500">
          <div className="flex gap-2 text-[#38bdf8] bg-black/60 px-2 py-0.5 rounded-full border border-white/10 font-sans">
            <Sun className="w-3 h-3 text-amber-500 animate-pulse" /> 
            {language === "ka" ? "სინათლის კუთხე" : "LIGHT ANGLE"}: {(lightAngle * (180 / Math.PI)).toFixed(0)}°
          </div>
          <div className="flex items-center gap-1.5 bg-black/50 px-3 py-1 rounded-full border border-white/5 text-zinc-300 animate-bounce font-sans">
            <MoveHorizontal className="w-3 h-3 text-pink-500" /> 
            {language === "ka" ? "გაასრიალეთ დასატრიალებლად" : "DRAG TO ROTATE COSMOS"}
          </div>
        </div>
      </div>

      {/* Select planet buttons */}
      <div className="w-full flex justify-between items-center gap-1.5 bg-black/60 p-1.5 rounded-2xl border border-white/5 mt-4">
        {planetsList.map((p) => (
          <button
            key={p.slug}
            id={`btn-planet-viewer-${p.slug}`}
            onClick={() => setSelectedPlanet(p.slug)}
            className={`flex-1 py-1 px-2 text-[10px] sm:text-xs font-semibold rounded-lg transition-all duration-300 ${
              selectedPlanet === p.slug
                ? "bg-gradient-to-r from-pink-600 to-purple-600 text-white shadow-lg shadow-pink-500/10"
                : "text-zinc-400 hover:text-white hover:bg-white/5"
            }`}
          >
            {language === "ka" ? p.nameKa : p.nameEn}
          </button>
        ))}
      </div>

      {/* Control slider for lighting source direction */}
      <div className="w-full flex items-center gap-3 bg-black/40 px-4 py-2.5 rounded-2xl border border-white/5 mt-3.5">
        <span className="text-[10px] font-sans text-zinc-200 flex items-center gap-1.5 min-w-[124px]">
          <Settings className="w-3.5 h-3.5 text-zinc-400 font-sans" /> 
          {language === "ka" ? "მზის სინათლის წყარო" : "Solar Light Source"}
        </span>
        <input
          type="range"
          id="planet-viewer-light-slider"
          min="0"
          max="6.28"
          step="0.05"
          value={lightAngle}
          onChange={(e) => setLightAngle(parseFloat(e.target.value))}
          className="flex-1 accent-pink-500 bg-white/10 h-1.5 rounded-lg cursor-pointer"
        />
        <span className="text-[10px] font-mono text-pink-500">{(lightAngle).toFixed(2)} rad</span>
      </div>
    </div>
  );
}
