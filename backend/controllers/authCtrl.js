const db = require("../models");
const User = db.users;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.signup = (req, res, next) => {
  if (!req.body.lastName || !req.body.userName || !req.body.email || !req.body.password) {
    return res.status(400).json({ message: "Complétez l'ensemble des champs" })
  }
  const globalRegex = /(.*[a-z]){3,30}/;
  const mailRegex = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
  const pwdRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/

  if (globalRegex.test(req.body.lastName) && globalRegex.test(req.body.userName) && mailRegex.test(req.body.email) && pwdRegex.test(req.body.password)) {
    bcrypt.hash(req.body.password, 10)  // on hashe le mot de passe avec un salt de 10
      .then(hash => {
        const user = new User({
          lastName: req.body.lastName,
          userName: req.body.userName,
          email: req.body.email,
          password: hash
        });
        user.save()  // et on sauve dans la base de données
          .then((user) => {
            if (user) {
              return res.status(201).json({ message: "nouvel utilisateur créé" })
            }
          })
          .catch((error) => { res.status(401).json({ error }) });
      })
      .catch((error) => { res.status(500).json({ message: "erreur serveur" + error }) })
  } else {
    res.status(400).json({ message: "données incorrectes" })
  }
};


exports.login = (req, res, next) => {
  if (!req.body.email || !req.body.password) {
    return res.status(400).json({ message: "Complétez l'ensemble des champs" })
  }
  User.findOne({
    where: {
      email: req.body.email
    }
  })
    .then(user => {
      if (!user) {
        return res.status(404).json({ message: "email non trouvé" });
      }
      bcrypt.compare(req.body.password, user.password)
        .then(valid => {
          if (!valid) {
            return res.status(401).json({ message: "mot de passe incorrect" });
          }
          res.status(200).json({
            message: "Connexion réussie",
            userId: user.id,
            role: user.isAdmin,
            lastName: user.lastName,
            userName: user.userName,
            token: jwt.sign({ userId: user.id }, process.env.TKN_SECRET, { expiresIn: '24h' })
          })
        })
        .catch(error => res.status(500).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
};