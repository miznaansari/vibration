import React, { useState } from "react";

export default function App() {
  const [lastPattern, setLastPattern] = useState(null);
  const isSupported =
    typeof navigator !== "undefined" && typeof navigator.vibrate === "function";

  // helper: trigger vibration safely
  function vibrate(pattern, label) {
    if (isSupported) {
      navigator.vibrate(pattern);
      setLastPattern({ label, pattern });
    } else {
      // iPhone Safari fallback: simulate haptic with CSS shake animation
      const btn = document.getElementById(label);
      if (btn) {
        btn.classList.add("shake");
        setTimeout(() => btn.classList.remove("shake"), 400);
      }
      setLastPattern({ label: `${label} (simulated)`, pattern: null });
    }
  }

  // stop any ongoing vibration
  function stopVibration() {
    if (isSupported) navigator.vibrate(0);
    setLastPattern({ label: "Stopped", pattern: null });
  }

  // Predefined vibration patterns
  const patterns = [
    { key: "short", label: "Short (tap)", pattern: 40 },
    { key: "selection", label: "Selection (very short)", pattern: 10 },
    { key: "double", label: "Double Tap", pattern: [40, 30, 40] },
    { key: "triple", label: "Triple Tap", pattern: [30, 20, 30, 20, 30] },
    { key: "long", label: "Long Buzz", pattern: 250 },
    { key: "heavy", label: "Heavy", pattern: 400 },
    { key: "heartbeat", label: "Heartbeat", pattern: [100, 40, 120] },
    { key: "success", label: "Success (two short)", pattern: [30, 50, 30] },
    { key: "warning", label: "Warning (long-short)", pattern: [200, 60, 80] },
    { key: "error", label: "Error (long-long)", pattern: [300, 80, 300] },
    { key: "pulse", label: "Pulse (3 quick)", pattern: [25, 30, 25, 30, 25] },
    { key: "ramp", label: "Ramp (increasing)", pattern: [40, 30, 80, 30, 140] },
  ];

  // Inline styles only
  const containerStyle = {
    minHeight: "100vh",
    padding: 24,
    fontFamily: "Arial, sans-serif",
    background: "#f9fafb",
    color: "#111827",
    boxSizing: "border-box",
  };

  const gridStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
    gap: 12,
    marginTop: 16,
  };

  const buttonBase = {
    padding: "14px 12px",
    borderRadius: 10,
    border: "1px solid #ddd",
    background: "#fff",
    cursor: "pointer",
    userSelect: "none",
    minHeight: 70,
    textAlign: "center",
    boxShadow: "0 4px 10px rgba(0,0,0,0.05)",
    transition: "transform 0.2s",
  };

  const labelStyle = {
    fontSize: 14,
    fontWeight: 600,
    marginBottom: 6,
  };

  const smallStyle = {
    fontSize: 12,
    color: "#6b7280",
  };

  // Inject keyframes for shake fallback
  const shakeKeyframes = `
    @keyframes shake {
      0% { transform: translateX(0); }
      25% { transform: translateX(-4px); }
      50% { transform: translateX(4px); }
      75% { transform: translateX(-4px); }
      100% { transform: translateX(0); }
    }
    .shake {
      animation: shake 0.4s;
    }
  `;

  return (
    <div style={containerStyle}>
      <style>{shakeKeyframes}</style>

      <h2>Haptic / Vibration Buttons (Web)</h2>
      <p style={{ fontSize: 13, color: "#374151" }}>
        Android: real vibration. iPhone Safari: fallback button shake.
      </p>

      <div style={gridStyle}>
        {patterns.map((p) => (
          <button
            id={p.label}
            key={p.key}
            onClick={() => vibrate(p.pattern, p.label)}
            style={buttonBase}
          >
            <div style={labelStyle}>{p.label}</div>
            <div style={smallStyle}>
              {typeof p.pattern === "number"
                ? `${p.pattern} ms`
                : `pattern: [${p.pattern.join(", ")}]`}
            </div>
          </button>
        ))}

        <button onClick={stopVibration} style={{ ...buttonBase, background: "#fee2e2" }}>
          <div style={{ fontWeight: 700 }}>Stop</div>
          <div style={smallStyle}>Cancel vibration</div>
        </button>
      </div>

      <div style={{ marginTop: 20, fontSize: 13 }}>
        Last action: <strong>{lastPattern ? lastPattern.label : "— none —"}</strong>
      </div>
    </div>
  );
}
