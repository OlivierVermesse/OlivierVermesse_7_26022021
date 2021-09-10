require("dotenv").config();
const Sequelize = require("sequelize");

const db = {};

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASS, {
    host: process.env.DB_HOST,
    dialect: process.env.DB_LANG,
    port: process.env.DB_PORT
})

//permet d'associer des modèles tout en conservant chaque modèle dans un fichier séparé
Object.keys(db).forEach(modelName => {
    if (db[modelName].associate) {
        db[modelName].associate(db)
    }
})

db.sequelize = sequelize
db.Sequelize = Sequelize

db.users = require("./user.js")(sequelize, Sequelize)
db.messages = require("./message.js")(sequelize, Sequelize)
db.comments = require("./comment.js")(sequelize, Sequelize)

db.messages.belongsTo(db.users)

db.comments.belongsTo(db.users)
db.comments.belongsTo(db.messages)

db.users.hasMany(db.messages)
db.users.hasMany(db.comments)

module.exports = db