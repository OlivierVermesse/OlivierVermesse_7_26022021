// Centre de lAPI  

const express       = require("express");
const bodyParser    = require("body-parser");
const cors          = require("cors");
const helmet        = require("helmet");
const path          = require("path");
const auth          = require("./middleware/auth");
const app           = express();

const dataBase      = require("./models");

const authRoutes    = require("./routes/auth")
const userRoutes    = require("./routes/user")

app.use(helmet());
app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

dataBase.sequelize.sync();   // Synchronisation de la base de données grâce à Sequelize

app.use("/api/auth",        authRoutes);

app.use("/api/users",       auth, userRoutes);

module.exports = app