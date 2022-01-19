const Car = require('../entity/car');
/**
 * @param {Object} fromDataToEntity
 * @returns Car
 */
function fromDataToEntity({
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
}) {
  return new Car({
    id: Number(id),
    crestUrl,
    carModel,
    brand,
    year,
    kilometres,
    color,
    airConditioner,
    gearBox,
    rentalValuePerDay,
  });
}
/**
 *
 * @param {import('../model/carModel')} model
 * @returns {import('../entity/car')}
 */
function fromModelToEntity(model) {
  return new Car(model.toJSON());
}

module.exports = {
  fromDataToEntity,
  fromModelToEntity,
};
