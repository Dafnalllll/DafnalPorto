import { useState, useRef, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";

const PARTICLE_COUNT = 40;

export default function Dafnal() {
  const [clicked, setClicked] = useState(false);
  const containerRef = useRef(null);

  // scattered home positions
  const homes = useMemo(
    () =>
      Array.from({ length: PARTICLE_COUNT }, () => ({
        hx: Math.random() * 100,
        hy: Math.random() * 100,
        ox: (Math.random() - 0.5) * 180,
        oy: (Math.random() - 0.5) * 180,
        size: Math.random() * 5 + 2,
        // Each particle has a unique lag factor for smooth trailing
        lag: 0.92 + Math.random() * 0.06,
      })),
    [],
  );

  const particlesRef = useRef(
    homes.map((h) => ({ x: h.hx, y: h.hy, vx: 0, vy: 0 })),
  );
  const [particles, setParticles] = useState(particlesRef.current);

  const mouseRef = useRef({ x: -999, y: -999 });
  const prevMouseRef = useRef({ x: -999, y: -999 });
  const rafRef = useRef(null);
  const movingRef = useRef(false);
  const idleTimerRef = useRef(0);

  const simulate = useCallback(() => {
    const p = particlesRef.current;
    const mouse = mouseRef.current;
    const prev = prevMouseRef.current;

    // Detect movement
    const dx = mouse.x - prev.x;
    const dy = mouse.y - prev.y;
    const speed = Math.sqrt(dx * dx + dy * dy);

    if (speed > 0.1) {
      movingRef.current = true;
      idleTimerRef.current = 0;
    } else {
      idleTimerRef.current += 1;
      if (idleTimerRef.current > 25) movingRef.current = false;
    }

    prevMouseRef.current = { ...mouse };

    const next = [];

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const part = p[i];
      const home = homes[i];
      const l = home.lag;

      let targetX, targetY;

      if (movingRef.current) {
        targetX = mouse.x + home.ox * 0.13;
        targetY = mouse.y + home.oy * 0.13;
      } else {
        targetX = home.hx;
        targetY = home.hy;
      }

      // Smooth spring — high force, gentle damping
      const forceX = (targetX - part.x) * 0.12;
      const forceY = (targetY - part.y) * 0.12;

      // Apply with per-particle lag for smooth trailing
      part.vx = part.vx * l + forceX * (1 - l);
      part.vy = part.vy * l + forceY * (1 - l);

      const nvx = part.x + part.vx;
      const nvy = part.y + part.vy;

      next.push({ x: nvx, y: nvy, vx: part.vx, vy: part.vy });
    }

    particlesRef.current = next;
    setParticles(next);
    rafRef.current = requestAnimationFrame(simulate);
  }, [homes]);

  function handleMouseMove(e) {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    mouseRef.current = {
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    };

    if (!rafRef.current) {
      prevMouseRef.current = { ...mouseRef.current };
      rafRef.current = requestAnimationFrame(simulate);
    }
  }

  function handleMouseLeave() {
    mouseRef.current = { x: -999, y: -999 };
    movingRef.current = false;
    idleTimerRef.current = 100;
  }

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative flex items-center justify-center min-h-screen bg-white overflow-hidden"
    >
      {/* Grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0,0,0,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,0,0,0.04) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Particles */}
      {particles.map((p, i) => (
        <div
          key={i}
          className="absolute pointer-events-none rounded-full bg-neutral-900"
          style={{
            width: homes[i].size,
            height: homes[i].size,
            left: p.x + "%",
            top: p.y + "%",
            opacity: 0.25,
            transform: "translate(-50%, -50%)",
          }}
        />
      ))}

      {/* Content */}
      <AnimatePresence mode="wait">
        {!clicked ? (
          <motion.button
            key="logo"
            onClick={() => setClicked(true)}
            className="relative z-10 cursor-pointer "
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <motion.img
              src="/dafnal.webp"
              alt="Dafnal Logo"
              className="w-48 h-48 md:w-64 md:h-64 object-contain"
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
            />
          </motion.button>
        ) : (
          <motion.div
            key="coming-soon"
            className="relative z-10 text-center"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <motion.img
              src="/dafnal.webp"
              alt="Dafnal Logo"
              className="w-32 h-32 md:w-40 md:h-40 mx-auto mb-6 object-contain"
              initial={{ scale: 0.5 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            />
            <motion.h1
              className="text-4xl md:text-6xl font-black tracking-tight text-gray-900"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              Coming Soon
            </motion.h1>
            <motion.p
              className="mt-3 text-lg md:text-xl text-gray-500 font-medium"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              Something exciting is on the way
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
