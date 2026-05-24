import { useNavigate } from "react-router-dom";

export default function NotFound() {
  const nav = useNavigate();
  return (
    <div className="container" style={{
      minHeight: "70vh", display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center", textAlign: "center", padding: "48px 20px"
    }}>
      <div style={{ fontSize: 80, marginBottom: 16 }}>📭</div>
      <h1 style={{ fontFamily: "var(--font-display)", fontSize: 28, marginBottom: 8 }}>Page Not Found</h1>
      <p style={{ color: "var(--text-muted)", fontSize: 15, marginBottom: 28, maxWidth: 360 }}>
        The page you're looking for doesn't exist. It may have been moved or the link is incorrect.
      </p>
      <div style={{ display: "flex", gap: 12, flexWrap: "wrap", justifyContent: "center" }}>
        <button className="btn btn-primary" onClick={() => nav("/")}>🏠 Go Home</button>
        <button className="btn btn-ghost" onClick={() => nav("/gpa")}>📊 GPA Calculator</button>
      </div>
    </div>
  );
}