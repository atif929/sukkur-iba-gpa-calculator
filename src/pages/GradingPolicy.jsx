import { GRADE_TABLE } from "../utils/grading";
import PageWrapper from "../components/PageWrapper";

function GradeBar({ gp }) {
  const pct = (gp / 4) * 100;
  const color = gp >= 3.5 ? "var(--success)" : gp >= 2.5 ? "var(--primary)" : gp >= 2.0 ? "var(--warning)" : gp === 0 ? "var(--danger)" : "var(--text-muted)";
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
      <div style={{ flex: 1, height: 6, background: "var(--border)", borderRadius: 99, overflow: "hidden" }}>
        <div style={{ width: `${pct}%`, height: "100%", background: color, borderRadius: 99, transition: "width 0.5s ease" }} />
      </div>
      <span style={{ fontSize: 13, fontWeight: 700, color, minWidth: 32 }}>{gp.toFixed(2)}</span>
    </div>
  );
}

export default function GradingPolicy() {
  return (
    <PageWrapper>
      <div className="container section">
        <div style={{ marginBottom: 28 }}>
          <h1 className="section-title" style={{ fontSize: 26 }}>📋 Grading Policy</h1>
          <p className="section-sub">Official grading scale used by Sukkur IBA University</p>
        </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 24, marginBottom: 24 }}>
        {/* Grade Table */}
        <div className="card" style={{ padding: 0, overflow: "hidden" }}>
          <div style={{ padding: "16px 20px", borderBottom: "1px solid var(--border)", background: "var(--surface2)" }}>
            <strong style={{ fontFamily: "var(--font-display)" }}>Grade Conversion Table</strong>
          </div>
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
                  <td>
                    <span style={{
                      fontFamily: "var(--font-display)",
                      fontWeight: 800,
                      fontSize: 16,
                      color: g.gp === 0 ? "var(--danger)" : g.gp >= 3.5 ? "var(--success)" : "var(--primary)",
                    }}>
                      {g.grade}
                    </span>
                  </td>
                  <td><GradeBar gp={g.gp} /></td>
                  <td style={{ color: "var(--text-muted)", fontSize: 13 }}>
                    {g.min === 0 ? "0% – 59%" : `${g.min}% – ${g.max}%`}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Info cards */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div className="card">
            <h3 style={{ marginBottom: 12 }}>📐 GPA Formula</h3>
            <div style={{
              background: "var(--primary)",
              color: "white",
              borderRadius: "var(--radius)",
              padding: "16px 20px",
              fontFamily: "monospace",
              fontSize: 15,
              lineHeight: 1.8,
            }}>
              GPA = Σ(GP × Credit Hours)<br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;÷ Σ(Credit Hours)
            </div>
            <p style={{ fontSize: 13, color: "var(--text-muted)", marginTop: 12 }}>
              Non-credit courses are excluded from GPA calculation.
            </p>
          </div>

          <div className="card">
            <h3 style={{ marginBottom: 12 }}>📈 CGPA Formula</h3>
            <div style={{
              background: "var(--accent)",
              color: "white",
              borderRadius: "var(--radius)",
              padding: "16px 20px",
              fontFamily: "monospace",
              fontSize: 15,
              lineHeight: 1.8,
            }}>
              CGPA = Σ(Sem GPA × Sem CH)<br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;÷ Σ(Total Credit Hours)
            </div>
          </div>

          <div className="card">
            <h3 style={{ marginBottom: 12 }}>🏅 Academic Standing</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {[
                { label: "Dean's List",       range: "GPA ≥ 3.50", color: "emerald" },
                { label: "Good Standing",     range: "GPA ≥ 3.00", color: "green"   },
                { label: "Satisfactory",      range: "GPA ≥ 2.50", color: "blue"    },
                { label: "Warning",           range: "GPA ≥ 2.00", color: "yellow"  },
                { label: "Academic Probation",range: "GPA < 2.00", color: "red"     },
              ].map(s => (
                <div key={s.label} style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span className={`badge badge-${s.color}`}>{s.label}</span>
                  <span style={{ fontSize: 13, color: "var(--text-muted)" }}>{s.range}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="card">
            <h3 style={{ marginBottom: 12 }}>📊 Percentage Formula</h3>
            <div style={{
              background: "var(--surface2)",
              border: "1.5px solid var(--border)",
              borderRadius: "var(--radius)",
              padding: "14px 18px",
              fontFamily: "monospace",
              fontSize: 14,
            }}>
              % = (Obtained Marks ÷ Total Marks) × 100
            </div>
            <p style={{ fontSize: 13, color: "var(--text-muted)", marginTop: 10 }}>
              Rounded to 2 decimal places.
            </p>
          </div>
        </div>
      </div>

      <div className="card" style={{ background: "var(--primary-light)", border: "1.5px solid var(--primary)" }}>
        <p style={{ color: "var(--primary)", fontSize: 14, fontWeight: 500 }}>
          ⚠️ <strong>Disclaimer:</strong> This calculator is for reference purposes only. Always confirm your grades and standing with your faculty advisor or university ERP portal. The grading policy is based on Sukkur IBA University's official academic regulations.
        </p>
      </div>
    </div>
    </PageWrapper>
  );
}