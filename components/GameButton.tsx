"use client";

import React, { useState } from "react";
import "./GameButton.css"; // For animations and complex styles
import TapParticle from "./TapParticle"; // Import the particle component
import ClickFeedbackText from "./ClickFeedbackText"; // Import the new feedback text component

interface GameButtonProps {
  onClick: () => void;
}

interface ParticleState {
  id: string;
  x: number;
  y: number;
}

interface ClickFeedbackTextState {
  id: string;
  text: string;
  x: number;
  y: number;
}

const GameButton: React.FC<GameButtonProps> = ({ onClick }) => {
  const [particles, setParticles] = useState<ParticleState[]>([]);
  const [clickFeedbackTexts, setClickFeedbackTexts] = useState<
    ClickFeedbackTextState[]
  >([]);

  // Combined handler for both mouse click and touch start
  const handleInteraction = (
    clientX: number,
    clientY: number,
    currentTarget: HTMLButtonElement
  ) => {
    onClick(); // Call original onClick passed from parent (e.g., to update coin count)

    const rect = currentTarget.getBoundingClientRect();
    const interactionX = clientX - rect.left;
    const interactionY = clientY - rect.top;

    // Create a few particles at interaction location
    const numParticles = 3 + Math.floor(Math.random() * 3); // Reduced: 3 to 5 particles
    const newParticles: ParticleState[] = [];
    for (let i = 0; i < numParticles; i++) {
      newParticles.push({
        id: `particle-${Date.now()}-${Math.random()
          .toString(36)
          .substr(2, 5)}-${i}`,
        x: interactionX,
        y: interactionY,
      });
    }
    setParticles((prevParticles) => [...prevParticles, ...newParticles]);

    // Create a "+1" feedback text
    const newFeedbackText: ClickFeedbackTextState = {
      id: `feedback-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
      text: "+1",
      x: interactionX,
      y: interactionY,
    };
    setClickFeedbackTexts((prevTexts) => [...prevTexts, newFeedbackText]);
  };

  const handleMouseClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    handleInteraction(event.clientX, event.clientY, event.currentTarget);
  };

  const handleTouchStart = (event: React.TouchEvent<HTMLButtonElement>) => {
    // Iterate over all new touches (fingers)
    Array.from(event.changedTouches).forEach((touch) => {
      handleInteraction(touch.clientX, touch.clientY, event.currentTarget);
    });
  };

  const removeParticle = (id: string) => {
    setParticles((prevParticles) => prevParticles.filter((p) => p.id !== id));
  };

  const removeClickFeedbackText = (id: string) => {
    setClickFeedbackTexts((prevTexts) =>
      prevTexts.filter((text) => text.id !== id)
    );
  };

  return (
    <button
      onClick={handleMouseClick} // Keep for desktop compatibility
      onTouchStart={handleTouchStart} // Add touch handler for multi-touch
      className="game-button"
      style={{
        width: "250px", // Increased size to be the main coin
        height: "250px", // Increased size
        borderRadius: "50%",
        backgroundColor: "#F39C12", // Base orange color for the coin
        border: "3px solid #D35400", // Darker orange border for some definition
        color: "white",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        outline: "none",
        boxShadow: `
          /* Outer Glow */
          0 0 15px #FFC300,
          0 0 30px #F39C12,
          /* Inner Highlight for 3D effect */
          inset 0 0 10px rgba(255, 215, 0, 0.5),
          inset 0 2px 5px rgba(255, 255, 255, 0.3)
        `,
        transition: "transform 0.1s ease, box-shadow 0.2s ease",
      }}
      onMouseDown={(e) => (e.currentTarget.style.transform = "scale(0.95)")}
      onMouseUp={(e) => (e.currentTarget.style.transform = "scale(1)")}
      onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")} // Reset if mouse leaves while pressed
    >
      {/* Render particles */}
      {particles.map((particle) => (
        <TapParticle
          key={particle.id}
          id={particle.id}
          startX={particle.x}
          startY={particle.y}
          onComplete={removeParticle}
        />
      ))}

      {/* Render click feedback texts */}
      {clickFeedbackTexts.map((feedback) => (
        <ClickFeedbackText
          key={feedback.id}
          id={feedback.id}
          text={feedback.text}
          x={feedback.x}
          y={feedback.y}
          onComplete={removeClickFeedbackText}
        />
      ))}

      {/* Central glowing element is now the button itself */}
      {/* The content below can be removed or repurposed if needed, for now, it's effectively hidden by the button's own styling */}
      {/* <div
        className="game-button-icon"
        style={{
          width: "70px", 
          height: "70px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(100,255,180,1) 0%, rgba(78,255,161,0.7) 50%, rgba(78,255,161,0) 90%)",
          boxShadow:
            "0 0 15px rgba(78,255,161,0.7), 0 0 25px rgba(78,255,161,0.4)",
          WebkitBackdropFilter: "blur(5px)", 
          backdropFilter: "blur(5px)",
          border: "1px solid rgba(255, 255, 255, 0.1)",
        }}
      /> */}
    </button>
  );
};

export default GameButton;
