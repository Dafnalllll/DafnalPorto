import { useState, useRef, useCallback, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import ThemeSwitcher from "../components/themeswitcher";
import LanguageSwitcher from "../components/languageswitcher";
import { translations } from "../data/translations";

const PARTICLE_COUNT = 40;

export default function Dafnal() {
  const [clicked, setClicked] = useState(false);
  const navigate = useNavigate();
  const containerRef = useRef(null);

  const [lang, setLang] = useState(() => localStorage.getItem("dafa_portfolio_lang") || "id");

  useEffect(() => {
    function handleLangChange() {
      setLang(localStorage.getItem("dafa_portfolio_lang") || "id");
    }
    window.addEventListener("languagechange", handleLangChange);
    return () => window.removeEventListener("languagechange", handleLangChange);
  }, []);

  const t = translations[lang] || translations.id;

  const handleStart = () => {
    setClicked(true);
    setTimeout(() => {
      navigate("/home");
    }, 500);
  };

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
      className="relative flex items-center justify-center min-h-screen overflow-hidden transition-colors duration-500"
      style={{
        backgroundColor: "var(--bg-main)",
        color: "var(--text-main)",
      }}
    >
      <div className="absolute top-6 right-6 z-20 flex items-center gap-3">
        <LanguageSwitcher />
        <ThemeSwitcher />
      </div>

      {/* Grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(var(--primary-border) 1px, transparent 1px),
            linear-gradient(90deg, var(--primary-border) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
          opacity: 0.3,
        }}
      />

      {/* Particles */}
      {particles.map((p, i) => (
        <div
          key={i}
          className="absolute pointer-events-none rounded-full"
          style={{
            width: homes[i].size,
            height: homes[i].size,
            left: p.x + "%",
            top: p.y + "%",
            opacity: 0.3,
            backgroundColor: "var(--primary)",
            transform: "translate(-50%, -50%)",
          }}
        />
      ))}

      {/* Content */}
      <AnimatePresence mode="wait">
        {!clicked && (
          <motion.button
            key="logo"
            onClick={handleStart}
            aria-label={t.dafnal.aria}
            className="relative z-10 flex flex-col items-center gap-3 cursor-pointer border-0 bg-transparent outline-none focus-visible:ring-2 focus-visible:ring-offset-4 focus-visible:ring-gray-500"
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
            <span
              className="text-xs md:text-sm font-mono tracking-[0.2em] uppercase animate-pulse"
              style={{ color: "var(--primary)" }}
            >
              {t.dafnal.start}
            </span>
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
