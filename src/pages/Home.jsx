import { useNavigate } from "react-router-dom";
import { GRADE_TABLE } from "../utils/grading";

export default function Home() {
  const nav = useNavigate();

  return (
    <>
      <section className="hero">
        <div className="container" style={{ position: "relative", zIndex: 1 }}>
          <p className="hero-eyebrow">🎓 Sukkur IBA University</p>
          <h1>Calculate Your <span>GPA</span> &<br />CGPA Instantly</h1>
          <p>Fast, accurate academic calculator built on Sukkur IBA's official grading policy. No registration required.</p>

          <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 28 }}>
            {[{ v: "4.00", l: "Max GPA" }, { v: "9", l: "Grade Levels" }, { v: "100%", l: "Free" }].map(s => (
              <div key={s.l} style={{
                background: "rgba(255,255,255,0.15)", backdropFilter: "blur(8px)",
                border: "1px solid rgba(255,255,255,0.25)", borderRadius: 50,
                padding: "6px 16px", display: "flex", alignItems: "center", gap: 8
              }}>
                <span style={{ fontWeight: 800, fontSize: 15 }}>{s.v}</span>
                <span style={{ opacity: 0.75, fontSize: 12 }}>{s.l}</span>
              </div>
            ))}
          </div>

          <div className="hero-actions">
            <button className="btn btn-accent btn-lg" onClick={() => nav("/gpa")}>📊 GPA Calculator</button>
            <button className="btn btn-lg"
              style={{ background: "rgba(255,255,255,0.15)", color: "white", border: "1.5px solid rgba(255,255,255,0.3)" }}
              onClick={() => nav("/cgpa")}>📈 CGPA Calculator</button>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 16, marginBottom: 32 }}>
            {[
              { icon: "📊", title: "GPA Calculator", desc: "Enter courses with marks or grades. Supports credit & non-credit courses.", action: () => nav("/gpa"), cta: "Calculate GPA" },
              { icon: "📈", title: "CGPA Calculator", desc: "Combine multiple semesters to track your cumulative academic progress.", action: () => nav("/cgpa"), cta: "Calculate CGPA" },
              { icon: "📋", title: "Grading Policy", desc: "View the complete Sukkur IBA grading table with grade points and ranges.", action: () => nav("/grading"), cta: "View Policy" },
            ].map(card => (
              <div className="card" key={card.title} style={{ display: "flex", flexDirection: "column" }}>
                <div style={{ fontSize: 32, marginBottom: 10 }}>{card.icon}</div>
                <h3 style={{ fontSize: 17, marginBottom: 6 }}>{card.title}</h3>
                <p style={{ color: "var(--text-muted)", fontSize: 14, flex: 1, marginBottom: 16 }}>{card.desc}</p>
                <button className="btn btn-primary" style={{ width: "100%", justifyContent: "center" }} onClick={card.action}>{card.cta} →</button>
              </div>
            ))}
          </div>

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
                <thead><tr><th>Grade</th><th>Grade Points</th><th>Percentage Range</th></tr></thead>
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

      <footer className="footer">
        <div className="container">
          <p>GPA Calculator for <strong style={{ color: "white" }}>Sukkur IBA University</strong> — For reference only.</p>
          <p style={{ marginTop: 6, fontSize: 12 }}>Built with ❤️ for IBA students</p>
        </div>
      </footer>
    </>
  );
}