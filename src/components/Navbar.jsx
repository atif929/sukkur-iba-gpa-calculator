import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import DarkToggle from "./DarkToggle";

export default function Navbar({ dark, toggleDark }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [installPrompt, setInstallPrompt] = useState(null);
  const [installed, setInstalled] = useState(false);

  useEffect(() => {
    window.addEventListener("beforeinstallprompt", e => {
      e.preventDefault();
      setInstallPrompt(e);
    });
    window.addEventListener("appinstalled", () => setInstalled(true));
  }, []);

  const handleInstall = async () => {
    if (!installPrompt) return;
    installPrompt.prompt();
    const { outcome } = await installPrompt.userChoice;
    if (outcome === "accepted") setInstalled(true);
    setInstallPrompt(null);
  };

  const links = [
    { to: "/", label: "Home", end: true },
    { to: "/gpa", label: "GPA" },
    { to: "/cgpa", label: "CGPA" },
    { to: "/grading", label: "Grading" },
    { to: "/faq", label: "FAQ" },
    { to: "/about", label: "About" },
  ];

  return (
    <nav className="navbar">
      <div className="container navbar-inner">
        <NavLink to="/" className="navbar-brand">
          <div className="navbar-logo">IBA</div>
          <div>
            <div className="navbar-title">GPA Calculator</div>
            <div className="navbar-subtitle">Sukkur IBA University</div>
          </div>
        </NavLink>

        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div className="navbar-links" style={{ display: "flex" }}>
            {links.map(l => (
              <NavLink key={l.to} to={l.to} end={l.end}
                className={({ isActive }) => "nav-link" + (isActive ? " active" : "")}>
                {l.label}
              </NavLink>
            ))}
          </div>

          {installPrompt && !installed && (
            <button onClick={handleInstall} className="btn btn-accent btn-sm" title="Install as App">
              Install App
            </button>
          )}

          <DarkToggle dark={dark} toggle={toggleDark} />

          <button onClick={() => setMenuOpen(!menuOpen)} className="hamburger-btn"
            aria-label="Menu" style={{
              display: "none", background: "none", border: "1.5px solid var(--border)",
              borderRadius: 8, padding: "6px 10px", cursor: "pointer", fontSize: 18,
              color: "var(--text)"
            }}>☰</button>
        </div>
      </div>

      {menuOpen && (
        <div style={{
          background: "var(--surface)", borderTop: "1px solid var(--border)",
          padding: "10px 16px", display: "flex", flexDirection: "column", gap: 4
        }}>
          {links.map(l => (
            <NavLink key={l.to} to={l.to} end={l.end}
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) => "nav-link" + (isActive ? " active" : "")}
              style={{ display: "block" }}>
              {l.label}
            </NavLink>
          ))}
          {installPrompt && !installed && (
            <button onClick={handleInstall} className="btn btn-accent btn-sm"
              style={{ marginTop: 8, justifyContent: "center" }}>
              📲 Install App
            </button>
          )}
        </div>
      )}
    </nav>
  );
}