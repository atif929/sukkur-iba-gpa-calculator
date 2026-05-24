import { useState } from "react";
import CGPAResult from "../components/CGPAResult";
import { calculateCGPA } from "../utils/grading";
import PageWrapper from "../components/PageWrapper";

const defaultSemester = (n) => ({ label: `Semester ${n}`, gpa: "", creditHours: "18" });

export default function CGPACalculator() {
  const [semesters, setSemesters] = useState([defaultSemester(1), defaultSemester(2)]);
  const [result, setResult] = useState(null);
  const [errors, setErrors] = useState({});
  const [showErrors, setShowErrors] = useState(false);

  const updateSemester = (index, field, value) =>
    setSemesters(prev => prev.map((s, i) => i === index ? { ...s, [field]: value } : s));
  const addSemester = () => setSemesters(prev => [...prev, defaultSemester(prev.length + 1)]);
  const removeSemester = (index) => { if (semesters.length > 1) setSemesters(prev => prev.filter((_, i) => i !== index)); };

  const validate = () => {
    const errs = {};
    semesters.forEach((s, i) => {
      const gpa = parseFloat(s.gpa);
      const ch = parseFloat(s.creditHours);
      if (isNaN(gpa) || gpa < 0 || gpa > 4) errs[`gpa_${i}`] = "Must be 0–4.00";
      if (isNaN(ch) || ch <= 0) errs[`ch_${i}`] = "Required";
    });
    return errs;
  };

  const handleCalculate = () => {
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); setShowErrors(true); return; }
    setErrors({}); setShowErrors(false);
    setResult(calculateCGPA(semesters));
    setTimeout(() => document.getElementById("cgpa-result")?.scrollIntoView({ behavior: "smooth" }), 100);
  };

  return (
    <PageWrapper>
      <div className="container section">
        <div style={{ marginBottom: 20 }}>
          <h1 className="section-title" style={{ fontSize: 24 }}>📈 CGPA Calculator</h1>
          <p className="section-sub">Enter each semester's GPA and credit hours</p>
        </div>

      <div style={{
        background: "linear-gradient(135deg, var(--primary), #1a6fcc)",
        borderRadius: "var(--radius)", padding: "12px 16px",
        marginBottom: 16, color: "white", fontSize: 13, textAlign: "center"
      }}>
        CGPA = Σ(GPA × Credit Hours) ÷ Σ(Total Credit Hours)
      </div>

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
        <span style={{ fontSize: 13, color: "var(--text-muted)", fontWeight: 600 }}>
          {semesters.length} SEMESTER{semesters.length !== 1 ? "S" : ""}
        </span>
        <button className="btn btn-ghost btn-sm" onClick={() => { setSemesters([defaultSemester(1), defaultSemester(2)]); setResult(null); setShowErrors(false); }}>
          🗑 Clear All
        </button>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 16 }}>
        {semesters.map((s, i) => (
          <div key={i} style={{
            background: "var(--surface)", border: "1.5px solid var(--border)",
            borderRadius: "var(--radius)", padding: 14
          }}>
            <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 10 }}>
              <input type="text" className="form-input" value={s.label}
                onChange={e => updateSemester(i, "label", e.target.value)}
                placeholder={`Semester ${i + 1}`} style={{ fontWeight: 600, flex: 1 }} />
              <button type="button" onClick={() => removeSemester(i)}
                style={{
                  width: 36, height: 36, borderRadius: 8,
                  background: "#fff0f0", border: "1.5px solid #fecaca",
                  color: "var(--danger)", fontSize: 16, cursor: "pointer",
                  display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0
                }}>✕</button>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
              <div className="form-group">
                <label className="form-label">Semester GPA</label>
                <input type="number"
                  className={`form-input${showErrors && errors[`gpa_${i}`] ? " error" : ""}`}
                  placeholder="e.g. 3.50" step="0.01" min="0" max="4"
                  value={s.gpa} onChange={e => updateSemester(i, "gpa", e.target.value)} />
                {showErrors && errors[`gpa_${i}`] && <span className="form-error">{errors[`gpa_${i}`]}</span>}
              </div>
              <div className="form-group">
                <label className="form-label">Credit Hours</label>
                <input type="number"
                  className={`form-input${showErrors && errors[`ch_${i}`] ? " error" : ""}`}
                  placeholder="e.g. 18" min="1"
                  value={s.creditHours} onChange={e => updateSemester(i, "creditHours", e.target.value)} />
                {showErrors && errors[`ch_${i}`] && <span className="form-error">{errors[`ch_${i}`]}</span>}
              </div>
            </div>

            {s.gpa && s.creditHours && !isNaN(parseFloat(s.gpa)) && (
              <div style={{ marginTop: 8, fontSize: 12, color: "var(--primary)", fontWeight: 600 }}>
                Weighted: {(parseFloat(s.gpa) * parseFloat(s.creditHours)).toFixed(2)} pts
              </div>
            )}
          </div>
        ))}
      </div>

      <button className="btn btn-ghost" onClick={addSemester}
        style={{ width: "100%", justifyContent: "center", marginBottom: 16, border: "1.5px dashed var(--border)" }}>
        + Add Semester
      </button>

      <button className="btn btn-primary" onClick={handleCalculate}
        style={{ width: "100%", justifyContent: "center", padding: "14px", fontSize: 16, borderRadius: "var(--radius)", marginBottom: 40 }}>
        ✓ Calculate CGPA
      </button>

      {result && (
        <div id="cgpa-result">
          <hr className="divider" />
          <CGPAResult result={result} semesters={semesters}
            onReset={() => { setResult(null); window.scrollTo({ top: 0, behavior: "smooth" }); }} />
        </div>
      )}

      <footer className="footer" style={{ marginLeft: -14, marginRight: -14, marginTop: 48, borderRadius: "0 0 16px 16px" }}>
        <p>CGPA Calculator — Sukkur IBA University | For reference only</p>
      </footer>
    </div>
    </PageWrapper>
  );
}