import {
  useState,
  useLayoutEffect,
  useMemo,
  useRef,
  useEffect,
} from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  BookOpen,
  LayoutGrid,
} from "lucide-react";
import { projectsData, categories } from "../data/projectsData";
import { projectDetailsTranslations } from "../data/projectDetailsTranslations";
import { translations } from "../data/translations";
import ProjectFilters from "../components/projects/ProjectFilters";
import ProjectCard from "../components/projects/ProjectCard";
import ProjectGridCard from "../components/projects/ProjectGridCard";
import ProjectDetailModal from "../components/projects/ProjectDetailModal";
import SectionHeading from "../components/SectionHeading";

gsap.registerPlugin(ScrollTrigger);

const mobilePageTurnVariants = {
  enter: (direction) => ({
    rotateY: direction > 0 ? 76 : -76,
    x: direction > 0 ? "10%" : "-10%",
    opacity: 0.25,
    transformOrigin: direction > 0 ? "left center" : "right center",
    zIndex: direction > 0 ? 0 : 2,
  }),
  center: {
    rotateY: 0,
    x: 0,
    opacity: 1,
    zIndex: 1,
    transition: { duration: 0.78, ease: [0.22, 1, 0.36, 1] },
  },
  exit: (direction) => ({
    rotateY: direction > 0 ? -76 : 76,
    x: direction > 0 ? "-10%" : "10%",
    opacity: 0,
    transformOrigin: direction > 0 ? "left center" : "right center",
    zIndex: direction > 0 ? 2 : 0,
    transition: { duration: 0.62, ease: [0.55, 0.06, 0.68, 0.19] },
  }),
};

const mobilePageFadeVariants = {
  enter: { opacity: 0 },
  center: { opacity: 1, transition: { duration: 0.2 } },
  exit: { opacity: 0, transition: { duration: 0.15 } },
};

export default function Projects() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [activeProjectIndex, setActiveProjectIndex] = useState(0);
  const [viewMode, setViewMode] = useState("book"); // "book" | "grid"
  const [lang, setLang] = useState(() => localStorage.getItem("dafa_portfolio_lang") || "id");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProjectId, setSelectedProjectId] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const [pageTurnDirection, setPageTurnDirection] = useState(1);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    function handleLangChange() {
      setLang(localStorage.getItem("dafa_portfolio_lang") || "id");
    }
    window.addEventListener("languagechange", handleLangChange);
    return () => window.removeEventListener("languagechange", handleLangChange);
  }, []);

  const t = translations[lang] || translations.id;

  const filteredProjects = useMemo(
    () =>
      selectedCategory === "All"
        ? projectsData
        : projectsData.filter((project) => project.category === selectedCategory),
    [selectedCategory]
  );
  const localizedProjects = filteredProjects.map((project) => {
    const localized = t.projects.items[project.id];
    const details = projectDetailsTranslations[lang]?.[project.id];

    return {
      ...project,
      ...localized,
      category: t.projects.categories[project.category] || project.category,
      ...(details && {
        overview: { ...project.overview, ...details.overview },
        architecture: { ...project.architecture, ...details.architecture },
        process: details.process || project.process,
        gallery: project.gallery.map((image, index) => ({
          ...image,
          caption: details.gallery?.[index] || image.caption,
        })),
        contributions: details.contributions || project.contributions,
        challenges: details.challenges || project.challenges,
        evaluation: project.evaluation && {
          ...project.evaluation,
          ...details.evaluation,
          metrics: project.evaluation.metrics.map((metric, index) => ({
            ...metric,
            label: details.evaluation?.metrics?.[index] || metric.label,
          })),
        },
      }),
    };
  });
  const hasProjects = filteredProjects.length > 0;

  const containerRef = useRef(null);
  const triggerRef = useRef(null);
  const viewportRef = useRef(null);
  const cardsRef = useRef([]);
  const activeProjectIndexRef = useRef(0);

  const handleOpenModal = (project) => {
    setSelectedProjectId(project.id);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProjectId(null);
  };

  const handlePrevProject = () => {
    setPageTurnDirection(-1);
    setActiveProjectIndex((prev) => (prev > 0 ? prev - 1 : localizedProjects.length - 1));
  };

  const handleNextProject = () => {
    setPageTurnDirection(1);
    setActiveProjectIndex((prev) => (prev < localizedProjects.length - 1 ? prev + 1 : 0));
  };

  const selectedProject = localizedProjects.find(
    (project) => project.id === selectedProjectId
  );

  useLayoutEffect(() => {
    if (viewMode !== "book") return;

    activeProjectIndexRef.current = 0;
    setActiveProjectIndex(0);
    setPageTurnDirection(1);

    if (window.innerWidth < 768) return; // Skip GSAP on mobile

    const ctx = gsap.context(() => {
      const cards = cardsRef.current.filter(Boolean);
      if (cards.length === 0) return;

      if (cards.length === 1) {
        gsap.set(cards[0], {
          autoAlpha: 1,
          rotateY: 0,
          scale: 1,
          x: 0,
          pointerEvents: "auto",
        });
        return;
      }

      cards.forEach((card, index) => {
        gsap.set(card, {
          position: "absolute",
          inset: 0,
          transformOrigin: "left center",
          transformStyle: "preserve-3d",
          backfaceVisibility: "hidden",
          autoAlpha: index === 0 ? 1 : 0,
          rotateY: index === 0 ? 0 : 90,
          scale: index === 0 ? 1 : 0.94,
          zIndex: cards.length - index,
          pointerEvents: index === 0 ? "auto" : "none",
        });
      });

      const introDuration = 0.5;
      const transitionDuration = 1.25;
      const readingPause = 0.7;
      const transitionStarts = cards
        .slice(1)
        .map((_, i) => introDuration + i * (transitionDuration + readingPause));
      const scrollLength =
        introDuration + (cards.length - 1) * (transitionDuration + readingPause);

      let timeline;
      timeline = gsap.timeline({
        scrollTrigger: {
          trigger: triggerRef.current,
          pin: true,
          scrub: 1.1,
          start: () => {
            const navbar = document.querySelector("[data-site-navbar]");
            const navbarBottom = navbar?.getBoundingClientRect().bottom ?? 96;
            return `top top+=${Math.ceil(navbarBottom + 24)}`;
          },
          end: () => `+=${scrollLength * window.innerHeight * 1.1}`,
          invalidateOnRefresh: true,
          anticipatePin: 1,
          onUpdate: () => {
            if (!timeline) return;
            let currentIndex = 0;
            transitionStarts.forEach((start, index) => {
              if (timeline.time() >= start + transitionDuration / 2) {
                currentIndex = index + 1;
              }
            });
            if (currentIndex !== activeProjectIndexRef.current) {
              activeProjectIndexRef.current = currentIndex;
              setActiveProjectIndex(currentIndex);
              cards.forEach((card, index) => {
                gsap.set(card, {
                  pointerEvents: index === currentIndex ? "auto" : "none",
                });
              });
            }
          },
        },
      });

      for (let i = 0; i < cards.length - 1; i++) {
        const currentCard = cards[i];
        const nextCard = cards[i + 1];
        const startTime = transitionStarts[i];

        timeline.to(
          currentCard,
          {
            autoAlpha: 0,
            rotateY: -90,
            scale: 0.94,
            duration: transitionDuration,
            ease: "power2.inOut",
          },
          startTime
        )
          .fromTo(
            nextCard,
            {
              autoAlpha: 0,
              rotateY: 90,
              scale: 0.94,
            },
            {
              autoAlpha: 1,
              rotateY: 0,
              scale: 1,
              duration: transitionDuration,
              ease: "power2.inOut",
            },
            startTime
          )
          .to(
            {},
            { duration: readingPause },
            startTime + transitionDuration
          );
      }
    }, containerRef);

    return () => ctx.revert();
  }, [filteredProjects, isMobile, viewMode]);

  return (
    <div
      ref={containerRef}
      className="relative min-h-screen overflow-hidden pt-24 pb-16 selection:bg-[var(--primary)] selection:text-black font-sans"
      style={{ color: "var(--text-main)" }}
    >
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="mb-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="min-w-0 flex-1"
            >
              <SectionHeading
                eyebrow={t.projects.section || "SYSTEMS // PORTFOLIO_ARCHIVE"}
                title={t.projects.title || "Featured Projects"}
                description={t.projects.desc || "A curated showcase of high-performance web applications, intelligent agents, and digital architectures."}
                as="h1"
              />
            </motion.div>

            {/* View Mode Switcher (Book Mode vs Grid Mode) */}
            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={() => setViewMode("book")}
                className={`flex items-center gap-1.5 px-4 py-2.5 rounded-xl border text-xs font-mono font-bold tracking-widest uppercase transition-all duration-300 cursor-pointer ${
                  viewMode === "book" ? "scale-105 shadow-md" : "opacity-70 hover:opacity-100"
                }`}
                style={{
                  backgroundColor: viewMode === "book" ? "var(--primary-bg)" : "var(--surface-raised)",
                  borderColor: "var(--primary-border)",
                  color: viewMode === "book" ? "var(--primary)" : "var(--text-main)",
                }}
              >
                <BookOpen className="w-4 h-4" />
                <span>{t.projects.bookMode || "BOOK MODE"}</span>
              </button>

              <button
                onClick={() => setViewMode("grid")}
                className={`flex items-center gap-1.5 px-4 py-2.5 rounded-xl border text-xs font-mono font-bold tracking-widest uppercase transition-all duration-300 cursor-pointer ${
                  viewMode === "grid" ? "scale-105 shadow-md" : "opacity-70 hover:opacity-100"
                }`}
                style={{
                  backgroundColor: viewMode === "grid" ? "var(--primary-bg)" : "var(--surface-raised)",
                  borderColor: "var(--primary-border)",
                  color: viewMode === "grid" ? "var(--primary)" : "var(--text-main)",
                }}
              >
                <LayoutGrid className="w-4 h-4" />
                <span>{t.projects.gridMode || "GRID MODE"}</span>
              </button>
            </div>
          </div>

          {/* Category Filter Buttons */}
          <ProjectFilters
            categories={categories}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            t={t}
          />
        </div>

        {/* Projects Showcase Container */}
        {hasProjects ? (
          viewMode === "book" ? (
            <div ref={triggerRef} className="relative min-h-[75vh] flex flex-col items-center justify-center">
              <div
                ref={viewportRef}
                className="relative w-full max-w-5xl h-[min(580px,calc(100dvh-152px))] min-h-[440px] [perspective:1800px]"
              >
                <div className="relative z-10 w-full h-full" style={{ transformStyle: "preserve-3d" }}>
                  {isMobile ? (
                    <AnimatePresence
                      initial={false}
                      mode="sync"
                      custom={pageTurnDirection}
                    >
                      <motion.div
                        key={localizedProjects[activeProjectIndex].id}
                        custom={pageTurnDirection}
                        variants={
                          prefersReducedMotion
                            ? mobilePageFadeVariants
                            : mobilePageTurnVariants
                        }
                        initial="enter"
                        animate="center"
                        exit="exit"
                        className="absolute inset-0"
                        style={{
                          transformStyle: "preserve-3d",
                          backfaceVisibility: "hidden",
                        }}
                      >
                        <ProjectCard
                          project={localizedProjects[activeProjectIndex]}
                          index={activeProjectIndex}
                          total={localizedProjects.length}
                          t={t}
                          onOpenModal={handleOpenModal}
                        />
                      </motion.div>
                    </AnimatePresence>
                  ) : (
                    localizedProjects.map((project, index) => (
                      <div
                        key={project.id}
                        ref={(el) => (cardsRef.current[index] = el)}
                        className="absolute inset-0"
                      >
                        <ProjectCard
                          project={project}
                          index={index}
                          total={localizedProjects.length}
                          t={t}
                          onOpenModal={handleOpenModal}
                        />
                      </div>
                    ))
                  )}
                </div>
              </div>

              {/* Mobile Chevron Navigation Controls */}
              {isMobile && (
                <div className="w-full max-w-5xl flex items-center justify-between mt-6 px-2 z-20">
                  <button
                    onClick={handlePrevProject}
                    className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl border text-xs font-mono font-bold tracking-widest uppercase cursor-pointer"
                    style={{
                      backgroundColor: "var(--surface-raised)",
                      borderColor: "var(--primary-border)",
                      color: "var(--primary)",
                    }}
                  >
                    <ChevronLeft className="w-4 h-4" />
                    <span>PREV</span>
                  </button>

                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold" style={{ color: "var(--primary)" }}>
                      {String(activeProjectIndex + 1).padStart(2, "0")} / {String(localizedProjects.length).padStart(2, "0")}
                    </span>
                  </div>

                  <button
                    onClick={handleNextProject}
                    className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl border text-xs font-mono font-bold tracking-widest uppercase cursor-pointer"
                    style={{
                      backgroundColor: "var(--surface-raised)",
                      borderColor: "var(--primary-border)",
                      color: "var(--primary)",
                    }}
                  >
                    <span>NEXT</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              )}

              {/* Scroll Indicator (Desktop only) */}
              {!isMobile && (
                <div className="absolute inset-x-0 -bottom-4 flex flex-col items-center gap-2 text-[10px] tracking-[0.18em] uppercase pointer-events-none" style={{ color: "var(--text-muted)" }}>
                  <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1">
                    <span>{t.projects.scrollPrompt}</span>
                    <ChevronDown className="w-3.5 h-3.5 animate-bounce" style={{ color: "var(--primary)" }} />
                    {activeProjectIndex < localizedProjects.length - 1 ? (
                      <span>
                        {t.projects.nextPage}{" "}
                        <span className="font-bold" style={{ color: "var(--primary)" }}>
                          {localizedProjects[activeProjectIndex + 1].title}
                        </span>
                      </span>
                    ) : (
                      <span className="font-bold" style={{ color: "var(--primary)" }}>
                        {t.projects.finalPage}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    {localizedProjects.map((project, index) => (
                      <span
                        key={project.id}
                        className="project-progress-track h-1 w-8 overflow-hidden rounded-full"
                        aria-label={`${index + 1} ${t.projects.card.of} ${localizedProjects.length}`}
                      >
                        <span
                          className="project-progress-fill block h-full rounded-full transition-[width] duration-500"
                          style={{
                            width: index <= activeProjectIndex ? "100%" : "0%",
                            boxShadow:
                              index === activeProjectIndex
                                ? "0 0 10px var(--primary)"
                                : "none",
                          }}
                        />
                      </span>
                    ))}
                    <span className="ml-1 font-bold" style={{ color: "var(--primary)" }}>
                      {String(activeProjectIndex + 1).padStart(2, "0")} /{" "}
                      {String(localizedProjects.length).padStart(2, "0")}
                    </span>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-4">
              {localizedProjects.map((project, index) => (
                <ProjectGridCard
                  key={project.id}
                  project={project}
                  index={index}
                  t={t}
                  onOpenModal={handleOpenModal}
                />
              ))}
            </div>
          )
        ) : (
          <div className="text-center py-20 bg-zinc-900/50 rounded-2xl border border-zinc-800">
            <p className="text-zinc-400 font-mono text-sm">
              {t.projects.card.empty || "NO_SYSTEMS_FOUND_FOR_CRITERIA"}
            </p>
          </div>
        )}
      </div>

      {/* Project Detail Modal */}
      <ProjectDetailModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        project={selectedProject}
        t={t}
      />
    </div>
  );
}
