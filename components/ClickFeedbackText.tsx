import React, { useEffect, useState } from "react";

interface ClickFeedbackTextProps {
  id: string;
  text: string;
  x: number;
  y: number;
  onComplete: (id: string) => void;
}

const ClickFeedbackText: React.FC<ClickFeedbackTextProps> = ({
  id,
  text,
  x,
  y,
  onComplete,
}) => {
  const [style, setStyle] = useState({
    opacity: 1,
    transform: "translateY(0px)",
  });
  const animationDuration = 800; // milliseconds

  useEffect(() => {
    // Animate upwards and fade out
    const animateTimeout = setTimeout(() => {
      setStyle({
        opacity: 0,
        transform: "translateY(-30px)", // Move 30px upwards
      });
    }, 50); // Start animation shortly after mount

    // Call onComplete after animation finishes
    const completeTimeout = setTimeout(() => {
      onComplete(id);
    }, animationDuration);

    return () => {
      clearTimeout(animateTimeout);
      clearTimeout(completeTimeout);
    };
  }, [id, onComplete, animationDuration]);

  return (
    <div
      style={{
        position: "absolute",
        left: `${x}px`,
        top: `${y}px`,
        color: "#FFFFFF", // White color for the text
        fontSize: "1.2rem", // Adjust size as needed
        fontWeight: "bold",
        pointerEvents: "none", // Prevent interference with other clicks
        opacity: style.opacity,
        transform: style.transform,
        transition: `opacity ${animationDuration * 0.9}ms ease-out, transform ${
          animationDuration * 0.9
        }ms ease-out`,
        zIndex: 20, // Ensure it's above particles if any overlap
        textShadow: "0 0 5px rgba(0,0,0,0.7)", // Slight shadow for readability
        // Adjust starting position to be more centered on the click
        marginLeft: "-0.6em", // Half of an average character width for font size 1.2rem
        marginTop: "-0.6em", // Half of the font size
      }}
    >
      {text}
    </div>
  );
};

export default ClickFeedbackText;
