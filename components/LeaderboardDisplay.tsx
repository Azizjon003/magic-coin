import React from "react";
import "../components/CoinCounter.css"; // Import to use .text-shimmer-effect and .bounce-effect

interface LeaderboardDisplayProps {
  rank: number;
  badge: string; // Could be an enum or specific type later for different badge images/styles
}

const LeaderboardDisplay: React.FC<LeaderboardDisplayProps> = ({
  rank,
  badge,
}) => {
  // Simplified badge styling based on type
  const getBadgeStyles = () => {
    switch (badge.toLowerCase()) {
      case "platinum":
        return {
          backgroundColor: "#E5E4E2",
          textColor: "#4A4A4A",
        };
      case "gold":
        return {
          backgroundColor: "#D4AF37",
          textColor: "#ffffff",
        };
      case "silver":
        return {
          backgroundColor: "#C0C0C0",
          textColor: "#333333",
        };
      case "bronze":
        return {
          backgroundColor: "#CD7F32",
          textColor: "#ffffff",
        };
      default:
        return {
          backgroundColor: "#4A90E2",
          textColor: "#ffffff",
        };
    }
  };

  const badgeStyle = getBadgeStyles();

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        background: "rgba(0, 0, 0, 0.3)",
        borderRadius: "8px",
        padding: "8px 12px",
      }}
    >
      <div
        style={{
          fontSize: "1.2rem",
          fontWeight: "bold",
          color: "#E0E0E0",
          marginBottom: "5px",
          display: "flex",
          alignItems: "center",
        }}
      >
        <span style={{ marginRight: "5px" }}>Rank:</span>
        <span>{rank}</span>
      </div>
      <div
        style={{
          fontSize: "0.9rem",
          fontWeight: "600",
          color: badgeStyle.textColor,
          backgroundColor: badgeStyle.backgroundColor,
          padding: "4px 10px",
          borderRadius: "4px",
          minWidth: "80px",
          textAlign: "center",
          textTransform: "uppercase",
        }}
      >
        {badge}
      </div>
    </div>
  );
};

export default LeaderboardDisplay;
