
"use client";

import { useEffect, useRef } from "react";

export default function CrystalField() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");

    if (!canvas || !ctx) return;

    let width = 0;
    let height = 0;
    let frameId = 0;

    const pointer = { x: -1000, y: -1000 };
    const crystals = [];
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    function resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);

      width = window.innerWidth;
      height = window.innerHeight;

      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      crystals.length = 0;

      const count = Math.min(
        180,
        Math.floor((width * height) / 7500)
      );

      for (let i = 0; i < count; i++) {
        const x = Math.random() * width;
        const y = Math.random() * height;

        crystals.push({
          x,
          y,
          homeX: x,
          homeY: y,
          vx: 0,
          vy: 0,
          size: Math.random() * 2.4 + 1,
          alpha: Math.random() * 0.45 + 0.12,
          rotation: Math.random() * Math.PI,
        });
      }
    }

    function onPointerMove(event) {
      pointer.x = event.clientX;
      pointer.y = event.clientY;
    }

    function onPointerLeave() {
      pointer.x = -1000;
      pointer.y = -1000;
    }

    function drawCrystal(crystal) {
      const { x, y, size, alpha, rotation } = crystal;
      const glow = Math.max(0, 1 - Math.hypot(pointer.x - x, pointer.y - y) / 150);

      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(rotation);

      ctx.beginPath();
      ctx.moveTo(0, -size * 2);
      ctx.lineTo(size, 0);
      ctx.lineTo(0, size * 2);
      ctx.lineTo(-size, 0);
      ctx.closePath();

      ctx.fillStyle = `rgba(103, 232, 249, ${alpha + glow * 0.45})`;
      ctx.shadowColor = "rgba(103, 232, 249, 0.8)";
      ctx.shadowBlur = glow * 14;
      ctx.fill();

      ctx.restore();
    }

    function animate() {
      ctx.clearRect(0, 0, width, height);

      for (const crystal of crystals) {
        if (!reducedMotion) {
          const dx = pointer.x - crystal.x;
          const dy = pointer.y - crystal.y;
          const distance = Math.hypot(dx, dy);

          if (distance < 160 && distance > 0) {
            const force = (1 - distance / 160) * 0.018;
            crystal.vx += dx * force;
            crystal.vy += dy * force;
          }

          // Spring back to original position
          crystal.vx += (crystal.homeX - crystal.x) * 0.008;
          crystal.vy += (crystal.homeY - crystal.y) * 0.008;

          crystal.vx *= 0.91;
          crystal.vy *= 0.91;

          crystal.x += crystal.vx;
          crystal.y += crystal.vy;
        }

        drawCrystal(crystal);
      }

      if (!reducedMotion) {
        frameId = requestAnimationFrame(animate);
      }
    }

    resize();
    animate();

    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("blur", onPointerLeave);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("blur", onPointerLeave);
    };
  }, []);

  return <canvas ref={canvasRef} className="crystal-field" aria-hidden="true" />;
}
