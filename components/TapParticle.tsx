import React, { useEffect, useState } from "react";

interface TapParticleProps {
  id: string;
  startX: number;
  startY: number;
  onComplete: (id: string) => void;
}

const TapParticle: React.FC<TapParticleProps> = ({
  id,
  startX,
  startY,
  onComplete,
}) => {
  const [opacity, setOpacity] = useState(1);
  const [transform, setTransform] = useState(`translate(0px, 0px) scale(1)`);
  const [duration] = useState(() => 500 + Math.random() * 300);

  useEffect(() => {
    const targetX = (Math.random() - 0.5) * 100; // Spread X: -50px to +50px
    const targetY = (Math.random() - 0.5) * 100; // Spread Y: -50px to +50px
    const targetScale = 0.2 + Math.random() * 0.5; // End scale: 0.2 to 0.7

    // Animate out
    setTransform(`translate(${targetX}px, ${targetY}px) scale(${targetScale})`);
    setOpacity(0);

    const timer = setTimeout(() => {
      onComplete(id);
    }, duration);

    return () => clearTimeout(timer);
  }, [id, onComplete]);

  return (
    <div
      style={{
        position: "absolute",
        left: `${startX}px`,
        top: `${startY}px`,
        width: "8px",
        height: "8px",
        backgroundColor: "#4EFFA1", // Neon green sparks
        borderRadius: "50%",
        opacity: opacity,
        transform: transform,
        transition: `transform ${duration}ms ease-out, opacity ${duration}ms ease-out`,
        pointerEvents: "none", // Don't interfere with button clicks
        boxShadow: "0 0 5px #4EFFA1, 0 0 10px #4EFFA1", // Glow for particles
        zIndex: 10, // Above button content
      }}
    />
  );
};

export default TapParticle;
