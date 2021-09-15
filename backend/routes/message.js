const express = require("express");
const router = express.Router();
const auth = require('../middleware/auth');
const multer = require("../middleware/multer-config");
const messageCtrl = require("../controllers/messagesCtrl");

router.post("/", auth, multer, messageCtrl.createMessage);
router.get("/", messageCtrl.findAllMessages);
router.get("/:id", messageCtrl.findOneMessage);
router.delete("/", auth, messageCtrl.deleteMessage);


module.exports = router;