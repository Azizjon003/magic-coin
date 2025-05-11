"use client";

import styles from "./BoostsMenu.module.css";

interface BoostsMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onActivateTemporaryBoost: () => void;
  isTemporaryBoostActive: boolean;
  isAutoClickActive: boolean;
  toggleAutoClick: () => void;
  isX2MultiplierActive: boolean;
  toggleX2Multiplier: () => void;
}

export default function BoostsMenu({
  isOpen,
  onClose,
  onActivateTemporaryBoost,
  isTemporaryBoostActive,
  isAutoClickActive,
  toggleAutoClick,
  isX2MultiplierActive,
  toggleX2Multiplier,
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
            <button className={styles.buyButton} onClick={toggleAutoClick}>
              {isAutoClickActive ? "Deactivate" : "Activate"}
            </button>
          </li>
          <li className={styles.boostItem}>
            <span>✨ x2 Multiplier (5000 coins)</span>
            <button className={styles.buyButton} onClick={toggleX2Multiplier}>
              {isX2MultiplierActive ? "Deactivate" : "Activate"}
            </button>
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
