import { useEffect, useRef } from "react";
import { animate } from "animejs";

export default function Loader() {
  const iconRef = useRef(null);
  const overlayRef = useRef(null);

  useEffect(() => {
    try {
      animate(overlayRef.current, {
        opacity: [0, 1],
        duration: 400,
        easing: "outQuad",
      });

      animate(iconRef.current, {
        scale: [0.85, 1.15, 0.85],
        rotate: [0, 360],
        loop: true,
        duration: 2000,
        easing: "inOutSine",
      });
    } catch (e) {
      console.error("Loader animation error:", e);
    }
  }, []);

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-50 backdrop-blur-md flex items-center justify-center select-none transition-colors duration-500"
      style={{ backgroundColor: "var(--bg-main)" }}
    >
      {/* Scanline & Grid Effect */}
      <div
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          backgroundImage: `
            linear-gradient(var(--primary-border) 1px, transparent 1px),
            linear-gradient(90deg, var(--primary-border) 1px, transparent 1px)
          `,
          backgroundSize: "3rem 3rem",
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none opacity-30"
        style={{
          backgroundImage:
            "linear-gradient(var(--scanline-color) 50%, transparent 50%)",
          backgroundSize: "100% 4px",
        }}
      />

      <div
        ref={iconRef}
        className="relative z-10 w-20 h-20 rounded-2xl border flex items-center justify-center shadow-2xl overflow-hidden p-2"
        style={{
          backgroundColor: "var(--surface-main)",
          borderColor: "var(--primary-border)",
          boxShadow: "0 0 35px var(--primary-bg)",
        }}
      >
        <img
          src="/dafnal.webp"
          alt="Dafnal Loader"
          className="w-full h-full object-cover rounded-xl"
        />
        <div
          className="absolute -inset-1 rounded-2xl opacity-40 blur-md pointer-events-none"
          style={{ backgroundColor: "var(--primary)" }}
        />
      </div>
    </div>
  );
}
