import React from "react";

interface ActionButtonProps {
  onClick: () => void;
  children: React.ReactNode;
}

const ActionButton: React.FC<ActionButtonProps> = ({ onClick, children }) => {
  return (
    <button
      onClick={onClick}
      style={{
        background: "rgba(25, 25, 40, 0.7)", // Dark, semi-transparent background
        color: "#fff",
        border: "1px solid rgba(255, 255, 255, 0.2)", // Subtle light border
        borderRadius: "12px", // Rounded corners
        padding: "10px 15px",
        fontSize: "0.9rem",
        fontWeight: "600",
        cursor: "pointer",
        textAlign: "center",
        minWidth: "100px", // Ensure buttons have a decent width
        boxShadow: "0 2px 5px rgba(0,0,0,0.2)", // Subtle shadow for depth
        transition: "background-color 0.2s ease, transform 0.1s ease",
      }}
      onMouseEnter={(e) =>
        (e.currentTarget.style.background = "rgba(35, 35, 55, 0.8)")
      } // Darken on hover
      onMouseLeave={(e) =>
        (e.currentTarget.style.background = "rgba(25, 25, 40, 0.7)")
      } // Revert on leave
      onMouseDown={(e) => (e.currentTarget.style.transform = "scale(0.96)")}
      onMouseUp={(e) => (e.currentTarget.style.transform = "scale(1)")}
    >
      {children}
    </button>
  );
};

export default ActionButton;
