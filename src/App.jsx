import React from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Dafnal from "./pages/dafnal";
import Home from "./pages/home";
import About from "./pages/about";
import Projects from "./pages/projects";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Dafnal />} />
      <Route path="/home" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/projects" element={<Projects />} />
    </Routes>
  );
}

export default App;
