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
        width: "100%",
        maxWidth: "350px",
        backgroundColor: "rgba(0, 0, 0, 0.2)", // Slightly more transparent track background
        borderRadius: "10px",
        marginBottom: "5px", // Reduced margin as text will be below
        height: "12px", // Made the bar thinner to match image
        display: "flex", // Added to help align inner bar if needed, though not strictly necessary for this simple case
        alignItems: "center", // Vertically center the fill if padding was present on inner
      }}
    >
      <div
        style={{
          width: `${energyPercentage}%`,
          backgroundColor: "#25DE7A", // Notcoin-like green for the energy fill
          height: "100%", // Fill the height of the container
          borderRadius: "8px", // Slightly smaller border radius for the fill
          transition: "width 0.5s ease-in-out",
        }}
      >
        {/* Text display removed from here */}
      </div>
    </div>
  );
};

export default EnergyBar;
