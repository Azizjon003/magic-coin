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

const ENERGY_REGENERATION_RATE = 10;
const ENERGY_REGENERATION_INTERVAL = 1000;
const AUTO_CLICK_RATE = 5; // Coins per auto-click event
const AUTO_CLICK_INTERVAL = 1000; // Milliseconds (1 second for auto-click)
const CRITICAL_CLICK_CHANCE = 0.1; // 10% chance
const CRITICAL_CLICK_MULTIPLIER = 5; // 5x bonus
const TEMPORARY_BOOST_DURATION = 30; // seconds
const TEMPORARY_BOOST_ADDITIONAL_POWER = 10; // e.g., click power becomes base + 10

interface RegenFeedbackTextState {
  // Interface for regen feedback text
  id: string;
  text: string;
}

export default function HomePage() {
  const [coinCount, setCoinCount] = useState(18); // Updated to match image
  const [isBoostsMenuOpen, setIsBoostsMenuOpen] = useState(false); // State for BoostsMenu
  const [energy, setEnergy] = useState(850); // Example energy
  const [maxEnergy] = useState(1000); // Example max energy
  const [friendCount] = useState(42); // Updated to match image
  const [leaderboardRank] = useState(1337); // Updated to match image
  const [leaderboardBadge] = useState(""); // Removed trophy badge
  const [regenFeedbackTexts, setRegenFeedbackTexts] = useState<
    RegenFeedbackTextState[]
  >([]); // State for regen texts

  // New states for boosts
  const [isAutoClickActive, setIsAutoClickActive] = useState(false);
  const [clickPower, setClickPower] = useState(5); // Base click power
  const [isX2MultiplierActive, setIsX2MultiplierActive] = useState(true);
  const [lastClickInfo, setLastClickInfo] = useState<{
    amount: number;
    isCritical: boolean;
  } | null>(null);

  // Temporary Boost states
  const [isTemporaryBoostActive, setIsTemporaryBoostActive] = useState(false);
  const [temporaryBoostEndTime, setTemporaryBoostEndTime] = useState<
    number | null
  >(null);
  const [temporaryBoostTimeLeft, setTemporaryBoostTimeLeft] = useState(0); // New state for time left display

  const calculateEffectiveClickPower = () => {
    let effectivePower = clickPower;
    if (isTemporaryBoostActive) {
      effectivePower += TEMPORARY_BOOST_ADDITIONAL_POWER;
    }
    return effectivePower;
  };

  const handleCoinClick = () => {
    if (energy >= 10) {
      let currentEffectiveClickPower = calculateEffectiveClickPower();
      let amountToAdd = currentEffectiveClickPower;
      let isCritical = false;

      if (isX2MultiplierActive) {
        amountToAdd *= 2;
      }

      if (Math.random() < CRITICAL_CLICK_CHANCE) {
        amountToAdd *= CRITICAL_CLICK_MULTIPLIER;
        isCritical = true;
      }

      setCoinCount((prev) => prev + amountToAdd);
      setEnergy((prev) => Math.max(0, prev - 10));
      setLastClickInfo({ amount: amountToAdd, isCritical });
    }
  };

  const toggleBoostsMenu = () => {
    setIsBoostsMenuOpen(!isBoostsMenuOpen);
  };

  const removeRegenFeedbackText = (id: string) => {
    setRegenFeedbackTexts((prevTexts) =>
      prevTexts.filter((text) => text.id !== id)
    );
  };

  // Boost toggle functions
  const toggleAutoClick = () => {
    setIsAutoClickActive((prev) => !prev);
  };

  const toggleX2Multiplier = () => {
    setIsX2MultiplierActive((prev) => !prev);
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

  // Effect for Auto-click
  useEffect(() => {
    if (!isAutoClickActive) return;

    const autoClickTimer = setInterval(() => {
      let amountFromAutoClick = AUTO_CLICK_RATE;
      if (isX2MultiplierActive) {
        amountFromAutoClick *= 2;
      }
      setCoinCount((prevCoinCount) => prevCoinCount + amountFromAutoClick);
    }, AUTO_CLICK_INTERVAL);

    return () => {
      clearInterval(autoClickTimer);
    };
  }, [isAutoClickActive, isX2MultiplierActive]); // Add isX2MultiplierActive to dependencies

  // useEffect for managing Temporary Boost timer AND updating timeLeft display
  useEffect(() => {
    if (!isTemporaryBoostActive || !temporaryBoostEndTime) {
      setTemporaryBoostTimeLeft(0);
      return;
    }

    // Set initial timeLeft immediately
    setTemporaryBoostTimeLeft(
      Math.max(0, Math.round((temporaryBoostEndTime - Date.now()) / 1000))
    );

    const timer = setInterval(() => {
      const timeLeft = Math.max(
        0,
        Math.round((temporaryBoostEndTime - Date.now()) / 1000)
      );
      setTemporaryBoostTimeLeft(timeLeft);

      if (timeLeft <= 0) {
        console.log("Temporary Boost Deactivated!");
        setIsTemporaryBoostActive(false);
        setTemporaryBoostEndTime(null);
        clearInterval(timer);
      }
    }, 1000); // Check every second

    return () => clearInterval(timer);
  }, [isTemporaryBoostActive, temporaryBoostEndTime]);

  const activateTemporaryBoost = () => {
    // Check if the boost is already active to prevent re-activation
    if (!isTemporaryBoostActive) {
      console.log("Temporary Boost Activated!");
      setIsTemporaryBoostActive(true);
      setTemporaryBoostEndTime(Date.now() + TEMPORARY_BOOST_DURATION * 1000);
      // Optionally, set initial timeLeft here as well, or let the useEffect handle it
      // setTemporaryBoostTimeLeft(TEMPORARY_BOOST_DURATION);
    }
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
        {isTemporaryBoostActive && temporaryBoostTimeLeft > 0 && (
          <div
            style={{
              textAlign: "center",
              marginTop: "5px",
              marginBottom: "5px",
            }}
          >
            <p
              style={{
                margin: 0,
                fontSize: "0.9rem",
                color: "#FFD700",
                fontWeight: "bold",
              }}
            >
              🚀 Boost Active: {temporaryBoostTimeLeft}s
            </p>
          </div>
        )}
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
        <GameButton onClick={handleCoinClick} lastClickInfo={lastClickInfo} />
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

      <BoostsMenu
        isOpen={isBoostsMenuOpen}
        onClose={toggleBoostsMenu}
        onActivateTemporaryBoost={activateTemporaryBoost}
        isTemporaryBoostActive={isTemporaryBoostActive}
        isAutoClickActive={isAutoClickActive}
        toggleAutoClick={toggleAutoClick}
        isX2MultiplierActive={isX2MultiplierActive}
        toggleX2Multiplier={toggleX2Multiplier}
      />
    </main>
  );
}
