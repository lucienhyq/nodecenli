const express = require("express");
const router = express.Router();
const {
  authenticateUser,
  register_authenticat,
} = require("../middleware/authenticate");

router.post("/login", authenticateUser);
router.post("/register", register_authenticat);

module.exports = router;
