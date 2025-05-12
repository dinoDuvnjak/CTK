// function getMilk(money) {
//     const pricePerBottle = 1.5;
  
//     // koliko boca možemo kupiti
//     const bottles = Math.floor(money / pricePerBottle);
  
//     // koliko nam ostane kusura
//     const change = money % pricePerBottle;
  
//     console.log(`Bought: ${bottles} bottles`);
//     console.log(`Change: ${change}`);
  
//     // vraćamo oba podatka
//     return { bottles, change };
//   }
  
//   const result = getMilk(11);
//   console.log(
//     `You bought ${result.bottles} bottles and your change is ${result.change}.`
//   );



// const items = [0,1,2,3]; 
// let currentIndex = 0;

// function getNextIndex() {
//   const idx = currentIndex;
//   // advance and wrap back to zero when you hit the end
//   currentIndex = (currentIndex + 1) % items.length;
//   return idx;
// }
  

// for (let i = 0; i < 8; i++) {
//     console.log( getNextIndex() );
// }


let imena = ["Ana", "Marko", "Ivan", "Petra"];
imena.lastIndexOf(imena); // 0
