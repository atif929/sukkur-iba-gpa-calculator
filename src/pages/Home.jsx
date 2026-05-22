import { useNavigate } from "react-router-dom";
import { GRADE_TABLE } from "../utils/grading";

export default function Home() {
  const nav = useNavigate();

  return (
    <>
      {/* Hero */}
      <section className="hero">
        <div className="container" style={{ position: "relative", zIndex: 1 }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: 40, alignItems: "center" }} className="hero-grid">
            <div>
              <p className="hero-eyebrow">🎓 Sukkur IBA University</p>
              <h1>Calculate Your <span>GPA</span> &<br />CGPA Instantly</h1>
              <p>
                Fast, accurate academic calculator built on Sukkur IBA's
                official grading policy. No registration required.
              </p>
              <div className="hero-actions">
                <button className="btn btn-accent btn-lg" onClick={() => nav("/gpa")}>
                  📊 GPA Calculator
                </button>
                <button
                  className="btn btn-lg"
                  style={{ background: "rgba(255,255,255,0.15)", color: "white", border: "1.5px solid rgba(255,255,255,0.3)" }}
                  onClick={() => nav("/cgpa")}
                >
                  📈 CGPA Calculator
                </button>
              </div>
            </div>

            {/* Stats */}
            <div style={{ display: "grid", gap: 12 }}>
              {[
                { value: "4.00", label: "Max GPA" },
                { value: "9", label: "Grade Levels" },
                { value: "100%", label: "Accurate" },
              ].map(s => (
                <div className="hero-card" key={s.label}>
                  <div className="hero-card-value">{s.value}</div>
                  <div className="hero-card-label">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Feature Cards */}
      <section className="section">
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 20, marginBottom: 48 }}>
            {[
              {
                icon: "📊",
                title: "GPA Calculator",
                desc: "Enter your courses, marks or grades, and get your semester GPA instantly. Supports credit & non-credit courses.",
                action: () => nav("/gpa"),
                cta: "Calculate GPA",
              },
              {
                icon: "📈",
                title: "CGPA Calculator",
                desc: "Combine multiple semesters to calculate your cumulative CGPA and track your academic progress over time.",
                action: () => nav("/cgpa"),
                cta: "Calculate CGPA",
              },
              {
                icon: "📋",
                title: "Grading Policy",
                desc: "View the complete Sukkur IBA grading table with grade points and percentage ranges.",
                action: () => nav("/grading"),
                cta: "View Policy",
              },
            ].map(card => (
              <div className="card" key={card.title} style={{ display: "flex", flexDirection: "column" }}>
                <div style={{ fontSize: 36, marginBottom: 12 }}>{card.icon}</div>
                <h3 style={{ fontSize: 18, marginBottom: 8 }}>{card.title}</h3>
                <p style={{ color: "var(--text-muted)", fontSize: 14, flex: 1, marginBottom: 20 }}>{card.desc}</p>
                <button className="btn btn-primary" onClick={card.action}>{card.cta} →</button>
              </div>
            ))}
          </div>

          {/* Mini Grading Table Preview */}
          <div className="card">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16, flexWrap: "wrap", gap: 8 }}>
              <div>
                <h2 className="section-title">Grading Scale</h2>
                <p className="section-sub">Sukkur IBA University official grading policy</p>
              </div>
              <button className="btn btn-ghost btn-sm" onClick={() => nav("/grading")}>Full Table →</button>
            </div>
            <div style={{ overflowX: "auto" }}>
              <table className="grade-table">
                <thead>
                  <tr>
                    <th>Grade</th>
                    <th>Grade Points</th>
                    <th>Percentage Range</th>
                  </tr>
                </thead>
                <tbody>
                  {GRADE_TABLE.map(g => (
                    <tr key={g.grade}>
                      <td style={{ fontWeight: 700 }}>{g.grade}</td>
                      <td>{g.gp.toFixed(2)}</td>
                      <td>{g.min === 0 ? "Below 60%" : `${g.min}% – ${g.max}%`}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <p>
            GPA Calculator for <strong style={{ color: "white" }}>Sukkur IBA University</strong> — For reference only. Always verify with your faculty.
          </p>
          <p style={{ marginTop: 6, fontSize: 12 }}>Built with ❤️ for IBA students</p>
        </div>
      </footer>
    </>
  );
}