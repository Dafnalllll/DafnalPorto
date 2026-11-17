import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Terminal, User, Code2, ArrowDown } from "lucide-react";
import Projects from "./projects";
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
      >
        <div className="max-w-4xl mx-auto space-y-6 relative z-10">
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
            className="flex flex-wrap items-center justify-center gap-4 pt-4"
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

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
          <ArrowDown className="w-5 h-5 opacity-50" style={{ color: "var(--primary)" }} />
        </div>
      </section>

      {/* SECTION 02: ABOUT */}
      <section
        id="about"
        className="min-h-screen flex flex-col justify-center relative px-6 py-24 max-w-6xl mx-auto w-full"
      >
        <div className="space-y-12">
          <div className="section-heading__top">
            <span className="section-heading__eyebrow">
              <span className="section-heading__marker" aria-hidden="true" />
              // SEC.02 — {t.about.section}
            </span>
            <span className="section-heading__meta">
              {t.about.status}
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-6 font-mono">
              <h2 className="section-heading__title">
                {t.about.heading}
              </h2>
              <p className="section-heading__description">
                {t.about.bio}
              </p>
              <div className="grid grid-cols-2 gap-4 pt-4">
                <div className="p-4 rounded-xl border" style={{ backgroundColor: "var(--surface-raised)", borderColor: "var(--primary-border)" }}>
                  <p className="text-xs text-[var(--text-subtle)]">{t.about.spec}</p>
                  <p className="text-sm font-bold mt-1" style={{ color: "var(--primary)" }}>{t.about.specVal}</p>
                </div>
                <div className="p-4 rounded-xl border" style={{ backgroundColor: "var(--surface-raised)", borderColor: "var(--primary-border)" }}>
                  <p className="text-xs text-[var(--text-subtle)]">{t.about.philosophy}</p>
                  <p className="text-sm font-bold mt-1" style={{ color: "var(--primary)" }}>{t.about.philosophyVal}</p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="p-6 md:p-8 rounded-2xl border font-mono relative overflow-hidden"
                  style={{ backgroundColor: "var(--surface-main)", borderColor: "var(--primary-border)", boxShadow: "0 0 30px var(--primary-bg)" }}>
                <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: "linear-gradient(var(--scanline-color) 50%, transparent 50%)", backgroundSize: "100% 4px" }} />
                <h3 className="text-lg font-bold tracking-widest uppercase mb-6 flex items-center gap-2" style={{ color: "var(--primary)" }}>
                  <Terminal className="w-5 h-5" />
                  <span>{t.about.sysLog}</span>
                </h3>
                <ul className="space-y-4 text-xs md:text-sm" style={{ color: "var(--text-muted)" }}>
                  <li className="flex justify-between border-b pb-2" style={{ borderColor: "var(--border-neutral)" }}>
                    <span>{t.about.framework}:</span>
                    <span style={{ color: "var(--text-main)" }}>React 19 / Vite</span>
                  </li>
                  <li className="flex justify-between border-b pb-2" style={{ borderColor: "var(--border-neutral)" }}>
                    <span>{t.about.styling}:</span>
                    <span style={{ color: "var(--text-main)" }}>Tailwind CSS / Vanilla CSS</span>
                  </li>
                  <li className="flex justify-between border-b pb-2" style={{ borderColor: "var(--border-neutral)" }}>
                    <span>{t.about.animation}:</span>
                    <span style={{ color: "var(--text-main)" }}>GSAP / Framer Motion / Anime.js</span>
                  </li>
                  <li className="flex justify-between">
                    <span>{t.about.deployment}:</span>
                    <span style={{ color: "var(--text-main)" }}>Vercel Edge Network</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 03: PROJECTS */}
      <section id="projects" className="min-h-screen relative py-12">
        <Projects />
      </section>
    </div>
  );
}
