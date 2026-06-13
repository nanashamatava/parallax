/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useRef } from "react";

interface Star {
  x: number;
  y: number;
  size: number;
  speed: number;
  alpha: number;
  alphaSpeed: number;
}

interface Comet {
  x: number;
  y: number;
  length: number;
  speed: number;
  angle: number;
  alpha: number;
}

interface Nebula {
  x: number;
  y: number;
  radius: number;
  color: string;
  vx: number;
  vy: number;
}

export default function LiveStarsBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Dynamic resizing
    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    // Initialize stars (3 layers of depth)
    const stars: Star[] = Array.from({ length: 150 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 1.5,
      speed: Math.random() * 0.05 + 0.01,
      alpha: Math.random(),
      alphaSpeed: (Math.random() * 0.02 + 0.005) * (Math.random() > 0.5 ? 1 : -1)
    }));

    // Initialize Nebulae (glowing colored clouds)
    const nebulae: Nebula[] = [
      {
        x: width * 0.25,
        y: height * 0.3,
        radius: Math.min(width, height) * 0.35,
        color: "rgba(124, 58, 237, 0.07)", // purple-600
        vx: 0.02,
        vy: -0.01
      },
      {
        x: width * 0.75,
        y: height * 0.6,
        radius: Math.min(width, height) * 0.4,
        color: "rgba(219, 39, 119, 0.06)", // pink-600
        vx: -0.015,
        vy: 0.02
      },
      {
        x: width * 0.5,
        y: height * 0.5,
        radius: Math.min(width, height) * 0.3,
        color: "rgba(14, 165, 233, 0.05)", // sky-500
        vx: 0.01,
        vy: 0.01
      }
    ];

    // Initialize Comets (shooting stars)
    const comets: Comet[] = [];
    const spawnComet = () => {
      if (comets.length > 2) return;
      comets.push({
        x: Math.random() * width,
        y: 0,
        length: Math.random() * 80 + 40,
        speed: Math.random() * 4 + 3,
        angle: Math.PI / 4 + (Math.random() * 0.1 - 0.05), // ~45 degrees
        alpha: 1
      });
    };

    // Spawn comets occasionally
    const cometInterval = setInterval(() => {
      if (Math.random() > 0.4) spawnComet();
    }, 7000);

    // Track mouse coordinates for dynamic galaxy tilt or interactive star glow
    let mouseX = width / 2;
    let mouseY = height / 2;
    let targetMouseX = width / 2;
    let targetMouseY = height / 2;

    const handleMouseMove = (e: MouseEvent) => {
      targetMouseX = e.clientX;
      targetMouseY = e.clientY;
    };
    window.addEventListener("mousemove", handleMouseMove);

    // Animation Loop
    const draw = () => {
      // Clear with slight trailing opacity to give stars a rich cinematic feel
      ctx.fillStyle = "rgba(2, 4, 8, 0.15)";
      ctx.fillRect(0, 0, width, height);

      // Interpolate mouse coordinates smoothly (Lag effect)
      mouseX += (targetMouseX - mouseX) * 0.05;
      mouseY += (targetMouseY - mouseY) * 0.05;

      // 1. Draw Nebulae dust clouds in background
      nebulae.forEach((neb) => {
        // Slow movement
        neb.x += neb.vx;
        neb.y += neb.vy;

        // Bounce back inside borders
        if (neb.x - neb.radius < -100 || neb.x + neb.radius > width + 100) neb.vx *= -1;
        if (neb.y - neb.radius < -100 || neb.y + neb.radius > height + 100) neb.vy *= -1;

        // Interactive mouse distortion
        const dx = mouseX - neb.x;
        const dy = mouseY - neb.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const shiftX = (dx / dist) * -15;
        const shiftY = (dy / dist) * -15;

        const grad = ctx.createRadialGradient(
          neb.x + shiftX,
          neb.y + shiftY,
          0,
          neb.x + shiftX,
          neb.y + shiftY,
          neb.radius
        );
        grad.addColorStop(0, neb.color);
        grad.addColorStop(0.5, neb.color.replace("0.0", "0.02"));
        grad.addColorStop(1, "rgba(0,0,0,0)");

        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(neb.x + shiftX, neb.y + shiftY, neb.radius, 0, Math.PI * 2);
        ctx.fill();
      });

      // 2. Draw Stars with glowing twinks
      stars.forEach((star) => {
        // Move stars slower/faster depending on size (parallax depth mapping)
        star.y += star.speed;
        if (star.y > height) {
          star.y = 0;
          star.x = Math.random() * width;
        }

        // Slight horizontal drift from mouse tilt
        const horizontalShift = (mouseX - width / 2) * 0.003 * star.size;
        
        // Twinkling
        star.alpha += star.alphaSpeed;
        if (star.alpha > 1 || star.alpha < 0.2) {
          star.alphaSpeed *= -1;
        }

        ctx.fillStyle = `rgba(255, 255, 255, ${Math.max(0.2, Math.min(1, star.alpha))})`;
        ctx.beginPath();
        ctx.arc(star.x + horizontalShift, star.y, star.size, 0, Math.PI * 2);
        ctx.fill();

        // Highlight stars occasionally with small laser-cross beams for luxury style
        if (star.size > 1.2 && Math.random() > 0.99) {
          ctx.strokeStyle = `rgba(255, 255, 255, ${star.alpha * 0.5})`;
          ctx.lineWidth = 0.5;
          ctx.beginPath();
          ctx.moveTo(star.x + horizontalShift - 4, star.y);
          ctx.lineTo(star.x + horizontalShift + 4, star.y);
          ctx.moveTo(star.x + horizontalShift, star.y - 4);
          ctx.lineTo(star.x + horizontalShift, star.y + 4);
          ctx.stroke();
        }
      });

      // 3. Draw Comets
      for (let i = comets.length - 1; i >= 0; i--) {
        const comet = comets[i];
        comet.x += Math.cos(comet.angle) * comet.speed;
        comet.y += Math.sin(comet.angle) * comet.speed;
        comet.alpha -= 0.012; // slowly fades

        if (comet.alpha <= 0 || comet.x > width + 100 || comet.y > height + 100) {
          comets.splice(i, 1);
          continue;
        }

        // Comet gradient tail
        const speedX = Math.cos(comet.angle) * comet.length;
        const speedY = Math.sin(comet.angle) * comet.length;

        const grad = ctx.createLinearGradient(
          comet.x,
          comet.y,
          comet.x - speedX,
          comet.y - speedY
        );
        grad.addColorStop(0, `rgba(255, 255, 255, ${comet.alpha})`);
        grad.addColorStop(0.1, `rgba(147, 197, 253, ${comet.alpha * 0.8})`); // light blue
        grad.addColorStop(0.4, `rgba(139, 92, 246, ${comet.alpha * 0.4})`); // indigo
        grad.addColorStop(1, "rgba(0,0,0,0)");

        ctx.strokeStyle = grad;
        ctx.lineWidth = 1.8;
        ctx.beginPath();
        ctx.moveTo(comet.x, comet.y);
        ctx.lineTo(comet.x - speedX, comet.y - speedY);
        ctx.stroke();
      }

      animationId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      clearInterval(cometInterval);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      id="live-starfield-canvas"
      className="fixed inset-0 w-full h-full pointer-events-none -z-50"
    />
  );
}
