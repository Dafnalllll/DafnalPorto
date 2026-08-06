import { useState, useEffect, useRef } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const links = [
  { to: "/home", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/projects", label: "Projects" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const navRef = useRef(null);
  const mouse = useRef({ x: 0, y: 0 });
  const [rotate, setRotate] = useState({ x: 0, y: 0 });

  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > 20);
    }
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    let raf;
    function loop() {
      setRotate((p) => ({
        x: p.x + (mouse.current.y - p.x) * 0.04,
        y: p.y + (mouse.current.x - p.y) * 0.04,
      }));
      raf = requestAnimationFrame(loop);
    }
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, []);

  if (location.pathname === "/") return null;

  function handleMouseMove(e) {
    if (!navRef.current) return;
    const rect = navRef.current.getBoundingClientRect();
    mouse.current = {
      x: ((e.clientX - rect.left) / rect.width - 0.5) * 6,
      y: ((e.clientY - rect.top) / rect.height - 0.5) * -6,
    };
  }

  function handleMouseLeave() {
    mouse.current = { x: 0, y: 0 };
  }

  return (
    <>
      <nav
        ref={navRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-2rem)] max-w-5xl transition-all duration-700 rounded-2xl ${
          scrolled
            ? "bg-white/80 backdrop-blur-2xl"
            : "bg-white/40 backdrop-blur-lg"
        }`}
        style={{
          perspective: "1200px",
          border: scrolled
            ? "1px solid rgba(0,0,0,0.12)"
            : "1px solid rgba(0,0,0,0.08)",
          boxShadow: scrolled ? "0 8px 32px rgba(0,0,0,0.06)" : "none",
        }}
      >
        {/* 3D ambient shadow */}
        <div
          className="absolute inset-0 pointer-events-none transition-opacity duration-700"
          style={{
            opacity: scrolled ? 1 : 0,
            background:
              "linear-gradient(180deg, rgba(0,0,0,0.02) 0%, transparent 100%)",
          }}
        />

        <div
          className="max-w-6xl mx-auto px-8 h-20 flex items-center justify-between"
          style={{
            transformStyle: "preserve-3d",
            transform: `rotateX(${rotate.x}deg) rotateY(${rotate.y}deg)`,
            transition: "transform 0.05s linear",
          }}
        >
          {/* Logo — 3D sphere with glass reflection */}
          <Link
            to="/home"
            className="group flex items-center gap-3"
            style={{ transformStyle: "preserve-3d" }}
          >
            <div className="relative" style={{ transformStyle: "preserve-3d" }}>
              {/* Glass outer ring */}
              <div
                className="absolute -inset-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(255,255,255,0.3), rgba(255,255,255,0.05))",
                  backdropFilter: "blur(4px)",
                  transform: "translateZ(4px)",
                }}
              />
              {/* Main sphere */}
              <div
                className="relative w-10 h-10 flex items-center justify-center text-white text-sm font-light"
                style={{
                  transformStyle: "preserve-3d",
                  transform: `translateZ(20px)`,
                }}
              >
                <div
                  className="absolute inset-0 rounded-full"
                  style={{
                    background:
                      "radial-gradient(circle at 30% 25%, #c4b8a8 0%, #7a7064 30%, #2d2a24 70%, #1a1815 100%)",
                    boxShadow: [
                      "0 8px 20px rgba(0,0,0,0.15)",
                      "0 20px 50px rgba(0,0,0,0.08)",
                      "inset 0 -4px 8px rgba(0,0,0,0.3)",
                      "inset 0 4px 8px rgba(255,255,255,0.15)",
                    ].join(", "),
                    transform: `rotateX(${rotate.x * 0.8}deg) rotateY(${rotate.y * 0.8}deg)`,
                  }}
                />
                <div
                  className="absolute inset-0 rounded-full"
                  style={{
                    background:
                      "radial-gradient(circle at 25% 20%, rgba(255,255,255,0.4) 0%, transparent 45%)",
                  }}
                />
                <div
                  className="absolute w-1.5 h-1.5 rounded-full"
                  style={{
                    top: "7px",
                    right: "9px",
                    background: "rgba(255,255,255,0.5)",
                    filter: "blur(1.5px)",
                    transform: "translateZ(6px)",
                  }}
                />
                <span
                  className="relative text-white/95 text-sm tracking-wider"
                  style={{
                    transform: "translateZ(10px)",
                    fontFamily: "'Times New Roman', serif",
                    fontWeight: 300,
                    textShadow: "0 1px 3px rgba(0,0,0,0.3)",
                  }}
                >
                  D
                </span>
                {/* Shadow drop */}
                <div
                  className="absolute -bottom-[10px] left-1/2 -translate-x-1/2 transition-all duration-500"
                  style={{
                    width: "32px",
                    height: "8px",
                    background:
                      "radial-gradient(ellipse, rgba(0,0,0,0.3) 0%, transparent 70%)",
                    filter: "blur(6px)",
                    transform: `translateZ(-8px) scale(${1 + Math.abs(rotate.y) * 0.05})`,
                  }}
                />
              </div>
            </div>
            <span
              className="text-xl tracking-wider text-stone-800 transition-all duration-300 group-hover:tracking-widest"
              style={{
                fontFamily: "'Times New Roman', serif",
                transform: `translateZ(12px)`,
                textShadow: "0 2px 12px rgba(0,0,0,0.04)",
              }}
            >
              <span className="font-serif italic">Dafnal</span>
            </span>
          </Link>

          {/* Desktop links — staggered Z-depth */}
          <ul
            className="hidden md:flex items-center"
            style={{ transformStyle: "preserve-3d" }}
          >
            {links.map((link, i) => (
              <li
                key={link.to}
                className="relative"
                style={{
                  transform: `translateZ(${6 + i * 4}px)`,
                  transformStyle: "preserve-3d",
                }}
              >
                <NavLink
                  to={link.to}
                  className={({ isActive }) =>
                    `relative block px-5 py-2 text-sm tracking-[0.15em] uppercase transition-all duration-300 ${
                      isActive
                        ? "text-stone-800"
                        : "text-stone-400 hover:text-stone-800"
                    }`
                  }
                  style={{ transformStyle: "preserve-3d" }}
                >
                  {({ isActive }) => (
                    <span
                      className="relative block"
                      style={{ transformStyle: "preserve-3d" }}
                    >
                      <span className="relative z-10 block py-0.5 transition-transform duration-200 hover:scale-105">
                        {link.label}
                      </span>
                      {/* 3D underline */}
                      <span
                        className={`absolute left-0 right-0 h-[2px] bottom-0 transition-all duration-300 ${
                          isActive
                            ? "scale-x-100 opacity-100"
                            : "scale-x-0 opacity-0"
                        }`}
                        style={{
                          transformOrigin: "left",
                          transform: "translateZ(4px)",
                          background:
                            "linear-gradient(90deg, #2d2a24 0%, #8a8276 50%, transparent 100%)",
                          boxShadow: "0 1px 8px rgba(0,0,0,0.1)",
                        }}
                      />
                    </span>
                  )}
                </NavLink>
                {/* Separator line */}
                {i < links.length - 1 && (
                  <span
                    className="absolute right-0 top-1/2 -translate-y-1/2 w-px h-5"
                    style={{
                      background:
                        "linear-gradient(180deg, transparent, rgba(0,0,0,0.06), transparent)",
                      transform: "translateZ(2px)",
                    }}
                  />
                )}
              </li>
            ))}
          </ul>

          {/* Hamburger */}
          <button
            onClick={() => setMenuOpen((o) => !o)}
            className="md:hidden relative flex flex-col gap-1 p-2 group"
            aria-label="Toggle menu"
            style={{ transform: `translateZ(8px)` }}
          >
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                className={`block w-6 h-[1.5px] bg-stone-600 transition-all duration-300 ${
                  i === 0 && menuOpen ? "rotate-45 translate-y-[3.5px]" : ""
                } ${i === 1 && menuOpen ? "opacity-0 scale-x-0" : ""} ${
                  i === 2 && menuOpen ? "-rotate-45 -translate-y-[3.5px]" : ""
                }`}
                style={{ transformOrigin: "center" }}
              />
            ))}
          </button>
        </div>

        {/* Glass reflection line */}
        <div
          className="absolute top-0 left-0 right-0 h-px pointer-events-none"
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)",
          }}
        />
      </nav>

      {/* Mobile overlay */}
      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm md:hidden"
              onClick={() => setMenuOpen(false)}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 220 }}
              className="fixed top-0 right-0 bottom-0 z-50 bg-white md:hidden"
              style={{
                width: "320px",
                boxShadow:
                  "-16px 0 50px rgba(0,0,0,0.08), -2px 0 0 rgba(0,0,0,0.03)",
                perspective: "1000px",
              }}
            >
              <div className="flex items-center justify-end px-8 h-20">
                <button
                  onClick={() => setMenuOpen(false)}
                  className="text-stone-400 hover:text-stone-800 transition-colors text-xl"
                  aria-label="Close menu"
                >
                  &times;
                </button>
              </div>
              <ul className="flex flex-col px-6 gap-1">
                {links.map((link, i) => (
                  <motion.li
                    key={link.to}
                    initial={{ opacity: 0, x: 40, rotateY: -15 }}
                    animate={{ opacity: 1, x: 0, rotateY: 0 }}
                    transition={{ delay: 0.06 + i * 0.05, duration: 0.35 }}
                    style={{ transformStyle: "preserve-3d" }}
                  >
                    <NavLink
                      to={link.to}
                      className={({ isActive }) =>
                        `block py-3.5 px-5 text-sm tracking-[0.15em] uppercase transition-all duration-300 ${
                          isActive
                            ? "text-stone-800 bg-stone-50"
                            : "text-stone-400 hover:text-stone-800 hover:bg-stone-50"
                        }`
                      }
                      style={{
                        transform: `translateZ(${4 + i * 3}px)`,
                      }}
                    >
                      {link.label}
                    </NavLink>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
