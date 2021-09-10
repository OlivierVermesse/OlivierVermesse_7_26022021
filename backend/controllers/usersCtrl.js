const db = require("../models")
const User      = db.users
const Message   = db.messages
const Comment   = db.comments
const { Op } = require("sequelize");



exports.findOneUser = (req, res, next) => {
    const userData = {}
    User.findOne({ where: { id: req.params.id }})
    .then(user => {
        userData.id             = user.id
        userData.lastName       = user.lastName
        userData.userName       = user.userName
        userData.userName       = user.userName
        userData.email          = user.email
        userData.createdAt      = user.createdAt
        userData.isAdmin        = user.isAdmin
    })
    .then(() => {
        Message.count({ where: { userId: req.params.id }})
        .then(total => { 
            userData.totalMessages = total
        })
    })  
    .then(() => {
        res.status(200).json(userData)
    })
    .catch(error => res.status(404).json({ error }))
}

exports.findAllUsers = (req, res, next) => {
    User.findAll({
        where: {id: { [Op.gt]: 0 }} 
    })    
    .then( (found) => {
        res.status(200).json({ found }) 
    })
    .catch((error) => { 
        res.status(400).json({ error }) 
    })
}

exports.deleteOneUser = (req, res, next) => {
    if(req.query.isAdmin) {
        Message.destroy({ where: { UserId: req.query.uid }})
        User.destroy({ where: { id: req.query.uid}})
        .then((res) => {
            res.status(200).json({ message: "Le user a été supprimé" })
        })
        .catch(error => res.status(400).json({ error }))
    } else {
        res.status(401).json({message : " Non autorisé "})
    }
}

exports.deleteMyAccount = (req, res, next) => {
    Message.destroy({ where: { UserId: req.query.uid }})
    User.destroy({ where: { id: req.params.id }}) 
    .then( () => res.status(200).json({message: "ok"}))
    .catch(error => console.log(error))
}
