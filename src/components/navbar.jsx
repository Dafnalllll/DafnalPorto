import { useState, useEffect, useRef } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { animate, createTimeline, stagger } from "animejs";
import { AnimatePresence, motion } from "framer-motion";
import { Cpu, Menu, X, Code2, User, Home } from "lucide-react";
import ThemeSwitcher from "./themeswitcher";
import MobileMenu from "./mobilemenu";

const links = [
  { to: "/home", label: "Home", icon: Home },
  { to: "/about", label: "About", icon: User },
  { to: "/projects", label: "Projects", icon: Code2 },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const navRef = useRef(null);

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

  // Anime.js Entrance Animation
  useEffect(() => {
    if (!navRef.current) return;

    try {
      const tl = createTimeline({
        defaults: {
          ease: "outExpo",
        },
      });

      tl.add(navRef.current, {
        translateY: [-20, 0],
        opacity: [0, 1],
        duration: 800,
      }).add(
        ".nav-item",
        {
          opacity: [0, 1],
          translateY: [-10, 0],
          duration: 500,
          delay: stagger(100),
        },
        "-=400"
      );
    } catch (e) {
      console.error("Anime.js animation error:", e);
    }
  }, []);

  if (location.pathname === "/") return null;

  const handleLinkHover = (e, isEnter) => {
    animate(e.currentTarget, {
      scale: isEnter ? 1.05 : 1,
      color: isEnter ? "var(--primary)" : "var(--text-muted)",
      duration: 300,
      ease: "outQuad",
    });
  };

  return (
    <>
    <nav
      ref={navRef}
      className="fixed top-4 inset-x-4 z-50 mx-auto max-w-5xl transition-all duration-500 rounded-xl border font-mono backdrop-blur-xl"
      style={{
        backgroundColor: "var(--surface-main)",
        borderColor: "var(--primary-border)",
        boxShadow: scrolled
          ? "0 0 25px var(--primary-bg)"
          : "0 0 15px rgba(0,0,0,0.2)",
      }}
    >
      {/* Scanline effect */}
      <div
        className="absolute inset-0 pointer-events-none opacity-25 rounded-xl"
        style={{
          backgroundImage:
            "linear-gradient(var(--scanline-color) 50%, transparent 50%)",
          backgroundSize: "100% 3px",
        }}
      ></div>

      <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between relative z-10">
        {/* Futuristic Logo */}
        <Link
          to="/home"
          className="group flex items-center gap-3"
          style={{ color: "var(--primary)" }}
        >
          <div
            className="relative w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-300"
            style={{
              backgroundColor: "var(--surface-raised)",
              border: "1px solid var(--primary-border)",
              boxShadow: "0 0 10px var(--primary-bg)",
            }}
          >
            <Cpu className="w-5 h-5 animate-pulse" style={{ color: "var(--primary)" }} />
            <div
              className="absolute -top-1 -right-1 w-2 h-2 rounded-full animate-ping"
              style={{ backgroundColor: "var(--primary)" }}
            ></div>
          </div>
          <div className="flex flex-col">
            <span
              className="text-sm font-bold tracking-widest transition-colors"
              style={{ color: "var(--primary)" }}
            >
              DAF.SYS
            </span>
            <span className="text-[10px] tracking-wider" style={{ color: "var(--text-muted)" }}>
              ONLINE // 0x01
            </span>
          </div>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center space-x-2">
          {links.map((link) => {
            const Icon = link.icon;
            const isActive = location.pathname === link.to;
            return (
              <NavLink
                key={link.to}
                to={link.to}
                onMouseEnter={(e) => handleLinkHover(e, true)}
                onMouseLeave={(e) => handleLinkHover(e, false)}
                className="nav-item relative px-4 py-2 rounded-lg text-xs tracking-widest uppercase transition-all duration-300 flex items-center gap-2 border border-transparent"
                style={
                  isActive
                    ? { color: "var(--primary)" }
                    : { color: "var(--text-muted)" }
                }
              >
                {isActive && (
                  <motion.span
                    layoutId="activeIndicator"
                    className="absolute inset-0 z-0 rounded-lg border"
                    style={{
                      backgroundColor: "var(--primary-bg)",
                      borderColor: "var(--primary-border)",
                      boxShadow: "0 0 15px var(--primary-bg)",
                      pointerEvents: "none",
                    }}
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  ></motion.span>
                )}
                <Icon
                  className="relative z-10 w-3.5 h-3.5"
                  style={isActive ? { color: "var(--primary)" } : {}}
                />
                <span className="relative z-10">{link.label}</span>
              </NavLink>
            );
          })}
        </div>

        {/* Theme Switcher & Mobile Toggle */}
        <div className="flex items-center gap-3">
          <ThemeSwitcher />

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden p-2.5 rounded-lg border transition-colors"
            style={{
              backgroundColor: "var(--surface-raised)",
              borderColor: "var(--primary-border)",
              color: "var(--primary)",
              boxShadow: "0 0 10px var(--primary-bg)",
            }}
            aria-label="Toggle menu"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={menuOpen ? "close" : "open"}
                initial={{ opacity: 0, rotate: -45, scale: 0.8 }}
                animate={{ opacity: 1, rotate: 0, scale: 1 }}
                exit={{ opacity: 0, rotate: 45, scale: 0.8 }}
                transition={{ duration: 0.16 }}
                className="flex"
              >
                {menuOpen ? (
                  <X className="w-5 h-5" />
                ) : (
                  <Menu className="w-5 h-5" />
                )}
              </motion.span>
            </AnimatePresence>
          </button>
        </div>
      </div>

    </nav>
    <MobileMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
