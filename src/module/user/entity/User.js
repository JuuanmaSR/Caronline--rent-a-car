module.exports = class User {
  /**
     *
     * @param {Number}  id Number
     * @param {string}  firstName String
     * @param {string}  lastName String
     * @param {string}  documentType String
     * @param {Number}  documentNumber Number
     * @param {string}  nationality String
     * @param {string}  address String
     * @param {string}  phoneNumber String
     * @param {string}  email String
     * @param {string}  birthdate String
     * @param {string}  createdAt String
     * @param {string}  updatedAt String
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
    deletedAt,
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
    this.formattedBirthdate = this.formatBirthdate();
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.deletedAt = deletedAt;
  }

  formatBirthdate() {
    return new Date(this.birthdate).toLocaleString(false, {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
      timeZone: 'UTC',
    });
  }

  get fullName() {
    return (`${this.firstName} ${this.lastName}`);
  }
};
