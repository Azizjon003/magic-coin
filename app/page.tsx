"use client"; // This page is interactive, so it needs to be a Client Component

import React, { useState } from "react"; // Import useState
// import Image from 'next/image'; // Image import is not used currently
import CoinCounter from "../components/CoinCounter";
import GameButton from "../components/GameButton";
import BoostsMenu from "../components/BoostsMenu"; // Import BoostsMenu

export default function HomePage() {
  const [coinCount, setCoinCount] = useState(0);
  const [isBoostsMenuOpen, setIsBoostsMenuOpen] = useState(false); // State for BoostsMenu

  const handleCoinClick = () => {
    setCoinCount((prev) => prev + 1); // Basic increment, will add multipliers later
  };

  const toggleBoostsMenu = () => {
    setIsBoostsMenuOpen(!isBoostsMenuOpen);
  };

  return (
    <main
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-between", // Pushes counter to top, button to center, boosts toggle to bottom
        minHeight: "100vh",
        padding: "2rem", // Some padding around the content
        position: "relative", // For positioning boosts menu or other elements
      }}
    >
      <CoinCounter count={coinCount} />

      <div
        style={{
          flexGrow: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <GameButton onClick={handleCoinClick} />
      </div>

      <div style={{ position: "absolute", bottom: "20px", zIndex: 1 }}>
        {" "}
        {/* Ensure button is clickable if menu is behind */}
        <button
          onClick={toggleBoostsMenu}
          style={{
            padding: "10px 20px",
            fontSize: "1rem",
            backgroundColor: "#4EFFA1",
            color: "#1A1A1D",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
          }}
        >
          Boosts
        </button>
      </div>

      <BoostsMenu isOpen={isBoostsMenuOpen} onClose={toggleBoostsMenu} />
    </main>
  );
}
