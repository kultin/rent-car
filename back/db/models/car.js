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
      this.belongsToMany(models.Lessee, {
        through: models.Booking,
        foreignKey: 'car_id',
      }),
      this.belongsToMany(models.Tent, {
        through: models.CarTent,
        foreignKey: 'car_id',
      }),
      this.belongsTo(models.Lessor, {
        foreignKey: 'lessor_id',
      }),
    }
  }
  Car.init({
    brand: DataTypes.STRING,
    model: DataTypes.STRING,
    body: DataTypes.STRING,
    year: DataTypes.INTEGER,
    engine: DataTypes.STRING,
    gear: DataTypes.STRING,
    power: DataTypes.INTEGER,
    img_url: DataTypes.STRING,
    img_url: DataTypes.STRING,
    seats: DataTypes.STRING,
    lessor_id: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Car',
  });
  return Car;
};
