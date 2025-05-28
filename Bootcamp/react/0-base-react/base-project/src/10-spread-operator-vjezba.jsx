import React, { useState } from "react";

// Reusable ColorBox component
function ColorBox({ color, size = 100 }) {
  return (
    <div
      style={{
        width: size,
        height: size,
        backgroundColor: color,
        border: "1px solid #333"
      }}
    />
  );
}

// Main ColorBoxes component
export default function ColorBoxes({ initialColors = ["#FF6384", "#36A2EB", "#FFCE56"] }) {
  const [colors, setColors] = useState(initialColors);

  // Generate a random hex color
  const getRandomColor = () =>
    "#" + Math.floor(Math.random() * 0xFFFFFF).toString(16).padStart(6, "0");

  // Handlers
  const addRandom = () => {
    const newColor = getRandomColor();
    setColors(prev => [...prev, newColor]);
  };

  const removeLast = () => {
    setColors(prev => [...prev.slice(0, -1)]);
  };

  const shuffle = () => {
    setColors(prev => {
      const arr = [...prev];
      for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
      }
      return arr;
    });
  };

  return (
    <div style={{ padding: 20 }}>
      <div style={{ display: "flex", gap: 10, marginBottom: 20 }}>
        {colors.map((c, i) => (
          <ColorBox key={i} color={c} />
        ))}
      </div>
      <div>
        <button onClick={addRandom}>Add Random Color</button>
        <button onClick={removeLast} disabled={colors.length === 0} style={{ marginLeft: 10 }}>
          Remove Last
        </button>
        <button onClick={shuffle} style={{ marginLeft: 10 }}>
          Shuffle
        </button>
      </div>
    </div>
  );
}