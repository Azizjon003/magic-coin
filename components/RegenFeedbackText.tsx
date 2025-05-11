import React, { useEffect, useState } from "react";

interface RegenFeedbackTextProps {
  id: string;
  text: string;
  onComplete: (id: string) => void;
  // X, Y can be fixed or passed if we want to position it dynamically later
}

const RegenFeedbackText: React.FC<RegenFeedbackTextProps> = ({
  id,
  text,
  onComplete,
}) => {
  const [style, setStyle] = useState({
    opacity: 1,
    transform: "translateY(0px) scale(1)",
  });
  const animationDuration = 1000; // milliseconds

  useEffect(() => {
    const animateTimeout = setTimeout(() => {
      setStyle({
        opacity: 0,
        transform: "translateY(-20px) scale(0.8)", // Move upwards, shrink slightly and fade out
      });
    }, 50);

    const completeTimeout = setTimeout(() => {
      onComplete(id);
    }, animationDuration);

    return () => {
      clearTimeout(animateTimeout);
      clearTimeout(completeTimeout);
    };
    // Removed animationDuration from dependencies as it's constant within this component
  }, [id, onComplete]);

  return (
    <div
      style={{
        // Positioned centrally, will appear above the energy bar area
        position: "absolute",
        left: "50%",
        // We'll adjust top/transform to place it above where the energy bar is roughly
        // This assumes the parent div of EnergyBar is the main flex container for the center section
        top: "calc(50% - 100px)", // Approximate position above energy bar. Adjust as needed.
        transform: `translateX(-50%) ${style.transform}`,
        color: "#25DE7A", // Green color for energy regen text
        fontSize: "0.9rem",
        fontWeight: "bold",
        pointerEvents: "none",
        opacity: style.opacity,
        transition: `opacity ${animationDuration * 0.9}ms ease-out, transform ${
          animationDuration * 0.9
        }ms ease-out`,
        zIndex: 20,
        textShadow: "0 0 4px rgba(0,0,0,0.6)",
      }}
    >
      {text}
    </div>
  );
};

export default RegenFeedbackText;
