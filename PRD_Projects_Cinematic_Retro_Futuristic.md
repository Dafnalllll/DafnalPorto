# IMPLEMENTATION PROMPT — Cinematic Retro Futuristic Project Detail Modal

## 1. Role & Objective

Act as a Senior Creative Frontend Engineer specializing in React, Vite, Tailwind CSS, GSAP, ScrollTrigger, Three.js, accessible UI architecture, and high-performance interactive portfolio experiences.

Your task is to inspect and directly modify my existing portfolio repository to implement a fully functional **Project Detail Panel** presented as a large, cinematic modal containing an in-depth project case study.

The portfolio uses a Cinematic Retro Futuristic visual direction, with an editorial white grid background, monochrome typography, charcoal surfaces, and amber accents.

The existing Projects section already uses a book-inspired, two-page card composition with scroll-driven transitions.

The new modal must complement this existing design rather than replace it.

**Primary objective:** transform each project card from a simple project preview into an entry point to a detailed, interactive case study.

Do not create a separate demo application, rebuild the entire website, or replace existing project content with fabricated examples.

Inspect the repository first, then implement the feature directly into the existing codebase.

---

## 2. Technology Stack

Use the existing project stack:

- React
- Vite
- JavaScript JSX
- Tailwind CSS
- GSAP
- GSAP ScrollTrigger
- Three.js
- Lucide React, if already installed or appropriate

Reuse existing dependencies and components wherever possible.

Before installing anything, inspect `package.json` and verify the installed versions.

Do not introduce additional animation or modal libraries unless there is a concrete technical requirement.

---

## 3. Design Direction

Use the visual direction:

**Cinematic Retro Futuristic Editorial + Technical Dossier + Interactive Case Study**

### Color palette

- Editorial white: `#FFFFFF`
- Off-white: `#F7F7F5`
- Charcoal: `#181818`
- Dark surface: `#242424`
- Technical gray: `#888888`
- Primary amber: `#C3851D`

Use amber selectively for active navigation, technical indicators, focus states, progress markers, and subtle highlights.

Avoid excessive neon, strong bloom, persistent glitch effects, and unnecessary gradients.

### Visual characteristics

- Thin technical borders and grid lines.
- Editorial typography with strong hierarchy.
- Monospaced metadata and project identifiers.
- Dark project hero area contrasted with a clean white content area.
- Precise transitions with restrained 3D depth.
- Consistent spacing and readable content widths.
- Technical annotations, section numbering, and progress indicators.
- Subtle shadows and translucent overlays.

The modal should feel like opening a digital project dossier, not opening a generic dashboard dialog.

---

## 4. Entry Point — Existing Project Cards

Integrate the modal into the current Projects section.

When the user activates a project card or its dedicated detail action:

1. Identify the selected project.
2. Open the Project Detail Modal.
3. Display the corresponding project data.
4. Animate the modal entrance using GSAP.
5. Preserve the original card layout and scroll interactions.
6. Allow the user to close the modal and return to the previous browsing position.

Add a clear, accessible detail action such as `EXPLORE PROJECT`, `VIEW CASE STUDY`, or an equivalent label consistent with the current design.

If the card already has clickable source-code or live-demo links, preserve their existing behavior. Do not make every nested link trigger the modal.

Use a single source of truth for project data and the selected project.

Do not duplicate project metadata in separate components.

---

## 5. Modal Architecture and Layout

Create a large centered modal that occupies approximately 85–92% of the desktop viewport width and 85–90% of its height, subject to available screen space.

Use a maximum width appropriate for a detailed editorial case study.

The modal should include:

### A. Backdrop

- A charcoal or near-black translucent overlay.
- Subtle background dimming.
- Optional restrained backdrop blur.
- Smooth entrance and exit transitions.
- Click-outside-to-close behavior, provided it does not conflict with interactions inside the modal.

### B. Dark Technical Header

Use a charcoal background with white typography and amber accents.

Include:

- Project identifier, such as `PROJECT DOSSIER // 02`.
- Current project title.
- Project category.
- Year, when available.
- Actual project status, when available.
- Previous-project button.
- Next-project button.
- Close button.

Keep the header compact enough to preserve space for the case study.

Use a sticky header within the modal if appropriate, ensuring it does not consume excessive vertical space.

### C. Project Hero

Create a prominent visual section containing:

- Project cover image, screenshot, video, or existing media.
- Project title and subtitle.
- Short project summary.
- Technology indicators.
- Relevant metadata.
- Optional technical annotation or visual index.

Use an image-first composition that makes the project recognizable immediately.

For projects with existing screenshots, reuse those assets.

If the repository contains no suitable image, provide a deliberate fallback visual consistent with the design system. Never fabricate a real project screenshot or claim that a placeholder is actual application output.

### D. White Editorial Content Area

The main content area should use a white or off-white background.

Organize the case study into clearly numbered sections, with thin dividers and sufficient whitespace.

Use a two-column layout on wide screens when appropriate, and a single-column layout on narrow screens.

The content must remain readable even when animation is disabled.

---

## 6. Detailed Case Study Sections

Build reusable sections that can be rendered conditionally according to each project's available data.

### Section 01 — Project Overview

Display:

- Project description.
- Project objectives.
- Project type.
- Development period, if available.
- Project status, if available.
- Relevant links.

The overview should explain what the project does and why it exists.

### Section 02 — Problem Statement

Explain the actual problem addressed by the project.

Include, when available:

- Existing limitations.
- Target users.
- Operational or technical challenges.
- Requirements and constraints.

Do not invent problems merely to fill this section.

### Section 03 — Proposed Solution

Describe how the project addresses the identified problem.

Present the solution through concise explanations, visual callouts, and relevant technical information.

### Section 04 — Technical Architecture

Include an architecture diagram or system flow diagram when the project has sufficient technical information.

Examples of diagram elements:

- Frontend.
- Backend.
- API layer.
- Database.
- Machine learning model.
- External services.
- Hardware or IoT devices.
- Data processing pipeline.

Use a reusable React-based diagram component, SVG, or another lightweight approach appropriate to the available information.

Only represent actual system components and connections that can be verified from existing project documentation or code.

If architecture details are missing, display a clear fallback or omit the diagram instead of inventing a system architecture.

### Section 05 — Implementation Process

Describe the actual development workflow.

Where applicable, include:

- Requirements and planning.
- Data preparation.
- Model development.
- API integration.
- Frontend implementation.
- Hardware integration.
- Testing and deployment.

Render this section as a timeline, numbered steps, or technical milestones.

Use the format best suited to each project's development process.

### Section 06 — Screenshots and Gallery

Create a responsive project gallery.

Support:

- Multiple screenshots.
- Captions.
- Screen or feature descriptions.
- Optional full-size image viewing.
- Appropriate image aspect ratios.
- Lazy loading for noncritical images.

Use existing assets from the repository.

If the project has several screenshots, use a visually varied but consistent layout rather than displaying every image as an identical grid card.

Ensure images are optimized and do not cause large layout shifts.

### Section 07 — Technology Stack

Display actual technologies used in the project.

Group them when appropriate:

- Frontend.
- Backend.
- Database.
- Machine learning.
- Infrastructure.
- Hardware.
- Tools.

Use compact technical tags with restrained hover effects.

Do not infer technologies from unrelated projects or add tools that were not used.

### Section 08 — My Role and Contributions

Describe the actual work performed on the project.

Where supported by existing data, include:

- Individual responsibilities.
- Features implemented.
- Architectural decisions.
- Integration work.
- Collaboration context.
- Technical challenges resolved.

If the project is collaborative, distinguish individual contributions from the team's collective output.

Do not fabricate ownership, team size, or responsibilities.

### Section 09 — Evaluation and Results

Provide an evidence-based evaluation section.

For projects with available measurements, display relevant results such as:

- Accuracy, precision, recall, F1-score, or other applicable metrics.
- Latency or processing time.
- Performance measurements.
- Functional testing results.
- User testing results.
- Deployment or integration status.
- Known limitations.

Use charts or metric cards only when actual data exists.

For machine learning projects, clearly distinguish validation metrics, test metrics, and deployment observations when that information is available.

For projects without numerical evaluation, present qualitative testing outcomes or documented implementation achievements.

Do not invent metrics, percentages, user counts, or performance improvements.

If results have not been evaluated, state that the evaluation data is unavailable or not yet conducted.

### Section 10 — Challenges and Lessons Learned

Explain actual technical challenges and the lessons derived from implementation.

Potential areas include:

- Integration issues.
- Performance constraints.
- Model limitations.
- Data quality.
- Responsive layout.
- Deployment problems.
- Scalability and maintainability.

Render this section only when relevant information exists.

### Section 11 — Project Links

Provide clear actions for:

- Source code.
- Live demo.
- Documentation.
- Related publications or presentations, when available.

Use only existing and verified URLs.

Open external destinations safely and preserve their intended behavior.

Hide unavailable actions rather than generating placeholder URLs.

---

## 7. Project Navigation

Implement previous-project and next-project navigation inside the modal.

### Required behavior

- Previous navigates to the previous project in the existing project collection.
- Next navigates to the next project.
- The project title, identifier, status, hero image, gallery, and all sections update together.
- The modal remains open during navigation.
- The modal content returns to the top after changing projects.
- Navigation respects the existing project order.
- At the beginning and end of the collection, either disable the unavailable direction or implement clearly indicated wrapping behavior. Prefer disabled navigation unless the existing portfolio already uses cyclic navigation.
- Disabled buttons must be visually distinct and inaccessible to activation.

Use a coordinated transition between projects rather than abruptly replacing the entire interface.

The transition may include:

1. Brief content fade-out.
2. Subtle horizontal or depth movement.
3. Updating the active project.
4. Content fade-in with a short stagger.
5. Updating the project counter and progress indicator.

Ensure that the animation does not introduce stale content, incorrect links, or race conditions.

---

## 8. GSAP Animation System

Use GSAP to orchestrate modal transitions.

### Opening animation

Create a controlled entrance sequence:

1. Fade in the backdrop.
2. Bring the modal into view using subtle scale and vertical translation.
3. Reveal the dark header.
4. Introduce the project hero.
5. Reveal key metadata and content in a short stagger.

The sequence should feel cinematic without being slow.

### Closing animation

- Animate the modal out smoothly.
- Fade out the backdrop.
- Restore the previous browsing state.
- Return focus to the element that opened the modal.

### Content transitions

Use reusable timelines for changing projects and revealing sections.

Avoid animating every paragraph independently.

Prioritize `transform` and `opacity` for motion effects.

### React lifecycle

- Register `ScrollTrigger` only where required.
- Use `gsap.context()` or an equivalent cleanup-safe approach.
- Revert animations and remove listeners when components unmount.
- Ensure compatibility with React Strict Mode.
- Avoid duplicate timelines and stale references.
- Prevent modal animations from unintentionally affecting the underlying Projects section.

Respect `prefers-reduced-motion`. In reduced-motion mode, show content immediately or use minimal transitions.

---

## 9. Three.js Integration

Three.js should enhance the project hero or a dedicated decorative region, not render the modal's text, controls, or complete interface.

Create an optional reusable visual scene featuring restrained technical elements such as:

- Abstract wireframe geometry.
- Subtle particles.
- Technical coordinate lines.
- A small geometric object.
- Controlled amber lighting.

### Integration requirements

- Keep the scene visually secondary to the project content.
- Use a shared renderer where appropriate.
- Mount the scene only when needed.
- Avoid initializing a new WebGL context for every project navigation.
- Coordinate visual changes with the active project when appropriate.
- Keep camera movement subtle.
- Avoid heavy post-processing.
- Provide a CSS or static-image fallback when WebGL is unavailable.
- Respect reduced-motion preferences.
- Pause unnecessary rendering when the modal is closed or the scene is not visible.
- Dispose of geometry, materials, textures, renderer resources, and event listeners appropriately.

Do not add Three.js merely to satisfy a technology requirement. If a particular project already has compelling screenshots or diagrams, prioritize those visuals over unnecessary 3D effects.

---

## 10. Modal Interaction and Accessibility

Implement the modal with proper accessibility semantics.

Required behaviors:

- Use an appropriate dialog role and accessible name.
- Set `aria-modal="true"` when the modal is open.
- Move focus into the modal when it opens.
- Keep keyboard focus within the modal while it is open.
- Restore focus to the original trigger when it closes.
- Support the Escape key.
- Provide visible focus indicators.
- Use accessible labels for icon-only buttons.
- Prevent the background page from being interacted with while the modal is open.
- Restore background scrolling after closing.
- Avoid nesting interactive elements incorrectly.
- Ensure navigation and close controls work with a keyboard.

Prevent body scroll while the modal is open without breaking the original scroll position or the pinned Projects section.

If the modal contains long content, make its content area independently scrollable.

Do not place the close button in a location where it becomes inaccessible on smaller screens.

---

## 11. Responsive Design

### Desktop

- Center the modal within the viewport.
- Use a large editorial layout.
- Display hero media and text side by side when suitable.
- Use two-column content sections when there is enough space.
- Keep previous, next, and close controls visible.

### Tablet

- Reduce modal padding.
- Adjust hero composition.
- Collapse content columns when necessary.
- Reduce decorative 3D effects.

### Mobile

- Use a near-full-screen modal or a full-screen dialog.
- Use a single-column content layout.
- Keep the header compact.
- Preserve accessible previous, next, and close actions.
- Use responsive screenshots and diagrams.
- Prevent horizontal overflow.
- Ensure long technology labels and project titles wrap correctly.
- Disable unnecessary pointer-driven effects.
- Avoid nested scroll areas where they impair usability.

Test the modal at narrow viewport widths and with long project descriptions.

---

## 12. Project Data Architecture

Inspect the current project data structure before implementation.

Extend the existing structure rather than creating an unrelated data source.

If appropriate, use a structure similar to the following, adapted to the existing naming conventions:

```js
{
  id: "bccare",
  title: "BCCare",
  year: "2024",
  category: "AI / Machine Learning",
  status: "Prototype",

  description: "...",

  overview: {
    objectives: [],
    problem: "...",
    solution: "..."
  },

  architecture: {
    description: "...",
    nodes: [],
    edges: []
  },

  process: [],

  gallery: [
    {
      src: "/images/example.png",
      alt: "Accurate description of the screenshot",
      caption: "..."
    }
  ],

  technologies: [],

  contributions: [],

  evaluation: {
    metrics: [],
    findings: [],
    limitations: []
  },

  challenges: [],

  links: {
    source: null,
    demo: null,
    documentation: null
  }
}
```

This is an illustrative schema, not a requirement to replace the repository's current schema wholesale.

Use optional fields and sensible fallbacks.

Do not hardcode BCCare content into the modal component.

Do not generate fake content to populate missing fields.

Use conditional rendering so every project can have its own appropriate case study depth.

---

## 13. Suggested Component Architecture

Adapt these names to the existing project structure.

Potential components:

- `ProjectDetailModal`
- `ProjectModalHeader`
- `ProjectHero`
- `ProjectOverview`
- `ProjectArchitecture`
- `ProjectProcess`
- `ProjectGallery`
- `ProjectTechnologyStack`
- `ProjectEvaluation`
- `ProjectNavigation`
- `ProjectVisualScene`

Keep components reusable without creating unnecessary abstraction.

Separate concerns between:

- Project data.
- Modal state and navigation.
- GSAP timelines.
- Three.js scene lifecycle.
- Case study content rendering.

The existing Projects section should remain responsible for presenting cards and opening the selected project's details.

---

## 14. Performance and Reliability

The modal must not degrade the existing portfolio experience.

Requirements:

- Avoid unnecessary React re-renders during animation.
- Use refs for GSAP-controlled elements.
- Lazy-load noncritical gallery images.
- Prevent layout shifts by defining image dimensions or aspect ratios.
- Reuse expensive rendering resources when appropriate.
- Avoid creating WebGL contexts for every project.
- Avoid unnecessary state updates during animation frames.
- Prevent duplicate event listeners and scroll locks.
- Ensure modal navigation works after repeated open-close cycles.
- Handle missing images and unavailable links gracefully.
- Maintain readable content if JavaScript animation or WebGL effects are unavailable.
- Avoid unnecessary bundle-size increases.

---

## 15. Implementation Workflow

Follow this sequence.

### Phase 1 — Repository inspection

Inspect:

- Project directory structure.
- `package.json`.
- Existing Projects components.
- Existing project data.
- Current GSAP timelines and ScrollTrigger configuration.
- Tailwind CSS setup.
- Existing media and screenshots.
- Existing source-code and demo links.

Identify integration risks before changing code.

### Phase 2 — Core modal

Implement:

- Selected-project state.
- Modal open and close behavior.
- Backdrop.
- Dark header.
- White content area.
- Previous and next navigation.
- Keyboard interaction.
- Scroll locking and focus management.

Ensure the core modal works before adding decorative effects.

### Phase 3 — Case study content

Implement reusable sections for:

- Overview.
- Problem and solution.
- Architecture diagram.
- Development process.
- Screenshot gallery.
- Technology stack.
- Individual contributions.
- Evaluation and results.
- Challenges and limitations.
- Project links.

Use actual repository data and conditionally hide unavailable sections.

### Phase 4 — Motion design

Add GSAP animations for:

- Modal entrance and exit.
- Header and hero reveal.
- Project-to-project transitions.
- Subtle content staggering.

Ensure that animation cleanup and reduced-motion behavior work correctly.

### Phase 5 — Three.js enhancement

Integrate the decorative 3D scene only after the modal and its content are stable.

Verify performance and fallback behavior.

### Phase 6 — Validation

Run the available linting and production build commands.

Test:

- Opening a modal from each project card.
- Closing via the close button, Escape, and backdrop.
- Previous and next navigation.
- Long content and image galleries.
- Repeated open-close cycles.
- Keyboard-only navigation.
- Reduced-motion preferences.
- Responsive layouts.
- Missing media and links.
- Existing Projects scroll interactions.
- Browser console errors and production build errors.

Fix all issues introduced by the implementation.

Do not claim that a test passed unless it was actually run.

---

## 16. Definition of Done

The implementation is complete when:

1. Every existing project card can open its corresponding detail modal.
2. The modal uses a dark technical header and a white editorial content area.
3. The case study supports detailed content, screenshots, architecture diagrams, and evaluation data.
4. Previous and next navigation works correctly without closing the modal.
5. GSAP animations are coordinated, reversible where appropriate, and cleanup-safe.
6. Three.js remains decorative and does not compromise usability.
7. Keyboard navigation and focus management work correctly.
8. The layout is responsive and has no horizontal overflow.
9. Existing project cards, links, and scroll animations remain functional.
10. Missing data is handled honestly without fabricated project information.
11. There are no new console errors or unresolved production build errors.
12. The implementation integrates with the existing repository rather than existing as a disconnected example.

---

## 17. Expected Deliverables

Implement the feature directly in the existing repository.

After implementation, provide:

1. A concise summary of the changes.
2. A list of modified and newly created files.
3. Any dependencies added and the reason for each.
4. An explanation of the modal state, navigation, and GSAP animation lifecycle.
5. An explanation of the Three.js scene lifecycle and fallback.
6. Instructions for adding case study content to additional projects.
7. Build and validation results, including any remaining issues.

Do not stop at a plan, a visual mockup, or pseudocode. Make the actual code changes.

If a technical assumption conflicts with the existing repository, inspect the code and choose the least disruptive implementation.

**Final creative direction:** Opening a project should feel like entering a cinematic technical dossier. The experience must combine editorial clarity, rich case-study content, restrained amber HUD details, and purposeful motion. Visual effects should reinforce the story of each project, never obscure the engineering work behind it.
