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
  const [coinCount, setCoinCount] = useState(0);
  const [isBoostsMenuOpen, setIsBoostsMenuOpen] = useState(false); // State for BoostsMenu
  const [energy, setEnergy] = useState(850); // Example energy
  const [maxEnergy, setMaxEnergy] = useState(1000); // Example max energy
  const [friendCount, setFriendCount] = useState(123); // Example friend count
  const [leaderboardRank, setLeaderboardRank] = useState(7); // Example rank
  const [leaderboardBadge, setLeaderboardBadge] = useState("Platinum"); // Example badge

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
        justifyContent: "space-between",
        minHeight: "100vh",
        padding: "1rem",
        position: "relative",
        // Updated radial gradient with greenish-blue hues
        // Noise texture could be added via a global CSS on body/html or a ::before pseudo-element with a base64 noise image
        // e.g., background: 'radial-gradient(ellipse at center, #1a3a3a 0%, #0a1f1f 70%), url(data:image/png;base64,iVBOR...)',
        background:
          "radial-gradient(ellipse at center, #183830 0%, #081810 70%)", // Dark greenish-blue hues
        color: "#fff",
        overflow: "hidden", // To contain any potential particle effects if they go out of bounds
      }}
    >
      {/* Top Section: Coin Counter & Leaderboard */}
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          padding: "0 1rem",
          position: "absolute",
          top: "20px",
          zIndex: 2,
        }}
      >
        <CoinCounter count={coinCount} />
        <LeaderboardDisplay rank={leaderboardRank} badge={leaderboardBadge} />
      </div>

      {/* Center Section: Game Button */}
      <div
        style={{
          flexGrow: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "100%", // Ensure it takes full width for centering the button
        }}
      >
        <GameButton onClick={handleCoinClick} />
      </div>

      {/* Bottom Section: Energy, Friends, Buttons */}
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
        <EnergyBar currentEnergy={energy} maxEnergy={maxEnergy} />
        <FriendCounter count={friendCount} />

        {/* Action Buttons */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            width: "100%",
            maxWidth: "380px",
          }}
        >
          <ActionButton onClick={() => console.log("Frens clicked")}>
            Frens
          </ActionButton>
          <ActionButton onClick={() => console.log("Earn clicked")}>
            Earn
          </ActionButton>
          <ActionButton onClick={toggleBoostsMenu}>Boosts</ActionButton>
        </div>
      </div>

      <BoostsMenu isOpen={isBoostsMenuOpen} onClose={toggleBoostsMenu} />
    </main>
  );
}
