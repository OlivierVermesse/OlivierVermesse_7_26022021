const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const path = require("path");
const auth = require("./middleware/auth");
const app = express();

const dataBase = require("./models");

const authRoutes = require("./routes/auth")
const userRoutes = require("./routes/user")
const messageRoutes = require("./routes/message")

app.use(helmet());
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

dataBase.sequelize.sync();   // Synchro de la BDD

app.use("/api/auth", authRoutes);
app.use("/api/users", auth, userRoutes);
app.use("/images", express.static(path.join(__dirname, "images")));
app.use("/api/messages", auth, messageRoutes);

module.exports = app