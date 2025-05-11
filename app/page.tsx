"use client"; // This page is interactive, so it needs to be a Client Component

import React, { useState, useEffect } from "react"; // Import useState and useEffect
// import Image from 'next/image'; // Image import is not used currently
import CoinCounter from "../components/CoinCounter";
import GameButton from "../components/GameButton";
import BoostsMenu from "../components/BoostsMenu"; // Import BoostsMenu
import EnergyBar from "../components/EnergyBar"; // Import EnergyBar
import FriendCounter from "../components/FriendCounter"; // Import FriendCounter
import LeaderboardDisplay from "../components/LeaderboardDisplay"; // Import LeaderboardDisplay
import ActionButton from "../components/ActionButton"; // Import ActionButton
import RegenFeedbackText from "../components/RegenFeedbackText"; // Import RegenFeedbackText

const ENERGY_REGENERATION_RATE = 1;
const ENERGY_REGENERATION_INTERVAL = 1000;

interface RegenFeedbackTextState {
  // Interface for regen feedback text
  id: string;
  text: string;
}

export default function HomePage() {
  const [coinCount, setCoinCount] = useState(18); // Updated to match image
  const [isBoostsMenuOpen, setIsBoostsMenuOpen] = useState(false); // State for BoostsMenu
  const [energy, setEnergy] = useState(850); // Example energy
  const [maxEnergy, setMaxEnergy] = useState(1000); // Example max energy
  const [friendCount, setFriendCount] = useState(42); // Updated to match image
  const [leaderboardRank, setLeaderboardRank] = useState(1337); // Updated to match image
  const [leaderboardBadge, setLeaderboardBadge] = useState(""); // Removed trophy badge
  const [regenFeedbackTexts, setRegenFeedbackTexts] = useState<
    RegenFeedbackTextState[]
  >([]); // State for regen texts

  const handleCoinClick = () => {
    setCoinCount((prev) => prev + 1);
    setEnergy((prev) => Math.max(0, prev - 10)); // Decrease energy on click
  };

  const toggleBoostsMenu = () => {
    setIsBoostsMenuOpen(!isBoostsMenuOpen);
  };

  const removeRegenFeedbackText = (id: string) => {
    setRegenFeedbackTexts((prevTexts) =>
      prevTexts.filter((text) => text.id !== id)
    );
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setEnergy((prevEnergy) => {
        if (prevEnergy < maxEnergy) {
          const newEnergy = Math.min(
            prevEnergy + ENERGY_REGENERATION_RATE,
            maxEnergy
          );
          if (newEnergy > prevEnergy) {
            const newFeedback: RegenFeedbackTextState = {
              // Improved ID generation with Math.random()
              id: `regen-${Date.now()}-${Math.random()
                .toString(36)
                .substr(2, 5)}`,
              text: `+${ENERGY_REGENERATION_RATE}⚡`,
            };
            setRegenFeedbackTexts((prevFeedback) => [
              ...prevFeedback,
              newFeedback,
            ]);
          }
          return newEnergy;
        }
        return prevEnergy;
      });
    }, ENERGY_REGENERATION_INTERVAL);

    return () => {
      clearInterval(timer);
    };
  }, [maxEnergy]); // Removed ENERGY_REGENERATION_RATE as it's a constant and won't change behavior here

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
      {/* Regen Feedback Texts - rendered in the main container to use absolute positioning effectively */}
      {regenFeedbackTexts.map((feedback) => (
        <RegenFeedbackText
          key={feedback.id}
          id={feedback.id}
          text={feedback.text}
          onComplete={removeRegenFeedbackText}
        />
      ))}

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
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
        }}
      >
        <CoinCounter count={coinCount} />
        <EnergyBar currentEnergy={energy} maxEnergy={maxEnergy} />
        {/* Energy Info Text Display */}
        <div
          style={{
            color: "rgba(255, 255, 255, 0.9)",
            fontSize: "0.8rem",
            margin: 0,
            marginTop: "4px", // Spacing from EnergyBar
            marginBottom: "15px", // Spacing before GameButton
            fontWeight: "500",
            textAlign: "center",
            display: "flex", // To place items side-by-side
            alignItems: "center",
            gap: "10px", // Space between limit and regen rate
          }}
        >
          <span>
            {energy} / {maxEnergy}
          </span>
          <span
            style={{ fontSize: "0.7rem", color: "rgba(255, 255, 255, 0.7)" }}
          >
            (+{ENERGY_REGENERATION_RATE}/s)
          </span>
        </div>
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
