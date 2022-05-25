const Rent = require('../../entity/Rent');

module.exports = function createTestRent(id) {
  return new Rent({
    id,
    carId: 1,
    userId: 1,
    pricePerDay: 1000,
    startDate: '2021-10-05T15:00',
    finishDate: '2021-10-08T15:00',
    totalPrice: 3000,
    paymentMethod: 'cash',
    paymentStatus: true,
    status: '0',
    createdAt: '2021-10-05T15:00',
    updatedAt: '',
    deletedAt: null,
  });
};
