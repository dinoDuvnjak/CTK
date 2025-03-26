

let username: string;
// Kasnije u kodu, varijabli se dodjeljuje vrijednost
username = "PrimjerKorisnika";



let max: number;
// Sljedeća linija će izazvati grešku: vrijednost tipa string nije dodijeljiva varijabli tipa number.
// Takodjer će izazvati grešku ako se varijabli ne dodijeli nikakva vrijednost.
// Moramo zastiti varijable od grešaka dodjeljivanjem tipa null ili undefined.
max = "max";
