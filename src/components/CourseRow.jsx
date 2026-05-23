import { GRADE_TABLE, validateCourse } from "../utils/grading";

const CREDIT_OPTIONS = [1, 2, 3, 4, 5, 6];

export default function CourseRow({ course, index, onChange, onRemove, showErrors }) {
  const errors = showErrors ? validateCourse(course) : {};

  const handleField = (field, value) => {
    onChange(index, { ...course, [field]: value });
  };

  return (
    <div style={{
      background: "var(--surface)",
      border: "1.5px solid var(--border)",
      borderRadius: "var(--radius)",
      padding: "14px",
      transition: "box-shadow 0.15s, border-color 0.15s",
    }}>
      <div style={{ display: "flex", gap: 8, marginBottom: 10, alignItems: "center" }}>
        <div style={{ flex: 1 }}>
          <input
            type="text"
            className={`form-input${errors.name ? " error" : ""}`}
            placeholder={`Course ${index + 1} name`}
            value={course.name}
            onChange={e => handleField("name", e.target.value)}
            style={{ fontWeight: 500 }}
          />
          {errors.name && <span className="form-error">{errors.name}</span>}
        </div>
        <button
          type="button"
          onClick={() => onRemove(index)}
          title="Remove"
          style={{
            width: 36, height: 36, borderRadius: 8,
            background: "#fff0f0", border: "1.5px solid #fecaca",
            color: "var(--danger)", fontSize: 16, cursor: "pointer",
            display: "flex", alignItems: "center", justifyContent: "center",
            flexShrink: 0
          }}
        >✕</button>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "120px 1fr", gap: 8, marginBottom: 10 }}>
        <div className="form-group">
          <label className="form-label">Credit Hrs</label>
          <select
            className={`form-select${errors.creditHours ? " error" : ""}`}
            value={course.creditHours}
            onChange={e => handleField("creditHours", e.target.value)}
          >
            <option value="">—</option>
            {CREDIT_OPTIONS.map(n => <option key={n} value={n}>{n} CH</option>)}
          </select>
          {errors.creditHours && <span className="form-error">{errors.creditHours}</span>}
        </div>

        <div className="form-group">
          <label className="form-label">{course.inputType === "marks" ? "Marks (0–100)" : "Grade"}</label>
          {course.inputType === "marks" ? (
            <input
              type="number"
              className={`form-input${errors.marks ? " error" : ""}`}
              placeholder="e.g. 85"
              min={0} max={100}
              value={course.marks}
              onChange={e => handleField("marks", e.target.value)}
            />
          ) : (
            <select
              className={`form-select${errors.grade ? " error" : ""}`}
              value={course.grade}
              onChange={e => handleField("grade", e.target.value)}
            >
              <option value="">Select</option>
              {GRADE_TABLE.map(g => (
                <option key={g.grade} value={g.grade}>{g.grade} ({g.gp.toFixed(2)})</option>
              ))}
            </select>
          )}
          {(errors.marks || errors.grade) && (
            <span className="form-error">{errors.marks || errors.grade}</span>
          )}
        </div>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
        <div className="toggle-group" style={{ flex: "0 0 auto" }}>
          <button type="button"
            className={`toggle-btn${course.inputType === "marks" ? " active" : ""}`}
            onClick={() => handleField("inputType", "marks")}>Marks</button>
          <button type="button"
            className={`toggle-btn${course.inputType === "grade" ? " active" : ""}`}
            onClick={() => handleField("inputType", "grade")}>Grade</button>
        </div>
        <label style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13, color: "var(--text-muted)", cursor: "pointer" }}>
          <input type="checkbox" checked={course.isNonCredit}
            onChange={e => handleField("isNonCredit", e.target.checked)}
            style={{ accentColor: "var(--primary)", width: 16, height: 16 }} />
          Non-Credit
        </label>
        {course.isNonCredit && (
          <span className="badge badge-yellow" style={{ fontSize: 11 }}>Excluded from GPA</span>
        )}
      </div>
    </div>
  );
}