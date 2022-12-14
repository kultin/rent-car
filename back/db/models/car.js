const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Car extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsToMany(models.User, {
        through: models.Booking,
        foreignKey: 'car_id',
      });
      this.belongsToMany(models.Tent, {
        through: models.CarTent,
        foreignKey: 'car_id',
      });
      this.hasMany(models.Image, {
        foreignKey: 'car_id',
      });
      this.hasMany(models.Booking, {
        foreignKey: 'CarId',
      });
      this.hasMany(models.Like, {
        foreignKey: 'car_id',
      });
      this.belongsToMany(models.User, {
        through: models.Like,
        foreignKey: 'car_id',
      });
     
    }
  }
  Car.init({
    brand: DataTypes.STRING,
    model: DataTypes.STRING,
    body: DataTypes.STRING,
    year: DataTypes.STRING,
    engine: DataTypes.STRING,
    gear: DataTypes.STRING,
    power: DataTypes.INTEGER,
    seats: DataTypes.STRING,
    photo: DataTypes.STRING,
    price: DataTypes.INTEGER,
    capacity: DataTypes.INTEGER,
    location: DataTypes.STRING,
    user_id: DataTypes.INTEGER,
    likes: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Car',
  });
  return Car;
};
