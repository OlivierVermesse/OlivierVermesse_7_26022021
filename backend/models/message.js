const { Model } = require("sequelize");

//voir pour option date courante lors de la creation ==> solution pb decalage heure

module.exports = (sequelize, DataTypes) => {
    class Message extends Model { }
    Message.init({
        message: {
            type: DataTypes.TEXT
        },
        messageUrl: {
            type: DataTypes.STRING
        },
    },
        {
            sequelize,
            modelName: "Message"
        })
    return Message
}