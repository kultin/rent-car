const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class CarTent extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  CarTent.init({
    tent_id: DataTypes.INTEGER,
    car_id: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'CarTent',
  });
  return CarTent;
};
