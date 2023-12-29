const express = require("express");
const router = express.Router();
const {
  getNav,
  createNav,
  updateNav,
  deleteNav,
} = require("../controllers/navController");

router.route("/").get(getNav);
router.route("/").post(createNav);

router.route("/:id").put(updateNav);
router.route("/:id").delete(deleteNav);

module.exports = router;
