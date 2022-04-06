module.exports = class Car {
  constructor({
    id,
    crestUrl,
    carModel,
    brand,
    year,
    kilometres,
    color,
    airConditioner,
    gearBox,
    rentalValuePerDay,
    createdAt,
    updatedAt,
    deletedAt,
  }) {
    this.id = id;
    this.crestUrl = crestUrl;
    this.carModel = carModel;
    this.brand = brand;
    this.year = year;
    this.kilometres = kilometres;
    this.color = color;
    this.airConditioner = airConditioner;
    this.gearBox = gearBox;
    this.rentalValuePerDay = rentalValuePerDay;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.deletedAt = deletedAt;
  }
};
