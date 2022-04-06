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

function fromModelToEntity({
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
  createdAt,
  updatedAt,
  deletedAt,
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
    createdAt,
    updatedAt,
    deletedAt,
  });
}

module.exports = {
  fromModelToEntity,
  fromDataToEntity,
};
