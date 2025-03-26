// Definicija tipa podataka za aritmetičke operacije
type ArithmeticData = {
  num1: number;
  num2: number;
  operation: "+" | "-" | "*" | "/";
};

// Definicija tipa rezultata, koji može biti broj ili poruka o grešci
type CalculationResult = number | string;

// Funkcija za izračunavanje aritmetičke operacije
function calculateArithmetic(data: ArithmeticData): CalculationResult {
  const { num1, num2, operation } = data;

  switch (operation) {
    case "+":
      return num1 + num2;
    case "-":
      return num1 - num2;
    case "*":
      return num1 * num2;
    case "/":
      if (num2 === 0) return "Greška: Dijeljenje s nulom nije dozvoljeno.";
      return num1 / num2;
    default:
      return "Nevažeća operacija.";
  }
}

// Funkcija za ispis rezultata
function printResult(result: CalculationResult): void {
  console.log("Rezultat: " + result);
}

// Primjer korištenja kalkulatora
const arithmeticData: ArithmeticData = {
  num1: 10,
  num2: 5,
  operation: "+"
};

const result = calculateArithmetic(arithmeticData);
printResult(result);
