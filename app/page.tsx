"use client"; // This page is interactive, so it needs to be a Client Component

import React, { useState } from "react"; // Import useState
// import Image from 'next/image'; // Image import is not used currently
import CoinCounter from "../components/CoinCounter";
import GameButton from "../components/GameButton";
import BoostsMenu from "../components/BoostsMenu"; // Import BoostsMenu
import EnergyBar from "../components/EnergyBar"; // Import EnergyBar
import FriendCounter from "../components/FriendCounter"; // Import FriendCounter
import LeaderboardDisplay from "../components/LeaderboardDisplay"; // Import LeaderboardDisplay
import ActionButton from "../components/ActionButton"; // Import ActionButton

export default function HomePage() {
  const [coinCount, setCoinCount] = useState(18); // Updated to match image
  const [isBoostsMenuOpen, setIsBoostsMenuOpen] = useState(false); // State for BoostsMenu
  const [energy, setEnergy] = useState(850); // Example energy
  const [maxEnergy, setMaxEnergy] = useState(1000); // Example max energy
  const [friendCount, setFriendCount] = useState(42); // Updated to match image
  const [leaderboardRank, setLeaderboardRank] = useState(1337); // Updated to match image
  const [leaderboardBadge, setLeaderboardBadge] = useState(""); // Removed trophy badge

  const handleCoinClick = () => {
    setCoinCount((prev) => prev + 1);
    setEnergy((prev) => Math.max(0, prev - 10)); // Decrease energy on click
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
        justifyContent: "space-between", // Keep space-between for overall structure
        minHeight: "100vh",
        padding: "1rem",
        position: "relative",
        // Updated radial gradient to match the image's dark blue/purple theme
        background: `
          radial-gradient(ellipse at center, #202040 0%, #0A0A15 70%)
        `,
        color: "#fff",
        overflow: "hidden",
      }}
    >
      {/* Top Section: Leaderboard, Settings, Friends */}
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center", // Changed to center for vertical alignment
          padding: "0 1rem", // Keep padding
          position: "absolute",
          top: "20px",
          zIndex: 2,
        }}
      >
        <LeaderboardDisplay rank={leaderboardRank} badge={leaderboardBadge} />
        {/* Placeholder for Settings Icon - Will require an icon component */}
        <div style={{ fontSize: "1.5rem" }}></div>
        <FriendCounter count={friendCount} />
      </div>

      {/* Center Section: Coins, Energy Bar, Game Button */}
      <div
        style={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column", // Stack coin count, energy bar, and button vertically
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
        }}
      >
        <CoinCounter count={coinCount} />
        <EnergyBar currentEnergy={energy} maxEnergy={maxEnergy} />
        <GameButton onClick={handleCoinClick} />
      </div>

      {/* Bottom Section: Action Buttons & Info Icon */}
      <div
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          position: "absolute",
          bottom: "20px",
          padding: "0 1rem",
          zIndex: 2,
        }}
      >
        {/* Action Buttons Row */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-around", // space-around for main buttons
            alignItems: "center", // Align items for info icon
            width: "100%",
            maxWidth: "420px", // Adjusted for potential info icon space
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-around",
              width: "calc(100% - 40px)", // Adjust width to make space for info icon
              maxWidth: "380px",
            }}
          >
            <ActionButton onClick={() => console.log("Frens clicked")}>
              {/* Placeholder for Frens Icon */}
              <span>Frens</span>
            </ActionButton>
            <ActionButton onClick={() => console.log("Earn clicked")}>
              {/* Placeholder for Earn Icon */}
              <span>Earn</span>
            </ActionButton>
            <ActionButton onClick={toggleBoostsMenu}>
              {/* Placeholder for Boosts Icon */}
              <span>Boosts</span>
            </ActionButton>
          </div>
          {/* Placeholder for Info Icon - Will require an icon component */}
          <div style={{ fontSize: "1.5rem", marginLeft: "10px" }}></div>
        </div>
      </div>

      <BoostsMenu isOpen={isBoostsMenuOpen} onClose={toggleBoostsMenu} />
    </main>
  );
}
