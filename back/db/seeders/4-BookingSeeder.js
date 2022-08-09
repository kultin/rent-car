module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Bookings', [{
      date_start: '17-08-2022',
      date_end: '27-08-2022',
      pick_up: '55.740755,37.583738',
      return_place: '55.740755,37.583838',
      car_id: 1,
      user_id: 1,
      closed: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      date_start: '30-08-2022',
      date_end: '05-09-2022',
      pick_up: '56.740223,38.583999',
      return_place: '57.740735,39.583444',
      car_id: 2,
      user_id: 2,
      closed: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      date_start: '25-08-2022',
      date_end: '10-09-2022',
      pick_up: '55.740225,37.542738',
      return_place: '55.71235,37.123838',
      car_id: 3,
      user_id: 3,
      closed: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Bookings', null, {});
  },
};
