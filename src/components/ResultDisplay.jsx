import { RadialBarChart, RadialBar, ResponsiveContainer, Tooltip } from "recharts";
import { getAcademicStanding } from "../utils/grading";
import { exportResultPDF } from "../utils/pdfExport";

export default function ResultDisplay({ result, courses, semesterNumber, onReset }) {
  if (!result) return null;
  const standing = getAcademicStanding(result.gpa);
  const gpaPercent = (result.gpa / 4) * 100;

  const chartData = [
    { name: "GPA", value: gpaPercent, fill: "var(--primary)" },
  ];

  const handlePDF = async () => {
    await exportResultPDF({
      type: "gpa",
      result,
      courses,
      semesterNumber,
    });
  };

  return (
    <div className="animate-in">
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24, flexWrap: "wrap", gap: 12 }}>
        <div>
          <h2 className="section-title">📊 Semester {semesterNumber} Results</h2>
          <p className="section-sub">Based on Sukkur IBA grading policy</p>
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          <button className="btn btn-ghost btn-sm" onClick={handlePDF}>⬇ Export PDF</button>
          <button className="btn btn-primary btn-sm" onClick={onReset}>🔄 Recalculate</button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="result-grid">
        <div className="result-card">
          <div className="result-card-value">{result.gpa.toFixed(2)}</div>
          <div className="result-card-label">Semester GPA</div>
          <div style={{ marginTop: 8 }}>
            <span className={`badge badge-${standing.color}`}>{standing.emoji} {standing.label}</span>
          </div>
        </div>

        {result.percentage !== null && (
          <div className="result-card">
            <div className="result-card-value" style={{ fontSize: 36 }}>{result.percentage.toFixed(1)}%</div>
            <div className="result-card-label">Overall Percentage</div>
          </div>
        )}

        <div className="result-card">
          <div className="result-card-value" style={{ color: "var(--accent)" }}>{result.totalCreditHours}</div>
          <div className="result-card-label">Credit Hours</div>
        </div>

        <div className="result-card">
          <div className="result-card-value" style={{ color: result.failedCourses > 0 ? "var(--danger)" : "var(--success)" }}>
            {result.failedCourses}
          </div>
          <div className="result-card-label">Failed Courses</div>
        </div>
      </div>

      <div className="result-layout" style={{ display: "grid", gridTemplateColumns: "1fr 220px", gap: 20, alignItems: "start" }}>
        {/* Course Breakdown Table */}
        <div className="card" style={{ padding: 0, overflow: "hidden" }}>
          <div style={{ padding: "16px 20px", borderBottom: "1px solid var(--border)" }}>
            <strong style={{ fontFamily: "var(--font-display)" }}>Course Breakdown</strong>
          </div>
          <div style={{ overflowX: "auto" }}>
            <table className="grade-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Course</th>
                  <th>CH</th>
                  <th>Marks</th>
                  <th>Grade</th>
                  <th>GP</th>
                  <th>Points</th>
                  <th>Type</th>
                </tr>
              </thead>
              <tbody>
                {result.processedCourses.map((c, i) => (
                  <tr key={i}>
                    <td style={{ color: "var(--text-muted)" }}>{i + 1}</td>
                    <td style={{ fontWeight: 500 }}>{c.name || `Course ${i + 1}`}</td>
                    <td>{c.creditHours}</td>
                    <td>{c.marks !== "" && c.marks !== undefined ? `${c.marks}%` : "—"}</td>
                    <td>
                      <span style={{
                        fontWeight: 700,
                        color: c.resolvedGrade === "F" ? "var(--danger)" :
                               c.resolvedGP >= 3.5 ? "var(--success)" : "var(--text)"
                      }}>
                        {c.resolvedGrade}
                      </span>
                    </td>
                    <td>{c.resolvedGP.toFixed(2)}</td>
                    <td style={{ color: "var(--text-muted)" }}>
                      {c.isNonCredit ? "—" : c.weightedPoints.toFixed(2)}
                    </td>
                    <td>
                      <span className={`badge ${c.isNonCredit ? "badge-yellow" : "badge-blue"}`}>
                        {c.isNonCredit ? "NC" : "Credit"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* GPA Gauge */}
        <div className="card" style={{ textAlign: "center" }}>
          <p style={{ fontSize: 13, color: "var(--text-muted)", marginBottom: 8, fontWeight: 600 }}>GPA Gauge</p>
          <ResponsiveContainer width="100%" height={160}>
            <RadialBarChart
              cx="50%" cy="80%"
              innerRadius="60%"
              outerRadius="100%"
              startAngle={180}
              endAngle={0}
              data={chartData}
            >
              <RadialBar dataKey="value" cornerRadius={8} background={{ fill: "var(--border)" }} />
            </RadialBarChart>
          </ResponsiveContainer>
          <div style={{ marginTop: -20 }}>
            <div style={{ fontFamily: "var(--font-display)", fontSize: 32, fontWeight: 800, color: "var(--primary)" }}>
              {result.gpa.toFixed(2)}
            </div>
            <div style={{ fontSize: 12, color: "var(--text-muted)" }}>out of 4.00</div>
          </div>

          <hr className="divider" style={{ margin: "16px 0" }} />
          <div style={{ fontSize: 13, color: "var(--text-muted)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
              <span>Weighted Points</span>
              <strong>{result.totalWeightedPoints}</strong>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span>Credit Hours</span>
              <strong>{result.totalCreditHours}</strong>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}