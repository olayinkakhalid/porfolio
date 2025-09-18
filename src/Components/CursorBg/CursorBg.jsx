import React, { useRef, useEffect } from 'react';

// Full-screen background component that reacts to the cursor.
// Drop this file into your React app (e.g. src/CursorBg.jsx) and render <CursorBg /> at the top level.
// Uses an HTML canvas to draw a soft radial spotlight that follows the cursor
// plus subtle floating particles for depth (inspired by brittanychiang.com effect).

export default function CursorBg({
  particleCount = 50,
  particleSize = 2.2,
  spotlightRadius = 300,
  spotlightStrength = 0.9,
  baseColor = [46, 43, 84], // rgb base color used for particles/gradient
}) {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: -9999, y: -9999, vx: 0, vy: 0 });
  const particlesRef = useRef([]);
  const rafRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    function resize() {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = Math.max(1, window.innerWidth) * dpr;
      canvas.height = Math.max(1, window.innerHeight) * dpr;
      canvas.style.width = window.innerWidth + 'px';
      canvas.style.height = window.innerHeight + 'px';
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    resize();
    window.addEventListener('resize', resize);

    // init particles
    const particles = [];
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        vx: (Math.random() - 0.5) * 0.2,
        vy: (Math.random() - 0.5) * 0.2,
        size: particleSize + Math.random() * particleSize,
        hueOffset: Math.random() * 40 - 20,
      });
    }
    particlesRef.current = particles;

    // Mouse/touch handlers
    function onMove(e) {
      const x = e.clientX ?? (e.touches && e.touches[0].clientX);
      const y = e.clientY ?? (e.touches && e.touches[0].clientY);
      const prev = mouseRef.current;
      prev.vx = x - prev.x;
      prev.vy = y - prev.y;
      prev.x = x;
      prev.y = y;
    }

    function onLeave() {
      mouseRef.current.x = -9999;
      mouseRef.current.y = -9999;
    }

    window.addEventListener('mousemove', onMove);
    window.addEventListener('touchmove', onMove, { passive: true });
    window.addEventListener('mouseout', onLeave);
    window.addEventListener('touchend', onLeave);

    // animation loop
    let last = performance.now();
    function step(now) {
      const dt = Math.min(50, now - last) / 16.6667; // roughly frames relative to 60fps
      last = now;

      // fade background to a deep gradient
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // background gradient
      const g = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      g.addColorStop(0, `rgba(${baseColor.join(',')},0.06)`);
      g.addColorStop(0.5, `rgba(${baseColor[0] + 20},${baseColor[1] + 20},${baseColor[2] + 30},0.08)`);
      g.addColorStop(1, `rgba(10,10,20,0.12)`);
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // spotlight that follows the cursor (soft radial)
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;
      if (mx > -1000) {
        const radial = ctx.createRadialGradient(mx, my, 0, mx, my, spotlightRadius);
        radial.addColorStop(0, `rgba(255,255,255,${spotlightStrength})`);
        radial.addColorStop(0.3, `rgba(200,200,255,0.06)`);
        radial.addColorStop(1, `rgba(0,0,0,0)`);
        ctx.globalCompositeOperation = 'lighter';
        ctx.fillStyle = radial;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.globalCompositeOperation = 'source-over';
      }

      // update & draw particles
      for (let p of particlesRef.current) {
        // subtle attraction/repulsion from cursor
        if (mx > -1000) {
          const dx = mx - p.x;
          const dy = my - p.y;
          const dist2 = dx * dx + dy * dy + 1;
          const force = Math.min(1200 / dist2, 0.4);
          // particles are attracted to the cursor a tiny bit
          p.vx += (dx / Math.sqrt(dist2)) * force * 0.02 * dt;
          p.vy += (dy / Math.sqrt(dist2)) * force * 0.02 * dt;
        }

        // tiny noise
        p.vx += (Math.random() - 0.5) * 0.02 * dt;
        p.vy += (Math.random() - 0.5) * 0.02 * dt;

        p.x += p.vx * dt;
        p.y += p.vy * dt;

        // wrap
        if (p.x < -50) p.x = window.innerWidth + 50;
        if (p.x > window.innerWidth + 50) p.x = -50;
        if (p.y < -50) p.y = window.innerHeight + 50;
        if (p.y > window.innerHeight + 50) p.y = -50;

        // draw particle
        const alpha = 0.5 + Math.abs((Math.sin((p.x + p.y) * 0.002 + now * 0.001))) * 0.5;
        ctx.beginPath();
        const r = p.size;
        const fill = `rgba(${baseColor[0] + p.hueOffset}, ${baseColor[1] + p.hueOffset}, ${baseColor[2] + p.hueOffset}, ${alpha})`;
        ctx.fillStyle = fill;
        ctx.arc(p.x, p.y, r, 0, Math.PI * 2);
        ctx.fill();
      }

      rafRef.current = requestAnimationFrame(step);
    }

    rafRef.current = requestAnimationFrame(step);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('touchmove', onMove);
      window.removeEventListener('mouseout', onLeave);
      window.removeEventListener('touchend', onLeave);
    };
  }, [particleCount, particleSize, spotlightRadius, spotlightStrength, baseColor]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: -1,
        pointerEvents: 'none',
      }}
    />
  );
}
