"use client";

import Link from "next/link";
import { useTheme } from "@/components/use-theme";
import { useReveal } from "@/components/use-reveal";
import { useTilt } from "@/components/use-tilt";

export default function PortalPage() {
  const { theme, toggleTheme } = useTheme();
  useReveal();
  const cardRef = useTilt<HTMLDivElement>(9);

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "var(--bg-primary)", color: "var(--text-primary)", fontFamily: "sans-serif", position: "relative" }}>
      {/* Top Bar */}
      <header className="navbar" style={{ justifyContent: "space-between", padding: "16px 24px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <img src="/logo.jpeg" alt="ZaitXCode Logo" height="32" style={{ borderRadius: "8px" }} />
          <span style={{ fontWeight: "700", fontSize: "1.2rem", letterSpacing: "-0.5px" }}>ZaitXCode Developer Hub</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <button
            className="btn-icon"
            onClick={toggleTheme}
            title={theme === "dark" ? "Switch to light theme" : "Switch to dark theme"}
            aria-label={theme === "dark" ? "Switch to light theme" : "Switch to dark theme"}
          >
            <i className={theme === "dark" ? "bi bi-sun-fill" : "bi bi-moon-stars-fill"}></i>
          </button>
          <a
            href="https://github.com/zaitxcode"
            target="_blank"
            rel="noreferrer"
            className="btn-icon"
            style={{ textDecoration: "none", color: "var(--text-primary)", display: "flex", alignItems: "center", gap: "8px", fontSize: "0.9rem" }}
          >
            <i className="bi bi-github" style={{ fontSize: "1.1rem" }}></i>
            <span>GitHub</span>
          </a>
        </div>
      </header>

      {/* Main Hero Container */}
      <main style={{ maxWidth: "1000px", margin: "0 auto", padding: "60px 24px", position: "relative", zIndex: 1 }}>
        <div className="hero-orbs" aria-hidden="true">
          <span className="orb orb-1"></span>
          <span className="orb orb-2"></span>
        </div>

        {/* Status Badge */}
        <div
          data-reveal
          className="badge-pill"
          style={{ display: "inline-flex", alignItems: "center", gap: "8px", padding: "6px 14px", borderRadius: "20px", backgroundColor: "var(--bg-tertiary)", border: "1px solid var(--border-color)", color: "var(--accent-blue)", fontSize: "0.85rem", fontWeight: "600", marginBottom: "24px" }}
        >
          <span className="dot-pulse" style={{ width: "8px", height: "8px", borderRadius: "50%", backgroundColor: "var(--accent-green)" }}></span>
          Documentation Portal Active &amp; Operational
        </div>

        <h1 data-reveal data-delay="80" style={{ fontSize: "2.8rem", fontWeight: "800", lineHeight: "1.2", marginBottom: "16px", letterSpacing: "-1px" }}>
          ZaitXCode Documentation Portal
        </h1>
        <p data-reveal data-delay="160" style={{ fontSize: "1.15rem", color: "var(--text-secondary)", maxWidth: "700px", lineHeight: "1.6", marginBottom: "48px" }}>
          Official developer documentation, guides, and API references for ZaitXCode open-source Android libraries and tools.
        </p>

        {/* Available Documentation Projects Grid */}
        <div className="grid-3" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "24px" }}>
          {/* Project Card: Android Helper */}
          <div
            ref={cardRef}
            data-tilt="9"
            data-reveal
            className="feature-card"
            style={{
              backgroundColor: "var(--bg-card)",
              border: "1px solid var(--border-color)",
              borderRadius: "16px",
              padding: "28px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between"
            }}
          >
            <div>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "16px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <span style={{ fontSize: "1.5rem" }}>&#129302;</span>
                  <h3 style={{ fontSize: "1.3rem", fontWeight: "700" }}>Android Helper</h3>
                </div>
                <span className="brand-badge" style={{ padding: "4px 10px", borderRadius: "12px" }}>v1.0.0-beta02</span>
              </div>
              <p style={{ color: "var(--text-secondary)", fontSize: "0.95rem", lineHeight: "1.5", marginBottom: "24px" }}>
                Enterprise-grade Kotlin &amp; Flutter utility library for Android — Network, Audio, Vibration, Biometrics, Secure Intents, Notifications, Cryptography, and Storage.
              </p>
            </div>

            <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
              <Link
                href="/androidhelper/"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  backgroundColor: "var(--accent-color)",
                  color: "#ffffff",
                  padding: "10px 18px",
                  borderRadius: "10px",
                  fontWeight: "600",
                  fontSize: "0.9rem",
                  textDecoration: "none"
                }}
              >
                <span>Documentation (English)</span>
                <i className="bi bi-arrow-right"></i>
              </Link>
              <Link
                href="/androidhelper/ar/"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  backgroundColor: "var(--bg-tertiary)",
                  color: "var(--text-primary)",
                  border: "1px solid var(--border-color)",
                  padding: "10px 18px",
                  borderRadius: "10px",
                  fontWeight: "600",
                  fontSize: "0.9rem",
                  textDecoration: "none"
                }}
              >
                <span>التوثيق العربي</span>
                <i className="bi bi-translate"></i>
              </Link>
            </div>
          </div>
        </div>
      </main>

      {/* Footer — centered & sticky */}
      <footer data-reveal>
        <div className="footer-links">
          <a href="https://docs.zaitxcode.com" className="docs-link">docs.zaitxcode.com</a>
          <a href="https://github.com/zaitxcode" target="_blank" rel="noreferrer">GitHub</a>
        </div>
        <p>&copy; 2026 ZaitXCode. All rights reserved.</p>
      </footer>
    </div>
  );
}
