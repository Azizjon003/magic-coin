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
        // Removed specific top/left positioning to be controlled by parent in HomePage
        // position: 'absolute',
        // top: '20px',
        // left: '50%',
        // transform: 'translateX(-50%)',
        zIndex: 2, // Ensure it's above background elements
      }}
    >
      <h1
        className={`coin-count-shimmer ${isBouncing ? "bounce-effect" : ""}`}
        style={{
          fontSize: "3.5rem", // Large, bold numbers
          fontWeight: "bold",
          color: "#FFFFFF", // Bright white
          margin: 0,
          textShadow:
            "0 0 10px rgba(255, 255, 255, 0.7), 0 0 20px rgba(78, 255, 161, 0.5)", // White and accent glow
          letterSpacing: "1px",
        }}
      >
        {count.toLocaleString()} {/* Format number with commas */}
      </h1>
    </div>
  );
};

export default CoinCounter;
