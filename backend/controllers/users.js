const BDD = require("../mysqlConfig");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cryptoJS = require('crypto-js');
require('dotenv').config();


exports.signup = (req, res, next) => {
    let user = req.body;

    //Vérification de la bonne syntaxe des données reçues
    let emailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    let autresChampsSyntaxe = /^[a-zA-Z0-9 \]\[!"#$%&'()*+,./:;<>?@\^_`{|}~-]+$/;
    let verification = [
        emailFormat.test(user.email),
        autresChampsSyntaxe.test(user.last_name),
        autresChampsSyntaxe.test(user.first_name),
        autresChampsSyntaxe.test(user.pseudo),
    ]
    if (verification.every(Boolean)) {
        bcrypt.hash(user.password, 10)
            .then(hash => {
                // Chiffrement de l'email 
                key = process.env.KEY_CRYPTO;
                cipher = crypto.createCipher('aes192', key) //algo AES192
                cipher.update(req.body.email, 'binary', 'hex') //HEX pour le taille des octets
                encodedString = cipher.final('hex')
                // Enregistrement des données de l'utilisateur
                user.email = encodedString;
                user.password = hash;
                bdd.query('SELECT * from users WHERE pseudo="' + user.pseudo + '" OR email="' + user.email + '"', (err, result) => { // Vérification si utilisateur ou email existe déjà
                    if (err) throw err;
                    if (result.length >= 1) {
                        return res.status(500).json({ message: "utilisateur ou email déjà existant" });
                    }
                    else { // Insertion des données si n'existe pas
                        bdd.query('INSERT INTO users SET ?', user, (erreur, resultat) => {
                            if (erreur) throw erreur;
                            return res.status(201).json({ message: "création effectué, vous allez pouvoir vous connecter." });
                        })
                    }
                })
            })
    }
    else {
        return res.status(500).json({ message: "Données transmises incorrectes" });
    }
};

exports.login = (req, res, next) => {
    let champsSyntaxe = /^[a-zA-Z0-9 \]\[!"#$%&'()*+,./:;<>?@\^_`{|}~-]{3,}+$/;
    let user = req.body;
    let verification = [
        champsSyntaxe.test(user.pseudo),
        champsSyntaxe.test(user.password)
    ]
    if (verification.every(Boolean)) {
        bdd.query('SELECT password, id FROM users WHERE pseudo="' + user.pseudo + '"', (err, result) => { // Si l'utilisateur existe bien, on recherche le password
            if (err) throw err;
            if (result.length <= 0) {
                return res.status(500).json({ message: "Utilisateur non trouvé" });
            } else {
                console.log(user.password);
                console.log(result[0]);
                bcrypt.compare(user.password, result[0].password)
                    .then(valid => {
                        if (!valid) return res.status(500).json({ message: "L'utilisateur et le mot de passe ne correspondent pas" });
                        res.status(200).json({
                            message: "Connexion réalisée",
                            token: jwt.sign(
                                { userId: result[0].id },
                                process.env.TKN_SECRET,
                                { expiresIn: "2h" }
                            ),
                            userId: result[0].id
                        });
                    })
                    .catch(() => {
                        return res.status(500).json({ message: "Un erreur s'est produite" });
                    })
            }
        })
    }
    else {
        return res.status(500).json({ message: "Données transmises incorrectes" });
    }
};