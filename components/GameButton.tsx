"use client";

import styles from "./GameButton.module.css";

interface GameButtonProps {
  onClick: () => void;
}

export default function GameButton({ onClick }: GameButtonProps) {
  // Later, we can add state for animation (e.g., on tap)
  // const [isClicked, setIsClicked] = React.useState(false);

  // const handleClick = () => {
  //   setIsClicked(true);
  //   onClick();
  //   setTimeout(() => setIsClicked(false), 150); // Reset animation state
  // };

  return (
    <button
      className={styles.gameButton}
      onClick={onClick} // Direct onClick for now, can be enhanced by handleClick
    >
      {/* Placeholder for coin image/icon or text */}
      <span className={styles.buttonText}>TAP!</span>
      {/* Particle effects can be added here later */}
    </button>
  );
}
