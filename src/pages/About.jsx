import PageWrapper from "../components/PageWrapper";

export default function About() {
  return (
    <PageWrapper>
      <div className="container section">

      <div style={{
        background: "linear-gradient(135deg, var(--primary), #1a6fcc)",
        borderRadius: "var(--radius-lg)", padding: "36px 28px",
        color: "white", marginBottom: 24, textAlign: "center"
      }}>
        <div style={{
          width: 72, height: 72, borderRadius: 18,
          background: "rgba(255,255,255,0.15)",
          border: "1.5px solid rgba(255,255,255,0.3)",
          display: "flex", alignItems: "center", justifyContent: "center",
          margin: "0 auto 16px",
          fontSize: 28, fontWeight: 800, fontFamily: "var(--font-display)"
        }}>IBA</div>
        <h1 style={{ fontSize: 26, margin: "0 0 8px" }}>Sukkur IBA GPA Calculator</h1>
        <p style={{ opacity: 0.8, fontSize: 14, maxWidth: 420, margin: "0 auto" }}>
          A free academic tool built specifically for Sukkur IBA University students
        </p>
      </div>

      <div className="card" style={{ marginBottom: 16 }}>
        <h2 style={{ fontSize: 18, marginBottom: 12 }}>📌 About This Project</h2>
        <p style={{ color: "var(--text-muted)", fontSize: 14, lineHeight: 1.8, marginBottom: 10 }}>
          Every semester, Sukkur IBA students finish their exams and wait anxiously for results — not knowing where they stand academically. The official ERP portal takes time to update, leaving students uncertain about their GPA and CGPA.
        </p>
        <p style={{ color: "var(--text-muted)", fontSize: 14, lineHeight: 1.8 }}>
          This calculator was built to solve exactly that problem. It uses Sukkur IBA's <strong>official grading policy</strong> to give students an accurate estimate of their academic performance — instantly, for free, without any login.
        </p>
      </div>

      <div className="card" style={{ marginBottom: 16 }}>
        <h2 style={{ fontSize: 18, marginBottom: 16 }}>✅ What It Can Do</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 12 }}>
          {[
            { icon: "📊", text: "Calculate Semester GPA" },
            { icon: "📈", text: "Calculate Cumulative CGPA" },
            { icon: "🎯", text: "Marks or Grade input" },
            { icon: "📋", text: "Official IBA grading policy" },
            { icon: "📱", text: "Works on mobile & desktop" },
            { icon: "⬇️", text: "Export results as PDF" },
            { icon: "🔒", text: "No login, no data stored" },
            { icon: "💯", text: "100% Free forever" },
          ].map(f => (
            <div key={f.text} style={{
              display: "flex", alignItems: "center", gap: 10,
              background: "var(--surface2)", borderRadius: "var(--radius-sm)",
              padding: "10px 14px", fontSize: 13, fontWeight: 500
            }}>
              <span>{f.icon}</span> {f.text}
            </div>
          ))}
        </div>
      </div>

      <div className="card" style={{ marginBottom: 16 }}>
        <h2 style={{ fontSize: 18, marginBottom: 16 }}>👨‍💻 Developer</h2>
        <div style={{ display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap" }}>
          <div style={{
            width: 64, height: 64, borderRadius: "50%",
            background: "linear-gradient(135deg, var(--primary), #1a6fcc)",
            display: "flex", alignItems: "center", justifyContent: "center",
            color: "white", fontSize: 24, fontWeight: 800,
            fontFamily: "var(--font-display)", flexShrink: 0
          }}>A</div>
          <div>
            <h3 style={{ fontSize: 18, margin: "0 0 4px" }}>Atif Siyal</h3>
            <p style={{ color: "var(--text-muted)", fontSize: 13, margin: "0 0 8px" }}>
              Student — Sukkur IBA University
            </p>
            <span className="badge badge-blue">Built for IBA Students 💙</span>
          </div>
        </div>
      </div>

      <div style={{
        background: "var(--primary-light)", border: "1.5px solid var(--primary)",
        borderRadius: "var(--radius)", padding: "14px 18px", fontSize: 13,
        color: "var(--primary)", lineHeight: 1.7
      }}>
        ⚠️ <strong>Disclaimer:</strong> This calculator is for reference purposes only and is not officially affiliated with Sukkur IBA University. Always verify your final results through the official ERP portal or your academic advisor.
      </div>

    </div>
    </PageWrapper>
  );
}