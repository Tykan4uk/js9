class Vehicle {
  constructor(power, gasTank, mass) {
    this.#power = power;
    this.#gasTank = gasTank;
    this.#mass = mass;

    this.#maxSpeed = 0.84 * power / mass;
    this.#gasUsage = Math.round(this.#maxSpeed / power * 100);
  };

  #power = 0;
  #gasTank = 0;
  #mass = 0;

  #maxSpeed = 0;
  #gasUsage = 0;

  #started = false;
  #gas = 0;

  startEngine = () => this.#started = true;

  stopEngine = () => this.#started = false;

  drive = (speed, distance) => {
    if (!this.#started && (speed > 0 && speed < this.#maxSpeed)) {
      const gasCount = distance * this.#gasUsage / 100;
      this.#gas = this.#gas > gasCount ? this.#gas - gasCount : 0
    }
  }

  addGas = (gasCount) => {
    if (gasCount > 0) {
      this.#gas = (this.#gas + gasCount) < this.#gasTank ? this.#gas + gasCount : this.#gasTank;
    }
  }

  printInfo() {
    console.log(`Power: ${this.#power} horsepowers.\n` +
      `Gas tank capacity: ${this.#gasTank} liters.\n` +
      `Mass: ${this.#mass} tones.\n` +
      `Max speed: ${this.#maxSpeed} km\\h.\n` +
      `Gas usage: ${this.#gasUsage} l\\100km.\n\n` +
      `Engine ${this.#started ? '' : 'not '}started.\n` +
      `Gas: ${this.#gas} liters.`);
  }
}

class Car extends Vehicle {
  constructor(power, gasTank, mass, maxPassengerCount, type) {
    super(power, gasTank, mass);

    this.#type = type;
    this.#maxPassengerCount = maxPassengerCount;
  };

  #type = '';
  #maxPassengerCount = 0;

  printInfo() {
    console.log(`Type: ${this.#type}.\n` +
      `Max passenger capacity: ${this.#maxPassengerCount} passengers.\n`);

    super.printInfo();
  }
}

class Bus extends Car {
  #passengerCount = 0;
  #maxPassengerCount = 0;

  updatePassengers = (passengers) => {
    if (passengers > 0) {
      this.#passengerCount = passengers < this.#maxPassengerCount ? passengers : this.#passengerCount;
    }
  }

  printInfo() {
    console.log(`Passengers in: ${this.#passengerCount}.\n`);

    super.printInfo();
  }
}

const bus = new Bus(300, 200, 3, 40, 'sedan');

bus.addGas(40);
bus.updatePassengers(30);
bus.startEngine();
bus.printInfo();