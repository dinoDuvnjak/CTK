function odaberiIme(imena) {
  const randomIndex = Math.floor(Math.random() * imena.length);
  return imena[randomIndex] + " is going to buy the meal today!";
}

const imena = ["Ana", "Marko", "Ivan", "Petra"];
const rezultat = odaberiIme(imena);
console.log(rezultat);
