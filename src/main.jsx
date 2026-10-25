import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";

const savedTheme = localStorage.getItem("dafa_portfolio_theme");
if (savedTheme) {
  document.documentElement.setAttribute("data-theme", savedTheme);
}

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <StrictMode>
      <App />
    </StrictMode>
  </BrowserRouter>,
);
