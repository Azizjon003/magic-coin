import React, { useEffect } from "react";
import styles from "./ClickFeedbackText.module.css"; // Import CSS module

interface ClickFeedbackTextProps {
  id: string;
  text: string;
  x: number;
  y: number;
  onComplete: (id: string) => void;
}

// Renamed original component for React.memo
const ClickFeedbackTextComponent: React.FC<ClickFeedbackTextProps> = ({
  id,
  text,
  x,
  y,
  onComplete,
}) => {
  const animationDuration = 800; // Must match CSS animation-duration

  useEffect(() => {
    // Call onComplete after animation finishes to remove the element from state
    const completeTimeout = setTimeout(() => {
      onComplete(id);
    }, animationDuration);

    return () => {
      clearTimeout(completeTimeout);
    };
    // animationDuration is constant, not needed in deps if defined outside or as a const inside
  }, [id, onComplete]);

  return (
    <div
      className={`${styles.feedbackText} ${styles.animate}`}
      style={{
        left: `${x}px`,
        top: `${y}px`,
        // Other styles previously here are now in ClickFeedbackText.module.css
        // We only keep dynamic styles (left, top) here
      }}
    >
      {text}
    </div>
  );
};

const ClickFeedbackText = React.memo(ClickFeedbackTextComponent);

export default ClickFeedbackText;
