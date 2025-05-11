import React from "react";

interface ButtonProps {
  onClick?: () => void;
  children: React.ReactNode;
}

const ActionButton: React.FC<ButtonProps> = ({ onClick, children }) => {
  const baseShadow =
    "0 0 5px rgba(78, 255, 161, 0.4), 0 0 10px rgba(78, 255, 161, 0.3), inset 0 0 6px rgba(78, 255, 161, 0.2)";
  const hoverShadow =
    "0 0 8px rgba(78, 255, 161, 0.6), 0 0 15px rgba(78, 255, 161, 0.4), inset 0 0 8px rgba(78, 255, 161, 0.3)";

  return (
    <button
      onClick={onClick}
      style={{
        padding: "12px 20px",
        fontSize: "1rem",
        backgroundColor: "rgba(30, 50, 45, 0.2)", // Darker, more translucent base for neon effect
        color: "#4EFFA1",
        border: "none", // Remove direct border, use shadow for neon effect
        borderRadius: "10px",
        cursor: "pointer",
        flexGrow: 1,
        margin: "0 8px",
        textAlign: "center",
        transition:
          "background-color 0.2s ease, box-shadow 0.2s ease, transform 0.1s ease",
        boxShadow: baseShadow, // Soft neon border and inner glow
        outline: "none",
        transform: "scale(1)",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = "rgba(40, 60, 55, 0.3)";
        e.currentTarget.style.boxShadow = hoverShadow;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = "rgba(30, 50, 45, 0.2)";
        e.currentTarget.style.boxShadow = baseShadow;
        e.currentTarget.style.transform = "scale(1)"; // Reset scale on mouse leave
      }}
      onMouseDown={(e) => {
        e.currentTarget.style.transform = "scale(0.95)";
        e.currentTarget.style.backgroundColor = "rgba(45, 70, 65, 0.4)"; // Darken slightly more on press
      }}
      onMouseUp={(e) => {
        e.currentTarget.style.transform = "scale(1)";
        // Restore hover style if mouse is still over, otherwise base style will be set by onMouseLeave
        if (e.currentTarget.matches(":hover")) {
          e.currentTarget.style.backgroundColor = "rgba(40, 60, 55, 0.3)";
          e.currentTarget.style.boxShadow = hoverShadow;
        } else {
          e.currentTarget.style.backgroundColor = "rgba(30, 50, 45, 0.2)";
          e.currentTarget.style.boxShadow = baseShadow;
        }
      }}
    >
      {children}
    </button>
  );
};

export default ActionButton;
