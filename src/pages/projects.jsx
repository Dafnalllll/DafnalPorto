import {
  useState,
  useLayoutEffect,
  useMemo,
  useRef,
  useEffect,
} from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ChevronDown,
} from "lucide-react";
import { projectsData, categories } from "../data/projectsData";
import { translations } from "../data/translations";
import ProjectCanvas from "../components/projects/ProjectCanvas";
import ProjectFilters from "../components/projects/ProjectFilters";
import ProjectCard from "../components/projects/ProjectCard";

gsap.registerPlugin(ScrollTrigger);

export default function Projects() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [activeProjectIndex, setActiveProjectIndex] = useState(0);
  const [lang, setLang] = useState(() => localStorage.getItem("dafa_portfolio_lang") || "id");

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
  const localizedProjects = filteredProjects.map((project) => ({
    ...project,
    ...t.projects.items[project.id],
    category: t.projects.categories[project.category] || project.category,
  }));
  const hasProjects = filteredProjects.length > 0;

  const containerRef = useRef(null);
  const triggerRef = useRef(null);
  const viewportRef = useRef(null);
  const canvasRef = useRef(null);
  const cardsRef = useRef([]);
  const activeProjectIndexRef = useRef(0);
  const sceneProgressRef = useRef({ value: 0 });

  useLayoutEffect(() => {
    activeProjectIndexRef.current = 0;
    sceneProgressRef.current.value = 0;
    setActiveProjectIndex(0);

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
            sceneProgressRef.current.value = timeline.progress();
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
            sceneProgressRef.current,
            {
              value: (i + 1) / (cards.length - 1),
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
  }, [filteredProjects]);

  return (
    <div
      ref={containerRef}
      className="relative min-h-screen overflow-hidden pt-24 pb-16 selection:bg-[var(--primary)] selection:text-black font-sans"
      style={{ color: "var(--text-main)" }}
    >
      {/* 3D WebGL Background Canvas */}
      <ProjectCanvas
        canvasRef={canvasRef}
        viewportRef={viewportRef}
        hasProjects={hasProjects}
        sceneProgressRef={sceneProgressRef}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="mb-12">
          <div className="flex items-center gap-2 text-xs font-semibold tracking-widest mb-3" style={{ color: "var(--primary)" }}>
            <span className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: "var(--primary)" }}></span>
            <span>{t.projects.section || "SYSTEMS // PORTFOLIO_ARCHIVE"}</span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight font-mono uppercase" style={{ color: "var(--text-main)" }}>
            {t.projects.title || "Featured Projects"}
          </h1>
          <p className="text-zinc-400 text-base sm:text-lg max-w-2xl mt-3 font-sans">
            {t.projects.desc || "A curated showcase of high-performance web applications, intelligent agents, and digital architectures."}
          </p>

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
          <div ref={triggerRef} className="relative min-h-[75vh] flex items-center justify-center">
            <div
              ref={viewportRef}
              className="relative w-full max-w-5xl h-[min(580px,calc(100dvh-152px))] min-h-[440px] [perspective:1800px]"
            >
              <div className="relative z-10 w-full h-full" style={{ transformStyle: "preserve-3d" }}>
                {localizedProjects.map((project, index) => (
                  <ProjectCard
                    key={project.id}
                    project={project}
                    index={index}
                    total={localizedProjects.length}
                    cardRef={(el) => (cardsRef.current[index] = el)}
                    t={t}
                  />
                ))}
              </div>
            </div>

            {/* Scroll Indicator */}
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
          </div>
        ) : (
          <div className="text-center py-20 bg-zinc-900/50 rounded-2xl border border-zinc-800">
            <p className="text-zinc-400 font-mono text-sm">
              {t.projects.card.empty || "NO_SYSTEMS_FOUND_FOR_CRITERIA"}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
