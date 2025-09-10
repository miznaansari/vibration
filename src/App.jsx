import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import ReactNativeHapticFeedback from "react-native-haptic-feedback";

export default function App() {
  const [lastPattern, setLastPattern] = useState(null);

  const options = {
    enableVibrateFallback: true,
    ignoreAndroidSystemSettings: false,
  };

  const patterns = [
    { key: "impactLight", label: "Impact Light", type: "impactLight" },
    { key: "impactMedium", label: "Impact Medium", type: "impactMedium" },
    { key: "impactHeavy", label: "Impact Heavy", type: "impactHeavy" },
    { key: "notificationSuccess", label: "Notification Success", type: "notificationSuccess" },
    { key: "notificationWarning", label: "Notification Warning", type: "notificationWarning" },
    { key: "notificationError", label: "Notification Error", type: "notificationError" },
    { key: "selection", label: "Selection", type: "selection" },
    { key: "clockTick", label: "Clock Tick", type: "clockTick" }, // Android only
    { key: "keyboardTap", label: "Keyboard Tap", type: "keyboardTap" }, // Android only
  ];

  const triggerHaptic = (pattern) => {
    ReactNativeHapticFeedback.trigger(pattern.type, options);
    setLastPattern(pattern.label);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Haptic Feedback Demo</Text>
      <Text style={styles.subtitle}>Works on iPhone & Android (native only)</Text>

      <ScrollView contentContainerStyle={styles.grid}>
        {patterns.map((p) => (
          <TouchableOpacity
            key={p.key}
            style={[
              styles.button,
              lastPattern === p.label && { borderColor: "#2563eb", borderWidth: 2 },
            ]}
            onPress={() => triggerHaptic(p)}
          >
            <Text style={styles.label}>{p.label}</Text>
            <Text style={styles.small}>{p.type}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <Text style={styles.footer}>
        Last action: {lastPattern ? lastPattern : "— none —"}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: "#f8fafc",
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 6,
    color: "#111827",
  },
  subtitle: {
    fontSize: 14,
    color: "#6b7280",
    marginBottom: 16,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
  button: {
    width: "45%",
    padding: 16,
    margin: 6,
    backgroundColor: "#fff",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "rgba(17,24,39,0.06)",
    justifyContent: "center",
    alignItems: "center",
    elevation: 2,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 4,
  },
  small: {
    fontSize: 12,
    color: "#6b7280",
  },
  footer: {
    marginTop: 20,
    fontSize: 13,
    color: "#374151",
  },
});
