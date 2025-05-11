"use client";

import React, { useState, useEffect } from "react";
import "./GameButton.css"; // For animations and complex styles
import TapParticle from "./TapParticle"; // Import the particle component
import ClickFeedbackText from "./ClickFeedbackText"; // Import the new feedback text component

interface GameButtonProps {
  onClick: () => void; // To trigger game logic in parent
  lastClickInfo: { amount: number; isCritical: boolean } | null; // Info about the last click
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

const GameButton: React.FC<GameButtonProps> = ({ onClick, lastClickInfo }) => {
  const [particles, setParticles] = useState<ParticleState[]>([]);
  const [clickFeedbackTexts, setClickFeedbackTexts] = useState<
    ClickFeedbackTextState[]
  >([]);

  // Store the button ref to get its dimensions for positioning particles/text
  const buttonRef = React.useRef<HTMLButtonElement>(null);

  // Effect to create feedback text when lastClickInfo changes
  useEffect(() => {
    if (lastClickInfo && buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      // Attempt to place feedback near the center of the button, or a random spot
      // This is a simplified positioning, might need adjustment
      const x = rect.width / 2 + (Math.random() - 0.5) * (rect.width * 0.4);
      const y = rect.height / 2 + (Math.random() - 0.5) * (rect.height * 0.4);

      const newFeedbackText: ClickFeedbackTextState = {
        id: `feedback-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
        text: `${lastClickInfo.isCritical ? "CRIT! " : ""}+${
          lastClickInfo.amount
        }`,
        x: x,
        y: y,
        // We can add an isCritical prop to ClickFeedbackTextState if we want to style it differently
      };
      setClickFeedbackTexts((prevTexts) => [...prevTexts, newFeedbackText]);
    }
  }, [lastClickInfo]); // Trigger when lastClickInfo changes

  const handleInteractionEvents = (
    event:
      | React.MouseEvent<HTMLButtonElement>
      | React.TouchEvent<HTMLButtonElement>
  ) => {
    onClick(); // Trigger the main game logic from parent

    if (!buttonRef.current) return;

    // Particle generation logic (can be triggered per touch point in TouchEvent)
    let interactionPoints: Array<{ clientX: number; clientY: number }> = [];
    if ("changedTouches" in event) {
      // TouchEvent
      interactionPoints = Array.from(
        (event as React.TouchEvent<HTMLButtonElement>).changedTouches
      ).map((t) => ({ clientX: t.clientX, clientY: t.clientY }));
    } else {
      // MouseEvent
      interactionPoints.push({
        clientX: (event as React.MouseEvent<HTMLButtonElement>).clientX,
        clientY: (event as React.MouseEvent<HTMLButtonElement>).clientY,
      });
    }

    const rect = buttonRef.current.getBoundingClientRect();
    const newParticlesBatch: ParticleState[] = [];

    interactionPoints.forEach((point) => {
      const interactionX = point.clientX - rect.left;
      const interactionY = point.clientY - rect.top;
      const numParticles = 2 + Math.floor(Math.random() * 2); // Reduced particles: 2-3
      for (let i = 0; i < numParticles; i++) {
        newParticlesBatch.push({
          id: `particle-${Date.now()}-${Math.random()
            .toString(36)
            .substr(2, 5)}-${point.clientX}-${i}`,
          x: interactionX,
          y: interactionY,
        });
      }
    });
    setParticles((prevParticles) => [...prevParticles, ...newParticlesBatch]);
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
      ref={buttonRef} // Assign ref to the button
      onClick={handleInteractionEvents}
      onTouchStart={handleInteractionEvents}
      className="game-button"
      style={{
        width: "250px",
        height: "250px",
        borderRadius: "50%",
        backgroundColor: "#F39C12",
        border: "3px solid #D35400",
        color: "white",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        outline: "none",
        boxShadow: `
          0 0 15px #FFC300,
          0 0 30px #F39C12,
          inset 0 0 10px rgba(255, 215, 0, 0.5),
          inset 0 2px 5px rgba(255, 255, 255, 0.3)
        `,
        transition: "transform 0.1s ease, box-shadow 0.2s ease",
      }}
      onMouseDown={(e) => (e.currentTarget.style.transform = "scale(0.95)")}
      onMouseUp={(e) => (e.currentTarget.style.transform = "scale(1)")}
      onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
    >
      {particles.map((particle) => (
        <TapParticle
          key={particle.id}
          id={particle.id}
          startX={particle.x}
          startY={particle.y}
          onComplete={removeParticle}
        />
      ))}
      {clickFeedbackTexts.map((feedback) => (
        <ClickFeedbackText
          key={feedback.id}
          id={feedback.id}
          text={feedback.text}
          x={feedback.x}
          y={feedback.y}
          onComplete={removeClickFeedbackText}
          // We could pass isCritical here if ClickFeedbackText is adapted
        />
      ))}
    </button>
  );
};

export default GameButton;
