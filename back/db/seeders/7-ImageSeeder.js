'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {

     await queryInterface.bulkInsert('Images', [
      {
        car_id: 1,
        img_url: '/images/cars/citroen1.jpg',
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
      car_id: 1,
      img_url: '/images/cars/citroen2.jpg',
      createdAt: new Date(),
      updatedAt: new Date(),
  },
    {
      car_id: 2,
      img_url: '/images/cars/ford-maveric1.jpg',
      createdAt: new Date(),
      updatedAt: new Date(),
  },
  {
    car_id: 2,
    img_url: '/images/cars/ford-maveric2.jpg',
    createdAt: new Date(),
    updatedAt: new Date(),
},
{
  car_id: 3,
  img_url: '/images/cars/ford-mondeo1.jpg',
  createdAt: new Date(),
  updatedAt: new Date(),
},
{
  car_id: 3,
  img_url: '/images/cars/ford-mondeo2.jpeg',
  createdAt: new Date(),
  updatedAt: new Date(),
},
// {
// car_id: 3,
// img_url: '/images/cars/ford-mondeo2.jpg',
// createdAt: new Date(),
// updatedAt: new Date(),
// },
  ], {});

  },

  async down (queryInterface, Sequelize) {
 
    await queryInterface.bulkDelete('Images', null, {});
  
  }
};
