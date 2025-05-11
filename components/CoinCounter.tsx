"use client";

import styles from "./CoinCounter.module.css";

interface CoinCounterProps {
  count: number;
}

export default function CoinCounter({ count }: CoinCounterProps) {
  return (
    <div className={styles.counterContainer}>
      {/* Placeholder for a coin icon */}
      <span className={styles.coinIcon}>🪙</span>
      <span className={styles.countText}>{count.toLocaleString()}</span>
    </div>
  );
}
