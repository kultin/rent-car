'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Message extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.User, {
        as: 'recipient', foreignKey: 'recipient_id',
      });
      this.belongsTo(models.User, {
        as: 'sender', foreignKey: 'sender_id',
      });
      this.belongsTo(models.Booking, {
        foreignKey: 'booking_id',
      });
    }
  }
  Message.init({
    recipient_id: DataTypes.INTEGER,
    sender_id: DataTypes.INTEGER,
    booking_id: DataTypes.INTEGER,
    text: DataTypes.STRING,
    status: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Message',
  });
  return Message;
};