

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


// TU SMO STALI

function greet(name: string): string {
    // Funkcija prima jedan parametar tipa string i vraća string
    return `Hello, ${name}!`;
  }

// ovo pokazi ---------
function multiply(a: number, b = 2): number {
    // b je inferiran kao broj zbog inicijalne vrijednosti 2
    return a * b;
  }

multiply(5); // Poziv funkcije sa samo jednim argumentom  
// Ovo će raditi jer je b opcionalan argument sa podrazumijevanom vrijednošću 2
multiply(5, 3); // Poziv funkcije sa oba argumenta
  
let age: any = 30;
// Ovo je moguće jer je tip varijable age any, što znači da može sadržavati bilo koju vrstu vrijednosti.
age = "trideset";
age = true;
age = { name: "Primjer", age: 30 };


// ARRAY 

let hobbies = ["sport", "glazba", "umjetnost"]; // Niz stringova
hobbies.push("putovanja"); // Dodavanje novog hobija u niz
// hobbies.push(1); // Greška: Vrijednost tipa 'number' nije dodijeljiva varijabli tipa 'string'

let numbers: number[] = [1, 2, 3, 4, 5]; // Niz brojeva
let names: string[] = ["Ana", "Marko", "Ivana"]; // Niz stringova

numbers.push(6); // Dodavanje broja u niz
//numbers.push("7"); // Greška: Vrijednost tipa 'string' nije dodijeljiva varijabli tipa 'number'

//numbers.push(true); // Greška: Vrijednost tipa 'boolean' nije dodijeljiva varijabli tipa 'number'
//numbers.push({ name: "Primjer" });

let mixedArray: (string | number)[] = ["Ana", 30, "Marko", 25]; // Niz koji može sadržavati stringove i brojeve
mixedArray.push(40); // Dodavanje broja u niz


let users1: Array<string | number> = ["Ana", 30, "Marko", 25]; // Niz koji može sadržavati stringove i brojeve>
// ovo se zove Array generički tip


// TUPLE //////
let user2: [string, number] = ["Ana", 30]; // Tuple sa stringom i brojem
user2[0] = "Marko"; // Promjena imena  
user2[1] = 35; // Promjena godine
//user2[2] = "Greška"; // Greška: Tuple može sadržavati samo dva elementa
//user[0] = 40; // Greška: Vrijednost tipa 'number' nije dodijeljiva varijabli tipa 'string'


let possiblleResults: [1 | -1, number][];
possiblleResults = [
  [1, 2],
  [-1, 3],
  [1, 4],
  [-1, 5]
]; // Tuple sa dva elementa: prvi može biti samo 1 ili -1, a drugi je broj


/// OBJECTS ////
let user3: 
{ name: string; 
  age: number | string 
  hobbies: string[]
} = { 
  name: "Ana", 
  age: 30,
  hobbies: ["sport", "glazba"]
}; // Objekt sa svojstvima name i age
user3.name = "Marko"; // Promjena imena 
user3.age = 35; // Promjena godine

// ovo znaci da val može biti bilo koji tip objekta samo da nije null ili undefined
let val: {} = "Primjer";
//let val2: {} = null; // Greška: Vrijednost tipa 'null' nije dodijeljiva varijabli tipa '{}'

//ovo je primjer kako se koristi Record tip kada želiš definirati tip objekta koji može imati bilo koja svojstva
// posto smo na gornjem primjeru definirali da val može biti bilo koji tip objekta samo da nije null ili undefined
let data: Record<string, number | string | boolean>;
let data2: Record<number, number | string | boolean>;
data = {
  name: "Primjer",
  age: 30,
  isActive: true
}; // Objekt sa svojstvima name, age i isActive

data2 = {
  1: "Primjer",
  2: 30,
  3: true
}; // Objekt sa svojstvima 1, 2 i 3




//// ENUMS ////
enum Role1 {
  Admin = 1,
  User ,
  Guest,
}

enum Role {
  Admin2 = "ADMIN",
  User = "USER",
  Guest = "GUEST"
}

//let userRole1: Role1 = 0; // GREŠKA: Vrijednost tipa '0' nije dodijeljiva varijabli tipa 'Role1' jel počinje od 1

let userRole : Role1 = Role1.Admin; // Varijabla tipa Role
let userRole2 : Role = Role.Admin; // Varijabla tipa Role


// LITERAL TYPES //// neki vole vise od enuma
let UserRole: "admin" | "user" | "guest"; // Literalni tip koji može biti samo jedan od navedenih stringova
// userRole3 = "superadmin"; // Greška: Vrijednost tipa 'superadmin' nije dodijeljiva varijabli tipa 'UserRole'
// userRole3 = "admin"; // Ovo je ispravno jer je "admin" jedan od mogućih vrijednosti tipa UserRole

function some(let UserRole: "admin" | "user" | "guest";) { // problem kako cemo napisati ovo
  
}
// zato koristimo tipove, vidi dolje



/// TYPE ALIASES ////
//omogucava nam da definiramo vlastite tipove i koristimo ih kasnije u kodu
type UserRoles = "admin" | "user" | "guest"; // Literalni tip koji može biti samo jedan od navedenih stringova
type User2 = {
  name: string;
  age: number;
  role: UserRoles; // Koristimo tip UserRoles
};

function some2(UserRole) {
  
}


// void funkcija

function logMessage(message: string): void {
  console.log(message);
} // Funkcija koja ne vraća nikakvu vrijednost



// FUNCTIONS AS TYPES ////
// Funkcija koja prima drugu funkciju kao argument 

// obicna funkcija
function saCallback(cb){
  ///
  cb()
}

// arrow funkcija
const saCallback2 = (cb) => {

}

//moze ovako ali nije dovoljno precizno
function nova(cb: Function) {
  
};

// ali najcesce se koristi ovako
// ocekujemo da ce callback primiti string kao argument i vratiti void
function nova2(cb: (message:string) => void) {
  
};

type User5 = {
  name: string;
  age: number;
  info: () => string; // Koristimo tip UserRoles
};

let user5: User5 = {
  name: "Ana",
  age: 30,
  // info: function () {
  //   return `${this.name} ima ${this.age} godina`;
  // }
  info() {
    return `${this.name} ima ${this.age} godina`;
  }
}

const obj: {
  name: string;
  age: number;
  info: () => string; // Koristimo tip UserRoles
} = {
  name: "Ana",
  age: 30,
  info() {
    return `${this.name} ima ${this.age} godina`;
  }
}

const obj2: {
  name: string;
  age: number;
  info: () => string;
  [key: string]: any;
} = {
  name: "Ana",
  age: 30,
  info() {
    return `${this.name} ima ${this.age} godina`;
  }
};
obj2.pozdrav = function() {
  return `Ćao, ${this.name}!`;
};
console.log(obj2.pozdrav());

// dinamički dodajemo funkciju
obj.zdravo = function(name: string) {
  console.log(`Bok, ${name}!`);
};

obj.zdravo("Ana");  // Ispis: Bok, Ana!


//specijalini tipovi
// null i undefined
let user6: null = null; // Varijabla tipa null
let user7: undefined = undefined; // Varijabla tipa undefined

// moze pomoci kod union tipova
let user8: string | null = null; // Varijabla tipa string ili null
let user9: string | undefined = undefined; // Varijabla tipa string ili undefined

// kada resetiramo varijablu
let user10: string | null = "Primjer"; // Varijabla tipa string ili null
user10 = null; // Resetiranje varijable na null

const inputEl1 = document.getElementById("input"); // Koristimo "!" da kažemo TypeScriptu da je element sigurno prisutan
//const inputEl1 = document.getElementById("input")!; // Koristimo "!" da kažemo TypeScriptu da je element sigurno prisutan
// Ako koristimo "!" TypeScript će pretpostaviti da element postoji 
// i neće baciti grešku ako ga ne pronađe. Međutim, ako element ne postoji,

// if (!inputEl1) {
//   throw new Error("Element ne postoji");
  
// }// Tipiziranje DOM elementa

console.log(inputEl1?.value); // Kada koristimo "?",
// TypeScript će provjeriti da li je element prisutan prije nego što pokuša pristupiti njegovoj vrijednosti 
// Ako element nije prisutan, ispisat će "undefined" umjesto baciti grešku
// console.log(inputEl1.value); // Greška: Property 'value' does not exist on type 'HTMLElement | null'.
console.log(inputEl1.value); // Pristup vrijednosti input elementa
// ali value je specifičan za HTMLInputEl1ement, pa ćemo ga morati tipizirati

/// type casting ///
//const inputEl = document.getElementById("input") as HTMLInputElement; // Tipiziranje DOM elementa



/// the unknown type ///
// TypeScript 3.0 je uveo novi tip "unknown" koji je sigurniji od "any"
// "unknown" tip može sadržavati bilo koju vrijednost, ali ne možemo ga koristiti bez prethodnog provjeravanja tipa
let value: unknown; // Varijabla tipa unknown
value = "Primjer"; // Dodavanje stringa 
value = 30; // Dodavanje broja

function neka(val: any){
  val.toUpperCase(); // ovo prođe grešku jer ne znamo koji je tip val
}

function neka2(val: unknown){
  if (typeof val === "string") {
    console.log(val.toUpperCase()); // Ovo će raditi jer smo provjerili tip
  } else {
    console.log("Nije string");
  }
}



// the optional parameter ///
// Funkcija koja prima opcionalni parametar
function greet2(name: string, age?: number): string {
  // Ako je age undefined, postavi ga na 0
  age = age || 0;
  return `Hello, ${name}! You are ${age} years old.`;
}

type lik = {
  name: string;
  age?: number;
  isActive: boolean;
};

const lik1: lik = {
  name: "Primjer",
  isActive: true
}; // Objekt sa svojstvima name, age i isActive