import { useEffect } from "react";
import { createPortal } from "react-dom";
import { NavLink } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Code2, Home, User, X } from "lucide-react";

const links = [
  { to: "/home", label: "Home", icon: Home },
  { to: "/about", label: "About", icon: User },
  { to: "/projects", label: "Projects", icon: Code2 },
];

export default function MobileMenu({ isOpen, onClose }) {
  useEffect(() => {
    if (!isOpen) return undefined;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function handleKeyDown(event) {
      if (event.key === "Escape") onClose();
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label="Mobile navigation"
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "100%" }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[100] overflow-y-auto font-mono md:hidden"
          style={{
            backgroundColor: "var(--bg-main)",
            color: "var(--text-main)",
          }}
        >
          <div
            className="fixed inset-0 pointer-events-none opacity-20"
            style={{
              backgroundImage: `
                linear-gradient(var(--primary-border) 1px, transparent 1px),
                linear-gradient(90deg, var(--primary-border) 1px, transparent 1px)
              `,
              backgroundSize: "3rem 3rem",
            }}
          />
          <div
            className="fixed inset-0 pointer-events-none opacity-20"
            style={{
              backgroundImage:
                "linear-gradient(var(--scanline-color) 50%, transparent 50%)",
              backgroundSize: "100% 4px",
            }}
          />

          <div className="relative z-10 flex min-h-[100dvh] flex-col px-6 pb-8 pt-6">
            <header className="flex items-center justify-between border-b pb-5" style={{ borderColor: "var(--primary-border)" }}>
              <div>
                <p className="text-sm font-bold tracking-[0.25em]" style={{ color: "var(--primary)" }}>
                  DAF.SYS
                </p>
                <p className="mt-1 text-[10px] tracking-widest" style={{ color: "var(--text-muted)" }}>
                  NAVIGATION // 0x01
                </p>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="flex h-11 w-11 items-center justify-center rounded-xl border"
                style={{
                  backgroundColor: "var(--surface-raised)",
                  borderColor: "var(--primary-border)",
                  color: "var(--primary)",
                }}
                aria-label="Close navigation"
              >
                <X className="h-5 w-5" />
              </button>
            </header>

            <nav className="flex flex-1 flex-col justify-center py-10" aria-label="Main navigation">
              <p className="mb-5 text-[10px] tracking-[0.3em]" style={{ color: "var(--text-subtle)" }}>
                SELECT_DESTINATION
              </p>
              <div className="space-y-3">
                {links.map((link, index) => {
                  const Icon = link.icon;
                  return (
                    <motion.div
                      key={link.to}
                      initial={{ opacity: 0, x: 24 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: 0.08 + index * 0.07 }}
                    >
                      <NavLink
                        to={link.to}
                        onClick={onClose}
                        className="group flex items-center justify-between rounded-2xl border px-5 py-5 transition-colors"
                        style={({ isActive }) => ({
                          backgroundColor: isActive ? "var(--primary-bg)" : "var(--surface-main)",
                          borderColor: isActive ? "var(--primary-border)" : "var(--border-neutral)",
                          color: isActive ? "var(--primary)" : "var(--text-muted)",
                        })}
                      >
                        <span className="flex items-center gap-4">
                          <Icon className="h-5 w-5" />
                          <span className="text-lg font-semibold tracking-[0.18em] uppercase">
                            {link.label}
                          </span>
                        </span>
                        <ArrowUpRight className="h-5 w-5 opacity-60 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
                      </NavLink>
                    </motion.div>
                  );
                })}
              </div>
            </nav>

            <footer className="border-t pt-4 text-[10px] tracking-widest" style={{ borderColor: "var(--primary-border)", color: "var(--text-subtle)" }}>
              SECURE CONNECTION // ALL SYSTEMS ONLINE
            </footer>
          </div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
