"use client";

import React, { useState, useEffect } from "react";
import "./CoinCounter.css"; // We'll create this for animations

interface CoinCounterProps {
  count: number;
}

const CoinCounter: React.FC<CoinCounterProps> = ({ count }) => {
  const [isBouncing, setIsBouncing] = useState(false);

  useEffect(() => {
    if (count > 0) {
      // Trigger bounce on count increase (not initial load if count is 0)
      setIsBouncing(true);
      const timer = setTimeout(() => setIsBouncing(false), 300); // Duration of bounce animation
      return () => clearTimeout(timer);
    }
  }, [count]);

  return (
    <div
      style={{
        textAlign: "center",
        zIndex: 2,
        display: "flex", // Added for centering text block
        flexDirection: "column", // Stack count and subtitle
        alignItems: "center", // Center items horizontally
        justifyContent: "center", // Center items vertically
      }}
    >
      <h1
        className={`text-shimmer-effect ${isBouncing ? "bounce-effect" : ""}`}
        style={{
          fontSize: "3.5rem",
          fontWeight: "bold",
          color: "#FFFFFF",
          margin: 0,
          textShadow: "0 0 10px rgba(255, 255, 255, 0.7)", // Only white glow
          letterSpacing: "1px",
        }}
      >
        {count.toLocaleString()}
      </h1>
      <p
        style={{
          color: "rgba(255, 255, 255, 0.8)",
          fontSize: "0.9rem",
          margin: 0,
          marginTop: "-5px", // Adjust spacing
          fontWeight: "500",
          letterSpacing: "0.5px",
        }}
      >
        COINS
      </p>
    </div>
  );
};

export default CoinCounter;
