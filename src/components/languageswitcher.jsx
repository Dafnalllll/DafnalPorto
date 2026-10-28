import { useState, useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";

const languages = [
  { id: "id", label: "ID // INDONESIA", flag: "id" },
  { id: "en", label: "EN // ENGLISH", flag: "gb" },
  { id: "nl", label: "NL // NEDERLANDS", flag: "nl" },
  { id: "ja", label: "JA // 日本語", flag: "jp" },
  { id: "de", label: "DE // DEUTSCH", flag: "de" },
];

function CountryFlag({ country }) {
  const flagContent = {
    id: (
      <>
        <path fill="#dc2626" d="M0 0h24v7H0z" />
        <path fill="#fff" d="M0 7h24v7H0z" />
      </>
    ),
    gb: (
      <>
        <path fill="#1d4ed8" d="M0 0h24v14H0z" />
        <path
          d="M0 0 24 14M24 0 0 14"
          stroke="#fff"
          strokeWidth="3"
        />
        <path
          d="M0 0 24 14M24 0 0 14"
          stroke="#dc2626"
          strokeWidth="1.2"
        />
        <path fill="#fff" d="M9 0h6v14H9zM0 4h24v6H0z" />
        <path fill="#dc2626" d="M10.2 0h3.6v14h-3.6zM0 5.2h24v3.6H0z" />
      </>
    ),
    nl: (
      <>
        <path fill="#dc2626" d="M0 0h24v4.67H0z" />
        <path fill="#fff" d="M0 4.67h24v4.66H0z" />
        <path fill="#1d4ed8" d="M0 9.33h24V14H0z" />
      </>
    ),
    jp: (
      <>
        <path fill="#fff" d="M0 0h24v14H0z" />
        <circle cx="12" cy="7" r="4" fill="#dc2626" />
      </>
    ),
    de: (
      <>
        <path fill="#111" d="M0 0h24v4.67H0z" />
        <path fill="#dc2626" d="M0 4.67h24v4.66H0z" />
        <path fill="#facc15" d="M0 9.33h24V14H0z" />
      </>
    ),
  }[country];

  return (
    <svg
      aria-hidden="true"
      className="h-3.5 w-5 shrink-0 overflow-hidden rounded-[2px] object-cover"
      viewBox="0 0 24 14"
      xmlns="http://www.w3.org/2000/svg"
    >
      {flagContent}
    </svg>
  );
}

export default function LanguageSwitcher() {
  const [langOpen, setLangOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState(() => {
    return localStorage.getItem("dafa_portfolio_lang") || "id";
  });
  const dropdownRef = useRef(null);

  useEffect(() => {
    localStorage.setItem("dafa_portfolio_lang", currentLang);
    document.documentElement.setAttribute("lang", currentLang);
    window.dispatchEvent(new Event("languagechange"));
  }, [currentLang]);

  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setLangOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const activeLangObj = languages.find((l) => l.id === currentLang) || languages[0];

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setLangOpen(!langOpen)}
        className="p-2.5 rounded-lg border transition-all duration-300 flex items-center gap-2 hover:scale-105"
        style={{
          backgroundColor: "var(--surface-main)",
          borderColor: "var(--primary-border)",
          boxShadow: "0 0 10px var(--primary-bg)",
          color: "var(--primary)",
        }}
        aria-label="Switch language"
        title="Change Language"
      >
        <CountryFlag country={activeLangObj.flag} />
        <span className="text-[10px] tracking-wider uppercase font-mono hidden sm:inline">
          {currentLang}
        </span>
      </button>

      <AnimatePresence initial={false}>
        {langOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.96 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="absolute right-0 mt-2 w-52 rounded-xl border backdrop-blur-2xl p-2 shadow-2xl z-50 space-y-1 font-mono origin-top-right"
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
              SELECT_LANGUAGE
            </div>
            {languages.map((l, index) => (
              <motion.button
                key={l.id}
                onClick={() => {
                  setCurrentLang(l.id);
                  setLangOpen(false);
                }}
                initial={{ opacity: 0, x: 8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.16, delay: index * 0.025 }}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs tracking-wider transition-colors duration-200 ${
                  currentLang === l.id ? "font-bold" : ""
                }`}
                style={{
                  backgroundColor:
                    currentLang === l.id
                      ? "var(--surface-raised)"
                      : "transparent",
                  color:
                    currentLang === l.id
                      ? "var(--text-main)"
                      : "var(--text-muted)",
                }}
              >
                <span className="flex items-center gap-2.5">
                  <CountryFlag country={l.flag} />
                  {l.label}
                </span>
                {currentLang === l.id && (
                  <span
                    className="w-1.5 h-1.5 rounded-full animate-pulse"
                    style={{ backgroundColor: "var(--primary)" }}
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
