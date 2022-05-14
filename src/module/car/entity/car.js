module.exports = class Car {
  /**
   *
   * @param {Number} id Number
   * @param {String} crestUrl String
   * @param {String} carModel String
   * @param {String} brand String
   * @param {Number} year Number
   * @param {Number} kilometres Number
   * @param {String} color String
   * @param {Boolean} airConditioner Boolean
   * @param {String} gearBox String
   * @param {Number} rentalValuePerDay Number
   * @param {Date} createdAt Date
   * @param {Date} updatedAt Date
   * @param {Date} deletedAt Date
   */
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
