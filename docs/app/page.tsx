"use client";

import Link from "next/link";

export default function PortalPage() {
  return (
    <div style={{ minHeight: "100vh", backgroundColor: "var(--bg-primary)", color: "var(--text-primary)", fontFamily: "sans-serif" }}>
      {/* Top Bar */}
      <header className="navbar" style={{ justifyContent: "space-between", padding: "16px 24px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <img src="/logo.jpeg" alt="ZaitXCode Logo" height="32" style={{ borderRadius: "8px" }} />
          <span style={{ fontWeight: "700", fontSize: "1.2rem", letterSpacing: "-0.5px" }}>ZaitXCode Developer Hub</span>
        </div>
        <div>
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
      <main style={{ maxWidth: "1000px", margin: "0 auto", padding: "60px 24px" }}>
        {/* Status Badge */}
        <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", padding: "6px 14px", borderRadius: "20px", backgroundColor: "rgba(35, 134, 54, 0.15)", border: "1px solid rgba(35, 134, 54, 0.4)", color: "var(--accent-green)", fontSize: "0.85rem", fontWeight: "600", marginBottom: "24px" }}>
          <span style={{ width: "8px", height: "8px", borderRadius: "50%", backgroundColor: "var(--accent-green)" }}></span>
          Documentation Portal Active &amp; Operational
        </div>

        <h1 style={{ fontSize: "2.8rem", fontWeight: "800", lineHeight: "1.2", marginBottom: "16px", letterSpacing: "-1px" }}>
          ZaitXCode Documentation Portal
        </h1>
        <p style={{ fontSize: "1.15rem", color: "var(--text-secondary)", maxWidth: "700px", lineHeight: "1.6", marginBottom: "48px" }}>
          Official developer documentation, guides, and API references for ZaitXCode open-source Android libraries and tools.
        </p>

        {/* Available Documentation Projects Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "24px" }}>
          {/* Project Card: Android Helper */}
          <div
            style={{
              backgroundColor: "var(--bg-secondary)",
              border: "1px solid var(--border-color)",
              borderRadius: "16px",
              padding: "28px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              transition: "transform 0.2s, border-color 0.2s"
            }}
          >
            <div>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "16px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <span style={{ fontSize: "1.5rem" }}>🤖</span>
                  <h3 style={{ fontSize: "1.3rem", fontWeight: "700" }}>Android Helper</h3>
                </div>
                <span className="brand-badge" style={{ padding: "4px 10px", borderRadius: "12px" }}>v1.0.0-alpha04</span>
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

        {/* General Portal Notice / Footer info */}
        <div style={{ marginTop: "80px", paddingTop: "24px", borderTop: "1px solid var(--border-color)", color: "var(--text-muted)", fontSize: "0.85rem", display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: "12px" }}>
          <span>© 2025–2027 ZaitXCode. All rights reserved.</span>
          <span>Docs Portal Host: <code>docs.zaitxcode.com</code></span>
        </div>
      </main>
    </div>
  );
}
