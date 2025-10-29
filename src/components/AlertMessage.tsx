import React, { useEffect, useState } from "react";

interface AlertMessageProps {
  type: "success" | "danger";
  children: React.ReactNode;
  duration?: number; // duración opcional (en milisegundos)
}

const AlertMessage: React.FC<AlertMessageProps> = ({
  type,
  children,
  duration = 3000, // por defecto 3 segundos
}) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
    }, duration);
    return () => clearTimeout(timer);
  }, [duration]);

  if (!visible) return null;

  const bgColor =
    type === "success"
      ? "rgba(0, 255, 0, 0.1)" // verde translúcido
      : "rgba(255, 0, 0, 0.15)"; // rojo translúcido
  const borderColor = type === "success" ? "#39ff14" : "#ff4d4d";
  const icon = type === "success" ? "✅" : "❌";
  const textColor = type === "success" ? "#9cff9c" : "#ff8c8c";

  return (
    <div
      className="alert-message my-3 p-3 rounded text-center shadow-sm"
      style={{
        backgroundColor: bgColor,
        border: `1px solid ${borderColor}`,
        color: textColor,
        fontWeight: 500,
        letterSpacing: "0.5px",
        transition: "opacity 0.3s ease",
      }}
    >
      <span style={{ marginRight: "0.5rem" }}>{icon}</span>
      {children}
    </div>
  );
};

export default AlertMessage;
