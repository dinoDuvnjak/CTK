var username;
// Kasnije u kodu, varijabli se dodjeljuje vrijednost
username = "PrimjerKorisnika";
var max;
// Sljedeća linija će izazvati grešku: vrijednost tipa string nije dodijeljiva varijabli tipa number.
// Takodjer će izazvati grešku ako se varijabli ne dodijeli nikakva vrijednost.
// Moramo zastiti varijable od grešaka dodjeljivanjem tipa null ili undefined.
max = "max";
//Ako varijabla ima početnu vrijednost, TypeScript automatski zaključuje tip varijable.
var userAge = 30; // TypeScript automatski zaključuje tip: number
// Pokušaj dodjele stringa varijabli userAge će uzrokovati grešku:
userAge = "trideset"; // Greška: Vrijednost tipa 'string' nije dodijeljiva varijabli tipa 'number'
// TU SMO STALI
// ovo pokazi ---------
function multiply(a, b) {
    if (b === void 0) { b = 2; }
    // b je inferiran kao broj zbog inicijalne vrijednosti 2
    return a * b;
}
multiply(5); // Poziv funkcije sa samo jednim argumentom  
// Ovo će raditi jer je b opcionalan argument sa podrazumijevanom vrijednošću 2
multiply(5, 3); // Poziv funkcije sa oba argumenta
var age = 30;
// Ovo je moguće jer je tip varijable age any, što znači da može sadržavati bilo koju vrstu vrijednosti.
age = "trideset";
age = true;
age = { name: "Primjer", age: 30 };
