const User = require('../../entity/User');

module.exports = function createTestUser(id) {
  return new User({
    id,
    firstName: 'Juan',
    lastName: 'Fernandez',
    documentType: 'DNI',
    documentNumber: 41072694,
    nationality: 'Argentina',
    address: 'San Pedro Pvcia.BsAs',
    phoneNumber: '3329622072',
    email: 'juanmariafernandez1998@gmail.com',
    birthdate: '1998-04-17',
    createdAt: '2020-09-16T14:11:13.854Z',
    updatedAt: '2020-09-17T14:11:13.854Z',
    deletedAt: 'null',

  });
};
