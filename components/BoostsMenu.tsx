"use client";

import styles from "./BoostsMenu.module.css";

interface BoostsMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onActivateTemporaryBoost: () => void;
  isTemporaryBoostActive: boolean;
}

export default function BoostsMenu({
  isOpen,
  onClose,
  onActivateTemporaryBoost,
  isTemporaryBoostActive,
}: BoostsMenuProps) {
  if (!isOpen) {
    return null;
  }

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div
        className={styles.menuContainer}
        onClick={(e) => e.stopPropagation()}
      >
        <h2>Boosts</h2>
        <ul className={styles.boostsList}>
          <li className={styles.boostItem}>
            <span>🚀 Auto-Tap Wand (1000 coins)</span>
            <button className={styles.buyButton}>Buy</button>
          </li>
          <li className={styles.boostItem}>
            <span>✨ x2 Multiplier (5000 coins)</span>
            <button className={styles.buyButton}>Buy</button>
          </li>
          <li className={styles.boostItem}>
            <span>🚀 Temporary Click Power Boost (30s)</span>
            <button
              className={styles.buyButton}
              onClick={onActivateTemporaryBoost}
              disabled={isTemporaryBoostActive}
            >
              {isTemporaryBoostActive ? "Active" : "Activate"} (Cost?)
            </button>
          </li>
        </ul>
        <button onClick={onClose} className={styles.closeButton}>
          Close
        </button>
      </div>
    </div>
  );
}
