import { useState } from "react";
import CourseRow from "../components/CourseRow";
import ResultDisplay from "../components/ResultDisplay";
import { calculateGPA, validateCourse } from "../utils/grading";

const defaultCourse = () => ({
  name: "",
  creditHours: "3",
  marks: "",
  grade: "",
  inputType: "marks",
  isNonCredit: false,
});

export default function GPACalculator() {
  const [semester, setSemester] = useState("1");
  const [courses, setCourses] = useState([defaultCourse(), defaultCourse(), defaultCourse()]);
  const [result, setResult] = useState(null);
  const [showErrors, setShowErrors] = useState(false);

  const updateCourse = (index, updated) => {
    setCourses(prev => prev.map((c, i) => (i === index ? updated : c)));
  };

  const addCourse = () => {
    setCourses(prev => [...prev, defaultCourse()]);
  };

  const removeCourse = (index) => {
    if (courses.length <= 1) return;
    setCourses(prev => prev.filter((_, i) => i !== index));
  };

  const handleCalculate = () => {
    const hasErrors = courses.some(c => Object.keys(validateCourse(c)).length > 0);
    if (hasErrors) {
      setShowErrors(true);
      return;
    }
    setShowErrors(false);
    const r = calculateGPA(courses);
    setResult(r);
    setTimeout(() => {
      document.getElementById("result-section")?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  const handleReset = () => {
    setResult(null);
    setShowErrors(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="container section">
      <div style={{ marginBottom: 28 }}>
        <h1 className="section-title" style={{ fontSize: 26 }}>📊 GPA Calculator</h1>
        <p className="section-sub">Enter your courses to calculate your semester GPA using Sukkur IBA's official grading policy.</p>
      </div>

      <div className="card" style={{ marginBottom: 24 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 20, flexWrap: "wrap" }}>
          <div className="form-group" style={{ flex: "0 0 auto" }}>
            <label className="form-label">Semester Number</label>
            <select
              className="form-select"
              style={{ width: 160 }}
              value={semester}
              onChange={e => setSemester(e.target.value)}
            >
              {Array.from({ length: 8 }, (_, i) => i + 1).map(n => (
                <option key={n} value={n}>Semester {n}</option>
              ))}
            </select>
          </div>
          <div className="info-tag" style={{ marginTop: 20 }}>
            ℹ️ Non-credit courses are excluded from GPA
          </div>
        </div>
      </div>

      {/* Course Rows */}
      <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 16 }}>
        {courses.map((course, index) => (
          <CourseRow
            key={index}
            course={course}
            index={index}
            onChange={updateCourse}
            onRemove={removeCourse}
            showErrors={showErrors}
          />
        ))}
      </div>

      {/* Actions */}
      <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 40 }}>
        <button className="btn btn-ghost" onClick={addCourse}>
          + Add Course
        </button>
        <button className="btn btn-primary btn-lg" onClick={handleCalculate}>
          ✓ Calculate GPA
        </button>
        <button className="btn btn-ghost" onClick={() => { setCourses([defaultCourse(), defaultCourse(), defaultCourse()]); setResult(null); setShowErrors(false); }}>
          🗑 Clear All
        </button>
      </div>

      {/* Result */}
      {result && (
        <div id="result-section">
          <hr className="divider" />
          <ResultDisplay
            result={result}
            courses={courses}
            semesterNumber={semester}
            onReset={handleReset}
          />
        </div>
      )}

      {/* Footer */}
      <footer className="footer" style={{ marginLeft: -20, marginRight: -20, marginTop: 48, borderRadius: "0 0 16px 16px" }}>
        <p>GPA Calculator — Sukkur IBA University | For reference only</p>
      </footer>
    </div>
  );
}
