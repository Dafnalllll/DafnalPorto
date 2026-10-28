import { useEffect, useRef, useState } from "react";
import { animate, createTimeline, stagger } from "animejs";
import { FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { Mail, Terminal, Cpu, Shield, Globe } from "lucide-react";
import { translations } from "../data/translations";

const socials = [
  { label: "GitHub", href: "https://github.com/Dafnalllll", icon: FaGithub },
  { label: "X", href: "https://x.com/", icon: FaXTwitter },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/rizki-dafa-naldi-935b55341/",
    icon: FaLinkedin,
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/daf_nal/",
    icon: FaInstagram,
  },
  { label: "Email", href: "mailto:rizkidafa@example.com", icon: Mail },
];

export default function Footer() {
  const footerRef = useRef(null);
  const [lang, setLang] = useState(() => localStorage.getItem("dafa_portfolio_lang") || "id");

  useEffect(() => {
    function handleLangChange() {
      setLang(localStorage.getItem("dafa_portfolio_lang") || "id");
    }
    window.addEventListener("languagechange", handleLangChange);
    return () => window.removeEventListener("languagechange", handleLangChange);
  }, []);

  const t = translations[lang] || translations.id;

  const navLinks = [
    { to: "#home", label: t.nav.home },
    { to: "#about", label: t.nav.about },
    { to: "#projects", label: t.nav.projects },
  ];

  useEffect(() => {
    if (!footerRef.current) return;

    try {
      const tl = createTimeline({
        defaults: {
          ease: "outExpo",
        },
      });

      tl.add(footerRef.current, {
        translateY: [20, 0],
        opacity: [0, 1],
        duration: 800,
      }).add(
        ".footer-col",
        {
          opacity: [0, 1],
          translateY: [15, 0],
          duration: 600,
          delay: stagger(150),
        },
        "-=400",
      );
    } catch (e) {
      console.error("Footer anime.js error:", e);
    }
  }, []);

  const handleIconHover = (e, isEnter) => {
    animate(e.currentTarget, {
      scale: isEnter ? 1.15 : 1,
      boxShadow: isEnter
        ? "0 0 20px var(--primary-glow), inset 0 0 10px var(--primary-bg)"
        : "0 0 0px var(--primary-bg)",
      duration: 300,
      ease: "outQuad",
    });
  };

  const handleNavClick = (e, to) => {
    if (to.startsWith("#")) {
      e.preventDefault();
      const id = to.substring(1);
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
        window.history.pushState(null, "", to);
      }
    }
  };

  return (
    <footer
      ref={footerRef}
      className="relative border-t font-mono overflow-hidden opacity-0"
      style={{
        backgroundColor: "var(--surface-footer)",
        borderColor: "var(--primary-border)",
        color: "var(--primary)",
      }}
    >
      {/* CRT Scanline & Grid Effect */}
      <div
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(var(--primary-border) 1px, transparent 1px),
            linear-gradient(90deg, var(--primary-border) 1px, transparent 1px)
          `,
          backgroundSize: "3rem 3rem",
        }}
      ></div>
      <div
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          backgroundImage:
            "linear-gradient(var(--scanline-color) 50%, transparent 50%)",
          backgroundSize: "100% 4px",
        }}
      ></div>

      <div className="max-w-6xl mx-auto px-8 py-16 grid grid-cols-1 md:grid-cols-3 gap-12 relative z-10">
        {/* Brand Column */}
        <div className="footer-col space-y-4">
          <a
            href="#home"
            onClick={(e) => handleNavClick(e, "#home")}
            className="inline-flex items-center gap-3 group cursor-pointer"
          >
            <div
              className="relative w-10 h-10 rounded-lg border flex items-center justify-center transition-all duration-300"
              style={{
                backgroundColor: "var(--surface-raised)",
                borderColor: "var(--primary-border)",
                boxShadow: "0 0 15px var(--primary-bg)",
              }}
            >
              <Cpu
                className="w-5 h-5 animate-pulse"
                style={{ color: "var(--primary)" }}
              />
            </div>
            <div className="flex flex-col">
              <span
                className="text-sm font-bold tracking-widest transition-colors"
                style={{ color: "var(--primary)" }}
              >
                DAF.SYS
              </span>
              <span
                className="text-[10px] tracking-wider"
                style={{ color: "var(--primary)" }}
              >
                PORTFOLIO // v2.0
              </span>
            </div>
          </a>
          <p
            className="text-xs leading-relaxed"
            style={{ color: "var(--text-muted)" }}
          >
            {t.footer.tagline}
          </p>
        </div>

        {/* Navigation Links */}
        <div className="footer-col space-y-4">
          <div
            className="flex items-center gap-2 text-xs font-semibold tracking-wider"
            style={{ color: "var(--primary)" }}
          >
            <Terminal className="w-4 h-4" style={{ color: "var(--primary)" }} />
            <span>{t.footer.nodes}</span>
          </div>
          <ul className="space-y-2">
            {navLinks.map((link) => (
              <li key={link.to}>
                <a
                  href={link.to}
                  onClick={(e) => handleNavClick(e, link.to)}
                  className="text-xs transition-colors flex items-center gap-2 tracking-widest uppercase hover:text-[var(--primary)]"
                  style={{ color: "var(--text-muted)" }}
                >
                  <span style={{ color: "var(--primary)" }}>&gt;</span>{" "}
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Social Matrix */}
        <div className="footer-col space-y-4">
          <div
            className="flex items-center gap-2 text-xs font-semibold tracking-wider"
            style={{ color: "var(--primary)" }}
          >
            <Shield className="w-4 h-4" style={{ color: "var(--primary)" }} />
            <span>{t.footer.social}</span>
          </div>
          <div className="flex items-center space-x-3">
            {socials.map((social) => {
              const Icon = social.icon;
              return (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  onMouseEnter={(e) => handleIconHover(e, true)}
                  onMouseLeave={(e) => handleIconHover(e, false)}
                  className="w-10 h-10 rounded-lg border flex items-center justify-center transition-colors"
                  style={{
                    backgroundColor: "var(--surface-raised)",
                    borderColor: "var(--primary-border)",
                    color: "var(--primary)",
                    boxShadow: "0 0 10px var(--primary-bg)",
                  }}
                  aria-label={social.label}
                >
                  <Icon className="w-4 h-4" />
                </a>
              );
            })}
          </div>
          <div
            className="text-[10px] pt-2 flex items-center gap-1.5"
            style={{ color: "var(--text-subtle)" }}
          >
            <Globe className="w-3 h-3" style={{ color: "var(--primary)" }} />
            <span>{t.footer.status}</span>
          </div>
        </div>
      </div>

      {/* Footer Bottom Bar */}
      <div
        className="border-t px-8 py-4 text-center text-xs flex flex-col sm:flex-row items-center justify-between max-w-6xl mx-auto relative z-10"
        style={{
          backgroundColor: "var(--surface-footer)",
          borderColor: "var(--primary-border)",
          color: "var(--text-subtle)",
        }}
      >
        <p>
          &copy; {new Date().getFullYear()} Rizki Dafa Naldi. {t.footer.rights}
        </p>
      </div>
    </footer>
  );
}
