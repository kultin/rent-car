const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Booking extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // this.belongsTo(models.Lessor, {
      //   foreignKey: 'booking_id',
      // });
    }
  }
  Booking.init({
    date_start: DataTypes.STRING,
    date_end: DataTypes.STRING,
    pick_up: DataTypes.STRING,
    return_place: DataTypes.STRING,
    car_id: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER,
    closed: DataTypes.BOOLEAN,
  }, {
    sequelize,
    modelName: 'Booking',
  });
  return Booking;
};
