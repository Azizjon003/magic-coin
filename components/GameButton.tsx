"use client";

import React, { useState } from "react";
import "./GameButton.css"; // For animations and complex styles
import TapParticle from "./TapParticle"; // Import the particle component

interface GameButtonProps {
  onClick: () => void;
}

interface ParticleState {
  id: string;
  x: number;
  y: number;
}

const GameButton: React.FC<GameButtonProps> = ({ onClick }) => {
  const [particles, setParticles] = useState<ParticleState[]>([]);

  const handleButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onClick(); // Call original onClick

    // Create a few particles at click location relative to the button
    const rect = event.currentTarget.getBoundingClientRect();
    const clickX = event.clientX - rect.left;
    const clickY = event.clientY - rect.top;
    const numParticles = 5 + Math.floor(Math.random() * 5); // 5 to 9 particles

    const newParticles: ParticleState[] = [];
    for (let i = 0; i < numParticles; i++) {
      newParticles.push({
        id: `particle-${Date.now()}-${i}`,
        x: clickX,
        y: clickY,
      });
    }
    setParticles((prevParticles) => [...prevParticles, ...newParticles]);
  };

  const removeParticle = (id: string) => {
    setParticles((prevParticles) => prevParticles.filter((p) => p.id !== id));
  };

  return (
    <button
      onClick={handleButtonClick}
      className="game-button"
      style={{
        width: "200px", // Larger button
        height: "200px",
        borderRadius: "50%", // Circular button
        backgroundColor: "rgba(40, 70, 60, 0.3)", // Semi-transparent greenish-blue base for glass
        border: "3px solid rgba(78, 255, 161, 0.4)", // Softer, thinner border
        color: "white",
        fontSize: "1.5rem",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative", // For pseudo-elements like glows or reflections
        outline: "none",
        // Enhanced glassy effect with multiple layered shadows
        boxShadow: `
          /* Outer Glow */
          0 0 10px rgba(78, 255, 161, 0.4),
          0 0 20px rgba(78, 255, 161, 0.3),
          /* Glass Edge Highlight (Top-ish) */
          inset 0 3px 5px rgba(120, 255, 200, 0.2),
          /* Main Inner Shadow for depth */
          inset 0 -5px 15px rgba(0, 20, 10, 0.5),
          /* Subtle inner reflection/highlight */
          inset 0 0 15px rgba(78, 255, 161, 0.2)
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

      {/* Central glowing element or icon - can be an SVG or styled div */}
      <div
        className="game-button-icon"
        style={{
          width: "70px", // Slightly smaller icon to fit the new glass look
          height: "70px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(100,255,180,1) 0%, rgba(78,255,161,0.7) 50%, rgba(78,255,161,0) 90%)",
          boxShadow:
            "0 0 15px rgba(78,255,161,0.7), 0 0 25px rgba(78,255,161,0.4)",
          // Add a subtle inner shadow to the icon itself for more depth
          WebkitBackdropFilter: "blur(5px)", // For a frosted glass effect if supported
          backdropFilter: "blur(5px)",
          border: "1px solid rgba(255, 255, 255, 0.1)",
        }}
      />
      {/* You can replace this div with an <Image> or SVG for a more specific coin look */}
      {/* <span style={{position: 'absolute', fontSize: '1rem', bottom: '20px', color: 'rgba(255,255,255,0.5)'}}>Tap!</span> */}
    </button>
  );
};

export default GameButton;
