import React from "react";

interface FriendCounterProps {
  count: number;
}

const FriendCounter: React.FC<FriendCounterProps> = ({ count }) => {
  return (
    <div
      style={{
        marginBottom: "20px",
        fontSize: "1.1rem",
        color: "#b0b0b0", // Lighter grey for visibility
        fontWeight: "600",
        textShadow: "0 0 5px rgba(255, 255, 255, 0.1)", // Subtle white glow
      }}
    >
      <span role="img" aria-label="friends icon" style={{ marginRight: "8px" }}>
        👥
      </span>{" "}
      {/* Simple emoji icon */}
      {count} Friends
    </div>
  );
};

export default FriendCounter;
