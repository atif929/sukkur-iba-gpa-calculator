import { useEffect, useState } from "react";

export default function SplashScreen({ onDone }) {
  const [phase, setPhase] = useState("enter");

  useEffect(() => {
    const t1 = setTimeout(() => setPhase("show"), 300);
    const t2 = setTimeout(() => setPhase("exit"), 2800);
    const t3 = setTimeout(() => onDone(), 3500);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, [onDone]);

  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 9999,
      background: "linear-gradient(135deg, #0054A6 0%, #003d7a 50%, #001f40 100%)",
      display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center",
      opacity: phase === "exit" ? 0 : 1,
      transform: phase === "exit" ? "scale(1.04)" : "scale(1)",
      transition: "opacity 0.7s ease, transform 0.7s ease",
      overflow: "hidden",
    }}>

      {/* Animated background rings */}
      <div style={{ position: "absolute", inset: 0, overflow: "hidden" }}>
        {[1,2,3,4].map(i => (
          <div key={i} style={{
            position: "absolute",
            top: "50%", left: "50%",
            width: `${i * 200}px`, height: `${i * 200}px`,
            marginLeft: `${-i * 100}px`, marginTop: `${-i * 100}px`,
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: "50%",
            animation: `pulse-ring ${2 + i * 0.4}s ease-in-out infinite`,
          }} />
        ))}
      </div>

      {/* Floating particles */}
      {[...Array(12)].map((_, i) => (
        <div key={i} style={{
          position: "absolute",
          width: `${4 + (i % 3) * 3}px`,
          height: `${4 + (i % 3) * 3}px`,
          borderRadius: "50%",
          background: i % 3 === 0 ? "#F5A623" : "rgba(255,255,255,0.3)",
          left: `${8 + (i * 7.5)}%`,
          top: `${10 + (i * 6.5) % 80}%`,
          animation: `float-particle ${3 + (i % 4)}s ease-in-out infinite`,
          animationDelay: `${i * 0.2}s`,
        }} />
      ))}

      {/* Main content */}
      <div style={{
        textAlign: "center", position: "relative", zIndex: 1,
        opacity: phase === "enter" ? 0 : 1,
        transform: phase === "enter" ? "translateY(30px)" : "translateY(0)",
        transition: "opacity 0.6s ease, transform 0.6s ease",
      }}>

        {/* Logo */}
        <div style={{
          width: 80, height: 80, borderRadius: 22,
          background: "rgba(255,255,255,0.15)",
          backdropFilter: "blur(10px)",
          border: "1.5px solid rgba(255,255,255,0.3)",
          display: "flex", alignItems: "center", justifyContent: "center",
          margin: "0 auto 20px",
          animation: "logo-bounce 0.6s cubic-bezier(0.34,1.56,0.64,1) 0.3s both",
        }}>
          <span style={{
            fontFamily: "'Syne', sans-serif",
            fontSize: 28, fontWeight: 800, color: "white"
          }}>IBA</span>
        </div>

        {/* University name */}
        <p style={{
          color: "rgba(255,255,255,0.6)", fontSize: 11,
          letterSpacing: "0.2em", textTransform: "uppercase",
          marginBottom: 6, fontWeight: 600,
          animation: "fade-up 0.5s ease 0.5s both",
        }}>
          Sukkur IBA University
        </p>

        {/* App title */}
        <h1 style={{
          fontFamily: "'Syne', sans-serif",
          fontSize: 36, fontWeight: 800, color: "white",
          margin: "0 0 4px", lineHeight: 1.1,
          animation: "fade-up 0.5s ease 0.6s both",
        }}>
          GPA Calculator
        </h1>

        {/* Accent line */}
        <div style={{
          width: 48, height: 4, borderRadius: 99,
          background: "#F5A623",
          margin: "12px auto 20px",
          animation: "expand-line 0.5s ease 0.8s both",
        }} />

        {/* Developer credit */}
        <div style={{ animation: "fade-up 0.5s ease 1s both" }}>
          <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 12, marginBottom: 4 }}>
            Designed & Developed by
          </p>
          <p style={{
            fontFamily: "'Syne', sans-serif",
            fontSize: 28, fontWeight: 700,
            color: "#F5A623", letterSpacing: "0.02em",
          }}>
            Atif Rameez
          </p>
        </div>
      </div>

      {/* Loading bar */}
      <div style={{
        position: "absolute", bottom: 0, left: 0, right: 0,
        height: 3, background: "rgba(255,255,255,0.1)",
      }}>
        <div style={{
          height: "100%", background: "#F5A623",
          borderRadius: "0 99px 99px 0",
          animation: "loading-bar 2.5s ease 0.3s both",
        }} />
      </div>

      <style>{`
        @keyframes pulse-ring {
          0%, 100% { transform: scale(1); opacity: 0.6; }
          50% { transform: scale(1.05); opacity: 0.2; }
        }
        @keyframes float-particle {
          0%, 100% { transform: translateY(0px); opacity: 0.6; }
          50% { transform: translateY(-20px); opacity: 1; }
        }
        @keyframes logo-bounce {
          from { transform: scale(0.3); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        @keyframes fade-up {
          from { opacity: 0; transform: translateY(16px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes expand-line {
          from { width: 0; opacity: 0; }
          to { width: 48px; opacity: 1; }
        }
        @keyframes loading-bar {
          from { width: 0%; }
          to { width: 100%; }
        }
      `}</style>
    </div>
  );
}