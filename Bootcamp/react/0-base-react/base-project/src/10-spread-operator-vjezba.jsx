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

  /*
Petlja ide unatrag (od zadnjeg indeksa prema prvom) upravo zato što tako implementiramo Fisher–Yates 
algoritam za nasumično miješanje niza na ispravan, uniforman način. Evo zašto:

Svaki element jednako puta
Kada krenemo od posljednjeg elementa i = length–1 i za njega odaberemo slučajni indeks j između 0 i i, 
jamčimo da svaki od mogućih elemenata u tom segmentu (0…i) ima jednaku šansu zamijeniti se s elementom na i.

Neponavljanje i neizostavljanje
Nakon što zamijenimo arr[i] i arr[j], element koji je dospio na poziciju i više ne ulazi u daljnje iteracije petlje 
— time se izbjegava da ga kasnije ponovo slučajno premještamo, što je ključno za uniformnu raspodjelu permutacija.

Jednostavno održavanje
Kretanjem unatrag ne trebamo dodatno pratiti “neizmiješane” dijelove niza: sve što nismo još slučajno 
permutirali nalazi se na indeksima 0…i-1. Čim smanjimo i, taj segment se automatski sužava.

Da je petlja prema naprijed, morali bismo na neki drugi način pratiti koje smo elemente već koristili, 
ili bi neki elementi mogli biti ignorirani, što dovodi do neujednačenih šansi i nepotpunih miješanja. 
Krenuvši unatrag, Fisher–Yates je jednostavan, čist i ispravan.
  */



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