const { Model } = require("sequelize")

module.exports = (sequelize, DataTypes) => {
    class User extends Model { }
    User.init({
        lastName: {
            type: DataTypes.STRING,
            required: true,
            allowNull: false,
            validate: {
                notNull: { msg: "Le champ lastName est obligatoire" },
                notEmpty: { msg: "Le champ lastName est obligatoire" },
                len: [3],
            },
        },
        userName: {
            type: DataTypes.STRING,
            required: true,
            allowNull: false,
            validate: {
                notNull: { msg: "Le champ userName est obligatoire" },
                notEmpty: { msg: "Le champ userName est obligatoire" },
                len: [3],
            },
        },
        email: {
            type: DataTypes.STRING,
            unique: true,
            required: true,
            allowNull: false,
            isEmail: true,
            validate: {
                notNull: { msg: "Le champ Email est obligatoire" },
                notEmpty: { msg: "Le champ Email est obligatoire" },
            },
        },
        password: {
            type: DataTypes.STRING,
            required: true,
            allowNull: false,
            validate: {
                notNull: { msg: "Le champ password est obligatoire" },
                notEmpty: { msg: "Le champ password est obligatoire" },
            },
        },
        isAdmin: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
    },
        {
            sequelize,
            modelName: "User"
        })
    return User
}