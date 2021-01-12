"use strict";

const config = require("../config");

const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Message extends Model {
    static associate(models) {
      this.belongsTo(models.Chat, { foreignKey: "chatId" });
      this.belongsTo(models.User, { foreignKey: "fromUserId" });
    }
  }
  Message.init(
    {
      type: DataTypes.STRING,
      message: {
        type: DataTypes.TEXT,
        get() {
          const type = this.getDataValue("type");
          const id = this.getDataValue("chatId");
          const content = this.getDataValue("message");

          return type === "text"
            ? content
            : `${config.appUrl}:${config.appPort}/chat/${id}/${content}`;
        },
      },
      chatId: DataTypes.INTEGER,
      fromUserId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Message",
    }
  );
  return Message;
};
