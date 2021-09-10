const db = require("../models")
const Message   = db.messages
const User      = db.users
const fs = require('fs');

exports.createMessage = (req, res, next) => {
    let imagePost = "";
    if (req.file) { 
        imagePost = `${req.protocol}://${req.get("host")}/images/${req.file.filename}` 
    }
    const message = new Message(
        {
            UserId:     req.body.UserId,
            message:    req.body.message,
            messageUrl: imagePost
        }
    )
    console.log(message)
    message.save()
        .then(() => res.status(201).json({ message: "Publication réussie" }))
        .catch(error => res.status(400).json({ error }))
};

exports.findAllMessages = (req, res, next) => {
    Message.findAll({
        include: { model: User, required: true, attributes: ["userName"]}, 
        
        order: [["id", "DESC"]],
    })    
    .then(messages => {
        const list = messages.map(message => {
            return Object.assign({},
                {
                    id:         message.id,
                    createdAt:  message.createdAt,
                    message:    message.message,
                    messageUrl: message.messageUrl,
                    UserId:     message.UserId,
                    userName:   message.User.userName,
                    isActive:   message.User.isActive
                }
            )
        })
        res.status(200).json({ list })
    })
    .catch(error => res.status(400).json({ error }))
}

exports.deleteMessage = (req, res, next) => {
    if(req.query.messageUid == req.query.uid || req.query.uid == 1) {
        Message.destroy({ where: { id: req.query.messageId }})
        .then((res) => {
                res.status(200).json({ message: "Le message a été supprimé" })
        })
        .catch(error => res.status(400).json({ error }))
    } else {
        res.status(401).json({message : " Non autorisé "})
    }
}

