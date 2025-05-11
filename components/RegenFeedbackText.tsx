import React, { useEffect } from "react";
import styles from "./RegenFeedbackText.module.css"; // Import CSS module

interface RegenFeedbackTextProps {
  id: string;
  text: string;
  onComplete: (id: string) => void;
  // X, Y can be fixed or passed if we want to position it dynamically later
}

const RegenFeedbackTextComponent: React.FC<RegenFeedbackTextProps> = ({
  id,
  text,
  onComplete,
}) => {
  const animationDuration = 1000; // Must match CSS animation-duration

  useEffect(() => {
    const completeTimeout = setTimeout(() => {
      onComplete(id);
    }, animationDuration);

    return () => {
      clearTimeout(completeTimeout);
    };
  }, [id, onComplete]);

  return (
    <div
      className={`${styles.feedbackText} ${styles.animate}`}
      style={{
        // Positioned centrally, will appear above the energy bar area
        // The translateX(-50%) for centering is crucial here
        top: "calc(50% - 100px)", // Approximate position above energy bar. Adjust as needed.
        transform: "translateX(-50%)", // Initial transform for centering
        // The animation will handle the translateY and scale from CSS
      }}
    >
      {text}
    </div>
  );
};

// Wrap with React.memo for performance optimization
const RegenFeedbackText = React.memo(RegenFeedbackTextComponent);

export default RegenFeedbackText;
