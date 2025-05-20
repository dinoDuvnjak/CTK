var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Car = /** @class */ (function () {
    function Car(make, model, year) {
        this.make = make;
        this.model = model;
        this.year = year;
    }
    Car.prototype.getInfo = function () {
        return "".concat(this.make, " ").concat(this.model, " (").concat(this.year, ")");
    };
    Car.prototype.startEngine = function () {
        console.log("Engine started");
    };
    Car.getNumberOfWheels = function () {
        return 4;
    };
    return Car;
}());
// Nova klasa koja nasljeđuje Car
var ElectricCar = /** @class */ (function (_super) {
    __extends(ElectricCar, _super);
    function ElectricCar(make, model, year, batteryCapacity) {
        var _this = _super.call(this, make, model, year) || this;
        _this.batteryCapacity = batteryCapacity;
        return _this;
    }
    // override getInfo da uključi batteryCapacity
    ElectricCar.prototype.getInfo = function () {
        // pozivamo roditeljski getInfo() i dodajemo info o bateriji
        return "".concat(_super.prototype.getInfo.call(this), " \u2013 Battery: ").concat(this.batteryCapacity, " kWh");
    };
    ElectricCar.prototype.charge = function () {
        console.log("Charging battery to ".concat(this.batteryCapacity, " kWh"));
    };
    return ElectricCar;
}(Car));
// --- Demonstracija ---
var myCar = new Car("Toyota", "Corolla", 2020);
console.log(myCar.getInfo());
// → "Toyota Corolla (2020)"
myCar.startEngine();
// → "Engine started"
var myElectric = new ElectricCar("Tesla", "Model 3", 2021, 75);
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
var carList2 = [
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
for (var _i = 0, carList2_1 = carList2; _i < carList2_1.length; _i++) {
    var car = carList2_1[_i];
    if (car instanceof Car) {
        console.log(car.getInfo());
    }
}
//getCarInfo(carList2);    
