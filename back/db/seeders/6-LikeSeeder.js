'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Likes', [{
      user_id: 1,
      car_id: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      user_id: 1,
      car_id: 2,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      user_id: 1,
      car_id: 3,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      user_id: 2,
      car_id: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    }    
     ], {});
  
  },

  async down (queryInterface, Sequelize) {
   
     await queryInterface.bulkDelete('Likes', null, {});
    
  }
};
