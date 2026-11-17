import { useEffect, useRef } from "react";
import gsap from "gsap";
import {
  X,
  ExternalLink,
  Code2,
  Cpu,
  Layers,
  Terminal,
  CheckCircle2,
  AlertCircle,
  Calendar,
  Compass,
  FileText,
  Activity,
} from "lucide-react";

export default function ProjectDetailModal({
  isOpen,
  onClose,
  project,
  t,
}) {
  const modalRef = useRef(null);
  const backdropRef = useRef(null);
  const bodyContentRef = useRef(null);

  const pd = t?.projectDetail || {
    dossier: "PROJECT DOSSIER",
    status: "STATUS",
    coordinate: "COORDINATE",
    year: "YEAR",
    overview: "Project Overview & Objectives",
    problem: "Problem Statement",
    solution: "Proposed Solution",
    objectives: "Key Objectives & Goals",
    architecture: "Technical Architecture & Components",
    workflow: "Implementation Workflow",
    gallery: "Screenshots & Visual Gallery",
    contributions: "My Role & Contributions",
    challenges: "Challenges & Lessons Learned",
    evaluation: "Evaluation Metrics & Results",
    findings: "FINDINGS",
    systemId: "SYSTEM_ID",
    sourceCode: "Source Code",
    liveDemo: "Live Demo",
  };

  // Handle ESC key and body scroll lock
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    // GSAP entrance animation
    const ctx = gsap.context(() => {
      gsap.fromTo(
        backdropRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.3, ease: "power2.out" }
      );
      gsap.fromTo(
        modalRef.current,
        { scale: 0.92, opacity: 0, y: 30 },
        { scale: 1, opacity: 1, y: 0, duration: 0.4, ease: "power3.out" }
      );
      if (bodyContentRef.current) {
        bodyContentRef.current.scrollTop = 0;
        gsap.fromTo(
          bodyContentRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.4, delay: 0.1, ease: "power3.out" }
        );
      }
    });

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
      ctx.revert();
    };
  }, [isOpen, project, onClose]);

  if (!isOpen || !project) return null;

  const handleClose = () => {
    gsap.to(modalRef.current, {
      scale: 0.95,
      opacity: 0,
      y: 20,
      duration: 0.25,
      ease: "power2.in",
    });
    gsap.to(backdropRef.current, {
      opacity: 0,
      duration: 0.25,
      onComplete: onClose,
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 md:p-8">
      {/* Backdrop */}
      <div
        ref={backdropRef}
        onClick={handleClose}
        className="absolute inset-0 bg-black/80 backdrop-blur-md"
      />

      {/* Modal Container */}
      <div
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        className="relative z-10 flex flex-col w-full max-w-6xl max-h-[92vh] rounded-2xl border shadow-2xl overflow-hidden font-mono"
        style={{
          backgroundColor: "var(--surface-main, #121212)",
          borderColor: "var(--primary-border, #333)",
          boxShadow: "0 0 50px var(--primary-bg, rgba(195,133,29,0.15))",
        }}
      >
        {/* Dark Technical Header */}
        <div
          className="flex items-center justify-between px-6 py-4 border-b shrink-0"
          style={{
            backgroundColor: "var(--surface-raised, #181818)",
            borderColor: "var(--primary-border, #333)",
          }}
        >
          <div className="flex items-center gap-3">
            <span
              className="text-xs font-bold tracking-widest uppercase px-2.5 py-1 rounded border"
              style={{
                backgroundColor: "var(--primary-bg)",
                borderColor: "var(--primary-border)",
                color: "var(--primary)",
              }}
            >
              {pd.dossier} // {project.id}
            </span>
            <span className="hidden sm:inline text-xs text-[var(--project-detail-text-muted)]">
              {project.category} ({project.year})
            </span>
          </div>

          <div className="flex items-center gap-2">
            {/* Close button */}
            <button
              onClick={handleClose}
              aria-label="Close modal"
              className="p-2 rounded-lg border transition-all duration-300 hover:scale-105 cursor-pointer"
              style={{
                backgroundColor: "var(--surface-raised)",
                borderColor: "var(--primary-border)",
                color: "var(--primary)",
              }}
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Editorial Body */}
        <div ref={bodyContentRef} className="project-detail-scroll overflow-y-auto flex-1 p-6 md:p-10 space-y-12 font-sans bg-[var(--project-detail-bg)] text-[var(--project-detail-text-primary)]">
          
          {/* Project Hero Section */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pb-10 border-b border-[var(--project-detail-border)]">
            <div className="lg:col-span-7 space-y-4">
              <div className="flex items-center gap-2 text-xs font-mono tracking-widest text-[var(--primary)]">
                <span className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: "var(--primary)" }}></span>
                <span>{pd.status}: {project.status || "ACTIVE"}</span>
              </div>
              <h2 id="modal-title" className="text-3xl sm:text-4xl font-black uppercase tracking-tight font-mono text-[var(--primary)]">
                {project.title}
              </h2>
              <p className="text-sm sm:text-base font-mono text-[var(--project-detail-text-muted)] tracking-wide">
                {project.subtitle}
              </p>
              <p className="text-base text-[var(--project-detail-text-body)] leading-relaxed font-sans pt-2">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-2 pt-2">
                {project.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 text-xs font-mono rounded border uppercase tracking-wider"
                    style={{
                      backgroundColor: "var(--project-detail-chip-bg)",
                      borderColor: "var(--project-detail-chip-border)",
                      color: "var(--primary)",
                    }}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="lg:col-span-5">
              <div
                className="relative rounded-xl overflow-hidden border shadow-2xl aspect-video group"
                style={{
                  borderColor: "var(--primary-border)",
                  boxShadow: "0 0 30px rgba(0,0,0,0.5)",
                }}
              >
                <img
                  src={project.image || "/dafnal.webp"}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-60" />
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs font-mono text-zinc-300">
                  <span>{pd.coordinate}: 0x{project.id}8F</span>
                  <span>{pd.year}: {project.year}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Section 01 — Project Overview */}
          {project.overview && (
            <div className="space-y-6">
              <div className="flex items-center gap-3 border-b border-[var(--project-detail-border)] pb-3">
                <span className="text-xs font-mono text-[var(--primary)] font-bold">01 //</span>
                <h3 className="text-lg font-mono font-bold uppercase tracking-wider text-[var(--project-detail-text-primary)]">
                  {pd.overview}
                </h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-6 rounded-xl border border-[var(--project-detail-border)] bg-[var(--project-detail-card-bg)] space-y-3">
                  <h4 className="text-xs font-mono uppercase tracking-widest text-[var(--primary)] flex items-center gap-2">
                    <Compass className="w-4 h-4" /> {pd.problem}
                  </h4>
                  <p className="text-sm text-[var(--project-detail-text-body)] leading-relaxed">
                    {project.overview.problem}
                  </p>
                </div>
                <div className="p-6 rounded-xl border border-[var(--project-detail-border)] bg-[var(--project-detail-card-bg)] space-y-3">
                  <h4 className="text-xs font-mono uppercase tracking-widest text-[var(--primary)] flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4" /> {pd.solution}
                  </h4>
                  <p className="text-sm text-[var(--project-detail-text-body)] leading-relaxed">
                    {project.overview.solution}
                  </p>
                </div>
              </div>
              {project.overview.objectives && project.overview.objectives.length > 0 && (
                <div className="p-6 rounded-xl border border-[var(--project-detail-border)] bg-[var(--project-detail-card-bg)]">
                  <h4 className="text-xs font-mono uppercase tracking-widest text-[var(--primary)] mb-4">
                    {pd.objectives}
                  </h4>
                  <ul className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {project.overview.objectives.map((obj, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs text-[var(--project-detail-text-body)] font-mono">
                        <span className="text-[var(--primary)] font-bold">[{String(i + 1).padStart(2, "0")}]</span>
                        <span>{obj}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}

          {/* Section 02 — Technical Architecture */}
          {project.architecture && (
            <div className="space-y-6">
              <div className="flex items-center gap-3 border-b border-[var(--project-detail-border)] pb-3">
                <span className="text-xs font-mono text-[var(--primary)] font-bold">02 //</span>
                <h3 className="text-lg font-mono font-bold uppercase tracking-wider text-[var(--project-detail-text-primary)]">
                  {pd.architecture}
                </h3>
              </div>
              <p className="text-sm text-[var(--project-detail-text-body)] leading-relaxed">
                {project.architecture.description}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {project.architecture.components.map((comp, i) => (
                  <div key={i} className="p-4 rounded-xl border border-[var(--project-detail-border)] bg-[var(--project-detail-card-bg)] flex items-start gap-3">
                    <Cpu className="w-5 h-5 text-[var(--primary)] shrink-0 mt-0.5" />
                    <span className="text-xs font-mono text-[var(--project-detail-text-secondary)] leading-snug">{comp}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Section 03 — Implementation Process */}
          {project.process && project.process.length > 0 && (
            <div className="space-y-6">
              <div className="flex items-center gap-3 border-b border-[var(--project-detail-border)] pb-3">
                <span className="text-xs font-mono text-[var(--primary)] font-bold">03 //</span>
                <h3 className="text-lg font-mono font-bold uppercase tracking-wider text-[var(--project-detail-text-primary)]">
                  {pd.workflow}
                </h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {project.process.map((step, i) => (
                  <div key={i} className="p-5 rounded-xl border border-[var(--project-detail-border)] bg-[var(--project-detail-card-bg)] space-y-2 relative overflow-hidden">
                    <span className="text-2xl font-mono font-bold text-[var(--primary)] opacity-40 absolute top-3 right-3">
                      {step.step}
                    </span>
                    <h4 className="text-xs font-mono font-bold uppercase text-[var(--project-detail-text-secondary)] tracking-wider">
                      {step.title}
                    </h4>
                    <p className="text-xs text-[var(--project-detail-text-muted)] leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Section 04 — Gallery & Screenshots */}
          {project.gallery && project.gallery.length > 0 && (
            <div className="space-y-6">
              <div className="flex items-center gap-3 border-b border-[var(--project-detail-border)] pb-3">
                <span className="text-xs font-mono text-[var(--primary)] font-bold">04 //</span>
                <h3 className="text-lg font-mono font-bold uppercase tracking-wider text-[var(--project-detail-text-primary)]">
                  {pd.gallery}
                </h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {project.gallery.map((img, i) => (
                  <div key={i} className="space-y-2 rounded-xl overflow-hidden border border-[var(--project-detail-border)] bg-[var(--project-detail-card-bg)] p-3">
                    <div className="aspect-video rounded-lg overflow-hidden border border-[var(--project-detail-border)]">
                      <img src={img.src} alt={img.caption} className="w-full h-full object-cover" />
                    </div>
                    <p className="text-xs font-mono text-[var(--project-detail-text-muted)] px-1 pt-1">
                      // {img.caption}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Section 05 — Contributions & Challenges */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {project.contributions && project.contributions.length > 0 && (
              <div className="space-y-4">
                <div className="flex items-center gap-3 border-b border-[var(--project-detail-border)] pb-3">
                  <span className="text-xs font-mono text-[var(--primary)] font-bold">05 //</span>
                  <h3 className="text-base font-mono font-bold uppercase tracking-wider text-[var(--project-detail-text-primary)]">
                    {pd.contributions}
                  </h3>
                </div>
                <ul className="space-y-3">
                  {project.contributions.map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-xs text-[var(--project-detail-text-body)] font-mono p-3 rounded-lg border border-[var(--project-detail-border)] bg-[var(--project-detail-card-bg)]">
                      <CheckCircle2 className="w-4 h-4 text-[var(--primary)] shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {project.challenges && project.challenges.length > 0 && (
              <div className="space-y-4">
                <div className="flex items-center gap-3 border-b border-[var(--project-detail-border)] pb-3">
                  <span className="text-xs font-mono text-[var(--primary)] font-bold">06 //</span>
                  <h3 className="text-base font-mono font-bold uppercase tracking-wider text-[var(--project-detail-text-primary)]">
                    {pd.challenges}
                  </h3>
                </div>
                <ul className="space-y-3">
                  {project.challenges.map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-xs text-[var(--project-detail-text-body)] font-mono p-3 rounded-lg border border-[var(--project-detail-border)] bg-[var(--project-detail-card-bg)]">
                      <AlertCircle className="w-4 h-4 text-[var(--primary)] shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Section 07 — Evaluation & Results */}
          {project.evaluation && (
            <div className="space-y-6">
              <div className="flex items-center gap-3 border-b border-[var(--project-detail-border)] pb-3">
                <span className="text-xs font-mono text-[var(--primary)] font-bold">07 //</span>
                <h3 className="text-lg font-mono font-bold uppercase tracking-wider text-[var(--project-detail-text-primary)]">
                  {pd.evaluation}
                </h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {project.evaluation.metrics.map((m, i) => (
                  <div key={i} className="p-5 rounded-xl border border-[var(--project-detail-border)] bg-[var(--project-detail-card-bg)] text-center space-y-1">
                    <div className="text-2xl font-black font-mono text-[var(--primary)]">
                      {m.value}
                    </div>
                    <div className="text-xs font-mono text-[var(--project-detail-text-muted)] uppercase tracking-widest">
                      {m.label}
                    </div>
                  </div>
                ))}
              </div>
              <div className="p-5 rounded-xl border border-[var(--project-detail-border)] bg-[var(--project-detail-card-bg)] text-xs font-mono text-[var(--project-detail-text-body)] leading-relaxed">
                <span className="text-[var(--primary)] font-bold">// {pd.findings}: </span>
                {project.evaluation.findings}
              </div>
            </div>
          )}

          {/* Project Links Footer */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-[var(--project-detail-border)]">
            <div className="text-xs font-mono text-[var(--project-detail-text-muted)]">
              {pd.systemId}: 0x{project.id} // SECURE_DOSSIER
            </div>
            <div className="flex items-center gap-3">
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border text-xs font-bold font-mono tracking-widest uppercase transition-all duration-300 hover:scale-105"
                  style={{
                    backgroundColor: "var(--surface-raised)",
                    borderColor: "var(--primary-border)",
                    color: "var(--text-main)",
                  }}
                >
                  <Code2 className="w-4 h-4" />
                  <span>{pd.sourceCode}</span>
                </a>
              )}
              {project.link && (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg border text-xs font-bold font-mono tracking-widest uppercase transition-all duration-300 hover:scale-105"
                  style={{
                    backgroundColor: "var(--primary-bg)",
                    borderColor: "var(--primary-border)",
                    color: "var(--primary)",
                    boxShadow: "0 0 15px var(--primary-bg)",
                  }}
                >
                  <span>{pd.liveDemo}</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
