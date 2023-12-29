const express = require("express");
const {
  registerUser,
  loginUser,
  currentUser,
} = require("../controllers/userController");
const validateToken = require("../middleware/validateTokenHandler");
const router = express.Router();

router.post("/register", registerUser);

router.post("/login", loginUser);

/** Use validate token this route only - make this private route*/
router.get("/current", validateToken, currentUser);

module.exports = router;
