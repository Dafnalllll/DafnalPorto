import { useState, useEffect, useRef } from "react";
import { Palette } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { themes } from "./themes";
import { translations } from "../data/translations";

export default function ThemeSwitcher() {
  const [themeOpen, setThemeOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState(
    () => localStorage.getItem("dafa_portfolio_lang") || "id"
  );
  const [currentTheme, setCurrentTheme] = useState(() => {
    return localStorage.getItem("dafa_portfolio_theme") || "cyan";
  });
  const dropdownRef = useRef(null);
  const themeLabels = translations[currentLang]?.theme || translations.id.theme;

  useEffect(() => {
    function handleLanguageChange() {
      setCurrentLang(localStorage.getItem("dafa_portfolio_lang") || "id");
    }

    window.addEventListener("languagechange", handleLanguageChange);
    return () => window.removeEventListener("languagechange", handleLanguageChange);
  }, []);

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

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setThemeOpen(!themeOpen)}
        className="p-2.5 rounded-lg border transition-all duration-300 flex items-center gap-2 hover:scale-105"
        style={{
          backgroundColor: "var(--surface-main)",
          borderColor: "var(--primary-border)",
          boxShadow: "0 0 10px var(--primary-bg)",
          color: "var(--primary)",
        }}
        aria-label={themeLabels.switch}
        title={themeLabels.switch}
      >
        <Palette className="w-4 h-4" />
        <span className="hidden sm:inline text-[10px] tracking-wider uppercase">
          {themeLabels[currentTheme]}
        </span>
      </button>

      <AnimatePresence initial={false}>
        {themeOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.96 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="absolute right-0 mt-2 w-48 rounded-xl border backdrop-blur-2xl p-2 shadow-2xl z-50 space-y-1 font-mono origin-top-right"
            style={{
              backgroundColor: "var(--surface-main)",
              borderColor: "var(--primary-border)",
              boxShadow: "0 0 25px var(--primary-bg)",
            }}
          >
            <div
              className="px-3 py-1.5 text-[10px] font-semibold tracking-wider border-b"
              style={{
                color: "var(--text-muted)",
                borderColor: "var(--border-neutral)",
              }}
            >
              {themeLabels.select}
            </div>
            {themes.map((t, index) => (
              <motion.button
                key={t.id}
                onClick={() => {
                  setCurrentTheme(t.id);
                  setThemeOpen(false);
                }}
                initial={{ opacity: 0, x: 8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.16, delay: index * 0.025 }}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs tracking-wider transition-colors duration-200 ${
                  currentTheme === t.id ? "font-bold" : ""
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
                  {themeLabels[t.id]}
                </span>
                {currentTheme === t.id && (
                  <span
                    className="w-1.5 h-1.5 rounded-full"
                    style={{ backgroundColor: t.color }}
                  ></span>
                )}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
