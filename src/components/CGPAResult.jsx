import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { getAcademicStanding } from "../utils/grading";
import { exportResultPDF } from "../utils/pdfExport";

export default function CGPAResult({ result, semesters, onReset }) {
  if (!result) return null;
  const standing = getAcademicStanding(result.cgpa);

  const chartData = semesters.map((s, i) => ({
    name: s.label || `S${i + 1}`,
    gpa: parseFloat(s.gpa) || 0,
  }));

  const handlePDF = async () => {
    await exportResultPDF({ type: "cgpa", result, semesters });
  };

  return (
    <div className="animate-in">
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24, flexWrap: "wrap", gap: 12 }}>
        <div>
          <h2 className="section-title">📈 CGPA Results</h2>
          <p className="section-sub">Cumulative across all entered semesters</p>
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          <button className="btn btn-ghost btn-sm" onClick={handlePDF}>⬇ Export PDF</button>
          <button className="btn btn-primary btn-sm" onClick={onReset}>🔄 Recalculate</button>
        </div>
      </div>

      {/* Summary */}
      <div className="result-grid">
        <div className="result-card">
          <div className="result-card-value">{result.cgpa.toFixed(2)}</div>
          <div className="result-card-label">Cumulative CGPA</div>
          <div style={{ marginTop: 8 }}>
            <span className={`badge badge-${standing.color}`}>{standing.emoji} {standing.label}</span>
          </div>
        </div>
        <div className="result-card">
          <div className="result-card-value" style={{ color: "var(--accent)" }}>{result.totalCredits}</div>
          <div className="result-card-label">Total Credit Hours</div>
        </div>
        <div className="result-card">
          <div className="result-card-value" style={{ fontSize: 32 }}>{semesters.length}</div>
          <div className="result-card-label">Semesters Entered</div>
        </div>
        <div className="result-card">
          <div className="result-card-value" style={{ fontSize: 32 }}>{result.totalWeighted.toFixed(1)}</div>
          <div className="result-card-label">Total Weighted Points</div>
        </div>
      </div>

      {/* Chart */}
      <div className="card" style={{ marginBottom: 20 }}>
        <p style={{ fontFamily: "var(--font-display)", fontWeight: 700, marginBottom: 16 }}>Semester GPA Trend</p>
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={chartData} margin={{ top: 8, right: 16, bottom: 0, left: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
            <XAxis dataKey="name" tick={{ fontSize: 12 }} />
            <YAxis domain={[0, 4]} tick={{ fontSize: 12 }} />
            <Tooltip formatter={(v) => v.toFixed(2)} />
            <Bar dataKey="gpa" radius={[6, 6, 0, 0]} label={{ position: "top", fontSize: 11 }}>
              {chartData.map((entry, i) => (
                <Cell
                  key={i}
                  fill={entry.gpa >= 3.5 ? "var(--success)" : entry.gpa >= 2.5 ? "var(--primary)" : entry.gpa >= 2.0 ? "var(--warning)" : "var(--danger)"}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Table */}
      <div className="card" style={{ padding: 0, overflow: "hidden" }}>
        <div style={{ padding: "16px 20px", borderBottom: "1px solid var(--border)" }}>
          <strong style={{ fontFamily: "var(--font-display)" }}>Semester Details</strong>
        </div>
        <table className="grade-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Semester</th>
              <th>GPA</th>
              <th>Credit Hours</th>
              <th>Weighted Points</th>
              <th>Standing</th>
            </tr>
          </thead>
          <tbody>
            {semesters.map((s, i) => {
              const gpa = parseFloat(s.gpa) || 0;
              const st = getAcademicStanding(gpa);
              return (
                <tr key={i}>
                  <td style={{ color: "var(--text-muted)" }}>{i + 1}</td>
                  <td style={{ fontWeight: 500 }}>{s.label || `Semester ${i + 1}`}</td>
                  <td style={{ fontWeight: 700 }}>{gpa.toFixed(2)}</td>
                  <td>{s.creditHours}</td>
                  <td>{(gpa * parseFloat(s.creditHours)).toFixed(2)}</td>
                  <td><span className={`badge badge-${st.color}`}>{st.emoji} {st.label}</span></td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
