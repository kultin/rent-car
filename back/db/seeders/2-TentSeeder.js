module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Tents', [{
      name: 'Mini',
      price: 2000,
      capacity: 2,
      img_url: '/img.png',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'Medium',
      price: 3000,
      capacity: 3,
      img_url: '/img.png',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'Large',
      price: 4000,
      capacity: 4,
      img_url: '/img.png',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'XL',
      price: 5000,
      capacity: 6,
      img_url: '/img.png',
      createdAt: new Date(),
      updatedAt: new Date(),
    }], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Tents', null, {});
  },
};
