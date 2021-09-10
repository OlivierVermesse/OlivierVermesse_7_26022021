const express = require("express");
const router = express.Router();
const auth = require('../middleware/auth');
const messageCtrl = require("../controllers/messagesCtrl");
const multer = require("../middleware/multer-config");

router.post("/", auth, multer, messageCtrl.createMessage);

module.exports = router;