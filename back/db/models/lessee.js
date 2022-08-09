const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Lessee extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // this.hasMany(models.Booking, {
      //   foreignKey: 'booking_id',
      // }),
      this.belongsToMany(models.Car, {
        through: models.Booking,
        foreignKey: 'lessee_id',
      }),
    }
  }
  Lessee.init({
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    tel: DataTypes.STRING,
    password: DataTypes.STRING,
    img_url: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Lessee',
  });
  return Lessee;
};
