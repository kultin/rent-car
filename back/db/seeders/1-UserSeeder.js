module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Users', [{
      name: 'Andrey',
      email: 'andrey@bk.ru',
      tel: '79997777777',
      password: '123',
      img_url: null,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'Alexander',
      email: 'alexander@bk.ru',
      tel: '79997777771',
      password: '123',
      img_url: null,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'Olya',
      email: 'olya@bk.ru',
      tel: '79997777772',
      password: '123',
      img_url: null,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'Kolya',
      email: 'kolya@bk.ru',
      tel: '79997777773',
      password: '123',
      img_url: null,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
  },
};
