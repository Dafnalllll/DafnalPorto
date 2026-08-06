import { Link } from "react-router-dom";
import { useRef, useState } from "react";
import { FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { Mail } from "lucide-react";

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
  { label: "Email", href: "mailto:", icon: Mail },
];

const navLinks = [
  { to: "/home", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/projects", label: "Projects" },
];

export default function Footer() {
  const footerRef = useRef(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  function handleMouseMove(e) {
    if (!footerRef.current) return;
    const rect = footerRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const x = (e.clientX - centerX) / 80;
    const y = (e.clientY - centerY) / 80;
    setTilt({ x: -y, y: x });
  }

  function handleMouseLeave() {
    setTilt({ x: 0, y: 0 });
  }

  return (
    <footer
      ref={footerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative bg-gradient-to-b from-stone-50 to-white border-t border-stone-200 overflow-hidden"
      style={{
        perspective: "1200px",
        transformStyle: "preserve-3d",
      }}
    >
      {/* 3D depth accent line */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(0,0,0,0.06), transparent)",
          transform: "translateZ(1px)",
        }}
      />

      <div
        className="max-w-6xl mx-auto px-8 py-20 grid grid-cols-1 md:grid-cols-3 gap-16 relative transition-transform duration-200 ease-out"
        style={{
          transformStyle: "preserve-3d",
          transform: `rotateX(${tilt.x * 0.3}deg) rotateY(${tilt.y * 0.3}deg)`,
        }}
      >
        {/* Brand */}
        <div className="group">
          <Link
            to="/home"
            className="inline-flex items-center gap-3"
            style={{ transformStyle: "preserve-3d" }}
          >
            <span
              className="relative w-10 h-10 flex items-center justify-center text-white text-sm font-light tracking-wide transition-all duration-500 group-hover:scale-125"
              style={{
                background:
                  "radial-gradient(circle at 35% 30%, #6b6358 0%, #2d2a24 50%, #1a1815 100%)",
                borderRadius: "50%",
                boxShadow:
                  "0 4px 8px rgba(0,0,0,0.15), 0 8px 24px rgba(0,0,0,0.1), inset 0 2px 0 rgba(255,255,255,0.2)",
                transform: `translateZ(12px) rotateX(${tilt.x * 0.5}deg) rotateY(${tilt.y * 0.5}deg)`,
                transformStyle: "preserve-3d",
              }}
            >
              <span
                className="absolute inset-0 rounded-full"
                style={{
                  background:
                    "radial-gradient(circle at 30% 25%, rgba(255,255,255,0.25) 0%, transparent 50%)",
                }}
              />
              <span
                className="absolute top-1 right-1.5 w-1.5 h-1.5 rounded-full bg-white/30 blur-[1px]"
                style={{ transform: "translateZ(4px)" }}
              />
              <span style={{ transform: "translateZ(6px)", display: "block" }}>
                D
              </span>
              <span
                className="absolute -bottom-[6px] left-1/2 -translate-x-1/2 w-10 h-3 rounded-full opacity-20 transition-all duration-500 group-hover:opacity-30 group-hover:scale-150"
                style={{
                  background:
                    "radial-gradient(ellipse, rgba(0,0,0,0.4) 0%, transparent 70%)",
                  filter: "blur(4px)",
                  transform: `translateZ(-4px)`,
                }}
              />
            </span>
            <span
              className="text-xl tracking-wide text-stone-800 transition-all duration-300 group-hover:tracking-wider"
              style={{
                fontFamily: "'Times New Roman', serif",
                transform: `translateZ(8px)`,
                transformStyle: "preserve-3d",
                textShadow: "0 2px 4px rgba(0,0,0,0.04)",
              }}
            >
              <span className="font-serif italic">Dafnal</span>
            </span>
          </Link>
          <p
            className="mt-5 text-sm text-stone-400 leading-relaxed max-w-xs font-light"
            style={{ transform: "translateZ(4px)" }}
          >
            Crafting digital experiences with bold design and clean code.
          </p>
        </div>

        {/* Navigation */}
        <div
          style={{ transform: `translateZ(${4 + tilt.y * 0.2}px)` }}
        >
          <h4 className="text-xs tracking-[0.15em] uppercase mb-6 text-stone-400 font-medium">
            Navigate
          </h4>
          <ul className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <li key={link.to}>
                <Link
                  to={link.to}
                  className="relative inline-block text-sm text-stone-500 transition-all duration-300 hover:text-stone-800
                    after:absolute after:left-0 after:right-0 after:bottom-0 after:h-px after:bg-stone-800
                    after:content-[''] after:scale-x-0 after:transition-transform after:duration-300 after:origin-left
                    hover:after:scale-x-100"
                  style={{
                    transformStyle: "preserve-3d",
                  }}
                >
                  <span
                    className="relative block transition-transform duration-200 hover:translate-z-1 hover:-translate-y-px"
                    style={{ transformStyle: "preserve-3d" }}
                  >
                    {link.label}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Socials */}
        <div style={{ transform: `translateZ(${6 + tilt.y * 0.3}px)` }}>
          <h4 className="text-xs tracking-[0.15em] uppercase mb-6 text-stone-400 font-medium">
            Connect
          </h4>
          <div className="flex flex-wrap gap-6">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="relative text-sm text-stone-500 transition-all duration-300 hover:text-stone-800"
                style={{ transformStyle: "preserve-3d" }}
              >
                <span
                  className="relative flex items-center gap-2 transition-transform duration-200 hover:-translate-y-px"
                  style={{ transformStyle: "preserve-3d" }}
                >
                  <s.icon size={25} />
                </span>
                <span
                  className="absolute left-0 right-0 bottom-0 h-px bg-stone-800 scale-x-0 transition-transform duration-300 origin-left hover:scale-x-100"
                  style={{ transformOrigin: "left" }}
                />
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div
        className="relative border-t border-stone-200"
        style={{ transform: `translateZ(-2px)` }}
      >
        <div className="max-w-6xl mx-auto px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-xs text-stone-400 font-light">
            &copy; {new Date().getFullYear()} Dafnal. All rights reserved.
          </p>
          <p className="text-xs text-stone-400 font-light">
            Built with React &middot; Tailwind &middot; Framer Motion
          </p>
        </div>
      </div>
    </footer>
  );
}
