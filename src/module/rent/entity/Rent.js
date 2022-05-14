/* eslint-disable camelcase */
module.exports = class Rent {
  /**
     *
     * @param {Number} id Number
     * @param {Number} carId Number
     * @param {Number} userId Number
     * @param {Number} pricePerDay Number
     * @param {Date} startDate Date
     * @param {Date} finishDate Date
     * @param {Number} totalPrice Number
     * @param {String} paymentMethod String
     * @param {Boolean} paymentStatus Boolean
     * @param {String} status String
     * @param  {Date} createdAt Date
     * @param  {Date} updatedAt Date
     * @param  {Date} deletedAt Date
     */
  constructor({
    id,
    carId,
    userId,
    pricePerDay,
    startDate,
    finishDate,
    totalPrice,
    paymentMethod,
    paymentStatus,
    status,
    createdAt,
    updatedAt,
    deletedAt,
  }) {
    this.id = id;
    /**
     * @type {import('../../car/entity/car');} this.carId
     */
    this.carId = carId;
    /**
     * @type {import('../../user/entity/User');} this.userId
     */
    this.userId = userId;
    this.pricePerDay = pricePerDay;
    this.startDate = startDate;
    this.finishDate = finishDate;
    this.totalPrice = totalPrice;
    this.paymentMethod = paymentMethod;
    this.paymentStatus = paymentStatus;
    this.formattedDates = this.formatDate();
    this.status = status;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.deletedAt = deletedAt;
  }

  formatDate() {
    const [startDate, finishDate] = [this.startDate, this.finishDate].map(
      (date) => new Date(date).toLocaleString(false, {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',

      }, +1),
    );
    return { startDate, finishDate };
  }

  calculateRentDays() {
    const MILISECONDS_IN_A_DAY = 86400000;
    const startDate = new Date(this.startDate).getTime();
    const finishDate = new Date(this.finishDate).getTime();
    return Math.ceil((finishDate - startDate) / MILISECONDS_IN_A_DAY);
  }

  /**
   *
   * @param {import('../../car/entity/car')} car
   */
  reserve(car) {
    this.pricePerDay = this.pricePerDay || car.rentalValuePerDay;
    this.totalPrice = this.totalPrice || this.pricePerDay * this.calculateRentDays();
    return this;
  }

  pay() {
    this.paymentStatus = true;
    this.status = '1';
    return this;
  }

  finish() {
    if (this.paymentStatus !== true) {
      throw new Error("The rent can't be finished owing to non payment");
    }
    this.status = '2';
    return this;
  }

  cancel() {
    if (this.paymentStatus === true) {
      throw new Error("The rent can't be canceled because is it paid");
    }

    this.status = '3';
    return this;
  }
};
