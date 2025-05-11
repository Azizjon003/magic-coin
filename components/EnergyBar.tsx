import React from "react";

interface EnergyBarProps {
  currentEnergy: number;
  maxEnergy: number;
}

const EnergyBar: React.FC<EnergyBarProps> = ({ currentEnergy, maxEnergy }) => {
  const energyPercentage = (currentEnergy / maxEnergy) * 100;

  return (
    <div
      style={{
        width: "80%",
        maxWidth: "350px",
        backgroundColor: "rgba(0, 0, 0, 0.3)", // Dark, slightly transparent background
        borderRadius: "10px",
        padding: "3px",
        border: "1px solid rgba(255, 215, 0, 0.4)", // Gold-ish subtle border
        boxShadow: "0 0 8px rgba(255, 215, 0, 0.3)", // Softer gold glow
        marginBottom: "15px",
      }}
    >
      <div
        style={{
          width: `${energyPercentage}%`,
          backgroundColor: "#FFD700", // Gold color for the energy fill
          height: "18px",
          borderRadius: "7px",
          transition: "width 0.5s ease-in-out",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "inset 0 0 5px rgba(0,0,0,0.2)", // Inner shadow for depth
        }}
      >
        <span
          style={{
            color: "#1A1A1D",
            fontWeight: "bold",
            fontSize: "0.8rem",
            textShadow: "0 0 2px rgba(0,0,0,0.3)", // Slight text shadow
          }}
        >
          {currentEnergy} / {maxEnergy}
        </span>
      </div>
    </div>
  );
};

export default EnergyBar;
