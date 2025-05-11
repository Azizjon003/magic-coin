import React, { useState, useEffect } from "react";

interface LeaderboardDisplayProps {
  rank: number;
  badge: string; // Could be an enum or specific type later for different badge images/styles
}

const LeaderboardDisplay: React.FC<LeaderboardDisplayProps> = ({
  rank,
  badge,
}) => {
  const [isBouncing, setIsBouncing] = useState(false);

  useEffect(() => {
    // Trigger bounce if rank changes (and is not the initial rank, assuming rank can be 0 or some initial non-bouncing state)
    // This logic might need adjustment based on how initial rank is handled.
    setIsBouncing(true);
    const timer = setTimeout(() => setIsBouncing(false), 300); // Duration of bounce animation
    return () => clearTimeout(timer);
  }, [rank]);

  const badgeColor = badge.toLowerCase() === "platinum" ? "#E5E4E2" : "#D4AF37"; // Platinum or Gold-like
  const badgeTextColor =
    badge.toLowerCase() === "platinum" ? "#4A4A4A" : "#ffffff";
  const badgeTextShadow =
    badge.toLowerCase() === "platinum"
      ? "1px 1px 1px #ffffff"
      : "1px 1px 1px #000000";

  return (
    <div
      style={{
        textAlign: "right",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-end",
      }}
    >
      <div
        // className={isBouncing ? 'rank-bounce-effect' : ''} // Add this if using a CSS class
        style={{
          fontSize: "1.4rem",
          fontWeight: "bold",
          color: "#E0E0E0", // Light grey, almost white
          textShadow: "0 0 5px rgba(255, 255, 255, 0.3)", // Subtle glow for rank
          marginBottom: "2px",
          transform: isBouncing ? "translateY(-5px)" : "translateY(0)", // Inline bounce part
          transition: "transform 0.15s ease-out", // Smoothen the bounce a bit
        }}
        onAnimationEnd={() => {
          if (isBouncing) setTimeout(() => setIsBouncing(false), 150);
        }} // Reset for next bounce if combined with keyframes
      >
        Rank: {rank}
      </div>
      <div
        style={{
          fontSize: "0.9rem",
          fontWeight: "600",
          color: badgeTextColor,
          backgroundColor: badgeColor, // Metallic background
          padding: "3px 8px",
          borderRadius: "5px",
          border: `1px solid ${badgeTextColor}`,
          boxShadow: `0 0 10px ${badgeColor}, inset 0 0 3px rgba(0,0,0,0.2)`,
          textShadow: badgeTextShadow,
          minWidth: "80px",
          textAlign: "center",
        }}
      >
        {badge}
      </div>
    </div>
  );
};

export default LeaderboardDisplay;
