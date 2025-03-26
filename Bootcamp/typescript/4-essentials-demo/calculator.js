// Funkcija za izračunavanje aritmetičke operacije
function calculateArithmetic(data) {
    var num1 = data.num1, num2 = data.num2, operation = data.operation;
    switch (operation) {
        case "+":
            return num1 + num2;
        case "-":
            return num1 - num2;
        case "*":
            return num1 * num2;
        case "/":
            if (num2 === 0)
                return "Greška: Dijeljenje s nulom nije dozvoljeno.";
            return num1 / num2;
        default:
            return "Nevažeća operacija.";
    }
}
// Funkcija za ispis rezultata
function printResult(result) {
    console.log("Rezultat: " + result);
}
// Primjer korištenja kalkulatora
var arithmeticData = {
    num1: 10,
    num2: 5,
    operation: "+"
};
var result = calculateArithmetic(arithmeticData);
printResult(result);
