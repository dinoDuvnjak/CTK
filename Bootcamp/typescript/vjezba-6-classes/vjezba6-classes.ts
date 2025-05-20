class Car {
  private make: string;
  private model: string;
  private year: number;

  constructor(make: string, model: string, year: number) {
    this.make  = make;
    this.model = model;
    this.year  = year;
  }

  public getInfo(): string {
    return `${this.make} ${this.model} (${this.year})`;
  }

  public startEngine(): void {
    console.log("Engine started");
  }

  public static getNumberOfWheels(): number {
    return 4;
  }
}

// Nova klasa koja nasljeđuje Car
class ElectricCar extends Car {
  private batteryCapacity: number;

  constructor(
    make: string,
    model: string,
    year: number,
    batteryCapacity: number
  ) {
    super(make, model, year);
    this.batteryCapacity = batteryCapacity;
  }

  // override getInfo da uključi batteryCapacity
  public getInfo(): string {
    // pozivamo roditeljski getInfo() i dodajemo info o bateriji
    return `${super.getInfo()} – Battery: ${this.batteryCapacity} kWh`;
  }

  public charge(): void {
    console.log(`Charging battery to ${this.batteryCapacity} kWh`);
  }
}

// --- Demonstracija ---

const myCar = new Car("Toyota", "Corolla", 2020);
console.log(myCar.getInfo());
// → "Toyota Corolla (2020)"
myCar.startEngine();
// → "Engine started"

const myElectric = new ElectricCar("Tesla", "Model 3", 2021, 75);
console.log(myElectric.getInfo());
// → "Tesla Model 3 (2021) – Battery: 75 kWh"
myElectric.startEngine();
// → "Engine started"
myElectric.charge();
// → "Charging battery to 75 kWh"

// Statička metoda iste klase
console.log(Car.getNumberOfWheels());
// → 4


// create car list which can costst any type of car
// type CarList = Car | ElectricCar[];

let carList2: Car[] = [
    new Car("Toyota", "Corolla", 2020), 
    new ElectricCar("Tesla", "Model 3", 2021, 75)
];

// create a list of cars which can contain any type of car
// create a list of cars which can contain any type of car
// create a list of cars which can contain any type of car''


//call the function getinfo on all cars
// function getCarInfo(cars: Car[]): void {
//     cars.forEach(car => {
//         for (const key in car) {
//         if (car[key] instanceof Car) {
//             console.log(car[key].getInfo());
//         }
//         }
//     });
// }

//write as for loop 
for (const car of carList2) {
    if (car instanceof Car) {       
        console.log(car.getInfo());
    }
}

//getCarInfo(carList2);    