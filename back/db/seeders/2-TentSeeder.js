module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Tents', [{
      name: 'Mini',
      capacity: 2,
      img_url: '/img.png',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'Medium',
      capacity: 3,
      img_url: '/img.png',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'Large',
      capacity: 4,
      img_url: '/img.png',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'XL',
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
