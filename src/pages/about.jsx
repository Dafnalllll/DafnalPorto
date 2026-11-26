import { Terminal } from "lucide-react";

export default function About({ t }) {
  return (
    <section id="about" className="min-h-screen flex flex-col justify-center relative px-6 py-24 max-w-6xl mx-auto w-full">
      <div className="space-y-12">
        <div className="section-heading__top">
          <span className="section-heading__eyebrow">
            <span className="section-heading__marker" aria-hidden="true" />
            // SEC.02 — {t.about.section}
          </span>
          <span className="section-heading__meta">{t.about.status}</span>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-6 font-mono">
            <h2 className="section-heading__title">{t.about.heading}</h2>
            <p className="section-heading__description">{t.about.bio}</p>
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
            <div className="p-6 md:p-8 rounded-2xl border font-mono relative overflow-hidden" style={{ backgroundColor: "var(--surface-main)", borderColor: "var(--primary-border)", boxShadow: "0 0 30px var(--primary-bg)" }}>
              <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: "linear-gradient(var(--scanline-color) 50%, transparent 50%)", backgroundSize: "100% 4px" }} />
              <h3 className="text-lg font-bold tracking-widest uppercase mb-6 flex items-center gap-2" style={{ color: "var(--primary)" }}>
                <Terminal className="w-5 h-5" />
                <span>{t.about.sysLog}</span>
              </h3>
              <ul className="space-y-4 text-xs md:text-sm" style={{ color: "var(--text-muted)" }}>
                <li className="flex justify-between border-b pb-2" style={{ borderColor: "var(--border-neutral)" }}><span>{t.about.framework}:</span><span style={{ color: "var(--text-main)" }}>React 19 / Vite</span></li>
                <li className="flex justify-between border-b pb-2" style={{ borderColor: "var(--border-neutral)" }}><span>{t.about.styling}:</span><span style={{ color: "var(--text-main)" }}>Tailwind CSS / Vanilla CSS</span></li>
                <li className="flex justify-between border-b pb-2" style={{ borderColor: "var(--border-neutral)" }}><span>{t.about.animation}:</span><span style={{ color: "var(--text-main)" }}>GSAP / Framer Motion / Anime.js</span></li>
                <li className="flex justify-between"><span>{t.about.deployment}:</span><span style={{ color: "var(--text-main)" }}>Vercel Edge Network</span></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
