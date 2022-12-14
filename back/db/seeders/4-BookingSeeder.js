module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Bookings', [{
      date_start: '2022-08-23',
      date_end: '2022-08-27',
      days: '10',
      price: '200000',
      pick_up: '55.740755,37.583738',
      return_place: '55.740755,37.583838',
      CarId: 1,
      user_id: 1,
      status: 'pre-booking',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      date_start: '2022-09-23',
      date_end: '2022-09-27',
      days: '6',
      price: '20000',
      pick_up: '56.740223,38.583999',
      return_place: '57.740735,39.583444',
      CarId: 2,
      user_id: 2,
      status: 'closed',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      date_start: '2022-10-23',
      date_end: '2022-10-27',
      days: '16',
      price: '3000000',
      pick_up: '55.740225,37.542738',
      return_place: '55.71235,37.123838',
      CarId: 3,
      user_id: 3,
      status: 'booking',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Bookings', null, {});
  },
};
