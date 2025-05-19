class Car {
  // 1) Privatna svojstva
  private make: string;
  private model: string;
  private year: number;

  // 2) Konstruktor
  constructor(make: string, model: string, year: number) {
    this.make = make;
    this.model = model;
    this.year = year;
  }

  // 3a) Metoda za prikaz informacija
  public getInfo(): string {
    return `${this.make} ${this.model} (${this.year})`;
  }

  // 3b) Metoda za pokretanje motora
  public startEngine(): void {
    console.log("Engine started");
  }

  // 4) Statička metoda
  public static getNumberOfWheels(): number {
    return 4;
  }
}

// --- Demonstracija ---
const myCar = new Car("Toyota", "Corolla", 2020);

// Ispis podataka o autu
console.log(myCar.getInfo());
// → "Toyota Corolla (2020)"

// Pokretanje motora
myCar.startEngine();
// → "Engine started"

// Broj kotača (statička metoda)
console.log(Car.getNumberOfWheels());
// → 4
