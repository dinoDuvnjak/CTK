

// Definicija tipa funkcije: prima jedan parametar tipa string, vraća void
let cb: (msg: string) => void;


function performJob(cb: (msg: string) => void): void {
    // Simulacija obavljanja posla
    // Nakon obavljenog posla poziva se callback s porukom
    cb("Job done");
  }
  
// Funkcija koja ispisuje poruku, tip: (msg: string) => void
function logMessage(msg: string): void {
console.log(msg);
}

// Prosljeđivanje callback funkcije
performJob(logMessage);
  



type User = {
name: string;
age: number;
// greet metoda prima opcionalni parametar (npr. poruku) i vraća string
greet: (msg?: string) => string;
};

const user: User = {
name: "Ivan",
age: 30,
greet: function(msg?: string): string {
    // Ako je poslana poruka, ispiši je, inače vrati ime korisnika
    if (msg) {
    console.log(msg);
    }
    return this.name;
}
};
  
console.log(user.greet("Hello there!")); // Ispisuje "Hello there!" i vraća "Ivan"
  