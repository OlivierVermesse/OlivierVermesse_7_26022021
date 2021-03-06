const db = require("../models")
const User = db.users
const Message = db.messages
const Comment   = db.comments
const fs = require('fs');

exports.createMessage = (req, res, next) => {
    let imagePost = "";
    if (req.file) {
        imagePost = `${req.protocol}://${req.get("host")}/images/${req.file.filename}`
    }
    const message = new Message(
        {
            UserId: req.body.UserId,
            message: req.body.message,
            messageUrl: imagePost
        }
    )
    console.log(message)
    message.save()
        .then(() => res.status(201).json({ message: "Publication réussie" }))
        .catch(error => res.status(400).json({ error }))
};

exports.findOneMessage = (req, res, next) => {
    const oneMessage = {}
    Message.findOne({
        where: { id: req.params.id },
        include: {
            model: User,
            required: true,
            attributes: ["userName"]
        },
        order: [["updatedAt", "DESC"]]

    })
        .then(message => {
            oneMessage.id = message.id
            oneMessage.userId = message.UserId
            oneMessage.userName = message.User.userName
            oneMessage.createdAt = message.createdAt
            oneMessage.message = message.message
            oneMessage.messageUrl = message.messageUrl
            res.status(200).json(oneMessage)
        })
        .catch(error => res.status(404).json({ error }))
};

exports.findAllMessages = (req, res, next) => {
    Message.findAll({
        include: { model: User, required: true, attributes: ["userName"] },

        order: [["updatedAt", "DESC"]],
    })
        .then(messages => {
            const list = messages.map(message => {
                return Object.assign({},
                    {
                        id: message.id,
                        createdAt: message.createdAt,
                        message: message.message,
                        messageUrl: message.messageUrl,
                        UserId: message.UserId,
                        userName: message.User.userName,
                        isActive: message.User.isActive
                    }
                )
            })
            res.status(200).json({ list })
        })
        .catch(error => res.status(400).json({ error }))
}

exports.deleteMessage = (req, res, next) => {
    if (req.query.messageUid == req.query.uid || req.query.uid == 1) {

        // const filename = Message.messageUrl.split("/images/")[1];
        // fs.unlink(`images/${filename}`);

        Comment.destroy({ where: { MessageId: req.query.messageId }})
        Message.destroy({ where: { id: req.query.messageId } })
            .then((res) => {
                res.status(200).json({ message: "Le message a été supprimé" })
            })
            .catch(error => res.status(400).json({ error }))
    } else {
        res.status(401).json({ message: " Non autorisé " })
    }
}