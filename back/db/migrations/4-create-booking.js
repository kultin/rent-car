module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Bookings', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      booking_id: {
        allowNull: false,
        autoIncrement: true,
        type: Sequelize.INTEGER,
      },
      date_start: {
        type: Sequelize.STRING,
      },
      date_end: {
        type: Sequelize.STRING,
      },
      days: {
        type: Sequelize.INTEGER,
      },
      price: {
        type: Sequelize.INTEGER,
      },
      pick_up: {
        type: Sequelize.STRING,
      },
      return_place: {
        type: Sequelize.STRING,
      },
      car_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Cars',
          key: 'id',
        },
      },
      tent_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Tents',
          key: 'id',
        },
      },
      user_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Users',
          key: 'id',
        },
      },
      status: {
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Bookings');
  },
};
