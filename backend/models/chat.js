"use strict";

const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Chat extends Model {
    static associate(models) {
      this.belongsToMany(models.User, {
        through: "ChatUser",
        foreignKey: "chatId",
      });
      this.hasMany(models.ChatUser, { foreignKey: "chatId" });
      this.hasMany(models.Message, { foreignKey: "chatId" });
    }
  }
  Chat.init(
    {
      type: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Chat",
    }
  );
  return Chat;
};
