import { useState } from "react";
import CourseRow from "../components/CourseRow";
import ResultDisplay from "../components/ResultDisplay";
import { calculateGPA, validateCourse } from "../utils/grading";
import PageWrapper from "../components/PageWrapper";

const defaultCourse = () => ({
  name: "", creditHours: "3", marks: "", grade: "",
  inputType: "marks", isNonCredit: false,
});

export default function GPACalculator() {
  const [semester, setSemester] = useState("1");
  const [courses, setCourses] = useState([defaultCourse(), defaultCourse(), defaultCourse()]);
  const [result, setResult] = useState(null);
  const [showErrors, setShowErrors] = useState(false);

  const updateCourse = (index, updated) => setCourses(prev => prev.map((c, i) => i === index ? updated : c));
  const addCourse = () => setCourses(prev => [...prev, defaultCourse()]);
  const removeCourse = (index) => { if (courses.length > 1) setCourses(prev => prev.filter((_, i) => i !== index)); };

  const handleCalculate = () => {
    const hasErrors = courses.some(c => Object.keys(validateCourse(c)).length > 0);
    if (hasErrors) { setShowErrors(true); return; }
    setShowErrors(false);
    setResult(calculateGPA(courses));
    setTimeout(() => document.getElementById("result-section")?.scrollIntoView({ behavior: "smooth" }), 100);
  };

  const handleReset = () => { setResult(null); setShowErrors(false); window.scrollTo({ top: 0, behavior: "smooth" }); };

  return (
    <PageWrapper>
    <div className="container section">
      <div style={{ marginBottom: 20 }}>
        <h1 className="section-title" style={{ fontSize: 24 }}>📊 GPA Calculator</h1>
        <p className="section-sub">Semester-wise GPA based on Sukkur IBA grading policy</p>
      </div>

      <div style={{
        background: "var(--surface)", border: "1.5px solid var(--border)",
        borderRadius: "var(--radius)", padding: "14px 16px",
        display: "flex", alignItems: "center", gap: 12,
        marginBottom: 16, flexWrap: "wrap"
      }}>
        <span style={{ fontSize: 13, fontWeight: 600, color: "var(--text-muted)" }}>SEMESTER</span>
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
          {[1,2,3,4,5,6,7,8].map(n => (
            <button key={n} type="button" onClick={() => setSemester(String(n))}
              style={{
                width: 36, height: 36, borderRadius: 8,
                border: semester === String(n) ? "none" : "1.5px solid var(--border)",
                background: semester === String(n) ? "var(--primary)" : "var(--surface2)",
                color: semester === String(n) ? "white" : "var(--text-muted)",
                fontWeight: 700, fontSize: 13, cursor: "pointer", transition: "all 0.15s"
              }}>{n}</button>
          ))}
        </div>
        <span className="info-tag" style={{ fontSize: 11, marginLeft: "auto" }}>ℹ️ Non-credit excluded</span>
      </div>

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
        <span style={{ fontSize: 13, color: "var(--text-muted)", fontWeight: 600 }}>
          {courses.length} COURSE{courses.length !== 1 ? "S" : ""}
        </span>
        <button className="btn btn-ghost btn-sm" onClick={() => { setCourses([defaultCourse(), defaultCourse(), defaultCourse()]); setResult(null); setShowErrors(false); }}>
          🗑 Clear All
        </button>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 16 }}>
        {courses.map((course, index) => (
          <CourseRow key={index} course={course} index={index}
            onChange={updateCourse} onRemove={removeCourse} showErrors={showErrors} />
        ))}
      </div>

      <button className="btn btn-ghost" onClick={addCourse}
        style={{ width: "100%", justifyContent: "center", marginBottom: 16, border: "1.5px dashed var(--border)" }}>
        + Add Course
      </button>

      <button className="btn btn-primary" onClick={handleCalculate}
        style={{ width: "100%", justifyContent: "center", padding: "14px", fontSize: 16, borderRadius: "var(--radius)", marginBottom: 40 }}>
        ✓ Calculate GPA
      </button>

      {result && (
        <div id="result-section">
          <hr className="divider" />
          <ResultDisplay result={result} courses={courses} semesterNumber={semester} onReset={handleReset} />
        </div>
      )}

      <footer className="footer" style={{ marginLeft: -14, marginRight: -14, marginTop: 48, borderRadius: "0 0 16px 16px" }}>
        <p>GPA Calculator — Sukkur IBA University | For reference only</p>
      </footer>
    </div>
    </PageWrapper>
  );
}