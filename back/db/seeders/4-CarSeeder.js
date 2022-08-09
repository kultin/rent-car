module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('People', [{
      brand: 'Toyota',
      model: 'Land Cruiser 200',
      body: 'SUV',
      year: 2018,
      engine: '4,5',
      gear: 'A/T',
      power: 270,
      seats: 'кожа',
      photo: 'img.png',
      price: 10000,
      capacity: 5,
      lessor_id: 1,
    }], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('People', null, {});
  },
};
