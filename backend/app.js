const express = require("express");
const mysql = require('mysql');

const app = express();
const bdd = require('./mysqlConfig'); 

//Connexion à la Base de donnée Groupomaniadb
bdd.connect(function(err){
  if(!err) {
      console.log("Connexion à la base de donnée groupomania_P7 en cours");
  } else {
      console.log(err);
      console.log("Erreur de connection à la BDD groupomania_P7");
  }
  })

module.exports = app