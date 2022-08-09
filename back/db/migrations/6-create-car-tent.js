module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('CarTents', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      tent_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Tents',
          key: 'id',
        },
      },
      car_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Cars',
          key: 'id',
        },
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
    await queryInterface.dropTable('CarTents');
  },
};
