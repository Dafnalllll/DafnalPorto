import { ExternalLink, Terminal } from "lucide-react";

export default function ProjectGridCard({ project, index, t, onOpenModal }) {
  return (
    <div
      className="relative flex flex-col justify-between overflow-hidden rounded-2xl border shadow-2xl backdrop-blur-md h-full transition-all duration-300 hover:scale-[1.02]"
      style={{
        backgroundColor: "var(--project-card-bg)",
        color: "var(--project-card-text)",
        borderColor: "var(--primary-border)",
        boxShadow: "0 0 25px var(--primary-bg)",
      }}
    >
      <div
        className="absolute left-0 top-0 z-20 h-3 w-3 border-l-2 border-t-2"
        style={{ borderColor: "var(--primary)" }}
      />
      <div
        className="absolute right-0 top-0 z-20 h-3 w-3 border-r-2 border-t-2"
        style={{ borderColor: "var(--primary)" }}
      />
      <div
        className="absolute bottom-0 left-0 z-20 h-3 w-3 border-b-2 border-l-2"
        style={{ borderColor: "var(--primary)" }}
      />
      <div
        className="absolute bottom-0 right-0 z-20 h-3 w-3 border-b-2 border-r-2"
        style={{ borderColor: "var(--primary)" }}
      />

      <div className="flex flex-col h-full p-6 justify-between space-y-4">
        <div className="space-y-4">
          <div className="flex items-center justify-between gap-3">
            <span
              className="text-[10px] font-mono tracking-widest uppercase"
              style={{ color: "var(--primary)" }}
            >
              // {project.id} // {String(index + 1).padStart(2, "0")} // {project.category}
            </span>
            <span
              className="rounded border px-2 py-0.5 text-[10px] font-mono tracking-widest"
              style={{
                backgroundColor: "var(--project-chip-bg)",
                borderColor: "var(--project-chip-border)",
                color: "var(--project-card-muted)",
              }}
            >
              {project.status || "STABLE"}
            </span>
          </div>

          <div
            className="group/img relative aspect-video w-full items-center justify-center overflow-hidden rounded-xl border shadow-md cursor-pointer"
            onClick={() => onOpenModal && onOpenModal(project)}
            style={{
              borderColor: "var(--primary-border)",
              backgroundColor: "var(--surface-main)",
            }}
          >
            <img
              src={project.image || "/dafnal.webp"}
              alt={project.title}
              className="h-full w-full object-cover transition-transform duration-700 group-hover/img:scale-105"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60" />
            <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between gap-2 text-[10px] font-mono text-white">
              <span>{project.year}</span>
            </div>
          </div>

          <div>
            <h3
              className="text-xl font-extrabold tracking-wider uppercase mb-1"
              style={{ color: "var(--primary)" }}
            >
              {project.title}
            </h3>
            <p
              className="text-xs font-sans line-clamp-2"
              style={{ color: "var(--project-card-muted)" }}
            >
              {project.description}
            </p>
          </div>
        </div>

        <div
          className="space-y-4 pt-4 border-t"
          style={{ borderColor: "var(--project-chip-border)" }}
        >
          <div className="flex flex-wrap gap-1.5 max-h-16 overflow-hidden">
            {project.techStack.map((techItem) => (
              <span
                key={techItem}
                className="rounded border px-2 py-0.5 text-[10px] font-mono tracking-wider uppercase"
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

          <div className="flex items-center justify-between gap-2 pt-2">
            <button
              onClick={() => onOpenModal && onOpenModal(project)}
              className="inline-flex items-center gap-1 rounded-lg border px-3 py-1.5 text-[10px] font-bold font-mono tracking-widest uppercase transition-all duration-300 hover:scale-105 cursor-pointer"
              style={{
                backgroundColor: "var(--surface-raised)",
                borderColor: "var(--primary-border)",
                color: "var(--primary)",
              }}
            >
              <Terminal className="w-3 h-3" />
              <span>{t.projects.card.details}</span>
            </button>
            {(project.github || project.link) && (
              <a
                href={project.github || project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-[10px] font-bold font-mono tracking-widest uppercase transition-all duration-300 hover:scale-105"
                style={{
                  backgroundColor: "var(--primary-bg)",
                  borderColor: "var(--primary-border)",
                  color: "var(--primary)",
                }}
              >
                <span>{t.projects.source}</span>
                <ExternalLink className="h-3 w-3" />
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
