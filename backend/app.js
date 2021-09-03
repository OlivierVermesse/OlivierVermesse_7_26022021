const express = require("express");
const mysql = require('mysql');
const bdd = require('./mysqlConfig');
const app = express();

const userRoutes = require('./routes/user');


//Connexion à la Base de donnée Groupomaniadb
bdd.connect(function (err) {
  if (!err) {
    console.log("Connexion à la base de donnée groupomania_P7 en cours");
  } else {
    console.log(err);
    console.log("Erreur de connection à la BDD groupomania_P7");
  }
})

//ajout de cette application afin de dire à l'API qu'elle est public et les actions possible à faire par le front
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

app.use(cors());

app.use('/user/', userRoutes);

module.exports = app