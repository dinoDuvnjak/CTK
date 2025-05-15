// 1. Definicija union tipa
type NumberOrString = number | string;

// 2. Funkcija processItems bez arrow funkcija
function processItems(items: NumberOrString[]): NumberOrString[] {
  // Kreiramo novi niz za rezultate
  var results: NumberOrString[] = [];

  // Prolazimo kroz svaki element u items
  for (var i = 0; i < items.length; i++) {
    var item = items[i];

    // Provjera tipa
    if (typeof item === "number") {
      // Ako je broj, ubacimo njegov kvadrat
      results.push(item * item);
    } else {
      // Ako je string, ubacimo velika slova
      results.push(item.toUpperCase());
    }
  }

  return results;
}

// 3. Testiranje funkcije
var data: NumberOrString[] = [1, "hello", 3, "world"];
var processedItems: NumberOrString[] = processItems(data);

console.log(result);
// Očekivani ispis: [1, "HELLO", 9, "WORLD"]
