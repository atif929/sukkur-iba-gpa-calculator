import { GRADE_TABLE, validateCourse } from "../utils/grading";

const CREDIT_OPTIONS = [1, 2, 3, 4, 5, 6];

export default function CourseRow({
  course,
  index,
  onChange,
  onRemove,
  showErrors
}) {
  const errors = showErrors ? validateCourse(course) : {};

  const handleField = (field, value) => {
    onChange(index, { ...course, [field]: value });
  };

  return (
    <div
      className="course-row animate-in"
      style={{
        animationDelay: `${index * 40}ms`,
        display: "grid",
        gridTemplateColumns: "2fr 1fr 1.5fr 1.8fr auto",
        gap: 16,
        alignItems: "start"
      }}
    >
      {/* Course Name */}
      <div
        className="form-group"
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start"
        }}
      >
        <label
          className="form-label"
          style={{
            visibility: index === 0 ? "visible" : "hidden",
            height: 16
          }}
        >
          Course Name
        </label>

        <input
          type="text"
          className={`form-input${errors.name ? " error" : ""}`}
          placeholder={`Course ${index + 1}`}
          value={course.name}
          onChange={(e) => handleField("name", e.target.value)}
        />

        {errors.name && (
          <span className="form-error">{errors.name}</span>
        )}
      </div>

      {/* Credit Hours */}
      <div
        className="form-group"
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start"
        }}
      >
        <label
          className="form-label"
          style={{
            visibility: index === 0 ? "visible" : "hidden",
            height: 16
          }}
        >
          Cr. Hours
        </label>

        <select
          className={`form-select${errors.creditHours ? " error" : ""}`}
          value={course.creditHours}
          onChange={(e) =>
            handleField("creditHours", e.target.value)
          }
        >
          <option value="">—</option>

          {CREDIT_OPTIONS.map((n) => (
            <option key={n} value={n}>
              {n}
            </option>
          ))}
        </select>

        {errors.creditHours && (
          <span className="form-error">
            {errors.creditHours}
          </span>
        )}
      </div>

      {/* Marks / Grade */}
      <div
        className="form-group"
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start"
        }}
      >
        <label
          className="form-label"
          style={{
            visibility: index === 0 ? "visible" : "hidden",
            height: 16
          }}
        >
          {course.inputType === "marks"
            ? "Marks (0–100)"
            : "Grade"}
        </label>

        {course.inputType === "marks" ? (
          <input
            type="number"
            className={`form-input${errors.marks ? " error" : ""}`}
            placeholder="e.g. 85"
            min={0}
            max={100}
            value={course.marks}
            onChange={(e) =>
              handleField("marks", e.target.value)
            }
          />
        ) : (
          <select
            className={`form-select${errors.grade ? " error" : ""}`}
            value={course.grade}
            onChange={(e) =>
              handleField("grade", e.target.value)
            }
          >
            <option value="">Select grade</option>

            {GRADE_TABLE.map((g) => (
              <option key={g.grade} value={g.grade}>
                {g.grade} ({g.gp.toFixed(2)})
              </option>
            ))}
          </select>
        )}

        {(errors.marks || errors.grade) && (
          <span className="form-error">
            {errors.marks || errors.grade}
          </span>
        )}
      </div>

      {/* Input Type Toggle + Non-Credit */}
      <div
        className="form-group"
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start"
        }}
      >
        <label
          className="form-label"
          style={{
            visibility: index === 0 ? "visible" : "hidden",
            height: 16
          }}
        >
          Input Type
        </label>

        <div className="toggle-group" style={{ marginBottom: 8 }}>
          <button
            type="button"
            className={`toggle-btn${
              course.inputType === "marks" ? " active" : ""
            }`}
            onClick={() => handleField("inputType", "marks")}
          >
            Marks
          </button>

          <button
            type="button"
            className={`toggle-btn${
              course.inputType === "grade" ? " active" : ""
            }`}
            onClick={() => handleField("inputType", "grade")}
          >
            Grade
          </button>
        </div>

        <label
          style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
            fontSize: 13,
            color: "var(--text-muted)",
            cursor: "pointer"
          }}
        >
          <input
            type="checkbox"
            checked={course.isNonCredit}
            onChange={(e) =>
              handleField("isNonCredit", e.target.checked)
            }
            style={{ accentColor: "var(--primary)" }}
          />

          Non-Credit
        </label>
      </div>

      {/* Remove button */}
      <div
        className="form-group remove-btn"
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          alignSelf: "start"
        }}
      >
        <div
          style={{
            height: 16,
            visibility: index === 0 ? "visible" : "hidden"
          }}
        />

        <button
          type="button"
          className="btn btn-danger btn-sm"
          onClick={() => onRemove(index)}
          style={{ marginTop: 0 }}
          title="Remove course"
        >
          ✕
        </button>
      </div>
    </div>
  );
}