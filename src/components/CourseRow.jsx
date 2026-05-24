import { GRADE_TABLE, validateCourse } from "../utils/grading";

const CREDIT_OPTIONS = [1, 2, 3, 4, 5, 6];

/* ── Nebula Remove Button ─────────────────────────────────────────────────── */
function NebulaRemoveButton({ onClick }) {
  return (
    <>
      <style>{`
        .nebula-btn {
          position: relative;
          width: 36px; height: 36px;
          border-radius: 9px;
          border: 1.5px solid rgba(251, 113, 80, 0.45);
          background: radial-gradient(ellipse at 60% 40%, rgba(220,60,30,0.22) 0%, rgba(120,20,10,0.35) 100%);
          box-shadow: 0 0 10px rgba(240,80,40,0.25), inset 0 0 8px rgba(255,80,30,0.10);
          cursor: pointer;
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
          overflow: hidden;
          transition: box-shadow 0.18s, border-color 0.18s, background 0.18s;
        }
        .nebula-btn:hover {
          border-color: rgba(255,120,60,0.75);
          background: radial-gradient(ellipse at 60% 40%, rgba(255,80,30,0.38) 0%, rgba(160,30,10,0.50) 100%);
          box-shadow: 0 0 18px rgba(255,80,30,0.50), 0 0 6px rgba(255,140,60,0.30), inset 0 0 12px rgba(255,80,30,0.18);
        }
        .nebula-btn:active {
          border-color: rgba(255,160,80,0.90);
          background: radial-gradient(ellipse at 50% 50%, rgba(255,100,40,0.55) 0%, rgba(180,40,10,0.65) 100%);
          box-shadow: 0 0 28px rgba(255,100,40,0.75), 0 0 10px rgba(255,160,60,0.50), inset 0 0 18px rgba(255,90,30,0.30);
        }

        /* floating stars */
        .nebula-btn .star {
          position: absolute;
          border-radius: 50%;
          background: rgba(255,220,180,0.85);
          animation: floatStar linear infinite;
          pointer-events: none;
        }
        .nebula-btn .star:nth-child(1) { width:1.5px; height:1.5px; left:20%; top:70%; animation-duration:3.2s; animation-delay:0s; }
        .nebula-btn .star:nth-child(2) { width:1px;   height:1px;   left:65%; top:30%; animation-duration:2.5s; animation-delay:0.8s; }
        .nebula-btn .star:nth-child(3) { width:2px;   height:2px;   left:45%; top:55%; animation-duration:4.1s; animation-delay:1.5s; }
        .nebula-btn .star:nth-child(4) { width:1px;   height:1px;   left:80%; top:75%; animation-duration:2.8s; animation-delay:0.4s; }
        .nebula-btn .star:nth-child(5) { width:1.5px; height:1.5px; left:15%; top:25%; animation-duration:3.6s; animation-delay:2.1s; }
        .nebula-btn .star:nth-child(6) { width:1px;   height:1px;   left:55%; top:15%; animation-duration:2.2s; animation-delay:1.1s; }

        @keyframes floatStar {
          0%   { transform: translateY(0px) translateX(0px); opacity: 0; }
          20%  { opacity: 1; }
          80%  { opacity: 0.7; }
          100% { transform: translateY(-14px) translateX(4px); opacity: 0; }
        }

        .nebula-btn .cross-icon {
          position: relative; z-index: 2;
          color: rgba(255,180,140,0.95);
          font-size: 14px; font-weight: 700; line-height: 1;
          text-shadow: 0 0 6px rgba(255,100,40,0.8);
          transition: color 0.15s, text-shadow 0.15s;
          user-select: none;
        }
        .nebula-btn:hover .cross-icon {
          color: #fff;
          text-shadow: 0 0 10px rgba(255,140,60,1), 0 0 20px rgba(255,80,30,0.6);
        }
        .nebula-btn:active .cross-icon {
          text-shadow: 0 0 16px #fff, 0 0 28px rgba(255,140,60,0.9);
        }

        /* ── Non-Credit Nebula Checkbox ───────────────────────────────────── */
        .nc-checkbox-wrap {
          display: flex; align-items: center; gap: 7px;
          font-size: 13px; color: var(--text-muted);
          cursor: pointer; user-select: none;
        }
        .nc-checkbox-wrap input[type="checkbox"] { display: none; }

        .nc-box {
          width: 18px; height: 18px;
          border-radius: 5px;
          border: 1.5px solid rgba(80, 130, 255, 0.40);
          background: rgba(10, 20, 50, 0.6);
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
          position: relative; overflow: hidden;
          transition: border-color 0.18s, box-shadow 0.18s, background 0.18s;
          box-shadow: inset 0 0 4px rgba(80,130,255,0.08);
        }
        .nc-checkbox-wrap:hover .nc-box {
          border-color: rgba(120, 170, 255, 0.65);
          box-shadow: 0 0 8px rgba(80,130,255,0.25), inset 0 0 6px rgba(80,130,255,0.12);
        }

        /* checked state */
        .nc-box.checked {
          border-color: rgba(100, 160, 255, 0.80);
          background: radial-gradient(ellipse at 55% 40%, rgba(50,100,220,0.45) 0%, rgba(20,40,120,0.65) 100%);
          box-shadow: 0 0 12px rgba(80,130,255,0.45), inset 0 0 8px rgba(80,130,255,0.18);
        }

        /* micro stars inside checkbox */
        .nc-box .nc-star {
          position: absolute;
          border-radius: 50%;
          background: rgba(200, 220, 255, 0.90);
          animation: floatStar linear infinite;
          pointer-events: none;
          opacity: 0;
        }
        .nc-box.checked .nc-star { opacity: 1; }
        .nc-box .nc-star:nth-child(1) { width:1px; height:1px; left:20%; top:70%; animation-duration:2.8s; animation-delay:0s; }
        .nc-box .nc-star:nth-child(2) { width:1px; height:1px; left:70%; top:30%; animation-duration:2.2s; animation-delay:0.7s; }
        .nc-box .nc-star:nth-child(3) { width:1px; height:1px; left:50%; top:55%; animation-duration:3.0s; animation-delay:1.3s; }

        .nc-checkmark {
          position: relative; z-index: 2;
          color: rgba(160, 210, 255, 0.0);
          font-size: 11px; font-weight: 800; line-height: 1;
          transition: color 0.15s, text-shadow 0.15s;
          text-shadow: none;
        }
        .nc-box.checked .nc-checkmark {
          color: #c8e0ff;
          text-shadow: 0 0 6px rgba(100,180,255,0.9), 0 0 14px rgba(60,130,255,0.5);
        }
      `}</style>

      <button
        type="button"
        onClick={onClick}
        title="Remove course"
        className="nebula-btn"
      >
        <span className="star" />
        <span className="star" />
        <span className="star" />
        <span className="star" />
        <span className="star" />
        <span className="star" />
        <span className="cross-icon">✕</span>
      </button>
    </>
  );
}

/* ── Non-Credit Nebula Checkbox ──────────────────────────────────────────── */
function NebulaCheckbox({ checked, onChange }) {
  return (
    <label className="nc-checkbox-wrap">
      <input type="checkbox" checked={checked} onChange={onChange} />
      <span className={`nc-box${checked ? " checked" : ""}`}>
        <span className="nc-star" />
        <span className="nc-star" />
        <span className="nc-star" />
        <span className="nc-checkmark">✓</span>
      </span>
      Non-Credit
    </label>
  );
}

/* ── CourseRow ───────────────────────────────────────────────────────────── */
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
        <NebulaRemoveButton onClick={() => onRemove(index)} />
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

        <NebulaCheckbox
          checked={course.isNonCredit}
          onChange={e => handleField("isNonCredit", e.target.checked)}
        />

        {course.isNonCredit && (
          <span className="badge badge-yellow" style={{ fontSize: 11 }}>Excluded from GPA</span>
        )}
      </div>
    </div>
  );
}