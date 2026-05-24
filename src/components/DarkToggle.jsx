export default function DarkToggle({ dark, toggle }) {
  return (
    <button
      onClick={toggle}
      title={dark ? "Switch to Light Mode" : "Switch to Dark Mode"}
      style={{
        position: "relative",
        width: 64, height: 32,
        borderRadius: 99,
        border: "none", cursor: "pointer", padding: 0,
        overflow: "hidden", flexShrink: 0,
        transition: "background 0.4s ease",
        background: dark
          ? "linear-gradient(135deg, #0f1b35, #1a2a5e)"
          : "linear-gradient(135deg, #4fc3f7, #81d4fa)",
      }}
    >
      {dark && [
        { top: "18%", left: "12%", size: 2 },
        { top: "45%", left: "22%", size: 1.5 },
        { top: "25%", left: "38%", size: 2.5 },
        { top: "60%", left: "15%", size: 1.5 },
        { top: "35%", left: "30%", size: 1 },
      ].map((s, i) => (
        <div key={i} style={{
          position: "absolute",
          width: s.size, height: s.size,
          borderRadius: "50%", background: "white",
          top: s.top, left: s.left, opacity: 0.9,
        }} />
      ))}

      {!dark && (
        <div style={{
          position: "absolute", top: "28%", left: "10%",
          fontSize: 10, opacity: 0.9, pointerEvents: "none"
        }}>☁️</div>
      )}

      <div style={{
        position: "absolute",
        top: 3,
        left: dark ? 35 : 3,
        width: 26, height: 26,
        borderRadius: "50%",
        transition: "left 0.4s cubic-bezier(0.34,1.56,0.64,1), background 0.4s",
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: 14,
        background: dark
          ? "radial-gradient(circle at 35% 35%, #fffde7, #fff9c4)"
          : "radial-gradient(circle at 40% 40%, #ffeb3b, #ff9800)",
        boxShadow: dark
          ? "0 0 8px rgba(255,255,200,0.6)"
          : "0 0 10px rgba(255,160,0,0.7)",
      }}>
        {dark ? "" : ""}
      </div>
    </button>
  );
}