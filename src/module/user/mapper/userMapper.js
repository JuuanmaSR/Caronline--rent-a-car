const User = require('../entity/User');

function fromDataToEntity({
  id,
  firstName,
  lastName,
  documentType,
  documentNumber,
  nationality,
  address,
  phoneNumber,
  email,
  birthdate,

}) {
  return new User({
    id: Number(id),
    firstName,
    lastName,
    documentType,
    documentNumber,
    nationality,
    address,
    phoneNumber,
    email,
    birthdate,
  });
}

function fromModelToEntity(model) {
  return new User(model.toJSON());
}

module.exports = {
  fromModelToEntity,
  fromDataToEntity,
};
