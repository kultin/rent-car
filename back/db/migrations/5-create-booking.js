module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Bookings', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      date_start: {
        type: Sequelize.STRING,
      },
      date_end: {
        type: Sequelize.STRING,
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
      lessee_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Lesses',
          key: 'id',
        },
      },
      closed: {
        type: Sequelize.BOOLEAN,
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
