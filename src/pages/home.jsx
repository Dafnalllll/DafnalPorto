import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { User, Code2, ArrowDown } from "lucide-react";
import Projects from "./projects";
import About from "./about";
import { translations } from "../data/translations";
import SectionHeading from "../components/SectionHeading";

export default function Home() {
  const heroRef = useRef(null);
  const [lang, setLang] = useState(() => localStorage.getItem("dafa_portfolio_lang") || "id");

  useEffect(() => {
    function handleLangChange() {
      setLang(localStorage.getItem("dafa_portfolio_lang") || "id");
    }
    window.addEventListener("languagechange", handleLangChange);
    return () => window.removeEventListener("languagechange", handleLangChange);
  }, []);

  const t = translations[lang] || translations.id;

  return (
    <div className="flex flex-col w-full">
      {/* SECTION 01: HOME / HERO */}
      <section
        id="home"
        ref={heroRef}
        className="min-h-screen flex flex-col items-center justify-center relative px-6 py-20 text-center"
        style={{
          "--hero-content-offset-y": "-100px",
          "--hero-arrow-offset-y": "100px",
        }}
      >
        <div
          className="max-w-4xl mx-auto space-y-6 relative z-10"
          style={{ transform: "translateY(var(--hero-content-offset-y))" }}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <SectionHeading
              eyebrow={`SEC.01 // ${t.hero.status}`}
              title={t.hero.title}
              subheading={t.hero.subtitle}
              description={t.hero.desc}
              align="center"
              size="hero"
              as="h1"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-wrap items-center justify-center gap-4 pt-8"
          >
            <a
              href="#projects"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="px-6 py-3 rounded-xl border font-mono text-xs tracking-widest uppercase transition-all duration-300 flex items-center gap-2 group"
              style={{
                backgroundColor: "var(--primary-bg)",
                borderColor: "var(--primary-border)",
                color: "var(--primary)",
                boxShadow: "0 0 15px var(--primary-bg)"
              }}
            >
              <Code2 className="w-4 h-4 transition-transform group-hover:rotate-12" />
              <span>{t.hero.explore}</span>
            </a>

            <a
              href="#about"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="px-6 py-3 rounded-xl border font-mono text-xs tracking-widest uppercase transition-all duration-300 flex items-center gap-2"
              style={{
                backgroundColor: "var(--surface-raised)",
                borderColor: "var(--border-neutral)",
                color: "var(--text-main)"
              }}
            >
              <User className="w-4 h-4" />
              <span>{t.hero.profile}</span>
            </a>
          </motion.div>
        </div>

        <div
          className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce"
          style={{ bottom: "calc(2.5rem + var(--hero-arrow-offset-y))" }}
        >
          <ArrowDown className="w-5 h-5 opacity-50" style={{ color: "var(--primary)" }} />
        </div>
      </section>

      {/* SECTION 02: ABOUT */}
      <About t={t} />

      {/* SECTION 03: PROJECTS */}
      <section id="projects" className="min-h-screen relative py-12">
        <Projects />
      </section>
    </div>
  );
}
