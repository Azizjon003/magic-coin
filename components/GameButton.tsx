"use client";

import React, { useState } from "react";
import "./GameButton.css"; // For animations and complex styles
import TapParticle from "./TapParticle"; // Import the particle component
import ClickFeedbackText from "./ClickFeedbackText"; // Import the new feedback text component

interface GameButtonProps {
  onInteraction: (
    clientX: number,
    clientY: number,
    currentTarget: HTMLButtonElement
  ) => void;
  clickPower: number;
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

const GameButton: React.FC<GameButtonProps> = ({
  onInteraction,
  clickPower,
}) => {
  const [particles, setParticles] = useState<ParticleState[]>([]);
  const [clickFeedbackTexts, setClickFeedbackTexts] = useState<
    ClickFeedbackTextState[]
  >([]);

  const handleLocalInteraction = (
    clientX: number,
    clientY: number,
    currentTarget: HTMLButtonElement
  ) => {
    onInteraction(clientX, clientY, currentTarget);

    const rect = currentTarget.getBoundingClientRect();
    const interactionX = clientX - rect.left;
    const interactionY = clientY - rect.top;

    const numParticles = 3 + Math.floor(Math.random() * 3);
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

    const newFeedbackText: ClickFeedbackTextState = {
      id: `feedback-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
      text: `+${clickPower}`,
      x: interactionX,
      y: interactionY,
    };
    setClickFeedbackTexts((prevTexts) => [...prevTexts, newFeedbackText]);
  };

  const handleMouseClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    handleLocalInteraction(event.clientX, event.clientY, event.currentTarget);
  };

  const handleTouchStart = (event: React.TouchEvent<HTMLButtonElement>) => {
    Array.from(event.changedTouches).forEach((touch) => {
      handleLocalInteraction(touch.clientX, touch.clientY, event.currentTarget);
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
      onClick={handleMouseClick}
      onTouchStart={handleTouchStart}
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
        />
      ))}
    </button>
  );
};

export default GameButton;
