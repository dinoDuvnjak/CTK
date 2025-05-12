// Generiraj slučajan broj od 1 do 6 za igrača 1
const player1Roll = Math.floor(Math.random() * 6) + 1; 

// Sastavi naziv datoteke s slikom kocke za igrača 1 (npr. "dice4.png")
const player1DiceFilename = `dice${player1Roll}.png`; 

// Putanja do mape sa slikama kockica
const imagesPath = "images/"; 

// Puna putanja do slike kocke igrača 1
const player1DiceImagePath = imagesPath + player1DiceFilename; 

// Odaberi prvu <img> na stranici i ažuriraj src atribut
const player1ImgElement = document.querySelectorAll("img")[0];
player1ImgElement.setAttribute("src", player1DiceImagePath);


// Generiraj slučajan broj od 1 do 6 za igrača 2
const player2Roll = Math.floor(Math.random() * 6) + 1;

// Sastavi naziv datoteke i punu putanju za igrača 2
const player2DiceImagePath = `images/dice${player2Roll}.png`;

// Odaberi drugu <img> na stranici i ažuriraj src atribut
const player2ImgElement = document.querySelectorAll("img")[1];
player2ImgElement.setAttribute("src", player2DiceImagePath);


// Odredi rezultat igre i prikaži poruku u <h1>
const resultHeading = document.querySelector("h1");

if (player1Roll > player2Roll) {
  resultHeading.textContent = "🚩 Player 1 Wins!";
} else if (player2Roll > player1Roll) {
  resultHeading.textContent = "Player 2 Wins! 🚩";
} else {
  resultHeading.textContent = "Draw!";
}
