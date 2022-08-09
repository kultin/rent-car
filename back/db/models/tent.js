const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Tent extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsToMany(models.Car, {
        through: models.CarTent,
        foreignKey: 'tent_id',
      });
    }
  }
  Tent.init({
    name: DataTypes.STRING,
    capacity: DataTypes.INTEGER,
    img_url: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Tent',
  });
  return Tent;
};
