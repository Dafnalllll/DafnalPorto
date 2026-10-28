import React from "react";
import { Filter, Sparkles } from "lucide-react";

export default function ProjectFilters({ categories, selectedCategory, setSelectedCategory, t }) {
  return (
    <div
      className="mt-8 flex flex-wrap items-center gap-3 border-t pt-6"
      style={{ borderColor: "var(--border-neutral)" }}
    >
      <div className="mr-2 flex items-center gap-2 text-xs font-mono" style={{ color: "var(--text-muted)" }}>
        <Filter className="h-3.5 w-3.5" style={{ color: "var(--primary)" }} />
        <span>{t.projects.filter || "FILTER_MATRIX:"}</span>
      </div>
      {categories.map((cat) => {
        const isActive = selectedCategory === cat;
        const displayCat =
          cat === "All"
            ? t.projects.all || "All Systems"
            : t.projects.categories?.[cat] || cat;

        return (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className="project-filter-button group relative rounded-lg border px-4 py-2 text-xs font-mono tracking-wider transition-all duration-300"
            data-active={isActive}
            style={{
              boxShadow: isActive ? "0 0 20px var(--primary-glow)" : "none",
            }}
          >
            <span className="relative z-10 flex items-center gap-2">
              {isActive && (
                <Sparkles
                  className="h-3 w-3 animate-pulse"
                  style={{ color: "var(--project-filter-active-text)" }}
                />
              )}
              {displayCat}
            </span>
            {isActive && (
              <div
                className="pointer-events-none absolute inset-0 rounded-lg opacity-15"
                style={{ backgroundColor: "var(--primary)" }}
              />
            )}
          </button>
        );
      })}
    </div>
  );
}
