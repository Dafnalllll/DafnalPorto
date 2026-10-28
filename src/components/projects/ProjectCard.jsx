import { ExternalLink } from "lucide-react";

export default function ProjectCard({ project, index, total, cardRef, t }) {
  return (
    <div
      ref={cardRef}
      className="absolute inset-0 flex h-full w-full flex-col justify-between overflow-hidden rounded-2xl border shadow-2xl backdrop-blur-md"
      style={{
        backgroundColor: "var(--project-card-bg)",
        color: "var(--project-card-text)",
        borderColor: "var(--primary-border)",
        boxShadow: "0 0 35px var(--primary-bg)",
        backfaceVisibility: "hidden",
        willChange: "transform, opacity",
      }}
    >
      <div className="absolute left-0 top-0 z-20 h-4 w-4 border-l-2 border-t-2" style={{ borderColor: "var(--primary)" }} />
      <div className="absolute right-0 top-0 z-20 h-4 w-4 border-r-2 border-t-2" style={{ borderColor: "var(--primary)" }} />
      <div className="absolute bottom-0 left-0 z-20 h-4 w-4 border-b-2 border-l-2" style={{ borderColor: "var(--primary)" }} />
      <div className="absolute bottom-0 right-0 z-20 h-4 w-4 border-b-2 border-r-2" style={{ borderColor: "var(--primary)" }} />

      <div className="grid h-full grid-cols-1 gap-0 overflow-y-auto lg:grid-cols-2 lg:overflow-y-hidden">
        <div
          className="relative flex flex-col justify-between border-b p-6 md:p-8 lg:border-b-0 lg:border-r"
          style={{
            backgroundColor: "var(--project-page-left-bg)",
            borderColor: "var(--primary-border)",
          }}
        >
          <div
            className="pointer-events-none absolute inset-0 opacity-10"
            style={{
              backgroundImage:
                "linear-gradient(var(--scanline-color) 50%, transparent 50%)",
              backgroundSize: "100% 4px",
            }}
          />

          <div className="relative z-10 flex items-center justify-between gap-3">
            <span className="text-xs font-mono tracking-widest uppercase" style={{ color: "var(--primary)" }}>
              // {t.projects.card.pageLeft} // {project.id}
            </span>
            <span
              className="rounded border px-2.5 py-1 text-[10px] font-mono tracking-widest"
              style={{
                backgroundColor: "var(--project-chip-bg)",
                borderColor: "var(--project-chip-border)",
                color: "var(--project-card-muted)",
              }}
            >
              {project.status || "STABLE"}
            </span>
          </div>

          <div className="relative z-10 my-auto flex items-center justify-center py-4">
            <div
              className="group/img relative flex aspect-video w-full max-w-md items-center justify-center overflow-hidden rounded-xl border shadow-xl"
              style={{
                borderColor: "var(--primary-border)",
                backgroundColor: "var(--surface-main)",
                boxShadow: "0 0 25px var(--primary-bg)",
              }}
            >
              <img
                src={project.image || "/dafnal.webp"}
                alt={project.title}
                className="h-full w-full object-cover transition-transform duration-700 group-hover/img:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60" />
              <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between gap-2 text-xs font-mono text-white">
                <span>{t.projects.card.category}: {project.category}</span>
                <span>{t.projects.card.year}: {project.year}</span>
              </div>
            </div>
          </div>

          <div
            className="relative z-10 flex items-center justify-between text-[10px] font-mono"
            style={{ color: "var(--project-card-subtle)" }}
          >
            <span>{t.projects.card.coordinate}: 0x{project.id}8F</span>
            <span>{t.projects.card.render}: {t.projects.card.renderMode}</span>
          </div>
        </div>

        <div
          className="relative flex flex-col justify-between p-6 md:p-8"
          style={{ backgroundColor: "var(--project-page-right-bg)" }}
        >
          <div className="space-y-4">
            <div className="flex items-center justify-between gap-3">
              <span
                className="rounded border px-3 py-1 text-xs font-bold tracking-widest uppercase"
                style={{
                  backgroundColor: "var(--primary-bg)",
                  borderColor: "var(--primary-border)",
                  color: "var(--primary)",
                }}
              >
                {t.projects.card.index}: {project.id} // {index + 1} {t.projects.card.of} {total}
              </span>
              <span className="text-xs font-mono" style={{ color: "var(--project-card-subtle)" }}>
                {project.year}
              </span>
            </div>

            <h3 className="text-2xl font-extrabold tracking-wider uppercase md:text-3xl" style={{ color: "var(--primary)" }}>
              {project.title}
            </h3>
            <p className="text-xs font-sans tracking-wide md:text-sm" style={{ color: "var(--project-card-muted)" }}>
              {project.subtitle}
            </p>
            <p className="pt-1 text-sm font-sans leading-relaxed">
              {project.description}
            </p>
          </div>

          <div className="space-y-6 pt-6">
            <div className="flex flex-wrap gap-2">
              {project.techStack.map((techItem) => (
                <span
                  key={techItem}
                  className="rounded border px-2.5 py-1 text-xs font-mono tracking-wider uppercase"
                  style={{
                    backgroundColor: "var(--project-chip-bg)",
                    borderColor: "var(--project-chip-border)",
                    color: "var(--project-chip-text)",
                  }}
                >
                  {techItem}
                </span>
              ))}
            </div>

            <div
              className="flex items-center justify-between gap-3 border-t pt-4"
              style={{ borderColor: "var(--project-chip-border)" }}
            >
              <span
                className="text-[10px] font-mono tracking-widest uppercase"
                style={{ color: "var(--project-card-subtle)" }}
              >
                {t.projects.card.sector}: {project.category}
              </span>
              {(project.github || project.link) && (
                <a
                  href={project.github || project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg border px-5 py-2.5 text-xs font-bold font-mono tracking-widest uppercase transition-all duration-300 hover:scale-105"
                  style={{
                    backgroundColor: "var(--primary-bg)",
                    borderColor: "var(--primary-border)",
                    color: "var(--primary)",
                    boxShadow: "0 0 15px var(--primary-bg)",
                  }}
                >
                  <span>{t.projects.source}</span>
                  <ExternalLink className="h-4 w-4" />
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
