import { useState } from "react";
import CGPAResult from "../components/CGPAResult";
import { calculateCGPA } from "../utils/grading";

const defaultSemester = (n) => ({
  label: `Semester ${n}`,
  gpa: "",
  creditHours: "18",
});

export default function CGPACalculator() {
  const [semesters, setSemesters] = useState([defaultSemester(1), defaultSemester(2)]);
  const [result, setResult] = useState(null);
  const [errors, setErrors] = useState({});
  const [showErrors, setShowErrors] = useState(false);

  const updateSemester = (index, field, value) => {
    setSemesters(prev => prev.map((s, i) => i === index ? { ...s, [field]: value } : s));
  };

  const addSemester = () => {
    setSemesters(prev => [...prev, defaultSemester(prev.length + 1)]);
  };

  const removeSemester = (index) => {
    if (semesters.length <= 1) return;
    setSemesters(prev => prev.filter((_, i) => i !== index));
  };

  const validate = () => {
    const errs = {};
    semesters.forEach((s, i) => {
      const gpa = parseFloat(s.gpa);
      const ch  = parseFloat(s.creditHours);
      if (isNaN(gpa) || gpa < 0 || gpa > 4) errs[`gpa_${i}`] = "GPA must be 0–4.00";
      if (isNaN(ch) || ch <= 0)              errs[`ch_${i}`]  = "Must be positive";
    });
    return errs;
  };

  const handleCalculate = () => {
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      setShowErrors(true);
      return;
    }
    setErrors({});
    setShowErrors(false);
    setResult(calculateCGPA(semesters));
    setTimeout(() => document.getElementById("cgpa-result")?.scrollIntoView({ behavior: "smooth" }), 100);
  };

  return (
    <div className="container section">
      <div style={{ marginBottom: 28 }}>
        <h1 className="section-title" style={{ fontSize: 26 }}>📈 CGPA Calculator</h1>
        <p className="section-sub">Enter each semester's GPA and credit hours to calculate your cumulative CGPA.</p>
      </div>

      <div className="card" style={{ marginBottom: 24 }}>
        <div className="info-tag">ℹ️ CGPA = Σ(GPA × Credit Hours) ÷ Σ(Credit Hours)</div>
      </div>

      {/* Semester Entries */}
      <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 20 }}>
        {semesters.map((s, i) => (
          <div
            key={i}
            className="card-sm animate-in"
            style={{ animationDelay: `${i * 40}ms` }}
          >
            <div style={{ display: "grid", gridTemplateColumns: "1fr 180px 180px auto", gap: 14, alignItems: "end" }}>
              {/* Semester Label */}
              <div className="form-group">
                <label className="form-label">Semester Name</label>
                <input
                  type="text"
                  className="form-input"
                  value={s.label}
                  onChange={e => updateSemester(i, "label", e.target.value)}
                  placeholder={`Semester ${i + 1}`}
                />
              </div>

              {/* GPA */}
              <div className="form-group">
                <label className="form-label">Semester GPA</label>
                <input
                  type="number"
                  className={`form-input${showErrors && errors[`gpa_${i}`] ? " error" : ""}`}
                  placeholder="e.g. 3.50"
                  step="0.01"
                  min="0"
                  max="4"
                  value={s.gpa}
                  onChange={e => updateSemester(i, "gpa", e.target.value)}
                />
                {showErrors && errors[`gpa_${i}`] && (
                  <span className="form-error">{errors[`gpa_${i}`]}</span>
                )}
              </div>

              {/* Credit Hours */}
              <div className="form-group">
                <label className="form-label">Credit Hours</label>
                <input
                  type="number"
                  className={`form-input${showErrors && errors[`ch_${i}`] ? " error" : ""}`}
                  placeholder="e.g. 18"
                  min="1"
                  value={s.creditHours}
                  onChange={e => updateSemester(i, "creditHours", e.target.value)}
                />
                {showErrors && errors[`ch_${i}`] && (
                  <span className="form-error">{errors[`ch_${i}`]}</span>
                )}
              </div>

              {/* Remove */}
              <button
                className="btn btn-danger btn-sm"
                onClick={() => removeSemester(i)}
                style={{ marginBottom: showErrors && (errors[`gpa_${i}`] || errors[`ch_${i}`]) ? 20 : 0 }}
                title="Remove semester"
              >
                ✕
              </button>
            </div>

            {/* Weighted preview */}
            {s.gpa && s.creditHours && !isNaN(parseFloat(s.gpa)) && (
              <div style={{ marginTop: 8, fontSize: 12, color: "var(--text-muted)" }}>
                Weighted points: {(parseFloat(s.gpa) * parseFloat(s.creditHours)).toFixed(2)}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Actions */}
      <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 40 }}>
        <button className="btn btn-ghost" onClick={addSemester}>+ Add Semester</button>
        <button className="btn btn-primary btn-lg" onClick={handleCalculate}>✓ Calculate CGPA</button>
        <button className="btn btn-ghost" onClick={() => { setSemesters([defaultSemester(1), defaultSemester(2)]); setResult(null); setShowErrors(false); }}>
          🗑 Clear All
        </button>
      </div>

      {result && (
        <div id="cgpa-result">
          <hr className="divider" />
          <CGPAResult
            result={result}
            semesters={semesters}
            onReset={() => { setResult(null); window.scrollTo({ top: 0, behavior: "smooth" }); }}
          />
        </div>
      )}

      <footer className="footer" style={{ marginLeft: -20, marginRight: -20, marginTop: 48, borderRadius: "0 0 16px 16px" }}>
        <p>CGPA Calculator — Sukkur IBA University | For reference only</p>
      </footer>
    </div>
  );
}
