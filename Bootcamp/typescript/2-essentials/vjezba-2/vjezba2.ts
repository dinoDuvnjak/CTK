function processItems(items: (number | string)[]): (number | string)[] {
  return items.map(function(item) {
    if (typeof item === "number") {
      // broj → kvadrat
      return item * item;
    } else {
      // string → velika slova
      return item.toUpperCase();
    }
  });
}

// Primjer
const ulaz = [3, "dino", 7, "test"];
const izlaz = processItems(ulaz);
console.log(izlaz);  // [9, "CHATGPT", 49, "TEST"]