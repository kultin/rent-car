module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Lessors', [{
      name: 'LessorAndrey',
      email: 'andrey@bk.ru',
      tel: '79997777777',
      password: '123',
      img_url: '/img.png',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'LessorAlexander',
      email: 'alexander@bk.ru',
      tel: '79997777771',
      password: '123',
      img_url: '/img.png',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'LessorOlya',
      email: 'olya@bk.ru',
      tel: '79997777772',
      password: '123',
      img_url: '/img.png',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'LessorKolya',
      email: 'kolya@bk.ru',
      tel: '79997777773',
      password: '123',
      img_url: '/img.png',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Lessors', null, {});
  },
};
