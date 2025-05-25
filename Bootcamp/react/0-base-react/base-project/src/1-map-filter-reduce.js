var numbers = [1, 2, 3, 4, 5];
// 1. map - creates a new array with the results of calling a provided function on every element in the calling array
var doubled = numbers.map(function (itemInArray) {
    return itemInArray * 2;
});
// isto kao i gornje, samo sa outer funkcijom
function double(itemInArray){
    return itemInArray * 2
};

console.log("Original array:", numbers.map(double));
console.log("Doubled array:", doubled);


// sve smo ovo isto mogli napisati i sa for each, ali forEach ne vraca novi array, samo iterira kroz svaki element
// zato nam je map bolji izbor za transformaciju elemenata u novi array
var doubledForEach = [];
numbers.forEach(function (itemInArray) {
    doubledForEach.push(itemInArray * 2);
});
console.log("Doubled array with forEach:", doubledForEach);



//druga funkcija je filter - creates a new array with all elements that pass the test implemented by the provided function
var numbers2 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]; 
var evenNumbers = numbers2.filter(function (itemInArray) {
    return itemInArray > 5; // vraca samo parne brojeve
   // return itemInArray % 2 === 0; // vraca samo parne brojeve

});
console.log("Even numbers:", evenNumbers);

// iso se moze sa forEach, ali opet ne vraca novi array
var evenNumbersForEach = [];    
numbers2.forEach(function (itemInArray) {
    if (itemInArray > 5) { // vraca samo parne brojeve
        evenNumbersForEach.push(itemInArray);
    }
});



// seljedeci je reduce - executes a reducer function (that you provide) on each element of the array, resulting in a single output value
var numbers3 = [1, 2, 3, 4, 5]; 
var sum = numbers3.reduce(function (accumulator, currentValue) {
    return accumulator + currentValue; // zbraja sve brojeve u arrayu
}, 0); // 0 je pocetni value za accumulator
console.log("Sum of numbers:", sum);

// ili npr da zbrojimo sve brojeve vecih od 2
var sumGreaterThanTwo = numbers3.reduce(function (accumulator, currentValue) {
    if (currentValue > 2) {
        return accumulator + currentValue; // zbraja sve brojeve vecih od 2
    }
    return accumulator; // ako nije veci od 2, ne dodajemo ga u zbroj
}, 0); // 0 je pocetni value za accumulator 

console.log("Sum of numbers greater than 2:", sumGreaterThanTwo);


// immao i find - returns the value of the first element in the array that satisfies the provided testing function. Otherwise undefined is returned.
var numbers4 = [1, 2, 3, 4, 5]; 
var firstEvenNumber = numbers4.find(function (itemInArray) {
    return itemInArray % 2 === 0; // vraca prvi parni broj
}); 
console.log("First even number:", firstEvenNumber);


