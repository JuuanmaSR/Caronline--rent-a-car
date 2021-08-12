const Car = require('../entity/car');
/**
 * @param {Object} formData
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
