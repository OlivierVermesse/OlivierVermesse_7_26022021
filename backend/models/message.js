const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    class Message extends Model { }
    Message.init({
        message: {
            type: DataTypes.TEXT,
            required: true,
            allowNull: false,
            validate: {
                notNull: { msg: "Le champ Message est obligatoire" },
                notEmpty: { msg: "Le champ Message est obligatoire" },
                len: [3, 1500],
            },
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