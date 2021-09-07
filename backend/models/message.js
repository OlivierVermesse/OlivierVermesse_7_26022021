const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    class Message extends Model { }
    Message.init({
        message: {
            type: DataTypes.TEXT
        },
        picture: {
            type: DataTypes.STRING
        },
        is_moderated: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        }
    },
        {
            sequelize,
            modelName: "Message"
        })
    return Message
}