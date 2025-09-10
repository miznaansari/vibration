import React, { useState } from "react";

// App.jsx
// A single-file React component demonstrating many vibration (haptic) patterns.
// Styling is done entirely with inline CSS as requested.
// The Web Vibration API only works on some devices/browsers (mostly Android + Chrome).

export default function App() {
  const [lastPattern, setLastPattern] = useState(null);
  const [isSupported] = useState(
    typeof navigator !== "undefined" && typeof navigator.vibrate === "function"
  );

  // helper: trigger vibration safely
  function vibrate(pattern, label) {
    try {
      if (!isSupported) {
        setLastPattern({ label: "Not supported", pattern: null });
        return;
      }
      // Patterns can be either a number (ms) or an array of numbers
      navigator.vibrate(pattern);
      setLastPattern({ label, pattern });
    } catch (e) {
      // fail silently but show an informative value
      setLastPattern({ label: `Error: ${e.message}`, pattern: null });
    }
  }

  // stop any ongoing vibration
  function stopVibration() {
    if (isSupported) navigator.vibrate(0);
    setLastPattern({ label: "Stopped", pattern: null });
  }

  // Predefined vibration patterns (named for human-friendly haptic "feel")
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
    { key: "pattern", label: "Pattern (wave)", pattern: [20,10,40,10,60,10,80] },
    { key: "ramp", label: "Ramp (increasing)", pattern: [40,30,80,30,140] },
  ];

  // Inline styles (all inline as requested)
  const containerStyle = {
    minHeight: "100vh",
    padding: 24,
    fontFamily: "Inter, Roboto, system-ui, -apple-system, 'Segoe UI', Arial",
    background: "linear-gradient(180deg,#f8fafc,#ffffff)",
    color: "#111827",
    boxSizing: "border-box",
  };

  const headerStyle = {
    display: "flex",
    gap: 12,
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 18,
  };

  const titleStyle = {
    fontSize: 20,
    fontWeight: 700,
    letterSpacing: "-0.2px",
  };

  const subtitleStyle = {
    fontSize: 12,
    color: "#6b7280",
  };

  const gridStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
    gap: 12,
    alignItems: "stretch",
    marginTop: 12,
  };

  const buttonBase = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "14px 12px",
    borderRadius: 12,
    border: "1px solid rgba(17,24,39,0.06)",
    background: "#ffffff",
    boxShadow: "0 6px 18px rgba(17,24,39,0.04)",
    cursor: "pointer",
    userSelect: "none",
    minHeight: 72,
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

  const footerStyle = {
    marginTop: 18,
    display: "flex",
    gap: 12,
    alignItems: "center",
    flexWrap: "wrap",
  };

  const stopButtonStyle = {
    ...buttonBase,
    background: "#fff5f5",
    border: "1px solid rgba(220,38,38,0.12)",
  };

  const supportBadgeStyle = {
    padding: "6px 10px",
    borderRadius: 999,
    fontSize: 12,
    fontWeight: 600,
    color: isSupported ? "#065f46" : "#7f1d1d",
    background: isSupported ? "#ecfdf5" : "#fff1f2",
    border: isSupported ? "1px solid rgba(4,120,87,0.08)" : "1px solid rgba(124,58,237,0.06)",
  };

  return (
    <div style={containerStyle}>
      <div style={headerStyle}>
        <div>
          <div style={titleStyle}>Haptic / Vibration Buttons — App.jsx</div>
          <div style={subtitleStyle}>
            Many demo buttons using the Web Vibration API. Styling uses inline CSS only.
          </div>
        </div>

        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <div style={supportBadgeStyle}>{isSupported ? "Vibration supported" : "Vibration NOT supported"}</div>
        </div>
      </div>

      <div style={{ fontSize: 13, color: "#374151" }}>
        Click any button to run the vibration pattern. On many desktop browsers this will do nothing — test on a mobile device for best results.
      </div>

      <div style={gridStyle}>
        {patterns.map((p) => (
          <button
            key={p.key}
            onClick={() => vibrate(p.pattern, p.label)}
            style={{
              ...buttonBase,
              border: lastPattern && lastPattern.label === p.label ? "2px solid #2563eb" : buttonBase.border,
              transform: lastPattern && lastPattern.label === p.label ? "translateY(-2px)" : "none",
            }}
            aria-pressed={lastPattern && lastPattern.label === p.label}
            title={typeof p.pattern === "number" ? `${p.pattern}ms` : p.pattern.join(", ")}
          >
            <div style={labelStyle}>{p.label}</div>
            <div style={smallStyle}>{typeof p.pattern === "number" ? `${p.pattern} ms` : `pattern: [${p.pattern.join(", ")}]`}</div>
          </button>
        ))}

        {/* Stop vibration button */}
        <div style={{ display: "flex", gap: 12 }}>
          <button onClick={stopVibration} style={stopButtonStyle} title="Stop vibration">
            <div style={{ fontWeight: 700 }}>Stop</div>
            <div style={smallStyle}>Cancel any vibration</div>
          </button>
        </div>
      </div>

      <div style={footerStyle}>
        <div style={{ fontSize: 13, color: "#374151" }}>
          Last action: <strong>{lastPattern ? lastPattern.label : "— none —"}</strong>
        </div>

        <div style={{ fontSize: 12, color: "#6b7280" }}>
          Notes: The Web Vibration API accepts a single number (milliseconds) or an array of numbers.
        </div>

        <div style={{ fontSize: 12, color: "#6b7280" }}>
          Tip: On iOS Safari the vibration API is generally unavailable; native app platforms provide richer haptic types.
        </div>
      </div>
    </div>
  );
}
