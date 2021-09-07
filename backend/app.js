const express       = require("express");
const bodyParser    = require("body-parser");
const cors          = require("cors");
const helmet        = require("helmet");
const auth          = require("./middleware/auth");
const app           = express();

const dataBase      = require("./models");

const authRoutes    = require("./routes/auth")

app.use(helmet());
app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

dataBase.sequelize.sync();   // Synchronisation de la base de données grâce à Sequelize

app.use("/api/auth",        authRoutes);

module.exports = app