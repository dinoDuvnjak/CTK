// 1. Ime korisnika
var firstName = "Ivan";
// 2. Godina rođenja
var yearOfBirth = 1990;
// 3. Izračun trenutne dobi
var currentYear = 2025;
var currentAge = currentYear - yearOfBirth;
// 4. Ispis poruke
console.log("Ime: ".concat(firstName, ", Dob: ").concat(currentAge));
