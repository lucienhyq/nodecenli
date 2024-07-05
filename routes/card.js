var express = require("express");
var router = express.Router();
var card_controller = require("../controller/card/card_controller");

router.post("/card_Index", card_controller.card_Index);

module.exports = router;
