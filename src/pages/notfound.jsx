import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { animate, createTimeline, stagger } from "animejs";
import { Terminal, AlertTriangle, Home, Palette } from "lucide-react";
import { themes } from "../components/themes";

export default function NotFound() {
  const containerRef = useRef(null);
  const glitchTextRef = useRef(null);
  const terminalBoxRef = useRef(null);
  const btnRef = useRef(null);
  const dropdownRef = useRef(null);

  const [themeOpen, setThemeOpen] = useState(false);
  const [currentTheme, setCurrentTheme] = useState(() => {
    return localStorage.getItem("dafa_portfolio_theme") || "cyan";
  });

  // Apply Theme
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", currentTheme);
    localStorage.setItem("dafa_portfolio_theme", currentTheme);
  }, [currentTheme]);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setThemeOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const tl = createTimeline({
      defaults: {
        ease: "outExpo",
      },
    });

    tl.add(terminalBoxRef.current, {
      scale: [0.9, 1],
      opacity: [0, 1],
      duration: 800,
    })
      .add(
        ".cyber-line",
        {
          width: ["0%", "100%"],
          opacity: [0, 1],
          duration: 600,
          delay: stagger(100),
        },
        "-=400"
      )
      .add(
        ".glitch-char",
        {
          opacity: [0, 1],
          translateY: [20, 0],
          duration: 400,
          delay: stagger(50),
        },
        "-=200"
      );

    animate(glitchTextRef.current, {
      textShadow: [
        "0 0 10px var(--primary-glow), 0 0 20px var(--primary-bg)",
        "2px -2px 0px var(--primary-glow), -2px 2px 0px var(--primary-glow)",
        "0 0 15px var(--primary-glow), 0 0 30px var(--primary-bg)",
        "0 0 10px var(--primary-glow), 0 0 20px var(--primary-bg)",
      ],
      loop: true,
      duration: 3000,
      ease: "inOutSine",
    });
  }, []);

  const handleButtonHover = (isEnter) => {
    animate(btnRef.current, {
      scale: isEnter ? 1.05 : 1,
      boxShadow: isEnter
        ? "0 0 25px var(--primary-glow), inset 0 0 15px var(--primary-bg)"
        : "0 0 10px var(--primary-bg), inset 0 0 5px rgba(0,0,0,0.1)",
      duration: 300,
      ease: "outQuad",
    });
  };

  return (
    <div
      ref={containerRef}
      className="min-h-screen font-mono flex items-center justify-center p-4 relative overflow-hidden select-none"
      style={{ color: "var(--primary)" }}
    >
      {/* Floating Theme Switcher on Top Right */}
      <div className="absolute top-6 right-6 z-50" ref={dropdownRef}>
        <button
          onClick={() => setThemeOpen(!themeOpen)}
          className="p-2.5 rounded-lg border transition-all duration-300 flex items-center gap-2 hover:scale-105"
          style={{
            backgroundColor: "var(--surface-main)",
            borderColor: "var(--primary-border)",
            boxShadow: "0 0 10px var(--primary-bg)",
            color: "var(--primary)",
          }}
          aria-label="Switch theme"
          title="Change Theme Color"
        >
          <Palette className="w-4 h-4" />
          <span className="hidden sm:inline text-[10px] tracking-wider uppercase">
            {currentTheme}
          </span>
        </button>

        {themeOpen && (
          <div
            className="absolute right-0 mt-2 w-48 rounded-xl border backdrop-blur-2xl p-2 shadow-2xl z-50 space-y-1 font-mono"
            style={{
              backgroundColor: "var(--surface-main)",
              borderColor: "var(--primary-border)",
              boxShadow: "0 0 25px var(--primary-bg)",
            }}
          >
            <div className="px-3 py-1.5 text-[10px] font-semibold tracking-wider border-b" style={{ color: "var(--text-muted)", borderColor: "var(--border-neutral)" }}>
              SELECT_THEME
            </div>
            {themes.map((t) => (
              <button
                key={t.id}
                onClick={() => {
                  setCurrentTheme(t.id);
                  setThemeOpen(false);
                }}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs tracking-wider transition-all duration-200 ${
                  currentTheme === t.id
                  ? "font-bold"
                  : ""
                }`}
                style={{
                  backgroundColor:
                    currentTheme === t.id
                      ? "var(--surface-raised)"
                      : "transparent",
                  color:
                    currentTheme === t.id
                      ? "var(--text-main)"
                      : "var(--text-muted)",
                }}
              >
                <span className="flex items-center gap-2">
                  <span
                    className="w-3 h-3 rounded-full border shadow-sm"
                    style={{
                      backgroundColor: t.color,
                      borderColor: "var(--border-neutral)",
                    }}
                  ></span>
                  {t.label}
                </span>
                {currentTheme === t.id && (
                  <span
                    className="w-1.5 h-1.5 rounded-full"
                    style={{ backgroundColor: t.color }}
                  ></span>
                )}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Main Terminal Window */}
      <div
        ref={terminalBoxRef}
        className="w-full max-w-2xl rounded-lg backdrop-blur-md overflow-hidden opacity-0 relative z-10 border"
        style={{
          backgroundColor: "var(--surface-main)",
          borderColor: "var(--primary-border)",
          boxShadow: "0 0 30px var(--primary-bg)",
        }}
      >
        {/* Terminal Header */}
        <div
          className="px-4 py-3 flex items-center justify-between border-b"
          style={{
            backgroundColor: "var(--surface-raised)",
            borderColor: "var(--primary-border)",
          }}
        >
          <div className="flex items-center space-x-2">
            <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block animate-pulse"></span>
            <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block"></span>
            <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block"></span>
            <span className="text-xs font-semibold tracking-wider ml-2 flex items-center gap-1.5" style={{ color: "var(--text-muted)" }}>
              <Terminal className="w-3.5 h-3.5" style={{ color: "var(--primary)" }} />
              SYSTEM_ERROR // 404.LOG
            </span>
          </div>
          <div className="text-xs font-mono" style={{ color: "var(--primary)" }}>
            SEC_LVL: 0x404
          </div>
        </div>

        {/* Terminal Body */}
        <div className="p-6 md:p-10 flex flex-col items-center text-center">
          {/* Warning Icon with Glow */}
          <div
            className="mb-6 p-4 rounded-full border shadow-lg animate-pulse"
            style={{
              backgroundColor: "var(--primary-bg)",
              borderColor: "var(--primary-border)",
              color: "var(--primary)",
              boxShadow: "0 0 20px var(--primary-bg)",
            }}
          >
            <AlertTriangle className="w-10 h-10" />
          </div>

          <h1
            ref={glitchTextRef}
            className="text-4xl md:text-6xl font-extrabold tracking-widest mb-2"
            style={{ color: "var(--primary)" }}
          >
            404
          </h1>
          <div className="text-xs tracking-[0.3em] uppercase mb-6" style={{ color: "var(--text-muted)" }}>
            // ERROR: SECTOR NOT FOUND //
          </div>

          <div className="cyber-line w-0 h-[2px] bg-gradient-to-r from-transparent via-[var(--primary)] to-transparent my-4"></div>

          <div className="space-y-2 mb-8 max-w-md mx-auto text-sm md:text-base" style={{ color: "var(--text-main)" }}>
            <p>The requested cyber coordinate does not exist in this neural network.</p>
            <p className="text-xs font-mono" style={{ color: "var(--text-subtle)" }}>
              ERR_CODE: 0x404_PAGE_MISSING // REDIRECT RECOMMENDED
            </p>
          </div>

          <div className="glitch-char opacity-0 flex flex-col sm:flex-row gap-4 items-center justify-center w-full">
            <Link
              to="/home"
              ref={btnRef}
              onMouseEnter={() => handleButtonHover(true)}
              onMouseLeave={() => handleButtonHover(false)}
              className="px-6 py-3 rounded-lg text-xs font-bold tracking-widest uppercase flex items-center gap-2 border transition-all duration-300"
              style={{
                backgroundColor: "var(--primary-bg)",
                borderColor: "var(--primary-border)",
                color: "var(--primary)",
                boxShadow: "0 0 15px var(--primary-bg)",
              }}
            >
              <Home className="w-4 h-4" />
              Return to Matrix
            </Link>
          </div>
        </div>

        {/* Terminal Footer Status Bar */}
        <div
          className="border-t px-4 py-2 text-xs flex justify-between items-center"
          style={{
            backgroundColor: "var(--surface-footer)",
            color: "var(--text-subtle)",
            borderColor: "var(--primary-border)",
          }}
        >
          <span>STATUS: DISCONNECTED</span>
          <span style={{ color: "var(--primary)" }}>THEME: ACTIVE</span>
        </div>
      </div>
    </div>
  );
}
