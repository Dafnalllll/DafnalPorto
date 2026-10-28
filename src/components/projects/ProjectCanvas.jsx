import React, { useLayoutEffect } from "react";

export default function ProjectCanvas({ canvasRef, viewportRef, hasProjects, sceneProgressRef }) {
  useLayoutEffect(() => {
    const canvas = canvasRef.current;
    const viewport = viewportRef.current;
    if (!canvas || !viewport) return;

    let disposed = false;
    let frameId;
    let renderer;
    let resizeObserver;
    let geometryResources = [];

    import("three")
      .then(
        ({
          WebGLRenderer,
          Scene,
          PerspectiveCamera,
          Color,
          Group,
          IcosahedronGeometry,
          MeshBasicMaterial,
          Mesh,
          TorusGeometry,
          BufferGeometry,
          BufferAttribute,
          PointsMaterial,
          Points,
          Clock,
        }) => {
        if (disposed) return;

        const context =
          canvas.getContext("webgl2", { alpha: true, antialias: true }) ??
          canvas.getContext("webgl", { alpha: true, antialias: true });

        if (!context) {
          console.warn(
            "WebGL is unavailable; showing project cards without 3D effects."
          );
          return;
        }

        renderer = new WebGLRenderer({
          canvas,
          context,
          alpha: true,
          antialias: true,
          powerPreference: "high-performance",
        });

        const scene = new Scene();
        const camera = new PerspectiveCamera(36, 1, 0.1, 100);
        camera.position.set(0, 0, 7.8);

        const primaryColor =
          getComputedStyle(document.documentElement)
            .getPropertyValue("--primary")
            .trim() || "#00f0ff";
        const color = new Color(primaryColor);

        const rig = new Group();
        scene.add(rig);

        const orb = new Group();
        rig.add(orb);

        const coreGeometry = new IcosahedronGeometry(1.35, 2);
        geometryResources.push(coreGeometry);
        const coreMaterial = new MeshBasicMaterial({
          color,
          wireframe: true,
          transparent: true,
          opacity: 0.38,
        });
        const core = new Mesh(coreGeometry, coreMaterial);
        orb.add(core);

        const ringGeometry = new TorusGeometry(2, 0.008, 4, 160);
        geometryResources.push(ringGeometry);
        const ringMaterial = new MeshBasicMaterial({
          color,
          transparent: true,
          opacity: 0.22,
        });
        const ring = new Mesh(ringGeometry, ringMaterial);
        ring.rotation.x = Math.PI * 0.35;
        orb.add(ring);

        const particleCount = 360;
        const particlePositions = new Float32Array(particleCount * 3);
        for (let i = 0; i < particleCount; i++) {
          const u = Math.random();
          const v = Math.random();
          const theta = u * 2.0 * Math.PI;
          const phi = Math.acos(2.0 * v - 1.0);
          const r = 2.6 + Math.random() * 1.4;
          particlePositions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
          particlePositions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
          particlePositions[i * 3 + 2] = r * Math.cos(phi);
        }
        const particleGeometry = new BufferGeometry();
        geometryResources.push(particleGeometry);
        particleGeometry.setAttribute(
          "position",
          new BufferAttribute(particlePositions, 3)
        );
        const particleMaterial = new PointsMaterial({
          color,
          size: 0.024,
          transparent: true,
          opacity: 0.45,
        });
        const particles = new Points(particleGeometry, particleMaterial);
        rig.add(particles);

        const resize = () => {
          const { clientWidth, clientHeight } = viewport;
          if (!clientWidth || !clientHeight) return;
          renderer.setSize(clientWidth, clientHeight, false);
          renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
          camera.aspect = clientWidth / clientHeight;
          camera.updateProjectionMatrix();
        };

        resizeObserver = new ResizeObserver(() => resize());
        resizeObserver.observe(viewport);
        resize();

        const clock = new Clock();
        const render = () => {
          const elapsed = clock.getElapsedTime();
          const progress = sceneProgressRef.current.value;
          const baseX = viewport.clientWidth < 640 ? 1.15 : 3.2;

          orb.rotation.y = elapsed * 0.12 + progress * Math.PI * 0.9;
          orb.rotation.x = Math.sin(elapsed * 0.08) * 0.2 + progress * 0.4;
          particles.rotation.y = -elapsed * 0.06;

          rig.position.x = baseX + Math.sin(elapsed * 0.2) * 0.1;
          rig.position.y = Math.cos(elapsed * 0.18) * 0.1;

          renderer.render(scene, camera);
          frameId = window.requestAnimationFrame(render);
        };

        frameId = window.requestAnimationFrame(render);
      })
      .catch((error) => {
        if (!disposed) {
          console.error("Unable to initialize the Three.js project scene.", error);
        }
      });

    return () => {
      disposed = true;
      window.cancelAnimationFrame(frameId);
      resizeObserver?.disconnect();
      geometryResources.forEach((resource) => resource.dispose());
      renderer?.dispose();
    };
  }, [hasProjects, canvasRef, viewportRef, sceneProgressRef]);

  return (
    <div
      ref={viewportRef}
      className="absolute inset-0 pointer-events-none overflow-hidden z-0"
    >
      <canvas
        ref={canvasRef}
        className="w-full h-full block touch-none"
      />
    </div>
  );
}
