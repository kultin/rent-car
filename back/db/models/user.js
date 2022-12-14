const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.Car, {
        foreignKey: 'user_id',
      });
      this.belongsToMany(models.Car, {
        through: models.Booking,
        foreignKey: 'user_id',
      });
      this.hasMany(models.Booking, {
        foreignKey: 'user_id',
      });
      this.hasMany(models.Message, {
        as: 'recipient', foreignKey: 'recipient_id',
      });
      this.hasMany(models.Message, {
        as: 'sender', foreignKey: 'sender_id',
      });
      this.belongsToMany(models.Car, {
        through: models.Like,
        foreignKey: 'user_id',
      });
      this.hasMany(models.Like, {
        foreignKey: 'car_id',
      });
    }
  }
  User.init({
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    tel: DataTypes.STRING,
    password: DataTypes.STRING,
    img_url: DataTypes.STRING,
    role: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};
