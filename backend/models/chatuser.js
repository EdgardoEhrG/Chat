"use strict";

const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class ChatUser extends Model {
    static associate(models) {
      this.belongsTo(models.Chat, { foreignKey: "chatId" });
      this.belongsTo(models.User, { foreignKey: "userId" });
    }
  }
  ChatUser.init(
    {
      chatId: DataTypes.INTEGER,
      userId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "ChatUser",
    }
  );
  return ChatUser;
};
