const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    class Comment extends Model { }

    Comment.init({
        comment: {
            type: DataTypes.TEXT,
            required: true,
            allowNull: false,
            validate: {
                notNull: { msg: "Le champ Commentaire est obligatoire" },
                notEmpty: { msg: "Le champ Commentaire est obligatoire" },
                len: [3, 1500],
            },
        },
    },
        {
            sequelize,
            modelName: "Comment"
        })
    return Comment
}