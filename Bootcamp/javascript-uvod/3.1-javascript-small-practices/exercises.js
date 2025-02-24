

// ##### JAVASCRIPT LENGTH #####

// javascript - length of string
var tweet = prompt("Compose your tweet:");
var tweetCount = tweet.length;
alert("You have written " + tweetCount + " characters, you have " + (140 - tweetCount) + " characters remaining.");

// javascript - length of string - optimized
var tweet = prompt("Compose your tweet:");
alert("You have written " + tweet.length + " characters, you have " + (140 - tweet.length) + " characters remaining.");

// javascript - length of string - optimized - with check if user entered something
var tweet = prompt("Compose your tweet:");
if (tweet !== null) { // Provjera je li korisnik nešto unio
    alert("You have written " + tweet.length + " characters, you have " + (140 - tweet.length) + " characters remaining.");
} else {
    alert("You didn't enter anything!");
}




// ##### SLICE #####

var tweet = prompt("Compose your tweet:");
var tweetUnder140 = tweet.slice(0, 140);
alert(tweetUnder140);

// Optimized
alert(prompt("Compose your tweet:").slice(0, 140));


// ##### MODULO #####
console.log(10 % 2); // 0 (parni broj)
console.log(7 % 2);  // 1 (neparni broj)

// ##### MATH - dog years #####
var dogAge = prompt("How old is your dog?");
var humanAge = (dogAge - 2) * 4 + 21;
alert("Your dog is " + humanAge + " years old in human years.");

// ##### MATH - dog years ##### - optimized
alert("Your dog is " + ((prompt("How old is your dog?") - 2) * 4 + 21) + " years old in human years.");

function getMilk() {
    alert("Leave house");
    alert("Move right");
    alert("Move up");
    alert("Buy milk");
    alert("Go back home");
}

// ##### FUNCTIONS #####
function getMilk(money) {
    var numberOfBottles = Math.floor(money / 1.5);
    console.log("Buy " + numberOfBottles + " bottles of milk");
}
getMilk(10); // Ako damo 10$, kupit će 6 boca
getMilk(5);  // Ako damo 5$, kupit će 3 boce

// ##### FUNCTIONS ##### - optimized
function getMilk(money) {
    console.log("Buy " + Math.floor(money / 1.5) + " bottles of milk");
}
getMilk(7);


// ##### FUNCTIONS - return #####
function getMilk(money) {
    var change = money % 1.5; 
    return change; // Funkcija sada vraća kusur
}

var myChange = getMilk(4); // Ako damo 4$, trebamo dobiti 1$ kusura
console.log("Your change is $" + myChange);


// ##### ARRAY - includes #####
var gosti = ["Angela", "Marko", "Ivana", "Petar", "Maja", "Luka"];
var imeGosta = prompt("Unesite svoje ime:");

if (gosti.includes(imeGosta)) {
    alert("Dobrodošli, " + imeGosta + "!");
} else {
    alert("Žao nam je, možda sljedeći put.");
}

// ##### ARRAY - push/pop #####

// 1. Kreiraj niz s početnim imenima
let gosti = ["Marko", "Ivana", "Luka"];
console.log("Početna lista gostiju:", gosti);

// 2. Dodaj novog gosta "Ana" na kraj niza
gosti.push("Ana");
console.log("Nakon dodavanja Ane:", gosti);

// 3. Ukloni posljednjeg gosta iz niza
gosti.pop();
console.log("Nakon uklanjanja posljednjeg gosta:", gosti);

// 4. Ispiši prvog gosta na listi
console.log("Prvi gost na listi je: " + gosti[0]);

// 5. Dodatni izazov: Dodaj novog gosta i ispiši zadnjeg gosta
gosti.push("Marija");
console.log("Nakon dodavanja Marije:", gosti);
console.log("Zadnji gost na listi je: " + gosti[gosti.length - 1]);



// ##### ARRAY -fizz/Buzz #####

var output = [];
var count = 1;
function fizzBuzz() {
    if (count % 3 === 0 && count % 5 === 0) {
        output.push("FizzBuzz");
    } else if (count % 3 === 0) {
        output.push("Fizz");
    } else if (count % 5 === 0) {
        output.push("Buzz");
    } else {
        output.push(count);
    }
    count++;
    console.log(output);
}


fizzBuzz(); // [1]
fizzBuzz(); // [1, 2]
fizzBuzz(); // [1, 2, 3]


// ##### ARRAY -fizz/Buzz - while #####
function fizzBuzz() {
    var output = [];
    var count = 1;

    while (count <= 100) { 
        if (count % 3 === 0 && count % 5 === 0) {
            output.push("FizzBuzz");
        } else if (count % 3 === 0) {
            output.push("Fizz");
        } else if (count % 5 === 0) {
            output.push("Buzz");
        } else {
            output.push(count);
        }
        count++; //OBJASNI AKO IZBACIS OVO. INFINITE LOOP!!
    }
    console.log(output);
}
fizzBuzz();

// ##### ARRAY -fizz/Buzz - for #####
function fizzBuzz() {
    var output = [];

    for (var count = 1; count <= 100; count++) {
        if (count % 3 === 0 && count % 5 === 0) {
            output.push("FizzBuzz");
        } else if (count % 3 === 0) {
            output.push("Fizz");
        } else if (count % 5 === 0) {
            output.push("Buzz");
        } else {
            output.push(count);
        }
    }

    console.log(output);
}
fizzBuzz();


// ##### ARRAY -99 bottles of beer - for #####
function beer() {
    for (var bottles = 99; bottles > 0; bottles--) {
        console.log(bottles + " bottles of beer on the wall, " + bottles + " bottles of beer.");
        console.log("Take one down and pass it around, " + (bottles - 1) + " bottles of beer on the wall.\n");
    }

    console.log("No more bottles of beer on the wall, no more bottles of beer.");
    console.log("Go to the store and buy some more, 99 bottles of beer on the wall.");
}
beer();


// ##### DOM - change li #####
document.querySelector("ul").lastElementChild.innerHTML = "Petar";
// prmjena bolje google linka
document.querySelector("li a").style.color = "red";



