import { lazy, Suspense, useEffect, useState } from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Loader from "./components/loader";

const Dafnal = lazy(() => import("./pages/dafnal"));
const Home = lazy(() => import("./pages/home"));
const About = lazy(() => import("./pages/about"));
const Projects = lazy(() => import("./pages/projects"));
const NotFound = lazy(() => import("./pages/notfound"));
const MainLayout = lazy(() => import("./components/layouts/mainlayout"));

function App() {
  const [showInitialLoader, setShowInitialLoader] = useState(true);

  useEffect(() => {
    const timer = window.setTimeout(() => setShowInitialLoader(false), 1200);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <>
      {showInitialLoader && <Loader />}
      <Suspense fallback={showInitialLoader ? null : <Loader />}>
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
