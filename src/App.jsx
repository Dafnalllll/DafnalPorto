import { lazy, Suspense, useCallback, useEffect, useRef, useState } from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Loader from "./components/loader";

const Dafnal = lazy(() => import("./pages/dafnal"));
const Home = lazy(() => import("./pages/home"));
const About = lazy(() => import("./pages/about"));
const Projects = lazy(() => import("./pages/projects"));
const NotFound = lazy(() => import("./pages/notfound"));
const MainLayout = lazy(() => import("./components/layouts/mainlayout"));

const LOADER_MIN_DURATION = 3000;
const LOADER_EXIT_DURATION = 560;

function SuspenseLoaderSignal({ onStart, onFinish }) {
  useEffect(() => {
    onStart();
    return onFinish;
  }, [onStart, onFinish]);

  return null;
}

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [isLoaderExiting, setIsLoaderExiting] = useState(false);
  const startedAtRef = useRef(0);
  const hideTimerRef = useRef(null);
  const exitTimerRef = useRef(null);

  const handleLoadStart = useCallback(() => {
    window.clearTimeout(hideTimerRef.current);
    window.clearTimeout(exitTimerRef.current);
    startedAtRef.current = performance.now();
    setIsLoaderExiting(false);
    setIsLoading(true);
  }, []);

  const handleLoadFinish = useCallback(() => {
    const reduceMotion = window.matchMedia?.(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reduceMotion) {
      setIsLoading(false);
      setIsLoaderExiting(false);
      return;
    }

    const beginExit = () => {
      setIsLoaderExiting(true);
      exitTimerRef.current = window.setTimeout(() => {
        setIsLoading(false);
        setIsLoaderExiting(false);
      }, LOADER_EXIT_DURATION);
    };

    const elapsed = performance.now() - startedAtRef.current;
    const remaining = Math.max(0, LOADER_MIN_DURATION - elapsed);

    hideTimerRef.current = window.setTimeout(() => {
      beginExit();
    }, remaining);
  }, []);

  useEffect(
    () => () => {
      window.clearTimeout(hideTimerRef.current);
      window.clearTimeout(exitTimerRef.current);
    },
    []
  );

  return (
    <>
      {isLoading && <Loader isExiting={isLoaderExiting} />}
      <Suspense
        fallback={
          <SuspenseLoaderSignal
            onStart={handleLoadStart}
            onFinish={handleLoadFinish}
          />
        }
      >
        <Routes>
          <Route path="/" element={<Dafnal />} />
          <Route element={<MainLayout />}>
            <Route path="/home" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/projects" element={<Projects />} />
          </Route>
          <Route element={<MainLayout showChrome={false} />}>
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
