import { Outlet } from "react-router-dom";
import Navbar from "../navbar";
import Footer from "../footer";

export default function MainLayout({ showChrome = true }) {
  return (
    <div
      className="min-h-screen flex flex-col relative overflow-x-hidden transition-colors duration-500"
      style={{ backgroundColor: "var(--bg-main)", color: "var(--text-main)" }}
    >
      {/* Global Cyber Grid Background */}
      <div
        className="fixed inset-0 pointer-events-none z-0 transition-opacity duration-500"
        style={{
          backgroundImage: `
            linear-gradient(var(--primary-border) 1px, transparent 1px),
            linear-gradient(90deg, var(--primary-border) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
          opacity: 0.12,
        }}
      />

      {/* Scanline overlay */}
      <div
        className="fixed inset-0 pointer-events-none opacity-20 z-0"
        style={{
          backgroundImage:
            "linear-gradient(var(--scanline-color) 50%, transparent 50%)",
          backgroundSize: "100% 4px",
        }}
      ></div>

      <div className="relative z-10 flex flex-col min-h-screen">
        {showChrome && <Navbar />}
        <main className={`flex-1 ${showChrome ? "pt-24" : ""}`}>
          <Outlet />
        </main>
        {showChrome && <Footer />}
      </div>
    </div>
  );
}
