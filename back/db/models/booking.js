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
      this.belongsTo(models.Car, {
        foreignKey: 'CarId',
      });
      this.belongsTo(models.User, {
        foreignKey: 'user_id',
      });
      this.hasMany(models.Message, {
        foreignKey: 'booking_id',
      });
    }
  }
  Booking.init({
    booking_id: DataTypes.INTEGER,
    date_start: DataTypes.STRING,
    date_end: DataTypes.STRING,
    days: DataTypes.INTEGER,
    price: DataTypes.INTEGER,
    pick_up: DataTypes.STRING,
    return_place: DataTypes.STRING,
    CarId: DataTypes.INTEGER,
    tent_id: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER,
    status: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Booking',
  });
  return Booking;
};
