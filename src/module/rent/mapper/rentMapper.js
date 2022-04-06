/* eslint-disable camelcase */
const Rent = require('../entity/Rent');
/**
 *
 * @param {Object} fromDataToEntity
 * @returns {import('../entity/Rent')} Rent
 */
function fromDataToEntity({
  id,
  car_id: carId,
  user_id: userId,
  price_per_day: pricePerDay,
  start_date: startDate,
  finish_date: finishDate,
  total_price: totalPrice,
  payment_method: paymentMethod,
  payment_status: paymentStatus,
  status,
}) {
  return new Rent({
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

  });
}
/**
 *
 * @param {import('../model/rentModel')} model
 * @returns {import('../entity/Rent')}
 */
function fromModelToEntity({
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
  return new Rent({
    id: Number(id),
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

  });
}

module.exports = {
  fromDataToEntity,
  fromModelToEntity,
};
