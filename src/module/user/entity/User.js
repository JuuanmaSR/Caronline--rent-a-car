module.exports = class User {
  /**
     *
     * @param {number}  id
     * @param {string}  firstName
     * @param {string}  lastName
     * @param {string}  documentType
     * @param {number}  documentNumber
     * @param {string}  nationality
     * @param {string}  address
     * @param {string}  phoneNumber
     * @param {string}  email
     * @param {string}  birthdate
     * @param {string}  createdAt
     * @param {string}  updatedAt
     */
  constructor({
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
  }) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.documentType = documentType;
    this.documentNumber = documentNumber;
    this.nationality = nationality;
    this.address = address;
    this.phoneNumber = phoneNumber;
    this.email = email;
    this.birthdate = birthdate;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
};
