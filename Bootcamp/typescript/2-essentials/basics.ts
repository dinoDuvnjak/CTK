

let username: string;
// Kasnije u kodu, varijabli se dodjeljuje vrijednost
username = "PrimjerKorisnika";



let max: number;
// Sljedeća linija će izazvati grešku: vrijednost tipa string nije dodijeljiva varijabli tipa number.
// Takodjer će izazvati grešku ako se varijabli ne dodijeli nikakva vrijednost.
// Moramo zastiti varijable od grešaka dodjeljivanjem tipa null ili undefined.
max = "max";



//Ako varijabla ima početnu vrijednost, TypeScript automatski zaključuje tip varijable.
let userAge = 30; // TypeScript automatski zaključuje tip: number


// Pokušaj dodjele stringa varijabli userAge će uzrokovati grešku:
userAge = "trideset"; // Greška: Vrijednost tipa 'string' nije dodijeljiva varijabli tipa 'number'


function multiply(a: number, b = 2): number {
    // b je inferiran kao broj zbog inicijalne vrijednosti 2
    return a * b; /
  }
  
let age: any = 30;
// Ovo je moguće jer je tip varijable age any, što znači da može sadržavati bilo koju vrstu vrijednosti.
age = "trideset";
age = true;
age = { name: "Primjer", age: 30 };